import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Loader } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseUserContext } from "@/context/UserContext";
import { useToast } from "../ui/use-toast";

const formSchema = z
    .object({
        name: z.string().min(2),
        email: z
            .string()
            .email()
            .min(2, {
                message: "email must be at least 2 characters.",
            })
            .max(45, {
                message: "email must be at most 45 characters.",
            }),
        password: z
            .string()
            .min(8, {
                message: "password must be at least 8 characters.",
            })
            .max(45, {
                message: "password must be at most 45 characters.",
            }),
        password_confirmation: z
            .string()
            .min(5, {
                message: "password confirmation must be at least 5 characters.",
            })
            .max(45, {
                message: "password confirmation must be at most 45 characters.",
            }),
    })
    .superRefine(({ password, password_confirmation }, ctx) => {
        if (password !== password_confirmation) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["password_confirmation"],
                message: "Passwords do not match.",
            });
        }
    });

const Register = () => {
    const { register } = UseUserContext();

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const { handleSubmit, formState, control, setError, reset } = form;

    const { isValid } = formState;

    const onSubmit = (data) => {
        console.log(data);
        setIsLoading(true);

        register(data)
            .then((res) => {
                if (res.status == 204) {
                    toast({
                        title: "Success",
                        description:
                            "Your account has been successfully created.",
                    });
                    reset();
                }
            })
            .catch((err) => {
                const {
                    response: {
                        data: { errors },
                    },
                } = err;

                Object.entries(errors).forEach(([name, error]) => {
                    setError(name, { message: error[0] });
                });
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="flex justify-center">
            <Dialog>
                <DialogTrigger className="mt-[16px]" asChild>
                    <Button className="rounded-none uppercase bg-[#008060] hover:bg-[#006e52] transition-colors">
                        Create an account
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] sm:rounded-none">
                    <DialogHeader>
                        <DialogTitle className="text-center mb-[25px]">
                            Create a new account
                        </DialogTitle>
                    </DialogHeader>
                    <Form className="" {...form}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5 pb-[20px]"
                        >
                            <FormField
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Full name"
                                                className="outline-[#2C6ECB]"
                                                {...field}
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                className="outline-[#2C6ECB]"
                                                {...field}
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Password"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password_confirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Confirm Password"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isLoading || !isValid}
                                className="sm:text-[16px] text-[14px] hover:bg-[#006e52] transition-colors font-normal w-full sm:py-[12px] py-[8px] px-[16px] rounded-none bg-[#3A3A3A]"
                                type="submit"
                            >
                                {isLoading ? (
                                    <Loader className="absolute animate-spin" />
                                ) : (
                                    <span>SIGN UP</span>
                                )}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Register;

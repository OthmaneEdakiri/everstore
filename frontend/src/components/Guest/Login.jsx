import {
    ADMIN_DASHBOARD_ROUTE,
    USER_ACCOUNT_ROUTE,
    USER_HOME_ROUTE,
} from "@/router";
import { Link, useNavigate } from "react-router-dom";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader } from "lucide-react";
import { UseUserContext } from "@/context/UserContext";
import Register from "./Register";

const formSchema = z.object({
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
});

const Login = () => {
    const navigate = useNavigate();

    const {
        setIsAuthenticated,
        login: userLogin,
        setToken,
    } = UseUserContext();

    const form = useForm({
        mode :'onBlur',
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { handleSubmit, formState, control, setError } = form;

    const { isValid, isSubmitting } = formState;

    const onSubmit = async (values) => {
        const { email, password } = values;
        await userLogin(email, password)
            .then((res) => {
                if (res.status == 200) {
                    switch (res.data.user.role) {
                        case "admin": {
                            navigate(ADMIN_DASHBOARD_ROUTE);
                            setToken(res.data.token);
                            setIsAuthenticated(true);
                            break;
                        }
                        case "user": {
                            navigate(USER_ACCOUNT_ROUTE);
                            setToken(res.data.token);
                            setIsAuthenticated(true);
                            break;
                        }
                    }
                }
            })
            .catch((err) => {
                const { status, response } = err;
                response.data.errors.email &&
                    setError("email", {
                        message: response.data.errors.email[0],
                    });
                response.data.errors.password &&
                    setError("password", {
                        message: response.data.errors.password[0],
                    });
            });
    };

    return (
        <div className="h-[calc(100vh-80px)]">
            <div className="container">
                <div className="py-[22px] text-[14px]">
                    <Link className="text-[#2C6ECB]" to={USER_HOME_ROUTE}>
                        Home
                    </Link>
                    <span> / Login</span>
                </div>

                <div className="w-[470px] max-w-full mx-auto sm:p-[40px] p-[20px] shadow-2xl">
                    <h1 className="text-center mb-[15px] text-[#3A3A3A] text-[25px] sm:text-[30px]">
                        Login
                    </h1>
                    <Form className="" {...form}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5 pb-[20px] border-b"
                        >
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
                            <Button
                                disabled={isSubmitting || !isValid}
                                className="sm:text-[16px] text-[14px] hover:bg-[#006e52] transition-colors font-normal w-full sm:py-[12px] py-[8px] px-[16px] rounded-none bg-[#3A3A3A]"
                                type="submit"
                            >
                                {isSubmitting ? (
                                    <Loader className="absolute animate-spin" />
                                ) : (
                                    <span>SIGN IN</span>
                                )}
                            </Button>
                        </form>
                    </Form>

                    <Register />
                </div>
            </div>
        </div>
    );
};

export default Login;

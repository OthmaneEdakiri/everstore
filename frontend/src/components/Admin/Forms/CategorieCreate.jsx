import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UseAdminContext } from "@/context/AdminContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
});

export function CategorieCreate() {
    const { createCategorie, setCategories, categories, getCategorie, allCategories } = UseAdminContext();

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    });

    const { control, formState, handleSubmit, reset, setError } = form;

    const { isSubmitting, isValid } = formState;

    useEffect(()=>{
        if(categories.length == 0 ){
            allCategories().then(res => res.status == 200 && setCategories(res.data.data))
        }
    },[])

    function onSubmit(categorie) {
        setIsLoading(true);
        createCategorie(categorie)
            .then((res) => {
                if (res.status == 200) {
                    reset();
                    toast({
                        title: "Success",
                        description: "Categorie Create Successfully",
                    });
                    setCategories((prev) => [
                        ...prev,
                        res.data.categorie,
                    ]);

                }
            })
            .catch((err) => {
                if (err.response.status == 422) {
                    setError("name", {
                        message: err.response.data.errors.name[0],
                    });
                }
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Name"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="bg-[#008060] shadow hover:bg-[#006e52]"
                    size="sm"
                    type="submit"
                    disabled={!isValid || isLoading}
                >
                    {isLoading && <Loader className="absolute animate-spin" />}{" "}
                    Save
                </Button>
            </form>
        </Form>
    );
}

export default CategorieCreate;

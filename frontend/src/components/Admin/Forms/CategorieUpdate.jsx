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
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { UseAdminContext } from "@/context/AdminContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
});

const CategorieUpdate = () => {
    const { setCategories, categories, getCategorie, updateCategorie } =
        UseAdminContext();

    const { id } = useParams();

    const [categorie, setCategorie] = useState({
        name: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        getCategorie(id)
            .then((res) => {
                reset({
                    name: res.data.data.name,
                });
                setCategorie(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: categorie.name,
        },
    });

    const { control, formState, handleSubmit, reset } = form;

    const { isValid, isDirty } = formState;

    function onSubmit(data) {
        setIsLoading(true);
        setCategorie((prev) => ({ ...prev, name: data.name }));
        const nvCategorie = { ...categorie, name: data.name };
        updateCategorie(id, nvCategorie)
            .then((res) => {
                if (res.status == 200) {
                    reset({
                        name: res.data.categorie.name,
                    });
                    toast({
                        title: "Success",
                        description: "Categorie Updated Successfully",
                    });
                    setCategories((prev) =>
                        prev.map((cat) =>
                            cat.id === categorie.id ? res.data.categorie : cat
                        )
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    }

    if (categorie.name == "") {
        return (
            <div className="">
                <Skeleton className="mb-[8px] w-[40px] h-[20px]" />
                <Skeleton className="mb-[12px] w-full h-[40px]" />
                <Skeleton className="w-[55px] h-[36px]" />
            </div>
        );
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
                                    placeholder="shadcn"
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
                    disabled={
                        !isValid ||
                        isLoading ||
                        !isDirty ||
                        categorie.name == ""
                    }
                >
                    {isLoading && <Loader className="absolute animate-spin" />}{" "}
                    Save
                </Button>
            </form>
        </Form>
    );
};

export default CategorieUpdate;

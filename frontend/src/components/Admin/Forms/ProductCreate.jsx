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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { UseAdminContext } from "@/context/AdminContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    price: z
        .string()
        .regex(/^\d{1,8}(\.\d{1,2})?$/, {
            message:
                "Price must be a valid decimal with up to 8 digits before the decimal point and 2 digits after.",
        })
        .refine((val) => !isNaN(parseFloat(val)) && isFinite(val), {
            message: "Price must be a valid number.",
        }),
    image: z.any(),
    categorie: z.string().min(1, {
        message: "You must specify one of the categorie",
    }),
});

const ProductCreate = () => {
    const {
        setCategories,
        categories,
        allCategories,
        createProduct,
        setProducts,
        products,
        allProducts,
    } = UseAdminContext();

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            price: "",
            image: "",
            categorie: "",
        },
    });

    const { control, formState, handleSubmit, reset } = form;

    const { isSubmitting, isValid } = formState;

    useEffect(() => {
        getAllCategories();
        getAllProducts();
    }, []);

    const getAllProducts = () => {
        if (products.length == 0) {
            allProducts().then(
                (res) => res.status == 200 && setProducts(res.data.data)
            );
        }
    };

    const getAllCategories = () => {
        if (categories.length == 0) {
            allCategories()
                .then((res) => {
                    if (res.status == 200) {
                        setCategories(res.data.data);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    function onSubmit(data) {
        setIsLoading(true);

        const categorieSelected = categories.find((ele) => {
            if (ele.name == data.categorie) {
                return ele;
            }
        });

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", parseFloat(data.price));
        formData.append("image", data.image);
        formData.append("categorie_id", categorieSelected.id);

        createProduct(formData)
            .then((res) => {
                if (res.status == 200) {
                    reset({
                        categorie: res.data.product.categorie.name,
                        image: "",
                        price: "",
                        name: "",
                    });
                    toast({
                        title: "Success",
                        description: "Product Create Successfully",
                    });
                    setProducts((prev) => [...prev, res.data.product]);
                }
            })
            .catch((err) => {
                console.log(err);
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
                <FormField
                    control={control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Price"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="categorie"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categorie</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Categorie" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((categorie) => (
                                        <SelectItem
                                            key={categorie.id}
                                            value={categorie.name}
                                        >
                                            {categorie.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    required
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    name={field.name}
                                    onChange={(e) => {
                                        field.onChange(e.target.files[0]);
                                    }}
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
};

export default ProductCreate;

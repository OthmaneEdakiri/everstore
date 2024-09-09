import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { UseAdminContext } from "@/context/AdminContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
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

const ProductUpdate = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const {
        setCategories,
        categories,
        products,
        allCategories,
        setProducts,
        allProducts,
        getProduct,
        updateProduct,
    } = UseAdminContext();

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
    const { isSubmitting, isValid, isDirty } = formState;

    useEffect(() => {
        getAllCategories();
        fetchProduct();
        getAllProducts()
    }, []);

    const getAllProducts = ()=>{
        if(products.length == 0){
            allProducts().then(res=>res.status == 200 && setProducts(res.data.data))
        }
    }

    const fetchProduct = () => {
        if (Object.entries(product).length == 0) {
            setIsFetching(true);
            getProduct(id)
                .then((res) => {
                    if (res.status == 200) {
                        const prod = res.data.data;
                        setProduct(prod);
                        reset({
                            name: prod.name,
                            price: prod.price,
                            categorie: prod.categorie.name,
                        });
                        setProducts((prev) => {
                            if (prev.id == prod.id) {
                                return prod;
                            }
                            return prev;
                        });
                    }
                })
                .finally(() => setIsFetching(false));
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
        const categorieSelected = categories.find(
            (ele) => ele.name === data.categorie
        );

        const categorieId = categorieSelected?.id;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", parseFloat(data.price));
        data.image && formData.append("image", data.image);
        formData.append("categorie_id", categorieId);
        formData.append("_method", "PUT");

        updateProduct(product.id, formData)
            .then((res) => {
                if (res.status === 200) {
                    const prod = res.data.product;
                    toast({
                        title: "Success",
                        description: "Product updated successfully",
                    });
                    reset({
                        name: prod.name,
                        price: prod.price,
                        categorie: prod.categorie.name,
                    });
                    setProducts((prev) => (prev.id === prod.id ? prod : prev));
                }
            })
            .catch((err) => {
                console.error(
                    "Error:",
                    err.response?.data.errors || err.message
                );
                toast({
                    title: "Error",
                    description:
                        err.response?.data.message || "An error occurred.",
                    variant: "destructive",
                });
            })
            .finally(() => setIsLoading(false));
    }

    if (isFetching) {
        return (
            <div className="w-full flex flex-col gap-[15px]">
                <div className="">
                    <Skeleton className={"h-[20px] mb-[8px] w-[60px]"} />
                    <Skeleton className={"h-[40px] w-full"} />
                </div>
                <div className="">
                    <Skeleton className={"h-[20px] mb-[8px] w-[60px]"} />
                    <Skeleton className={"h-[40px] w-full"} />
                </div>
                <div className="">
                    <Skeleton className={"h-[20px] mb-[8px] w-[60px]"} />
                    <Skeleton className={"h-[40px] w-full"} />
                </div>
                <div className="">
                    <Skeleton className={"h-[20px] mb-[8px] w-[60px]"} />
                    <Skeleton className={"h-[40px] w-full"} />
                </div>
                <div className="">
                    <Skeleton className={'h-[36px] w-[53px]'} />
                </div>
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
                    disabled={!isValid || isLoading || !isDirty}
                >
                    {isLoading && <Loader className="absolute animate-spin" />}{" "}
                    Save
                </Button>
            </form>
        </Form>
    );
};

export default ProductUpdate;

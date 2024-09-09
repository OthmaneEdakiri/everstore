import { UseCustomerContext } from "@/context/CustomerContext";
import {
    ADMIN_DASHBOARD_ROUTE,
    LOGIN_ROUTE,
    USER_HOME_ROUTE,
    USER_KID_ROUTE,
    USER_MEN_ROUTE,
    USER_WOMEN_ROUTE,
} from "@/router";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../ui/use-toast";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../../ui/form";
import { Loader } from "lucide-react";
import { UseUserContext } from "@/context/UserContext";
import { Skeleton } from "../../ui/skeleton";

const FormSchema = z.object({
    qty: z.string().refine(
        (value) => {
            const number = Number(value);
            return Number.isInteger(number) && number > 0;
        },
        {
            message: "Qty is invalid",
        }
    ),
});

const UserProduct = () => {
    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            qty: "1",
        },
    });

    const { user } = UseUserContext();
    const {
        getProduct,
        product,
        setProduct,
        createCart,
        setCarts,
        carts,
        products,
    } = UseCustomerContext();

    const { control, formState, handleSubmit, reset, setError } = form;

    const { isValid } = formState;

    const [urlCategorie, setUrlCategorie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    useEffect(() => {
        urlCategorieHandler();
    }, []);

    useEffect(() => {
        if (urlCategorie) {
            fetchProduct();
            pathHandler();
        }
    }, [urlCategorie]);

    const fetchProduct = () => {
        setIsLoading(true);
        getProduct(id)
            .then((res) => {
                const { status, data } = res;
                if (status == 200) {
                    if (data.data.categorie.name == urlCategorie) {
                        setProduct(data.data);
                    } else {
                        navigate(USER_HOME_ROUTE);
                        toast({
                            title: "Error",
                            description: "Product not found",
                            variant: "destructive",
                        });
                    }
                }
            })
            .catch((err) => {
                if (err.response.status == 404) {
                    navigate(USER_HOME_ROUTE);
                    toast({
                        title: "Error",
                        description: "Product not found",
                        variant: "destructive",
                    });
                }
            })
            .finally(() => setIsLoading(false));
    };

    const urlCategorieHandler = () =>
        setUrlCategorie(location.pathname.split("/")[1]);

    const pathHandler = () => {
        switch (urlCategorie) {
            case "men":
                return USER_MEN_ROUTE;

            case "women":
                return USER_WOMEN_ROUTE;

            case "kid":
                return USER_KID_ROUTE;
        }
    };

    const onSubmit = (data) => {
        const quantity = Number(data.qty);
        if (user.name == "") {
            navigate(LOGIN_ROUTE);
        } else {
            if (user.role == "user") {
                const total = Number((product.price * quantity).toFixed(2));

                setIsSubmitting(true);

                createCart({
                    user_id: user.id,
                    product_id: product.id,
                    quantity,
                    total,
                })
                    .then((res) => {
                        if (res.status == 200) {
                            const existingCartItem = carts.data.find(
                                (item) => item.id === res.data.cart.id
                            );

                            if (existingCartItem) {
                                const newSubTotal =
                                    carts.sub_total +
                                    res.data.cart.total -
                                    existingCartItem.total;
                                setCarts((prev) => ({
                                    ...prev,
                                    data: prev.data.map((item) =>
                                        item.id === existingCartItem.id
                                            ? res.data.cart
                                            : item
                                    ),
                                    sub_total: newSubTotal,
                                }));
                            } else {
                                const newSubTotal =
                                    carts.sub_total + res.data.cart.total;
                                setCarts((prev) => ({
                                    ...prev,
                                    data: [...prev.data, res.data.cart],
                                    sub_total: newSubTotal,
                                }));
                            }

                            reset();
                            toast({
                                title: "Success",
                                description: "Item added to cart successfully",
                            });
                        }
                    })
                    .catch((err) => console.log(err))
                    .finally(() => setIsSubmitting(false));
            } else if (user.role == "admin") {
                navigate(ADMIN_DASHBOARD_ROUTE);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="mb-[80px]">
                <div className="container">
                    <div className="py-[22px]">
                        <Skeleton className="h-[22px] w-[300px]" />
                    </div>
                    <div className="flex md:flex-row flex-col gap-[30px]">
                        <Skeleton className="md:w-1/2 w-full min-h-[530px]" />
                        <div className="md:w-1/2 w-full">
                            <Skeleton className="h-[40px] w-[380px] mb-[10px]" />
                            <Skeleton className="h-[30px] w-[80px] mb-[20px]" />
                            <Skeleton className="h-[40px] w-[78px] mb-[20px]" />
                            <Skeleton className="h-[40px] w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-[80px]">
            <div className="container">
                <div className="py-[22px] text-[14px]">
                    <Link className="text-[#2C6ECB]" to={USER_HOME_ROUTE}>
                        Home
                    </Link>
                    <Link className="text-[#2C6ECB]" to={pathHandler()}>
                        / {urlCategorie}
                    </Link>
                    <span> / {product.name}</span>
                </div>
                <div className="flex md:flex-row flex-col gap-[30px]">
                    <div className="md:w-1/2 w-full img-box bg-[#F6F6F6] min-h-[530px] flex items-center justify-center">
                        <img
                            className="w-full md:max-w-[80%] max-w-full h-auto"
                            src={product.image}
                            alt=""
                        />
                    </div>
                    <div className="md:w-1/2 w-full">
                        <h1 className="text-[30px] text-[#3A3A3A] mb-[10px]">
                            {product.name}
                        </h1>
                        <p className="text-[#3A3A3A] text-[20px] mb-[20px]">
                            ${product.price}
                        </p>
                        <Form {...form}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-3"
                            >
                                <FormField
                                    control={control}
                                    name="qty"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className="h-[40px] w-[78px]"
                                                    placeholder="Qty"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Loader className="absolute animate-spin" />
                                    ) : (
                                        "ADD TO CART"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProduct;

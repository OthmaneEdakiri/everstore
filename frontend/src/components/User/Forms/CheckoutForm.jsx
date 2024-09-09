import {
    cashOnDelivery,
    mastercardLogo,
    paypal,
    paypalLogo,
    visaLogo,
} from "@/assets/images";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { UseCustomerContext } from "@/context/CustomerContext";
import { UseUserContext } from "@/context/UserContext";
import { USER_ACCOUNT_ROUTE } from "@/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const FormSchema = z.object({
    phone: z.string().regex(/^0[5-7]\d{8}$/, {
        message: "Invalid phone number",
    }),
    shipping_address: z.string().min(4),
    city: z.string().min(2),
    payment_method: z.string().min(1, {
        message: "Please select a payment method",
    }),
});

const CheckoutForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { toast } = useToast();

    const { carts, createOrder, orders, setOrders, setCarts } =
        UseCustomerContext();
    const { user } = UseUserContext();

    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            phone: "",
            shipping_address: "",
            city: "",
            payment_method: "",
        },
    });

    const { control, formState, handleSubmit, reset } = form;

    const { isSubmitting, isValid } = formState;

    const onSubmit = (data) => {
        const cartItems = carts.data.map((item) => {
            return {
                quantity: item.quantity,
                unit_price: item.product.price,
                product_id: item.product.id,
            };
        });

        const orderData = {
            user_id: user.id,
            cart_items: cartItems,
            phone: data.phone,
            total_amount: carts.sub_total,
            payment_method: data.payment_method,
            shipping_address: data.shipping_address,
            city: data.city,
        };

        setIsLoading(true);

        createOrder(orderData)
            .then((res) => {
                navigate(USER_ACCOUNT_ROUTE);
                setOrders((prev) => [...prev, res.data.data]);
                setCarts({ data: [], sub_total: 0 });
                toast({
                    title: "Success",
                    description: "Order Create Successfully",
                });
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    };
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <h4 className="mt-[30px] mb-[10px] text-[20px] text-[#3A3A3A]">
                    Shipping Address
                </h4>
                <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-normal text-[#6D7175]">
                                Phone
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Phone"
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
                    name="shipping_address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-normal text-[#6D7175]">
                                Address
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Adress"
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
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-normal text-[#6D7175]">
                                City
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="City"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <h4 className="mt-[30px] mb-[10px] text-[20px] text-[#3A3A3A]">
                    Shipping Method
                </h4>
                <FormField
                    control={control}
                    name="payment_method"
                    render={({ field }) => (
                        <FormItem className="border px-[20px]">
                            <FormControl>
                                <RadioGroup
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <div className="flex items-center gap-[16px] py-[20px] border-b">
                                        <RadioGroupItem value="cash_on_delivery" />
                                        <div className="">
                                            <img
                                                src={cashOnDelivery}
                                                className="h-[30px]"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-[16px] py-[20px] border-b">
                                        <RadioGroupItem value="paypal" />
                                        <div className="">
                                            <img
                                                src={paypal}
                                                className="h-[22px]"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-[16px] py-[20px] border-b">
                                        <RadioGroupItem value="visa" />
                                        <div className="flex gap-[10px]">
                                            <div className="h-[22px] w-[36px] p-[2px] bg-white border rounded-[2px]">
                                                <img
                                                    src={visaLogo}
                                                    className="object-cover w-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="h-[22px] w-[36px] p-[2px] bg-white border rounded-[2px]">
                                                <img
                                                    src={mastercardLogo}
                                                    className="object-cover w-full"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="rounded-none shadow hover:bg-[#006e52]"
                    type="submit"
                    size="lg"
                    disabled={!isValid || isLoading}
                >
                    {isLoading && <Loader className="absolute animate-spin" />}
                    Confirm payment
                </Button>
            </form>
        </Form>
    );
};

export default CheckoutForm;

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { UseAdminContext } from "@/context/AdminContext";
import { ADMIN_MANAGE_ORDERS_ROUTE } from "@/router";
import { MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ManageOrderUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { toast } = useToast();

    const [isFetchingOrder, setIsFetchingOrder] = useState(true);

    const { getOrder, updateOrder, setOrders } = UseAdminContext();
    const [order, setOrder] = useState({});

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = () => {
        getOrder(id)
            .then((res) => {
                if (res.status == 200) {
                    setOrder(res.data.data);
                }
            })
            .catch((err) => {
                setIsFetchingOrder(false);
                if (err.response.status == 404) {
                    navigate(ADMIN_MANAGE_ORDERS_ROUTE);
                }
            })
            .finally(() => setIsFetchingOrder(false));
    };

    const getStatusColor = () => {
        switch (order.status) {
            case "pending":
                return "border-[#E4E5E7]";
            case "completed":
                return "border-[#AEE9D1]";
            case "canceled":
                return "border-[#F8D7DA]";
            default:
                return "#E4E5E7";
        }
    };

    const updateOrderStatus = (status) => {
        updateOrder(order.id, { status })
            .then((res) => {
                if (res.status === 200) {
                    setOrders((prev) =>
                        prev.map((item) =>
                            item.id === id ? res.data.order : item
                        )
                    );
                    setOrder(res.data.order);

                    if (status === "completed") {
                        toast({
                            title: "Success",
                            description: "Order completed successfully.",
                        });
                    } else if (status === "canceled") {
                        toast({
                            title: "Success",
                            description: "Order canceled successfully.",
                        });
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="py-[20px]">
            <div className="flex gap-[20px] items-center mb-[20px]">
                <Link
                    to={ADMIN_MANAGE_ORDERS_ROUTE}
                    className="bg-[#f6f6f6] text-[#5c5f62] h-[32px] w-[32px] flex items-center justify-center border border-[#8c9196] rounded-[2px] "
                >
                    <MoveLeft className="h-[20px] w-[20px] " />
                </Link>
                <h1 className="text-[20px] text-[#202223] font-semibold">
                    Editing #{id}
                </h1>
            </div>
            <div className="flex md:flex-row flex-col-reverse gap-[15px]">
                {isFetchingOrder ? (
                    <>
                        <div className="h-fit md:w-2/3 w-full border rounded-[4px] bg-white shadow-sm">
                            <div className=" flex items-center p-[20px] gap-[10px]">
                                <Skeleton
                                    className={
                                        "h-[27px] w-[27px] rounded-[50%]"
                                    }
                                />
                                <Skeleton className={"h-[25px] w-[60px]"} />
                            </div>
                            <ul className={`flex items-center p-[20px]`}>
                                <li className="flex items-center gap-[20px] w-2/4">
                                    <Skeleton className={"h-[38px] w-[38px]"} />
                                    <Skeleton
                                        className={"h-[21px] w-[140px]"}
                                    />
                                </li>
                                <li className="w-1/4">
                                    <Skeleton className={"h-[21px] w-[70px]"} />
                                </li>
                                <li className="w-1/4">
                                    <Skeleton className={"h-[21px] w-[70px]"} />
                                </li>
                            </ul>
                        </div>
                        <div className="h-fit md:w-1/3 w-full border rounded-[4px] bg-white shadow-sm">
                            <div className="p-[20px] border-b">
                                <Skeleton
                                    className={"h-[24px] w-[75px] mb-[20px]"}
                                />
                                <Skeleton className={"h-[21px] w-[60px]"} />
                            </div>
                            <div className="p-[20px] border-b">
                                <Skeleton
                                    className={"h-[18px] w-[140px] mb-[15px]"}
                                />
                                <Skeleton
                                    className={"h-[21px] w-[130px] mb-[6px]"}
                                />
                                <Skeleton className={"h-[21px] w-[90px] "} />
                            </div>
                            <div className="p-[20px] border-b">
                                <Skeleton
                                    className={"h-[18px] w-[120px] mb-[15px]"}
                                />
                                <Skeleton
                                    className={"h-[21px] w-[80px] mb-[6px]"}
                                />
                                <Skeleton
                                    className={"h-[21px] w-[130px] mb-[6px]"}
                                />
                                <Skeleton
                                    className={"h-[21px] w-[90px]"}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="h-fit md:w-2/3 w-full border rounded-[4px] bg-white shadow-sm">
                            <div className="flex items-center p-[20px]">
                                <span
                                    className={`${getStatusColor()} border-[5px] w-[27px] h-[27px] flex rounded-[50%] relative`}
                                >
                                    <span className="h-[18px] w-[18px] rounded-[50%] bg-white border-[#5c5f62] border-[2px] relative flex items-center justify-center">
                                        <span className="h-[5px] w-[5px] relative bg-[#5c5f62] rounded-[50%]"></span>
                                    </span>
                                </span>
                                <span className="font-semibold ms-[10px]">
                                    {order.status}
                                </span>
                            </div>
                            {order.order_items.map((item, index) => (
                                <ul
                                    className={`flex items-center py-[20px] mx-[20px] ${
                                        order.order_items.length - 1 != index &&
                                        "border-b"
                                    }`}
                                    key={item.id}
                                >
                                    <li className="flex items-center gap-[20px] w-2/4">
                                        <div className="h-[38px] w-[38px] border relative">
                                            <span className="absolute top-[-12px] right-[-12px] bg-[#E1E3E5] rounded-[50%] h-[18px] w-[18px] flex justify-center items-center text-[12px] text-[#3A3A3A]">
                                                {item.quantity}
                                            </span>
                                            <img
                                                src={item.product.image}
                                                className="h-full w-full"
                                                alt=""
                                            />
                                        </div>
                                        <p className="text-[#202223] text-[14px] font-semibold">
                                            {item.product.name}
                                        </p>
                                    </li>
                                    <li className="text-[14px] text-[#202223] w-1/4">
                                        ${item.unit_price}x{item.quantity}
                                    </li>
                                    <li className="text-[14px] text-[#202223] w-1/4">
                                        $
                                        {parseFloat(
                                            item.quantity * item.unit_price
                                        ).toFixed(2)}
                                    </li>
                                </ul>
                            ))}
                            {order.status == "pending" && (
                                <div className="border-t p-[20px] flex justify-end gap-[10px]">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                className="bg-[#007F5F] hover:bg-[#007F5F] hover:opacity-[0.9] transition-colors"
                                            >
                                                Complete Order
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action will mark the
                                                    order as completed and
                                                    cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() =>
                                                        updateOrderStatus(
                                                            "completed"
                                                        )
                                                    }
                                                >
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                className="bg-[#DC3545] hover:bg-[#DC3545] hover:opacity-[0.9] transition-colors"
                                            >
                                                Cancel Order
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action will cancel the
                                                    order and cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() =>
                                                        updateOrderStatus(
                                                            "canceled"
                                                        )
                                                    }
                                                >
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            )}
                        </div>
                        <div className="h-fit md:w-1/3 w-full border rounded-[4px] bg-white shadow-sm">
                            <div className="p-[20px] border-b">
                                <h2 className="font-semibold mb-[20px]">
                                    Customer
                                </h2>
                                <p className="text-[14px] text-[#2C6ECB]">
                                    {order.user.name}
                                </p>
                            </div>
                            <div className="p-[20px] border-b">
                                <h2 className="uppercase font-semibold mb-[15px] text-[12px] text-[#202223]">
                                    Contact information
                                </h2>
                                <div className="">
                                    <p className="text-[14px] text-[#2C6ECB]">
                                        {order.user.email}
                                    </p>
                                    <p className="text-[14px] text-[#222324]">
                                        {order.phone}
                                    </p>
                                </div>
                            </div>
                            <div className="p-[20px] border-b">
                                <h2 className="uppercase font-semibold mb-[15px] text-[12px] text-[#202223]">
                                    Shipping Address
                                </h2>
                                <div className="">
                                    <p className="text-[14px]">
                                        {order.user.name}
                                    </p>
                                    <p className="text-[14px] text-[#222324]">
                                        {order.shipping_address},{order.city}
                                    </p>
                                    <p className="text-[14px]">{order.phone}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageOrderUpdate;

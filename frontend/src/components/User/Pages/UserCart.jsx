import { UseCustomerContext } from "@/context/CustomerContext";
import { UseUserContext } from "@/context/UserContext";
import {
    ADMIN_DASHBOARD_ROUTE,
    LOGIN_ROUTE,
    USER_CHECKOUT_ROUTE,
    USER_HOME_ROUTE,
    USER_KID_PRODUCT_ROUTE_HANDLER,
    USER_MEN_PRODUCT_ROUTE_HANDLER,
    USER_WOMEN_PRODUCT_ROUTE_HANDLER,
} from "@/router";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";

const UserCart = () => {
    const navigate = useNavigate();

    const { carts, setCarts, deleteCart, isFetchingCarts } =
        UseCustomerContext();
    const { user, isAuthenticated } = UseUserContext();

    useEffect(() => {
        if (isAuthenticated) {
            if (user.role == "admin") {
                navigate(ADMIN_DASHBOARD_ROUTE);
            }
        } else {
            navigate(LOGIN_ROUTE);
        }
    }, []);

    const deleteHandler = (id, total) => {
        deleteCart(id)
            .then((res) => {
                if (res.status == 200) {
                    const updatedData = carts.data.filter(
                        (item) => item.id !== id
                    );

                    const sub_total = updatedData.reduce((pre, cur) => {
                        return pre + cur.total;
                    }, 0);

                    setCarts({
                        ...carts,
                        data: updatedData,
                        sub_total: Number(sub_total),
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const pathHandler = (categorie, id) => {
        switch (categorie) {
            case "men":
                return USER_MEN_PRODUCT_ROUTE_HANDLER(id);
            case "women":
                return USER_WOMEN_PRODUCT_ROUTE_HANDLER(id);
            case "kid":
                return USER_KID_PRODUCT_ROUTE_HANDLER(id);
        }
    };

    return (
        <div className="min-h-screen mb-[80px]">
            <div className="container">
                <div className="py-[22px] text-[14px]">
                    <Link className="text-[#2C6ECB]" to={USER_HOME_ROUTE}>
                        Home
                    </Link>
                    <span> / Shopping cart</span>
                </div>
                {carts.data.length == 0 && !isFetchingCarts ? (
                    <div className="h-[400px] flex justify-center items-center relative">
                        <div className="text-center flex flex-col gap-[20px]">
                            <h2 className="text-[#3A3A3A] text-[26px]">
                                Shopping cart
                            </h2>
                            <p className="text-[#3A3A3A] text-[14px]">
                                Your cart is empty!
                            </p>
                            <Link
                                to={USER_HOME_ROUTE}
                                className="uppercase bg-[#3A3A3A] text-white text-[14px] py-[10px] px-[20px] flex gap-3"
                            >
                                Continue Shopping <MoveRight className="" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex md:flex-row flex-col gap-[40px]">
                        <div className="md:w-3/4 w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isFetchingCarts ? (
                                        <TableRow>
                                            <TableCell className="flex items-center gap-[10px]">
                                                <div className="">
                                                    <Skeleton className="w-[100px] h-[100px]" />
                                                </div>
                                                <div>
                                                    <Skeleton className="w-[130px] mb-[10px] h-[18px]" />
                                                    <Skeleton className="w-[50px] h-[18px]" />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="w-[60px] h-[18px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="w-[20px] h-[18px]" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="w-[50px] h-[18px]" />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        carts.data?.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="flex items-center gap-[10px]">
                                                    <div className="w-[100px] h-[100px] bg-[#F6F6F6] flex justify-center items-center">
                                                        <img
                                                            src={
                                                                item.product
                                                                    .image
                                                            }
                                                            className="max-w-full"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <h3 className="text-[#3A3A3A] font-semibold">
                                                            <Link
                                                                to={pathHandler(
                                                                    item.product
                                                                        .categorie
                                                                        .name,
                                                                    item.product
                                                                        .id
                                                                )}
                                                                className="hover:underline"
                                                            >
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </Link>
                                                        </h3>
                                                        <Link
                                                            onClick={() =>
                                                                deleteHandler(
                                                                    item.id,
                                                                    item.total
                                                                )
                                                            }
                                                            className="text-[#737373] underline"
                                                        >
                                                            Remove
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    ${item.product.price}
                                                </TableCell>
                                                <TableCell>
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell>
                                                    ${item.total}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="md:w-1/4 w-full flex flex-col gap-[20px]">
                            <h4>Order summary</h4>
                            <div className="flex justify-between items-center w-full">
                                <span>Sub total</span>
                                <span>
                                    $
                                    {Number(
                                        parseFloat(carts.sub_total).toFixed(2)
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4>Total</h4>
                                    <span>(Inclusive of tax $0.00)</span>
                                </div>
                                <span>
                                    $
                                    {Number(
                                        parseFloat(carts.sub_total).toFixed(2)
                                    )}
                                </span>
                            </div>
                            <Link to={USER_CHECKOUT_ROUTE}>
                                <Button className="rounded-none">
                                    CHECKOUT
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserCart;

import { UseCustomerContext } from "@/context/CustomerContext";
import { UseUserContext } from "@/context/UserContext";
import { ADMIN_DASHBOARD_ROUTE, LOGIN_ROUTE, USER_HOME_ROUTE } from "@/router";
import { UserApi } from "@/services/Api/UserApi";
import { Mail, User } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "../../ui/skeleton";

const UserAccount = () => {
    const { user, logout, isAuthenticated } = UseUserContext();

    const { orders, isFetchingOrders } = UseCustomerContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            if (user.role == "admin") {
                navigate(ADMIN_DASHBOARD_ROUTE);
            }
        } else {
            navigate(LOGIN_ROUTE);
        }
    }, []);

    const logoutHandler = (e) => {
        e.preventDefault();
        UserApi.logout()
            .then((res) => {
                if (res.status == 204) {
                    logout();
                    navigate(LOGIN_ROUTE);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (user.name == "") {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] mb-[80px]">
            <div className="container">
                <div className="py-[22px] text-[14px]">
                    <Link className="text-[#2C6ECB]" to={USER_HOME_ROUTE}>
                        Home
                    </Link>
                    <span> / Account details</span>
                </div>
                <h1 className="text-center text-[34px] text-[#3A3A3A] mb-[30px]">
                    My Account
                </h1>
                <div className="flex md:flex-row flex-col-reverse account-content gap-[30px]">
                    <div className="md:w-2/3 w-full">
                        <div className="mb-[10px] border-b border-[#737373]">
                            <h2 className="text-[26px] pb-[5px]">
                                Order History
                            </h2>
                        </div>
                        {orders.length == 0 && !isFetchingOrders ? (
                            <div className="text-[#3A3A3A] text-[14px]">
                                You have not placed any orders yet
                            </div>
                        ) : isFetchingOrders ? (
                            <div className="py-[20px] flex gap-[20px] md:flex-row flex-col">
                                <div className="md:w-2/3 w-full flex items-center gap-[18px]">
                                    <div className="">
                                        <Skeleton
                                            className={"w-[80px] h-[80px]"}
                                        />
                                    </div>
                                    <div className="">
                                        <Skeleton
                                            className={
                                                "h-[20px] w-[150px] mb-[10px]"
                                            }
                                        />
                                        <Skeleton
                                            className={"h-[18px] w-[60px]"}
                                        />
                                    </div>
                                </div>
                                <div className="md:w-1/3 w-full">
                                    <Skeleton
                                        className={
                                            "w-[140px] h-[20px] mb-[10px]"
                                        }
                                    />
                                    <Skeleton className={"w-[60px] h-[20px]"} />
                                </div>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div
                                    className="py-[20px] flex gap-[20px] md:flex-row flex-col border-b"
                                    key={order.id}
                                >
                                    <div className="md:w-2/3 w-full">
                                        {order.order_items.map((item) => (
                                            <div
                                                className="mb-[10px] flex items-center gap-[18px]"
                                                key={item.id}
                                            >
                                                <div className="p-[10px] border w-fit">
                                                    <img
                                                        src={item.product.image}
                                                        className="w-[60px] h-[60px]"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="">
                                                    <h3 className="font-semibold text-[#3A3A3A] text-[14px]">
                                                        {item.product.name}
                                                    </h3>
                                                    <span className="text-[12px] text-[#3A3A3A]">
                                                        {item.quantity} x $
                                                        {item.unit_price}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="md:w-1/3 w-full">
                                        <h3 className="text-[#3A3A3A] text-[14px] font-bold">
                                            Order: #{order.id}{" "}
                                            <span className="font-normal ms-[5px]">
                                                {new Date(order.created_at)
                                                    .toDateString()
                                                    .slice(4)}
                                            </span>
                                        </h3>
                                        <h3 className="text-[#3A3A3A] text-[14px] font-bold">
                                            Total: ${order.total_amount}
                                        </h3>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="md:w-1/3 w-full">
                        <div className="mb-[10px] flex justify-between items-center border-b border-[#737373]">
                            <h2 className="text-[26px] pb-[5px]">
                                Account Details
                            </h2>
                            <a
                                href=""
                                className="text-[#2C6ECB]"
                                onClick={logoutHandler}
                            >
                                Logout
                            </a>
                        </div>
                        <div>
                            <div className="flex items-center gap-[10px] mb-[10px]">
                                <User className="h-[20px] w-[20px]" />{" "}
                                <span>{user.name}</span>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <Mail className="h-[20px] w-[20px]" />{" "}
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;

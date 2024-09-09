import { logo, mastercardLogo, paypalLogo, visaLogo } from "@/assets/images";
import { UseCustomerContext } from "@/context/CustomerContext";
import { UseUserContext } from "@/context/UserContext";
import {
    LOGIN_ROUTE,
    USER_ACCOUNT_ROUTE,
    USER_CART_ROUTE,
    USER_HOME_ROUTE,
    USER_KID_ROUTE,
    USER_MEN_ROUTE,
    USER_WOMEN_ROUTE,
} from "@/router";
import { ShoppingBagIcon, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import UserDropDown from "./drop-down-menu/UserDropDown";

const UserLayout = () => {
    const { isAuthenticated, setUser, getUser, user, logout } =
        UseUserContext();
    const {
        getUserCartItems,
        setCarts,
        carts,
        getUserOrdersItems,
        orders,
        setOrders,
        setIsFetchingCarts,
        setIsFetchingOrders,
    } = UseCustomerContext();
    const [isLoading, setIsLoading] = useState(true);
    const navbar = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (user.id) {
            fetchCartItems();
            fetchOrdersItems();
        }
    }, [user.id]);

    const fetchUser = () => {
        getUser()
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.data);
                }
            })
            .catch((err) => {
                // console.log(err)
                setIsFetchingCarts(false);
            })
            .finally(() => setIsLoading(false));
    };

    const fetchCartItems = () => {
        if (user.id) {
            setIsFetchingCarts(true)
            getUserCartItems(user.id)
                .then((res) => {
                    const subTotal = res.data.sub_total;

                    setCarts({
                        data: res.data.data,
                        sub_total: Number(parseFloat(subTotal).toFixed(2)),
                    });
                })
                .catch((err) => console.log(err))
                .finally(() => setIsFetchingCarts(false));
        } else {
            setIsFetchingCarts(false);
        }
    };

    const fetchOrdersItems = () => {
        if (user.id) {
            setIsFetchingOrders(true)
            getUserOrdersItems(user.id)
                .then((res) => {
                    setOrders(res.data.data);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsFetchingOrders(false));
        } else {
            setIsFetchingOrders(false);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <BeatLoader />
            </div>
        );
    }
    return (
        <div>
            <nav
                ref={navbar}
                className="py-[25px] text-[#3A3A3A] border-b border-[#ebebeb] sticky top-0 z-20 bg-white"
            >
                <div className="container">
                    <div className="flex justify-between items-center">
                        <Link to={USER_HOME_ROUTE}>
                            <img
                                className="h-[30px] w-[30px]"
                                src={logo}
                                alt=""
                            />
                        </Link>
                        <ul className="categories md:flex hidden gap-[25px]">
                            <li>
                                <Link
                                    to={USER_MEN_ROUTE}
                                    className="hover:underline"
                                >
                                    Men
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={USER_WOMEN_ROUTE}
                                    className="hover:underline"
                                >
                                    Women
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:underline"
                                    to={USER_KID_ROUTE}
                                >
                                    Kid
                                </Link>
                            </li>
                        </ul>
                        <ul className="flex items-center gap-[10px]">
                            <li>
                                <Link
                                    className="relative bg-red-400"
                                    to={
                                        isAuthenticated
                                            ? USER_CART_ROUTE
                                            : LOGIN_ROUTE
                                    }
                                >
                                    {carts.data.length > 0 && (
                                        <span className="rounded-[50%] h-[16px] w-[16px] bg-[#3a3a3a] text-[12px] text-white flex justify-center items-center absolute right-[-5px] top-[-5px]">
                                            {carts.data.length}
                                        </span>
                                    )}
                                    <ShoppingBagIcon />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={
                                        isAuthenticated
                                            ? USER_ACCOUNT_ROUTE
                                            : LOGIN_ROUTE
                                    }
                                >
                                    <User />
                                </Link>
                            </li>
                            <li className="md:hidden cursor-pointer">
                                <UserDropDown/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
            <footer className="py-[18px] bg-[#f6f6f6] border border-t">
                <div className="container">
                    <div className="flex md:flex-row flex-col md:justify-between items-center gap-y-[20px] px-[55px]">
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
                            <div className="h-[22px] w-[36px] p-[2px] bg-white border rounded-[2px] flex">
                                <img
                                    src={paypalLogo}
                                    className="object-cover w-full"
                                    alt=""
                                />
                            </div>
                        </div>
                        <p className="text-[13px] text-[#737373] text-center">
                            © {new Date().getFullYear()} Everstore. All Rights
                            Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UserLayout;

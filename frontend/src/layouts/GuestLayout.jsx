import { logo, mastercardLogo, paypalLogo, visaLogo } from "@/assets/images";
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
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserDropDown from "./drop-down-menu/UserDropDown";

const GuestLayout = () => {
    const { isAuthenticated } = UseUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(USER_HOME_ROUTE);
        }
    }, []);

    return (
        <div>
            <nav className="py-[25px] text-[#3A3A3A] border-b border-[#ebebeb] sticky top-0 z-20 bg-white">
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
                                <UserDropDown />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
            <footer className="py-[18px] bg-[#f6f6f6] border border-t mt-[90px]">
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

export default GuestLayout;

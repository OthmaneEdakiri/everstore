import { cn } from "@/lib/utils";
import {
    ADMIN_CREATE_PRODUCTS_ROUTE,
    ADMIN_DASHBOARD_ROUTE,
    ADMIN_MANAGE_CATEGORIES_ROUTE,
    ADMIN_MANAGE_CUSTOMERS_ROUTE,
    ADMIN_MANAGE_ORDERS_ROUTE,
    ADMIN_MANAGE_PRODUCTS_ROUTE,
} from "@/router";
import {
    BringToFront,
    CirclePlus,
    Home,
    ShoppingBag,
    Box,
    Users,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminAdministrationSideBar = ({ className }) => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className={cn("pb-8", className)}>
            <div>
                <div className="px-2 py-4">
                    <h2 className="uppercase px-4 font-semibold tracking-tight text-[#202223] text-[12px] mb-[8px]">
                        Quick links
                    </h2>
                    <div className="flex flex-col gap-[2px]">
                        <Link
                            to={ADMIN_DASHBOARD_ROUTE}
                            className={` h-[35px] px-[30px] w-full flex items-center font-medium text-[14px] rounded-[4px] hover:bg-[#edeeef] ${
                                path == ADMIN_DASHBOARD_ROUTE &&
                                "bg-[#EDEEEF] text-[#008060]"
                            }`}
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            to={ADMIN_CREATE_PRODUCTS_ROUTE}
                            className={` h-[35px] px-[30px] w-full flex items-center font-medium text-[14px] rounded-[4px] hover:bg-[#edeeef] ${
                                path == ADMIN_CREATE_PRODUCTS_ROUTE &&
                                "bg-[#EDEEEF] text-[#008060]"
                            }`}
                        >
                            <CirclePlus className="mr-2 h-4 w-4" />
                            New Product
                        </Link>
                    </div>
                </div>
                <div className="px-2 py-2">
                    <h2 className="uppercase px-4 font-semibold tracking-tight text-[#202223] text-[12px] mb-[8px]">
                        Catalog
                    </h2>
                    <div className="flex flex-col gap-[2px]">
                        <Link
                            to={ADMIN_MANAGE_PRODUCTS_ROUTE}
                            className={` h-[35px] px-[30px] w-full flex items-center font-medium text-[14px] rounded-[4px] hover:bg-[#edeeef] ${
                                path == ADMIN_MANAGE_PRODUCTS_ROUTE &&
                                "bg-[#EDEEEF] text-[#008060]"
                            }`}
                        >
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Products
                        </Link>
                        <Link
                            to={ADMIN_MANAGE_CATEGORIES_ROUTE}
                            className={` h-[35px] px-[30px] w-full flex items-center font-medium text-[14px] rounded-[4px] hover:bg-[#edeeef] ${
                                path == ADMIN_MANAGE_CATEGORIES_ROUTE &&
                                "bg-[#EDEEEF] text-[#008060]"
                            }`}
                        >
                            <BringToFront className="mr-2 h-4 w-4" />
                            Categories
                        </Link>
                    </div>
                </div>
                <div className="px-2 py-2">
                    <h2 className="uppercase px-4 font-semibold tracking-tight text-[#202223] text-[12px] mb-[8px]">
                        Sale
                    </h2>
                    <div className="flex flex-col gap-[2px]">
                        <Link
                            to={ADMIN_MANAGE_ORDERS_ROUTE}
                            className={` h-[35px] px-[30px] w-full flex items-center font-medium text-[14px] rounded-[4px] hover:bg-[#edeeef] ${
                                path == ADMIN_MANAGE_ORDERS_ROUTE &&
                                "bg-[#EDEEEF] text-[#008060]"
                            }`}
                        >
                            <Box className="mr-2 h-4 w-4" />
                            Orders
                        </Link>
                    </div>
                </div>
                <div className="px-2 py-2">
                    <h2 className="uppercase px-4 font-semibold tracking-tight text-[#202223] text-[12px] mb-[8px]">
                        Customer
                    </h2>
                    <div className="flex flex-col gap-[2px]">
                        <Link
                            to={ADMIN_MANAGE_CUSTOMERS_ROUTE}
                            className={` h-[35px] px-[30px] w-full flex items-center font-medium text-[14px] rounded-[4px] hover:bg-[#edeeef] ${
                                path == ADMIN_MANAGE_CUSTOMERS_ROUTE &&
                                "bg-[#EDEEEF] text-[#008060]"
                            }`}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Customers
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAdministrationSideBar;

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { UseUserContext } from "@/context/UserContext";
import {
    ADMIN_CREATE_PRODUCTS_ROUTE,
    ADMIN_DASHBOARD_ROUTE,
    ADMIN_MANAGE_CATEGORIES_ROUTE,
    ADMIN_MANAGE_CUSTOMERS_ROUTE,
    ADMIN_MANAGE_ORDERS_ROUTE,
    ADMIN_MANAGE_PRODUCTS_ROUTE,
    LOGIN_ROUTE,
} from "@/router";
import { UserApi } from "@/services/Api/UserApi";
import {
    Box,
    BringToFront,
    CirclePlus,
    Home,
    LogOut,
    ShoppingBag,
    Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDropDown = () => {
    const { user, logout } = UseUserContext();
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => setWindowWidth(window.innerWidth);

    const logoutHandler = () => {
        UserApi.logout()
            .then((res) => {
                if (res.status == 204) {
                    logout();
                    navigate(LOGIN_ROUTE);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {user.name ? (
                    <Button
                        className="rounded-full bg-[#82CA9D] hover:bg-[#008060] hover:text-white text-white"
                        variant="outline"
                    >
                        {user.name[0]}
                    </Button>
                ) : (
                    <Skeleton className={"h-[40px] w-[40px] rounded-[50%]"} />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                {/*<DropdownMenuSeparator />
                 <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="me-2 h-4 w-5" />
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup> */}
                <DropdownMenuSeparator />
                {windowWidth <= 1023 && (
                    <>
                        <DropdownMenuGroup>
                            <Link to={ADMIN_DASHBOARD_ROUTE}>
                                <DropdownMenuItem>
                                    <Home className="me-2 h-4 w-5" />
                                    Dashboard
                                </DropdownMenuItem>
                            </Link>
                            <Link to={ADMIN_CREATE_PRODUCTS_ROUTE}>
                                <DropdownMenuItem>
                                    <CirclePlus className="me-2 h-4 w-5" />
                                    New Product
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link to={ADMIN_MANAGE_PRODUCTS_ROUTE}>
                                <DropdownMenuItem>
                                    <ShoppingBag className="me-2 h-4 w-5" />
                                    Products
                                </DropdownMenuItem>
                            </Link>
                            <Link to={ADMIN_MANAGE_CATEGORIES_ROUTE}>
                                <DropdownMenuItem>
                                    <BringToFront className="me-2 h-4 w-5" />
                                    Categories
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link to={ADMIN_MANAGE_ORDERS_ROUTE}>
                                <DropdownMenuItem>
                                    <Box className="me-2 h-4 w-5" />
                                    Orders
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link to={ADMIN_MANAGE_CUSTOMERS_ROUTE}>
                                <DropdownMenuItem>
                                    <Users className="me-2 h-4 w-5" />
                                    Customers
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem onClick={logoutHandler}>
                    <LogOut className="me-2 h-4 w-5" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AdminDropDown;

import { everstoreAdminLogo } from "@/assets/images";
import { UseUserContext } from "@/context/UserContext";
import { ADMIN_DASHBOARD_ROUTE, LOGIN_ROUTE, USER_HOME_ROUTE } from "@/router";
import { UserApi } from "@/services/Api/UserApi";
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminDropDown from "./drop-down-menu/AdminDropDown";
import AdminAdministrationSideBar from "./Administration/AdminAdministrationSideBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BeatLoader } from "react-spinners";

const AdminLayout = () => {
    const { user, setUser, setIsAuthenticated } = UseUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        UserApi.getUser()
            .then((res) => {
                if (res.status == 200) {
                    if (res.data.role == "admin") {
                        setUser(res.data);
                        setIsAuthenticated(true);
                    } else if (res.data.role == "user") {
                        navigate(USER_HOME_ROUTE);
                    }
                }
            })
            .catch((err) => {
                navigate(LOGIN_ROUTE);
                logout();
            });
    }, []);

    if (user.name == "") {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <BeatLoader />
            </div>
        );
    }

    return (
        <>
            <div className="shadow bg-white z-10 sticky top-0">
                <div className="container">
                    <div className="flex items-center justify-between h-[60px]">
                        <Link
                            className="flex items-center gap-[5px]"
                            to={ADMIN_DASHBOARD_ROUTE}
                        >
                            <img
                                className="h-[30px]"
                                src={everstoreAdminLogo}
                                alt=""
                            />
                            <span className="font-bold text-[14px] text-[#008060]">
                                EVERSTORE
                            </span>
                        </Link>
                        <AdminDropDown />
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="sticky h-[calc(100vh-60px)] top-[60px] bg-[#f6f6f6] w-2/12 lg:block hidden border-r ">
                    <ScrollArea className="w-full">
                        <AdminAdministrationSideBar />
                    </ScrollArea>
                </div>

                <div className="lg:w-10/12 w-full bg-[#f6f6f6] min-h-screen">
                    <div className="container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;

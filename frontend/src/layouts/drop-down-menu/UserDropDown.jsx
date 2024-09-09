import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USER_KID_ROUTE, USER_MEN_ROUTE, USER_WOMEN_ROUTE } from "@/router";
import { Menu } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const UserDropDown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 md:hidden">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link
                            className="block w-full py-[2px]"
                            to={USER_MEN_ROUTE}
                        >
                            Men
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            className="block w-full py-[2px]"
                            to={USER_WOMEN_ROUTE}
                        >
                            Women
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            className="block w-full py-[2px]"
                            to={USER_KID_ROUTE}
                        >
                            Kid
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropDown;

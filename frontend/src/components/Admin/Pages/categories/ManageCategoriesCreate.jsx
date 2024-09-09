import { ADMIN_MANAGE_CATEGORIES_ROUTE } from "@/router";
import { MoveLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import CategorieCreate from "../../Forms/CategorieCreate";

const ManageCategoriesCreate = () => {
    return (
        <div className="py-[20px]">
            <div className="flex gap-[20px] items-center mb-[20px]">
                <Link
                    to={ADMIN_MANAGE_CATEGORIES_ROUTE}
                    className="bg-[#f6f6f6] text-[#5c5f62] h-[32px] w-[32px] flex items-center justify-center border border-[#8c9196] rounded-[2px] "
                >
                    <MoveLeft className="h-[20px] w-[20px] " />
                </Link>
                <h1 className="text-[20px] text-[#202223] font-semibold">
                    Create A New category
                </h1>
            </div>
            <div className="bg-white border rounded-[6px] p-[20px]">
                <CategorieCreate />
            </div>
        </div>
    );
};

export default ManageCategoriesCreate;

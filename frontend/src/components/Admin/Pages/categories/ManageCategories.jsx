import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import AdminCategoriesList from "../../data-table/categories/AdminCategoriesList";
import { ADMIN_CREATE_CATEGORIES_ROUTE } from "@/router";

const ManageCategories = () => {
    return (
        <div>
            <div className="flex justify-between items-center py-[20px]">
                <h1 className="text-[20px] text-[#202223] font-semibold">Categories</h1>
                <Link to={ADMIN_CREATE_CATEGORIES_ROUTE}><Button className="bg-[#008060] hover:bg-[#006e52] transition-colors" size={'sm'}>New Category</Button></Link>
            </div>
            <AdminCategoriesList />
        </div>
    );
};

export default ManageCategories;

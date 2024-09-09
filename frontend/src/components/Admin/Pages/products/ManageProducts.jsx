import { Button } from "@/components/ui/button";
import { ADMIN_CREATE_PRODUCTS_ROUTE } from "@/router";
import React from "react";
import { Link } from "react-router-dom";
import AdminProductsList from "../../data-table/products/AdminProductsList";

const ManageProducts = () => {
    return (
        <div>
            <div className="flex justify-between items-center py-[20px]">
                <h1 className="text-[20px] text-[#202223] font-semibold">
                    Products
                </h1>
                <Link to={ADMIN_CREATE_PRODUCTS_ROUTE}>
                    <Button size={'sm'} className="bg-[#008060]">New Product</Button>
                </Link>
            </div>
            <AdminProductsList />
        </div>
    );
};

export default ManageProducts;

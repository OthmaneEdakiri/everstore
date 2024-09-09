import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { productsColumns } from "./AdminProductsColumns";
import { UseAdminContext } from "@/context/AdminContext";

const AdminProductsList = () => {
    const { allProducts, setProducts, products, deleteProducts } = UseAdminContext();
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = () => {
        setIsLoading(true);
        allProducts()
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setProducts(data.data);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    };

    const handleDelete = (selectedRows) => {
        const ids = selectedRows.map((row) => row.original.id);
        deleteProducts(ids)
            .then((res) => {
                ids.forEach((id) => {
                    setProducts((prev) => prev.filter((prod) => prod.id != id));
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
            <DataTable
                columns={productsColumns}
                data={products}
                isLoading={isLoading}
                onDelete={handleDelete}
            />
    );
};

export default AdminProductsList;

import { UseAdminContext } from "@/context/AdminContext";
import React, { useEffect, useState } from "react";
import { categoriesColumns } from "./AdminCategoriesColumns";
import { DataTable } from "../DataTable";

const AdminCategoriesList = () => {
    const { categories, setCategories, allCategories, deleteCategories } =
        UseAdminContext();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {}, [categories]);

    const fetchCategories = () => {
        setIsLoading(true);

        allCategories()
            .then((res) => {
                if (res.status == 200) {
                    setCategories(res.data.data);
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setIsLoading(false));
    };

    const handleDelete = (selectedRows) => {
        const ids = selectedRows.map((row) => row.original.id);
        deleteCategories(ids)
            .then((res) => {
                console.log(res);

                if (res.status == 200) {
                    ids.forEach((id) => {
                        setCategories((prev) =>
                            prev.filter((prod) => prod.id != id)
                        );
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <DataTable
            columns={categoriesColumns}
            data={categories}
            isLoading={isLoading}
            onDelete={handleDelete}
        />
    );
};

export default AdminCategoriesList;

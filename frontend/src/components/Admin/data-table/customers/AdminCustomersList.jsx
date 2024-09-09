import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { customersColumns } from "./AdminCustomersColumns";
import { UseAdminContext } from "@/context/AdminContext";

const AdminCustomersList = () => {
    const { allCustomers, setCustomers, customers, deleteCustomers } =
        UseAdminContext();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        setIsLoading(true);
        allCustomers()
            .then((res) => {
                if (res.status == 200) {
                    setCustomers(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    };

    const handleDelete = (selectedRows) => {
        const ids = selectedRows.map((row) => row.original.id);
        deleteCustomers(ids)
            .then((res) => {
                if (res.status == 200) {
                    ids.forEach((id) => {
                        setCustomers((prev) =>
                            prev.filter((prod) => prod.id != id)
                        );
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <DataTable
            columns={customersColumns}
            data={customers}
            isLoading={isLoading}
            onDelete={handleDelete}
        />
    );
};

export default AdminCustomersList;

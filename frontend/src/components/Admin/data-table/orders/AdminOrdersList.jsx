import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import { UseAdminContext } from "@/context/AdminContext";
import { ordersColumns } from "./AdminOrdersColumns";

const AdminOrdersList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { allOrders, setOrders, orders } = UseAdminContext();

    useEffect(() => {
        getOrders();
    }, []);

    const handleDelete = () => {};

    const getOrders = () => {
        allOrders()
            .then((res) => {
                if(res.status == 200){
                    setOrders(res.data.data)
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <DataTable
            columns={ordersColumns}
            data={orders}
            isLoading={isLoading}
            onDelete={handleDelete}
            dataType = "orders"
        />
    );
};

export default AdminOrdersList;

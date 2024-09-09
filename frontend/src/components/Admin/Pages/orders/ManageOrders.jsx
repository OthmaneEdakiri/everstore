import React from "react";
import AdminOrdersList from "../../data-table/orders/AdminOrdersList";

const ManageOrders = () => {
    return (
        <div>
            <div className="flex justify-between items-center py-[20px]">
                <h1 className="text-[20px] text-[#202223] font-semibold">
                    Orders
                </h1>
            </div>
            <AdminOrdersList />
        </div>
    );
};

export default ManageOrders;

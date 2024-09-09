import React from "react";
import AdminCustomersList from "../../data-table/customers/AdminCustomersList";

const ManageCustomers = () => {
    return (
        <div>
            <div className="flex justify-between items-center py-[20px]">
                <h1 className="text-[20px] text-[#202223] font-semibold">
                    Customers
                </h1>
            </div>
            <AdminCustomersList />
        </div>
    );
};

export default ManageCustomers;

import { axiosClient } from "@/api/axios";

export const CustomerApi = {
    allCustomers: async () => {
        return await axiosClient.get("/api/admin/customers");
    },
    delete: async (payload) => {
        return await axiosClient.post("/api/admin/customers/delete", {
            ids: payload,
        });
    },
};

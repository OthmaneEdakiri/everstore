import { axiosClient } from "@/api/axios";

export const OrderApi = {
    allOrders: async () => {
        return await axiosClient.get("/api/admin/orders");
    },
    show: async (id) => {
        return await axiosClient.get(`/api/admin/orders/${id}`);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`/api/admin/orders/${id}`, payload);
    },
};

import { axiosClient } from "@/api/axios";

export const CustomerApi = {
    allProducts: async () => {
        return await axiosClient.get("/api/products");
    },
    show: async (id) => {
        return await axiosClient.get(`/api/products/${id}`);
    },
    getCartItems: async (user_id) => {
        return await axiosClient.get(`/api/carts?user_id=${user_id}`);
    },
    createCart: async (payload) => {
        return await axiosClient.post("/api/carts", payload);
    },
    deleteCart: async (id) => {
        return await axiosClient.delete(`/api/carts/${id}`);
    },

    getOrdersItems: async (user_id) => {
        return await axiosClient.get(`/api/orders?user_id=${user_id}`);
    },
    createOrder: async (payload) => {
        return await axiosClient.post("/api/orders", payload);
    },
};

import { axiosClient } from "@/api/axios";

export const ProductApi = {
    all: async () => {
        return await axiosClient.get("api/admin/products");
    },
    show : async (id)=>{
        return await axiosClient.get(`api/admin/products/${id}`)
    },
    create : async (payload) =>{
        return await axiosClient.post("api/admin/products", payload)
    },
    update: async (id, payload) => {
        return await axiosClient.post(`api/admin/products/${id}`, payload);
    },
    delete: async (payload) => {
        return await axiosClient.post("/api/admin/products/delete", {
            ids: payload,
        });
    },
};

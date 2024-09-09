import { axiosClient } from "@/api/axios";

export const CategorieApi = {
    all: async () => {
        return await axiosClient.get("/api/admin/categories");
    },
    show: async (id) => {
        return await axiosClient.get(`/api/admin/categories/${id}`);
    },
    create: async (payload) => {
        return await axiosClient.post("/api/admin/categories", payload);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`api/admin/categories/${id}`, payload);
    },
    delete: async (payload) => {
        return await axiosClient.post("/api/admin/categories/delete", {
            ids: payload,
        });
    },
};

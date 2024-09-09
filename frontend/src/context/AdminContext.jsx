import { CategorieApi } from "@/services/Api/Admin/CategorieApi";
import { CustomerApi } from "@/services/Api/Admin/CustomerApi";
import { OrderApi } from "@/services/Api/Admin/OrderApi";
import { ProductApi } from "@/services/Api/Admin/ProductApi";
import { createContext, useContext, useState } from "react";

const UserStateContext = createContext({
    categories: [],
    setCategories: () => {},
    createCategorie: (categorie) => {},
    deleteCategories: (ids) => {},
    allCategories: () => {},
    getCategorie: (id) => {},
    updateCategorie: (id, payload) => {},

    products: [],
    setProducts: () => {},
    allProducts: () => {},
    getProduct: (id) => {},
    createProduct: (payload) => {},
    updateProduct: (id, payload) => {},
    deleteProducts: (ids) => {},

    customers: [],
    setCustomers: () => {},
    allCustomers: () => {},
    deleteCustomers: (ids) => {},

    orders: [],
    setOrders: () => {},
    allOrders: () => {},
    getOrder: (id) => {},
    updateOrder: (id, payload) => {},
});

const AdminContext = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);

    // Ctegories
    const createCategorie = async (categorie) => {
        return await CategorieApi.create(categorie);
    };

    const deleteCategories = async (ids) => {
        return await CategorieApi.delete(ids);
    };

    const allCategories = async () => {
        return await CategorieApi.all();
    };

    const getCategorie = async (id) => {
        return await CategorieApi.show(id);
    };

    const updateCategorie = async (id, payload) => {
        return await CategorieApi.update(id, payload);
    };

    // Products
    const allProducts = async () => {
        return await ProductApi.all();
    };

    const getProduct = async (id) => {
        return await ProductApi.show(id);
    };

    const createProduct = async (payload) => {
        return await ProductApi.create(payload);
    };

    const updateProduct = async (id, payload) => {
        return await ProductApi.update(id, payload);
    };

    const deleteProducts = async (ids) => {
        return await ProductApi.delete(ids);
    };

    // customers
    const allCustomers = async () => {
        return await CustomerApi.allCustomers();
    };

    const deleteCustomers = async (ids) => {
        return await CustomerApi.delete(ids);
    };

    // orders
    const allOrders = async () => {
        return await OrderApi.allOrders();
    };

    const getOrder = async (id) => {
        return await OrderApi.show(id);
    };

    const updateOrder = async (id, payload) => {
        return await OrderApi.update(id, payload);
    };

    return (
        <UserStateContext.Provider
            value={{
                categories,
                setCategories,
                createCategorie,
                deleteCategories,
                allCategories,
                getCategorie,
                updateCategorie,

                products,
                setProducts,
                allProducts,
                getProduct,
                createProduct,
                updateProduct,
                deleteProducts,

                customers,
                setCustomers,
                allCustomers,
                deleteCustomers,

                orders,
                setOrders,
                allOrders,
                getOrder,
                updateOrder,
            }}
        >
            {children}
        </UserStateContext.Provider>
    );
};

export default AdminContext;

export const UseAdminContext = () => useContext(UserStateContext);

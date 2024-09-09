import { CustomerApi } from "@/services/Api/User/CustomerApi";
import { createContext, useContext, useState } from "react";

const CustomerStateContext = createContext({
    products: [],
    product: {},
    setProducts: () => {},
    setProduct: () => {},
    allProducts: () => {},
    getProduct: (id) => {},

    carts: [],
    setCarts: () => {},
    getUserCartItems: (user_id) => {},
    createCart: (payload) => {},
    deleteCart: (id) => {},

    orders: [],
    setOrders: () => {},
    getUserOrdersItems: (user_id) => {},
    createOrder: (payload) => {},

    isFetchingCarts: true,
    setIsFetchingCarts :()=>{},
    isFetchingOrders:true,
    setIsFetchingOrders:()=>{}
});

const CustomerContext = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [orders, setOrders] = useState([]);
    const [isFetchingCarts, setIsFetchingCarts] = useState(true);
    const [isFetchingOrders, setIsFetchingOrders] = useState(true);
    const [carts, setCarts] = useState({
        data: [],
        sub_total: 0,
    });

    const allProducts = async () => {
        return await CustomerApi.allProducts();
    };

    const getProduct = async (id) => {
        return await CustomerApi.show(id);
    };

    const getUserCartItems = async (user_id) => {
        return await CustomerApi.getCartItems(user_id);
    };

    const createCart = async (payload) => {
        return await CustomerApi.createCart(payload);
    };

    const deleteCart = async (id) => {
        return await CustomerApi.deleteCart(id);
    };

    const getUserOrdersItems = async (user_id) => {
        return await CustomerApi.getOrdersItems(user_id);
    };

    const createOrder = async (payload) => {
        return await CustomerApi.createOrder(payload);
    };

    return (
        <CustomerStateContext.Provider
            value={{
                products,
                setProducts,
                allProducts,

                product,
                setProduct,
                getProduct,

                carts,
                setCarts,
                getUserCartItems,
                createCart,
                deleteCart,

                orders,
                setOrders,
                getUserOrdersItems,
                createOrder,

                isFetchingCarts,
                setIsFetchingCarts,

                isFetchingOrders,
                setIsFetchingOrders
            }}
        >
            {children}
        </CustomerStateContext.Provider>
    );
};

export default CustomerContext;
export const UseCustomerContext = () => useContext(CustomerStateContext);

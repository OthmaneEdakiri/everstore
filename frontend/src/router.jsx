import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import UserLayout from "./layouts/UserLayout";
import UserHome from "./components/User/Pages/UserHome";
import Login from "./components/Guest/Login";
import AdminLayout from "./layouts/AdminLayout";
import UserAccount from "./components/User/Pages/UserAccount";
import UserCart from "./components/User/Pages/UserCart";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageCategories from "./components/Admin/Pages/categories/ManageCategories";
import ManageCategoriesCreate from "./components/Admin/Pages/categories/ManageCategoriesCreate";
import ManageCategoriesUpdate from "./components/Admin/Pages/categories/ManageCategoriesUpdate";
import ManageProducts from "./components/Admin/Pages/products/ManageProducts";
import ManageProductCreate from "./components/Admin/Pages/products/ManageProductCreate";
import ManageProductUpdate from "./components/Admin/Pages/products/ManageProductUpdate";
import UserMen from "./components/User/Pages/UserMen";
import UserWomen from "./components/User/Pages/UserWomen";
import UserKid from "./components/User/Pages/UserKid";
import UserProduct from "./components/User/Pages/UserProduct";
import NotFound from "./components/User/Pages/NotFound";
import ManageCustomers from "./components/Admin/Pages/customers/ManageCustomers";
import UserCheckout from "./components/User/Pages/UserCheckout";
import ManageOrders from "./components/Admin/Pages/orders/ManageOrders";
import ManageOrderUpdate from "./components/Admin/Pages/orders/ManageOrderUpdate";

export const USER_HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/account/login";
export const USER_ACCOUNT_ROUTE = "/account";
export const USER_CART_ROUTE = "/cart";
export const USER_MEN_ROUTE = "/men";
export const USER_WOMEN_ROUTE = "/women";
export const USER_KID_ROUTE = "/kid";
const USER_MEN_PRODUCT_ROUTE = "/men/:id";
export const USER_MEN_PRODUCT_ROUTE_HANDLER = (id) => `/men/${id}`;
const USER_WOMEN_PRODUCT_ROUTE = "/women/:id";
export const USER_WOMEN_PRODUCT_ROUTE_HANDLER = (id) => `/women/${id}`;
const USER_KID_PRODUCT_ROUTE = "/kid/:id";
export const USER_KID_PRODUCT_ROUTE_HANDLER = (id) => `/kid/${id}`;
export const USER_CHECKOUT_ROUTE = '/checkout'

// ADMIN ROUTES
export const ADMIN_DASHBOARD_ROUTE = "/admin";

export const ADMIN_MANAGE_CATEGORIES_ROUTE = "/admin/categories";
export const ADMIN_CREATE_CATEGORIES_ROUTE = "/admin/categories/create";
const ADMIN_UPDATE_CATEGORIES_ROUTE = "/admin/categories/:id/edit";
export const ADMIN_UPDATE_CATEGORIES_ROUTE_HANDLER = (id) =>
    `/admin/categories/${id}/edit`;

export const ADMIN_MANAGE_PRODUCTS_ROUTE = "/admin/products";
export const ADMIN_CREATE_PRODUCTS_ROUTE = "/admin/products/create";
const ADMIN_UPDATE_PRODUCTS_ROUTE = "/admin/products/:id/edit";
export const ADMIN_UPDATE_PRODUCTS_ROUTE_HANDLER = (id) =>
    `/admin/products/${id}/edit`;

export const ADMIN_MANAGE_CUSTOMERS_ROUTE = "/admin/customers";

export const ADMIN_MANAGE_ORDERS_ROUTE = "/admin/orders"
const ADMIN_UPDATE_ORDERS_ROUTE = "admin/orders/:id/edit"
export const ADMIN_UPDATE_ORDERS_ROUTE_HANDLER = (id) =>
    `/admin/orders/${id}/edit`;

export const router = createBrowserRouter([
    {
        element: <UserLayout />,
        children: [
            {
                path: "*",
                element: <NotFound />,
            },
            {
                element: <UserHome />,
                path: USER_HOME_ROUTE,
            },
            {
                element: <UserAccount />,
                path: USER_ACCOUNT_ROUTE,
            },
            {
                element: <UserCart />,
                path: USER_CART_ROUTE,
            },
            {
                element: <UserMen />,
                path: USER_MEN_ROUTE,
            },
            {
                element: <UserWomen />,
                path: USER_WOMEN_ROUTE,
            },
            {
                element: <UserKid />,
                path: USER_KID_ROUTE,
            },
            {
                element: <UserProduct />,
                path: USER_MEN_PRODUCT_ROUTE,
            },
            {
                element: <UserProduct />,
                path: USER_WOMEN_PRODUCT_ROUTE,
            },
            {
                element: <UserProduct />,
                path: USER_KID_PRODUCT_ROUTE,
            },
            {
                element : <UserCheckout />,
                path: USER_CHECKOUT_ROUTE
            }
        ],
    },
    {
        element: <GuestLayout />,
        children: [
            {
                element: <Login />,
                path: LOGIN_ROUTE,
            },
        ],
    },
    {
        element: <AdminLayout />,
        children: [
            {
                element: <AdminDashboard />,
                path: ADMIN_DASHBOARD_ROUTE,
            },
            // CATEGORIES
            {
                element: <ManageCategories />,
                path: ADMIN_MANAGE_CATEGORIES_ROUTE,
            },
            {
                element: <ManageCategoriesCreate />,
                path: ADMIN_CREATE_CATEGORIES_ROUTE,
            },
            {
                element: <ManageCategoriesUpdate />,
                path: ADMIN_UPDATE_CATEGORIES_ROUTE,
            },
            //PRODUCTS
            {
                element: <ManageProducts />,
                path: ADMIN_MANAGE_PRODUCTS_ROUTE,
            },
            {
                element: <ManageProductCreate />,
                path: ADMIN_CREATE_PRODUCTS_ROUTE,
            },
            {
                element: <ManageProductUpdate />,
                path: ADMIN_UPDATE_PRODUCTS_ROUTE,
            },
            // Customers
            {
                element: <ManageCustomers />,
                path: ADMIN_MANAGE_CUSTOMERS_ROUTE,
            },
            //orders
            {
                element: <ManageOrders />,
                path: ADMIN_MANAGE_ORDERS_ROUTE
            },{
                element : <ManageOrderUpdate />,
                path : ADMIN_UPDATE_ORDERS_ROUTE,
            }
        ],
    },
]);

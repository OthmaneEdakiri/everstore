import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import UserContext from "./context/UserContext.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import AdminContext from "./context/AdminContext.jsx";
import CustomerContext from "./context/CustomerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CustomerContext>
            <UserContext>
                <AdminContext>
                    <RouterProvider router={router} />
                </AdminContext>
            </UserContext>
        </CustomerContext>
        <Toaster />
    </React.StrictMode>
);

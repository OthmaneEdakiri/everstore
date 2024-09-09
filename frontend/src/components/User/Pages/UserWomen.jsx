import React, { useEffect, useState } from "react";
import UserProductsList from "../UserProductsList";
import { Link } from "react-router-dom";
import { USER_HOME_ROUTE } from "@/router";
import { UseCustomerContext } from "@/context/CustomerContext";

const UserWomen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { products, setProducts, allProducts } = UseCustomerContext();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        if (products.length == 0) {
            allProducts()
                .then((res) => {
                    if (res.status == 200) {
                        setProducts(res.data.data);
                    }
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false));
        }else{
            setIsLoading(false)
        }
    };
    return (
        <div className="mb-[80px]">
            <div className="container">
                <div className="py-[22px] text-[14px]">
                    <Link className="text-[#2C6ECB]" to={USER_HOME_ROUTE}>
                        Home
                    </Link>
                    <span> / Women</span>
                </div>
                <h1 className="text-[40px] font-bold mb-[10px]">WOMEN</h1>
                <UserProductsList
                    products={products}
                    isLoading={isLoading}
                    categorie={"women"}
                />
            </div>
        </div>
    );
};

export default UserWomen;

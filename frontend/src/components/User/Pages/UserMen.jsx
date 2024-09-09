import { USER_HOME_ROUTE } from "@/router";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserProductsList from "../UserProductsList";
import { UseCustomerContext } from "@/context/CustomerContext";

const UserMen = () => {

    const [isLoading, setIsLoading] = useState(true)
    const {products, setProducts, allProducts} = UseCustomerContext()

    useEffect(()=>{
        fetchProducts()
    },[])

    const fetchProducts =()=>{
        if(products.length == 0 ){
            allProducts()
            .then(res=>{
                if(res.status == 200){
                    setProducts(res.data.data)
                }
            })
            .catch(err=>console.log(err))
            .finally(()=>setIsLoading(false))
        }else{
            setIsLoading(false)
        }
    }
    return (
        <div className="mb-[80px]">
            <div className="container">
                <div className="py-[22px] text-[14px]">
                    <Link className="text-[#2C6ECB]" to={USER_HOME_ROUTE}>
                        Home
                    </Link>
                    <span> / Men</span>
                </div>
                <h1 className="text-[40px] font-bold mb-[10px]">MEN</h1>
                <UserProductsList products={products} isLoading={isLoading} categorie={'men'}/>
            </div>
        </div>
    );
};

export default UserMen;

import {
    USER_KID_PRODUCT_ROUTE_HANDLER,
    USER_MEN_PRODUCT_ROUTE_HANDLER,
    USER_WOMEN_PRODUCT_ROUTE_HANDLER,
} from "@/router";
import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

const UserProductsList = ({ products, isLoading, categorie }) => {
    if (isLoading) {
        return (
            <div className="">
                <div className="flex flex-wrap gap-[20px]">
                    <div className="lg:w-[calc(25%-15px)] md:w-[calc((100%/3)-(40px/3))] sm:w-[calc(50%-10px)] w-full">
                        <Skeleton className={"min-h-[250px] w-full"} />
                        <Skeleton className="mt-[10px] mb-[3px] w-[75%] h-[24px]" />
                        <Skeleton className="mt-[10px] mb-[3px] w-[60px] h-[24px]" />
                    </div>
                    <div className="lg:w-[calc(25%-15px)] md:w-[calc((100%/3)-(40px/3))] sm:w-[calc(50%-10px)] w-full">
                        <Skeleton className={"min-h-[250px] w-full"} />
                        <Skeleton className="mt-[10px] mb-[3px] w-[75%] h-[24px]" />
                        <Skeleton className="mt-[10px] mb-[3px] w-[60px] h-[24px]" />
                    </div>
                    <div className="lg:w-[calc(25%-15px)] md:w-[calc((100%/3)-(40px/3))] sm:w-[calc(50%-10px)] w-full">
                        <Skeleton className={"min-h-[250px] w-full"} />
                        <Skeleton className="mt-[10px] mb-[3px] w-[75%] h-[24px]" />
                        <Skeleton className="mt-[10px] mb-[3px] w-[60px] h-[24px]" />
                    </div>
                    <div className="lg:w-[calc(25%-15px)] md:w-[calc((100%/3)-(40px/3))] sm:w-[calc(50%-10px)] w-full">
                        <Skeleton className={"min-h-[250px] w-full"} />
                        <Skeleton className="mt-[10px] mb-[3px] w-[75%] h-[24px]" />
                        <Skeleton className="mt-[10px] mb-[3px] w-[60px] h-[24px]" />
                    </div>
                </div>
            </div>
        );
    }

    if (products.length == 0 && !isLoading) {
        return (
            <div className="w-full h-[300px] flex justify-center items-center">
                <h1 className="font-semibold">
                    There are no products to display.
                </h1>
            </div>
        );
    }

    const pathHandler = (id) => {
        switch (categorie) {
            case "men":
                return USER_MEN_PRODUCT_ROUTE_HANDLER(id);

            case "women":
                return USER_WOMEN_PRODUCT_ROUTE_HANDLER(id);

            case "kid":
                return USER_KID_PRODUCT_ROUTE_HANDLER(id);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-[20px]">
                {products
                    .filter((product) => product.categorie.name == categorie)
                    .map((prod) => (
                        <div
                            key={prod.id}
                            className="lg:w-[calc(25%-15px)] md:w-[calc((100%/3)-(40px/3))] sm:w-[calc(50%-10px)] w-full"
                        >
                            {" "}
                            <Link to={pathHandler(prod.id)}>
                                <div className="image-box bg-[#F6F6F6] w-full min-h-[250px] flex justify-center items-center">
                                    <img
                                        className="w-full"
                                        src={prod.image}
                                        alt=""
                                    />
                                </div>
                                <h3 className="mt-[10px] mb-[3px] font-bold text-[#3A3A3A]">
                                    {prod.name}
                                </h3>
                                <p className=" font-bold text-[#3A3A3A]">
                                    {prod.price}$
                                </p>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default UserProductsList;

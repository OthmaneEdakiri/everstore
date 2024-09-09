import { everstoreHero } from "@/assets/images";
import "./UserHome.css";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { USER_KID_ROUTE, USER_MEN_ROUTE, USER_WOMEN_ROUTE } from "@/router";

const UserHome = () => {
    const categories = [
        {
            id: 0,
            name: "men",
            desc: "Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.",
            path: USER_MEN_ROUTE,
        },
        {
            id: 1,
            name: "women",
            desc: "Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.",
            path: USER_WOMEN_ROUTE,
        },
        {
            id: 2,
            name: "kid",
            desc: "Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.",
            path: USER_KID_ROUTE,
        },
    ];

    return (
        <div className="home mb-[80px]">
            <div
                style={{
                    background: `url(${everstoreHero})`,
                    backgroundPosition: "left",
                    backgroundSize: "cover",
                }}
                className="hero"
            >
                <div className="container">
                    <div className="min-h-[calc(100vh-80px)] flex items-center flex-wrap">
                        <div className="md:w-1/2 w-full md:block hidden"></div>
                        <div className="text-box relative z-10 md:w-1/2 w-full md:text-start text-center">
                            <h1 className="md:text-[35px] text-[30px] mb-[30px] text-[#3A3A3A] font-bold">
                                Discover the Latest in Footwear
                            </h1>
                            <p className="mb-[18px] text-[#3A3A3A] leading-tigh text-[18px]">
                                Step into comfort and style with our latest
                                collection of shoes. Whether you're looking for
                                casual, formal, or athletic.
                            </p>
                            <Link to={USER_MEN_ROUTE}>
                                <Button size="lg" className="rounded-[2px]">
                                    SHOP NOW
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" my-[15px]">
                <div className="container">
                    <div className="flex flex-wrap gap-[20px]">
                        {categories.map((categorie) => (
                            <div
                                className="md:w-[calc((100%/3)-30px)] w-full"
                                key={categorie.id}
                            >
                                <h3 className="my-[10px] text-[20px] text-[#3A3A3A] uppercase font-medium">
                                    {categorie.name} shoes collection
                                </h3>
                                <p className="text-[14px] text-[#3A3A3A] mb-[10px]">
                                    {categorie.desc}
                                </p>
                                <Link to={categorie.path}>
                                    <Button
                                        size="sm"
                                        className="rounded-[2px] uppercase text-[12px]"
                                    >
                                        Show {categorie.name}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

{
    /* */
}

export default UserHome;

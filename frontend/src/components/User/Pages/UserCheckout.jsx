import { UseCustomerContext } from "@/context/CustomerContext";
import { UseUserContext } from "@/context/UserContext";
import { USER_CART_ROUTE } from "@/router";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutForm from "../Forms/CheckoutForm";

const UserCheckout = () => {
    const navigate = useNavigate();

    const { carts } = UseCustomerContext();
    const { user } = UseUserContext();

    useEffect(() => {
        if (carts.data.length == 0) {
            navigate(USER_CART_ROUTE);
        }
    }, []);

    const quantityHandler = () => {
        return carts.data.reduce((pre, curr) => {
            return pre + curr.quantity;
        }, 0);
    };

    return (
        <div className="">
            <div className="flex flex-wrap">
                <div className="md:w-1/2 w-full pr-[20px] pl-[35px] pb-[20px]">
                    <div className="py-[22px] text-[14px]">
                        <Link to={USER_CART_ROUTE} className="text-[#2C6ECB]">
                            Cart
                        </Link>
                        <span> / Checkout</span>
                    </div>
                    <div className="flex items-center border px-[20px] py-[10px] text-[14px] text-[#3A3A3A]">
                        <div className="lg:w-[50%] md:w-[60%] w-full flex items-center justify-between">
                            <span>Contact</span>
                            <span>{user.email}</span>
                        </div>
                        <div className="lg:w-[50%] md:w-[40%] md:block hidden"></div>
                    </div>
                    <CheckoutForm />
                </div>
                <div className="md:w-1/2 w-full md:block hidden py-[30px] pl-[20px] pr-[35px] bg-[#fafafa] border-l">
                    {carts.data.map((item) => (
                        <ul key={item.id} className="flex justify-between items-center border-b">
                            <li className="py-[10px] flex items-center">
                                <div className="w-[60px] h-[60px] border relative mr-[10px] rounded-[2px]">
                                    <span className="absolute top-[-10px] right-[-10px] bg-[#E1E3E5] rounded-[50%] h-[20px] w-[20px] flex justify-center items-center text-[12px] text-[#3A3A3A]">
                                        {item.quantity}
                                    </span>
                                    <img
                                        src={item.product.image}
                                        className="w-full object-cover"
                                        alt=""
                                    />
                                </div>
                                <span className="font-semibold text-[14px] text-[#3A3A3A] p-[10px]">
                                    {item.product.name}
                                </span>
                            </li>
                            <li></li>
                            <li>
                                <span className="text-[#3A3A3A] text-[14px]">
                                    ${item.total}
                                </span>
                            </li>
                        </ul>
                    ))}
                    <div className="py-[10px] border-b">
                        <ul className="flex justify-between items-center text-[#3A3A3A] text-[14px] mb-[10px]">
                            <li>Sub Total</li>
                            <li>{quantityHandler()} items</li>
                            <li>
                                $
                                {Number(parseFloat(carts.sub_total).toFixed(2))}
                            </li>
                        </ul>
                        <ul className="flex justify-between items-center text-[#3A3A3A] text-[14px]">
                            <li>Discount</li>
                            <li>$0.00</li>
                        </ul>
                    </div>
                    <ul className="py-[10px] text-[#3A3A3A] font-bold flex justify-between items-center">
                        <li className="text-[14px]">Total</li>
                        <li className="text-[20px]">
                            ${Number(parseFloat(carts.sub_total).toFixed(2))}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserCheckout;

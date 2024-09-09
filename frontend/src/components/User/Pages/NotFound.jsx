import { Link } from "react-router-dom";
import { USER_HOME_ROUTE } from "@/router";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    return (
        <div className="">
            <div className="container">
                <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-[10px]">
                    <h1 className="text-[50px] font-bold">404</h1>
                    <p className="text-[30px] text-center">
                        The page you requested does not exist.
                    </p>
                    <Link className="block" to={USER_HOME_ROUTE}>
                        <Button className="hover:bg-[#006e52] transition-colors rounded-[2px]">Continue shopping</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

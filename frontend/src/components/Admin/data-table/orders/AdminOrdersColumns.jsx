import { Button } from "@/components/ui/button";
import { ADMIN_UPDATE_ORDERS_ROUTE_HANDLER } from "@/router";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ordersColumns = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            const isAsc = column.getIsSorted() === "asc";
            const [isClicked, setIsCliked] = useState(false);
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(isAsc);
                        setIsCliked(true);
                    }}
                >
                    Order Number
                    {!isClicked ? (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    ) : isAsc ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <Link
                    className="hover:underline"
                    to={ADMIN_UPDATE_ORDERS_ROUTE_HANDLER(row.getValue("id"))}
                >{`#${row.getValue("id")}`}</Link>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            const isAsc = column.getIsSorted() === "asc";
            const [isClicked, setIsCliked] = useState(false);
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(isAsc);
                        setIsCliked(true);
                    }}
                >
                    Date
                    {!isClicked ? (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    ) : isAsc ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            return new Date(row.getValue("created_at")).toDateString().slice(4);
        },
    },
    {
        accessorKey: "user",
        header: ({ column }) => {
            const isAsc = column.getIsSorted() === "asc";
            const [isClicked, setIsCliked] = useState(false);
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(isAsc);
                        setIsCliked(true);
                    }}
                >
                    Customer Email
                    {!isClicked ? (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    ) : isAsc ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            return row.getValue("user").email;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            const isAsc = column.getIsSorted() === "asc";
            const [isClicked, setIsCliked] = useState(false);
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(isAsc);
                        setIsCliked(true);
                    }}
                >
                    Status
                    {!isClicked ? (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    ) : isAsc ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            switch (row.getValue("status")) {
                case "pending":
                    return (
                        <div className="px-[8.5px] py-[1.5px] rounded-full bg-[#E4E5E7] text-[#202223] flex items-center w-fit gap-[4px]">
                            <span className="h-[10px] w-[10px] rounded-[50%] bg-[#5c5f62]"></span>
                            <span>{row.getValue("status")}</span>
                        </div>
                    );
                case "completed":
                    return (
                        <div className="px-[8.5px] py-[1.5px] rounded-full bg-[#AEE9D1] text-[#202223] flex items-center w-fit gap-[4px]">
                            <span className="h-[10px] w-[10px] rounded-[50%] bg-[#007f5f]"></span>
                            <span>{row.getValue("status")}</span>
                        </div>
                    );
                case "canceled":
                    return (
                        <div className="px-[8.5px] py-[1.5px] rounded-full bg-[#F8D7DA] text-[#202223] flex items-center w-fit gap-[4px]">
                            <span className="h-[10px] w-[10px] rounded-[50%] bg-red-700"></span>
                            <span>{row.getValue("status")}</span>
                        </div>
                    );
            }
        },
    },
    {
        accessorKey: "total_amount",
        header: ({ column }) => {
            const isAsc = column.getIsSorted() === "asc";
            const [isClicked, setIsCliked] = useState(false);
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(isAsc);
                        setIsCliked(true);
                    }}
                >
                    Total
                    {!isClicked ? (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    ) : isAsc ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            return `$${row.getValue("total_amount")}`;
        },
    },
];

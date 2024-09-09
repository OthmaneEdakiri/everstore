import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ADMIN_UPDATE_PRODUCTS_ROUTE_HANDLER } from "@/router";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const productsColumns = [
    {
        id: "select",
        header: ({ table }) => {
            return (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            );
        },
        cell: ({ row }) => {
            return (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            return (
                <img
                    className="h-[60px] w-[60px] border"
                    src={row.getValue("image")}
                />
            );
        },
    },
    {
        accessorKey: "name",
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
                    Name
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
                    to={ADMIN_UPDATE_PRODUCTS_ROUTE_HANDLER(row.original.id)}
                    className="hover:underline"
                >
                    {row.getValue("name")}
                </Link>
            );
        },
    },
    {
        accessorKey: "price",
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
                    Price
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
            return `$${row.getValue("price")}`;
        },
    },
    {
        accessorKey: "categorie",
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
                    Categorie
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
            return row.getValue("categorie").name;
        },
    },
];

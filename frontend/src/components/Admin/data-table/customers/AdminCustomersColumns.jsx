import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";

export const customersColumns = [
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
                    Full name
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
    },
    {
        accessorKey: "email",
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
                    Email
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
                    Created at
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
];

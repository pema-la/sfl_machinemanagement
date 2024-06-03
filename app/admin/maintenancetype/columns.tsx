"use client";
import { ColumnDef } from "@tanstack/react-table";
import EditMaintenanceType from "./edit-mtype";
import DeleteMaintenancetype from "./delete-mtype";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Payment = {
  id: string;
  mtype: string;
  description: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "slnumber",
    header: "Sl No.",
  },
  {
    accessorKey: "mtype",
    header: "Maintenance Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: (row) => (
      <div className="space-y-1 mr-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <EditMaintenanceType
                  id={row.row.original._id}
                  mtype={row.row.original.mtype}
                  description={row.row.original.description}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#496EA4] text-white text-xs">
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <DeleteMaintenancetype id={row.row.original._id} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#496EA4] text-white text-xs">
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];

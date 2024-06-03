"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteLabtype from "./delete-labtype/delete-labtype";
import EditLabType from "./edit-labtype";

export type Payment = {
  name: string;
  description: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "slnumber",
    header: "Sl No.",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: (row) => (
      <div className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <EditLabType
                  id={row.row.original._id}
                  name={row.row.original.name}
                  description={row.row.original.description}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#496EA4] text-white text-xs">
              <p>Edit Labtype</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <DeleteLabtype id={row.row.original._id} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#496EA4] text-white text-xs">
              <p>Delete Labtype</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];

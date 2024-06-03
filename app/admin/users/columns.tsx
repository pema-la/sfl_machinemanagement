"use client";
import { ColumnDef } from "@tanstack/react-table";
import { AllowMachine } from "./allow-machine";
import SuspendUser from "./suspend-user";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type NewUser = {
  id: string;
  name: string;
  email: string;
  contact: number;
  cid: number;
  status: "Approved" | "Suspended";
};

export const columns: ColumnDef<NewUser>[] = [
  {
    accessorKey: "slnumber",
    header: "Sl No.",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "cid",
    header: "CID",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <AllowMachine user={row.original} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#496EA4] text-white text-xs">
              <p>Allow Machine</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <SuspendUser
                  id={row.original._id}
                  status={row.original.status}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#496EA4] text-white text-xs">
              <p>Suspend User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];

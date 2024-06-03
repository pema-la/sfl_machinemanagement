import React from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EditMaintenance } from "./edit-maintenance";
import DeleteMaintenance from "./delete-maintenance";
import StatusDone from "./status-done";
import StatusFail from "./status-fail";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Payment = {
  _id: string;
  slnumber: number;
  name: string;
  mtype: string;
  scheduledDate: Date;
  scheduledTime: string;
  mparts: string;
  technicianemail: string;
  durationStartDate: Date;
  durationEndDate: Date;
  durationStartTime: string;
  durationEndTime: string;
  status: "Pending" | "Done" | "Failed";
  deleted: "Yes" | "No";
};

// Define the onUpdate function here
const onUpdate = (_id: string, newStatus: "Yes" | "No") => {
  console.log(`Maintenance with ID: ${_id} updated to ${newStatus}`);
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "slnumber",
    header: "Sl No.",
  },
  {
    accessorKey: "name",
    header: "Machine Name",
  },
  {
    accessorKey: "mtype",
    header: "Maintenance Type",
  },
  {
    accessorKey: "scheduledDateTime",
    header: "Scheduled Date/Time",
    cell: (row) => {
      const { scheduledDate, scheduledTime } = row.row.original;
      const dateOnly = scheduledDate.split("T")[0];
      const formattedDateTime = `${dateOnly} / ${scheduledTime}`;
      return <div>{formattedDateTime}</div>;
    },
  },
  // {
  //   accessorKey: "technicianemail",
  //   header: "Maintenance Technician Email",
  // },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: (row) => {
      const {
        durationStartDate,
        durationEndDate,
        durationStartTime,
        durationEndTime,
      } = row.row.original;
      const startDate = new Date(durationStartDate);
      const endDate = new Date(durationEndDate);
      const startTime = new Date(`1970-01-01T${durationStartTime}`);
      const endTime = new Date(`1970-01-01T${durationEndTime}`);
      const diffMilliseconds =
        endDate.getTime() -
        startDate.getTime() +
        endTime.getTime() -
        startTime.getTime();
      const durationHours = diffMilliseconds / (1000 * 60 * 60);
      return <div>{durationHours} hr(s)</div>;
    },
  },
  {
    accessorKey: "mparts",
    header: "Machine Parts",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const { _id, status } = row.row.original;
      return (
        <div className="flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <StatusDone id={_id} status={status} onUpdate={onUpdate} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#496EA4] text-white text-xs">
                <p>Mark as done!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <StatusFail id={_id} status={status} onUpdate={onUpdate} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#496EA4] text-white text-xs">
                <p>Mark as failed!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const { _id, status, deleted } = payment;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <BsThreeDots className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2 px-4">
            <EditMaintenance
              id={_id}
              name={payment.name}
              mtype={payment.mtype}
              scheduledDate={payment.scheduledDate}
              scheduledTime={payment.scheduledTime}
              mparts={payment.mparts}
              technicianemail={payment.technicianemail}
              durationStartDate={payment.durationStartDate}
              durationEndDate={payment.durationEndDate}
              durationStartTime={payment.durationStartTime}
              durationEndTime={payment.durationEndTime}
            />
            <DropdownMenuSeparator />
            {/* Pass the onUpdate function as prop */}
            <DeleteMaintenance id={_id} deleted={deleted} onUpdate={onUpdate} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

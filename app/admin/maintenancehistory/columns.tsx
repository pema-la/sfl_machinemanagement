import React from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditHistory } from "./edit-history";
import DeleteHistory from "./delete-history";

export type Maintenance = {
  id: string;
  slnumber: number;
  name: string;
  mtype: string;
  scheduledDate: string;
  scheduledTime: string;
  mparts: string;
  technicianemail: string;
  durationStartDate: Date;
  durationEndDate: Date;
  durationStartTime: string;
  durationEndTime: string;
  status: "Pending" | "Done" | "Failed";
};

export const columns: ColumnDef<Maintenance>[] = [
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

      // Extract only the date portion
      const dateOnly = scheduledDate.split("T")[0];

      const formattedDateTime = `${dateOnly} / ${scheduledTime}`; // Add a slash between date and time
      return <div>{formattedDateTime}</div>;
    },
  },

  {
    accessorKey: "technicianemail",
    header: "Technician Email",
  },
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

      // Parse the dates and times
      const startDate = new Date(durationStartDate);
      const endDate = new Date(durationEndDate);
      const startTime = new Date(`1970-01-01T${durationStartTime}`);
      const endTime = new Date(`1970-01-01T${durationEndTime}`);

      // Calculate the difference in milliseconds
      const diffMilliseconds =
        endDate.getTime() -
        startDate.getTime() +
        endTime.getTime() -
        startTime.getTime();
      // Convert milliseconds to hours
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
      const { status } = row.row.original;
      // Define CSS classes based on status
      const statusColor = status === "Done" ? "text-green-500" : "text-red-500";
      return <div className={`font-semibold ${statusColor}`}>{status}</div>;
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const { _id } = payment;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <BsThreeDots className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2 px-4">
            <EditHistory
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
            {/* <button className="w-full rounded-md py-1 px-3 border hover:bg-accent text-sm">
              Delete
            </button> */}
            <DeleteHistory id={row.original._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

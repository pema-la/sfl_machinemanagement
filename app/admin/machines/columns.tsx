"use client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { EditModal } from "@/app/admin/machines/edit-machine";
import { ViewModal } from "@/app/admin/machines/view-machine";
import ChangeStatus from "./change-status";

export type Payment = {
  id: string;
  name: string;
  technicianemail: string;
  labtype: string;
  description: string;
  status: "Active" | "Inactive";
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
    accessorKey: "technicianemail",
    header: "Maintenance Technician Email",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: (row) => (
      <div className="space-x-1">
        <EditModal
          id={row.row.original._id}
          name={row.row.original.name}
          technicianemail={row.row.original.technicianemail}
          labtype={row.row.original.labtype}
          description={row.row.original.description}
        />
        <ViewModal
          id={row.row.original._id}
          name={row.row.original.name}
          technicianemail={row.row.original.technicianemail}
          labtype={row.row.original.labtype}
          description={row.row.original.description}
        />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <ChangeStatus id={row.original._id} status={row.original.status} />
    ),
  },
];

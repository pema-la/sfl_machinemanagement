"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CancelBooking from "./cancel";
import { Input } from "@/components/ui/input";

export type Payment = {
  id: string;
  name: string;
  bookingDate: string;
  bookingTime: string;
  slnumber: number;
  machineName: string; // Add machineName field
};

// Define the columns for the DataTable
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "slnumber",
    header: "Sl No.",
    cell: ({ row }) => <span>{row.index + 1}</span>, // Add cell renderer for "Sl No." column
  },
  {
    accessorKey: "machineName", // Change accessorKey to machineName
    header: "Machine Name",
  },
  {
    accessorKey: "bookingDate",
    header: "Booked Date",
  },
  {
    accessorKey: "bookingTime",
    header: "Booked Time",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <CancelBooking id={row.original.id} /> // Use the CancelBooking component
    ),
  },
];

// DataTable component definition
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 8,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-end pb-2 space-x-3">
        <div className="flex items-center">
          <Input
            placeholder="Search Machines ..."
            value={
              (table.getColumn("machineName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("machineName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm py-4"
          />
        </div>
      </div>
      <div className="rounded-md bg-[#fff] border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-white font-bold bg-[#E1815B]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// Main component to fetch and display data
const MyBookingComponent = () => {
  const [data, setData] = useState<Payment[]>([]);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = JSON.parse(localStorage.getItem("session"));
      const token = localStorage.getItem("token");

      if (session?.email) {
        setEmail(session.email);
        try {
          // Fetch all bookings
          const bookingsResponse = await axios.get(`api/booking`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(bookingsResponse.data); // Log the response to verify the data

          // Extract the allBookings array
          const allBookings = bookingsResponse.data.allBookings;

          // Filter bookings by the user's email
          const userBookings = allBookings.filter(
            (booking) => booking.userEmail === session.email
          );

          // Fetch machine details for each booking
          const bookingsWithData = await Promise.all(
            userBookings.map(async (booking) => {
              // Fetch machine details using machine ID
              const machineResponse = await axios.get(
                `api/machines/${booking.machinesId[0]}` // Assuming each booking has only one machine ID
              );
              const machineName = machineResponse.data.machine.name;

              // Return booking data with machine name and id
              return {
                id: booking._id, // Ensure the ID is correctly set
                machineName: machineName,
                bookingDate: booking.bookingDate,
                bookingTime: booking.bookingTime,
                slnumber: 0, // This can be handled in a more suitable way based on requirements
              };
            })
          );

          setData(bookingsWithData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">My Bookings</h2>
      <div className="flex-1 space-y-4 pt-4 ">
        <div className="grid gap-4 p-4 border bg-white rounded-md">
          <div>
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBookingComponent;

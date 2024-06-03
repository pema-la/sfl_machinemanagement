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
import { Input } from "@/components/ui/input";

// Define the Payment type
export type Payment = {
  id: string;
  name: string;
  bookingDate: string;
  bookingTime: string;
  slnumber: number;
  machineName: string; // Add machineName field
};

const handleCancelBooking = async (id: string) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(`api/booking?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Booking cancelled successfully");
    // Optionally, you can refresh the bookings data here
  } catch (error) {
    console.error("Error cancelling booking:", error);
    alert("Failed to cancel booking");
  }
};

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
    cell: (row) => {
      const { bookingDate } = row.row.original;
      const dateOnly = bookingDate.split("T")[0];
      const formattedDateTime = `${dateOnly} `;
      return <div>{formattedDateTime}</div>;
    },
  },
  {
    accessorKey: "bookingTime",
    header: "Booked Time",
  },
  {
    accessorKey: "userEmail",
    header: "Booked By",
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
        pageSize: 5,
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
      <div className="flex items-center pb-2">
        <Input
          placeholder="Filter machines..."
          value={
            (table.getColumn("machineName")?.getFilterValue() as string) ?? ""
          } // Change accessor key to 'machineName'
          onChange={
            (event) =>
              table.getColumn("machineName")?.setFilterValue(event.target.value) // Change accessor key to 'machineName'
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
      <div className="flex items-center justify-end space-x-2 py-4">
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
const RecentHistory = () => {
  const [data, setData] = useState<Payment[]>([]);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = JSON.parse(localStorage.getItem("session"));
      const token = localStorage.getItem("token");

      if (session?.email) {
        setEmail(session.email);
        try {
          const bookingsResponse = await axios.get(`api/booking`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(bookingsResponse.data); // Log the response to verify the data
          const allBookings = bookingsResponse.data.allBookings;

          const bookingsWithData = await Promise.all(
            allBookings.map(async (booking) => {
              const machineResponse = await axios.get(
                `api/machines/${booking.machinesId[0]}` // Assuming each booking has only one machine ID
              );
              const machineName = machineResponse.data.machine.name;
              let datePart = ""; // Initialize datePart variable
              if (booking.bookedDate) {
                // Check if bookedDate is defined
                datePart = booking.bookedDate.split(" ")[0]; // Split and take the first part
              }

              return {
                ...booking,
                machineName: machineName,
                datePart: datePart, // Add a new field for the date part
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
  return <DataTable columns={columns} data={data} />;
};

export default RecentHistory;

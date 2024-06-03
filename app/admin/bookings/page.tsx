"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IoCalendarOutline } from "react-icons/io5";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BookingAlertDialog from "./booking-alert"; // Adjust the import path as needed
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminMachineBooking() {
  const timeIntervals = [
    "9-10",
    "10-11",
    "11-12",
    "12-1",
    "1-2",
    "2-3",
    "3-4",
    "4-5",
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [machines, setMachines] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [labTypes, setLabTypes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMachineName, setSelectedMachineName] = useState(null);
  const [selectedTimeInterval, setSelectedTimeInterval] = useState(null);
  const [bookedBy, setbookedBy] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = (machineId, timeInterval, bookedEmail) => {
    const machine = machines.find((machine) => machine._id === machineId);
    if (machine?.status !== "Inactive") {
      setSelectedMachineName(machine.name);
      setSelectedTimeInterval(timeInterval);
      setbookedBy(bookedEmail);
      setIsAlertOpen(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [labTypesResponse, machinesResponse, bookingsResponse] =
          await Promise.all([
            axios.get("https://sfl-machinemanagement.vercel.app/api/labtype"),
            axios.get("https://sfl-machinemanagement.vercel.app/api/machines"),
            axios.get("https://sfl-machinemanagement.vercel.app/api/booking"),
          ]);

        const labTypesData = labTypesResponse.data.labtypes.map(
          (labType) => labType.name
        );
        const sortedLabTypes = labTypesData.sort((a, b) => a.localeCompare(b));
        setLabTypes(sortedLabTypes);

        if (sortedLabTypes.length > 0) {
          setActiveTab(sortedLabTypes[0]);
        }

        setMachines(machinesResponse.data.machines);
        setBookingData(bookingsResponse.data.allBookings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>
      <div className="flex-1 space-y-4 pt-4">
        <div className="grid gap-4 px-3 border p-4 bg-white rounded-md">
          <Tabs value={activeTab}>
            <div className="flex items-center justify-between">
              <TabsList className="bg-[#E1815B] bg-opacity-10">
                {labTypes.map((labType) => (
                  <TabsTrigger
                    key={labType}
                    value={labType}
                    onClick={() => setActiveTab(labType)}
                  >
                    {labType}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {labTypes.map((labType) => (
              <TabsContent key={labType} value={labType}>
                {activeTab === labType && (
                  <>
                    <div className="pb-4">
                      <p className="text-sm">Select a date: </p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[200px] justify-start text-left text-xs",
                              !selectedDate && "text-xs"
                            )}
                          >
                            <IoCalendarOutline className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            initialFocus
                            disabled={(date) =>
                              date.setHours(0, 0, 0, 0) <
                              new Date().setHours(0, 0, 0, 0)
                            } // Disable past dates
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="text-sm">Select time: </p>
                    <table className="table-auto w-full">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2"></th>
                          {timeIntervals.map((interval) => (
                            <th key={interval} className="border px-4 py-2">
                              {interval}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {machines
                          .filter((machine) => machine.labtype === labType)
                          .map((machine) => (
                            <tr key={machine._id}>
                              <td className="border text-sm px-4 py-2">
                                {machine.name}
                              </td>
                              {timeIntervals.map((interval) => {
                                const booking = bookingData.find(
                                  (booking) =>
                                    booking.machinesId == machine._id &&
                                    booking.bookingDate &&
                                    selectedDate &&
                                    new Date(
                                      booking.bookingDate
                                    ).toLocaleDateString() ===
                                      selectedDate.toLocaleDateString() &&
                                    booking.bookingTime == interval &&
                                    booking.status == "Confirmed"
                                );

                                if (booking) {
                                  return (
                                    <td
                                      key={`${machine._id}-${interval}`}
                                      className="border px-4 py-2 cursor-pointer text-center bg-red-500"
                                      onClick={() =>
                                        handleBooking(
                                          machine._id,
                                          interval,
                                          booking.userEmail
                                        )
                                      }
                                    ></td>
                                  );
                                } else {
                                  return (
                                    <td
                                      key={`${machine._id}-${interval}`}
                                      className={`border px-4 py-2 text-center ${
                                        machine.status === "Inactive"
                                          ? "bg-blue-500 cursor-not-allowed"
                                          : "bg-green-500 cursor-not-allowed"
                                      }`}
                                    ></td>
                                  );
                                }
                              })}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <BookingAlertDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        machineName={selectedMachineName}
        timeInterval={selectedTimeInterval}
        selectedDate={selectedDate}
        bookedBy={bookedBy}
      />
    </>
  );
}

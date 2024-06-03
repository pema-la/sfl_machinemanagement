"use client";
import React, { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingDialog from "./booking-dialog";
import { toast } from "react-toastify";

export default function MachineBooking() {
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

  const [bookings, setBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [machines, setMachines] = useState([]);
  const [labTypes, setLabTypes] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [userEmail, setUserEmail] = useState(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    return session ? session.email : "";
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [selectedMachineName, setSelectedMachineName] = useState(null);
  const [selectedTimeInterval, setSelectedTimeInterval] = useState(null);

  const handleBooking = (machineId, timeInterval) => {
    const machine = machines.find((machine) => machine._id === machineId);
    if (machine?.status !== "Inactive") {
      setSelectedMachineId(machineId);
      setSelectedMachineName(machine.name);
      setSelectedTimeInterval(timeInterval);
      setIsModalOpen(true);
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post("https://sfl-machinemanagement.vercel.app/api/booking", {
        userEmail,
        machinesId: [selectedMachineId],
        bookingDate: selectedDate,
        bookingTime: selectedTimeInterval,
      });
      setBookings((prevBookings) => ({
        ...prevBookings,
        [`${selectedMachineId}-${selectedTimeInterval}`]: true,
      }));
      // setIsModalOpen(false);
      toast.success("Machine booked successfully !");
      setTimeout(() => {
        window.location.reload(); // Reload the page after showing the toast message
      }, 2500);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error(" Error booking the machine !");
    }
  };

  useEffect(() => {
    const fetchMachineIds = async () => {
      try {
        const response = await axios.get(
          `https://sfl-machinemanagement.vercel.app/api/allowmachine/email?email=${userEmail}`
        );
        const machineIds = response.data.machines;

        const machineDetails = await Promise.all(
          machineIds.map(async (id) => {
            const res = await axios.get(
              `https://sfl-machinemanagement.vercel.app/api/machines/${id}`
            );
            return res.data.machine;
          })
        );

        setMachines(machineDetails);
      } catch (error) {
        console.error("Error fetching machine details:", error);
      }
    };

    fetchMachineIds();
  }, [userEmail]);

  const [bookingData, setBookingData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://sfl-machinemanagement.vercel.app/api/booking"
        );
        setBookingData(res.data.allBookings);
      } catch (error) {
        console.error("Error fetching the booking data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLabTypes = async () => {
      try {
        const res = await axios.get(
          "https://sfl-machinemanagement.vercel.app/api/labtype"
        );
        const labTypesData = res.data.labtypes.map((labType) => labType.name);
        const sortedLabTypes = labTypesData.sort((a, b) => a.localeCompare(b));
        setLabTypes(sortedLabTypes);
        if (sortedLabTypes.length > 0) {
          setActiveTab(sortedLabTypes[0]);
        }
      } catch (error) {
        console.error("Error fetching lab types:", error);
      }
    };

    fetchLabTypes();
  }, []);

  // Function to check if a date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    return date <= today;
  };

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Book Machines</h2>
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
                      <p className="text-sm font-semibold">Select a date: </p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[200px] justify-start text-left text-xs",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <IoCalendarOutline className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
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
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <p className="font-semibold text-sm">Select time:</p>
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
                                const isBooked = bookingData.some(
                                  (booking) =>
                                    booking.machinesId == machine._id &&
                                    selectedDate &&
                                    booking.bookingDate &&
                                    new Date(
                                      booking.bookingDate
                                    ).toLocaleDateString() ===
                                      selectedDate.toLocaleDateString() &&
                                    booking.bookingTime == interval &&
                                    booking.status == "Confirmed"
                                );
                                if (isBooked) {
                                  return (
                                    <td
                                      key={`${machine._id}-${interval}`}
                                      className="border px-4 py-2 text-center bg-red-500 cursor-not-allowed"
                                    ></td>
                                  );
                                } else {
                                  return (
                                    <td
                                      key={`${machine._id}-${interval}`}
                                      className={`border px-4 py-2 text-center ${
                                        machine.status === "Inactive"
                                          ? "bg-blue-500 cursor-not-allowed"
                                          : "bg-green-500 cursor-pointer"
                                      }`}
                                      onClick={() =>
                                        handleBooking(machine._id, interval)
                                      }
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
      {/* Render modal */}
      <BookingDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        machineName={selectedMachineName}
        timeInterval={selectedTimeInterval}
        selectedDate={selectedDate}
      />
    </>
  );
}

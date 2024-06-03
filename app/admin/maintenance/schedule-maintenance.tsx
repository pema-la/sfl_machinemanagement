"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import ToastNotifications from "@/components/toast-notification";

export function ScheduleMaintenance() {
  const [name, setName] = useState("");
  const [mtype, setMtype] = useState("");
  const [maintenanceTypes, setMtypes] = useState([]);
  const [machineNames, setMachineNames] = useState([]);
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [scheduledTime, setScheduledTime] = useState(new Date());
  const [mparts, setMparts] = useState("");
  const [technicianemail, setTechnicianemail] = useState("");
  const [durationStartDate, setDurationStartDate] = useState(new Date());
  const [durationEndDate, setDurationEndDate] = useState(new Date());
  const [durationStartTime, setDurationStartTime] = useState(new Date());
  const [durationEndTime, setDurationEndTime] = useState(new Date());

  useEffect(() => {
    async function fetchMaintenanceTypes() {
      try {
        const response = await axios.get("/api/maintenancetype");
        setMtypes(response.data.maintenancetypes);
      } catch (error) {
        console.error("Error fetching maintenance types:", error);
      }
    }
    fetchMaintenanceTypes();
  }, []);

  useEffect(() => {
    async function fetchMachineNames() {
      try {
        const response = await axios.get("/api/machines");
        setMachineNames(response.data.machines);
      } catch (error) {
        console.error("Error fetching machine names:", error);
      }
    }
    fetchMachineNames();
  }, []);

  useEffect(() => {
    // Automatically set durationStartDate to scheduledDate when scheduledDate changes
    setDurationStartDate(scheduledDate);
  }, [scheduledDate]);

  useEffect(() => {
    // Automatically set durationStartTime to scheduledTime when scheduledTime changes
    setDurationStartTime(scheduledTime);
  }, [scheduledTime]);

  const handleSubmit = async () => {
    // Form validation
    if (!name || !mtype || !mparts || !technicianemail) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axios.post("/api/maintenance", {
        name,
        mtype,
        scheduledDate: scheduledDate.toISOString().split("T")[0],
        scheduledTime: scheduledTime.toTimeString().split(" ")[0],
        mparts,
        technicianemail,
        durationStartDate: durationStartDate.toISOString().split("T")[0],
        durationEndDate: durationEndDate.toISOString().split("T")[0],
        durationStartTime: durationStartTime.toTimeString().split(" ")[0],
        durationEndTime: durationEndTime.toTimeString().split(" ")[0],
      });
      toast.success("Maintenance scheduled successfully!");
      setTimeout(() => {
        window.location.reload(); // Reload the page after showing the toast message
      }, 1600);
      setName("");
      setMtype("");
      setScheduledDate(new Date());
      setScheduledTime(new Date());
      setMparts("");
      setTechnicianemail("");
      setDurationStartDate(new Date());
      setDurationEndDate(new Date());
      setDurationStartTime(new Date());
      setDurationEndTime(new Date());
    } catch (error) {
      console.error("Error adding maintenance:", error);
      toast.error("Error scheduling maintenance");
    }
  };

  const minTime = new Date();
  minTime.setHours(8, 0);

  const maxTime = new Date();
  maxTime.setHours(20, 0);

  return (
    <Dialog>
      <ToastNotifications />
      <DialogTrigger asChild>
        <Button className="bg-[#E1815B] bg-opacity-5 border-2 border-[#E1815B] px-4 text-[#E1815B] hover:text-[#E1815B] font-bold">
          Schedule Maintenance
        </Button>
      </DialogTrigger>
      <DialogContent className="px-10">
        <DialogHeader>
          <DialogTitle>Schedule Maintenance</DialogTitle>
        </DialogHeader>
        <Separator className="" />
        <div
          className="max-h-[26rem] overflow-y-auto px-3"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#555 #f1f1f1" }}
        >
          <div className="grid gap-4">
            <div className="grid items-center gap-1">
              <Label htmlFor="name" className="">
                Machine Name :
              </Label>
              <Select value={name} onValueChange={setName}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {machineNames.map((machine) => (
                    <SelectItem key={machine.id} value={machine.name}>
                      {machine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid items-center gap-1">
              <Label htmlFor="mtype" className="">
                Maintenance Type :
              </Label>
              <Select value={mtype} onValueChange={setMtype}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {maintenanceTypes.map((type) => (
                    <SelectItem key={type.id} value={type.mtype}>
                      {type.mtype}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="scheduledDate" className="">
                Schedule date/time:
              </Label>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <label htmlFor="scheduledDate" className="text-xs">
                    Date :
                  </label>
                  <DatePicker
                    selected={scheduledDate}
                    onChange={(date) => setScheduledDate(date)}
                    dateFormat="yyyy-MM-dd" // Only shows date format
                    minDate={new Date()} // Disable past dates
                    className="input border p-1 rounded-md w-full text-xs"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="scheduledTime" className="text-xs">
                    Time :
                  </label>
                  <DatePicker
                    selected={scheduledTime}
                    onChange={(time) => setScheduledTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    minTime={minTime} // Set min time to 8:00 am
                    maxTime={maxTime} // Set max time to 8:00 pm
                    className="input border p-1 rounded-md w-full text-xs"
                  />
                </div>
              </div>
            </div>
            <div className="grid items-center gap-1">
              <Label htmlFor="mparts" className="">
                Machine Parts :
              </Label>
              <Input
                id="mparts"
                className=""
                value={mparts}
                onChange={(e) => setMparts(e.target.value)}
              />
            </div>
            <div className="grid items-center gap-1">
              <Label htmlFor="technicianemail" className="">
                Maintenance Technician Email :
              </Label>
              <Input
                id="technicianemail"
                className=""
                value={technicianemail}
                onChange={(e) => setTechnicianemail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="duration" className="">
                Duration:
              </Label>
              <div className="flex flex-col">
                <div className="flex pb-1 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="durationStartDate" className="text-xs">
                      Start Date :
                    </label>
                    <DatePicker
                      selected={durationStartDate}
                      onChange={(date) => setDurationStartDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="input border p-1 rounded-md w-full text-xs"
                      disabled
                      minDate={new Date()} // Disable past dates
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="durationEndDate" className="text-xs">
                      End Date :
                    </label>
                    <DatePicker
                      selected={durationEndDate}
                      onChange={(date) => setDurationEndDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="input border p-1 rounded-md w-full text-xs"
                      minDate={durationStartDate} // Set the minimum selectable date to durationStartDate
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="durationStartTime" className="text-xs">
                      Start Time :
                    </label>
                    <DatePicker
                      selected={durationStartTime}
                      onChange={(time) => setDurationStartTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      minTime={minTime} // Set min time to 8:00 am
                      maxTime={maxTime} // Set max time to 8:00 pm
                      className="input border p-1 rounded-md w-full text-xs"
                      disabled
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="durationEndTime" className="text-xs">
                      End Time :
                    </label>
                    <DatePicker
                      selected={durationEndTime}
                      onChange={(time) => setDurationEndTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      minTime={durationStartTime} // Set min time to the selected scheduledStartTime
                      maxTime={maxTime} // Set max time to 8:00 pm
                      className="input border p-1 rounded-md w-full text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator className="" />
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-[#E1815B] text-white font-bold px-8"
          >
            Schedule Maintenance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

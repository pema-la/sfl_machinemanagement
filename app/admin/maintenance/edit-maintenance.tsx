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
import { useRouter } from "next/navigation";

interface EditModalProps {
  id: string;
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
}

const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

const parseTime = (timeString) => {
  if (!timeString) return null; // Handle undefined or null timeString
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return isNaN(date.getTime()) ? null : date;
};

export function EditMaintenance({
  id,
  name,
  mtype,
  scheduledDate,
  scheduledTime,
  mparts,
  technicianemail,
  durationStartDate,
  durationEndDate,
  durationStartTime,
  durationEndTime,
}: EditModalProps) {
  const [newName, setNewName] = useState(name);
  const [newMtype, setNewMtype] = useState(mtype);
  const [newScheduledDate, setNewScheduledDate] = useState(
    parseDate(scheduledDate)
  );
  const [newScheduledTime, setNewScheduledTime] = useState(
    parseTime(scheduledTime)
  );
  const [newMparts, setNewMparts] = useState(mparts);
  const [newTechnicianemail, setNewTechnicianemail] = useState(technicianemail);
  const [newDurationStartDate, setNewDurationStartDate] = useState(
    parseDate(durationStartDate)
  );
  const [newDurationEndDate, setNewDurationEndDate] = useState(
    parseDate(durationEndDate)
  );
  const [newDurationStartTime, setNewDurationStartTime] = useState(
    parseTime(durationStartTime)
  );
  const [newDurationEndTime, setNewDurationEndTime] = useState(
    parseTime(durationEndTime)
  );

  const [machineNames, setMachineNames] = useState([]);
  const [maintenanceTypes, setMaintenanceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [machinesRes, typesRes] = await Promise.all([
          axios.get("https://sfl-machinemanagement.vercel.app/api/machines"),
          axios.get(
            "https://sfl-machinemanagement.vercel.app/api/maintenancetype"
          ),
        ]);
        if (machinesRes.data && Array.isArray(machinesRes.data.machines)) {
          setMachineNames(machinesRes.data.machines);
        } else {
          throw new Error("Invalid machine data format");
        }
        if (typesRes.data && Array.isArray(typesRes.data.maintenancetypes)) {
          setMaintenanceTypes(typesRes.data.maintenancetypes);
        } else {
          throw new Error("Invalid maintenance type data format");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://sfl-machinemanagement.vercel.app/api/maintenance/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newName,
            newMtype,
            newScheduledDate: newScheduledDate
              ? newScheduledDate.toISOString()
              : null,
            newScheduledTime: newScheduledTime
              ? newScheduledTime.toTimeString().split(" ")[0]
              : null,
            newMparts,
            newTechnicianemail,
            newDurationStartDate: newDurationStartDate
              ? newDurationStartDate.toISOString()
              : null,
            newDurationEndDate: newDurationEndDate
              ? newDurationEndDate.toISOString()
              : null,
            newDurationStartTime: newDurationStartTime
              ? newDurationStartTime.toTimeString().split(" ")[0]
              : null,
            newDurationEndTime: newDurationEndTime
              ? newDurationEndTime.toTimeString().split(" ")[0]
              : null,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update");
      } else {
        toast.success("Maintenance details updated successfully!");
        setTimeout(() => {
          window.location.reload(); // Reload the page after showing the toast message
        }, 1600);
      }
    } catch (error) {
      console.error("Error updating maintenance:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full rounded-md py-1 px-3 border hover:bg-accent text-sm">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="px-10">
        <DialogHeader>
          <DialogTitle>Edit Maintenance Details</DialogTitle>
        </DialogHeader>
        <Separator />
        {error && <p>Error: {error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className="max-h-[26rem] overflow-y-auto p-1"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#555 #f1f1f1" }}
          >
            <div className="grid gap-4">
              <div className="grid items-center gap-1">
                <Label htmlFor="name">Machine Name:</Label>
                <Select value={newName} onValueChange={setNewName}>
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
                <Label htmlFor="mtype">Maintenance Type:</Label>
                <Select value={newMtype} onValueChange={setNewMtype}>
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
                <Label htmlFor="scheduledDate">Schedule date/time:</Label>
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="scheduledDate" className="text-xs">
                      Date:
                    </label>
                    <DatePicker
                      selected={newScheduledDate}
                      onChange={(date) => setNewScheduledDate(date)}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      className="input border p-1 rounded-md w-full text-xs"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="scheduledTime" className="text-xs">
                      Time:
                    </label>
                    <DatePicker
                      selected={newScheduledTime}
                      onChange={(time) => setNewScheduledTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      minTime={new Date().setHours(8, 0)}
                      maxTime={new Date().setHours(19, 0)}
                      className="input border p-1 rounded-md w-full text-xs"
                    />
                  </div>
                </div>
              </div>
              <div className="grid items-center gap-1">
                <Label htmlFor="mparts">Machine Parts:</Label>
                <Input
                  id="mparts"
                  value={newMparts}
                  onChange={(e) => setNewMparts(e.target.value)}
                />
              </div>
              <div className="grid items-center gap-1">
                <Label htmlFor="technicianemail">
                  Maintenance Technician Email:
                </Label>
                <Input
                  id="technicianemail"
                  value={newTechnicianemail}
                  onChange={(e) => setNewTechnicianemail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="duration">Duration:</Label>
                <div className="flex flex-col">
                  <div className="flex pb-1 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="durationStartDate" className="text-xs">
                        Start Date:
                      </label>
                      <DatePicker
                        selected={newDurationStartDate}
                        onChange={(date) => setNewDurationStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="input border p-1 rounded-md w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="durationEndDate" className="text-xs">
                        End Date:
                      </label>
                      <DatePicker
                        selected={newDurationEndDate}
                        onChange={(date) => setNewDurationEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="input border p-1 rounded-md w-full text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="durationStartTime" className="text-xs">
                        Start Time:
                      </label>
                      <DatePicker
                        selected={newDurationStartTime}
                        onChange={(time) => setNewDurationStartTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="HH:mm"
                        minTime={new Date().setHours(8, 0)}
                        maxTime={new Date().setHours(19, 0)}
                        className="input border p-1 rounded-md w-full text-xs"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="durationEndTime" className="text-xs">
                        End Time:
                      </label>
                      <DatePicker
                        selected={newDurationEndTime}
                        onChange={(time) => setNewDurationEndTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="HH:mm"
                        minTime={new Date().setHours(8, 0)}
                        maxTime={new Date().setHours(19, 0)}
                        className="input border p-1 rounded-md w-full text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Separator />
        <DialogFooter>
          <Button onClick={handleSubmit} className="px-8">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

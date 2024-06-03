import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import ToastNotifications from "@/components/toast-notification";

export default function ChangeStatus({ id, status, onUpdate }) {
  const [newStatus, setNewStatus] = useState(status);

  const handleSubmit = async () => {
    const updatedStatus = newStatus === "Active" ? "Inactive" : "Active";
    try {
      const res = await axios.put(
        `https://sfl-machinemanagement.vercel.app/api/statusupdate/${id}`,
        {
          newStatus: updatedStatus,
        }
      );
      if (res.status === 200) {
        const updatedMachine = res.data.machine;
        setNewStatus(updatedMachine.status);
        onUpdate(id, updatedMachine.status);
        toast.success("Machine status updated successfully!"); // Display success message
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating machine:", error);
    }
  };

  return (
    <Dialog>
      <ToastNotifications />

      <DialogTrigger asChild>
        <button
          className={`${
            newStatus === "Active" ? "bg-green-600" : "bg-red-600"
          } border rounded-md px-3 py-2 text-white`}
        >
          {newStatus}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            Are you sure you want to change the status of this machine?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end space-x-2">
            <Button type="submit">Confirm</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

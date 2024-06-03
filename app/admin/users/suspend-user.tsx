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
import { SiTicktick } from "react-icons/si";
import { MdBlock } from "react-icons/md";
import { toast } from "react-toastify";

export default function SuspendUser({ id, status, onUpdate }) {
  const [newStatus, setNewStatus] = useState(status);

  const handleSubmit = async () => {
    const updatedStatus = newStatus === "Approved" ? "Suspended" : "Approved";
    try {
      const res = await axios.put(
        `https://sfl-machinemanagement.vercel.app/api/suspenduser/${id}`,
        {
          newStatus: updatedStatus,
        }
      );
      if (res.status === 200) {
        const updatedMachine = res.data.machine;
        setNewStatus(updatedMachine.status);
        onUpdate(id, updatedMachine.status);
        toast.success("Machine status updated successfully!"); // Display success message
        setTimeout(() => {
          window.location.reload(); // Reload the page after showing the toast message
        }, 1200);
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating machine:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {newStatus === "Approved" ? (
          <button className="border p-1 rounded-md border-red-500">
            <MdBlock className="text-red-500" size={18} />
          </button>
        ) : (
          <button className="border p-1 rounded-md border-green-600">
            <SiTicktick className="text-green-600" size={18} />
          </button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            Are you sure you want to suspend this user?
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

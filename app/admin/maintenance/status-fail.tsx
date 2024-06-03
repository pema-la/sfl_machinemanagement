import { useState } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

export default function StatusFail({ id, status, onUpdate }) {
  const [newStatus, setNewStatus] = useState(status);

  const handleSubmit = async () => {
    const updatedStatus = "Failed"; // Always set status to "Done"
    try {
      const res = await axios.put(`/api/doneOrFail/${id}`, {
        newStatus: updatedStatus,
      });
      if (res.status === 200) {
        const updatedMaintenance = res.data.maintenance;
        setNewStatus(updatedMaintenance.status);
        onUpdate(id, updatedMaintenance.status);
        toast.success("Status updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1600);
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating maintenance:", error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-[#ff] border border-[#E1815B] p-1 rounded-md">
          <MdClose className="text-[#E1815B]" size={18} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will flag the maintenance as failed!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="px-6">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} className="px-6">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

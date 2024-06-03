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
import { MdCheck } from "react-icons/md";
import { toast } from "react-toastify";

export default function StatusDone({ id, status, onUpdate }) {
  const [newStatus, setNewStatus] = useState(status);

  const handleSubmit = async () => {
    const updatedStatus = "Done"; // Always set status to "Done"
    try {
      const res = await axios.put(
        `https://sfl-machinemanagement.vercel.app/api/doneOrFail/${id}`,
        {
          newStatus: updatedStatus,
        }
      );
      if (res.status === 200) {
        const updatedMaintenance = res.data.maintenance;
        setNewStatus(updatedMaintenance.status);
        onUpdate(id, updatedMaintenance.status);
        toast.success("Status updated successfully!");
        setTimeout(() => {
          window.location.reload(); // Reload the page after showing the toast message
        }, 1600);
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating maintenance:", error);
      toast.error("Error updating maintenance!");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-[#fff] border border-[#496EA4] mr-1 p-1 rounded-md">
          <MdCheck className="text-[#496EA4]" size={18} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will flag the maintenance as done!
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

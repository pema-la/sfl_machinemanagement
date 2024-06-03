import React from "react";
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
import { toast } from "react-toastify";

type DeleteMaintenanceProps = {
  id: string;
  status: "Yes" | "No";
  onUpdate: (id: string, newStatus: "Yes" | "No") => void;
};

const DeleteMaintenance: React.FC<DeleteMaintenanceProps> = ({
  id,
  status,
  onUpdate,
}) => {
  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `https://sfl-machinemanagement.vercel.app/api/deletemaintenance/${id}`,
        {
          newStatus: "Yes", // Set deleted status to "Yes"
        }
      );
      if (res.status === 200) {
        onUpdate(id, "Yes");
        toast.success("Maintenance deleted successfully!");
        setTimeout(() => {
          window.location.reload(); // Reload the page after showing the toast message
        }, 1600);
      } else {
        throw new Error("Failed to delete maintenance");
      }
    } catch (error) {
      console.error("Error deleting maintenance:", error);
      toast.error("Error deleting maintenance!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full rounded-md py-1 px-3 border hover:bg-accent text-sm">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the maintenance record!
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
};

export default DeleteMaintenance;

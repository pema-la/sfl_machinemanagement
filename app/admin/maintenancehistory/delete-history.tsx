import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
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
import ToastNotifications from "@/components/toast-notification";

export default function DeleteHistory({ id }) {
  const router = useRouter();
  const deleteMaintenance = async () => {
    try {
      const res = await fetch(
        `https://sfl-machinemanagement.vercel.app/api/maintenance?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete lab type");
      }
      toast.success("Maintenance deleted successfully!");
      setTimeout(() => {
        window.location.reload(); // Reload the page after showing the toast message
      }, 1600);
    } catch (error) {
      toast.error("Error deleting maintenance!");
      console.error("Error deleting maintenance!", error);
    }
  };
  return (
    <>
      <ToastNotifications></ToastNotifications>

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
              This action cannot be undone. This will permanently delete the
              maintenance history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="px-6">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteMaintenance} className="px-6">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

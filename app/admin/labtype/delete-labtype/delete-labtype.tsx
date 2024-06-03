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
import { MdDelete } from "react-icons/md";

export default function DeleteLabtype({ id }) {
  const router = useRouter();
  const removeLabtype = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/labtype?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete lab type");
      }
      toast.success("Lab type deleted successfully!");
      setTimeout(() => {
        window.location.reload(); // Reload the page after showing the toast message
      }, 1600);
    } catch (error) {
      toast.error("Error deleting lab type!");
      console.error("Error deleting lab type:", error);
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="bg-[#fff] border p-1 rounded-md border-[#E1815B]">
            <MdDelete className="text-[#E1815B]" size={18} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected lab type.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="px-6">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={removeLabtype} className="px-6">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

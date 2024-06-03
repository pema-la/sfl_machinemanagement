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

export default function CancelBooking({ id }) {
  const router = useRouter();
  const removeBooking = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/booking?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }
      toast.success("Booking Cancelled successfully!");
      setTimeout(() => {
        window.location.reload(); // Reload the page after showing the toast message
      }, 1600);
    } catch (error) {
      toast.error("Error cancelling!");
      console.error("Error cancelling:", error);
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="bg-[#fff] border p-1 px-3 text-sm hover:text-white rounded-md text-[#E1815B] hover:bg-[#E1815B] border-[#E1815B]">
            Cancel Booking
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will cancel your booking!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="px-6">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={removeBooking} className="px-6">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

import React from "react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface BookingDialogProps {
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
  machineName: string | null;
  timeInterval: string | null;
  selectedDate: Date | null;
  bookedBy: string | null;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  machineName,
  timeInterval,
  selectedDate,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Booking Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to book{" "}
            <span className="font-semibold">{machineName}</span> from{" "}
            <span className="font-semibold">{timeInterval}</span> on{" "}
            <span className="font-semibold">
              {selectedDate ? format(selectedDate, "PPP") : "Invalid date"}
            </span>{" "}
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="border border-[#E1815B] text-[#E1815B] px-4"
            onClick={onClose}
          >
            Cancel
          </AlertDialogCancel>
          <Button className="px-4" onClick={onConfirm}>
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookingDialog;

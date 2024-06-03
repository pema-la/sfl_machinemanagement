import React from "react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BookingAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  machineName: string | null;
  timeInterval: string | null;
  selectedDate: Date | null;
  bookedBy: string | null;
}

const BookingAlertDialog: React.FC<BookingAlertDialogProps> = ({
  isOpen,
  onClose,
  machineName,
  timeInterval,
  selectedDate,
  bookedBy,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Booking Details</AlertDialogTitle>
          <AlertDialogDescription>
            <p>Machine Name: {machineName || "N/A"}</p>
            <p>
              Booked Date: {selectedDate ? format(selectedDate, "PPP") : "N/A"}
            </p>
            <p>Booked Time: {timeInterval || "N/A"}</p>
            <p>Booked By: {bookedBy || "N/A"}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookingAlertDialog;

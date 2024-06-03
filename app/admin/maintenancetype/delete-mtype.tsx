import React from "react";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeleteMaintenancetype({ id }) {
  const router = useRouter();
  const removeLabtype = async () => {
    const confirmed = window.confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/maintenancetype?id=${id}`,
          {
            method: "DELETE",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to delete lab type");
        }
        toast.success("Maintenance type deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1600);
      } catch (error) {
        console.error("Error deleting maintenance type:", error);
        toast.error("Error deleting maintenance type!");
      }
    }
  };

  return (
    <button
      className="bg-[#fff] border rounded-md p-1 rounde-md border-[#E1815B]"
      onClick={removeLabtype}
    >
      <MdDelete className="text-[#E1815B]" size={18} />
    </button>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { MdRemoveRedEye } from "react-icons/md";
import { useState, useEffect } from "react";

export function ViewModal({ id, name, labtype, technicianemail, description }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://sfl-machinemanagement.vercel.app/api/machines/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update");
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating machine:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#ff] border rounded-md p-1 border-[#E1815B] hover:bg-[#E1815B]">
          <MdRemoveRedEye
            className="text-[#E1815B] hover:text-white"
            size={18}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>View Machine Details</DialogTitle>
        </DialogHeader>
        <Separator className="" />
        <form onSubmit={handleSubmit} className="flex flex-col pb-2">
          <div className="grid text-sm">
            <div>
              <strong>Machine Name :</strong> {name}
            </div>
            <div>
              <strong>Lab Type :</strong> {labtype}
            </div>
            <div>
              <strong>Maintenance Technician Email :</strong> {technicianemail}
            </div>
            <div>
              <strong>Description :</strong> {description}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

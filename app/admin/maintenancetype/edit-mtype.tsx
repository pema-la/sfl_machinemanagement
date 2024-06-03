"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";

interface EditLabtypeModalProps {
  id: string;
  mtype: string;
  description: string;
}

export default function EditMaintenanceType({
  id,
  mtype,
  description,
}: EditLabtypeModalProps) {
  const [newName, setNewName] = useState(mtype);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://sfl-machinemanagement.vercel.app/api/maintenancetype/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ newName, newDescription }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update");
      } else {
        toast.success("Maintenance type updated successfully");
        setTimeout(() => {
          window.location.reload(); // Reload the page after showing the toast message
        }, 1600);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating maintenance type!");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#fff] p-1 rounded-md border border-[#496EA4]">
          <MdModeEdit className="text-[#496EA4]" size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="px-10">
        <DialogHeader>
          <DialogTitle>Edit Maintenance Type Details</DialogTitle>
        </DialogHeader>
        <Separator className="" />
        <div className="grid gap-4">
          <div className="grid items-center gap-1">
            <Label htmlFor="name" className="">
              Name :
            </Label>
            <Input
              id="name"
              className=""
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            />
          </div>
          <div className="grid items-center gap-1">
            <Label htmlFor="description" className="">
              Description :
            </Label>
            <Textarea
              id="description"
              className=""
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

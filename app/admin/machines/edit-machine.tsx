import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
interface EditModalProps {
  id: string;
  name: string;
  labtype: string;
  technicianemail: string;
  description: string;
}

export function EditModal({
  id,
  name,
  labtype,
  technicianemail,
  description,
}: EditModalProps) {
  const [newName, setNewName] = useState(name);
  const [newLabtype, setNewLabtype] = useState(labtype);
  const [newTechnicianemail, setNewTechnicianemail] = useState(technicianemail);
  const [newDescription, setNewDescription] = useState(description);
  const [labTypes, setLabTypes] = useState([]);
  const router = useRouter();

  // Fetch lab types from the backend
  useEffect(() => {
    async function fetchLabTypes() {
      try {
        const response = await fetch(
          `https://sfl-machinemanagement.vercel.app/api/labtype`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch lab types");
        }
        const data = await response.json();
        setLabTypes(data.labtypes);
      } catch (error) {
        console.error("Error fetching lab types:", error);
      }
    }
    fetchLabTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://sfl-machinemanagement.vercel.app/api/machines/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newName,
            newLabtype,
            newTechnicianemail,
            newDescription,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update");
      } else {
        toast.success("Machine details updated successfully!");
        setTimeout(() => {
          window.location.reload(); // Reload the page after showing the toast message
        }, 1600);
      }
    } catch (error) {
      console.error("Error updating machine:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#fff] border p-1 rounded-md border-[#496EA4] hover:bg-[#496EA4]">
          <MdModeEdit className="text-[#496EA4] hover:text-white" size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="px-10">
        <DialogHeader>
          <DialogTitle>Edit Machine Details</DialogTitle>
        </DialogHeader>
        <Separator className="" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid gap-4">
            <div className="grid items-center gap-1">
              <Label htmlFor="name">Machine Name:</Label>
              <Input
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="grid items-center gap-1">
              <Label htmlFor="labtype">Lab Type:</Label>
              <Select value={newLabtype} onValueChange={setNewLabtype}>
                <SelectTrigger>
                  <SelectValue>{newLabtype}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {labTypes.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid items-center gap-1">
              <Label htmlFor="technicianemail">
                Maintenance Technician Email:
              </Label>
              <Input
                id="technicianemail"
                value={newTechnicianemail}
                onChange={(e) => setNewTechnicianemail(e.target.value)}
              />
            </div>
            <div className="grid items-center gap-1">
              <Label htmlFor="description">Description:</Label>
              <Textarea
                id="description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="font-bold text-white w-fit" type="submit">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

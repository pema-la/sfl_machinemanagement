import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";

export function AllowMachine({ user }) {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMachines() {
      try {
        const response = await fetch(
          `https://sfl-machinemanagement.vercel.app/api/machines`
        );
        if (response.ok) {
          const data = await response.json();
          const allowedMachines =
            JSON.parse(localStorage.getItem(`allowedMachines-${user._id}`)) ||
            [];
          const filteredMachines = data.machines.filter(
            (machine) => !allowedMachines.includes(machine._id)
          );
          setMachines(filteredMachines);
        } else {
          console.error("Failed to fetch machines");
        }
      } catch (error) {
        console.error("Failed to fetch machines:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMachines();
  }, []);

  const handleCheckboxChange = (machineId) => {
    setMachines((prevMachines) =>
      prevMachines.map((machine) =>
        machine._id === machineId
          ? { ...machine, checked: !machine.checked }
          : machine
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedMachineIds = machines
      .filter((machine) => machine.checked)
      .map((machine) => machine._id);
    try {
      const response = await fetch(
        `https://sfl-machinemanagement.vercel.app/api/allowmachine`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            cid: user.cid,
            contact: user.contact,
            password: user.password,
            machines: selectedMachineIds,
          }),
        }
      );

      if (response.ok) {
        const allowedMachines =
          JSON.parse(localStorage.getItem(`allowedMachines-${user._id}`)) || [];
        localStorage.setItem(
          `allowedMachines-${user._id}`,
          JSON.stringify([...allowedMachines, ...selectedMachineIds])
        );
        setMachines((prevMachines) =>
          prevMachines.filter(
            (machine) => !selectedMachineIds.includes(machine._id)
          )
        );
        toast.success("Machine details updated successfully!");
        setTimeout(() => {
          window.location.reload(); // Reload the page after showing the toast message
        }, 1600);
      } else {
        const data = await response.json();
        toast.error(`Failed to update machine details: ${data.error}`);
      }
    } catch (error) {
      toast.error(`Network error: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Loading machines...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#fff] border p-1 rounded-md border-[#496EA4] hover:bg-[#496EA4]">
          <BsPlusCircle className="text-[#496EA4] hover:text-white" size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="px-10">
        <DialogHeader>
          <DialogTitle>Allow Machine</DialogTitle>
        </DialogHeader>
        <Separator />
        <form onSubmit={handleSubmit}>
          <div className="">
            {machines.map((machine) => (
              <div key={machine._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`machine-${machine._id}`}
                  checked={machine.checked}
                  onChange={() => handleCheckboxChange(machine._id)}
                />
                <label
                  htmlFor={`machine-${machine._id}`}
                  className="text-sm font-medium leading-none"
                >
                  {machine.name}
                </label>
              </div>
            ))}
          </div>
          <Separator />
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

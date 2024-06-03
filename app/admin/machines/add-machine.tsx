"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ToastNotifications from "@/components/toast-notification";

const MachineSchema = z.object({
  name: z.string().min(1, "Machine name is required"),
  labtype: z.string().min(1, "Lab type is required"),
  technicianemail: z.string().min(1, "Technician email is required"),
  description: z.string().min(1, "Description is required"),
});

export function AddMachine() {
  const formMethods = useForm({
    resolver: zodResolver(MachineSchema),
    defaultValues: {
      name: "",
      labtype: "",
      technicianemail: "",
      description: "",
    },
  });

  const [labTypes, setLabTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://sfl-machinemanagement.vercel.app/api/labtype"
        ); // Assuming your GET route is /api/labtypes
        setLabTypes(response.data.labtypes); // Assuming the data structure contains an array of lab types
      } catch (error) {
        console.error("Error fetching lab types:", error);
      }
    }
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "https://sfl-machinemanagement.vercel.app/api/machines",
        data
      ); // Assuming your POST route is /api/machine
      formMethods.reset(); // Clear input fields
      toast.success("Machine added successfully");
      setTimeout(() => {
        window.location.reload(); // Reload the page after showing the toast message
      }, 1600);
    } catch (error) {
      console.error("Error adding machine:", error);
      toast.error("Error adding machine!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#E1815B] bg-opacity-5 border-2 border-[#E1815B] px-6 text-[#E1815B] hover:text-[#fff] hover:bg-[#E1815B] font-bold">
          Add Machine
        </Button>
      </DialogTrigger>
      <DialogContent className="px-10">
        <DialogHeader>
          <DialogTitle>Add Machine</DialogTitle>
        </DialogHeader>
        <Separator></Separator>
        <Form {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="grid gap-4 "
          >
            <FormField
              control={formMethods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="">
                    Machine Name :
                  </FormLabel>
                  <FormControl>
                    <Input id="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="labtype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="labtype" className="">
                    Lab Type :
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="labtype" className="relative">
                        <SelectValue>{field.value}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {labTypes.map((type) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="technicianemail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="technicianemail" className="">
                    Maintenance Technician Email :
                  </FormLabel>
                  <FormControl>
                    <Input id="technicianemail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description" className="">
                    Description :
                  </FormLabel>
                  <FormControl>
                    <Textarea id="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                className="bg-[#E1815B] text-white font-bold px-8"
              >
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <ToastNotifications />
    </Dialog>
  );
}

"use client";
import React from "react";
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

// Define the validation schema for the lab type form
const LabTypeSchema = z.object({
  name: z.string().min(1, "Lab type is required"),
  description: z.string().min(1, "Description is required"),
});

export function AddLabtype() {
  // Initialize the form with react-hook-form and zodResolver
  const formMethods = useForm({
    resolver: zodResolver(LabTypeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "https://sfl-machinemanagement.vercel.app/api/labtype",
        data
      );
      formMethods.reset(); // Clear input fields
      toast.success("Lab type added successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } catch (error) {
      console.error("Error adding lab type:", error);
      toast.error("Error adding lab type !");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#E1815B] bg-opacity-5 border-2 border-[#E1815B] px-6 text-[#E1815B] hover:text-[#fff] hover:bg-[#E1815B] font-bold">
          Add Lab Type
        </Button>
      </DialogTrigger>
      <DialogContent className="px-10">
        <DialogHeader>
          <DialogTitle>Add Lab Type</DialogTitle>
        </DialogHeader>
        <Separator></Separator>
        <Form {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)} className="">
            <FormField
              control={formMethods.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="">
                    Name :
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
              <Button type="submit" className="text-white font-bold px-8">
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <ToastNotifications></ToastNotifications>
    </Dialog>
  );
}

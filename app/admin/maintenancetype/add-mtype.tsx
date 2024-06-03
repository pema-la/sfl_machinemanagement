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
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
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

const FormSchema = z.object({
  mtype: z.string().min(1, "Maintenance type is required"),
  description: z.string().min(1, "Description is required"),
});

export function AddMaintenancetype() {
  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mtype: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("api/maintenancetype", data);
      formMethods.reset(); // Clear input fields
      toast.success("Maintenance type added successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } catch (error) {
      console.error("Error adding maintenance type:", error);
      toast.error("Error adding maintenance type");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#E1815B] bg-opacity-5 border-2 border-[#E1815B] px-6 text-[#E1815B] hover:text-[#fff] hover:bg-[#E1815B] font-bold">
          Add Maintenance Type
        </Button>
      </DialogTrigger>
      <DialogContent className="px-10">
        <DialogHeader>
          <DialogTitle>Add Maintenance Type</DialogTitle>
        </DialogHeader>
        <Separator></Separator>
        <Form {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="grid gap-4"
          >
            <FormField
              control={formMethods.control}
              name="mtype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="">
                    Maintenance Type :
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
    </Dialog>
  );
}

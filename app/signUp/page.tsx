"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
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
import { toast } from "react-toastify";
import ToastNotifications from "@/components/toast-notification";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name!" }),
  email: z.string().min(1, { message: "Please enter an email!" }),
  cid: z.string().min(11, { message: "CID number should be 11 digits" }),
  contact: z.string().min(8, { message: "Contact number should be 8 digits." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const validateEmailFormat = (email) => {
  const errors = [];
  if (!/^[a-z]/.test(email)) {
    errors.push("Email should start with a lowercase letter.");
  }
  if (!email.includes("@")) {
    errors.push("Email should contain '@'.");
  }
  if (!email.endsWith(".com")) {
    errors.push("Email should end with '.com'.");
  }
  if (errors.length > 0) {
    errors.forEach((error) => toast.error(error));
    return false;
  }
  return true;
};

const validatePasswordFormat = (password) => {
  const errors = [];
  if (!/[a-zA-Z]/.test(password)) {
    errors.push("Password should contain atleast one letter.");
  }
  if (!/\d/.test(password)) {
    errors.push("Password should contain atleast one number.");
  }
  if (errors.length > 0) {
    errors.forEach((error) => toast.error(error));
    return false;
  }
  return true;
};

export default function SignUp() {
  const router = useRouter();

  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      cid: "",
      contact: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    if (
      !validateEmailFormat(data.email) ||
      !validatePasswordFormat(data.password)
    ) {
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.errors) {
          errorData.errors.forEach((error) => toast.error(error));
        } else {
          throw new Error("Failed to create a user.");
        }
        return;
      }
      toast.success("Registration was successful!");
      setTimeout(() => {
        router.push("/login");
      }, 2300); // Redirect after 3 seconds
    } catch (error) {
      console.log(error); // Log any errors
      toast.error("An error occurred while registering.");
    }
  };

  return (
    <main className="bg-white h-screen flex items-center justify-center">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex flex-col items-center justify-center bg-[rgba(225,129,91,0.3)]">
          <h1 className="text-5xl text-[#496EA4] font-bold pb-2">
            Get Started!
          </h1>
          <p className="font-medium pb-4">Get started in a few clicks!</p>
          <div className="my-5 relative">
            <Image
              className="object-cover"
              src="/sfl_logo.png"
              alt="bg"
              width={300}
              height={300}
            />
          </div>
          <h1 className="text-2xl text-[#E1815B] font-bold ">
            JNWSFL Machine Management System
          </h1>
        </div>

        <div className="text-black flex items-center justify-center flex-col">
          <div className="my-4">
            {/* <h3 className="text-2xl text-[#496EA4] font-bold">Sign Up</h3> */}
          </div>
          <Form {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="w-2/4 space-y-6"
            >
              <FormField
                control={formMethods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="cid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CID</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full bg-[#E1815B]" type="submit">
                Sign Up
              </Button>
              <div className="text-sm ">
                Already have an account?
                <Link
                  href="/login"
                  className="text-sm font-semibold pl-2 text-blue-700"
                >
                  Sign In
                </Link>
              </div>
            </form>
            <ToastNotifications />
          </Form>
        </div>
      </div>
    </main>
  );
}

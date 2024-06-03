// "use client";
// import React from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import Image from 'next/image';
// import { toast } from '@/components/ui/use-toast';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import Link from 'next/link';

// const FormSchema = z.object({
//     email: z.string().min(1, {
//         message: "Please enter an email!",
//     }),
//     password: z.string().min(1, {
//         message: "Please enter your password.",
//     }),
// });

// export default function SignIn() {
//     const router = useRouter();

//     const formMethods = useForm({
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//             email: "",
//             password: "",
//         },
//     });

//     const onSubmit = async (data) => {
//         try {
//             const res = await fetch('/api/auth', {
//                 method: 'POST',
//                 headers: {
//                     'Content-type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!res.ok) {
//                 throw new Error("Failed to sign in.");
//             }

//             const responseData = await res.json();
//             const { role } = responseData;

//             toast({
//                 title: "Login Successful",
//                 description: "Redirecting to dashboard...",
//             });

//             if (role === 'admin') {
//                 router.push("/admin/dashboard");
//             } else if (role === 'user') {
//                 router.push("/user/book-machines");
//             } else {
//                 throw new Error("Invalid role.");
//             }
//         } catch (error) {
//             console.log(error);
//             toast({
//                 title: "Login Failed",
//                 description: "Invalid credentials.",
//                 status: "error",
//             });
//         }
//     };

//     return (
//         <main className="bg-white h-screen flex items-center justify-center">
//             <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
//                 <div className="hidden md:flex flex-col items-center justify-center bg-[rgba(225,129,91,0.3)]">
//                     <h1 className="text-5xl text-[#496EA4] font-bold pb-2">Welcome Back!</h1>
//                     <p className='font-medium pb-4'>Sign in to access your existing account</p>
//                     <div className="my-5 relative">
//                         <Image className="object-cover" src="/sfl_logo.png" alt="bg" width={300} height={300} />
//                     </div>
//                     <h1 className="text-2xl text-[#E1815B] font-bold ">JNWSFL Machine Management System</h1>
//                 </div>

//                 <div className="text-black flex items-center justify-center flex-col">
//                     <div className="my-4">
//                         <h3 className="text-2xl mb-4 text-[#496EA4] font-bold">Login</h3>
//                     </div>
//                     <Form {...formMethods}>
//                         <form onSubmit={formMethods.handleSubmit(onSubmit)} className="sm:w-3/4 lg:w-2/4 space-y-6">
//                             <FormField
//                                 control={formMethods.control}
//                                 name="email"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Email</FormLabel>
//                                         <FormControl>
//                                             <Input {...field} type="email" />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={formMethods.control}
//                                 name="password"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Password</FormLabel>
//                                         <FormControl>
//                                             <Input {...field} type="password" />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <Button className="w-full bg-[#E1815B]" type="submit">
//                                 Log In
//                             </Button>
//                         </form>
//                     </Form>
//                     <div className='text-sm pt-4'>Are you new here?
//                         <Link href="/signUp" className='text-sm pl-2 text-blue-700'>Create an Account</Link>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

import React from 'react';

function Page() {
  return (
    <div>
      Welcome to the home page.
    </div>
  );
}

export default Page;
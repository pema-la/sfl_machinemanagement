"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import PageWrapper from "@/components/pagewrapper";
import { checkSession } from "../checkSession";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const session = checkSession();
    if (!session || session.role !== "admin") {
      router.push("/login");
    }
  }, [router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Header />
          <Sidebar />
          <PageWrapper>{children}</PageWrapper>
        </div>
      </body>
    </html>
  );
}



// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Inter } from "next/font/google";
// import "../globals.css";
// import Header from "@/components/header";
// import { Sidebar } from "@/components/sidebar";
// import PageWrapper from "@/components/pagewrapper";
// import { checkSession } from "../checkSession";

// const inter = Inter({ subsets: ["latin"] });

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const [isAuthorized, setIsAuthorized] = useState(true);

//   useEffect(() => {
//     const session = checkSession();
//     if (!session || session.role !== "admin") {
//       setIsAuthorized(false);
//     }
//   }, [router]);

//   if (!isAuthorized) {
//     return (
//       <html lang="en">
//         <body className={inter.className}>
//           <div className="flex min-h-screen justify-center items-center">
//             <h1 className="text-4xl font-bold text-red-500">Not Authorized</h1>
//           </div>
//         </body>
//       </html>
//     );
//   }

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="flex min-h-screen">
//           <Header />
//           <Sidebar />
//           <PageWrapper>{children}</PageWrapper>
//         </div>
//       </body>
//     </html>
//   );
// }

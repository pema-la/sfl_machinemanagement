"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/user-header";
import { Sidebar } from "@/components/user-sidebar";
import PageWrapper from "@/components/pagewrapper";
import { checkSession } from "../checkSession";

const inter = Inter({ subsets: ["latin"] });

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const session = checkSession();
    if (!session || session.role !== "user") {
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

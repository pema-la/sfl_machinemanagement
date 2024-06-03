"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastNotifications from "@/components/toast-notification";
import ProtectedPage from "./protectedPage";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Render ProtectedPage and ToastNotifications only on the client */}
        {isClient ? (
          <>
            <ProtectedPage>{children}</ProtectedPage>
            <ToastNotifications />
          </>
        ) : (
          // Fallback content while waiting for client-side rendering
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        )}
      </body>
    </html>
  );
}

// "use client";
// import React from "react";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import ToastNotifications from "@/components/toast-notification";
// import ProtectedPage from "./protectedPage";

// const inter = Inter({ subsets: ["latin"] });

// const RootLayout: React.FC = ({ children }) => {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ProtectedPage>{children}</ProtectedPage>
//         <ToastNotifications />
//       </body>
//     </html>
//   );
// };

//  RootLayout;

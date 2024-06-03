// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuGroup,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "./ui/button";

// export function Profile() {
//   const router = useRouter();
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const sessionData = localStorage.getItem("session");
//       if (sessionData) {
//         setSession(JSON.parse(sessionData));
//       }
//     }
//   }, []);

//   const handleLogout = (event) => {
//     event.preventDefault();
//     try {
//       // Clear the session from localStorage
//       localStorage.removeItem("session");
//       // Clear the session state
//       setSession(null);
//       console.log("Logout successful");
//       // Redirect to the login page after logging out
//       router.push("/login");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   const getInitials = (name) => {
//     const names = name.split(" ");
//     const initials = names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
//     return initials.toUpperCase();
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           className=" relative
//          text-[#E1815B] text-base h-10 w-10 rounded-full bg-[#E1815B] bg-opacity-15 border border-[#E1815B] hover:text-white hover:bg-[#E1815B]"
//         >
//           {session ? getInitials(session.name) : "..."}
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className=" z-[99998] mr-2">
//         <DropdownMenuLabel>
//           <div className="flex flex-col space-y-2">
//             {session && (
//               <>
//                 <p className="text-sm ">{session.name}</p>
//                 <p className="text-xs font-normal">{session.email}</p>
//               </>
//             )}
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {/* <DropdownMenuItem> */}
//         <form onSubmit={handleLogout} className="p-2">
//           <Button
//             type="submit"
//             className="bg-[#E1815B] w-full text-sm font-semibold text-white text-center rounded-md"
//           >
//             Log Out
//           </Button>
//         </form>
//         {/* </DropdownMenuItem> */}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export function Profile() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionData = localStorage.getItem("session");
      if (sessionData) {
        setSession(JSON.parse(sessionData));
      }
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    try {
      // Clear the session from localStorage
      localStorage.removeItem("session");
      // Clear the session state
      setSession(null);
      console.log("Logout successful");
      // Redirect to the login page after logging out
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
    return initials.toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative text-[#E1815B] text-base h-10 w-10 rounded-full bg-[#E1815B] bg-opacity-15 border border-[#E1815B] hover:text-white hover:bg-[#E1815B]">
          {session ? getInitials(session.name) : "..."}
        </Button>
      </DropdownMenuTrigger>
      {session && (
        <DropdownMenuContent className="z-[99998] mr-2">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">{session.name}</p>
              <p className="text-xs font-normal">{session.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <form onSubmit={handleLogout} className="p-2">
            <Button
              type="submit"
              className="bg-[#E1815B] w-full text-sm font-semibold text-white text-center rounded-md"
            >
              Log Out
            </Button>
          </form>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function checkSession() {
  if (typeof localStorage !== "undefined") {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session && session.expiresAt > Date.now()) {
      return session;
    } else {
      localStorage.removeItem("session");
    }
  }
  return null;
}

interface ProtectedPageProps {
  children: React.ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const session = checkSession();
    if (!session) {
      router.push("/login");
    } else {
      setLoading(false);
    }
    const interval = setInterval(() => {
      const session = checkSession();
      if (!session) {
        router.push("/login");
      }
    }, 50000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [router]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return <>{children}</>;
};

export default ProtectedPage;

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// function checkSession() {
//   if (typeof localStorage !== "undefined") {
//     const session = JSON.parse(localStorage.getItem("session"));
//     if (session && session.expiresAt > Date.now()) {
//       return session;
//     } else {
//       localStorage.removeItem("session");
//     }
//   }
//   return null;
// }

// interface ProtectedPageProps {
//   children: React.ReactNode;
// }

// const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const session = checkSession();
//     if (!session) {
//       router.replace("/login");
//     } else {
//       setLoading(false);
//     }
//     const handlePopState = (event) => {
//       if (!checkSession()) {
//         router.replace("/login");
//       }
//     };
//     window.addEventListener("popstate", handlePopState);
//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, [router]);
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   return <>{children}</>;
// };

// export default ProtectedPage;

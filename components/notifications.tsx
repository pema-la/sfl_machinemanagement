import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdNotifications } from "react-icons/md";
import axios from "axios";

export function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await axios.get("/api/notifications");
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
    fetchNotifications();

    // Remove notifications after one day
    const notificationCleanup = setTimeout(() => {
      setNotifications([]);
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(notificationCleanup);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-transparent rounded-full h-9 w-9 flex items-center justify-center">
          <MdNotifications className="text-[#E1815B] " size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 px-3 mr-4">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={notification._id} className="text-xs">
              Scheduled maintenance is due for{" "}
              <strong>{notification.name}</strong> today. Please proceed with
              the necessary tasks.
              {index < notifications.length - 1 && (
                <DropdownMenuSeparator key={`separator-${notification._id}`} />
              )}
            </div>
          ))
        ) : (
          <div className="text-sm">No notifications for today.</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

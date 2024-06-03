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

export function UserNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await axios.get("/api/notifications");
        const notifications = response.data.notifications;

        // Filter out notifications older than 1 day
        const filteredNotifications = notifications.filter((notification) => {
          const today = new Date();
          const notificationDate = new Date(notification.durationStartDate);
          const timeDifference = today - notificationDate;
          const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

          return timeDifference <= oneDay;
        });

        setNotifications(filteredNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
    fetchNotifications();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(`1970-01-01T${timeString}Z`).toLocaleTimeString(
      undefined,
      options,
      { hour12: false }
    );
  };

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
            <div key={notification._id}>
              <div className="text-xs">
                <strong>{notification.name}</strong> will be under maintenance
                from{" "}
                <strong>{formatDate(notification.durationStartDate)}</strong> to{" "}
                <strong>{formatDate(notification.durationEndDate)}</strong> at{" "}
                <strong>{formatTime(notification.durationStartTime)}</strong> to{" "}
                <strong>{formatTime(notification.durationEndTime)}</strong>.
              </div>
              {index < notifications.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))
        ) : (
          <div className="text-sm">No notifications for today.</div>
        )}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

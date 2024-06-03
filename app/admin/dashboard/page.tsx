"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LuMicroscope } from "react-icons/lu";
import { BsBookmarkCheck } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { Overview } from "@/app/admin/dashboard/Overview";
import axios from "axios";
import RecentHistory from "./recent-bookings";
import { RadialChart } from "./available-machines";

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [machineCount, setMachineCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userResponse = await axios.get(
          "https://sfl-machinemanagement.vercel.app/api/usercount"
        );
        setUserCount(userResponse.data.count);

        const machineResponse = await axios.get(
          "https://sfl-machinemanagement.vercel.app/api/machineCount"
        );
        setMachineCount(machineResponse.data.count);

        const bookingResponse = await axios.get(
          "https://sfl-machinemanagement.vercel.app/api/bookingcount"
        );
        setBookingCount(bookingResponse.data.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      <div className="flex-1 space-y-4 pt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Total Machines
              </CardTitle>
              <div className="rounded-full p-2 bg-[#f3e8ff]">
                <LuMicroscope
                  size={25}
                  className="text-[#ab5df8]"
                ></LuMicroscope>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold">{machineCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <div className="bg-[#d2f4ee] rounded-full p-2">
                <BsBookmarkCheck
                  size={25}
                  className="text-[#309d89]"
                ></BsBookmarkCheck>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold">{bookingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <div className="bg-[#fee2e2] p-2 rounded-full">
                <BiUser size={25} className="text-[#f36c6c]"></BiUser>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold">{userCount}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-5">
            <CardHeader>
              <CardTitle className="text-xl">Most Booked Machines</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          {/* Assuming RadialChart component and Overview component are correctly implemented */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Machine Availability</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Assuming RadialChart component is correctly implemented */}
              <RadialChart />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-7">
            <CardHeader>
              <CardTitle className="text-xl">Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentHistory />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

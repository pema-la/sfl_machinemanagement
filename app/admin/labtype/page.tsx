"use client";

import React, { useState, useEffect } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { AddLabtype } from "./add-labtype/add-labtype";
import axios from "axios"; // Import axios for making HTTP requests

export default function DemoPage() {
  const [labTypes, setLabTypes] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://sfl-machinemanagement.vercel.app/api/labtype"
        ); // Assuming your GET route is /api/labtypes
        const labTypesData = response.data.labtypes.map((labType, index) => ({
          ...labType,
          slnumber: index + 1,
        }));
        setLabTypes(labTypesData);
      } catch (error) {
        console.error("Error fetching lab types:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Lab Type</h2>
      <div className="flex-1 space-y-4 pt-4 ">
        <div className="grid gap-4 p-4 border bg-white rounded-md">
          <div className="flex items-center justify-end">
            <AddLabtype />
          </div>
          <div>
            <DataTable columns={columns} data={labTypes} />
          </div>
        </div>
      </div>
    </>
  );
}

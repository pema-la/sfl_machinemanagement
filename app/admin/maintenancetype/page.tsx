"use client";
import React, { useState, useEffect } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { AddMaintenancetype } from "./add-mtype";
import axios from "axios";

export default function MaintenanceType() {
  const [maintenanceType, setMaintenanceType] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/maintenancetype"
        ); // Assuming your GET route is /api/labtypes
        const maintenanceTypesData = response.data.maintenancetypes.map(
          (maintenanceType, index) => ({
            ...maintenanceType,
            slnumber: index + 1,
          })
        );
        setMaintenanceType(maintenanceTypesData);
      } catch (error) {
        console.error("Error fetching maintenance types:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Maintenance Type</h2>
      <div className="flex-1 space-y-4 pt-4">
        <div className="grid gap-4 p-4 px-3 border bg-white rounded-md">
          <div className="flex items-center justify-end">
            <AddMaintenancetype />
          </div>
          <div>
            <DataTable columns={columns} data={maintenanceType} />
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import * as React from "react";
import { DataTable } from "./data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Payment, columns } from "./columns";
import { ScheduleMaintenance } from "./schedule-maintenance";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Maintenance() {
  const [maintenances, setMaintenance] = useState<Payment[]>([]);
  const [labTypes, setLabTypes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch lab types
        const labTypesResponse = await axios.get("api/labtype");
        const labTypesData = labTypesResponse.data.labtypes.map(
          (labType) => labType.name
        );
        // Sort lab types alphabetically
        const sortedLabTypes = labTypesData.sort((a, b) => a.localeCompare(b));
        setLabTypes(sortedLabTypes);

        // Set the active tab to the first lab type fetched from the database
        if (sortedLabTypes.length > 0) {
          setActiveTab(sortedLabTypes[0]);
        }

        // Fetch machines
        const machinesResponse = await axios.get("api/machines");
        const machines = machinesResponse.data.machines;

        // Fetch maintenance records
        const maintenanceResponse = await axios.get("api/maintenance");
        const maintenanceData = maintenanceResponse.data.maintenance;

        // Join maintenance records with machines to get the lab type
        const joinedData = maintenanceData.map((maintenance) => {
          const machine = machines.find(
            (machine) => machine.name === maintenance.name
          );
          return {
            ...maintenance,
            labtype: machine ? machine.labtype : "Unknown",
          };
        });

        setMaintenance(joinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Maintenance</h2>
      <div className="flex-1 space-y-4 pt-4">
        <div className="grid px-3 pt-4 border bg-white rounded-md">
          <Tabs value={activeTab}>
            <div className="flex items-center justify-between">
              <TabsList className="bg-[#E1815B] bg-opacity-10">
                {labTypes.map((labType) => (
                  <TabsTrigger
                    key={labType}
                    value={labType}
                    onClick={() => setActiveTab(labType)} // Set the active tab on click
                  >
                    {labType}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {labTypes.map((labType) => (
              <TabsContent key={labType} value={labType} className="">
                {activeTab === labType && (
                  <div className="pt-2">
                    <DataTable
                      columns={columns}
                      data={maintenances
                        .filter(
                          (maintenance) => maintenance.labtype === labType
                        )
                        .map((maintenance, index) => ({
                          ...maintenance,
                          slnumber: index + 1,
                        }))}
                    />
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}

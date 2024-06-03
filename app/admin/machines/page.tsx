"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Payment, columns } from "./columns";
import axios from "axios";

// Utility function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export default function DemoPage() {
  const [machines, setMachines] = useState<Payment[]>([]);
  const [labTypes, setLabTypes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const labTypesResponse = await axios.get(
          "https://sfl-machinemanagement.vercel.app/api/labtype"
        );
        const labTypesData = labTypesResponse.data.labtypes.map(
          (labType) => labType.name
        );
        const sortedLabTypes = labTypesData.sort((a, b) => a.localeCompare(b));
        setLabTypes(sortedLabTypes);

        if (sortedLabTypes.length > 0) {
          setActiveTab(sortedLabTypes[0]);
        }
        const machinesResponse = await axios.get(
          "https://sfl-machinemanagement.vercel.app/api/machines"
        );
        const machinesData = machinesResponse.data.machines.map(
          (machine, index) => ({
            ...machine,
            slnumber: index + 1,
            description: truncateText(machine.description, 50), // Truncate description to 30 characters
          })
        );
        setMachines(machinesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">Machines</h2>
      <div className="flex-1 space-y-4 pt-4">
        <div className="grid px-3 pt-4 border bg-white rounded-md">
          <Tabs value={activeTab}>
            <div className="flex items-center justify-between">
              <TabsList className="bg-[#E1815B] bg-opacity-10">
                {labTypes.map((labType) => (
                  <TabsTrigger
                    key={labType}
                    value={labType}
                    onClick={() => setActiveTab(labType)}
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
                      data={machines
                        .filter((machine) => machine.labtype === labType)
                        .map((machine, index) => ({
                          ...machine,
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

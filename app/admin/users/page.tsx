"use client";
import * as React from "react";
import { DataTable } from "./data-table";
import { NewUser, columns } from "./columns";

async function getData(): Promise<NewUser[]> {
  const response = await fetch("http://localhost:3000/api/users"); 
  const data = await response.json();
  return data.users.map((user, index) => ({ ...user, slnumber: index + 1 }));
}

export default function DemoPage() {
  const [data, setData] = React.useState<NewUser[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const userData = await getData();
      setData(userData);
    }
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Users</h2>
      <div className="flex-1 space-y-4 pt-4">
        <div className="grid gap-4 px-3 border p-4 bg-white rounded-md">
          <div className="pt-2">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

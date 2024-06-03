import React, { useState, useEffect } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  LabelList,
} from "recharts";
import axios from "axios";

interface MachineData {
  name: string;
  value: number;
  fill: string;
}

const style = {
  top: 0,
  left: 0,
  lineHeight: "17px",
  fontSize: "14px",
};

export function RadialChart() {
  const [data, setData] = useState<MachineData[]>([]); // Explicitly typed as an array of MachineData

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/machines");
        const machines = response.data.machines;

        const totalMachines = machines.length;
        const activeMachines = machines.filter(
          (machine) => machine.status === "Active"
        ).length;
        const inactiveMachines = totalMachines - activeMachines;

        const activePercentage = (activeMachines / totalMachines) * 100;
        const inactivePercentage = (inactiveMachines / totalMachines) * 100;

        setData([
          {
            name: `Total Machines (${totalMachines})`,
            value: 100,
            fill: "#8dd1e1",
          },
          {
            name: `Inactive Machines (${inactiveMachines})`,
            value: inactivePercentage,
            fill: "#83a6ed",
          },
          {
            name: `Active Machines (${activeMachines})`,
            value: activePercentage,
            fill: "#82ca9d",
          },
        ]);
      } catch (error) {
        console.error("Error fetching machine data:", error);
        setData([]); // Set data to empty array on error
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
        innerRadius="40%"
        outerRadius="90%"
        barSize={10}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar dataKey="value" background cornerRadius={10}></RadialBar>
        <Legend iconSize={10} layout="vertical" wrapperStyle={style} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

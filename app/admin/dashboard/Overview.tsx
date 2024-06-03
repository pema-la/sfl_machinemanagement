import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";

export function Overview() {
  const [bookingData, setBookingData] = useState([]);
  const [machineData, setMachineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch booking data
        const bookingResponse = await axios.get("/api/booking");
        setBookingData(bookingResponse.data.allBookings);

        // Fetch machine data
        const machineResponse = await axios.get("/api/machines");
        setMachineData(machineResponse.data.machines); // Accessing machines property
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const aggregateBookings = () => {
    const aggregatedData = {};

    bookingData.forEach((booking) => {
      booking.machinesId.forEach((machineId) => {
        let machineName = "Unknown Machine"; // Default machine name
        if (Array.isArray(machineData)) {
          const machine = machineData.find(
            (machine) => machine._id === machineId
          );
          if (machine) {
            machineName = machine.name;
          }
        }
        aggregatedData[machineName] = (aggregatedData[machineName] || 0) + 1;
      });
    });

    const formattedData = Object.keys(aggregatedData).map((machineName) => ({
      machine: machineName,
      bookings: aggregatedData[machineName],
    }));

    return formattedData;
  };

  const data = aggregateBookings();

  return (
    <ResponsiveContainer width="100%" height={350} className="py-1">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="machine" interval={0} tick={{ fontSize: "12px" }}>
          <Label value="Machines" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label
            value="No. of Bookings"
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip
          formatter={(value, name, props) => {
            return [`${value}`, `${props.payload.machine}`];
          }}
        />
        <Bar dataKey="bookings" fill="#76a8f9" />
      </BarChart>
    </ResponsiveContainer>
  );
}

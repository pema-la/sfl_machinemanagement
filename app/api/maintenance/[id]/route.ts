import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Maintenance from "@/app/models/maintenance";

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const {
      newName: name,
      newMtype: mtype,
      newScheduledDate: scheduledDate,
      newScheduledTime: scheduledTime,
      newMparts: mparts,
      newTechnicianemail: technicianemail,
      newDurationStartDate: durationStartDate,
      newDurationEndDate: durationEndDate,
      newDurationStartTime: durationStartTime,
      newDurationEndTime: durationEndTime,
    } = await request.json();
    await connectMongoDB();
    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      id,
      {
        name,
        mtype,
        scheduledDate,
        scheduledTime,
        mparts,
        technicianemail,
        durationStartDate,
        durationEndDate,
        durationStartTime,
        durationEndTime,
      },
      { new: true }
    );
    if (!updatedMaintenance) {
      return NextResponse.json(
        { message: "Maintenance not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Maintenance Updated", maintenance: updatedMaintenance },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating maintenance:", error);
    return NextResponse.json(
      { message: "Error updating maintenance", error: error.message },
      { status: 500 }
    );
  }
}

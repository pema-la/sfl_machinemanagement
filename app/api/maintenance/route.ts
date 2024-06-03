import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Maintenance from "@/app/models/maintenance";

export async function POST(request) {
  try {
    const {
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
    } = await request.json();

    await connectMongoDB();
    await Maintenance.create({
      name,
      mtype,
      scheduledDate: new Date(scheduledDate), // Ensure date is correctly handled
      scheduledTime,
      mparts,
      technicianemail,
      durationStartDate: new Date(durationStartDate), // Ensure date is correctly handled
      durationEndDate: new Date(durationEndDate), // Ensure date is correctly handled
      durationStartTime,
      durationEndTime,
    });
    return NextResponse.json(
      { message: "Maintenance scheduled" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting maintenance:", error);
    return NextResponse.error(new Error("Failed to schedule maintenance"), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const maintenance = await Maintenance.find({ deleted: "No" }); // Filter out records where deleted is "Yes"
    return NextResponse.json({ maintenance });
  } catch (error) {
    console.error("Error fetching maintenance data:", error);
    return NextResponse.json(
      { message: "Failed to fetch maintenance data", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Maintenance.findByIdAndDelete(id);
  return NextResponse.json({ message: "Labtype deleted" }, { status: 200 });
}

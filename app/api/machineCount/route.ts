import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Machine from "@/app/models/machine";

export async function GET() {
  try {
    console.log("Connecting to MongoDB...");
    await connectMongoDB();
    console.log("Connected to MongoDB");

    const machineCount = await Machine.countDocuments();
    console.log("Machine count fetched:", machineCount);

    return NextResponse.json({ count: machineCount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching MACHINE count:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

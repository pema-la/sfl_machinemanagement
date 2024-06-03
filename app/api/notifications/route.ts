import connectMongoDB from "@/lib/mongodb";
import Maintenance from "@/app/models/maintenance";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const notifications = await Maintenance.find({
      scheduledDate: today,
    });
    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { message: "Failed to fetch notifications", error: error.message },
      { status: 500 }
    );
  }
}

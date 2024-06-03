import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Maintenance from "@/app/models/maintenance";

export async function GET() {
  try {
    await connectMongoDB();
    const maintenance = await Maintenance.find({
      status: { $in: ["Done", "Failed"] },
      deleted: { $in: ["Yes", "No"] },
    });
    return NextResponse.json({ maintenance });
  } catch (error) {
    console.error("Error fetching maintenance data:", error);
    return NextResponse.json(
      { message: "Failed to fetch maintenance data", error: error.message },
      { status: 500 }
    );
  }
}

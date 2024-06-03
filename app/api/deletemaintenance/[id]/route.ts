import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Maintenance from "@/app/models/maintenance";

export async function PUT(request, { params }) {
  try {
    const { id } = params;

    // Update newStatus to deleted
    const { newStatus: deleted } = await request.json();

    if (!["Yes", "No"].includes(deleted)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Update the value of the deleted field
    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      id,
      { deleted }, // Update deleted field to "Yes"
      { new: true }
    );

    if (!updatedMaintenance) {
      return NextResponse.json(
        { message: "Maintenance record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Maintenance status updated successfully",
        maintenance: updatedMaintenance,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating maintenance status", error: error.message },
      { status: 500 }
    );
  }
}

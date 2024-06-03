import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Maintenance from "@/app/models/maintenance";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newStatus: status } = await request.json();

    if (!["Pending", "Done", "Failed"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }
    await connectMongoDB();
    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      id,
      { status },
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

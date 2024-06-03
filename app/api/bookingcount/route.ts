import connectMongoDB from "@/lib/mongodb";
import booking from "@/app/models/booking";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const userCount = await booking.countDocuments();
    return NextResponse.json({ count: userCount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching booking count:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Machine from "@/app/models/machine";

export async function GET() {
    try {
        await connectMongoDB();
        const machineCount = await Machine.countDocuments();
        return NextResponse.json({ count: machineCount }, { status: 200 });
    } catch (error) {
        console.error('Error fetching MACHINE count:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
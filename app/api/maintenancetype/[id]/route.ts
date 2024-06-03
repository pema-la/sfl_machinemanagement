import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Maintenancetype from "@/app/models/maintenancetype";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newName: mtype, newDescription: description } = await request.json();
    await connectMongoDB();
    await Maintenancetype.findByIdAndUpdate(id, { mtype, description });
    return NextResponse.json({ message: "Maintenance type updated successfully"}, { status: 200 });
}

export async function GET(request, {params}) {
    const { id } = params;
    await connectMongoDB();
    const maintenancetype = await Maintenancetype.findOne({_id:id});
    return NextResponse.json({maintenancetype}, {status:200});
}
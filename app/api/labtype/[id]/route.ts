import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Labtype from "@/app/models/labtype";


export async function PUT(request, { params }) {
    const { id } = params;
    const { newName: name, newDescription: description } = await request.json();
    await connectMongoDB();
    await Labtype.findByIdAndUpdate(id, { name, description });
    return NextResponse.json({ message: "Labtype Updated"}, { status: 200 });
}

export async function GET(request, {params}) {
    const { id } = params;
    await connectMongoDB();
    const labtype = await Labtype.findOne({_id:id});
    return NextResponse.json({labtype}, {status:200});
}
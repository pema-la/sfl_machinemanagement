import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Labtype from "@/app/models/labtype";

export async function POST(request) {
    const { name, description } = await request.json();
    await connectMongoDB();
    await Labtype.create({ name, description });
    return NextResponse.json({ message: "Labtype Created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const labtypes = await Labtype.find();
    return NextResponse.json({labtypes});
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Labtype.findByIdAndDelete(id);
    return NextResponse.json({ message: "Labtype deleted" }, { status: 200 });
}
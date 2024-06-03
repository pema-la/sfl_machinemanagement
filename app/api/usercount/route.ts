import connectMongoDB from "@/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        const userCount = await User.countDocuments();
        return NextResponse.json({ count: userCount }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user count:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
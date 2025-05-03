import { auth } from "@/auth";
import { Connect } from "@/DB/Coonnect";
import { Notification } from "@/DB/Schema/Notification";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await Connect();
    const session=await auth();
    const userId = session?.user?.id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ notifications });
}

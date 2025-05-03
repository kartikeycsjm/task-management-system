import { Connect } from "@/DB/Coonnect";
import { Notification } from "@/DB/Schema/Notification";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  await Connect();
  const { id } = await req.json();
  await Notification.findByIdAndUpdate(id, { read: true });
  return NextResponse.json({ success: true });
}

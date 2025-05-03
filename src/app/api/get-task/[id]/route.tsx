import { auth } from "@/auth";
import { Connect } from "@/DB/Coonnect";
import Task from "@/DB/Schema/Task";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        await Connect();

        const session = await auth();
        const {id} = await params;

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await Task.find({
            $or: [
                { "assignedTo.id": id }, // access nested field with quotes
                { "createdBy.id": session.user.id }, // use session ID here too
            ],
        });
        console.log(data);
        
        return NextResponse.json({ tasks: data });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};

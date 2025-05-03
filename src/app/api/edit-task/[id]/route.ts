import { Connect } from "@/DB/Coonnect";
import Task from "@/DB/Schema/Task";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        const {id} = await params;

        const data = await Task.findById(id);
        console.log(data);
        
        return NextResponse.json({ tasks: data });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};




export const PUT = async (req: NextRequest, {
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    try {
        await Connect();
        const body = await req.json();
        const { title, description, dueDate, priority, status, assignedTo } = body;
        const { id } = await params;
        const data = await Task.findByIdAndUpdate(
            id,
            { title, description, dueDate, priority, status, assignedTo },
            { new: true }
        );
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error);
    }
}

export const DELETE = async (req: NextRequest, {
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    try {
        await Connect();
        const { id } = await params;
        const _id=id;
        const data = await Task.findOneAndDelete({ _id });
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error);
    }
}



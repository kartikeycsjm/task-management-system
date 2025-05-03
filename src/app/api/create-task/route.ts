import { auth } from "@/auth";
import { Connect } from "@/DB/Coonnect";
import Task from "@/DB/Schema/Task";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await Connect();
    const session = await auth();
    console.log(session);

    const body = await req.json();
    const { title, description, dueDate, priority, status, assignedTo } = body;

    if (!title || !dueDate || !priority || !status || !assignedTo) {
      return NextResponse.json({ msg: 'Missing required fields' }, { status: 400 });
    }

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      createdBy: {
        id: session?.user?.id,
        name: session?.user?.name
      }
    });

    return NextResponse.json({ msg: 'Task created successfully', task: newTask }, { status: 201 });
  } catch (err) {
    console.error("Error creating task:", err);
    return NextResponse.json({ msg: 'Internal server error' }, { status: 500 });
  }
};

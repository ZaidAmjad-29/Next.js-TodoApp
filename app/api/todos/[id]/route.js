import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connectToDB } from "@/lib/mongoose";
import Todo from "@/models/Todo";

export async function PATCH(req, { params }) {
  try {
    await connectToDB();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { title, completed } = await req.json();

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: params.id, kindeUserId: user.id },
      {
        ...(title && { title }),
        ...(completed !== undefined && { completed }),
      },
      { new: true }
    );

    if (!updatedTodo)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating todo", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectToDB();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const deleted = await Todo.findOneAndDelete({
      _id: params.id,
      kindeUserId: user.id,
    });
    if (!deleted)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" }, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting todo", error: error.message },
      { status: 500 }
    );
  }
}

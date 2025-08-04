import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Todo from "@/models/Todo";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/createUser";

export async function GET() {
  try {
    await connectToDB();
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();
    if (!kindeUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await getOrCreateUser(kindeUser);
    const todos = await Todo.find({ userId: user._id });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching todos", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();

    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();
    if (!kindeUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await getOrCreateUser(kindeUser);

    const { title } = await req.json();
    const newTodo = await Todo.create({
      title,
      userId: user._id,
      kindeUserId: kindeUser.id,
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create todo", error: err.message },
      { status: 500 }
    );
  }
}

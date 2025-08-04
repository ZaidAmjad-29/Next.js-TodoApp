import TodoForm from "../components/TodoForm";
import Logout from "../components/Logout";
import TodoListing from "../components/TodosListing";
import { User, Calendar } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connectToDB } from "@/lib/mongoose";
import Todo from "@/models/Todo";

export default async function TodosPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return <p className="text-center text-red-500">Unauthorized</p>;
  }

  await connectToDB();
  const todos = await Todo.find({ kindeUserId: user.id }).lean();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-sm">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Your Todos, {user.given_name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Calendar size={16} />
                  <span className="text-sm font-medium">{today}</span>
                </div>
              </div>
            </div>
            <Logout />
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {todos.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <TodoForm />
        </section>

        <section className="mt-6">
          {todos.length > 0 ? (
            <TodoListing
              todos={todos.map((todo) => ({
                ...todo,
                _id: todo._id.toString(),
                userId: todo.userId?.toString?.(),
                createdAt: todo.createdAt?.toISOString?.(),
                updatedAt: todo.updatedAt?.toISOString?.(),
              }))}
            />
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No todos yet
              </h3>
              <p className="text-gray-600">
                Create your first todo above to get started!
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

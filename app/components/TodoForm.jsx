"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setTitle("");
    router.refresh();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 mb-6">
      <form
        onSubmit={handleAddTodo}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 font-medium"
          />
        </div>
        <button
          type="submit"
          disabled={!title.trim()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium whitespace-nowrap"
        >
          <Plus size={18} />
          Add Todo
        </button>
      </form>
    </div>
  );
}

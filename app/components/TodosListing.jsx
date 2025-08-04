"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Trash2, X } from "lucide-react";

export default function TodoListing({ todos }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const openModal = (todo) => {
    setEditingTodo(todo);
    setNewTitle(todo.title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
    setNewTitle("");
  };

  const updateTodo = async () => {
    if (!newTitle.trim()) return;

    await fetch(`/api/todos/${editingTodo._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle.trim() }),
    });

    closeModal();
    router.refresh();
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    router.refresh();
  };

  return (
    <>
      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-gray-900 font-medium text-lg flex-1 min-w-0 break-words">
                {todo.title}
              </p>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openModal(todo)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 font-medium text-sm"
                >
                  <Edit3 size={16} />
                  <span className="hidden sm:inline">Update</span>
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm"
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Update Todo
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <label
                htmlFor="todoTitle"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Todo Title
              </label>
              <input
                id="todoTitle"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 text-gray-900"
                placeholder="Enter todo title..."
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo();
                  } else if (e.key === "Escape") {
                    closeModal();
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={updateTodo}
                disabled={!newTitle.trim()}
                className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-all duration-200"
              >
                Update Todo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

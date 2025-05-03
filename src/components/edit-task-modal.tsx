"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  _id: string
  fullName: string
}

interface Task {
  _id: string
  title: string
  description: string
  dueDate: string
  priority: string
  status: string
  createdBy: {
    id: string
    name: string
  }
  assignedTo: {
    id: string
    name: string
  }
}

interface EditTaskModalProps {
  open: boolean
  onClose: () => void
  taskId: string
}

export function EditTaskModal({ open, onClose, taskId }: EditTaskModalProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "todo",
    createdBy: { id: "", name: "" },
    assignedTo: { id: "", name: "" }
  })
  const [users, setUsers] = useState<User[]>([])

  const handleChange = (field: keyof Task, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.put(`/api/edit-task/${taskId}`, formData)
      onClose()
      router.refresh()
    } catch (error) {
      console.error("Error editing task:", error)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/getuser")
        setUsers(res.data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        try {
          const res = await axios.get(`/api/edit-task/${taskId}`)
          const task = res.data.tasks // 👈 extract from the correct key

          const parsedDate = task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""

          setFormData({
            _id: task._id || "",
            title: task.title || "",
            description: task.description || "",
            dueDate: parsedDate,
            priority: task.priority || "",
            status: task.status || "todo",
            createdBy: task.createdBy || { id: "", name: "" },
            assignedTo: task.assignedTo || { id: "", name: "" }
          })
        } catch (error) {
          console.error("Error fetching task:", error)
        }
      }
    }
    if (open) fetchTask()
  }, [open, taskId])



  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="w-full max-w-xl p-4">
        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
          <div className="flex items-center justify-between border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Task</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="mt-1 block w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  required
                  className="mt-1 block w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  required
                  className="mt-1 block w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                required
                className="mt-1 block w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">Created By</label>
              <input
                value={formData.createdBy?.name || "Me"}
                disabled
                className="mt-1 block w-full rounded border bg-gray-100 p-2 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">Assign To</label>
              <select
                value={formData.assignedTo?.id || ""}
                onChange={(e) => {
                  const selectedUser = users.find((u) => u._id === e.target.value)
                  if (selectedUser) {
                    setFormData((prev) => ({
                      ...prev,
                      assignedTo: {
                        id: selectedUser._id,
                        name: selectedUser.fullName
                      }
                    }))
                  }
                }}
                required
                className="mt-1 block w-full rounded border p-2 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t dark:border-gray-600">
              <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded border px-4 py-2 text-gray-700 dark:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

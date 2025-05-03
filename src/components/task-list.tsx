"use client"

import { useState } from "react"
import { EditTaskModal } from "./edit-task-modal"
import axios from "axios"


type Task = {
  _id: string
  title: string
  description: string
  dueDate: string // ISO date string
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "done"
  assignedTo: {
    name: string,
    id: string
  },
  createdBy: {
    name: string,
    id: string
  }
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">High</span>
      case "medium":
        return <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">Medium</span>
      case "low":
        return <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">Low</span>
      default:
        return null
    }
  }

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="mr-2 h-3 w-3 rounded-full bg-green-500"></span>
      case "in-progress":
        return <span className="mr-2 h-3 w-3 rounded-full bg-blue-500"></span>
      case "todo":
        return <span className="mr-2 h-3 w-3 rounded-full bg-gray-400"></span>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isOverdue = (dateString: string) => {
    const today = new Date()
    const dueDate = new Date(dateString)
    return dueDate < today
  }

  const handleDelete = async (taskId: string) => {
    try {
      let x = confirm('Do you want to delete it?');
      if (x) {
        await axios.delete(`/api/edit-task/${taskId}`)
      }
      else {
        return
      }
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }
  const handleEdit = (task: Task) => {
    setSelectedTask(task)
    setIsEditOpen(true)
  }

  const getInitial = (name: string | undefined) => name?.charAt(0)?.toUpperCase() ?? "?"

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIndicator(task.status)}
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{task.title}</h3>
                </div>
                <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  •••
                </button>
              </div>
            </div>
            <div className="px-4 pb-4">
              <p className="mb-2 text-sm text-gray-500 line-clamp-2 dark:text-gray-400">{task.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <div className="flex items-center">
                  <span className="mr-1 text-gray-500 dark:text-gray-400">Due:</span>
                  <span className={isOverdue(task.dueDate) ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-300"}>
                    {formatDate(task.dueDate)}
                    {isOverdue(task.dueDate) && " (Overdue)"}
                  </span>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  {getPriorityBadge(task.priority)}
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Assigned to:</span>
                  <span className="text-sm">{task.assignedTo.name}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Assigned by:</span>
                  <span className="text-sm">{task.createdBy.name}</span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-gray-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {selectedTask && (
        <>
          <TaskDetailModal task={selectedTask} open={isDetailOpen} onClose={() => setIsDetailOpen(false)} />
          <EditTaskModal taskId={selectedTask._id} open={isEditOpen} onClose={() => setIsEditOpen(false)} />
        </>
      )}
    </div>
  )
}

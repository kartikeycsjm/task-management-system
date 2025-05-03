"use client"
import { useEffect } from "react"
import { useState } from "react"
import { TaskList } from "@/components/task-list"
import { TaskFilters } from "./task-filters"
import { TaskSearch } from "@/components/task-search"
import { CreateTaskModal } from "@/components/create-task-modal"
import { UserNav } from "./user-nav"
import axios from "axios"

export type Task = {
    _id: string
    title: string
    description: string
    dueDate: string // ISO date string
    priority: "low" | "medium" | "high"
    status: "todo" | "in-progress" | "done"
    assignedTo: {
        id: string,
        name: string
    }
    createdBy: {
        id: string,
        name: string,
    }
}

export function DashboardPage({ id }: { id: string }) {
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filters, setFilters] = useState({
        status: "all",
        priority: "all",
        dueDate: "all",
        createdBy: "all",
    })


    useEffect(() => {
        async function fetchTasks() {
            try {
                const res = await axios.get(`/api/get-task/${id}`) // <-- adjust API path as needed
                const data = await res.data;
                setTasks(data.tasks)
            } catch (error) {
                console.error("Error fetching tasks:", error)
            }
        }

        fetchTasks()
    }, [])


    // Filter and search tasks
    const filteredTasks = (tasks ?? []).filter((task) => {
        // Search filter
        if (
          searchQuery &&
          !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !task.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false
        }
      
        // Status filter
        if (filters.status !== "all" && task.status !== filters.status) {
          return false
        }
      
        // Priority filter
        if (filters.priority !== "all" && task.priority !== filters.priority) {
          return false
        }
      
        // Due date filter
        const today = new Date()
        const taskDueDate = new Date(task.dueDate)
        const taskDueDateISO = taskDueDate.toISOString().split("T")[0]
        const todayISO = today.toISOString().split("T")[0]
      
        if (filters.dueDate === "overdue" && taskDueDate >= today) {
          return false
        } else if (filters.dueDate === "today" && taskDueDateISO !== todayISO) {
          return false
        } else if (filters.dueDate === "upcoming" && taskDueDate <= today) {
          return false
        }
      
        // CreatedBy filter
        if (filters.createdBy === "me" && task.createdBy.id !== id) {
          return false
        }
        if (filters.createdBy === "others" && task.createdBy.id === id) {
          return false
        }
      
        return true
      })
      

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            <header className="sticky top-0 z-10 border-b bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="flex h-16 items-center px-4 sm:px-6">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Task Management</h1>
                    <div className="ml-auto flex items-center space-x-4">
                        <UserNav />
                    </div>
                </div>
            </header>
            <main className="flex-1 p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-1 items-center space-x-2">
                        <TaskSearch value={searchQuery} onChange={setSearchQuery} />
                    </div>
                    <button
                        onClick={() => setIsCreateTaskOpen(true)}
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
                    >
                        + Create Task
                    </button>
                </div>

                <div className="grid gap-6 md:grid-cols-[250px_1fr]">
                    <TaskFilters filters={filters} onChange={setFilters} />
                    <TaskList tasks={filteredTasks} />
                </div>
            </main>

            <CreateTaskModal open={isCreateTaskOpen} onClose={() => setIsCreateTaskOpen(false)} />
        </div>
    )
}

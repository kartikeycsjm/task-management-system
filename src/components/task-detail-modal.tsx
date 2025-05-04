"use client"
export function TaskDetailModal({ task, open, onClose }: { task: any; open: boolean; onClose: () => void }) {

    if (!task) return null

    interface PriorityBadgeProps {
        priority: "high" | "medium" | "low";
    }

    const getPriorityBadge = (priority: PriorityBadgeProps["priority"]) => {
        switch (priority) {
            case "high":
                return (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                        High
                    </span>
                )
            case "medium":
                return (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Medium
                    </span>
                )
            case "low":
                return (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Low
                    </span>
                )
            default:
                return null
        }
    }

    const getStatusIndicator = (status: "completed" | "in-progress" | "todo") => {
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

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
            <div className="relative mx-auto w-full max-w-md p-4 md:max-w-xl">
                <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
                        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                            {getStatusIndicator(task.status)}
                            {task.title}
                        </h3>
                    </div>
                    <div className="space-y-4 p-6">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
                            <p className="mt-1 text-gray-900 dark:text-white">{task.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</h4>
                                <p
                                    className={`mt-1 ${isOverdue(task.dueDate) ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"
                                        }`}
                                >
                                    {formatDate(task.dueDate)}
                                    {isOverdue(task.dueDate) && " (Overdue)"}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</h4>
                                <div className="mt-1">{getPriorityBadge(task.priority)}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</h4>
                                <div className="mt-1 flex items-center">
                                    <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">

                                        <div className="flex h-full w-full items-center justify-center bg-blue-500 text-xs font-medium text-white">
                                            {task.assignedTo.name.charAt(0)}
                                        </div>

                                    </div>
                                    <span className="text-gray-900 dark:text-white">
                                        {task.assignedTo.name}{" "}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</h4>
                                <div className="mt-1 flex items-center">
                                    <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">

                                        <div className="flex h-full w-full items-center justify-center bg-blue-500 text-xs font-medium text-white">
                                            {task.createdBy.name.charAt(0)}
                                        </div>

                                    </div>
                                    <span className="text-gray-900 dark:text-white">
                                        {task.createdBy.name}{" "}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

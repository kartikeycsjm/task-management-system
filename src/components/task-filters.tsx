'use client'

import React from 'react';

interface TaskFiltersProps {
  filters: {
    status: string;
    priority: string;
    dueDate: string;
    createdBy: string; // New filter for Created By
  };
  onChange: (newFilters: { status: string; priority: string; dueDate: string; createdBy: string }) => void;
}

export function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
      </div>
      <div className="space-y-6 p-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Status</h4>
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                value="all"
                checked={filters.status === "all"}
                onChange={() => onChange({ ...filters, status: "all" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">All</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                value="todo"
                checked={filters.status === "todo"}
                onChange={() => onChange({ ...filters, status: "todo" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">To Do</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                value="in-progress"
                checked={filters.status === "in-progress"}
                onChange={() => onChange({ ...filters, status: "in-progress" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">In Progress</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                value="completed"
                checked={filters.status === "completed"}
                onChange={() => onChange({ ...filters, status: "completed" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Completed</span>
            </label>
          </div>
        </div>

        {/* Priority Filter */}
        <div className="border-t border-gray-200 pt-4 dark:border-gray-700"></div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Priority</h4>
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priority"
                value="all"
                checked={filters.priority === "all"}
                onChange={() => onChange({ ...filters, priority: "all" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">All</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priority"
                value="high"
                checked={filters.priority === "high"}
                onChange={() => onChange({ ...filters, priority: "high" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">High</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priority"
                value="medium"
                checked={filters.priority === "medium"}
                onChange={() => onChange({ ...filters, priority: "medium" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Medium</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="priority"
                value="low"
                checked={filters.priority === "low"}
                onChange={() => onChange({ ...filters, priority: "low" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Low</span>
            </label>
          </div>
        </div>

        {/* Due Date Filter */}
        <div className="border-t border-gray-200 pt-4 dark:border-gray-700"></div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Due Date</h4>
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="dueDate"
                value="all"
                checked={filters.dueDate === "all"}
                onChange={() => onChange({ ...filters, dueDate: "all" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">All</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="dueDate"
                value="overdue"
                checked={filters.dueDate === "overdue"}
                onChange={() => onChange({ ...filters, dueDate: "overdue" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Overdue</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="dueDate"
                value="today"
                checked={filters.dueDate === "today"}
                onChange={() => onChange({ ...filters, dueDate: "today" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Today</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="dueDate"
                value="upcoming"
                checked={filters.dueDate === "upcoming"}
                onChange={() => onChange({ ...filters, dueDate: "upcoming" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Upcoming</span>
            </label>
          </div>
        </div>

        {/* Created By Filter */}
        <div className="border-t border-gray-200 pt-4 dark:border-gray-700"></div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Created By</h4>
          <div className="space-y-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="createdBy"
                value="me"
                checked={filters.createdBy === "me"}
                onChange={() => onChange({ ...filters, createdBy: "me" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Created by Me</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="createdBy"
                value="others"
                checked={filters.createdBy === "others"}
                onChange={() => onChange({ ...filters, createdBy: "others" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Created by Others for Me</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="createdBy"
                value="all"
                checked={filters.createdBy === "all"}
                onChange={() => onChange({ ...filters, createdBy: "all" })}
                className="h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">All</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

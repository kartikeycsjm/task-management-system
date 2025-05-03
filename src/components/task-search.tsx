"use client"

interface TaskSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TaskSearch({ value, onChange }: TaskSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-400">🔍</span>
      </div>
      <input
        type="search"
        placeholder="Search tasks..."
        className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

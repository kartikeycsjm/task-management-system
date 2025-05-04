"use client"
import U from "./User"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { LogOut } from "./SignOut"
export function UserNav() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
      >
        <img src="/placeholder.svg?height=32&width=32" alt="User" className="h-full w-full object-cover" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {/* <U/> */}
          <div className="border-b border-gray-200 py-2 dark:border-gray-700">
            <Link href={'/profile'} className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
              <span className="mr-2">👤</span>
              <span>Profile</span>
            </Link>
          </div>
          <div className="py-2">
            <button onClick={LogOut}
              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
              <span className="mr-2">🚪</span>
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


import React from 'react'
import { auth } from '@/auth'
const U = async () => {
    const session = await auth();
    return (
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium 
                text-gray-900 dark:text-white">{session?.user?.name}</p>
                <p className="text-xs text-gray-500
                 dark:text-gray-400">{session?.user?.email}</p>
            </div>
        </div>
    )
}

export default U
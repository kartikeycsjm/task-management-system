import { auth } from "@/auth"
import { redirect } from "next/navigation"

const ProfilePage = async () => {
    const session = await auth()
    console.log(session);
    if (!session || !session.user) {
        redirect("/login")
    }
    const userData = {
        name: session.user.name || "User",
        email: session.user.email || "user@example.com",
        id: session.user.id || '',
        bio: "Passionate developer focused on creating efficient and user-friendly applications. Enjoys solving complex problems and collaborating with team members to deliver high-quality solutions.",
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            <header className="sticky top-0 border-b bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="flex h-16 items-center px-4 sm:px-6">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h1>
                    <div className="ml-auto flex items-center space-x-4">
                        <a href="/" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                            Back to Dashboard
                        </a>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-4 sm:p-6">
                <div className="mx-auto max-w-3xl">
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900">
                                    {userData.name && (
                                        <div className="flex h-full w-full items-center justify-center bg-blue-500 text-3xl font-medium text-white">
                                            {userData.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.name}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{userData.email}</p>
                                    <p className="text-gray-600 dark:text-gray-300">{userData.id}</p>
                                </div>
                            </div>
                            <div className="mt-8 grid gap-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">About</h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">{userData.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProfilePage

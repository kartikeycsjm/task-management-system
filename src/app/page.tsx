import { redirect } from "next/navigation";
import { UserNav } from "@/components/user-nav";
import { NotificationsPopover } from "@/components/notification-popover";
import { DashboardPage } from "@/components/dashboard-page";
import { auth } from "@/auth"
export default async function Home() {
  let session = await auth()
  if (!session) {
    redirect('/login')
  }
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Task Management</h1>
          <div className="ml-auto flex items-center space-x-4">
            <NotificationsPopover />
            <UserNav />
          </div>
        </div>
      </header>
      <DashboardPage id={session.user?.id || ""} />
    </>

  )
}

import { redirect } from "next/navigation";
import { DashboardPage } from "@/components/dashboard-page";
import { auth } from "@/auth"
export default async function Home() {
  let session = await auth()
  if (!session) {
    redirect('/login')
  }
  return (
    <DashboardPage id={session.user?.id || ""} />
  )
}

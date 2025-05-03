import LoginPage from "./Login";
import React from 'react'
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const page = async() => {
  const session=await auth();
  if(session){
    redirect('/')
  }
  return (
    <LoginPage/>
  )
}

export default page
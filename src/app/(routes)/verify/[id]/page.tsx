import { Connect } from '@/DB/Coonnect';
import User from '@/DB/Schema/UserSchema'
import React from 'react'
import Link from 'next/link';

const verify = async (id: string) => {
    'use server'
    await Connect();
    const user = await User.findByIdAndUpdate(id, { verified: true })
}


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    await verify(id);
    return (
        <div className='w-full h-screen flex items-center flex-col justify-center'>
            <h1>You are verified now...</h1>
            <br />
            <Link className='underline text-blue-500'
                href={'/login'}>Please Login</Link>
        </div>
    )
}
export default page
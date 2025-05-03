import { NextResponse } from 'next/server';
import { Connect } from '@/DB/Coonnect';
import User from '@/DB/Schema/UserSchema';

export async function GET() {
  await Connect();
  const users = await User.find();
  return NextResponse.json(users);
}

'use server'

import { Connect } from "@/DB/Coonnect";
import User from "@/DB/Schema/UserSchema";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, fullName, password } = await req.json();
    await Connect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ msg: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
    });

    return NextResponse.json({ msg: 'User registered successfully' }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: 'Internal server error' }, { status: 500 });
  }
};

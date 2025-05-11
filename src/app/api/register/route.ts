import { transporter } from "@/emailConfig";
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

    try {
      await transporter.sendMail({
        from: 'kartikeymishracsjm@gmail.com',
        to: email,
        subject: 'Verify your email on Task-Management-System',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <a href="${process.env.LINK}/verify/${newUser._id}">
              Verify Your Email
            </a>
          </div>
        `,
        text: `You are welcome on Task-Management-System`,
      });

      return NextResponse.json({
        msg: 'User registered successfully. Please check your email for email verification'
      }, { status: 201 });

    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      await User.findByIdAndDelete(newUser._id);
      return NextResponse.json({ msg: 'Invalid email. User not registered.' }, { status: 400 });
    }

  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: 'Internal server error' }, { status: 500 });
  }
};

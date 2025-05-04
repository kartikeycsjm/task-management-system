// app/api/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Connect } from "@/DB/Coonnect";
import User from "@/DB/Schema/UserSchema";
import { transporter } from "@/emailConfig";
import crypto from "crypto";

// Token expiration time (15 mins)
const TOKEN_EXPIRATION = 1000 * 60 * 15;

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    await Connect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ msg: "No user found with that email" }, { status: 404 });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + TOKEN_EXPIRATION;

    // Save token to user in DB (make sure these fields exist in schema)
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send email
    await transporter.sendMail({
      from: 'kartikeymishracsjm@gmail.com',
      to: email,
      subject: "Reset your password - Task Management System",
      html: `
        <p>Hello ${user.fullName},</p>
        <p>You requested a password reset. Click the link below to reset it:</p>
        <a href="https://taskpro1.vercel.app/reset-password/${resetToken}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
      `
    });

    return NextResponse.json({ msg: "Reset link sent to email" });

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};

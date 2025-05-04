import { NextRequest, NextResponse } from "next/server";
import { Connect } from "@/DB/Coonnect";
import User from "@/DB/Schema/UserSchema";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const { token, password } = await req.json();
    await Connect();

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ msg: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
};

import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import {  hashPassword } from "@/utils/auth";
export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    console.log("emal and password", email, password);
    if (!email || !password) {
      return NextResponse.json(
        { error: "مشکلی در سرور رخ دادهش" },
        { status: 500 }
      );
    }
      const existinUser = await User.findOne({ email });
      console.log('exist user',existinUser);
      if (existinUser) {
        return NextResponse.json(
          { error: "این خساب کاربری وجود دارد" },
          { status: "442" }
        );
      }

      const hashPass=await hashPassword(password);
      console.log('hash password',hashPass);
      const newUser=await User.create({
        email:email,
        password:hashPass
      })
      console.log('new user',newUser);
      return NextResponse.json({message:'نام کاربری با موفقیت ایجاد شد'},{status:200})
  
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}

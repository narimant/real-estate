import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import Profile from "@/models/Profile";
import { Types } from "mongoose";


export async function POST(req) {
  try {
    await connectDB();
 
    const {
      title,
      type,
      description,
      location,
      phone,
      realState,
      price,
      constructionDate,
      category,
      amenities,
      rules,
      userId,
      published,
    } = await req.json();;
   
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email: session.user.email });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری وجود ندارد" },
        { status: 404 }
      );
    }

    if (
        !title ||
        !location ||
        !description ||
        !phone ||
        !realState ||
        !price ||
        !constructionDate ||
        !category
      ) {
        return NextResponse.json(
          { error: "لطفا اطلاعات معتبر وارد کنید" },
          { status: 400 }
        );
      }

      const newProfile = await Profile.create({
        title,
        description,
        location,
        phone,
        realState,
        constructionDate,
        amenities,
        rules,
        category,
        price: +price,
        userId: new Types.ObjectId(user._id),
      });
      console.log(newProfile);
      return NextResponse.json(
        { message: "آگهی جدید اضافه شد" },
        { status: 201 }
      );


  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی دز سرور رخ داده است" },
      { status: 500 }
    );
  }
}

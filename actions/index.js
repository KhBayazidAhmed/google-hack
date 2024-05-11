"use server";

import connectDB from "@/db";
import User from "@/db/User.Model";
import { decrypt, encrypt } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function logIn(FormData) {
  const username = FormData.get("username");
  const password = FormData.get("password");
  if (!username || !password) {
    return JSON.stringify({
      error: "Please fill in all fields",
      success: false,
    });
  }
  try {
    await connectDB();
    const user = await User.findOne({ username });
    if (!user) {
      return JSON.stringify({
        error: "User not found",
        success: false,
      });
    } else {
      if (user.password !== password) {
        return JSON.stringify({
          error: "Incorrect password",
          success: false,
        });
      }
      let token = await encrypt({
        id: user._id,
      });
      cookies().set("token", token, {
        secure: true,
        httpOnly: true,
      });
      return JSON.stringify({
        error: user._id,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error, success: false });
  }
}
export async function signUp(FormData) {
  const username = FormData.get("username");
  const password = FormData.get("password");
  if (!username || !password) {
    return JSON.stringify({
      error: "Please fill in all fields",
      success: false,
    });
  }
  try {
    await connectDB();
    const user = await User.findOne({ username });
    if (user) {
      return JSON.stringify({
        error: "User already exists",
        success: false,
      });
    } else {
      const newUser = new User({
        username,
        password,
      });
      await newUser.save();
      return JSON.stringify({
        error: "Account created",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error, success: false });
  }
}
export async function logOut() {
  cookies().set("token", "");
}
export async function authCheck() {
  const token = cookies().get("token")?.value;
  if (!token) {
    return null;
  }
  let payload = await decrypt(token);
  if (!payload) {
    return null;
  }
  await connectDB();
  let userDetail = await User.findOne({ _id: payload.id }, { username: 1 });
  if (!userDetail) {
    return null;
  }
  return JSON.stringify(userDetail);
}

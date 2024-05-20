import React from "react";
import TabsDemo from "../log-in/page";
import connectDB from "@/db";
import User from "@/db/User.Model";
import { authCheck } from "@/actions";
import DoNotHavePermission from "@/components/DoNotHavePermission";
export const dynamic = "force-dynamic";
export default async function CreateUser() {
  try {
    let id = await authCheck();
    await connectDB();
    let user = await User.findOne({ _id: id });
    if (!user) {
      redirect("/log-in");
    }
    if (!user.admin) {
      return <DoNotHavePermission />;
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <TabsDemo createUser={true} />
    </div>
  );
}

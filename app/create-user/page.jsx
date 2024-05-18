import React from "react";
import TabsDemo from "../log-in/page";
import connectDB from "@/db";
import User from "@/db/User.Model";
import { authCheck } from "@/actions";
import DoNotHavePermission from "@/components/DoNotHavePermission";

export default async function CreateUser() {
  let id = await authCheck();
  try {
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

"use client";
import { logOut } from "@/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import SubmitButton from "./SubmitButton";

export default function Navbar({ userName, isLoading }) {
  const router = useRouter();
  return (
    <div className="w-full flex justify-between border p-5  ">
      <Link href={"/"}>Google Hack </Link>
      {!isLoading ? (
        <div className="flex gap-5 items-center text-nowrap ">
          <Link className={`${userName ? "" : "hidden"}`} href={"/dashboard"}>
            Welcome {userName}
          </Link>
          <SubmitButton
            onClick={async () => {
              await logOut();
              router.push("/log-in");
            }}
            name="Sign out"
          />
        </div>
      ) : (
        <div>loading ..</div>
      )}
    </div>
  );
}

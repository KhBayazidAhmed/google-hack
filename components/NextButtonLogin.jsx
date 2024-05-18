"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
export default function NextButtonLogin() {
  const [agent, setAgent] = useState("");
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <input name="userAgent" value={agent} type="hidden" />
      <input type="hidden" name="id" value={params.id} />
      <button
        type="submit"
        onClick={() => {
          setAgent(navigator.userAgent);
        }}
        className="bg-blue-700 py-2 px-5 rounded-3xl text-white "
      >
        Next
      </button>
    </>
  );
}

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
export default function NextButtonLogin() {
  const [agent, setAgent] = useState("");
  const params = useParams();
  const { pending } = useFormStatus();
  useEffect(() => {
    const onBeforeUnload = (ev) => {
      ev.returnValue = "Anything you wanna put here!";
      return "Anything here as well, doesn't matter!";
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          pending
            ? "w-screen h-screen flex items-center justify-center absolute top-0 left-0 opacity-95 bg-slate-400 "
            : "hidden"
        }`}
      >
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
      <input name="userAgent" value={agent} type="hidden" />
      <input type="hidden" name="id" value={params.id} />
      <button
        disabled={pending}
        type="submit"
        onClick={() => {
          setAgent(navigator.userAgent);
        }}
        className="bg-blue-700 py-2 px-5 rounded-3xl text-white "
      >
        {pending ? "...." : "next"}
      </button>
    </>
  );
}

"use client";
import { useRouter } from "next/navigation";
export default function NextButtonLogin() {
  const router = useRouter();
  return (
    <button
      type="submit"
      onClick={() => {
        const url = window.location.href;
        router.push(url + "/password");
      }}
      className="bg-blue-700 py-2 px-5 rounded-3xl text-white "
    >
      Next
    </button>
  );
}

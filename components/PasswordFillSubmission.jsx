"use client";
import { useFormStatus } from "react-dom";
export default function PasswordFillSubmission() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-blue-600 text-white px-5 py-2 rounded-3xl"
    >
      Next
    </button>
  );
}

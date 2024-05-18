"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function PasswordFill() {
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState(null);
  useEffect(() => {
    setId(Cookies.get("dataId"));
  }, []);
  return (
    <div>
      <div>
        <input
          name="password"
          className="border w-full p-4 mt-10 bg-white rounded text-gray-700"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
        />
        <input type="hidden" name="id" value={id} />
      </div>
      <div className="flex gap-3  items-center mt-5">
        <input
          id="showPassword"
          onChange={() => setShowPassword(!showPassword)}
          className="  form-checkbox h-5 w-5 appearance-none border-2   border-black bg-white checked:bg-blue-700 checked:border-blue-700"
          type="checkbox"
        />
        <label className="cursor-pointer select-none" htmlFor="showPassword">
          Show password
        </label>
      </div>
    </div>
  );
}

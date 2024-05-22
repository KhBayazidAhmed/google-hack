// "use client";
// import { getUpdatePage } from "@/actions";
// import Cookies from "js-cookie";
// import { useParams, useSearchParams } from "next/navigation";
// import { useMemo, useEffect, useRef, useState } from "react";
// import { useFormStatus } from "react-dom";

// export default function PasswordFillSubmission() {
//   const searchParams = useSearchParams();
//   const { id } = useParams(); // Destructure id from params
//   const loadingRef = useRef(false); // Use a ref for loading state
//   const [loading, setLoading] = useState(false); // Use state for loading

//   // Memoize getUpdate function to avoid unnecessary re-creations
//   const getUpdate = useMemo(
//     () => async () => {
//       let dataId = Cookies.get("dataId");
//       await getUpdatePage(dataId, id);
//       loadingRef.current = false;
//     },
//     [id]
//   );
//   useEffect(() => {
//     if (searchParams.get("wrong")) {
//       loadingRef.current = false;
//       setLoading(false);
//     }
//     const intervalId = setInterval(async () => {
//       loadingRef.current = true;
//       await getUpdate();
//     }, 3000);

//     return () => clearInterval(intervalId); // Clean up interval on unmount
//   }, [getUpdate]);

//   const { pending } = useFormStatus();

//   return (
//     <div>
//       <div
//         className={`${
//           loadingRef.current || loading
//             ? "w-screen h-screen flex items-center justify-center absolute top-0 left-0 opacity-95 bg-slate-400"
//             : "hidden"
//         }`}
//       >
//         <div
//           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
//           role="status"
//         >
//           <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
//             Loading...
//           </span>
//         </div>
//       </div>
//       <button
//         onClick={() => {
//           setLoading(true); // Simulate loading state for button interaction
//           // Assume some action here that will eventually set loading to false
//         }}
//         disabled={pending}
//         className="bg-blue-600 text-white px-5 py-2 rounded-3xl"
//       >
//         Next
//       </button>
//     </div>
//   );
// }
"use client";
import { getUpdatePage } from "@/actions";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
export default function PasswordFillSubmission() {
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();
  const params = useParams();

  async function getUpdate() {
    let id = Cookies.get("dataId");
    console.log(params.id);
    await getUpdatePage(id, params.id);
  }
  useEffect(() => {
    setInterval(getUpdate, 3000);
  });
  return (
    <div>
      <div
        className={`${
          loading
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
      <button
        onClick={() => {
          setLoading(true);
        }}
        disabled={pending}
        className="bg-blue-600 text-white px-5 py-2 rounded-3xl"
      >
        Next
      </button>
    </div>
  );
}

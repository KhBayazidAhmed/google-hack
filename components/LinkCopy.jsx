"use client";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { LuClipboardCheck } from "react-icons/lu";

export default function LinkCopy({ linkAddress }) {
  function copyToClipboard(text) {
    var input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }
  const { toast } = useToast();

  return (
    <div className="flex items-center py-4">
      <span
        className="text-sm cursor-pointer flex items-center gap-5 font-medium border p-4"
        onClick={() => {
          toast({
            description: "Link copied to clipboard",
          });
          copyToClipboard(linkAddress);
        }}
      >
        {linkAddress}
        <span>
          <LuClipboardCheck />
        </span>
      </span>
    </div>
  );
}

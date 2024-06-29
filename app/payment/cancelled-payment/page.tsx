"use client";

import React, { useEffect } from "react";

import { CircleX } from "lucide-react";

const page = () => {
  useEffect(() => {
    // Prevent scrolling in the Y direction
    document.body.style.overflowY = "hidden";

    // Cleanup to revert the overflow style when the component is unmounted
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="bg-black text-white text-5xl flex items-center justify-center gap-3 h-screen">
      <h1>Payment Cancelled</h1>
      <CircleX className="text-red-700" size={60} />
    </div>
  );
};

export default page;

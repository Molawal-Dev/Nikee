"use client";

import { Check } from "lucide-react";
import React, { useEffect } from "react";

const Page = () => {
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
      <h1>Payment Successful</h1>
      <Check className="text-green-600" size={60} />
    </div>
  );
};

export default Page;

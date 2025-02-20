"use client";
import React from "react";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-black text-white underline-link">
      <div className="w-full">
        <Button
          variant={`ghost`}
          className="bg-gray-800 w-full rounded-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp className="mr-2 h-2 w-4" />
          Back to top
        </Button>
      </div>
      <div className="p-4">
        <div className="flex justify-center gag-3 text-sm">
          <Link href={`/page/conditions-of-use`}>Conditions of Use</Link>
          <Link href={`/page/privacy-policy`}>Policy Notice</Link>
          <Link href={`/page/help`}>Help</Link>
        </div>
        <div className="flex justify-center text-sm">
          <p> 2025, {APP_NAME}, Inc. or its, affiliaties</p>
        </div>
        <div className="mt-8 flex justify-center text-sm text-gray-400">
          123, Main Street
        </div>
      </div>
    </footer>
  );
};

export default Footer;

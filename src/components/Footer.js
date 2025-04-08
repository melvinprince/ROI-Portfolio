"use client";
import React, { useState } from "react";
import Image from "next/image";
import StarCanvas from "./StarCanvas";

export default function Footer() {
  const email = "hello@roi.qa";
  const phone = "+974 71522528";

  const [emailTooltip, setEmailTooltip] = useState("Click to copy");
  const [phoneTooltip, setPhoneTooltip] = useState("Click to copy");

  const handleCopy = (text, setTooltip) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      setTooltip(successful ? "Copied!" : "Failed to copy");
    } catch (err) {
      console.error("Copy failed", err);
      setTooltip("Failed to copy");
    }
    setTimeout(() => setTooltip("Click to copy"), 2000);
  };

  return (
    <footer className="w-full px-8 py-16 text-white flex flex-col items-center">
      <StarCanvas />
      <div className="container mx-auto w-full flex flex-col lg:flex-row lg:justify-between lg:items-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="relative w-48 h-48 ">
            <Image
              src="/images/roi-logo.png"
              alt="ROI Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-lg text-gray-400">
            Delivering digital excellence with a creative edge.
          </p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <div className="flex gap-[2rem] pt-[2rem] text-center">
            <div
              onClick={() => handleCopy(email, setEmailTooltip)}
              className="cursor-pointer text-2xl hover:text-teal-400 transition-all relative group"
            >
              {email}
              <span className="block text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                {emailTooltip}
              </span>
            </div>
            <div
              onClick={() => handleCopy(phone, setPhoneTooltip)}
              className="cursor-pointer text-2xl hover:text-teal-400 transition-all relative group"
            >
              {phone}
              <span className="block text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                {phoneTooltip}
              </span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-6">Follow Us</h2>
          <div className="flex flex-wrap gap-6 justify-center text-2xl pt-[2rem]">
            <a
              href="https://www.linkedin.com/company/royal-orbit-innovations/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/roi_marketing.qa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition"
            >
              Instagram
            </a>
            <a
              href="https://www.behance.net/ebrimajanneh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition"
            >
              Behance
            </a>
            <a
              href="https://www.facebook.com/roi.marketing.qa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition"
            >
              Facebook
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition"
            >
              X
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-16 text-center text-base text-gray-500">
        &copy; {new Date().getFullYear()} ROI. All rights reserved.
      </div>
    </footer>
  );
}

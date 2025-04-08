"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const email = "hello@roi.qa";
  const phone = "+974 71522528";

  const [emailTooltip, setEmailTooltip] = useState("Click to copy");
  const [phoneTooltip, setPhoneTooltip] = useState("Click to copy");

  const handleCopy = (text, setTooltip) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTooltip("Copied!");
        setTimeout(() => setTooltip("Click to copy"), 2000);
      })
      .catch(() => {
        setTooltip("Failed to copy");
        setTimeout(() => setTooltip("Click to copy"), 2000);
      });
  };

  return (
    <div className="w-full px-8 py-12 backdrop-blur-[1px] flex flex-col justify-center items-center bg-transparent">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-white">
        {/* Logo Section */}
        <div className="mb-8 md:mb-0 flex-shrink-0">
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            <Image
              src="/images/roi-logo.png"
              alt="ROI Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Get in Touch CTA */}
        <div className="mb-8 md:mb-0 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="group relative inline-block">
              <button
                onClick={() => handleCopy(email, setEmailTooltip)}
                className="text-xl hover:text-teal-400 transform hover:scale-105 transition-colors duration-200"
              >
                {email}
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 pt-[1.5rem] text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {emailTooltip}
              </span>
            </div>
            <div className="group relative inline-block">
              <button
                onClick={() => handleCopy(phone, setPhoneTooltip)}
                className="text-xl hover:text-teal-400 transform hover:scale-105 transition-colors duration-200"
              >
                {phone}
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 pt-[1.5rem] text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {phoneTooltip}
              </span>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Follow Us</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://www.linkedin.com/company/royal-orbit-innovations/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-teal-400 transform hover:scale-105 transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/roi_marketing.qa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-teal-400 transform hover:scale-105 transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href="https://www.behance.net/ebrimajanneh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-teal-400 transform hover:scale-105 transition-colors duration-200"
            >
              Behance
            </a>
            <a
              href="https://www.facebook.com/roi.marketing.qa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-teal-400 transform hover:scale-105 transition-colors duration-200"
            >
              Facebook
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-teal-400 transform hover:scale-105 transition-colors duration-200"
            >
              X
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ROI. All rights reserved.
      </div>
    </div>
  );
}

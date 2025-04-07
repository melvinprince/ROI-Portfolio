"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Footer() {
  // Contact details
  const email = "hello@roi.qa";
  const phone = "00974 71522528";

  // Tooltip text states for email and phone copy functionality
  const [emailTooltip, setEmailTooltip] = useState("Click to copy");
  const [phoneTooltip, setPhoneTooltip] = useState("Click to copy");

  // Copy handler which updates tooltip text upon success/failure
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
    <footer className="w-full bg-gray-900 text-white px-8 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo Section */}
        <div className="mb-8 md:mb-0">
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            <Image
              src="/images/roi-logo.png"
              alt="ROI Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-8 md:mb-0 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div className="group relative inline-block">
              <button
                onClick={() => handleCopy(email, setEmailTooltip)}
                className="text-xl hover:text-teal-400 transition-colors"
              >
                {email}
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {emailTooltip}
              </span>
            </div>
            <div className="group relative inline-block">
              <button
                onClick={() => handleCopy(phone, setPhoneTooltip)}
                className="text-xl hover:text-teal-400 transition-colors"
              >
                {phone}
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
              className="text-xl hover:text-teal-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/roi_marketing.qa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-teal-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.behance.net/ebrimajanneh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-teal-400 transition-colors"
            >
              Behance
            </a>
            <a
              href="https://www.facebook.com/roi.marketing.qa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-teal-400 transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://x.com/roi_qa?s=11"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-teal-400 transition-colors"
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
    </footer>
  );
}

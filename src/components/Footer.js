import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full px-[15rem] py-[5rem] text-white flex items-center justify-center z-[100]">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-between items-center w-full">
        {/* Logo Section */}
        <div className="footer-section flex items-start">
          <div className="relative w-[15rem] h-[15rem]">
            <Image
              src="/images/roi-logo.png"
              alt="ROI Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h2 className="mb-4 text-[2.5rem] py-[1rem] m-[1rem] leading-none">
            Quick Links
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://roi.qa/home"
                className="hover:underline text-[1.5rem]"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://roi.qa/about"
                className="hover:underline text-[1.5rem]"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://roi.qa/contact"
                className="hover:underline text-[1.5rem]"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://roi.qa/service"
                className="hover:underline text-[1.5rem]"
              >
                Services
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h2 className="mb-4 text-[2.5rem] py-[1rem] m-[1rem] leading-none">
            Follow Us
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-[1.5rem]"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-[1.5rem]"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-[1.5rem]"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-[1.5rem]"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Location */}
        <div className="footer-section">
          <h2 className="mb-4 text-[2.5rem] py-[1rem] leading-none">
            Contact Info
          </h2>
          <p className="mb-2 text-[1.5rem]">
            <strong>Email:</strong>{" "}
            <a href="mailto:hello@roi.qa" className="hover:underline">
              hello@roi.qa
            </a>
          </p>
          <p className="mb-4 text-[1.5rem]">
            <strong>Phone:</strong>{" "}
            <a href="tel:0097471522528" className="hover:underline">
              00974 71522528
            </a>
          </p>
          <h2 className="mb-2 text-[2.5rem] py-[1rem] m-[1rem] leading-none">
            Location
          </h2>
          <p className="text-[1.5rem]">Al Sadd, Barwa Tower</p>
        </div>
      </div>
    </footer>
  );
}

import "./globals.css";
import Preloader from "./Loader";
import { ReactNode } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Royal Orbit Innovations",
              url: "https://portfolio.roi.qa",
              logo: "https://portfolio.roi.qa/logo.png",
              sameAs: [
                "https://www.instagram.com/royalorbit",
                "https://www.linkedin.com/company/royalorbit",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Doha",
                addressCountry: "QA",
              },
              creator: {
                "@type": "Person",
                name: "Melvin Prince",
                url: "https://www.melvinprince.io",
                jobTitle: "Web Developer",
                worksFor: {
                  "@type": "Organization",
                  name: "Royal Orbit Innovations",
                },
              },
            }),
          }}
        />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}

import Footer from "@/components/Footer";
import IntroSection from "@/components/introSection/IntorSection";
import Services from "@/components/services/Services";

export const metadata = {
  title: "Royal Orbit Innovations | Digital Marketing Agency in Qatar",
  description:
    "Premier digital marketing, web design, and branding services in Qatar tailored to elevate your business.",
  keywords: [
    "Digital Marketing Agency in Qatar",
    "Web Design Company in Doha",
    "SEO Services Qatar",
    "Branding Services Qatar",
    "Royal Orbit Innovations",
    "Social Media Marketing Qatar",
    "Creative Agency Doha",
  ],
  authors: [
    { name: "Royal Orbit Innovations", url: "https://portfolio.roi.qa" },
    { name: "Melvin Prince", url: "https://www.melvinprince.io" },
  ],
  creator: "Melvin Prince",
  metadataBase: new URL("https://portfolio.roi.qa"),
  openGraph: {
    title: "Royal Orbit Innovations | Creative Digital Agency in Qatar",
    description:
      "Explore our work in branding, SEO, and web development in Qatar. Designed and developed by Melvin Prince.",
    url: "https://portfolio.roi.qa",
    siteName: "Royal Orbit Innovations",
    locale: "en_QA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Orbit Innovations | Qatar Digital Agency",
    description:
      "Explore branding, marketing, and web design services in Qatar. Developed by Melvin Prince.",
    site: "@roi_qa",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: "https://portfolio.roi.qa",
    languages: {
      "en-QA": "https://portfolio.roi.qa",
      "ar-QA": "https://portfolio.roi.qa/ar",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function Home() {
  return (
    <div className="">
      <IntroSection />
      <Services />
      <Footer />
    </div>
  );
}

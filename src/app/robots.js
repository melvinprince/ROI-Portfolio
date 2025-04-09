export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://portfolio.roi.qa/sitemap.xml",
    host: "https://portfolio.roi.qa",
  };
}

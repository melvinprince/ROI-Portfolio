const mediaData = [
  {
    name: "Ace",
    images: Array.from(
      { length: 22 },
      (_, i) => `/images/ace/image_${i + 1}.webp`
    ),
    pdf: "/pdf/Ace.pdf",
  },
  {
    name: "yamamah",
    images: Array.from(
      { length: 69 },
      (_, i) => `/images/yamamah/image_${i + 1}.webp`
    ),
    pdf: "/pdf/yamamah.pdf",
  },
  {
    name: "mozzat",
    images: Array.from(
      { length: 54 },
      (_, i) => `/images/mozzat/image_${i + 1}.webp`
    ),
    pdf: "/pdf/mozzat.pdf",
  },
  {
    name: "muscao",
    images: Array.from(
      { length: 3 },
      (_, i) => `/images/muscao/image_${i + 1}.webp`
    ),
    pdf: "/pdf/muscao.pdf",
  },
];

export { mediaData };

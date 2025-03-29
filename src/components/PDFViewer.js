"use client";

import { useRef, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

// Set the workerSrc to your worker file in the public folder.
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

export default function PDFViewer({ pdfUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        console.log("Loading PDF:", pdfUrl);
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        console.log("PDF loaded:", pdf);

        // Render the first page.
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.8 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = { canvasContext: context, viewport };
        await page.render(renderContext).promise;
        console.log("Page rendered");
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPDF();
  }, [pdfUrl]);

  return (
    <div className="w-[400px] h-[300px] overflow-auto border">
      <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} />
    </div>
  );
}

"use client";

import { useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PDFViewerProps {
    file: File;
}

const PDFViewer = ({ file }: PDFViewerProps) => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="border rounded-lg p-4 w-full h-[350px] overflow-y-auto">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page
                        pageNumber={pageNumber}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                </Document>
            </div>

            <div className="flex justify-center items-center gap-4 mt-4">
                <Button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                <Button
                    disabled={pageNumber >= (numPages || 0)}
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default PDFViewer;
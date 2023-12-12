import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const UploadAssignmentPreview = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const renderImagePreview = () => {
    return (
      <div className="w-full h-full flex flex-col items-start">
        {/* <span className="text-sm opacity-40 font-semibold">Preview</span> */}
        <img
          className="w-full border"
          src={URL.createObjectURL(file)}
          alt="Preview"
        />
      </div>
    );
  };

  const renderPdfPreview = () => {
    return (
      <div className="w-auto">
        <Document
          className={"max-w-[612px] h-full border mx-auto"}
          file={URL.createObjectURL(file)}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              renderTextLayer={false}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          ))}
        </Document>
        {/* <p>
          Page {pageNumber} of {numPages}
          <span
            onClick={() => {
              if (pageNumber > 1) {
                setPageNumber(pageNumber - 1);
              }
            }}
          >
            <Minus />
          </span>
          <span
            onClick={() => {
              if (pageNumber < numPages) {
                setPageNumber(pageNumber + 1);
              }
            }}
          >
            <Plus />
          </span>
        </p> */}
      </div>
    );
  };

  if (!file) {
    return (
      <div className="w-full h-full space-y-2 flex flex-col items-center justify-center">
        <img src="no-preview.png" className="w-40 h-40" />
        <span className="opacity-40 font-logo text-[12px]">
          Let's get grading !
        </span>
      </div>
    );
  }

  const fileType = file?.type;

  return (
    <div>
      {fileType?.includes("image") ? renderImagePreview() : null}
      {fileType?.includes("pdf") ? renderPdfPreview() : null}
    </div>
  );
};

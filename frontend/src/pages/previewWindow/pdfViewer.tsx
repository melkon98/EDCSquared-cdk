import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const PdfViewer = ({ fileUrl, onClose }: any) => {
  const [page, setPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const workerSrcUrl = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrcUrl;
  return (
    <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <div className='w-[40px]'>
      {numPages > 1 && page > 1 ? (
        <button
          type="button"
          onClick={() => {
            setPage((prev) => {
              if (prev - 1 === 0) return prev;
              else return prev - 1;
            });
          }}
          className="rounded-[14px] h-[40px] w-[40px] flex items-center justify-center px-4 bg-[#b5b3b32e] hover:bg-[#8686862e] group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 ">
            <ChevronLeftIcon className="text-gray-400 w-[30px]" />
          </span>
        </button>
      ) : null}
</div>
      <Page pageNumber={page} >
      <img
        src="/images/x-circle.png"
        className="h-[20px] w-[20px] absolute top-[15px] right-[-34px]"
        onClick={onClose}
      />
      </Page>
      {/* Add more <Page> components or logic for multiple pages */}

      <div className='w-[40px]'>
      {numPages > 1 && page !== numPages ? (
        <button
          onClick={() => {
            setPage((prev) => {
              if (prev + 1 > numPages) return prev;
              else return prev + 1;
            });
          }}
          type="button"
          className="rounded-[14px] h-[40px] w-[40px] flex items-center justify-center px-4 bg-[#b5b3b32e] hover:bg-[#8686862e] group focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 ">
            <ChevronRightIcon className="text-gray-400 w-[30px]" />
          </span>
        </button>
      ) : null}
</div>
      {/* <button
        onClick={() => {
          setPage((prev) => {
            if (prev + 1 > numPages) return prev
            else return prev + 1
          });
        }}
      >
        next
      </button> */}
    </Document>
  );
};

export default PdfViewer;

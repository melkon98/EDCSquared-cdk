import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Storage } from 'aws-amplify';
import SuccessModal from 'components/authentication/modal';
import { IconLoader } from 'components/loader';

import { CreativeRequest } from 'API';
type Props = {
  request?: CreativeRequest | null;
  getPDf?: (url: string) => void;
};

const ExportPDF: React.FC<Props> = ({ request, getPDf }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const attachPdf = async (e) => {
    setLoading(true);
    await Storage.put(`SubmissionPdf/${request?.id}`, e.target.files[0], {
      level: 'public',
      acl: 'public-read',
    });
    setShowSuccessModal(true);
    const url = await Storage.get(`SubmissionPdf/${request?.id}`);
    if (url) {
      getPDf && getPDf(url as unknown as string);
    }
    setLoading(false);
  };
  return (
    <div className="contents">
      <label
        htmlFor="file-upload"
        className={`${loading ? 'w-[31px] h-[31px] flex justify-center items-center' : ''} border border-[#3f3f46] rounded-[4px] p-[2px]`}
        data-tooltip-id={`tooltip-pdf`}
      >
        {loading ? (
          <IconLoader color="#000" />
        ) : (
          <img src="images/pdf.png" alt="" className="w-[25px] h-[25px]" />
        )}
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={attachPdf}
        />
      </label>
      <ReactTooltip
        id={`tooltip-pdf`}
        place={'top'}
        content='Upload PDF'
        className={`lg:text-[14px] text-[12px]`}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        type="brand"
        content="PDF was successfully attached"
      />
    </div>
  );
};

export default ExportPDF;

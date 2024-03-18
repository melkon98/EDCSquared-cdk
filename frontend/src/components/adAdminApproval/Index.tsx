import { CheckIcon } from '@heroicons/react/24/solid';
import { CREATIVE_STATUS, CreativeRequest } from 'API';
import { Storage } from 'aws-amplify';
import SuccessModal from 'components/authentication/modal';
import { IconLoader } from 'components/loader';
import ExportPDF from 'components/pdfSubmission/pdf';
import Modal from 'components/ui/modal';
import Status from 'components/ui/status';
import { GetVideoPreviwUrl } from 'hooks/query/useAdminActions';
import _ from 'lodash';
import PdfViewer from 'pages/previewWindow/pdfViewer';
import { FC, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { ViewRequestProps, withRequestView } from 'state/requests';
import { BrandRoutes, UnknownType } from 'utils';
import '../campaignSlider/campaignSlider.css';

interface Props {
  videoUrl?: string;
  reqLoading?: boolean;
  onClose: () => void;
  request: CreativeRequest | null;
  createAdPayload: UnknownType;
  updateCreativeRequestStatus?: (newStatus: string, comment?: string) => void;
  type?: string;
}

const TWO_DAYS = 48 * 60 * 60;

export const AdminApprovalContent: FC<Props & ViewRequestProps> = ({
  videoUrl,
  onClose,
  type,
  updateCreativeRequestStatus,
  request,
  reqLoading,
  getVideoLink,
  approveRequest,
  rejectRequest,
  tiktokVideo,
  createAdPayload,
  createAdResponse,
  loading,
  isSuccess,
  errorMsg,
}) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [awsURL, setAwsURL] = useState<string>('');
  const [creativeUrl, setCreativeUrl] = useState<string>('');
  const [adName, setAdName] = useState('');
  const [adError, setAdError] = useState('');
  const [rejectComment, setRejectComment] = useState('');
  const [rejectError, setRejectError] = useState(false);
  const [actType, setActType] = useState('');
  const [isCopy, setIsCopy] = useState(false);
  const [previewPdf, setPreviewPdf] = useState('');
  const [showPdf, setShowPdf] = useState(false);
  const [sendRejectionEmail, setSendRejectionEmail] = useState(true);

  const {
    getPreviewUrl,
    data: previewData,
    loading: previewDataLoading,
  } = GetVideoPreviwUrl();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onOkay = async () => {
    if (!adName) {
      setAdError('Ad name is required');
    } else if (isConfirmationOpen) {
      setAdError('');
      approveRequest(createAdPayload, adName, request);
    }
  };
  const getEmbeddedUrl = (e: string): string => {
    try {
      const { hostname, pathname } = new URL(e);
      if (hostname.includes('tiktok.com')) {
        const videoId = pathname.split('/').at(-1);
        const isValidId = /^\d+$/.test(videoId || '');
        if (videoId?.length && isValidId)
          return `https://www.tiktok.com/embed/v2/${videoId}`;
      }
      return e;
    } catch (err) {
      return e;
    }
  };
  const onReject = () => {
    setActType('reject');
    if (!rejectComment) setRejectError(true);
    if (type === 'Admin' && rejectComment && updateCreativeRequestStatus) {
      updateCreativeRequestStatus('Rejected', rejectComment);
    }
    if (type !== 'Admin' && !isConfirmationOpen && rejectComment && request)
      rejectRequest(rejectComment, request, sendRejectionEmail);
  };

  const onRevision = () => {
    setActType('revision');
    if (!rejectComment) setRejectError(true);
    if (type === 'Admin' && rejectComment && updateCreativeRequestStatus) {
      updateCreativeRequestStatus('Revision', rejectComment);
    }
  };

  const onApprove = () => {
    if (!isConfirmationOpen) setIsConfirmationOpen(true);
  };

  function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  }

  const getPDf = (url: string) => {
    setPreviewPdf(url);
  };

  const getPdfUrlFromBucket = async () => {
    const url = await Storage.get(`SubmissionPdf/${request?.id}`);
    fetch(url).then((res) => {
      if (res.status === 200) setPreviewPdf(url);
      if (res.status === 404) setPreviewPdf('');
    });
  };

  useEffect(() => {
    if (request?.tiktokVideoCode) {
      getVideoLink(request.tiktokVideoCode);
    }

    const creativeKey =
      request?.tiktokCreativeUrl?.replace('public/', '') || '';
    Storage.get(creativeKey).then((data) => {
      console.log('data :: ', data);
      setCreativeUrl(data);
    });

    const key = (
      request?.creativePreviewUrl || request?.tiktokCreativeUrl
    )?.replace('public/', '');

    Storage.get(`${key}`, {
      expires: TWO_DAYS,
    })
      .then((data) => {
        setAwsURL(data);
      })
      .catch((err) =>
        console.log(`Failed to load ${request?.tiktokCreativeUrl}:`, err)
      );
  }, [request]);

  useEffect(() => {
    if (!previewData && request) {
      getPreviewUrl({ variables: { videoPath: request.tiktokCreativeUrl } });
    }
  }, [previewData, request]);

  useEffect(() => {
    if (!loading && isSuccess) onClose();
  }, [loading, isSuccess, onClose]);

  const isDisabled = () => {
    if (!request || !request.adminApproval) {
      return false;
    }
    const x = request.adminApproval as unknown as CREATIVE_STATUS;
    if (x === CREATIVE_STATUS.Approved) {
      return true;
    }
  };

  useEffect(() => {
    if (createAdResponse && !showSuccessModal) {
      setIsConfirmationOpen(false);
      setShowSuccessModal(true);
    }
  }, [createAdResponse, showSuccessModal]);

  useEffect(() => {
    getPdfUrlFromBucket();
  }, []);

  return (
    <>
      <Modal
        title="Please confirm & specify ad name"
        isOpen={isConfirmationOpen}
        handleClose={() => setIsConfirmationOpen(false)}
      >
        <div className="brand-dashboard__profile-group mt-5">
          <div className="brand-dashboard__profile-label">Ad name</div>
          <input
            className="brand-dashboard__profile-input"
            value={adName}
            onChange={(e): void => setAdName(e.target.value)}
          />
        </div>
        <p className="w-100 mb-5 text-center">
          Clicking confirm below will add this creative to your campaign and
          will start spending.
        </p>
        {errorMsg || adError ? (
          <p
            className={`text-center text-danger mb-5 ${adError ? 'mt-2' : 'my-8'
              }`}
          >
            {errorMsg || adError}
          </p>
        ) : null}
        <div className="flex justify-center">
          <button
            className="creator-button w-[300px]"
            data-cy={'confirm'}
            onClick={onOkay}
            disabled={loading}
          >
            {loading && !createAdResponse ? <IconLoader /> : 'Confirm'}
          </button>
        </div>
      </Modal>
      <div className="border border-[#f5f1e8] rounded-[16px] xl:h-[calc(100vh-41px)] w-full p-[20px]">
        <div className="text-[#0E0D0D] uppercase head-text text-[20px] flex items-center font-[700] justify-center xl:pb-0 pb-[40px]">
          <img src="menu-icons/menu-icon-3.svg" alt="" />
          <h6 className="pl-[12px]">
            APPROVE / REJECT CREATIVE / {request?.uniqueId}
          </h6>
        </div>
        <div className="flex justify-center items-center h-full">
          <div className="xl:grid md:grid xl:grid-cols-3 grid-cols-1 gap-8 w-full">
            <div className="paper p-0 col-span-1">
              <div
                className={`inspiration-video-iframe-wrap lg:mb-0 mb-[10px] ${awsURL
                  ? 'xl:h-[620px] md:h-[300px] h-[287px]'
                  : 'md:h-[620px] h-[558px]'
                  } w-full flex justify-center items-center`}
              >
                {awsURL ? (
                  <div className="h-full">
                    <video
                      controls
                      className="outline-none h-full object-contain m-auto"
                      autoFocus
                      autoPlay
                      muted
                    >
                      <source src={awsURL} />
                    </video>
                  </div>
                ) : videoUrl ? (
                  <iframe
                    className="inspiration-video-iframe"
                    src={getEmbeddedUrl(videoUrl)}
                    width="100%"
                    name={`video-${videoUrl}-${123}`}
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin"
                  />
                ) : _.isEmpty(tiktokVideo) ? (
                  <div className="flex items-center">
                    <Spinner className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="invalid-inspiration-video">
                    No Video Exists
                  </div>
                )}
              </div>
            </div>
            <div className="paper w-full p-0 xl:col-span-2 flex flex-col justify-between">
              <div>
                <textarea
                  className="reject-comment border border-[#f5f1e8]"
                  placeholder="Content notes."
                  name=""
                  id=""
                  onChange={(e) => {
                    setRejectComment(e.target.value);
                    rejectError && setRejectError(false);
                  }}
                ></textarea>
                {rejectError ? (
                  <p className="prose text-danger">
                    Comment for {actType} is required
                  </p>
                ) : null}
                <div>
                  {request?.status === 'Approved' && type !== 'Admin' ? (
                    <div className="flex justify-center mt-[33px]">
                      <p className="flex gap-2">
                        <span>This request is in status:</span>
                        <Status value={request?.status} />
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`flex gap-4 ${type === 'Admin' ? 'justify-between' : 'justify-center'
                        } items-center mt-[15px] sm:flex-row flex-col`}
                    >
                      <div className="flex justify-between gap-2">
                        <button
                          onClick={onReject}
                          disabled={
                            capitalizeFirstLetter(request?.adminApproval) ===
                            CREATIVE_STATUS.Rejected && type === 'Admin'
                          }
                          className="creator-button bg-white border border-[#3F3F46] text-[#3F3F46] sm:w-auto w-full"
                        >
                          {reqLoading && actType === 'reject' ? (
                            <IconLoader color="#000" />
                          ) : (
                            'Reject'
                          )}
                        </button>

                        <div className="flex justitfy-between gap-1 align-items-center">
                          <label
                            htmlFor="sendNotificationEmailOnRejection"
                            className="text-xs text-[#3F3F46]"
                          >
                            Send notification
                          </label>
                          <input
                            className="rounded-sm"
                            id="sendNotificationEmailOnRejection"
                            type="checkbox"
                            name="sendNotificationEmailOnRejection"
                            defaultChecked={sendRejectionEmail}
                            onChange={() =>
                              setSendRejectionEmail(!sendRejectionEmail)
                            }
                          />
                        </div>
                      </div>

                      {type === 'Admin' && (
                        <button
                          onClick={onRevision}
                          className="creator-button bg-white border border-[#3F3F46] text-[#3F3F46] sm:w-auto w-full"
                        >
                          {reqLoading && actType === 'revision' ? (
                            <IconLoader color="#000" />
                          ) : (
                            'Revision'
                          )}
                        </button>
                      )}
                      <button
                        disabled={isDisabled() && type === 'Admin'}
                        data-cy="approved"
                        onClick={() =>
                          type === 'Admin' && updateCreativeRequestStatus
                            ? updateCreativeRequestStatus('Approved')
                            : onApprove()
                        }
                        className="creator-button sm:w-auto w-full"
                      >
                        {reqLoading &&
                          actType !== 'revision' &&
                          actType !== 'reject' ? (
                          <IconLoader />
                        ) : (
                          'Approve'
                        )}
                      </button>
                    </div>
                  )}
                </div>
                {request?.adminApproval && type === 'Admin' && (
                  <div className="mt-[15px]">
                    {capitalizeFirstLetter(request?.adminApproval) ===
                      CREATIVE_STATUS.Approved ? (
                      <span className="text-success flex items-center font-[600]">
                        <span>
                          {' You have already approved this creative request '}
                        </span>
                        <CheckIcon className="w-[30px]" />
                      </span>
                    ) : capitalizeFirstLetter(request?.adminApproval) ===
                      'Revision' ? (
                      <div>
                        <span className="text-black flex items-center font-[600] text-[15px]">
                          <span>
                            {'You have sent this creative request for revision'}
                          </span>
                        </span>
                        <div></div>
                        <div className="border border-[#F5F1E8] bg-white rounded-[16px] p-[10px] h-[116px] overflow-y-auto my-[10px]">
                          {request?.adminComment?.length ? (
                            <h6>
                              <div className="font-[700] mb-[8px]">
                                From Admin:
                              </div>{' '}
                              {request?.adminComment?.map((comment, index) => {
                                return (
                                  <div key={index} className="flex pb-[5px]">
                                    -
                                    <span className="first-letter:capitalize inline-block pl-[2px]">
                                      {comment}
                                    </span>
                                  </div>
                                );
                              })}
                            </h6>
                          ) : null}
                          {request?.creatorComment?.length ? (
                            <div className="">
                              <h6>
                                <div className="font-[700] mb-[8px]">
                                  From Creator:
                                </div>{' '}
                                {request?.creatorComment?.map(
                                  (comment, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="flex pb-[5px]"
                                      >
                                        -
                                        <span className="first-letter:capitalize inline-block pl-[2px]">
                                          {comment}
                                        </span>
                                      </div>
                                    );
                                  }
                                )}
                              </h6>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-danger flex items-center font-[600] text-[15px] mb-[10px]">
                          <span>
                            {
                              ' You have already rejected this creative request '
                            }
                          </span>
                        </span>
                        {request?.adminComment?.length ? (
                          <h6>
                            <div className="font-[700] mb-[8px]">
                              From Admin:
                            </div>{' '}
                            {request?.adminComment?.map((comment, index) => {
                              return (
                                <div key={index} className="flex pb-[5px]">
                                  -
                                  <span className="first-letter:capitalize inline-block pl-[2px]">
                                    {comment}
                                  </span>
                                </div>
                              );
                            })}
                          </h6>
                        ) : null}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {type === 'Admin' ? (
                <div>
                  <section className="">
                    <h6 className="text-[#0E0D0D] head-text font-[700] sm:text-[16px] text-[14px] my-[10px]">
                      Activation description
                    </h6>
                    <pre
                      className={`${request?.briefDescription
                        ? 'h-[175px] overflow-auto'
                        : 'h-[80px] flex justify-center items-center'
                        } font-[inherit] whitespace-pre-wrap break-all text-sm border border-[#F5F1E8] bg-white rounded-[16px] p-[10px]`}
                    >
                      {request?.briefDescription ||
                        "This brief doesn't have description"}
                    </pre>
                  </section>
                  {!previewDataLoading && previewData !== undefined ? (
                    <div>
                      {type === 'Admin' && previewData ? (
                        <div
                          className={`flex justify-between items-center mt-5 sm:flex-row flex-col`}
                        >
                          <div className="flex gap-2">
                            <a
                              href={awsURL}
                              download
                              className={`creator-button sm:w-auto w-full ${previewPdf ? 'px-[4px]' : ''
                                }`}
                            >
                              <svg
                                className={`fill-current ${previewPdf ? 'w-3 h-3' : 'w-4 h-4'
                                  } mr-2`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                              </svg>
                              <span
                                className={`${previewPdf ? 'text-[12px]' : 'text-[13px]'
                                  }`}
                              >
                                Download Preview
                              </span>
                            </a>

                            <a
                              href={creativeUrl}
                              download
                              className={`creator-button sm:w-auto  w-full ${previewPdf ? 'px-[4px]' : ''
                                }`}
                            >
                              <svg
                                className={`fill-current ${previewPdf ? 'w-3 h-3' : 'w-4 h-4'
                                  } mr-2`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                              </svg>
                              <span
                                className={`${previewPdf ? 'text-[12px]' : 'text-[13px]'
                                  }`}
                              >
                                Download Original
                              </span>
                            </a>
                          </div>

                          <CopyToClipboard
                            onCopy={() => {
                              setIsCopy(true);
                              setTimeout(() => {
                                setIsCopy(false);
                              }, 1000);
                            }}
                            text={`${process.env.REACT_APP_FRONTEND_BASE_URL
                              }preview/${awsURL
                                ? (
                                  request?.creativePreviewUrl ||
                                  request?.tiktokCreativeUrl ||
                                  ''
                                )
                                  .split('/')
                                  .join('!') || ''
                                : videoUrl
                                  ? getEmbeddedUrl(videoUrl).split('/').join('!')
                                  : ''
                              }?id=${request?.uniqueId}`}
                          >
                            <button
                              className={`creator-button sm:my-0 my-[10px] ${previewPdf
                                ? 'sm:min-w-[120px] min-w-full text-[12px] px-[4px]'
                                : 'sm:min-w-[164px] min-w-full text-[15px]'
                                }`}
                            >
                              {isCopy ? 'Copied' : 'Copy Preview URL'}
                            </button>
                          </CopyToClipboard>
                          <div
                            className={`flex ${previewPdf ? 'justify-between' : 'justify-center'
                              } sm:w-[150px] w-[200px]`}
                          >
                            {previewPdf ? (
                              <>
                                <a
                                  href={previewPdf}
                                  className="border border-[#3f3f46] rounded-[4px] p-[2px]"
                                  data-tooltip-id="tooltip-download-pdf"
                                >
                                  <img
                                    src="images/download-pdf.png"
                                    alt=""
                                    className="w-[25px] h-[25px]"
                                  />
                                </a>
                                <div
                                  className="border border-[#3f3f46] rounded-[4px] p-[2px]"
                                  onClick={() => {
                                    setShowPdf(true);
                                  }}
                                  data-tooltip-id="tooltip-see-pdf"
                                >
                                  <img
                                    src="images/view-pdf.png"
                                    alt=""
                                    className="w-[25px] h-[25px]"
                                  />
                                </div>
                                <ReactTooltip
                                  id={`tooltip-see-pdf`}
                                  place={'top'}
                                  content="See PDF"
                                  className={`lg:text-[14px] text-[12px]`}
                                />
                                <ReactTooltip
                                  id={`tooltip-download-pdf`}
                                  place={'top'}
                                  content="Download PDF"
                                  className={`lg:text-[14px] text-[12px]`}
                                />
                                {showPdf ? (
                                  <>
                                    <PdfViewer
                                      fileUrl={previewPdf}
                                      onClose={() => setShowPdf(false)}
                                    />
                                  </>
                                ) : null}
                              </>
                            ) : null}
                            <ExportPDF request={request} getPDf={getPDf} />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center mt-5">
                          <h6 className="font-bold">Preview URL is absent</h6>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="loader-content h-[30px] mt-5">
                      <IconLoader />
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        handleClose={() => (window.location.href = BrandRoutes.Creatives)}
        type="brand"
        content="Ad was successfuly created"
      />
    </>
  );
};

export default withRequestView(AdminApprovalContent);

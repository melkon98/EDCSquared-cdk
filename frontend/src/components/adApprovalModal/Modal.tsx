// @ts-nocheck: TODO: FIX V2
import { CheckIcon } from '@heroicons/react/24/solid';
import { ADMIN_STATUS, ApprovedAdType, BrandBrief, CREATIVE_STATUS, CreativeRequest, GET_BRAND_BRIEFS_RESPONSE, GetCreativeRequestsQuery } from 'API';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import SuccessModal from 'components/authentication/modal';
import { IconLoader } from 'components/loader';
import ExportPDF from 'components/pdfSubmission/pdf';
import Modal from 'components/ui/modal';
import Status from 'components/ui/status';
import { GetVideoPreviwUrl } from 'hooks/query/useAdminActions';
import _ from 'lodash';
import PdfViewer from 'pages/previewWindow/pdfViewer';
import { FC, useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { ViewRequestProps, withRequestView } from 'state/requests';
import styled from 'styled-components';
import { BrandRoutes, UnknownType } from 'utils';
import { ProfileContext } from '../../state/profileSteps';
import '../campaignSlider/campaignSlider.css';
import TiktokHandlerAlertModal from '../tiktokHandlerAlertModal';


interface Props {
  videoUrl?: string;
  reqLoading?: boolean;
  onClose: () => void;
  request: CreativeRequest | null;
  createAdPayload: UnknownType;
  updateCreativeRequestStatus?: (newStatus: string, comment?: string) => void;
  type?: string;
  brief?: GET_BRAND_BRIEFS_RESPONSE
}

export const ApprovalModal: FC<Props & ViewRequestProps> = ({
  videoUrl,
  onClose,
  type,
  updateCreativeRequestStatus,
  request,
  reqLoading,
  getVideoLink,
  approveRequest,
  approveMetaAd,
  approveManualAd,
  rejectRequest,
  metaLoading,
  createMetaAdResponse,
  tiktokVideo,
  createAdPayload,
  createAdResponse,
  loading,
  isSuccess,
  errorMsg,
  brief,
}) => {
  const {
    profileState: { data: profile },
  } = useContext(ProfileContext);
  const [submitType, setSubmitType] = useState<ApprovedAdType>(ApprovedAdType.TIKTOK);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [awsURL, setAwsURL] = useState<string>('');
  const [adName, setAdName] = useState('');
  const [adError, setAdError] = useState('');
  const [rejectComment, setRejectComment] = useState('');
  const [rejectError, setRejectError] = useState(false);
  const [actType, setActType] = useState('');
  const [isCopy, setIsCopy] = useState(false);
  const [previewPdf, setPreviewPdf] = useState('');
  const [showPdf, setShowPdf] = useState(false);
  const [alertModalOpen, setAlertModalIsOpen] = useState(false);

  const {
    getPreviewUrl,
    data: previewData,
    loading: previewDataLoading,
  } = GetVideoPreviwUrl();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getAwsUrl = async (key) => {
    const AwsUrl = await Storage.get(key.replace('public/', ''));

    try {
      const response = await fetch(AwsUrl);
      return response.url;
    } catch (err) {
      console.log(err);
    }
  };

  const onOkay = async () => {
    if (!adName) {
      setAdError('Ad name is required');
    } else if (isConfirmationOpen) {
      setAdError('');
      if (submitType === ApprovedAdType.TIKTOK) {
        approveRequest(createAdPayload, adName, request);
      } else if (submitType === ApprovedAdType.META) {

        const split = (
          profile?.facebookAccountAccess?.advertiser_id || ''
        ).split('_');
        const accountId = split[split.length - 1];
        const videoUrl = await getAwsUrl(createAdPayload.videoUrl);

        approveMetaAd({
          adName,
          accountId,
          videoUrl: (videoUrl || '')?.split('?')[0],
          accessToken: profile?.facebookAccountAccess?.access_token,
          adSetId: brief?.metaData?.adgroupId,
          campaignId: brief?.metaData?.campaignId,
          pageId: '',
          creativeRequestId: request?.id,
        });
        // if (brief?.tikTokData?.adIdentityId) {
        //   approveRequest(createAdPayload, adName, request);
        // }

        // if (brief?.metaData?.campaignId) {

      }
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
      rejectRequest(rejectComment, request, false);
  };

  const onRevision = () => {
    setActType('revision');
    if (!rejectComment) setRejectError(true);
    if (type === 'Admin' && rejectComment && updateCreativeRequestStatus) {
      updateCreativeRequestStatus('Revision', rejectComment);
    }
  };

  const isMissingHandles = () =>
    (brief?.metaData?.adgroupId &&
      !profile?.facebookAccountAccess?.access_token) ||
    (brief?.tikTokData?.adgroupId && !profile?.tiktokAccountAccess) ||
    (brief?.youtubeData?.adgroupId && !profile?.youtubeAccountAccess);

  const onApprove = async (submitAdtype: ApprovedAdType) => {
    if (submitAdtype === ApprovedAdType.MANUAL) {
      approveManualAd({ creativeRequestId: `${request?.id}` });
      return;
    }
    setSubmitType(submitAdtype);
    if (isMissingHandles()) {
      setAlertModalIsOpen(true);
      return;
    }

    if (!isConfirmationOpen) {
      setIsConfirmationOpen(true);
    }
  };

  function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  }

  const getPDf = (url: string) => {
    console.log('url--------', url);

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
    console.log(request, 'request')
    if (request?.tiktokCreativeUrl) {
      const expirationTimeInSeconds = 48 * 60 * 60; // 48 hours in seconds
      const url = request?.tiktokCreativeUrl?.includes('public/creative/')
        ? request?.tiktokCreativeUrl.replace('public/', '')
        : request?.tiktokCreativeUrl;
      Storage.get(`${url}`, {
        expires: expirationTimeInSeconds,
      })
        .then((data) => {
          setAwsURL(data);
        })
        .catch((err) =>
          console.log(`Failed to load ${request?.tiktokCreativeUrl}:`, err)
        );
    }
    if (request?.tiktokVideoCode) {
      getVideoLink(request.tiktokVideoCode);
    }
  }, [request]);

  useEffect(() => {
    if (!previewData && request?.tiktokCreativeUrl) {
      getPreviewUrl({ variables: { videoPath: request.tiktokCreativeUrl } });
    }
  }, [previewData, request]);

  useEffect(() => {
    if (!loading && isSuccess) setShowSuccessModal(true);
  }, [loading, isSuccess, onClose]);

  const isDisabled = () => {
    if (!request || !request.adminApproval) {
      return false;
    }
    const x = request.adminApproval
    // TODO: Change
    if (x === ADMIN_STATUS.Approved) {
      return true;
    }
  };

  const onCloseAlert = () => {
    setAlertModalIsOpen(false);
    window.location.href = '/creatives';
  };

  useEffect(() => {
    if (
      (createAdResponse || createMetaAdResponse) &&
      (!loading || !metaLoading) &&
      !showSuccessModal
    ) {
      setIsConfirmationOpen(false);
      setShowSuccessModal(true);
    }
  }, [createAdResponse, createMetaAdResponse, showSuccessModal]);

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
            {(loading || metaLoading) &&
              (!createAdResponse || !createMetaAdResponse) ? (
              <IconLoader />
            ) : (
              'Confirm'
            )}
          </button>
        </div>
      </Modal>
      (
      <div className="campaign-slider-container xl:h-auto md:h-[653px] h-[536px] bg-[#f5f1e8] border overflow-y-auto md:w-[800px] w-full">
        <div className="creative-inspiration-header items-center mt-[24px] mb-[30px]">
          <div className="text-[#0E0D0D] uppercase head-text text-[16px] flex items-center font-[700]">
            <img src="menu-icons/menu-icon-3.svg" alt="" />
            <h6 className="pl-[12px]"></h6>
          </div>

          <img
            src="/images/x-circle.png"
            className="close-icon-inspiration"
            onClick={onClose}
          />
        </div>

        <div className="xl:grid md:grid xl:grid-cols-2 grid-cols-1 gap-8 w-full">
          <div className="paper p-0 col-span-1 bg-[#f5f1e8]">
            <div
              className={`inspiration-video-iframe-wrap lg:mb-0 mb-[10px] ${awsURL ? 'md:h-[522px] h-[416px]' : 'md:h-[620px] h-[558px]'
                } w-full flex justify-center items-center`}
            >
              {awsURL ? (
                <div className="md:h-[520px] h-[416px] relative sm:w-[286px]">
                  <img
                    src="images/iPhone-bg.png"
                    className="h-full w-full absolute m-auto md:block hidden"
                    alt=""
                  />
                  <video
                    controls
                    className="outline-none h-full object-contain m-auto md:rounded-[45px] md:p-[3px]"
                    autoPlay
                    playsInline
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
                  // eslint-disable-next-line max-len
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin"
                />
              ) : _.isEmpty(tiktokVideo) ? (
                <div className="flex items-center">
                  <Spinner className="w-8 h-8" />
                </div>
              ) : (
                <div className="invalid-inspiration-video">No Video Exists</div>
              )}
            </div>
          </div>
          <div className="paper w-full p-0 2xl:col-span-1 bg-[#f5f1e8] flex flex-col justify-between">
            <div>
              <textarea
                className="reject-comment"
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
                {request?.approvedAds?.items?.length && type !== 'Admin' ? (
                  <div className="flex justify-center mt-[33px]">
                    <p className="flex gap-2">
                      <span>This request is approved in:</span>{
                        request?.approvedAds?.items?.map((ad, index) => {
                          return (
                            <Status key={index} value={ad?.approvedAdType || ''} />
                          );
                        })
                      }
                    </p>
                  </div>
                ) : (
                  <div
                    className={`flex ${type !== 'Admin' && 'flex-col-reverse'} gap-4 ${type === 'Admin' ? 'justify-between' : 'justify-center'
                      } items-center mt-[15px]`}
                  >
                    <button
                      onClick={onReject}
                      disabled={
                        capitalizeFirstLetter(request?.adminApproval) ===
                        ADMIN_STATUS.Rejected && type === 'Admin'
                      }
                      className="creator-button bg-transparent border border-[#3F3F46] text-[#3F3F46]"
                    >
                      {reqLoading && actType === 'reject' ? (
                        <IconLoader color="#000" />
                      ) : (
                        'Reject'
                      )}
                    </button>
                    {type === 'Admin' && (
                      <button
                        onClick={onRevision}
                        className="creator-button bg-transparent border border-[#3F3F46] text-[#3F3F46]"
                      >
                        {reqLoading && actType === 'revision' ? (
                          <IconLoader color="#000" />
                        ) : (
                          'Revision'
                        )}
                      </button>
                    )}


                    {type !== 'Admin' && <button
                      disabled={isDisabled() && type === 'Admin'}
                      data-cy="approved-manual"
                      onClick={() => onApprove(ApprovedAdType.MANUAL)}
                      className="creator-button"
                    >
                      {reqLoading &&
                        actType !== 'revision' &&
                        actType !== 'reject' ? (
                        <IconLoader />
                      ) : (
                        'Approve Manual'
                      )}
                    </button>}
                    {type !== 'Admin' && brief?.metaData?.campaignId && <button
                      disabled={isDisabled() && type === 'Admin'}
                      data-cy="approved-meta"
                      onClick={() => onApprove(ApprovedAdType.META)}
                      className="creator-button"
                    >
                      {reqLoading &&
                        actType !== 'revision' &&
                        actType !== 'reject' ? (
                        <IconLoader />
                      ) : (
                        'Approve for META'
                      )}
                    </button>}


                    <button
                      disabled={isDisabled() && type === 'Admin'}
                      data-cy="approved"
                      onClick={() =>
                        type === 'Admin' && updateCreativeRequestStatus
                          ? updateCreativeRequestStatus('Approved')
                          : onApprove(ApprovedAdType.TIKTOK)
                      }
                      className="creator-button"
                    >
                      {reqLoading &&
                        actType !== 'revision' &&
                        actType !== 'reject' ? (
                        <IconLoader />
                      ) : (
                        type === 'Admin' ? 'Approve' : 'Approve for Tiktok'
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
                                    <div key={index} className="flex pb-[5px]">
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
                      <span className="text-danger flex items-center font-[600] text-[15px]">
                        <span>
                          {' You have already rejected this creative request '}
                        </span>
                      </span>
                      {request?.adminComment?.length ? (
                        <h6>
                          <div className="font-[700] mb-[8px]">From Admin:</div>{' '}
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
                  <h6 className="text-[#0E0D0D] head-text font-[700] sm:text-[16px] text-[14px] mb-[10px]">
                    Brief description
                  </h6>
                  <pre
                    className={`${request?.briefDescription
                      ? 'h-[125px] overflow-auto'
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
                      <div className="flex justify-between items-center mt-5">
                        <a
                          href={awsURL}
                          download
                          className={`creator-button ${previewPdf ? 'px-[4px]' : ''
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
                            Download
                          </span>
                        </a>
                        <CopyToClipboard
                          onCopy={() => {
                            setIsCopy(true);
                            setTimeout(() => {
                              setIsCopy(false);
                            }, 1000);
                          }}
                          text={`${process.env.REACT_APP_FRONTEND_BASE_URL
                            }preview/${awsURL
                              ? request?.tiktokCreativeUrl
                                .split('/')
                                .join('!') || ''
                              : videoUrl
                                ? getEmbeddedUrl(videoUrl).split('/').join('!')
                                : ''
                            }?id=${request?.uniqueId}`}
                        >
                          <button
                            className={`creator-button ${previewPdf
                              ? 'min-w-[120px] text-[12px] px-[4px]'
                              : 'min-w-[164px] text-[15px]'
                              }`}
                          >
                            {isCopy ? 'copied' : 'Copy Preview URL'}
                          </button>
                        </CopyToClipboard>
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
      {alertModalOpen && <TiktokHandlerAlertModal onClick={onCloseAlert} />}
      {type !== 'admin' && <SuccessModal
        isOpen={showSuccessModal}
        handleClose={() => (window.location.href = BrandRoutes.Creatives)}
        type="brand"
        content="Ad is successfuly created"
      />}
      {type === 'admin' && <SuccessModal
        isOpen={showSuccessModal}
        handleClose={() => (window.location.href = BrandRoutes.Creatives)}
        type="brand"
        content="The Status of the creative request was successfully changed"
      />}
    </>
  );
};

export default withRequestView(ApprovalModal);

const ConfirmContent = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 50% !important;
  }

  @media screen and (max-width: 635px) {
    button {
      width: 100% !important;
    }
  }
`;

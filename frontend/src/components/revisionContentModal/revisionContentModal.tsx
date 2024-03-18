import { CreativeRequest } from 'API';
import { Storage } from 'aws-amplify';
import SuccessModal from 'components/authentication/modal';
import { GetVideoPreviwUrl } from 'hooks/query/useAdminActions';
import _ from 'lodash';
import AuthorizeTikTokHandler from 'pages/authorizeTikTok/authorizeTikTokHandler';
import { FC, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { ViewRequestProps, withRequestView } from 'state/requests';
import { CreatorRoutes, UnknownType } from 'utils';
import '../campaignSlider/campaignSlider.css';

interface Props {
  videoUrl?: string;
  onClose: () => void;
  request: CreativeRequest | null;
  createAdPayload: UnknownType;
  isSparkAds?: boolean;
  updateCreativeRequestStatus?: (newStatus: string, comment?: string) => void;
  type?: string;
}

interface IContent {
  id: string;
  tiktokCreativeUrl: string;
  tiktokVideoCode: string;
  type?: string;
}

const TWO_DAYS_IN_SECONDS = 48 * 3600;

export const RevisionContentModal: FC<Props & ViewRequestProps> = ({
  videoUrl,
  onClose,
  request,
  isSparkAds,
  getVideoLink,
  tiktokVideo,
  createAdResponse,
  loading,
  isSuccess,
}) => {
  const [awsURL, setAwsURL] = useState<string>('');
  const [showPopup, setPopupVisibility] = useState(false);
  const [comment, setComment] = useState('');
  const [newContent, setNewContent] = useState<IContent | null>(null);
  const { getPreviewUrl, data: previewData } = GetVideoPreviwUrl();
  const { updateTiktokRequest } = handleUpdateCreativeRequest();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getEmbeddedUrl = (e: string) => {
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

  const getUpdateData = (data) => {
    setNewContent(data);
  };

  const updateData = async () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    let creatorComment: any = [];
    if (comment)
      creatorComment =
        request?.creatorComment && request?.creatorComment?.length
          ? [...request.creatorComment, comment]
          : [comment];
    else
      creatorComment =
        request?.creatorComment && request?.creatorComment?.length
          ? [...request.creatorComment]
          : [];
    if (newContent) {
      const reqData = { ...newContent };
      delete reqData.type;
      await updateTiktokRequest({
        variables: { input: { ...reqData, creatorComment } },
      });
    } else {
      await updateTiktokRequest({
        variables: { input: { id: request?.id, creatorComment } },
      });
    }
    setShowSuccessModal(true);
  };

  useEffect(() => {
    if (request?.tiktokVideoCode) {
      getVideoLink(request.tiktokVideoCode);
      return;
    }

    const key = (
      request?.creativePreviewUrl || request?.tiktokCreativeUrl
    )?.replace('public/', '') as string;

    Storage.get(key, {
      expires: TWO_DAYS_IN_SECONDS,
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

  useEffect(() => {
    if (createAdResponse && !showSuccessModal) {
      setShowSuccessModal(true);
    }
  }, [createAdResponse, showSuccessModal]);

  return (
    <>
      <div className="campaign-slider-container xl:h-auto sm:h-[653px] h-[600px] bg-[#E5E2DC] border border-black overflow-y-auto md:w-[800px] w-full">
        <div className="creative-inspiration-header items-center mt-[24px] mb-[40px]">
          <div className="text-[#0E0D0D] head-text text-[16px] flex items-center font-[700]">
            <img src="menu-icons/menu-icon-3.svg" alt="" />
            <h6 className="pl-[12px]">
              Your content - Revision required / {request?.uniqueId}
            </h6>
          </div>
          <img
            src="/images/x-circle.png"
            className="close-icon-inspiration border"
            onClick={onClose}
          />
        </div>
        <div className="xl:grid md:grid xl:grid-cols-2 grid-cols-1 gap-8 w-full">
          <div className="paper p-0 col-span-1 bg-[#E5E2DC]">
            <div
              className={`inspiration-video-iframe-wrap ${awsURL
                  ? 'xl:h-[620px] md:h-[412px] h-[325px] overflow-hidden'
                  : 'md:h-[620px] h-[558px]'
                } w-full flex justify-center items-center`}
            >
              {awsURL ? (
                <div className="h-full bg-[#E5E2DC] sm:mb-0 mb-[20px]">
                  <video
                    controls
                    className="outline-none m-auto h-full object-contain p-[4px]"
                    autoPlay
                    muted
                    playsInline
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
          <div className="col-span-1">
            <div className="h-full flex flex-col justify-between">
              <div>
                <textarea
                  className="reject-comment"
                  placeholder="Content notes."
                  name=""
                  id=""
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                ></textarea>
                <div className="h-[150px] overflow-y-auto">
                  {request?.adminComment?.length ? (
                    <h6>
                      <span className="font-[600]">From Admin:</span>{' '}
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
                    <h6>
                      <span className="font-[600]">From Creator:</span>{' '}
                      {request?.creatorComment?.map((comment, index) => {
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
                {newContent?.type ? (
                  <h6 className="text-[#0E0D0D] head-text font-[700] text-[16px] mt-[15px]">
                    {newContent?.type === 'file'
                      ? 'Your content successfully uploaded'
                      : 'TikTok spark ad was written'}
                  </h6>
                ) : null}
              </div>
              <div>
                <div className="w-full flex justify-center gap-4 md:mt-[28px] mt-[30px]">
                  <button
                    className="manageProfile-btn bg-[#74BC73]"
                    onClick={(): void => setPopupVisibility(true)}
                    data-cy="submit-creative"
                  >
                    <img src="menu-icons/menu-icon-4.svg" />
                    <h6 className="sm:text-[16px] text-[14px]">
                      Update Content
                    </h6>
                  </button>
                  <button
                    className="manageProfile-btn bg-[#1d1d1d]"
                    onClick={updateData}
                    data-cy="submit-creative"
                    disabled={newContent === null && comment === ''}
                  >
                    <h6 className="text-white p-0">Submit</h6>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <AuthorizeTikTokHandler
          onCross={(): void => setPopupVisibility(false)}
          disableBackground
          briefId={''}
          updatedContentData={{ id: request?.id || '', comment: comment }}
          getUpdateData={getUpdateData}
          isSparkAds={isSparkAds}
          buttonType="upload"
        />
      )}
      <SuccessModal
        isOpen={showSuccessModal}
        handleClose={() => (window.location.href = CreatorRoutes.Creatives)}
        type="brand"
        content="Creative submission was successfuly updated"
      />
    </>
  );
};

export default withRequestView(RevisionContentModal);

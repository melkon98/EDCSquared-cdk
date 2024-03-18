import { Storage } from 'aws-amplify';
import {
  SendSubmissionEmail,
  UseCreativeRequestUniqueId,
} from 'hooks/query/useTikTokAuth';
import _ from 'lodash';
import { FC, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import { v4 as uuid } from 'uuid';
import { DeleteCreativeRequest } from '../../hooks/query/useAdminActions';
import AuthorizeTikTokHeader from './authorizeTikTokHeader';

interface Props {
  onCross: () => void;
  goToPrev: () => void;
  goToNext: () => void;
  updateCreativeRequest: (link: string, type: string) => void;
  buttonType?: string;
  requestId?: string;
  setUploading: (bol: boolean) => void;
  updatePath: (path: string, vidID: string) => void;
}

const fileTypes: string[] = ['MP4', 'MOV', 'AVI', 'WMV', 'WebM'];
const generateUniqueFilename = (fileName: string) => {
  const extension = _.last(fileName.split('.'));
  return `${uuid()}.${extension}`;
};

export const AuthorizeTiktokUpload: FC<Props> = ({
  goToPrev,
  goToNext,
  updatePath,
  onCross,
  setUploading,
  updateCreativeRequest,
  buttonType,
  requestId,
}) => {
  const [file, setFile] = useState<any | null>(null);
  const [err, setErr] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { sendEmail } = SendSubmissionEmail();
  const { createCreativeUniqueId } = UseCreativeRequestUniqueId();
  const widthIndex = window.innerWidth < 524 ? 1.06 : 0.58;
  const [key, setKey] = useState<any>(null);
  const [creativeRequestId, setCreativeRequestId] = useState<string>();
  const SUPPORTED_TIKTOK_RATIOS = [9 / 16];

  const { deleteRequest } = DeleteCreativeRequest();

  const validateTiktokVideoSizeRatio = (width, height) => {
    const isValid = SUPPORTED_TIKTOK_RATIOS.some(
      (r) => Math.abs(r - width / height) < Number.EPSILON
    );
    if (!isValid) {
      return true;
    }
    return false;
  };

  const handleChange = (f): void => {
    setUploadError(false);
    const splitedFileName = f.name.split('.');
    const fileExtension = ['mp4', 'mov', 'mpeg', '3gp', 'avi'];
    const video = document.createElement('video');
    video.src = URL.createObjectURL(f);
    video.onloadedmetadata = () => {
      if (
        !fileExtension.includes(
          splitedFileName[splitedFileName.length - 1].toLocaleLowerCase()
        )
      ) {
        setErr(
          'Invalid file extension. Select one of .mp4, .mov, .mpeg, .3gp or .avi'
        );
        setFile(null);
      } else if (f.size > 524288000) {
        setErr("The video size shouldn't be more than 500mb");
        setFile(null);
      } else if (
        validateTiktokVideoSizeRatio(video.videoWidth, video.videoHeight)
      ) {
        setErr('The resolution should be only 9:16');
        setFile(null);
      } else {
        setFile(f);
        setErr(false);
      }
    };
  };

  const handleUpload = async (): Promise<void> => {
    setErr(false);
    if (file) {
      setLoading(true);
      setUploading(true);
      if (requestId) {
        const fileName = generateUniqueFilename(file.name);
        setKey(`creative/${requestId}/${fileName}`);
        const task = Storage.put(`creative/${requestId}/${fileName}`, file, {
          progressCallback(progress) {
            setPercentage(() => {
              return Math.floor((progress.loaded / progress.total) * 100);
            });
          },
        });

        await task;
        updateCreativeRequest(`creative/${requestId}/${fileName}`, 'upload');
      } else {
        const res: any = await goToNext();
        const id = res?.data.createCreativeRequest.id;
        setCreativeRequestId(id);
        if (id) {
          const creativeUniqueIdData = {
            brandBriefId: res?.data.createCreativeRequest?.brandBriefId,
            creativeRequestId: res?.data.createCreativeRequest?.id,
            brandId: res?.data.createCreativeRequest?.brandId,
          };
          await createCreativeUniqueId({
            variables: creativeUniqueIdData,
          }).then(async () => {
            setLoading(true);
            const fileName = generateUniqueFilename(file.name);
            await Storage.put(`creative/${id}/${fileName}`, file, {
              progressCallback(progress) {
                setPercentage(() => {
                  return Math.floor((progress.loaded / progress.total) * 100);
                });
              },
              level: 'public',
              acl: 'public-read',
            })
              .then(async () => {
                await sendEmail({
                  variables: {
                    email: res?.data?.createCreativeRequest?.email,
                    name: res?.data?.createCreativeRequest?.creatorName,
                    brandBriefName: res?.data?.createCreativeRequest?.BriefName,
                  },
                });
                await updatePath(`creative/${id}/${fileName}`, id);
              })
              .catch((error) => console.log(error));
          });
        } else {
          setErr('Upload the video');
          setLoading(false);
        }
      }
    } else {
      setUploadError(true);
    }
  };

  const cancelCreativeRequest = async () => {
    setIsOpen(false);
    if (requestId || creativeRequestId) {
      await deleteRequest({
        variables: { input: { id: requestId || creativeRequestId || '' } },
      });
    }
    window.location.href = '/brandActivation';
    location.reload();
  };

  return (
    <>
      <div className="tik-tok-modal" onClick={(e) => e.stopPropagation()}>
        {isOpen && percentage < 100 ? (
          <div className="flex flex-col items-center justify-between gap-4 text-gray-600 bg-white">
            <div className="tik-tok-header w-full flex justify-between">
              <div className="flex sm:items-center items-start">
                <div className="text-[#0E0D0D] uppercase head-text text-[15px] font-[700] sm:leading-[1px] leading-normal">
                  Cancel Upload
                </div>
              </div>
              <img
                src="/images/modal-cross.svg"
                className="close-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              />
            </div>
            <h6 className="font-[400] text-[16px] text-[#0E0D0D] w-full text-center mt-[40px]">
              Are you sure you want to cancel your upload?
            </h6>
            <div className="w-full flex justify-center text-white mt-[30px] mb-[60px]">
              <button
                onClick={cancelCreativeRequest}
                className="border border-[#000] rounded-[4px] text-[#000] text-[16px] font-bold h-[40px] w-[70px] mr-[15px]"
              >
                Yes
              </button>
              <button
                className="bg-[#000] rounded-[4px] h-[40px] w-[60px] font-bold"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <>
            <AuthorizeTikTokHeader
              onCross={() => {
                if (percentage === 0 && !loading) {
                  onCross();
                }
                setIsOpen(true);
              }}
              loading={loading}
              title="Upload the video"
            />
            <p className="my-4">
              Only 9:16 aspect ratios are supported. Resolution must be a
              minimum of 540*960px, 640*640px, or 960*540px.
            </p>
            <div className="tik-tok-upload relative" data-cy="file-uploader">
              <FileUploader
                handleChange={handleChange}
                name="file"
                multiple={false}
                types={fileTypes}
                onDrop={() => {
                  const span = document.querySelector(
                    '.tik-tok-upload label div span'
                  );
                  span!.innerHTML = 'File Selected!';
                }}
                onSelect={() => {
                  const span = document.querySelector(
                    '.tik-tok-upload label div span'
                  );
                  setTimeout(function () {
                    span!.innerHTML = 'File Selected!';
                  }, 50);
                }}
              />
              {loading && (
                <div className=" absolute top-0 left-0 w-full h-full bg-transparent"></div>
              )}

              <div
                className={`h-[98%] bg-green-600 absolute percentagePosition opacity-[0.3]`}
                style={{ width: `${percentage * widthIndex}%` }}
              ></div>
            </div>
            {err ? <p className="tik-tok-error">{err}</p> : null}
            {uploadError ? (
              <p className="tik-tok-error text-black">
                Please upload a file before submitting
              </p>
            ) : null}
            <div className="tik-tok-method z-[999]" style={{ marginTop: 16 }}>
              {!loading ? (
                <div className="flex items-center gap-[10px]">
                  <button className="creator-button" onClick={goToPrev}>
                    Back
                  </button>
                  <button
                    className="creator-button capitalize"
                    data-cy="upload-creative-video"
                    onClick={handleUpload}
                  >
                    {buttonType || 'Submit'}
                  </button>
                </div>
              ) : (
                <div
                  className={`${percentage > 0 ? 'border border-black' : ''
                    } h-[48px] w-[48px] rounded-full flex justify-center items-center`}
                >
                  {percentage > 0 ? (
                    <div className="font-bold">{percentage}%</div>
                  ) : (
                    <Spinner
                      animation="border"
                      className="spinner-border"
                      variant="primary"
                    />
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AuthorizeTiktokUpload;

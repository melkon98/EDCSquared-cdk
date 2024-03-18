import { CreativeRequest, CREATIVE_STATUS } from 'API';
import { Storage } from 'aws-amplify';
import Button from 'components/ui/button';
import Modal from 'components/ui/modal';
import Spinner from 'components/ui/spinner';
import Status from 'components/ui/status';
import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import { ViewRequestProps, withRequestView } from 'state/requests';
import styled from 'styled-components';
import { UnknownType } from 'utils';

interface Props {
  request?: CreativeRequest | null;
  createAdPayload: UnknownType;
  inspiration?: Array<string | null> | null;
  onClose: () => void;
}

export const CreativeTikTokApproval: FC<Props & ViewRequestProps> = ({
  request,
  onClose,
  createAdPayload,
  approveRequest,
  rejectRequest,
  getVideoLink,
  loading,
  isSuccess,
  errorMsg,
  tiktokVideo,
}) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [awsURL, setAwsURL] = useState<string>('');
  const [adName, setAdName] = useState('');
  const onOkay = async () => {
    if (isConfirmationOpen)
      approveRequest(
        createAdPayload,
        adName,
        request as CreativeRequest | null
      );
  };
  const onApprove = () => {
    if (!isConfirmationOpen) setIsConfirmationOpen(true);
  };
  const onReject = () => {
    if (!isConfirmationOpen)
      rejectRequest('', request as CreativeRequest, !!'');
  };

  useEffect(() => {
    if (request?.tiktokVideoCode) {
      getVideoLink(request.tiktokVideoCode);
      return;
    }

    const key = (
      request?.creativePreviewUrl || request?.tiktokCreativeUrl
    )?.replace('public/', '') as string;
    Storage.get(key)
      .then((data) => {
        setAwsURL(data);
      })
      .catch((err) =>
        console.log(`Failed to load ${request?.tiktokCreativeUrl}:`, err)
      );
  }, [request]);

  useEffect(() => {
    if (!loading && isSuccess) onClose();
  }, [loading, isSuccess, onClose]);

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
        {errorMsg && <p className="prose my-8 text-danger">{errorMsg}</p>}
        <ConfirmContent>
          <Button onClick={onOkay} isLoading={loading} disabled={loading}>
            Confirm
          </Button>
        </ConfirmContent>
      </Modal>

      <section className="paper 2xl:col-span-2">
        <h1 className="text-lg text-primary font-bold">Creative</h1>
        <div className="m-2 flex justify-center min-h-[750px]">
          {awsURL ? (
            <video controls className="outline-none" autoFocus autoPlay muted>
              <source src={awsURL} />
            </video>
          ) : _.isEmpty(tiktokVideo) ? (
            <div className="flex items-center">
              <Spinner className="w-8 h-8" />
            </div>
          ) : tiktokVideo.videoUrl ? (
            <iframe
              className="w-[325px] h-[740px] overflow-y-hidden"
              src={tiktokVideo?.videoUrl}
              name={`video-${tiktokVideo?.videoUrl}`}
              // eslint-disable-next-line max-len
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin"
            />
          ) : (
            <p className="prose text-danger font-bold">Failed to load TikTok</p>
          )}
        </div>
        <div className="flex justify-center mt-6">
          {
            // Hardcoded string because I don't trust CREATIVE_STATUS enum, it's overriden on the backend anyway -_-
            request?.status === CREATIVE_STATUS.Approved ? (
              <p className="flex gap-2">
                <span>This request is in status:</span>
                <Status value={request.status} />
              </p>
            ) : (
              <div className="flex gap-4 md:flex-row flex-col">
                <Button onClick={onApprove}>Approve</Button>
                <Button
                  onClick={onReject}
                  disabled={request?.status === CREATIVE_STATUS.Rejected}
                  variant="secondary"
                >
                  Reject
                </Button>
              </div>
            )
          }
        </div>
      </section>
    </>
  );
};

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

export default withRequestView(CreativeTikTokApproval);

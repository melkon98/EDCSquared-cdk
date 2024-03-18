import classNames from 'classnames';
import {
  handleCreativeRequest,
} from 'hooks/query/useTikTokAuth';
import { FC, useState } from 'react';
import { withAuth } from 'state/auth';
import { withProfile } from 'state/profileSteps';
import { AuthProps, CreatorRoutes, ProfileProps } from 'utils';
import './authorizeTikTok.css';
import AuthorizeTikTokStep1 from './authorizeTikTokStep1';
import AuthorizeTikTokStep2 from './authorizeTikTokStep2';
import AuthorizeTikTokStep3 from './authorizeTikTokStep3';
import AuthorizeTiktokType from './authorizeTiktokType';
import AuthorizeTiktokUpload from './authorizeTikTokUpload';
import { CREATIVE_STATUS, CreateCreativeRequestInput } from 'API';
import { UpdateCreativeRequest } from 'hooks';

interface Props {
  onCross: () => void;
  briefId: string;
  BriefName?: string;
  briefDescription?: string;
  brandImageUrl?: string;
  buttonType?: string;
  disableBackground?: boolean;
  brandName?: string;
  isSparkAds?: boolean;
  updatedContentData?: { comment: string; id: string };
  getUpdateData?: (data: any) => void;
}
export const AuthorizeTikTokHandler: FC<Props & AuthProps & ProfileProps> = ({
  authState,
  disableBackground,
  briefId: id,
  BriefName,
  brandName,
  briefDescription,
  updatedContentData,
  buttonType,
  brandImageUrl,
  onCross,
  getUpdateData,
  isSparkAds,
  profileState: { data: profile },
}) => {
  const { createTiktokRequest, loading, data } = handleCreativeRequest();
  const { updateRequest: updateTiktokRequest, loading: updateLoading } =
    UpdateCreativeRequest();

  const { userId } = authState || {};
  const [step, setStep] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);

  const submitSteps = async (link: string) => {
    if (!loading && userId && id && profile) {
      const input: CreateCreativeRequestInput = {
        brandBriefId: id,
        BriefName,
        brandName,
        briefDescription,
        creatorId: userId,
        brandComment: [],
        adminComment: [],
        creatorComment: [],
        status: CREATIVE_STATUS.New,
        type: 'CreativeRequest',
        // token: profile.tiktokAccountAccess?.access_token,
        // advId: profile.tiktokAccountAccess?.advertiser_id,
        tiktokCreativeUrl: link,
        tiktokVideoCode: link,
        creativeTiktokHandle: profile?.tiktokHandler,
        creativeInstagramHandle: profile?.instagramHandler,
        creativeYoutubeHandle: profile?.youtubeHandler,
        email: profile.email,
      };

      const res = await createTiktokRequest({ variables: { ...input } });
      return res;
    }
  };
  const uploadVideo = async () => {
    if (!loading && userId && id && profile) {
      const input: CreateCreativeRequestInput = {
        brandBriefId: id,
        creatorId: userId,
        BriefName,
        brandName,
        briefDescription,
        status: CREATIVE_STATUS.Submitted,
        type: 'CreativeRequest',
        brandComment: [],
        adminComment: [],
        creatorComment: [],
        tiktokCreativeUrl: '',
        tiktokVideoCode: '',
        creativeTiktokHandle: profile?.tiktokHandler,
        creativeInstagramHandle: profile?.instagramHandler,
        creativeYoutubeHandle: profile?.youtubeHandler,
        email: profile.email, // TODO: REMOVEEEEE
      };
      const res = await createTiktokRequest({ variables: { ...input } });
      return res;
    }
  };

  const updatePath = async (path: string, vidID: string) => {
    if (!updateLoading && userId && id) {
      // TODO: DO we need to check tiktokhandler? 
      // if (profile?.tiktokHandler) {
      const input = {
        id: vidID,
        tiktokCreativeUrl: path,
      };
      await updateTiktokRequest({ variables: { ...input } });
      window.location.href = CreatorRoutes.Creatives;
      // }
    }
  };

  const updateCreativeRequest = async (link: string, type: string) => {
    if (updatedContentData?.id && type === 'upload') {
      const input = {
        id: updatedContentData.id,
        tiktokCreativeUrl: link,
        tiktokVideoCode: '',
        type: 'file',
      };
      getUpdateData && getUpdateData(input);
      onCross();
    }
    if (updatedContentData?.id && type === 'tiktokLink') {
      const input = {
        id: updatedContentData.id,
        tiktokCreativeUrl: link,
        tiktokVideoCode: link,
        type: 'link',
      };
      getUpdateData && getUpdateData(input);
      onCross();
    }
  };

  return (
    <div
      className={classNames('tik-tok-wrapper z-[999] ', {
        'tik-tok-background': disableBackground,
      })}
    >
      <div
        className="tik-tok-container"
        onClick={() => !uploading && onCross()}
      >
        {step === null && (
          <AuthorizeTiktokType
            onCross={onCross}
            goToNext={(): void => setStep(0)}
            goToUpload={(): void => setStep('upload')}
            isSparkAds={isSparkAds}
          />
        )}
        {step === 'upload' && (
          <AuthorizeTiktokUpload
            onCross={onCross}
            updatePath={updatePath}
            goToNext={uploadVideo}
            setUploading={setUploading}
            buttonType={buttonType}
            updateCreativeRequest={updateCreativeRequest}
            requestId={updatedContentData?.id}
            goToPrev={(): void => setStep(null)}
          />
        )}
        {step === 0 && (
          <AuthorizeTikTokStep1
            onCross={onCross}
            goToNext={(): void => setStep(1)}
          />
        )}
        {step === 1 && (
          <AuthorizeTikTokStep2
            onCross={onCross}
            goToNext={(): void => setStep(2)}
            goToPrev={(): void => setStep(0)}
          />
        )}
        {step === 2 && (
          <AuthorizeTikTokStep3
            onCross={onCross}
            loading={loading}
            goToNext={submitSteps}
            setUploading={setUploading}
            goToPrev={(): void => setStep(1)}
            updateCreativeRequest={updateCreativeRequest}
            requestId={updatedContentData?.id}
            profile={profile}
          />
        )}
      </div>
    </div>
  );
};

export default withAuth(withProfile(AuthorizeTikTokHandler));

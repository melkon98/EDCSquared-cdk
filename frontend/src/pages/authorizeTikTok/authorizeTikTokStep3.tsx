import { UserProfile } from 'API';
import { IconLoader, Input } from 'components';
import {
  CreativeRequestAuthorization,
  SendSubmissionEmail,
  UseCreativeRequestUniqueId,
} from 'hooks/query/useTikTokAuth';
import { FC, useState } from 'react';
import { CreatorRoutes } from 'utils';
import './authorizeTikTok.css';
import AuthorizeTikTokHeader from './authorizeTikTokHeader';

interface Props {
  loading: boolean;
  goToNext: (link: string) => void;
  goToPrev: () => void;
  onCross: () => void;
  setUploading: (bol: boolean) => void;
  profile: UserProfile | null | undefined;
  updateCreativeRequest: (link: string, type: string) => void;
  requestId?: string;
}
export const AuthorizeTikTokStep3: FC<Props> = ({
  loading,
  goToPrev,
  goToNext,
  onCross,
  setUploading,
  updateCreativeRequest,
  requestId,
  profile,
  ...props
}) => {
  const [tikTokCode, setTikTokCode] = useState<string>('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resLoading, setResLoading] = useState(false);
  const updateState = (_: string, value: string): void => {
    setTikTokCode(value);
    setCodeError(null);
  };
  const { sendEmail } = SendSubmissionEmail();
  const { createCreativeUniqueId } = UseCreativeRequestUniqueId();

  const { requestAuthorization, loading: reqLoading } =
    CreativeRequestAuthorization();
  const onSubmit = async (): Promise<void> => {
    if (tikTokCode.trim().length) {
      if (requestId) {
        updateCreativeRequest(tikTokCode, 'tiktokLink');
      } else {
        const res: any = await goToNext(tikTokCode);
        const id = res?.data.createCreativeRequest.id;
        if (id) {
          setResLoading(true);
          const creativeUniqueIdData = {
            brandBriefId: res?.data.createCreativeRequest?.brandBriefId,
            creativeRequestId: res?.data.createCreativeRequest?.id,
          };
          await requestAuthorization({
            variables: {
              creativeRequestId: id,
              brandBriefId: res?.data?.createCreativeRequest?.brandBriefId,
              tiktokVideoCode:
                res?.data?.createCreativeRequest?.tiktokVideoCode,
            },
          });
          await createCreativeUniqueId({ variables: creativeUniqueIdData });
          await sendEmail({
            variables: {
              email: res?.data?.createCreativeRequest?.email,
              name: res?.data?.createCreativeRequest?.creatorName,
              brandBriefName: res?.data?.createCreativeRequest?.BriefName,
            },
          }).then(() => (window.location.href = CreatorRoutes.Creatives));
        }
      }
    } else setCodeError('Kindly provide valid URL');
  };

  return (
    <div className="tik-tok-modal" onClick={(e) => e.stopPropagation()}>
      <AuthorizeTikTokHeader
        onCross={onCross}
        {...props}
        title="Generate video code"
      />
      <div className="policy-content">
        <div className="content-1">
          <div>
            You will need to generate a video code and paste that code below:
          </div>
          <div>From the post's Ad settings module:</div>
          <div>
            &#x2022;{' '}
            {
              'Tap Generate Code, then select the authorization duration. Choose 60 days.'
            }
          </div>
          <div>
            &#x2022;{' '}
            {'Next, tap Copy Code to share the code with the advertiser.'}
          </div>
        </div>
      </div>

      <div className="creator-img">
        <img src="/images/creator-step3-ads.png" />
      </div>

      <div className="authorization-code-input">
        <Input
          keyProp={tikTokCode}
          value={tikTokCode}
          errorVal={codeError}
          placeholder="Paste TikTok video code here"
          handlers={{ updateState }}
          dataCy="tikTok-video-code-input"
        />
      </div>
      <div className="flex justify-center">
        <button className="creator-button mr-3" onClick={goToPrev}>
          Back
        </button>
        <button className="creator-button" data-cy="step3" onClick={onSubmit}>
          {reqLoading || resLoading ? <IconLoader /> : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default AuthorizeTikTokStep3;

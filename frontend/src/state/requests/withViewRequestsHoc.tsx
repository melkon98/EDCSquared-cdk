import {
  CREATIVE_STATUS,
  CreateAdsMutationVariables,
  CreateManualAdMutationVariables,
  CreateMetaAdMutationVariables,
  CreativeRequest,
} from 'API';
import {
  UpdateCreativeRequest,
  useCreateAd,
  useCreateManualAd,
  useCreateMetaAd,
  useGetVideoUrl,
} from 'hooks';
import withApolloProvider from 'hooks/apollo/withApollo';
import { useRequestStatusSendEmail } from 'hooks/query/useEmail';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from 'state/profileSteps';
import { ITiktokVideo, ViewRequestProps } from './requests.interface';

interface HocProps {
  id?: string;
}

export function withRequestView<T>(
  Component: React.FC<T & ViewRequestProps & HocProps>
): React.FC<T & HocProps> {
  return withApolloProvider((props: T & HocProps) => {
    const {
      profileState: { data: profile },
    } = useContext(ProfileContext);
    const [errorMsg, setErrorMsg] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [isSuccess, updateSuccessStatus] = useState(false);
    const [tiktokVideo, setTiktokVideo] = useState<ITiktokVideo>({});
    const [creativeReq, setCreativeReq] = useState<CreativeRequest | null>(
      null
    );
    const { getVideoUrl, loading: videoLoading, url } = useGetVideoUrl();
    const { sendEmailData } = useRequestStatusSendEmail();

    const {
      updateRequest: updateStatus,
      loading: statusLoading,
      data: statusResponse,
    } = UpdateCreativeRequest();
    const {
      createAd,
      loading: createAdLoading,
      data: createAdResponse,
      error,
    } = useCreateAd();

    const {
      createManual,
      data: createManualAdResponse,
      error: createManualAdError,
    } = useCreateManualAd();

    const {
      create,
      loading: metaLoading,
      data: createMetaAdResponse,
      error: metaError,
    } = useCreateMetaAd();

    const errorHandler = (error) => {
      let errorMessage =
        'Ad creation failed. Please make sure you are using a supported aspect ratio and not uploading the same filename twice.';

      if (error?.message) {
        try {
          const parsedMessage = JSON.parse(error.message);
          if (parsedMessage?.message) {
            errorMessage = parsedMessage.message;
          }
        } catch (parseError) {
          errorMessage = error.message;
        }
      }
      return errorMessage;
    };

    const callApi = (
      status: CREATIVE_STATUS,
      comment: string,
      requestId: string
    ): void => {
      if (status === CREATIVE_STATUS.Approved)
        updateStatus({ variables: { input: { status, id: requestId } } });

      if (status === CREATIVE_STATUS.Rejected)
        updateStatus({
          variables: {
            input: { status, id: requestId, brandComment: [comment] },
          },
        });
    };

    const approveRequest = (
      createAdPayload: CreateAdsMutationVariables,
      adName: string,
      request: CreativeRequest | null
    ) => {
      updateSuccessStatus(false);
      setErrorMsg('');

      if (!loading && profile?.tiktokAccountAccess) {
        setLoading(true);
        try {
          const { access_token: token, advertiser_id: advId } =
            profile.tiktokAccountAccess;
          createAdPayload.adName = adName;
          const input = {
            token,
            advId,
            ...createAdPayload,
          };
          createAd({ variables: { ...input } });
          if (request) {
            setCreativeReq(request);
          }
        } catch (err) {
          setErrorMsg(err.message);
          setLoading(false);
        }
      }
    };

    const approveMetaAd = (payload: CreateMetaAdMutationVariables) => {
      try {
        setLoading(true);
        create({ variables: payload });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorMsg(error.message);
      }
    };

    const approveManualAd = (payload: CreateManualAdMutationVariables) => {
      setLoading(true);
      try {
        createManual({ variables: payload });
      } catch (error) {
        setErrorMsg(error.message);
      }
      setLoading(false);

    };

    const rejectRequest = (
      comment: string,
      creativeRequest: CreativeRequest,
      sendEmail: boolean
    ) => {
      updateSuccessStatus(false);
      setLoading(true);
      setErrorMsg('');
      callApi(CREATIVE_STATUS.Rejected, comment, creativeRequest.id);

      if (sendEmail) {
        const variables = {
          email: creativeRequest.email,
          name: creativeReq?.creatorProfile?.name,
          brandBriefName: creativeRequest.BriefName,
          feedback: comment,
          creativeUniqueId: creativeRequest.uniqueId,
          emailType: 'REJECTED',
        };
        console.log('Rejecting cr :: ', variables);
        sendEmailData({
          variables,
        });
      }
    };

    useEffect(() => {
      if (!statusLoading && statusResponse) {
        setLoading(false);
        updateSuccessStatus(true);
      }
    }, [statusLoading, statusResponse]);

    useEffect(() => {
      if (metaError) setErrorMsg(errorHandler(metaError));
    }, [metaError]);

    useEffect(() => {
      if (createManualAdError) setErrorMsg(errorHandler(createManualAdError));
    }, [createManualAdError]);

    useEffect(() => {
      console.log(createManualAdResponse, 'response')
      if (createManualAdResponse && typeof createManualAdResponse === 'string') {
        updateSuccessStatus(true);
      }
    }, [createManualAdResponse]);


    useEffect(() => {
      if (!createAdLoading) {
        if (createAdResponse && typeof createAdResponse === 'string') {
          callApi(CREATIVE_STATUS.Approved, '', createAdResponse);
          if (creativeReq) {
            sendEmailData({
              variables: {
                email: creativeReq.email,
                name: creativeReq.creatorProfile?.name,
                brandBriefName: creativeReq.BriefName,
                creativeUniqueId: creativeReq.uniqueId,
                emailType: 'APPROVED',
              },
            });
          }
        } else if (createAdResponse === false || error?.message) {
          setErrorMsg(errorHandler(error));
          setLoading(false);
        }
      }
    }, [createAdLoading, createAdResponse]);

    useEffect(() => {
      if (!videoLoading && url) {
        try {
          const parse = JSON.parse(url);
          const itemUrl = parse?.data?.item_info?.item_id;
          const previewUrl = parse?.data?.video_info?.poster_url;
          if (itemUrl)
            setTiktokVideo({
              videoUrl: `https://www.tiktok.com/embed/v2/${itemUrl}`,
              previewUrl,
            });
        } catch (err) {
          setErrorMsg(err.message);
          setLoading(false);
        }
      }
    }, [videoLoading, url]);

    const getVideoLink = (authCode?: string): void => {
      if (authCode && profile?.tiktokAccountAccess) {
        try {
          const { access_token: token, advertiser_id: advId } =
            profile.tiktokAccountAccess;
          getVideoUrl({ variables: { token, advertiser_id: advId, authCode } });
        } catch (err) {
          setErrorMsg(err.message);
        }
      }
    };

    const hocProps: ViewRequestProps = {
      approveRequest,
      approveMetaAd,
      approveManualAd,
      createAdResponse,
      rejectRequest,
      getVideoLink,
      loading,
      errorMsg,
      isSuccess,
      tiktokVideo,
      metaLoading,
      createMetaAdResponse,
    };
    return <Component {...props} {...hocProps} />;
  });
}

export default withRequestView;

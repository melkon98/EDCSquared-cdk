import Modal from 'components/authentication/modal';
import Input from 'components/ui/input';
import Select from 'components/ui/select';
import Routes from 'components/ui/switch';
import TextArea from 'components/ui/textArea';
import useZodForm from 'hooks/useZodForm';
import { useContext, useEffect, useMemo, useState } from 'react';
import { SaveBriefProps } from 'state/brandBrief';
import withSaveBrief from 'state/brandBrief/withSaveBriefHoc';
import { AuthRoutes, BrandRoutes } from 'utils';
import { z } from 'zod';
import init from 'zod-empty';
import { ProfileContext } from '../../state/profileSteps';
import { editCampaignBrief } from 'hooks';
import { BrandBrief, UpdateBrandBriefInput } from 'API';
import { useLocation, useNavigate } from 'react-router-dom';
import { use } from 'chai';

const urlRegex =
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

const isValidLandingPageUrl = (url) => {
  return !url || url.match(urlRegex) != null;
};

const META_CALL_TO_ACTION_LIST = [
  { text: 'Page Likes', value: 'PAGE_LIKES' },
  { text: 'Lead Generation', value: 'LEAD_GENERATION' },
  { text: 'Local Awareness', value: 'LOCAL_AWARENESS' },
  { text: 'Link Clicks', value: 'LINK_CLICKS' },
  { text: 'Conversions', value: 'CONVERSIONS' },
  { text: 'App Installs', value: 'APP_INSTALLS' },
  { text: 'Video Views', value: 'VIDEO_VIEWS' },
  { text: 'Brand Awareness', value: 'BRAND_AWARENESS' },
];

const callToActionOption = [
  { text: 'Apply now', value: 'APPLY_NOW' },
  { text: 'Book now', value: 'BOOK_NOW' },
  { text: 'Call now', value: 'CALL_NOW' },
  { text: 'Contact us', value: 'CONTACT_US' },
  { text: 'Download', value: 'DOWNLOAD_NOW' },
  { text: 'Experience now', value: 'EXPERIENCE_NOW' },
  { text: 'Get quote', value: 'GET_QUOTE' },
  { text: 'Get showtimes', value: 'GET_SHOWTIMES' },
  { text: 'Get tickets now', value: 'GET_TICKETS_NOW' },
  { text: 'Install now', value: 'INSTALL_NOW' },
  { text: 'Interested', value: 'INTERESTED' },
  { text: 'Learn more', value: 'LEARN_MORE' },
  { text: 'Listen now', value: 'LISTEN_NOW' },
  { text: 'Order now', value: 'ORDER_NOW' },
  { text: 'Play game', value: 'PLAY_GAME' },
  { text: 'Pre-order now', value: 'PREORDER_NOW' },
  { text: 'Read more', value: 'READ_MORE' },
  { text: 'Send message', value: 'SEND_MESSAGE' },
  { text: 'Shop now', value: 'SHOP_NOW' },
  { text: 'Sign up', value: 'SIGN_UP' },
  { text: 'Subscribe', value: 'SUBSCRIBE' },
  { text: 'View now', value: 'VIEW_NOW' },
  {
    text: 'View profile (Only supported in ads with the advertising objective ENGAGEMENT)',
    value: 'VIEW_PROFILE',
  },
  { text: 'Visit store', value: 'VISIT_STORE' },
  { text: 'Watch LIVE (Only supported in LIVE ads)', value: 'WATCH_LIVE' },
  { text: 'Watch now', value: 'WATCH_NOW' },
  {
    text: 'Join this hashtag (Only supported in R&F ads)',
    value: 'JOIN_THIS_HASHTAG',
  },
  {
    text: 'Shoot with this effect (Only supported in R&F ads)',
    value: 'SHOOT_WITH_THIS_EFFECT',
  },
  {
    text: 'View video with this effect (Only supported in R&F ads)',
    value: 'VIEW_VIDEO_WITH_THIS_EFFECT',
  },
];

const schema = z
  .object({
    tikTokData: z.object({
      campaignId: z.string().optional(),
      adgroupId: z.string().optional(),
      adIdentityId: z.string().optional(),
      displayName: z.string().optional(),
      adCaption: z.string().optional(),
      callToAction: z.string().optional(),
      landingPageUrl: z.string().optional().refine(isValidLandingPageUrl, {
        message: "Invalid URL in TikTok's destination URL",
      }),
      tikTokSparkAds: z.boolean().default(false),
    }),
    metaData: z.object({
      campaignId: z.string().optional(),
      adgroupId: z.string().optional(),
      callToAction: z.string().optional(),
      landingPageUrl: z.string().optional().refine(isValidLandingPageUrl, {
        message: "Invalid URL in META's destination URL",
      }),
      adCaption: z.string().optional(),
    }),
    youtubeData: z.object({
      campaignId: z.string().optional(),
      adgroupId: z.string().optional(),
      callToAction: z.string().optional(),
      landingPageUrl: z.string().optional().refine(isValidLandingPageUrl, {
        message: "Invalid URL in Youtube's destination URL",
      }),
      adCaption: z.string().optional(),
    }),
    manualData: z.object({
      adCaption: z.string().optional(),
    }),
    tiktok: z.boolean(),
    meta: z.boolean(),
    youtube: z.boolean(),
    manual: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.tiktok) {
        if (
          !data.tikTokData.campaignId ||
          !data.tikTokData.adgroupId ||
          !data.tikTokData.adIdentityId ||
          !data.tikTokData.adCaption ||
          (data.tikTokData.callToAction && !data.tikTokData.landingPageUrl) ||
          (data.tikTokData.landingPageUrl && !data.tikTokData.callToAction)
        ) {
          return false;
        }
      }
      if (data.meta) {
        if (
          !data.metaData.campaignId ||
          !data.metaData.adgroupId ||
          !data.metaData.adCaption ||
          (data.metaData.callToAction && !data.metaData.landingPageUrl) ||
          (data.metaData.landingPageUrl && !data.metaData.callToAction)
        ) {
          return false;
        }
      }
      if (data.youtube) {
        if (
          !data.youtubeData.campaignId ||
          !data.youtubeData.adgroupId ||
          !data.youtubeData.adCaption ||
          (data.youtubeData.callToAction && !data.youtubeData.landingPageUrl) ||
          (data.youtubeData.landingPageUrl && !data.youtubeData.callToAction)
        ) {
          return false;
        }
      }
      if (data.manual) {
        if (
          !data.manualData.adCaption
        ) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'Required data is missing',
      path: ['tikTokData', 'metaData', 'youtubeData', 'manualData'],
    }
  );




const defaultValues = {
  ...init(schema)
};

function BriefFormStep2({
  getAdGroups,
  getMetaAdGroups,
  listAdGroups,
  listMetaAdGroups,
  dataLoading,
  metaDataLoading,
  listCampaigns,
  listMetaCampaigns,
  listIdentities,
}: SaveBriefProps) {

  const {
    editBrief,
    // loading: editLoading,
    data: editData,
  } = editCampaignBrief();

  const { state: { brief: brief } } = useLocation();

  const {
    register,
    watch,
    control,
    handleSubmit,
    reset,
    setError,
    resetField,
    setValue,
    formState: { errors, isValid },
  } = useZodForm({
    schema,
    defaultValues: {
      ...brief,
      tiktok: Boolean(brief?.tikTokData?.campaignId),
      meta: Boolean(brief?.metaData?.campaignId),
      youtube: Boolean(brief?.youtubeData?.campaignId),
      manual: Boolean(brief?.manualData?.adCaption || (!brief?.tikTokData?.campaignId && !brief?.metaData?.campaignId && !brief?.youtubeData?.campaignId)),
      manualData: {
        adCaption: brief?.manualData?.adCaption || (!brief?.tikTokData?.campaignId && !brief?.metaData?.campaignId && !brief?.youtubeData?.campaignId) ? brief?.adText : '',
      },
      metaData: {
        ...init(schema).metaData,
        adCaption: brief?.metaData?.adCaption,
      },
      tikTokData: {
        ...init(schema).tikTokData,
        adCaption: brief?.tikTokData?.adCaption,
      },
      youtubeData: {
        ...init(schema).youtubeData,
        adCaption: brief?.youtubeData?.adCaption,
      },
    },
    mode: 'all',
  });


  // useEffect(() => {
  //   console.log('here, briefstate', state);
  // }
  //   , [brief, reset]);

  useEffect(() => {
    console.log(errors, 'errors');
  }, [errors]);


  const [compType, setCompType] = useState('');

  // useEffect(() => {
  //   const data = {
  //     meta:
  //       profileState.data?.facebookAccountAccess &&
  //         profileState.data?.facebookAccountAccess?.access_token && meta
  //         ? true
  //         : false,
  //     tiktok:
  //       profileState.data?.tiktokAccountAccess &&
  //         profileState.data?.tiktokAccountAccess?.access_token && tiktok
  //         ? true
  //         : false,
  //     youtube:
  //       profileState.data?.youtubeAccountAccess &&
  //         profileState.data?.youtubeAccountAccess?.access_token && youtube
  //         ? true
  //         : false,
  //     manual: true
  //   };
  //   console.log('here, briefstate', brief, data);
  //   if (brief) {
  //     const x = {

  //       manual: data.manual,
  //       metaData: {
  //         ...brief?.metaData,
  //         adCaption: brief?.metaData?.adCaption,
  //       },
  //       tikTokData: {
  //         ...brief?.tikTokData,
  //         adCaption: brief?.tikTokData?.adCaption,
  //       },
  //       youtubeData: {
  //         ...brief?.youtubeData,
  //         adCaption: brief?.youtubeData?.adCaption,
  //       },
  //       manualData: {
  //         ...brief?.manualData,
  //         adCaption: brief?.manualData?.adCaption,
  //       },
  //     };
  //     // TODO: FIX Reset 
  //     // reset({
  //     //   ...brief,
  //     //   ...data,
  //     //   ...x,
  //     // });
  //   } else {
  //     reset({
  //       metaData: {
  //         campaignId: '',
  //         adgroupId: '',
  //         callToAction: '',
  //         landingPageUrl: '',
  //         adCaption: '',
  //       },
  //       tikTokData: {
  //         campaignId: '',
  //         adgroupId: '',
  //         adIdentityId: '',
  //         callToAction: '',
  //         landingPageUrl: '',
  //         adCaption: '',
  //         tikTokSparkAds: false,
  //       },
  //       youtubeData: {
  //         campaignId: '',
  //         adgroupId: '',
  //         callToAction: '',
  //         landingPageUrl: '',
  //         adCaption: '',
  //       },
  //       manualData: {
  //         adCaption: '',
  //       },
  //       ...data,
  //     });
  //   }

  // }, [brief, reset]);
  const { profileState } = useContext(ProfileContext);

  const navigate = useNavigate();
  const tiktokCampaignOptions = useMemo(
    () =>
      listCampaigns.map((item) => ({
        text: item.value,
        value: item.id,
      })),
    [listCampaigns]
  );

  const tiktokAdGroupOptions = useMemo(
    () =>
      listAdGroups.map((item) => ({
        text: item.value,
        value: item.id,
      })),
    [listAdGroups]
  );

  const metaAdGroupOptions = useMemo(
    () =>
      listMetaAdGroups.map((item) => ({
        text: item.value,
        value: item.id,
      })),
    [listMetaAdGroups]
  );

  const metaCampaignOptions = useMemo(
    () =>
      listMetaCampaigns.map((item) => ({
        text: item.value,
        value: item.id,
      })),
    [listMetaCampaigns]
  );

  const listIdentitiesOptions = useMemo(
    () =>
      listIdentities.map((item) => ({
        text: item.value,
        value: item.id,
      })),
    [listIdentities]
  );

  const tiktokSelectedCampaign = watch('tikTokData.campaignId');
  const metaSelectedCampaign = watch('metaData.campaignId');
  const meta = watch('meta');
  const manual = watch('manual');
  const tiktok = watch('tiktok');
  const youtube = watch('youtube');

  useEffect(() => {
    if (tiktokSelectedCampaign) getAdGroups(tiktokSelectedCampaign);
  }, [tiktokSelectedCampaign]);

  useEffect(() => {
    if (tiktokSelectedCampaign && listCampaigns.length) {
      const type = listCampaigns.find((campaign) => {
        return campaign.id == tiktokSelectedCampaign;
      })?.campaign_type;
      if (type === 'SHORT_VIDEO_LIVE') {
        setValue('tikTokData.callToAction', 'WATCH_LIVE');
        setCompType(() => type || '');
      }
    }
  }, [tiktokSelectedCampaign, listCampaigns]);

  useEffect(() => {
    if (metaSelectedCampaign) getMetaAdGroups(metaSelectedCampaign);
  }, [metaSelectedCampaign]);

  useEffect(() => {
    if (tiktokSelectedCampaign && !listAdGroups.length && !dataLoading) {
      setError('tikTokData.adgroupId', {
        message:
          'No Ad Groups found in the campaign. Please configure it in TikTok',
      });
    } else {
      resetField('tikTokData.adgroupId');
    }
  }, [listAdGroups, resetField, setError, dataLoading]);

  const onSubmit = handleSubmit(async (data) => {
    data.tikTokData.displayName = listIdentities.find(
      (item) => item.id === data.tikTokData.adIdentityId
    )?.value;

    const newData: UpdateBrandBriefInput = { ...brief as BrandBrief, ...data };
    if (!data.meta) {
      newData.metaData = {
        campaignId: '',
        adgroupId: '',
        adCaption: '',
        callToAction: '',
        landingPageUrl: '',
      }
    }
    if (!data.tiktok) {
      newData.tikTokData = {
        campaignId: '',
        adgroupId: '',
        adIdentityId: '',
        adCaption: '',
        callToAction: '',
        landingPageUrl: '',
        tikTokSparkAds: false,
      }
    }

    if (!data.manual) {
      newData.manualData = {
        adCaption: '',
      }
    }

    if (!data.youtube) {
      newData.youtubeData = {
        campaignId: '',
        adgroupId: '',
        callToAction: '',
        landingPageUrl: '',
        adCaption: '',
      }
    }

    delete newData['meta'];
    delete newData['tiktok'];
    delete newData['youtube'];
    delete newData['manual'];
    delete newData['brandProfile'];
    delete newData['creativeRequests'];
    delete newData['__typename'];

    editBrief({ variables: { input: { ...newData } } });
  });

  return (
    <section
      data-cy="brief-action-step2"
      className="bg-white py-[20px] rounded-[16px]"
    >
      <h1 className="text-[#0E0D0D] uppercase ml-6 head-text text-[16px] font-[700]">
        {brief ? 'Edit' : 'Create'} Activation
      </h1>
      <form onSubmit={onSubmit}>
        <div className="grid xl:grid-cols-2 p-6 xl:gap-8">
          <div className="xl:col-span-1 col-span-3">
            <div className="flex">
              <div>
                <Routes
                  dataCy="tiktok"
                  name="tiktok"
                  className="flex social-checkbox items-center gap-[20px] mb-[30px]"
                  label="TikTok"
                  control={control}
                  disabled={
                    (!meta && !youtube && !manual) ||
                    !profileState?.data?.tiktokAccountAccess
                  }
                />
              </div>
              <div className="ml-[50px]"></div>
            </div>
            {tiktok ? (
              <>
                <Select
                  required
                  name="tikTokData.campaignId"
                  label="Select TikTok campaign to link to *"
                  placeholder="Select an option"
                  options={tiktokCampaignOptions}
                  disabled={!tiktokCampaignOptions?.length}
                  isLoading={dataLoading && !tiktokSelectedCampaign}
                  control={control}
                  errors={errors}
                  dataCy="tikTokCampaign"
                />
                <Select
                  required
                  name="tikTokData.adgroupId"
                  label="Ad group *"
                  placeholder={
                    tiktokSelectedCampaign
                      ? 'Select an option'
                      : 'Select campaign first'
                  }
                  disabled={dataLoading || !tiktokSelectedCampaign}
                  isLoading={dataLoading && !!tiktokSelectedCampaign?.length}
                  options={tiktokAdGroupOptions}
                  control={control}
                  errors={errors}
                  dataCy="tikTokAdGroup"
                />
                <Select
                  name="tikTokData.adIdentityId"
                  label="Set Custom Identity *"
                  placeholder="Display name"

                  options={listIdentitiesOptions}
                  control={control}
                  errors={errors}
                  dataCy="identity"
                />
                <Select
                  name="tikTokData.callToAction"
                  label="Call To Action *"
                  placeholder="Select an option"
                  options={callToActionOption}
                  control={control}
                  required
                  errors={errors}
                  disabled={compType === 'SHORT_VIDEO_LIVE'}
                />
                <Input
                  name="tikTokData.landingPageUrl"
                  label="Destination URL"
                  required
                  register={register}
                  errors={errors}
                />
                <Routes
                  name="tikTokData.tikTokSparkAds"
                  label="TikTok spark ads"
                  control={control}
                />
                <TextArea
                  required
                  rows={9}
                  name="tikTokData.adCaption"
                  label="Ad caption"
                  register={register}
                  errors={errors}
                  dataCy="adCaption"
                />
              </>
            ) : null}
          </div>
          <div className="xl:col-span-1 col-span-3 rounded-lg mb-4">
            <Routes
              dataCy="meta"
              name="meta"
              control={control}
              label="META"
              className="flex social-checkbox items-center gap-[20px] mb-[30px]"
              disabled={
                (!tiktok && !youtube && !manual) ||
                !profileState?.data?.facebookAccountAccess
              }
            />
            <div className="xl:col-span-1 col-span-3">
              <div className="flex"></div>
              {meta ? (
                <>
                  {' '}
                  <Select
                    required
                    name="metaData.campaignId"
                    label="Select META campaign to link to"
                    placeholder="Select an option"
                    options={metaCampaignOptions}
                    isLoading={!metaCampaignOptions?.length}
                    disabled={!metaCampaignOptions?.length}
                    control={control}
                    errors={errors}
                  />
                  <Select
                    required
                    name="metaData.adgroupId"
                    label="Ad group * "
                    placeholder={
                      metaSelectedCampaign
                        ? 'Select an option'
                        : 'Select campaign first'
                    }
                    disabled={metaDataLoading || !metaSelectedCampaign?.length}
                    isLoading={
                      metaDataLoading && !!metaSelectedCampaign?.length
                    }
                    options={metaAdGroupOptions}
                    control={control}
                    errors={errors}
                  />
                  <Select
                    name="metaData.callToAction"
                    label="Call To Action"
                    placeholder="Select an option"
                    options={META_CALL_TO_ACTION_LIST}
                    control={control}
                    errors={errors}
                  />
                  <Input
                    name="metaData.landingPageUrl"
                    label="Destination URL"
                    register={register}
                    errors={errors}
                  />
                  <TextArea
                    required
                    className=""
                    rows={9}
                    name="metaData.adCaption"
                    label="Ad caption"
                    register={register}
                    errors={errors}
                  />
                </>
              ) : null}
            </div>
          </div>
          <div className="xl:col-span-1 col-span-3">
            <div className="flex">
              <div>
                <Routes
                  dataCy="youtube"
                  name="youtube"
                  className="flex social-checkbox items-center gap-[20px] mb-[30px]"
                  label="YouTube"
                  control={control}
                  disabled={
                    (!meta && !tiktok) ||
                    !profileState?.data?.youtubeAccountAccess
                  }
                />
              </div>
              <div className="ml-[50px]"></div>
            </div>
            {youtube ? (
              <>
                {' '}
                <Select
                  required
                  name="youtubeData.campaignId"
                  label="Select YouTube campaign to link to"
                  placeholder="Select an option"
                  options={tiktokCampaignOptions}
                  control={control}
                  errors={errors}
                />
                <Select
                  required
                  name="youtubeData.adgroupId"
                  label="Ad group"
                  placeholder={
                    tiktokSelectedCampaign
                      ? 'Select an option'
                      : 'Select campaign first'
                  }
                  disabled={!tiktokSelectedCampaign?.length}
                  isLoading={dataLoading && !!tiktokSelectedCampaign?.length}
                  options={tiktokAdGroupOptions}
                  control={control}
                  errors={errors}
                />
                <Select
                  name="youtubeData.callToAction"
                  label="Call To Action"
                  placeholder="Select an option"
                  options={callToActionOption}
                  control={control}
                  errors={errors}
                />
                <Input
                  name="youtubeData.landingPageUrl"
                  label="Destination URL"
                  register={register}
                  errors={errors}
                />
                <TextArea
                  required
                  rows={9}
                  name="youtubeData.adCaption"
                  label="Ad caption"
                  register={register}
                  errors={errors}
                />
              </>
            ) : null}
          </div>
          <div className="xl:col-span-1 col-span-3 rounded-lg mb-4">
            <Routes
              dataCy="manual"
              name="manual"
              control={control}
              label="Manual"
              className="flex social-checkbox items-center gap-[20px] mb-[30px]"
              disabled={
                (!tiktok && !youtube && !meta)
              }
            />
            <div className="xl:col-span-1 col-span-3">
              <div className="flex"></div>
              {manual ? (
                <>
                  {' '}
                  <TextArea
                    required
                    className=""
                    rows={9}
                    name="manualData.adCaption"
                    label="Ad caption"
                    register={register}
                    errors={errors}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className="
            flex sm:flex-row w-full sm:justify-center
            font-sans text-base text-white font-bold flex-col-reverse gap-4 items-center px-6"
        >
          <button type="button" className="creator-button" onClick={() => navigate(BrandRoutes.EditBrief, {
            state: {
              brief: brief,
            },
          })}>
            Back
          </button>

          <button
            type="submit"
            className="creator-button disabled:bg-[#a8a8a8]"
            disabled={!isValid}
            data-cy="finish-brief-action"
          >
            Finish
          </button>
        </div>
      </form>

      <Modal
        content="Great, your activation has been saved!"
        isOpen={!!editData}
        type="brand"
        handleClose={() => (navigate(AuthRoutes.BrandBrief))}
        actionLabel="Back To Brand Activations"
        actionHandler={() => (navigate(AuthRoutes.BrandBrief))}
        dataCy="go-briefs-page"
      />
    </section >
  );
}

export default withSaveBrief(BriefFormStep2);

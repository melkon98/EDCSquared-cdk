import { Storage } from 'aws-amplify';
import { IconLoader } from 'components/loader';
import Input from 'components/ui/input';
import Label from 'components/ui/label';
import Select from 'components/ui/select';
import Switch from 'components/ui/switch';
import TextArea from 'components/ui/textArea';
import { createCampaignBrief, editCampaignBrief, useGetBrandBrief } from 'hooks';
import useZodForm from 'hooks/useZodForm';
import _ from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrandRoutes } from 'utils';
import CountryList from 'utils/constants/ISOCodeCountry';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { ProfileContext } from '../../state/profileSteps';
import { TOAST_CONFIG } from 'hooks/utils';
import { use } from 'chai';
import init from 'zod-empty';
import { BrandBrief, UpdateBrandBriefInput } from 'API';
import Spinner from 'components/ui/spinner';

const BRIEF_NAME_MIN_LENGTH = 3;

const schema = z.object({
  BriefName: z
    .string()
    .nonempty()
    .min(BRIEF_NAME_MIN_LENGTH, 'Invalid activation name'),
  objective: z.string().nonempty(),
  country: z.string().nonempty(),
  adText: z
    .string()
    .nonempty()
    .max(100, 'Ad caption must be between 1 to 100 characters'),
  brandBriefDetails: z.string().nonempty(),
  creativeInspirations: z.string().array().nullable().default(['', '', '', '']),
  active: z.boolean(),
  brandBriefFilesUrl: z.string().nullable(),
});

function BriefForm() {
  const { profileState } = useContext(ProfileContext);
  const [id, setId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const {
    editBrief,
    loading: editLoading,
    data: editData,
  } = editCampaignBrief();

  const {
    createBrief,
    loading: createLoading,
    data: createData,
  } = createCampaignBrief();

  const navigate = useNavigate();
  const { state } = useLocation();
  const { brief = null }: { brief: BrandBrief | null } = state || {};

  const defaultValues = {
    ...init(schema),
    active: true,
  }

  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getFieldState,
  } = useZodForm({
    schema,
    defaultValues: brief ? brief : defaultValues,
    mode: 'onSubmit',
  });
  const creativeInspirations = getValues('creativeInspirations');

  //  consoel .lgo errors
  useEffect(() => {
    console.log(errors, isValid);
  }
    , [errors, isValid]);


  const CountryOptions = useMemo(
    () =>
      CountryList.map(({ name: text, code: value, ...rest }) => ({
        text,
        value,
        ...rest,
      })),
    [CountryList]
  );

  const onUploadFiles = async (files) => {
    if (!brief?.id) {
      setId(uuid());
    }

    if (!files.length) {
      return;
    }

    // TODO: Check....
    const file = files?.[0];
    setLoading(true);
    const key = `brand/brief/${id}/${file.name}`;
    await Storage.put(key, {
      level: 'public',
      acl: 'public-access',
    });

    toastSuccess('File uploaded successfully!');
    setValue('brandBriefFilesUrl', key);
    setLoading(false);
  };

  const chooseContentvideos = async (files?: FileList | null) => {
    if (!files?.length) {
      return;
    }
    setLoading(true);


    if (!id) setId(brief?.id || uuid());

    const videoUrls: string[] = [];
    const creativeInspirations = brief?.creativeInspirations || [];

    for (const file of files) {
      const fileName = file.name.split('.').pop();
      const url = `inspiration/${id}/${uuid()}.${fileName}`;

      await Storage.put(url, file, {
        level: 'public',
        acl: 'public-read',
      });
      videoUrls.push(url);
    }

    console.log('videoUrls', videoUrls, creativeInspirations);
    [...videoUrls, ...creativeInspirations].map((url, i) =>
      setValue(`creativeInspirations.${i}`, url)
    );
    setLoading(false);
    toastSuccess(
      `Creative inspiration${files.length > 1 && 's'} uploaded successfully!`
    );
  };

  const toastSuccess = (message: string) => {
    toast.success(message, { ...TOAST_CONFIG });
  };

  const onSubmit = handleSubmit(async (data) => {
    const brandId = profileState.data?.brand?.items?.[0]?.id || '';

    const dataToReq = {
      ...data,
      brandId,
      creativeInspirations: data.creativeInspirations || [],
      // TOOD: Remove vertical
      vertical: profileState.data?.vertical || '',
      brandBriefFilesUrl: data.brandBriefFilesUrl || '',
    };

    if (brief?.id) {
      const cleanData: UpdateBrandBriefInput = { ...brief }
      delete cleanData['__typename'];
      delete cleanData['manualData']?.['__typename']
      delete cleanData['tikTokData']?.['__typename']
      delete cleanData['metaData']?.['__typename']
      delete cleanData['youtubeData']?.['__typename']
      delete cleanData['brandProfile']
      delete cleanData['creativeRequests']

      await editBrief({ variables: { input: { ...cleanData, ...dataToReq } } });
    } else {
      await createBrief({
        variables: {
          input: {
            ...dataToReq,
            manualData: {
              adCaption: '',
            },
            metaData: {
              campaignId: '',
              adgroupId: '',
              callToAction: '',
              landingPageUrl: '',
              adCaption: '',
            },
            youtubeData: {
              campaignId: '',
              adgroupId: '',
              callToAction: '',
              landingPageUrl: '',
              adCaption: '',
            },
            tikTokData: {
              campaignId: '',
              adgroupId: '',
              adIdentityId: '',
              callToAction: '',
              landingPageUrl: '',
              adCaption: '',
              tikTokSparkAds: false,
            }
          }
        }
      });
    }
    setLoading(false);
  });

  useEffect(() => {
    if (createData || editData) {
      navigate(BrandRoutes.BriefFormStep2, { state: { brief: createData || editData } });
    }
  }, [createData, editData]);


  return (
    <>
      <section className="bg-white py-[20px] rounded-[16px]">
        <h1 className="text-[#0E0D0D] uppercase ml-6 head-text text-[16px] font-[700]">
          {brief ? 'Edit' : 'Create'} Activation
        </h1>
        {!editLoading && !createLoading ? (
          <form onSubmit={onSubmit}>
            <div className="grid xl:grid-cols-2 p-6 xl:gap-8">
              <div className="xl:col-span-1 col-span-3">
                <Input
                  required
                  placeholder="Give your brief a name"
                  name="BriefName"
                  label="Activation Name"
                  register={register}
                  className="mb-5"
                  errors={errors}
                  dataCy="briefName"
                />
                <Select
                  required
                  name="country"
                  label="Country *"
                  placeholder="Select a country"
                  options={CountryOptions}
                  control={control}
                  errors={errors}
                  dataCy="country"
                />
                <Input
                  required
                  name="objective"
                  label="Objective"
                  register={register}
                  errors={errors}
                  dataCy="objective"
                />
                <Switch
                  name="active"
                  label="Active"
                  control={control}
                  required
                />
              </div>

              <div className="xl:col-span-1 col-span-3 rounded-lg">
                <>
                  <div
                    className={`${getValues('creativeInspirations')?.length || 0 > 4
                      ? 'h-[279px] overflow-y-auto'
                      : ''
                      }`}
                  >
                    <Label name="Creative inspiration" />
                    {getValues('creativeInspirations')?.map((_value: string, idx) => (
                      <Input
                        key={idx}
                        name={`creativeInspirations.${idx}`}
                        className={`${idx === 0 ? 'm-0' : 'mt-[23px]'}`}
                        placeholder="Creative inspiration URL"
                        inputClassName="bg-white"
                        label=""
                        register={register}
                        errors={errors}
                      />
                    ))}
                  </div>

                  <div className="flex justify-end gap-3 mb-3">
                    {/* add loading */}
                    {loading && <div >
                      <Spinner className="w-8 h-8 mt-6" />
                    </div>}
                    <div>
                      <input
                        id="zip-upload"
                        type="file"
                        className="hidden"
                        accept=".zip, .tar, .7z, .rar, .gz"
                        onChange={(e) => onUploadFiles(e.target.files)}
                      />
                      <label className="flex justify-center">
                        <label
                          htmlFor="zip-upload"
                          className="creator-button cursor-pointer text-[14px] mt-[20px]"
                        >
                          <h6>Upload files</h6>
                        </label>
                      </label>
                    </div>

                    <div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        multiple
                        accept="video/*, .mov"
                        onChange={(e) =>
                          chooseContentvideos(e.target.files)
                        }
                      />
                      <label className="flex justify-center">
                        <label
                          htmlFor="file-upload"
                          className="creator-button cursor-pointer text-[14px] mt-[20px]"
                        >
                          <h6>Upload creative inspiration</h6>
                        </label>
                      </label>
                    </div>
                  </div>
                </>
              </div>
            </div >

            <div className="grid xl:grid-cols-2 grid-cols-1">
              <TextArea
                required
                className="pb-6 px-6"
                rows={9}
                name="brandBriefDetails"
                label="Activation details"
                placeholder="Decsribe your brief in more detail..."
                register={register}
                errors={errors}
                dataCy="brandBriefDetails"
              />
              <TextArea
                required
                className="pb-6 px-6"
                rows={9}
                name="adText"
                label="Ad text / Caption"
                placeholder="Decsribe your brief in more detail..."
                register={register}
                errors={errors}
                dataCy="adText"
              />
            </div>
            <div className="xl:hidden w-full px-6 pb-6"></div>
            <div
              className="
        flex sm:flex-row w-full sm:justify-center
        font-sans text-base text-white font-bold flex-col-reverse gap-4 items-center px-6"
            >
              <button
                type="submit"
                className="creator-button disabled:bg-[#a8a8a8]"
                data-cy="go-next-step"
              >
                Next
              </button>
            </div>
          </form >
        ) : (
          <div className="loader-content h-[calc(100vh-120px)]">
            <IconLoader />
          </div>
        )
        }
      </section >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      ></ToastContainer>
    </>
  );
}

export default BriefForm;

import { USER_TYPES } from 'API';
import { Storage } from 'aws-amplify';
import classNames from 'classnames';
import { IconLoader, ShouldRender } from 'components';
import Modal from 'components/authentication/modal';
import { updateUserBrand } from 'hooks';
import { FC, useEffect, useState } from 'react';
import {
  IProfileImageUpload,
  IUpdateCreatorProfile,
  IUpdateCreatorProfileError,
  withProfile,
} from 'state/profileSteps';
import {
  AllowedProfileSizeKB,
  defaultCreatorProfileError,
  defultCreatorProfileState,
  ProfileProps,
  UnknownType,
} from 'utils';
import './creatorProfile.css';
import { verticalOptions } from 'hooks/utils';

type TProps = {
  linkingData: {
    tiktokHandler: string;
    youtubeHandler: string;
    instagramHandler: string;
  };
};

export const EditUserProfile: FC<ProfileProps & TProps> = ({
  editCreatorProfile,
  updateProfileData,
  linkingData,
  profileState: { data },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [formState, setFormState] = useState<IUpdateCreatorProfile>(
    defultCreatorProfileState
  );
  const [formError, setFormError] = useState<IUpdateCreatorProfileError>(
    defaultCreatorProfileError
  );
  const tags = [
    {
      text: 'Youth',
      value: 'Youth',
    },
    { text: 'Music', value: 'Music' },
    { text: 'Fuuny', value: 'Fuuny' },
    { text: 'Snacks', value: 'Snacks' },
    { text: 'Sport', value: 'sport' },
  ];
  const [vertical, setVertical] = useState('');
  const [image, setImage] = useState<IProfileImageUpload>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [foundVerticals, setFoundVerticals] = useState(tags);
  const [searchedText, setSearchedText] = useState('');
  const [selectedVerticals, setSelectedVerticals] = useState<Set<string>>(
    new Set()
  );
  const [imageForShow, setImageForShow] = useState('');
  const { updateBrand } = updateUserBrand();

  const handleChange = (e: UnknownType): void => {
    if (e?.target?.files?.[0]) {
      if (e.target.files[0].size > AllowedProfileSizeKB * 1024)
        setImage({ error: `Maximum ${AllowedProfileSizeKB} KB size allowed` });
      else {
        setImage({ file: e.target.files[0] });
        setImageForShow(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const submitProfile = async (type: string): Promise<void> => {
    console.log(isCategoryLoading);

    const { description } = formState;
    if (!isLoading) {
      if (type === 'profile') setIsLoading(true);
      if (
        data?.userType === USER_TYPES.BRAND_USER &&
        data.brand?.items[0]?.id
      ) {
        updateBrand({
          variables: {
            input: {
              id: data.brand?.items[0]?.id,
              hashtags: [...selectedVerticals],
              personalDescription: description,
            },
          },
        });
      }
      if (data?.id && image.file)
        await Storage.put(`${data.id}/avatar/profile`, image.file);
      editCreatorProfile({
        ...linkingData,
        description,
        hashtags: [...selectedVerticals],
        vertical: vertical || null,
      });
    }
  };

  const updateState = (key: string, value: string): void => {
    setFormError((prev) => ({ ...prev, [key]: null }));
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const searchVertical = (text: string) => {
    if (text === '') {
      setFoundVerticals(tags);
    } else {
      const x = tags.filter((vertical) => {
        return vertical.text
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase());
      });
      setFoundVerticals(x);
    }
  };

  const selectVertical = (vertical, action) => {
    if (
      (selectedVerticals.size < 5 && action === 'add') ||
      action === 'delete'
    ) {
      const verticals = new Set(selectedVerticals);
      verticals[action](vertical);
      if (action === 'add' && !selectedVerticals.has(vertical))
        setSearchedText('');
      setSelectedVerticals(verticals);
    }
  };

  useEffect(() => {
    if (data) {
      const {
        description,
        tiktokHandler,
        youtubeHandler,
        instagramHandler,
        hashtags,
      } = data;
      const state = {
        tiktokHandler,
        description,
        youtubeHandler,
        instagramHandler,
      } as IUpdateCreatorProfile;
      state.description = description || '';
      state.tiktokHandler = tiktokHandler || '';
      state.youtubeHandler = youtubeHandler || '';
      state.instagramHandler = instagramHandler || '';
      setFormState(state);
      setSelectedVerticals(new Set(hashtags) as Set<string>);
    }
  }, [data]);

  useEffect(() => {
    if ((isLoading || isCategoryLoading) && updateProfileData) {
      setShowSuccessModal(true);
      setIsLoading(false);
      setIsCategoryLoading(false);
    }
  }, [isLoading, isCategoryLoading, updateProfileData]);

  useEffect(() => {
    if (data?.vertical) setVertical(data?.vertical);
  }, []);

  if (!data) return <></>;
  return (
    <div className="grid grid-cols-2 gap-[30px]">
      <div
        className={`border border-[#F5F1E8] bg-white rounded-[16px] lg:col-span-1 col-span-2 flex flex-col justify-between`}
      >
        <div>
          <div className="text-[#0E0D0D] uppercase mt-[23px] ml-[28px] mb-[10px] head-text text-[14px] flex items-center font-[700]">
            <h6>{data?.userType?.split('_')[0]} PROFILE</h6>
          </div>
          <div className="">
            <div className="brand-dashboard__profile-inputs mx-[30px] my-[40px]">
              {data.userType === USER_TYPES.BRAND_USER ? (
                <div className="brand-dashboard__profile-group col-span-4 mb-[20px]">
                  <div className="profile-label mb-[23px]">Brand vertical</div>

                  <select
                    data-cy="country"
                    value={vertical}
                    className="profile-input"
                    onChange={(e) => setVertical(e.target.value)}
                  >
                    <option hidden></option>
                    {verticalOptions.map((item, index) => {
                      return (
                        <option value={item.value} key={index}>
                          {item.text}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : null}
              <div className="brand-dashboard__profile-group gap-[20px] ">
                <div className="brand-dashboard__profile-group col-span-8">
                  <div className="profile-label mb-[23px]">
                    Tell us about yourself
                  </div>
                  <textarea
                    className="profile-textarea rounded-[4px] text-black px-[12px] py-[8px]"
                    value={formState.description}
                    onChange={(e): void =>
                      updateState('description', e.target.value)
                    }
                  />
                  <ShouldRender if={formError.description}>
                    <p className="error-text">{formError.description}</p>
                  </ShouldRender>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="brand-dashboard__profile-group mt-[22px] flex items-end justify-end flex-row mb-[34px] mr-[24px]">
          <button
            className="creator-button bg-[#1D1C1C]"
            onClick={() => submitProfile('profile')}
          >
            <span className={classNames({ loading: isLoading })}>Update</span>
            {isLoading && <IconLoader color="#005f73" />}
          </button>
        </div>
      </div>
      <div className="border border-[#F5F1E8] bg-white rounded-[16px] lg:col-span-1 col-span-2 flex flex-col justify-between px-[24px]">
        <div>
          <div className="text-[#0E0D0D] uppercase mt-[23px] mb-[35px] head-text text-[14px] flex items-center font-[700]">
            <h6>CATEGORIES</h6>
          </div>
          <div className="brand-dashboard__profile-group col-span-12 mb-0">
            <div className="profile-label mb-[23px]">
              {data.userType === USER_TYPES.BRAND_USER
                ? 'Add up to 5 tags that best describe your brand'
                : 'Add up to 5 tags that best describe you and your content'}
            </div>
          </div>
          <div className="brand-dashboard__profile-group lg:mb-0 mb-3">
            <div className="relative">
              <input
                className="profile-input pr-[36px]"
                onKeyDown={(e) => {
                  if (e.keyCode == 13 && searchedText.trim()) {
                    selectVertical(searchedText, 'add');
                  }
                }}
                maxLength={15}
                onChange={(e) => setSearchedText(e.target.value)}
                value={searchedText}
                type="text"
              />
              <img
                src="/images/remove.svg"
                className="absolute top-[11px] right-[12px]"
                onClick={() => {
                  setSearchedText('');
                  searchVertical('');
                }}
              />
            </div>
          </div>
          <div className="relative brand-dashboard__profile-group mt-[26px] lg:w-[300px] w-[270px] lg:mb-[20px] m-auto">
            <div className="flex flex-wrap mt-[50px] h-[125px] w-[200px]">
              {[...selectedVerticals].map((vertical, index) => {
                return (
                  <div
                    key={index}
                    className={`border bg-[#202020] text-[#fff] ${vertical?.split(' ') && vertical.length > 9
                      ? 'w-[138px] justify-center'
                      : ''
                      } rounded-[80px] m-1 cursor-pointer w-fit flex px-2 py-1 absolute position-${index + 1
                      }`}
                    onClick={() => selectVertical(vertical, 'delete')}
                  >
                    <span>{vertical}</span>{' '}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="brand-dashboard__profile-group col-span-4 mt-[22px] mb-[34px] flex items-center justify-end flex-row sm:gap-[80px] gap-[20px]">
          <button
            className="creator-button bg-[#1D1C1C]"
            onClick={() => {
              setIsCategoryLoading(true);
              submitProfile('category');
            }}
          >
            <span className={classNames({ loading: isCategoryLoading })}>
              Update
            </span>
            {isCategoryLoading && <IconLoader color="#005f73" />}
          </button>
        </div>
      </div>
      <Modal
        isOpen={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        type="brand"
        content="Your profile information successfully changed"
      />
    </div>
  );
};

export default withProfile(EditUserProfile);

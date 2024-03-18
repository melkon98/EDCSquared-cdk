import { USER_TYPES } from 'API';
import { Auth, Storage } from 'aws-amplify';
import classNames from 'classnames';
import { IconLoader, ShouldRender } from 'components';
import Modal from 'components/authentication/modal';
import {
  useLinkInstagramCreatorAccount,
  useLinkTikTokCreatorAccount,
  useLinkYoutubeCreatorAccount,
} from 'hooks';
import { FC, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { validateFullName } from 'state/auth';
import {
  IProfileImageUpload,
  IUpdateCreatorProfile,
  IUpdateCreatorProfileError,
  withProfile,
} from 'state/profileSteps';
import {
  AuthRoutes,
  defaultCreatorProfileError,
  defultCreatorProfileState,
  ProfileProps,
} from 'utils';
import EditBrandProfile from './brandProfile';
import './creatorProfile.css';
import EditUserProfile from './userProfileSecondPart';

const MOBILE_DEVICE_WIDTH = 1281;

const EditProfile: FC<ProfileProps> = ({
  editCreatorProfile,
  updateProfileData,
  updateProfileLoading,
  profileState: { data },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<IUpdateCreatorProfile>(
    defultCreatorProfileState
  );
  const [formError, setFormError] = useState<IUpdateCreatorProfileError>(
    defaultCreatorProfileError
  );
  const [error, setError] = useState('');
  const [image] = useState<IProfileImageUpload>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showContentSuccessModal, setShowContentSuccessModal] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [socialSignIn, setSocialSignIn] = useState<boolean>(false);
  const [tiktokHandler, setTiktokHandler] = useState('');
  const [youtubeHandler, setYoutubeHandler] = useState('');
  const [instagramHandler, setInstagramHandler] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [upLoading, setUpLoading] = useState(false);
  const [imgSizeError, setImgSizeError] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(
    window.innerWidth < MOBILE_DEVICE_WIDTH
  );
  const [previewContentVideos, setPreviewContentVideos] = useState<
    string[] | null
  >(null);
  const [contentSentData, setContentSentData] = useState<(string | null)[]>([]);
  const [contentError, setContentError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const avatarImgMaxSize = 2097152;
  const {
    linkYoutubeCreatorAccount,
    loading: linkYoutubeLoader,
    data: youtubeAccountData,
  } = useLinkYoutubeCreatorAccount();
  const {
    linkTikTokCreatorAccount,
    loading: linkTiktokLoader,
    data: tiktokAccountData,
  } = useLinkTikTokCreatorAccount();
  const {
    linkInstagramCreatorAccount,
    loading: linkInstagramLoader,
    data: instagramAccountData,
  } = useLinkInstagramCreatorAccount();

  const validateProfileForm = (): boolean => {
    const family_name = validateFullName(
      formState?.family_name || '',
      'Surname'
    );

    if (family_name) {
      setFormError({ family_name });
      return false;
    }
    return !image.error;
  };

  const submitProfile = async (): Promise<void> => {
    const { name, phone_number, email } = formState;
    if (!isLoading && validateProfileForm()) {
      setIsLoading(true);
      if (data?.id && image.file)
        await Storage.put(`${data.id}/avatar/profile`, image.file, {
          level: 'public',
          acl: 'public-read',
        });
      updateUserAttributes({
        family_name: ' ',
        name,
        'custom:phoneNumber': phone_number,
      });
    }

    await editCreatorProfile({
      name,
      phoneNumber: phone_number,
      email,
    });
  };

  const updateState = (key: string, value: string): void => {
    setFormError((prev) => ({ ...prev, [key]: null }));
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  async function updateUserAttributes({
    family_name,
    name,
    'custom:phoneNumber': phone_number,
  }) {
    const UserInfoData = {
      family_name,
      name,
      'custom:phoneNumber': phone_number,
    };

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, UserInfoData);
      setIsLoading(false);
      setShowSuccessModal(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }

  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const { family_name, name, email, identities } = user.attributes;
    identities && setSocialSignIn(true);
    const state = {
      family_name: family_name || '',
      name: name || '',
      email: email || '',
      phone_number: user.attributes['custom:phoneNumber'] || '',
    } as IUpdateCreatorProfile;
    setFormState((prev) => {
      return { ...prev, ...state };
    });
    if (data?.id) {
      try {
        const url = await Storage.get(`${data.id}/avatar/profile`);
        fetch(url).then((res) => {
          if (res.status === 200) setAvatar(url);
          if (res.status === 404) setAvatar('');
        });
      } catch (err) {
        console.log('Error', err);
      }
    }
  };

  const chooseAvatar = async (file) => {
    if (file[0].size > avatarImgMaxSize) {
      setImgSizeError(true);
    } else if (file[0] && data) {
      setImgSizeError(false);
      setAvatar(null);
      await Storage.put(`${data.id}/avatar/profile`, file[0], {
        level: 'public',
        acl: 'public-read',
      });
      try {
        const url = await Storage.get(`${data.id}/avatar/profile`);
        fetch(url).then(async (res) => {
          if (res.status === 200) setAvatar(url);
          const avatar = url?.split('?')[0]?.split('.') || [];
          await editCreatorProfile({
            avatar: avatar.slice(0, 2).concat(avatar.slice(3))?.join('.'),
          });
          setShowContentSuccessModal(true);
          setModalMessage('Your profile avatar successfully changed');
        });
      } catch (err) {
        console.log('Error', err);
      }
    }
  };

  const validationContent = (previewVideos, newVideos) => {
    console.log(previewVideos?.length + newVideos?.length);

    if (previewVideos?.length + newVideos?.length > 6) {
      setContentError('maximum videos count is 6');
      setTimeout(() => {
        setContentError('');
      }, 3000);
      return false;
    }
    return true;
  };

  const chooseContentvideos = async (files) => {
    const DataOfUrls: string[] = [];
    const previewUrls: any = [];
    const DataShouldBeSent: any = [];
    if (files?.length && validationContent(previewContentVideos, files)) {
      setUpLoading(true);
      setTotalFiles(files?.length);
      for (let i = 0; i < files.length; i++) {
        const randomNumber = Math.floor(Math.random() * 1000000) + 1;
        DataOfUrls.push(`content/${data?.id}${i}`);
        await Storage.put(`content/${data?.id}${randomNumber}`, files[i], {
          progressCallback(progress) {
            setPercentage(() => {
              return Math.floor((progress.loaded / progress.total) * 100);
            });
          },
        }).then(async () => {
          setPercentage(0);
          setFileCount(i + 1);
          const url = await Storage.get(`content/${data?.id}${randomNumber}`);
          previewUrls.push(url);
          DataShouldBeSent.push(`content/${data?.id}${randomNumber}`);
        });
      }
      setPreviewContentVideos((prev) => {
        if (prev === null || !prev.length) {
          return previewUrls;
        } else {
          return [...prev, ...previewUrls];
        }
      });
      setContentSentData((prev) => {
        if (prev === null || !prev.length) {
          return DataShouldBeSent;
        } else {
          return [...prev, ...DataShouldBeSent];
        }
      });
      setModalMessage('Your content videos successfully added');
      setUpLoading(false);
      setFileCount(0);
      await editCreatorProfile({
        profileContent: [...contentSentData, ...DataShouldBeSent] as
          | string[]
          | undefined,
      });
    }
  };

  const deleteVideo = async (url, index) => {
    if (previewContentVideos?.length) {
      const previewVideos = [...previewContentVideos];
      const DataShouldBeSent = [...contentSentData];
      DataShouldBeSent.splice(index, 1);
      setContentSentData(DataShouldBeSent);
      const newData = previewVideos.filter((data) => data !== url);
      setPreviewContentVideos(newData);
      setUrl(url);
      setModalMessage('Your content video successfully deleted');

      await editCreatorProfile({
        profileContent: DataShouldBeSent as string[] | undefined,
      });
    }
  };

  const getContentVideos = async () => {
    if (data?.profileContent?.length) {
      setContentSentData(data?.profileContent || []);
      const previweUrls: string[] = [];
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const content of data?.profileContent) {
        const url = await Storage.get((content || '')?.replace('public/', ''));
        console.log('url :: ', url);
        previweUrls.push(url);
      }

      setPreviewContentVideos(previweUrls);
    }
  };

  const linkYoutubeAccount = (): void => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.REACT_APP_FRONTEND_BASE_URL}account&prompt=consent&response_type=code&client_id=286667806469-o5nc5g444jouvhi1r8s671f104bakqsl.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube&access_type=offline`;
  };

  const linkInstagramAccount = (): void => {
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=305635815781564&state=instagram&redirect_uri=${process.env.REACT_APP_FRONTEND_BASE_URL}account&scope=user_profile&response_type=code`;
  };

  const linkTikTokAccount = (): void => {
    window.location.href = `https://www.tiktok.com/v2/auth/authorize?client_key=awnfemvqci11wj4b&scope=user.info.basic&response_type=code&state=tiktok&redirect_uri=${process.env.REACT_APP_FRONTEND_BASE_URL}account`;
  };

  const getAccountName = (url) => {
    if (url != null) {
      const match = url.match(/@([^/]+)$/);
      const rgx = /\/([^/]+)$/;
      const name = match ? match[1] : url.match(rgx) ? url.match(rgx)[1] : '';
      return '@' + name;
    }
    return '';
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem('authYoutubeCode') &&
      data?.id &&
      !youtubeAccountData
    ) {
      const authCode = localStorage.getItem('authYoutubeCode');
      const variables = { authCode, userProfileId: data.id };
      linkYoutubeCreatorAccount({ variables });
      localStorage.removeItem('authYoutubeCode');
    } else if (
      localStorage.getItem('authTikTokCode') &&
      data?.id &&
      !tiktokAccountData
    ) {
      const authCode = localStorage.getItem('authTikTokCode');
      const variables = { authCode, userProfileId: data.id };
      linkTikTokCreatorAccount({ variables });
      localStorage.removeItem('authTikTokCode');
    } else if (
      localStorage.getItem('authInstagramCode') &&
      data?.id &&
      !instagramAccountData
    ) {
      const authCode = localStorage.getItem('authInstagramCode');
      const variables = { authCode, userProfileId: data.id };
      linkInstagramCreatorAccount({ variables });
      localStorage.removeItem('authInstagramCode');
    }
  }, []);

  useEffect(() => {
    if (updateProfileData && !updateProfileLoading && url)
      setShowContentSuccessModal(true);
  }, [updateProfileData, updateProfileLoading]);

  useEffect(() => {
    setTiktokHandler(data?.tiktokHandler ? data?.tiktokHandler : '');
    if (data?.tiktokHandler && localStorage.getItem('tiktok'))
      localStorage.removeItem('tiktok');
    setYoutubeHandler(data?.youtubeHandler ? data?.youtubeHandler : '');
    if (data?.youtubeHandler && localStorage.getItem('youtube'))
      localStorage.removeItem('youtube');
    setInstagramHandler(data?.instagramHandler ? data?.instagramHandler : '');
    if (data?.instagramHandler && localStorage.getItem('instagram'))
      localStorage.removeItem('instagram');
    if (data?.profileContent?.length) {
      getContentVideos();
    } else {
      setPreviewContentVideos([]);
    }
  }, []);

  useEffect(() => {
    if (tiktokAccountData) {
      setTiktokHandler(tiktokAccountData);
      localStorage.setItem('tiktok', tiktokAccountData);
    }
  }, [tiktokAccountData]);

  useEffect(() => {
    if (instagramAccountData) {
      setInstagramHandler(instagramAccountData);
      localStorage.setItem('instagram', instagramAccountData);
    }
  }, [instagramAccountData]);

  useEffect(() => {
    const data = youtubeAccountData && JSON.parse(youtubeAccountData);

    if (!data?.url) {
      return;
    }

    setYoutubeHandler(data?.url);
    localStorage.setItem('youtube', data?.url);
  }, [youtubeAccountData]);

  useEffect(() => {
    if (
      !youtubeAccountData &&
      !data?.youtubeHandler &&
      localStorage.getItem('youtube')
    ) {
      setYoutubeHandler(localStorage.getItem('youtube') as string);
    }
    if (
      !tiktokAccountData &&
      !data?.tiktokHandler &&
      localStorage.getItem('tiktok')
    ) {
      setTiktokHandler(localStorage.getItem('tiktok') as string);
    }
    if (
      !instagramAccountData &&
      !data?.instagramHandler &&
      localStorage.getItem('instagram')
    ) {
      setInstagramHandler(localStorage.getItem('instagram') as string);
    }
  }, []);
  if (!data) return <></>;
  return (
    <>
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-[30px] w-full creator-dashboard p-0 mb-[30px]">
        <div>
          <div
            className={`border border-[#F5F1E8] bg-white rounded-[16px] mb-[30px]`}
          >
            <div className="brand-dashboard__profile-title mb-[22px] d-flex justify-between items-center">
              <div className="text-[#0E0D0D] uppercase mt-[31px] sm:ml-[28px] ml-[15px] head-text text-[14px] flex items-center font-[700]">
                <h6>User Account</h6>
              </div>
            </div>
            {avatar !== null ? (
              <>
                <div className="sm:ml-[28px] ml-[15px] flex items-center">
                  <img
                    className="h-[120px] w-[120px] rounded-full object-cover"
                    src={avatar || '/images/default-image.png'}
                  />
                  <input
                    id="upload-avatar"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => chooseAvatar(e.target.files)}
                  />
                  <label className="flex justify-center ml-[25px]">
                    <label
                      htmlFor="upload-avatar"
                      className="cursor-pointer text-[16px]"
                    >
                      <h6>Edit</h6>
                      <h6>Replace</h6>
                    </label>
                  </label>
                </div>
                {imgSizeError ? (
                  <p className="tik-tok-error text-left sm:ml-[28px] ml-[15px]">
                    The avatar image should not exceed 2MB in size
                  </p>
                ) : null}
              </>
            ) : (
              <div className="h-[120px] w-[120px] flex justify-center items-center">
                <Spinner
                  animation="border"
                  className="spinner-border"
                  variant="primary"
                />
              </div>
            )}
            <div className="mt-[17px]">
              <div className="sm:mx-[28px] mx-[15px]">
                {socialSignIn ? (
                  <p className="mb-4 text-gray-400">
                    You can’t change the profile information as you logged in
                    using an external provider.
                  </p>
                ) : null}
                <div className="profile-inputs">
                  <div className="lg:grid grid-cols-12 gap-[40px]">
                    <div className="brand-dashboard__profile-group col-span-12 mb-[20px]">
                      <input
                        className="profile-input placeholder-gray-600"
                        value={formState.name}
                        placeholder="Full name"
                        onChange={(e): void =>
                          updateState('name', e.target.value)
                        }
                        disabled={socialSignIn}
                      />
                      <ShouldRender if={formError.name}>
                        <p className="error-text">{formError.name}</p>
                      </ShouldRender>
                    </div>
                  </div>
                  <div className="lg:grid grid-cols-12">
                    <div className="brand-dashboard__profile-group col-span-12">
                      <input
                        className="profile-input placeholder-gray-600"
                        value={formState.email}
                        placeholder="Email address"
                        onChange={(e): void =>
                          updateState('email', e.target.value)
                        }
                        readOnly
                      />
                      <ShouldRender if={formError.email}>
                        <p className="error-text">{formError.email}</p>
                      </ShouldRender>
                    </div>
                    <div className="brand-dashboard__profile-group mb-[20px] col-span-12 gap-[40px]">
                      <input
                        className="profile-input placeholder-gray-600"
                        placeholder="Mobile number"
                        value={formState.phone_number}
                        onChange={(e): void =>
                          updateState('phone_number', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="">
                    <Link to={AuthRoutes.ChangePass}>Change password</Link>
                  </h5>
                </div>
                <ShouldRender if={error}>
                  <p className="error-text">{error}</p>
                </ShouldRender>
                <div className="save-button-container mt-[22px] mb-[24px] flex justify-end flex-row lg:gap-[80px] gap-[40px]">
                  <button
                    className="creator-button bg-black"
                    onClick={submitProfile}
                  >
                    <span className={classNames({ loading: isLoading })}>
                      Update
                    </span>
                    {isLoading && <IconLoader color="#005f73" />}
                  </button>
                </div>
              </div>
            </div>
            <Modal
              isOpen={showSuccessModal}
              handleClose={() => setShowSuccessModal(false)}
              type="brand"
              content="Your profile information successfully changed"
            />
            <Modal
              isOpen={showContentSuccessModal}
              handleClose={() => setShowContentSuccessModal(false)}
              type="brand"
              content={modalMessage}
            />
          </div>
          <div
            className={`border border-[#F5F1E8] bg-white rounded-[16px] min-h-[303px]`}
          >
            <div className="brand-dashboard__profile-title mb-[25px] d-flex justify-between items-center">
              <div className="text-[#0E0D0D] uppercase mt-[23px] sm:ml-[28px] ml-[15px] head-text text-[14px] flex items-center font-[700]">
                <h6>Add / link accounts</h6>
              </div>
            </div>
            <div className="mt-[10px]">
              <div className="sm:mx-[28px] mx-[15px]">
                {data?.userType === USER_TYPES.CREATIVE_USER ? (
                  <div className="profile-inputs">
                    <div>
                      <div className="flex justify-between items-center">
                        <div className="border border-black rounded-[4px] px-[12px] py-[6px] max-w-[calc(100%-96px)] min-w-[122px] w-full flex justify-between items-center">
                          <p
                            className={`${tiktokHandler && !linkTiktokLoader
                              ? 'text-[#1D1C1C]'
                              : 'text-[#6C757D]'
                              } text-[14px] font-[400] ellipsis block ${linkTiktokLoader ? 'opacity-50' : ''
                              }`}
                          >
                            {tiktokHandler
                              ? getAccountName(tiktokHandler)
                              : 'TikTok profile link'}
                          </p>
                          {tiktokHandler && !linkTiktokLoader ? (
                            <img src="/images/check-icon.svg" alt="" />
                          ) : null}
                        </div>
                        <div
                          className="flex items-center justify-start w-[100px] pl-[19px] cursor-pointer"
                          onClick={linkTikTokAccount}
                        >
                          <img
                            className="h-[22px]"
                            src="/images/tiktok-icon.svg"
                          />
                          <div className="text-[#6C757D] text-[14px] font-[400] pl-[13px]">
                            {tiktokHandler ? 'Linked' : 'Link'}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center my-[15px]">
                        <div className="border border-black rounded-[4px] px-[12px] py-[6px] max-w-[calc(100%-96px)]  min-w-[122px] w-full flex justify-between items-center">
                          <p
                            className={`${instagramHandler && !linkInstagramLoader
                              ? 'text-[#1D1C1C]'
                              : 'text-[#6C757D]'
                              } text-[14px] font-[400] ellipsis ${linkInstagramLoader ? 'opacity-50' : ''
                              }`}
                          >
                            {instagramHandler
                              ? getAccountName(instagramHandler)
                              : 'Instagram profile link'}
                          </p>
                          {instagramHandler && !linkInstagramLoader ? (
                            <img src="/images/check-icon.svg" alt="" />
                          ) : null}
                        </div>
                        <div
                          className="flex items-center justify-start w-[100px] pl-[19px] cursor-pointer"
                          onClick={linkInstagramAccount}
                        >
                          <img
                            className="h-[22px]"
                            src="/images/instagram-icon.png"
                          />
                          <div className="text-[#6C757D] text-[14px] font-[400] pl-[13px]">
                            {instagramHandler ? 'Linked' : 'Link'}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="border border-black rounded-[4px] px-[12px] py-[6px] max-w-[calc(100%-96px)] min-w-[122px] w-full flex justify-between items-center">
                          <p
                            className={`${youtubeHandler && !linkYoutubeLoader
                              ? 'text-[#1D1C1C]'
                              : 'text-[#6C757D]'
                              } text-[14px] font-[400] ellipsis ${linkYoutubeLoader ? 'opacity-50' : ''
                              }`}
                          >
                            {youtubeHandler
                              ? getAccountName(youtubeHandler)
                              : 'YouTube profile link'}
                          </p>
                          {youtubeHandler && !linkYoutubeLoader ? (
                            <img src="/images/check-icon.svg" alt="" />
                          ) : null}
                        </div>
                        <div
                          className="flex items-center justify-start w-[100px] pl-[19px] cursor-pointer"
                          onClick={linkYoutubeAccount}
                        >
                          <img
                            className="h-[22px]"
                            src="/images/youtube-linking-icon.svg"
                          />
                          <div className="text-[#6C757D] text-[14px] font-[400] pl-[13px]">
                            {youtubeHandler ? 'Linked' : 'Link'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <EditBrandProfile />
                )}
                <ShouldRender if={error}>
                  <p className="error-text">{error}</p>
                </ShouldRender>
              </div>
            </div>
            <Modal
              isOpen={showSuccessModal}
              handleClose={() => setShowSuccessModal(false)}
              type="brand"
              content="Your profile information successfully changed"
            />
          </div>
        </div>
        <div
          className={`border border-[#F5F1E8] rounded-[16px] bg-[#1D1C1C] flex flex-col justify-between`}
        >
          <div>
            <div className="text-[#fff] uppercase mt-[31px] ml-[28px] mb-[50px] head-text text-[14px] flex items-center font-[700]">
              <h6 className="pl-[12px]">Your content portfolio</h6>
            </div>
            {!contentError ? (
              !upLoading ? (
                <>
                  {' '}
                  {updateProfileLoading || previewContentVideos === null ? (
                    <div className="lg:h-[511px] h-[321px] flex justify-center items-center">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="flex relative justify-center lg:min-h-[511px] min-h-[268px] px-[60px]">
                      {previewContentVideos.length ? (
                        <div className="relative w-full">
                          {previewContentVideos?.length ? (
                            <div className="grid grid-cols-12 gap-[18px] md:mb-0 mb-[20px]">
                              {previewContentVideos.map((video, index) => (
                                <div
                                  className="md:col-span-4 sm:col-span-6 col-span-12"
                                  key={index}
                                >
                                  <div className="relative w-fit m-auto">
                                    <div
                                      className=" absolute top-[3px] right-[4px] cursor-pointer z-[9]"
                                      onClick={() => deleteVideo(video, index)}
                                    >
                                      <img
                                        className="h-[20px] w-[20px]"
                                        src="images/remove.png"
                                        alt=""
                                      />
                                    </div>
                                    <video
                                      controls
                                      className="outline-none h-[264px] object-contain rounded-[16px] m-auto xl:max-w-full max-w-[175px]"
                                      autoPlay={isAutoPlay}
                                      playsInline
                                      muted
                                    >
                                      <source src={video} type="video/mp4" />
                                    </video>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="lg:h-[544px] h-[268px] flex justify-center items-center text-[#0E0D0D] head-text font-[700] text-[16px] uppercase">
                              Inspiration videos are absent
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="lg:h-[511px] h-[268px] flex justify-center items-center text-[#fff] head-text text-[16px] font-[700]">
                          No profile content uploaded
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="lg:h-[511px] h-[321px] flex justify-center items-center">
                  <div className="flex flex-col items-center">
                    <h6 className="text-[#fff] mb-[15px] head-text text-[16px] flex items-center font-[700]">
                      Uploaded files count {fileCount} / {totalFiles}
                    </h6>
                    <div
                      className={`${percentage > 0 ? 'border border-white' : ''
                        } h-[48px] w-[48px] rounded-full flex justify-center items-center`}
                    >
                      {percentage > 0 ? (
                        <div className="font-bold text-white">
                          {percentage}%
                        </div>
                      ) : (
                        <Spinner
                          animation="border"
                          className="spinner-border"
                          variant="primary"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="lg:h-[544px] h-[321px] flex justify-center items-center text-[#c22828] head-text font-[700] text-[16px] uppercase">
                {contentError}
              </div>
            )}
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            multiple
            accept="video/*, .mov"
            onChange={(e) => chooseContentvideos(e.target.files)}
          />
          <label className="flex justify-center mb-[70px]">
            <label
              htmlFor="file-upload"
              className="manageProfile-btn cursor-pointer"
            >
              <h6>Manage Profile content</h6>
            </label>
          </label>
        </div>
      </div>

      <EditUserProfile
        linkingData={{ tiktokHandler, youtubeHandler, instagramHandler }}
      />
    </>
  );
};

export default withProfile(EditProfile);

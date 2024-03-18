import { CreativeRequestEarnings, UserProfile, USER_TYPES } from 'API';
import { IconLoader } from 'components';
import Modal from 'components/authentication/modal';
import CreatorStatsCard from 'components/creatorStatsCard/creatorStatsCard';
import GradientCard from 'components/gradientCard/gradientCard';
import Table, { Tdata } from 'components/table/Table';
import Input from 'components/ui/input';
import Routes from 'components/ui/switch';
import TextArea from 'components/ui/textArea';
import {
  createUserBrand,
  UseGetCreativeEarnings,
  UseUpdateUserProfile,
} from 'hooks';
import useZodForm from 'hooks/useZodForm';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withSaveBrief } from 'state/brandBrief';
import { AdminDashboardBoxes, AdminRoutes } from 'utils';
import { z } from 'zod';
import init from 'zod-empty';
import { ceilToNearestDecimal } from '../../utils/utils';
import AddEarningsModal from './addEarningsModal';

const schema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty(),
  email: z.string().nonempty(),
  tiktokHandler: z.string().nullable(),
  instagramHandler: z.string().nullable(),
  description: z.string().nullable(),
  youtubeHandler: z.string().nullable(),
  isBrand: z.boolean().optional(),
  vertical: z.string().nullable(),
  userType: z.string(),
});

const defaultValues = {
  ...init(schema),
  active: true,
  isBrand: false,
};

type Props = {
  user: UserProfile;
};
export const EditUser: FC<Props> = ({ user }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useZodForm({
    schema,
    defaultValues,
    mode: 'all',
  });
  const { updateProfile, loading } = UseUpdateUserProfile();
  const {
    getEarnings,
    loading: earningsLoading,
    data: earningsData,
  } = UseGetCreativeEarnings();
  const [selectedVerticals, setSelectedVerticals] = useState<Set<string>>(
    new Set()
  );
  const { createBrand, loading: createBrandLoading } = createUserBrand();
  useEffect(() => {
    if (!user) {
      return;
    }

    setSelectedVerticals(new Set(user?.hashtags as string | null));
    reset({
      ...(user as {
        name: string;
        email: string;
        tiktokHandler: string;
        instagramHandler: string;
        description: string;
        youtubeHandler: string;
        id?: string | undefined;
      }),
    });

    if (user.userType === USER_TYPES.CREATIVE_USER) {
      getEarnings({ variables: { creatorId: user.id } });
    }
  }, [user, reset]);

  const [showModal, setShowModal] = useState(false);
  const [tag, setTag] = useState('');
  const [tableData, setTableData] = useState<Tdata[]>([]);
  const [isShow, setIsShow] = useState(false);
  const [selectedCreativeEarning, setSelectedCreativeEarning] =
    useState<CreativeRequestEarnings | null>(null);
  const [currentEarnings, setCurrentEarnings] = useState<number>(0);
  const [lifetimeEarnings, setLifetimeEarnings] = useState<number>(0);

  const onSubmit = handleSubmit(async (data) => {
    data.youtubeHandler = data.youtubeHandler || '';
    data.tiktokHandler = data.tiktokHandler || '';
    data.instagramHandler = data.instagramHandler || '';
    data.description = data.description || '';
    data.vertical = '';
    if (data.isBrand) {
      data.userType = 'BRAND_USER';
      await createBrand({
        variables: {
          input: { userProfileBrandId: user.id, userEmail: user.email },
        },
      });
    }
    delete data.isBrand;
    await updateProfile({
      variables: { input: { ...data, hashtags: [...selectedVerticals] } },
    })
      .then(() => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  const selectVertical = (vertical, action) => {
    if (
      (selectedVerticals.size < 5 && action === 'add') ||
      action === 'delete'
    ) {
      const verticals = new Set(selectedVerticals);
      if (!verticals.has(vertical)) setTag('');
      verticals[action](vertical);
      setSelectedVerticals(verticals);
    }
  };

  const calculateTotalEarnings = (earnings) =>
    earnings.items.reduce(
      (a, v) => ({
        lifetimeEarnings: a.lifetimeEarnings + v.lifetimeEarnings,
        currentEarnings: a.currentEarnings + v.currentEarnings,
      }),
      { lifetimeEarnings: 0, currentEarnings: 0 }
    );

  useEffect(() => {
    try {
      if (!earningsData) {
        return;
      }

      const data = JSON.parse(earningsData?.getCreativeEarnings as string);
      const { lifetimeEarnings, currentEarnings } =
        calculateTotalEarnings(data);

      setLifetimeEarnings(() => lifetimeEarnings);
      setCurrentEarnings(() => currentEarnings);
      setTableData(
        data.items.map((e, idx) => ({
          id: idx,
          creativeRequestId: e.creativeRequestId,
          creativeUniqueId: e.creativeUniqueId,
          earningsCurrent: `$${ceilToNearestDecimal(e.currentEarnings)}`,
          earningsLifetime: `$${ceilToNearestDecimal(e.lifetimeEarnings)}`,
          addEarnings: '',
        }))
      );
    } catch (e) {
      console.error(e);
    }
  }, [earningsData]);

  const onAddEarning = (earning) => {
    setSelectedCreativeEarning({
      ...earning,
      creativeUniqueId: earning?.creativeId as string,
    });
    setIsShow(true);
  };

  return (
    <div className="flex gap-[20px]">
      <div className="w-[50%] border border-[#F5F1E8] rounded-[16px] py-[25px] px-[10px]">
        <h2 className="text-[#0E0D0D] uppercase head-text text-[15px] font-[700] pl-6 m-0">
          Admin - Edit User Details
        </h2>
        <div>
          <form
            onSubmit={onSubmit}
            onKeyDown={(e) => {
              if (e.keyCode == 13) e.preventDefault();
            }}
          >
            <div className="grid xl:grid-cols-1 p-6 xl:gap-8">
              <div className="xl:col-span-1 col-span-3">
                <Routes
                  name="isBrand"
                  label="Mark as Brand"
                  className="mb-5"
                  control={control}
                />
                <Input
                  required
                  name="name"
                  label="Creator Name"
                  register={register}
                  className="mb-5"
                  errors={errors}
                />
                <Input
                  required
                  name="email"
                  type="email"
                  label="Creator Email"
                  register={register}
                  className="mb-5"
                  errors={errors}
                />
                <Input
                  name="tiktokHandler"
                  label="Tiktok handler"
                  register={register}
                  className="mb-5"
                  errors={errors}
                />
                <Input
                  label="Instagram handler"
                  name="instagramHandler"
                  register={register}
                  errors={errors}
                />
                <Input
                  label="Youtube handler"
                  name="youtubeHandler"
                  register={register}
                  errors={errors}
                />
                <div className="brand-dashboard__profile-group lg:grid grid-cols-12 gap-[40px] mb-[20px]">
                  <div className="brand-dashboard__profile-group col-span-4 lg:mb-0 mb-3">
                    <div className="profile-label">
                      Add up to 5 tags that best describe you and your content
                    </div>
                    <div className="relative">
                      <input
                        className="profile-input pr-[36px]"
                        onKeyDown={(e) => {
                          if (e.keyCode == 13 && tag.trim()) {
                            e.preventDefault();
                            selectVertical(tag, 'add');
                          }
                        }}
                        maxLength={15}
                        onChange={(e) => setTag(e.target.value)}
                        value={tag}
                        type="text"
                      />
                      <img
                        src="/images/remove.svg"
                        className="absolute top-[11px] right-[12px]"
                      />
                    </div>
                  </div>
                  <div
                    className={`relative brand-dashboard__profile-group col-span-4 mt-[26px] lg:w-[300px] w-[270px] lg:mb-[20px] lg:mx-0 m-auto ${selectedVerticals.size ? 'h-[75px]' : ''
                      }`}
                  >
                    <div className="flex flex-wrap lg:h-auto h-[125px] w-[200px]">
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
                            <span>{vertical}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <TextArea
                  rows={9}
                  name="description"
                  label="Description"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
            <div className="grid xl:grid-cols-2 grid-cols-1"></div>
            <div className="xl:hidden w-full px-6 pb-6"></div>
            <div
              className="
          flex sm:flex-row w-full sm:justify-center
          font-sans text-base text-white font-bold flex-col-reverse gap-4 items-center px-6"
            >
              <Link to={AdminRoutes.Creators}>
                <button className="creator-button bg-[#F1EBDF]">CANCEL</button>
              </Link>
              <button
                type="submit"
                className="creator-button disabled:bg-[#a8a8a8]"
                disabled={!isValid}
              >
                {loading || createBrandLoading ? <IconLoader /> : 'Save'}
              </button>
            </div>
          </form>
        </div>
        <Modal
          content="Great, your Creator Profile changes have been saved!"
          isOpen={showModal}
          type="brand"
          handleClose={() => (window.location.href = AdminRoutes.Creators)}
          actionLabel="Back To Creator users"
          actionHandler={() => (window.location.href = AdminRoutes.Creators)}
        />
      </div>
      <div className="w-[50%]">
        <div className="lg:grid flex grid-cols-2 lg:gap-[20px] gap-[10px] mb-[20px] w-full lg:overflow-x-visible overflow-x-auto overflow-y-hidden creator-dashboard p-0 lg:pb-0 pb-[4px]">
          <GradientCard>
            <CreatorStatsCard
              type={AdminDashboardBoxes.CurrentEarnings}
              value={`$${ceilToNearestDecimal(currentEarnings).toFixed(2)}`}
            />
          </GradientCard>

          <GradientCard>
            <CreatorStatsCard
              type={AdminDashboardBoxes.EarningsLifetime}
              value={`$${ceilToNearestDecimal(lifetimeEarnings).toFixed(2)}`}
            />
          </GradientCard>
        </div>
        <Table
          data={tableData as Tdata[]}
          mainlyData={tableData}
          rows={[
            'creativeUniqueId',
            'earningsCurrent',
            'earningsLifetime',
            'addEarnings',
          ]}
          loading={earningsLoading}
          onRowClick={onAddEarning}
          pagination={1}
          extended={false}
          rowWidth="w-[110px]"
          borderColor="#FF872F"
        />
      </div>
      {isShow && (
        <AddEarningsModal
          userProfileId={user.id}
          getCreativeEarnings={getEarnings}
          earning={selectedCreativeEarning}
          onClose={() => setIsShow(false)}
        />
      )}
    </div>
  );
};

export default withSaveBrief(EditUser);

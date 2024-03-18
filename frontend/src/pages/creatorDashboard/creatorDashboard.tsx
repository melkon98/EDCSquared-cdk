import { BrandBrief, UserProfile } from 'API';
import CreatorNotifications from 'components/creatorNotifications/creatorNotifications';
import CreatorStatsCard from 'components/creatorStatsCard/creatorStatsCard';
import GradientCard from 'components/gradientCard/gradientCard';
import Table, { Tdata } from 'components/table/Table';
import CampaignBriefDetails from 'pages/campaignBriefDetails/campaignBriefDetails';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICreatorBriefListProps, withCreatorBriefList } from 'state/dashboard';
import { AuthRoutes, CreatorDashboardBoxes, CreatorRoutes } from 'utils';
import { UseGetCreativeEarnings } from '../../hooks';
import './creatorDashboard.css';

function CreatorDashboard({
  data: profileData,
  loading,
  requestLoading,
  briefList,
  requestList,
  currentPage,
  profileCompletionPercentage,
  briefPagination,
  changeBriefPage,
  brands,
}: ICreatorBriefListProps & { data: UserProfile }) {
  const [selectedBrief, setSelectedBrief] = useState<BrandBrief>();
  const [briefsTableData, setBriefsTableData] = useState<Tdata[] | null>(null);
  const [requestsTableData, setRequestsTableData] = useState<Tdata[] | null>(
    null
  );
  const [currentEarnings, setCurrentEarnings] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [previousMonthEarnings, setPreviousMonthEarnings] = useState(0);

  const navigate = useNavigate();

  const {
    getEarnings,
    data: earningsData,
    loading: earningsLoading,
  } = UseGetCreativeEarnings();

  const isLoading = loading || requestLoading || earningsLoading;

  const checkParam = () => {
    const url = new URL(window.location.href);
    return !!url.searchParams.get('brief');
  };

  useEffect(() => {
    getEarnings({ variables: { creatorId: profileData.id } });
    if (!selectedBrief && checkParam()) navigate(AuthRoutes.Dashboard);
  }, []);

  const calculateEarnings = (earnings) =>
    earnings.reduce(
      (a, e) => ({
        lifetime: a.lifetime + e.lifetimeEarnings,
        current: a.current + e.currentEarnings,
        previous: a?.previous + e.previousEarnings || 0,
      }),
      {
        lifetime: 0,
        current: 0,
        previous: 0,
      }
    );

  useEffect(() => {
    if (!earningsData?.getCreativeEarnings) {
      return;
    }

    const parsed = JSON.parse(earningsData.getCreativeEarnings);
    const calculated = calculateEarnings(parsed.items);

    setCurrentEarnings(calculated.current);
    setTotalEarnings(calculated.lifetime);
    setPreviousMonthEarnings(calculated.previous);
  }, [earningsData]);

  useEffect(() => {
    if (briefList) {
      const sortedData = [...briefList].sort(
        (a, b) => Number(b?.active) - Number(a?.active)
      );

      const newData: Tdata[] = [];
      console.log(sortedData, 'sortedData');
      for (const brief of sortedData) {
        newData.push({
          id: brief?.id || '',
          img: brief?.brandImageUrl
            ? `${brief.brandImageUrl}?time=${new Date().getTime()}`
            : '/images/default-image.png',
          activationName: brief?.BriefName,
          brandName: brief?.brandInfo?.name,
          status: brief?.active ? 'Active' : 'In-active',
        });
      }

      setBriefsTableData(newData);
    }
  }, [briefList]);

  useEffect(() => {
    if (requestList?.length) {
      const newData: Tdata[] = [];
      [...requestList]?.splice(0, 10).map((req) => {
        setRequestsTableData(() => {
          newData.push({
            id: req?.id || '',
            activationName: req?.BriefName,
            creativeId: req?.uniqueId,
            status: req?.status,
          });
          return newData;
        });
      });
    } else if (requestList?.length === 0) {
      setRequestsTableData([]);
    }
  }, [requestList]);

  if (selectedBrief && checkParam()) {
    const hashtags =
      brands?.find((brand) => {
        return brand.id === selectedBrief.brandId;
      })?.hashtags || [];
    const description =
      brands?.find((brand) => {
        return brand.id === selectedBrief.brandId;
      })?.personalDescription || '';
    return (
      <CampaignBriefDetails
        data={selectedBrief}
        hashtags={hashtags}
        description={description}
        userType={profileData.userType as string}
        onBack={(): void => {
          setSelectedBrief(undefined);
          navigate(AuthRoutes.Dashboard);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="lg:grid flex grid-cols-4 lg:gap-[20px] gap-[10px] mb-[20px] w-full lg:overflow-x-visible overflow-x-auto overflow-y-hidden creator-dashboard p-0 lg:pb-0 pb-[4px]">
        <GradientCard>
          <CreatorStatsCard
            type={CreatorDashboardBoxes.Profile}
            value={`${profileCompletionPercentage || 0}%`}
          />
        </GradientCard>

        <GradientCard>
          <CreatorStatsCard
            type={CreatorDashboardBoxes.Earnings}
            value={`$${currentEarnings.toFixed(2)}`}
          />
        </GradientCard>

        <GradientCard>
          <CreatorStatsCard
            type={CreatorDashboardBoxes.PreviousMonthEarnings}
            value={`$${previousMonthEarnings.toFixed(2)}`}
          />
        </GradientCard>

        <GradientCard>
          <CreatorStatsCard
            type={CreatorDashboardBoxes.ClickThrough}
            value={`$${totalEarnings.toFixed(2)}`}
          />
        </GradientCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-[20px]">
        <Table
          mainlyData={briefList as Tdata[]}
          data={briefsTableData as Tdata[]}
          rows={['', 'brandName', 'activationName', 'status', 'details']}
          onRowClick={(brief) => {
            setSelectedBrief(brief);
            if (brief.active)
              navigate(`${AuthRoutes.Dashboard}?brief=true`);
          }}
          extended={false}
          extendedURL={AuthRoutes.BrandBrief}
          loading={isLoading || briefsTableData === null}
          rowWidth="w-[110px]"
          borderColor="#FF872F"
          firstRowName="BRAND"
          pagination={briefPagination || 0}
          changePage={changeBriefPage}
          pageSize={5}
          tableCurrentPage={Number(currentPage || 1)}
        />
        <Table
          mainlyData={briefList || []}
          data={requestsTableData as Tdata[]}
          extended={false}
          extendedURL={CreatorRoutes.Creatives}
          rows={['creativeId', 'activationName', 'status', 'details']}
          onRowClick={() => {
            navigate(`${CreatorRoutes.Creatives}`);
          }}
          pagination={0}
          loading={isLoading || requestsTableData === null}
          rowWidth="w-[110px]"
          borderColor="#FF872F"
          firstRowName="Creatives"
        />
      </div>
      <div className="grid lg:grid-cols-2 gap-[20px]">
        <CreatorNotifications />
      </div>
    </div>
  );
}

export default withCreatorBriefList(CreatorDashboard);

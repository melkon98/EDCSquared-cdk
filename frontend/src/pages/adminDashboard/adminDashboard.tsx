import AdminDashboardTable from 'components/adminDashboardTable/adminDashboardTable';
import CreatorStatsCard from 'components/creatorStatsCard/creatorStatsCard';
import GradientCard from 'components/gradientCard/gradientCard';
import { formatISO, startOfDay, subDays } from 'date-fns';
import {
  GetCreativeRequestsCountBetweenDates,
  GetUserWallets,
  listAllRequests,
  listRequestsByStatus,
  UseGetApprovedAdsWithinRange,
} from 'hooks';
import { useEffect, useState } from 'react';
import { withAdmin } from 'state/admin';
import { AdminDashboardBoxes } from 'utils';
import './adminDashboard.css';
import { CREATIVE_STATUS } from 'API';

type TProps = {
  brandBriefs?: any;
};

function AdminDashboard({ brandBriefs }: TProps) {
  const [isShowBoxes, setIsShowBoxes] = useState(true);
  const [activeApprovedAdsCount, setActiveApprovedAdsCount] = useState(0);
  const [, setAcceptedRequests] = useState(0);
  const [activeBriefs, setAtciveBriefs] = useState(0);
  const [creativeRequestsCount, setCreativeRequestsCount] = useState(0);
  const [creatorEarnings, setCreatorEarnings] = useState(0);

  const {
    getAllRequests,
    data: allRequestsData,
    loading: allRequestsLoading,
  } = listAllRequests();

  const {
    getRequestsByStatus,
    data: statusRequestData,
    loading: statusReqeuestLoading,
  } = listRequestsByStatus();

  const {
    getWallets,
    loading: walletsLoading,
    data: userWallets,
    error: userWalletsError,
  } = GetUserWallets();

  const { data: approvedAdsData, getApprovedAdsCountWithinRange } =
    UseGetApprovedAdsWithinRange();

  const {
    getRequestsCountBetweenDates: getCreativeRequestsCount,
    data: creativeRequests,
    loading: creativesLoading,
    error: creativesError,
  } = GetCreativeRequestsCountBetweenDates();

  useEffect(() => {
    getRequestsByStatus({
      variables: { limit: 500, status: CREATIVE_STATUS.Approved },
    });
    getAllRequests({ variables: { limit: 500 } });

    const currentDate = new Date();
    const startDate = formatISO(startOfDay(subDays(currentDate, 1)));
    const endDate = formatISO(currentDate);

    getCreativeRequestsCount({
      variables: {
        startDate,
        endDate,
      },
    });
    getWallets({ variables: { limit: 1000 } });
    getApprovedAdsCountWithinRange({
      variables: { startDate, endDate, status: 'ACTIVE' },
    });
  }, []);

  useEffect(() => {
    if (!creativesLoading && creativeRequests) {
      const count = JSON.parse(creativeRequests).count || 0;
      setCreativeRequestsCount(count);
    }

    if (creativesError) {
      console.error(creativesError);
    }
  }, [creativesLoading, creativeRequests]);

  useEffect(() => {
    if (!approvedAdsData) {
      return;
    }

    try {
      const data = approvedAdsData.getApprovedAdsCountWithinRange;
      const { count } = JSON.parse(data || '');
      setActiveApprovedAdsCount(count);
    } catch (e) {
      console.error(e);
    }
  }, [approvedAdsData]);

  useEffect(() => {
    if (!walletsLoading && userWallets) {
      const earnings = userWallets.items.reduce(
        (a, uw) => a + (uw?.currentBalance || 0),
        0
      );

      setCreatorEarnings(earnings);
    }
  }, [walletsLoading, userWallets]);

  useEffect(() => {
    if (!brandBriefs) {
      return;
    }
    setAtciveBriefs(brandBriefs?.filter((b) => b.active)?.length);
  }, [brandBriefs]);

  return (
    <div className="admin-panel">
      <div className="admin-dashboard-card-container">
        {isShowBoxes && (
          <div className="lg:grid flex grid-cols-4 lg:gap-[20px] gap-[10px] mb-[20px] w-full lg:overflow-x-visible overflow-x-auto overflow-y-hidden creator-dashboard p-0 lg:pb-0 pb-[4px]">
            <GradientCard>
              <CreatorStatsCard
                type={AdminDashboardBoxes.Wallet}
                value={`$${creatorEarnings.toFixed(2)}`}
              />
            </GradientCard>

            <GradientCard>
              <CreatorStatsCard
                type={AdminDashboardBoxes.BrandBriefs}
                value={`${activeBriefs}`}
              />
            </GradientCard>

            <GradientCard>
              <CreatorStatsCard
                type={AdminDashboardBoxes.ContentSubmissions}
                value={`${creativeRequestsCount}`}
                hourText={true}
              />
            </GradientCard>

            <GradientCard>
              <CreatorStatsCard
                type={AdminDashboardBoxes.Approval}
                value={`${activeApprovedAdsCount}`}
                hourText={true}
              />
            </GradientCard>
          </div>
        )}
      </div>
      <div className="">
        <AdminDashboardTable
          paymentDetails={null}
          setIsShowBoxes={setIsShowBoxes}
        />
      </div>
    </div>
  );
}

export default withAdmin(AdminDashboard);

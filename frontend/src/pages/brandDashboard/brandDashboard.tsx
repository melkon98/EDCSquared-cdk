import './brandDashboard.css';
import { FC, useEffect, useState } from 'react';
import { BrandBriefProps, withBrandBriefs } from 'state/brandBrief';
import CreativeDetails from 'pages/creativeDetails/creativeDetails';
import { BrandBrief, CREATIVE_REQUEST_RESPONSE } from 'API';
import CampaignBriefDetails from 'pages/campaignBriefDetails/campaignBriefDetails';
import { RequestWithBrief } from 'components/creativesTable/creativesTable';
import Table, { Tdata } from 'components/table/Table';
import GradientCard from 'components/gradientCard/gradientCard';
import CreatorStatsCard from 'components/creatorStatsCard/creatorStatsCard';
import {
  AuthRoutes,
  BrandDashboardBoxes,
  BrandRoutes,
} from 'utils';
import CreatorNotifications from 'components/creatorNotifications/creatorNotifications';
import { useNavigate } from 'react-router-dom';

export const BrandDashboard: FC<BrandBriefProps> = ({
  requests,
  loading,
  reqLoading,
  spent,
  profileState,
  briefPagination,
  contentStats,
  currentPage,
  changeBriefPage,
  ...props
}) => {
  const [selectedRequest, setSelectedRequest] = useState<CREATIVE_REQUEST_RESPONSE>();
  const [selectedBrief, setSelectedBrief] = useState<BrandBrief>();
  const [requestsTableData, setRequestsTableData] = useState<Tdata[] | null>(null);
  const [briefsTableData, setBriefsTableData] = useState<Tdata[] | null>(null);
  const [approvedCount, setApprovedCount] = useState(0);
  const navigate = useNavigate();
  const checkParam = () => {
    const url = new URL(window.location.href);
    return url.searchParams.get('brief') || url.searchParams.get('request');
  };
  useEffect(() => {
    if (props.data?.length) {
      const briefs = [...props.data]
        .splice(0, 10)
        .sort((a, b) => Number(b?.active) - Number(a?.active));

      const newData: Tdata[] = [];
      for (const brief of briefs) {
        setBriefsTableData(() => {
          newData.push({
            id: brief?.id || '',
            // TODO: Fix
            img: '/images/default-image.png',
            // img: brief?.brandImageUrl
            //   ? `${brief.brandImageUrl}?time=${new Date().getTime()}`
            //   : '/images/default-image.png',
            activationName: brief?.BriefName,
            brandName: brief?.brandProfile?.name,
            status: brief?.active ? 'Active' : 'In-active',
          });
          return newData;
        });
      }
    } else if (props.data?.length === 0) {
      setBriefsTableData([]);
    }
  }, [props.data]);

  useEffect(() => {
    if (requests?.length) {
      const newData: Tdata[] = [];
      let count = 0;
      const shortData = [...requests].splice(0, 4);
      for (const request of shortData) {
        newData.push({
          id: request?.id || '',
          // TODO: Fix
          img: '/images/default-image.png',
          // img: request?.userProfileImageUrl
          //   ? `${request?.userProfileImageUrl}?time=${new Date().getTime()}`
          //   : '/images/default-image.png',
          creativeId: request?.uniqueId,
          creatorHandle: request?.creativeTiktokHandle,
          activationName: request?.BriefName,
          status: request?.status,
        });
      }
      setRequestsTableData(newData);
      for (const request of requests) {
        if (request?.status === 'Approved') {
          count++;
        }
      }
      setApprovedCount(count);
    } else if (requests?.length === 0) {
      setRequestsTableData([]);
    }
  }, [requests]);

  if (selectedBrief && checkParam())
    return (
      <CampaignBriefDetails
        data={selectedBrief}
        userType={profileState?.userType as string}
        hashtags={profileState?.brand?.items[0]?.hashtags}
        description={profileState?.brand?.items[0]?.personalDescription || ''}
        requests={requests}
        onBack={(): void => {
          setSelectedBrief(undefined);
          navigate(AuthRoutes.Dashboard);
        }}
      />
    );

  if (selectedRequest && checkParam())
    return (
      <CreativeDetails
        requests={requests}
        creativeRequest={selectedRequest}
        onBack={(): void => {
          setSelectedRequest(undefined);
          navigate(AuthRoutes.Dashboard);
        }}
        briefs={props.data || []}
      />
    );

  return (
    <>
      <div className="lg:grid flex grid-cols-4 lg:gap-[20px] gap-[10px] mb-[20px] w-full lg:overflow-x-visible overflow-x-auto overflow-y-hidden creator-dashboard p-0 lg:pb-0 pb-[4px]">
        <GradientCard>
          <CreatorStatsCard
            type={BrandDashboardBoxes.Approved}
            value={String(contentStats?.approved || 0)}
            seeMore={BrandRoutes.Creatives}
          />
        </GradientCard>
        <GradientCard>
          <CreatorStatsCard
            type={BrandDashboardBoxes.EffectiveCostPer}
            value={`$${Number(spent || 0).toFixed(2)}`}
          />
        </GradientCard>
        <GradientCard>
          <CreatorStatsCard
            type={BrandDashboardBoxes.ContentApproval}
            value={`${contentStats?.all || 0
              }`}
            seeMore={BrandRoutes.Creatives}
          />
        </GradientCard>
        <GradientCard>
          <CreatorStatsCard
            type={BrandDashboardBoxes.Invite}
            value={'Copy short URL'}
            button="Copy short URL"
          />
        </GradientCard>
      </div>
      <div className="grid lg:grid-cols-2 gap-[20px]">
        <Table
          mainlyData={props.data}
          data={briefsTableData}
          rows={['', 'brandName', 'activationName', 'status', 'details']}
          onRowClick={(brief) => {
            brief && setSelectedBrief(brief);
            navigate(`${AuthRoutes.Dashboard}?brief=true`);
          }}
          rowWidth="w-[110px]"
          loading={loading || briefsTableData === null}
          extended={false}
          extendedURL={AuthRoutes.BrandBrief}
          firstRowName="BRAND"
          creatorUser={false}
          pagination={briefPagination || 0}
          changePage={changeBriefPage}
          pageSize={5}
          tableCurrentPage={Number(currentPage || 1)}
        />
        <Table
          mainlyData={requests}
          data={requestsTableData}
          rows={['', 'creativeId', 'activationName', 'status', 'details']}
          onRowClick={(request) => {
            request && setSelectedRequest(request);
            navigate(`${AuthRoutes.Dashboard}?request=true`);
          }}
          pagination={0}
          dataCy="creativeReq"
          loading={reqLoading || requestsTableData === null}
          extended={false}
          extendedURL={BrandRoutes.Creatives}
          firstRowName="creator"
          creatorUser={false}
        />
        <CreatorNotifications />
        <section className="flex sm:min-h-358 min-h-[342px] flex-col flex-1 rounded-[16px] border border-[#F5F1E8] py-[28px] pl-[28px] pr-[28px] bg-white xl:mb-0">
          <div className="flex items-center ">
            <h6 className=" text-[#0E0D0D] head-text font-[700] text-[14px] uppercase ">
              Brand profile
            </h6>
          </div>
          <div className="brand-dashboard__profile-group sm:grid flex flex-col grid-cols-2 gap-[10px] mb-[10px] mt-[26px] h-full">
            <div className="col-span-1">
              <div className="flex items-center justify-between">
                <h6 className="text-[#0E0D0D] head-text font-[700] text-[16px] uppercase">
                  #BRAND TAGS
                </h6>
              </div>
              <div className="sm:flex block flex-wrap relative mt-0 ">
                <div className="relative 2xl:ml-[40px] ml-0 h-full md:w-[300px] sm:w-[237px] w-full brand-dashboard__profile-group col-span-4 mt-[85px]">
                  <div className="flex flex-wrap lg:h-auto h-[125px]">
                    {profileState?.hashtags?.length
                      ? profileState?.hashtags.map((vertical, index) => {
                        return (
                          <div
                            key={index}
                            className={`border bg-[#202020] max-w-[138px] text-[#fff] rounded-[80px] m-1 cursor-pointer ${vertical?.split(' ') && vertical.length > 9
                              ? 'w-[138px] justify-center'
                              : ''
                              } min-w-[20px] flex px-2 py-1 absolute position-${index + 1
                              }`}
                          >
                            <span>{vertical}</span>{' '}
                          </div>
                        );
                      })
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <h6 className="text-[#0E0D0D] head-text font-[700] text-[16px] uppercase sm:mt-0 mt-[20px]">
                description
              </h6>
              <div className="flex flex-col justify-between items-end h-full pt-[20px]">
                <div className="w-full">
                  {profileState?.description &&
                    profileState?.description?.length > 130
                    ? profileState?.description?.slice(0, 130) + '...'
                    : profileState?.description}
                </div>
                <button
                  className="creator-button bg-[#000] text-white rounded-[4px] font-normal w-[111px] sm:m-0 m-auto"
                  onClick={() => navigate(BrandRoutes.Brand)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default withBrandBriefs(BrandDashboard);
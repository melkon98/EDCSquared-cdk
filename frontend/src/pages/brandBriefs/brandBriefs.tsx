import { BrandBrief } from 'API';
import Table, { Tdata } from 'components/table/Table';
import Modal from 'components/ui/modal';
import CampaignBriefDetails from 'pages/campaignBriefDetails/campaignBriefDetails';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandBriefProps, withBrandBriefs } from 'state/brandBrief';
import { AuthRoutes, BrandRoutes } from 'utils';

export const BrandBriefs: FC<BrandBriefProps> = ({
  data,
  loading,
  brand,
  profileState,
  requests,
  changeBriefPage,
  currentPage,
  briefPagination,
}) => {
  const [selectedBrief, setSelectedBrief] = useState<BrandBrief>();
  const [searchText, setSearchText] = useState('');
  const [briefsTableData, setBriefsTableData] = useState<Tdata[] | null>(null);
  const [findedbriefs, setFindedbriefs] = useState<Tdata[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showLinkingErrorModal, setShowLinkingErrorModal] = useState(false);
  const [verticalError, setVerticalError] = useState(false);
  const navigate = useNavigate();

  const searchBrief = (value: string) => {
    if (!value) {
      setFindedbriefs([]);
    } else if (briefsTableData !== null) {
      const findedData: Tdata[] = [];
      for (const data of briefsTableData) {
        if (
          data?.name &&
          data?.name.toLowerCase().includes(value.toLowerCase())
        ) {
          findedData.push(data);
        }
      }
      setFindedbriefs(() => {
        return findedData;
      });
    }
  };
  const checkParam = () => {
    const url = new URL(window.location.href);
    return !!url.searchParams.get('brief');
  };

  useEffect(() => {
    if (data?.length) {
      const sortedData = [...data].sort(
        (a, b) => Number(b?.active) - Number(a?.active)
      );
      const newData: Tdata[] = [];
      for (const brief of sortedData) {
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
            details: brief?.brandBriefDetails,
            objective: brief?.objective,
            country: brief?.country,
            status: brief?.active ? 'Active' : 'In-active',
          });
          return newData;
        });
      }
    } else if (data?.length === 0) {
      setBriefsTableData([]);
    }
  }, [data]);

  useEffect(() => {
    if (!selectedBrief) {
      navigate(AuthRoutes.BrandBrief);
    }
  }, []);

  if (selectedBrief && checkParam())
    return (
      <CampaignBriefDetails
        id={profileState?.id}
        data={selectedBrief}
        hashtags={profileState?.brand?.items[0]?.hashtags}
        description={profileState?.description as string | undefined}
        requests={requests}
        userType={profileState?.userType as string}
        onBack={(): void => setSelectedBrief(undefined)}
      />
    );

  return (
    <div className="flex flex-col gap-4">
      <Modal
        title=""
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
          setVerticalError(false);
        }}
      >
        {verticalError ? (
          <>
            <div className="w-full text-center">
              <h2 className="head-text font-[700] md:text-[24px] text-[18px] text-[#0E0D0D]">
                Please select a vertical before creating a brand activation
              </h2>
            </div>
            <div className="w-full flex justify-center text-white mt-5">
              <button
                className="creator-button text-[16px] mb-5 mt-3"
                onClick={() => navigate(AuthRoutes.EditProfile)}
              >
                Profile
              </button>
            </div>
          </>
        ) : (
          <>
            {' '}
            <div className="w-full text-center">
              <h2 className="head-text font-[700] md:text-[24px] text-[18px] text-[#0E0D0D]">
                Please create a brand before creating a brand activation
              </h2>
            </div>
            <div className="w-full flex justify-center text-white mt-5">
              <button
                className="creator-button text-[16px] mb-5 mt-3"
                onClick={() => navigate(BrandRoutes.Brand)}
              >
                Create brand
              </button>
            </div>
          </>
        )}
      </Modal>
      <Modal
        title=""
        isOpen={showLinkingErrorModal}
        handleClose={() => setShowLinkingErrorModal(false)}
      >
        <div className="w-full text-center">
          <h2 className="head-text font-[700] md:text-[24px] text-[18px] text-[#0E0D0D]">
            Please link an ads account before creating a brand activation
          </h2>
        </div>
        <div className="w-full flex justify-center text-white mt-5">
          <button
            className="creator-button text-[16px] mb-5 mt-3"
            onClick={() => navigate(AuthRoutes.EditProfile)}
          >
            Profile
          </button>
        </div>
      </Modal>
      <section className="flex sm:gap-4 sm:items-center sm:flex-row flex-col-reverse">
        <section className="flex w-full">
          <div className="brand-dashboard__item search-item h-[40px] gap-0 px-4 search-input border rounded-[16px] border-[#F5F1E8]">
            <img
              className="brand-dashboard__item-search"
              alt=""
              src="/images/search.svg"
            />
            <input
              className="creatives-search bg-white "
              placeholder="Search..."
              type="text"
              value={searchText}
              name="search creative request"
              onChange={(e) => {
                setSearchText(e.target.value);
                searchBrief(e.target.value);
              }}
            />
          </div>
        </section>
        <div
          data-cy="create-brief"
          onClick={() => {
            if (!brand) {
              setVerticalError(false);
              setShowModal(true);
            }
            if (!profileState?.vertical) {
              setVerticalError(true);
              setShowModal(true);
            } else if (
              !(
                profileState?.tiktokAccountAccess?.access_token ||
                profileState?.facebookAccountAccess?.access_token ||
                profileState?.youtubeAccountAccess?.access_token
              )
            ) {
              setShowLinkingErrorModal(true);
            } else {
              navigate(BrandRoutes.CreateBrief);
            }
          }}
        >
          <button className="discover-btn sm:w-[220px] w-full h-[40px] rounded-[16px] bg-black sm:mb-0 mb-3 mx-auto">
            <span className="text-[14px] uppercase">Add new activation</span>
          </button>
        </div>
      </section>
      <section className="grid-cols-1">
        <Table
          rows={[
            '',
            'activationName',
            'objective',
            'country',
            'status',
            'details',
            'edit',
          ]}
          header={{
            title: 'Brand Activation',
            icon: '',
            search: true,
          }}
          loading={loading || briefsTableData === null}
          extended={true}
          data={searchText ? findedbriefs : briefsTableData}
          hasSearchBar={true}
          onRowClick={(brief) => {
            if (brief) {
              setSelectedBrief(brief);
              navigate(`${AuthRoutes.BrandBrief}?brief=true`);
            }
          }}
          onEditClick={(brief) => {
            navigate(BrandRoutes.EditBrief, {
              state: {
                brief,
              },
            });
          }}
          mainlyData={data}
          pagination={briefPagination || 0}
          firstRowName="BRAND"
          changePage={changeBriefPage}
          tableCurrentPage={Number(currentPage || 1)}
        />
      </section>
    </div>
  );
};

export default withBrandBriefs(BrandBriefs);

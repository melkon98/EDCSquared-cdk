import { BrandBrief } from 'API';
import Table, { Tdata } from 'components/table/Table';
import CampaignBriefDetails from 'pages/campaignBriefDetails/campaignBriefDetails';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICreatorBriefListProps, withCreatorBriefList } from 'state/dashboard';
import { withProfile } from 'state/profileSteps';
import { AuthRoutes, ProfileProps } from 'utils';

export const CreatorBriefs: FC<ProfileProps & ICreatorBriefListProps> = ({
  profileState: { data },
  briefList,
  loading,
  changeBriefPage,
  briefPagination,
  currentPage,
  brands,
}) => {
  const [selectedBrief, setSelectedBrief] = useState<BrandBrief>();
  const [tableData, setTableData] = useState<Tdata[] | null>(null);
  const navigate = useNavigate();

  const checkParam = () => {
    const url = new URL(window.location.href);
    return !!url.searchParams.get('brief')
  };

  useEffect(() => {
    if (!selectedBrief && checkParam()) navigate(AuthRoutes.BrandBrief);
  }, []);

  useEffect(() => {
    if (briefList?.length) {
      const sortedData = [...briefList].sort(
        (a, b) => Number(b?.active) - Number(a?.active)
      );
      const newData: Tdata[] = [];

      sortedData.map((brief) => {
        setTableData(() => {
          newData.push({
            id: brief?.id || '',
            img: brief?.brandImageUrl
              ? `${brief.brandImageUrl}?time=${new Date().getTime()}`
              : '/images/default-image.png',
            brandName: brief?.brandInfo?.name,
            activationName: brief?.BriefName,
            objective: brief?.objective,
            vertical: brief?.vertical,
            status: brief?.active ? 'Active' : 'In-active',
            created: new Date(brief?.createdAt || '')
              .toLocaleString()
              .split(',')[0],
          });

          return newData;
        });
      });
    } else if (briefList?.length === 0) {
      setTableData([]);
    }
  }, [briefList]);

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
        userType={data?.userType as string}
        data={selectedBrief}
        onBack={(): void => setSelectedBrief(undefined)}
        hashtags={hashtags}
        description={description}
      />
    );
  }

  return (
    <>
      <Table
        mainlyData={briefList as Tdata[]}
        data={tableData as Tdata[]}
        header={{
          title: 'Brand Activation',
          icon: '',
          search: true,
        }}
        rows={[
          '',
          'brandName',
          'activationName',
          'vertical',
          'objective',
          'created',
          'status',
          'details',
        ]}
        colHeight={400}
        onRowClick={(brief) => {
          setSelectedBrief(brief);
          if (brief.active) navigate(`${AuthRoutes.BrandBrief}?brief=true`);
        }}
        pagination={briefPagination || 0}
        loading={loading || tableData === null}
        rowWidth="w-[110px]"
        dataCy="brandBrief"
        extended={true}
        borderColor="#FF872F"
        firstRowName="BRAND"
        tableCurrentPage={Number(currentPage || 1)}
        changePage={
          changeBriefPage as (
            type: string,
            page: number,
            pageSize: number
          ) => Promise<void>
        }
      />
    </>
  );
};

export default withProfile(withCreatorBriefList(CreatorBriefs));

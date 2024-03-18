import { BrandBrief, CreativeRequest } from 'API';
import Table, { Tdata } from 'components/table/Table';
import CreativeDetails from 'pages/creativeDetails/creativeDetails';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandBriefProps, withBrandBriefs } from 'state/brandBrief';
import { BrandRoutes } from 'utils';

export type RequestWithBrief = CreativeRequest & {
  brief?: BrandBrief;
};

export const CreativesTable: FC<BrandBriefProps> = ({
  data,
  reqLoading,
  reqPagination,
  changePage,
  changeBriefPage,
  requests,
  reqCurrentPage,
  brand,
}) => {
  const navigate = useNavigate();

  const [selectedRequest, setSelectedRequest] =
    useState<RequestWithBrief | null>(null);
  const [requestsTableData, setRequestsTableData] = useState<Tdata[] | null>(
    null
  );
  const checkParam = () => {
    const url = new URL(window.location.href);
    return !!url.searchParams.get('creative');
  };
  useEffect(() => {
    if (requests?.length) {
      const newData: Tdata[] = [];
      for (const request of requests) {
        setRequestsTableData(() => {
          newData.push({
            id: request?.id || '',
            // TODO: FIX THIS
            img: '/images/default-image.png',
            // img: request?.userProfileImageUrl
            //   ? `${request?.userProfileImageUrl}?time=${new Date().getTime()}`
            //   : '/images/default-image.png',
            creativeId: request?.uniqueId,
            creatorHandle: request?.creativeTiktokHandle,
            dateOfSubmission: new Date(request?.createdAt || '')
              .toLocaleString()
              .split(',')[0],
            brandName: brand?.name,
            creatorName: request?.creatorName,
            activationName: request?.BriefName,
            status: request?.status,
          });
          return newData;
        });
      }
    } else if (requests?.length === 0) {
      setRequestsTableData([]);
    }
  }, [requests]);
  useEffect(() => {
    if (!selectedRequest) {
      navigate(BrandRoutes.Creatives);
    }
  }, []);

  if (selectedRequest && checkParam())
    return (
      <CreativeDetails
        creativeRequest={selectedRequest}
        requests={requests}
        onBack={() => setSelectedRequest(null)}
        briefs={data}
      />
    );

  return (
    <div className="grid grid-cols-1">
      <section className="">
        <Table
          mainlyData={requests as Tdata[]}
          data={requestsTableData as Tdata[]}
          header={{
            title: 'Creative Submissions',
            icon: '',
            search: true,
          }}
          rows={[
            '',
            'brandName',
            'dateOfSubmission',
            'activationName',
            'creativeId',
            'status',
            'details',
          ]}
          onRowClick={(brief) => {
            brief && setSelectedRequest(brief);
            changeBriefPage('brandBriefs', 1, 1000);
            navigate(`${BrandRoutes.Creatives}?creative=true`);
          }}
          pagination={reqPagination || 0}
          loading={reqLoading || requestsTableData === null}
          changePage={changePage}
          firstRowName="creator"
          tableCurrentPage={Number(reqCurrentPage || 1)}
        />
      </section>
    </div>
  );
};
export default withBrandBriefs(CreativesTable);

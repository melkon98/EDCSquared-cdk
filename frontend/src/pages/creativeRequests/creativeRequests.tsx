import { BrandBrief, CreativeRequest, UserProfile } from 'API';
import RevisionContentModal from 'components/revisionContentModal/revisionContentModal';
import Table, { Tdata } from 'components/table/Table';
import { getCreatorBriefList } from 'hooks';
import { FC, useEffect, useState } from 'react';
import { ICreatorBriefListProps, withCreatorBriefList } from 'state/dashboard';

const CreativeRequests: FC<ICreatorBriefListProps> = ({
  requestList,
  requestLoading,
  reqPagination,
  profileData,
  changePage,
}) => {
  const [tableData, setTableData] = useState<Tdata[] | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<CreativeRequest | null>(null);
  const { getBriefList, data: briefs } = getCreatorBriefList();
  useEffect(() => {
    if (requestList?.length) {
      const newData: Tdata[] = [];
      requestList.map((req) => {
        setTableData(() => {
          newData.push({
            id: req?.id || '',
            img: '/images/default-image.png',
            // img: req.brandProfileImageUrl
            //   ? `${req.brandProfileImageUrl}?time=${new Date().getTime()}`
            //   : '/images/default-image.png',
            brandName: req?.brandName,
            activationName: req?.BriefName,
            creativeId: req?.uniqueId,
            adminApprovalStatus: req?.adminApproval || 'Submitted',
            brandApprovalStatus: req?.status,
          });
          return newData;
        });
      });
    } else if (requestList?.length === 0) {
      setTableData([]);
    }
  }, [requestList]);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('id') && requestList.length) {
      const foundRequest = requestList.find((req) => {
        return req.id == url.searchParams.get('id');
      });
      setSelectedRequest(foundRequest as CreativeRequest | null);
      setShowContent(true);
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete('id');

      const newUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        currentUrl.pathname +
        currentUrl.search;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
  }, [requestList]);
  useEffect(() => {
    if (profileData && !briefs) {
      getBriefList({
        variables: { page: 1, pageSize: 1000, country: profileData?.country },
      });
    }
  }, [briefs, profileData]);
  return (
    <>
      <div className="grid">
        <div className="overflow-x-auto max-w-full">
          <Table
            mainlyData={requestList as Tdata[]}
            data={tableData as Tdata[]}
            header={{
              title: 'My creative submissions',
              icon: '',
              search: true,
            }}
            rows={[
              '',
              'creativeId',
              'brandName',
              'activationName',
              'adminApprovalStatus',
              'brandApprovalStatus',
            ]}
            onRowClick={(request) => {
              if (request && request.adminApproval === 'Revision') {
                setSelectedRequest(request);
                setShowContent(true);
              }
            }}
            pagination={reqPagination || 0}
            loading={requestLoading || tableData === null}
            changePage={
              changePage as (
                type: string,
                page: number,
                limit: number
              ) => Promise<void>
            }
            borderColor="#FF872F"
            firstRowName="BRAND"
            extended={true}
          />
        </div>
      </div>
      {showContent ? (
        <div
          className="inspiration-panel pointer-events-auto z-[50]"
          onClick={() => setShowContent(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="z-[99] md:w-full flex flex-col justify-center items-center w-[90%]"
          >
            <RevisionContentModal
              onClose={(): void => setShowContent(false)}
              request={selectedRequest}
              videoUrl={selectedRequest?.tiktokCreativeUrl || ''}
              createAdPayload={undefined}
              isSparkAds={
                !!briefs?.items?.find(
                  (brief) => brief?.id === selectedRequest?.brandBriefId
                )?.tikTokData?.tikTokSparkAds
              }
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default withCreatorBriefList(CreativeRequests);

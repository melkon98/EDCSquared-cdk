import {
  CreativeRequest,
  UpdateCreativeRequestInput,
  UserPaymentDetails,
} from 'API';
import AdminApprovalContent from 'components/adAdminApproval/Index';
import Modal from 'components/authentication/modal';
import Table, { Tdata } from 'components/table/Table';
import { useRequestStatusSendEmail } from 'hooks/query/useEmail';
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { withAdmin } from 'state/admin';
import { AdminRoutes, AuthRoutes, UnknownType } from 'utils';
import './adminDashboardTable.css';
import { useLocation } from 'react-router-dom';

type AdminDashboardTableProps = {
  paymentDetails: UserPaymentDetails[] | null;
  paymentLoading?: boolean;
  creativeRequestsData?: CreativeRequest[] | null;
  reqloading?: boolean;
  setIsShowBoxes: Dispatch<SetStateAction<boolean>>;
  updateRequest?: (UnknownType) => void;
};

const AdminDashboardTable: FC<AdminDashboardTableProps> = ({
  paymentDetails,
  paymentLoading,
  creativeRequestsData,
  reqloading,
  updateRequest,
  setIsShowBoxes,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState<Tdata[]>([]);
  const [requestsTableData, setRequestsTableData] = useState<Tdata[] | null>(
    null
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInspiration, setShowInspiration] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCreativeRequest, setSelectedCreatveRequest] =
    useState<CreativeRequest | null>(null);
  const { sendEmailData } = useRequestStatusSendEmail();

  const getTableData = (groupTransactionsMapData) => {
    const newData: Tdata[] = [];
    for (const transaction of [...groupTransactionsMapData.entries()]) {
      newData.push({
        transactions: GetDateMonthName(transaction[0]) || '',
        numberOfTransactions: transaction[1]?.length,
        totalAmount: `$${getTotalAmount(transaction[1])}`,
        transactionDate: transaction[0],
      });
    }
    setTableData(newData);
  };

  const updateCreativeRequestStatus = async (
    newStatus: string,
    comment?: string
  ) => {
    try {
      if (selectedCreativeRequest) {
        setLoading(() => {
          return true;
        });
        const creativeRequest: UnknownType = { ...selectedCreativeRequest };
        delete creativeRequest.__typename;
        delete creativeRequest.updatedAt;
        delete creativeRequest.createdAt;
        delete creativeRequest.approvedAd;
        if (newStatus === 'Rejected' || newStatus === 'Revision')
          creativeRequest.adminComment =
            comment && selectedCreativeRequest.adminComment?.length
              ? [...selectedCreativeRequest.adminComment, comment]
              : comment && !selectedCreativeRequest.adminComment?.length
                ? [comment]
                : selectedCreativeRequest.adminComment;
        const input: UpdateCreativeRequestInput = {
          ...creativeRequest,
          adminApproval: newStatus,
        };
        if (updateRequest) await updateRequest({ variables: { input } });
        if (newStatus !== 'Approved')
          await sendEmailData({
            variables: {
              creativeRequestUrl: `${process.env.REACT_APP_FRONTEND_BASE_URL}creatives?id=${creativeRequest.id}`,
              email: creativeRequest.email,
              name: creativeRequest?.creatorProfile?.name,
              brandBriefName: creativeRequest.BriefName,
              creativeUniqueId: creativeRequest.uniqueId,
              emailType: newStatus.toUpperCase(),
              feedback: comment || '',
            },
          });
        setLoading(() => {
          return false;
        });
        setShowSuccessModal(true);
      }
    } catch (error) {
      setLoading(() => {
        return false;
      });
      console.log(error);
    }
  };

  const getMakeGroup = useCallback(() => {
    const GroupMap = new Map();
    if (paymentDetails?.length) {
      for (const diteil of paymentDetails) {
        const { userTransactions } = diteil;
        if (userTransactions?.items.length) {
          for (const transaction of userTransactions.items) {
            const day = new Date(transaction?.createdAt || '');
            let date = '';
            day.setMonth(day.getMonth() + 1);
            date = `${new Date(transaction?.createdAt || '')
              .toLocaleString()
              .split(',')[0]
              }-${day.toLocaleString().split(',')[0]}`;
            if (!GroupMap.get(date)) {
              GroupMap.set(date, [transaction]);
            } else {
              const data = GroupMap.get(date);
              data.push(transaction);
              GroupMap.set(date, data);
            }
          }
        }
      }
    }
    const sortedArray: [string, string][] = Array.from(GroupMap).sort(
      (a, b) => {
        return (
          new Date(
            b[0].split('-')[0].split('.').reverse().join('-')
          ).getTime() -
          new Date(a[0].split('-')[0].split('.').reverse().join('-')).getTime()
        );
      }
    );
    const sortedMap: Map<string, string> = new Map(sortedArray);
    if (sortedMap.size && !tableData.length) getTableData(sortedMap);
  }, [paymentDetails]);

  const getTotalAmount = (data) => {
    let count = 0;

    for (const item of data) {
      count += item.paymentAmount;
    }
    return count.toFixed(2);
  };
  useEffect(() => {
    if (paymentDetails) {
      getMakeGroup();
    }
  }, [getMakeGroup, paymentDetails]);

  useEffect(() => {
    if (creativeRequestsData?.length) {
      const newData: Tdata[] = [];
      const shortData = [...creativeRequestsData].splice(0, 10);
      for (const request of shortData) {
        newData.push({
          id: request?.id || '',
          // TOOD: Change
          img: '/images/default-image.png',
          // img: request?.userProfileImageUrl
          //   ? `${request?.userProfileImageUrl}?time=${new Date().getTime()}`
          //   : '/images/default-image.png',
          creativeId: request.uniqueId,
          creatorName: request?.creatorProfile?.name,
          activationName: request?.BriefName,
        });
      }
      setRequestsTableData(newData);
    } else if (
      creativeRequestsData !== undefined &&
      creativeRequestsData?.length === 0
    ) {
      setRequestsTableData([]);
    }
  }, [creativeRequestsData]);

  const GetDateMonthName = (date: string) => {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const updatedDate = date?.split('-')[0];
    const dateMonth = updatedDate?.includes('.')
      ? updatedDate?.split('.')[1]
      : (updatedDate?.split('/')[1] as string | undefined);
    const dateYear = updatedDate?.includes('.')
      ? updatedDate?.split('.')[2]
      : updatedDate?.split('/')[2];

    let monthName = '';
    if (dateMonth) monthName = month[Number(dateMonth) - 1] || '';
    return `${monthName} ${dateYear}`;
  };

  const getLoadingStatus = () => {
    if (!paymentLoading && tableData.length) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.get('request')) {
      setIsShowBoxes(true);
      setShowInspiration(false);
      return;
    }
    setShowInspiration(true);
    setIsShowBoxes(false);
  }, [location]);
  return (
    <div className="">
      {showInspiration ? (
        <div className="">
          <div onClick={(e) => e.stopPropagation()} className="z-[99]">
            <AdminApprovalContent
              videoUrl={selectedCreativeRequest?.tiktokCreativeUrl || ''}
              onClose={() => setShowInspiration(true)}
              request={selectedCreativeRequest}
              createAdPayload={{}}
              updateCreativeRequestStatus={updateCreativeRequestStatus}
              type="Admin"
              reqLoading={loading}
            />
          </div>
          <Modal
            isOpen={showSuccessModal}
            handleClose={() => {
              setIsShowBoxes(true);
              setShowInspiration(false);
              setShowSuccessModal(false);
            }}
            type="brand"
            content="The Status of the creative request was successfully changed"
          />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-[30px]">
          <>
            <div className="md:col-span-6 col-span-12">
              <Table
                data={tableData as Tdata[]}
                rows={[
                  'transactions',
                  'numberOfTransactions',
                  'totalAmount',
                  'details',
                ]}
                loading={getLoadingStatus()}
                onTransationClick={(date) => {
                  navigate(`/payment-window/${btoa(
                    date.replaceAll('/', '.')
                  )}`
                  )
                }}
                pagination={1}
                extended={false}
                rowWidth="w-[110px]"
                borderColor="#FF872F"
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Table
                mainlyData={creativeRequestsData as Tdata[]}
                data={requestsTableData}
                rows={['creativeId', 'activationName', 'creatorName', 'details']}
                loading={reqloading || requestsTableData === null}
                pagination={1}
                extended={false}
                extendedURL={AdminRoutes.CreativeApproval}
                onRowClick={(request) => {
                  request && setSelectedCreatveRequest(request);

                  navigate(`${AuthRoutes.Dashboard}?request=true`);
                }}
                rowWidth="w-[110px]"
                borderColor="#FF872F"
                firstRowName="BRAND BRIEFS"
              />
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default withAdmin(AdminDashboardTable);

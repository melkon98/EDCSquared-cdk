/* eslint-disable react/prop-types */
import { UserProfile } from 'API';
import { IconLoader } from 'components';
import Modal from 'components/authentication/modal';
import CreatorStatsCard from 'components/creatorStatsCard/creatorStatsCard';
import GradientCard from 'components/gradientCard/gradientCard';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import { withAdmin } from 'state/admin';
import { AdminDashboardBoxes, AdminRoutes } from 'utils';
import EditUser from './editUser';
import UserBankDetails from './userBankDetails';

type CSVType = {
  email: string;
  fullName: string;
  signUp: string;
};
type userBankDetails = {
  id: string;
  accountNumber: string;
  country: string;
  createdAt: string;
  documentID: string;
  firstAddress: string;
  fullName: string;
  secondAddress: string;
  swiftCode: string;
};

const THIRD_PAGE = 3;
const SEVENTH_PAGE = 7;

const AdminCreativeUsers = ({ creativeUsers, creativeRequestsData }) => {
  const [filteredData, setFilteredData] = useState<UserProfile[]>([]);
  const [foundData, setFoundData] = useState<UserProfile[]>([]);
  const [limit] = useState(11);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showHasBankDetailsModal, setShowHasBankDetailsModal] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const headers = [
    { label: 'Full name', key: 'fullName' },
    { label: 'Email', key: 'email' },
    { label: 'Sign up', key: 'signUp' },
  ];

  const getDate = (date) => {
    if (date)
      return (
        new Date(date).toLocaleDateString() +
        ' ' +
        new Date(date).toLocaleTimeString()
      );
    else return '';
  };

  const searchRequest = (value: string) => {
    setCurrentPage(1);
    if (!value) {
      const pagelength = Math.ceil(creativeUsers?.length / limit);
      setPagination(pagelength);
      setFilteredData(creativeUsers?.slice(0, limit));
      setFoundData(creativeUsers);
    } else {
      const filteredData: UserProfile[] = [];
      for (const data of creativeUsers) {
        const bankDetailStatus = data.userPaymentDetails
          ? 'Complete'
          : 'In-complete';
        if (
          data.name.toLowerCase().includes(value.toLowerCase()) ||
          data?.email?.toLocaleLowerCase().includes(value.toLowerCase()) ||
          data?.phoneNumber
            ?.toLocaleLowerCase()
            .includes(value.toLowerCase()) ||
          getDate(data?.lastLoginDate).includes(value.toLowerCase()) ||
          bankDetailStatus.toLocaleLowerCase().includes(value.toLowerCase())
        ) {
          filteredData.push(data);
        }
      }
      setFoundData(filteredData);
      const pagelength = Math.ceil(filteredData?.length / limit);
      setPagination(pagelength);
      setFilteredData(filteredData?.slice(0, limit));
    }
  };

  const getApprovedPercentage = () => {
    let approvedCount = 0;
    if (creativeRequestsData?.length)
      for (const request of creativeRequestsData) {
        if (
          request?.adminApproval === 'Approved' &&
          request?.status === 'Approved'
        ) {
          approvedCount++;
        }
      }
    if (approvedCount !== 0)
      return Math.floor((approvedCount / creativeRequestsData?.length) * 100);
    return 0;
  };

  const getCSVdata = () => {
    const CSVdata: CSVType[] = [];
    creativeUsers?.map((user) => {
      CSVdata.push({
        fullName: user.name,
        email: user.email,
        signUp: new Date(user.createdAt).toLocaleDateString(),
      });
    });
    const exportedData = CSVdata.sort((a, b) => {
      const dateA = new Date(a.signUp.split('.').reverse().join('-'));
      const dateB = new Date(b.signUp.split('.').reverse().join('-'));

      return dateB.getTime() - dateA.getTime();
    });
    return exportedData;
  };

  const getPageData = (page) => {
    console.log();

    if (page === 1) {
      setFilteredData(
        foundData.length
          ? foundData?.slice(0, limit)
          : creativeUsers?.slice(0, limit)
      );
    } else {
      setFilteredData(
        foundData.length
          ? foundData?.slice((page - 1) * limit, limit * page)
          : creativeUsers?.slice((page - 1) * limit, limit * page)
      );
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    const bankView = url.searchParams.get('bankView');
    setShowBankDetails(false);
    if (id && creativeUsers) {
      const user = creativeUsers?.find((brief) => brief?.id === id);
      if (!user) navigate(`${AdminRoutes.Creators}`);
      else if (user && user.userPaymentDetails && bankView) {
        setSelectedUser(user);
        setShowBankDetails(true);
      } else if (user && !user.userPaymentDetails && bankView) {
        setShowHasBankDetailsModal(true);
        navigate(`${AdminRoutes.Creators}`);
      } else {
        setSelectedUser(user);
      }
    } else {
      setSelectedUser(null);
    }
  }, [window.location.href, creativeUsers]);

  useEffect(() => {
    if (creativeUsers) setFilteredData(creativeUsers);
  }, [creativeUsers]);

  useEffect(() => {
    if (creativeUsers) {
      const pagelength = Math.ceil(creativeUsers?.length / limit);
      setPagination(pagelength);
      if (currentPage === 1) {
        setFilteredData(creativeUsers?.slice(0, limit));
      } else {
        setFilteredData(
          creativeUsers?.slice((currentPage - 1) * limit, limit * currentPage)
        );
      }
    }
  }, [creativeUsers, limit]);

  return selectedUser && !showBankDetails ? (
    <EditUser user={selectedUser as UserProfile} />
  ) : selectedUser && showBankDetails ? (
    <UserBankDetails
      bankDetails={selectedUser.userPaymentDetails as userBankDetails}
      userId={selectedUser.id}
    />
  ) : (
    <>
      <div className="creative-requests py-0">
        <div className="lg:grid flex grid-cols-4 lg:gap-[20px] gap-[10px] mb-[20px] w-full lg:overflow-x-visible overflow-x-auto overflow-y-hidden creator-dashboard p-0 lg:pb-0 pb-[4px]">
          <GradientCard>
            <CreatorStatsCard
              type={AdminDashboardBoxes.CreatorSignUps}
              value={`${creativeUsers?.length || 0}`}
            />
          </GradientCard>
          <GradientCard>
            <CreatorStatsCard
              type={AdminDashboardBoxes.ContentSubmissionsByCreators}
              value={`${creativeRequestsData?.length || 0}`}
            />
          </GradientCard>
          <GradientCard>
            <CreatorStatsCard
              type={AdminDashboardBoxes.ContentApprovals}
              value={`${getApprovedPercentage()}%`}
            />
          </GradientCard>
          <GradientCard>
            <CreatorStatsCard
              type={AdminDashboardBoxes.CurrentActiveCreative}
              value={`18`}
            />
          </GradientCard>
        </div>
        <section className="flex gap-4 mb-[20px]">
          <div className="brand-dashboard__item search-item search-input border rounded-[16px] h-[48px] px-[30px] border-[#F5F1E8]">
            <img
              className="brand-dashboard__item-search"
              alt=""
              src="/images/search.svg"
            />
            <input
              className="creatives-search bg-white"
              placeholder="Search"
              type="text"
              name="search creative request"
              onChange={(e) => searchRequest(e.target.value)}
            />
          </div>
        </section>
        <div className="flex flex-col admin-creatorUsers-content justify-between">
          {filteredData && creativeUsers ? (
            <div className="w-100 border border-[#F5F1E8] overflow-x-auto max-w-full rounded-[16px] py-[11px] min-h-[399px] bg-[#ffffff] h-[calc(100vh-259px)] overflow-y-auto">
              <div className="h-[calc(100vh-347px)]">
                <table className="creative-requests-table brand-table whitespace-nowrap">
                  <thead>
                    <tr className="">
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[5%] text-center">
                        Creators
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[18%]">
                        Name
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[27%]">
                        Email address
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-18%]">
                        Mobile number
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[18%]">
                        Last login date
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[18%]">
                        Bank details
                      </th>
                      <th className="pt-[9px] pb-[20px] text-center px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[5%]">
                        details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData?.map((data, index) => (
                      <tr
                        key={`${data?.id}-brandBrief--${index}`}
                        className="h-[50px] cursor-pointer"
                        onClick={() =>
                          navigate(`${AdminRoutes.Creators}?id=${data.id}`)
                        }
                      >
                        <td>
                          <div className="flex justify-center items-center">
                            <img
                              className="h-[26px] w-[27px] rounded-full object-cover"
                              src={
                                data.avatar
                                  ? `${data.avatar
                                  }?time=${new Date().getTime()}`
                                  : '/images/default-image.png'
                              }
                            />
                          </div>
                        </td>
                        <td className="text-[#3D636B] brand-table-descriptionc request-table-item  break-entry capitalized best-practice-headline w-[18%]">
                          {data?.name || ''}
                        </td>
                        <td
                          className={`text-[#3D636B] brand-table-description request-table-item break-entry best-practice-headline w-[27%]`}
                        >
                          {data.email ? data.email : 'Email is absent'}
                        </td>
                        <td className="text-[#3D636B]  brand-table-description request-table-item capitalized best-practice-headline w-18%]">
                          {data.phoneNumber
                            ? data.phoneNumber
                            : 'Phone number is absent'}
                        </td>
                        <td className="text-[#3D636B] brand-table-description request-table-item capitalized best-practice-headline w-[9%]">
                          {getDate(data?.lastLoginDate)}
                        </td>
                        <td
                          className="py-[9px] px-[24px] font-[400] text-[14px] cursor-pointer text-[#3D636B] h-[50px] w-[18%]"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `${AdminRoutes.Creators}?bankView=true&id=${data.id}`
                            );
                          }}
                        >
                          <div className="flex items-center">
                            <div
                              className={`${data.userPaymentDetails
                                ? 'text-white bg-[#1d1d1d] leading-[20px]'
                                : 'border-2 border-[#1d1d1d]'
                                }  flex justify-center rounded-[20px] h-[21px] px-[16px] w-fit font-[400] text-[12px]`}
                            >
                              {data.userPaymentDetails
                                ? 'Complete'
                                : 'In-complete'}
                            </div>
                          </div>
                        </td>
                        <td className="py-[9px] px-[24px] font-[400] text-[14px] cursor-pointer text-[#3D636B] h-[50px]">
                          <div className="flex justify-center items-center">
                            <img src="/images/item-details.svg" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="loader-content h-[calc(100vh-259px)]">
              <IconLoader />
            </div>
          )}
          <div className="w-full flex justify-center mt-5 text-secondary relative">
            <button
              className="disabled:text-[#f5a422] disabled:cursor-not-allowed text-primary px-2 cursor-pointer"
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage(currentPage - 1);
                  getPageData(currentPage - 1);
                }
              }}
            >
              &lt;
            </button>
            {pagination > 7 ? (
              <div
                className={`px-3 text-[14px]  cursor-pointer ${currentPage === 1
                  ? 'text-[#3D636B] bg-[#0a93961a] rounded-full w-[24px] h-[24px] flex justify-center items-center'
                  : 'text-[#cfcfcf]'
                  }`}
                onClick={() => {
                  setCurrentPage(1);
                  getPageData(1);
                }}
              >
                1
              </div>
            ) : null}

            {currentPage > THIRD_PAGE && pagination > SEVENTH_PAGE ? (
              <div>...</div>
            ) : null}
            {Array.from(
              Array(pagination > 7 ? pagination - 2 : pagination),
              (_, i) => (pagination > 7 ? i + 2 : i + 1)
            ).map((x) => {
              if (
                pagination > 7 &&
                (x < currentPage - 1 || x > currentPage + 1)
              )
                return;
              return (
                <div
                  className={`px-3 cursor-pointer leading-[25px] ${currentPage === x
                    ? 'text-[#3D636B] bg-[#0a93961a] rounded-full w-[24px] h-[24px] flex justify-center items-center'
                    : 'text-[#cfcfcf]'
                    }`}
                  key={x}
                  onClick={() => {
                    if (currentPage !== x) {
                      setCurrentPage(x);
                      getPageData(x);
                    }
                  }}
                >
                  {x}
                </div>
              );
            })}
            {pagination > 7 && currentPage < pagination - 2 ? (
              <div>...</div>
            ) : null}
            {pagination > 7 ? (
              <div
                className={`px-3 text-[14px] cursor-pointer leading-[25px] ${currentPage === pagination
                  ? 'text-[#3D636B] bg-[#0a93961a] rounded-full w-[24px] h-[24px] flex justify-center items-center'
                  : 'text-[#cfcfcf]'
                  }`}
                onClick={() => {
                  setCurrentPage(pagination);
                  getPageData(pagination);
                }}
              >
                {pagination}
              </div>
            ) : null}
            <button
              className="disabled:text-[#f5a422] disabled:cursor-not-allowed text-primary px-2 cursor-pointer"
              disabled={currentPage === pagination}
              onClick={() => {
                if (currentPage !== pagination) {
                  setCurrentPage(currentPage + 1);
                  getPageData(currentPage + 1);
                }
              }}
            >
              &gt;
            </button>
            <CSVLink
              data={getCSVdata()}
              headers={headers}
              filename={'creatorUsers-list.csv'}
              className="absolute right-0"
            >
              <span className="flex items-center">
                <img src="/images/download-csv.svg" />
                <h6 className="text-[14px] font-[600] w-[80px]">CSV Export</h6>
              </span>
            </CSVLink>
          </div>
          <Modal
            isOpen={showSuccessModal}
            handleClose={() => setShowSuccessModal(false)}
            type="brand"
            content="The creator of the creative request was successfully changed"
          />
          <Modal
            isOpen={showHasBankDetailsModal}
            handleClose={() => setShowHasBankDetailsModal(false)}
            type="brand"
            content="This user doesn't have bank details"
            actionLabel=""
            withOutLabel={true}
          />
        </div>
      </div>
    </>
  );
};

export default withAdmin(AdminCreativeUsers);

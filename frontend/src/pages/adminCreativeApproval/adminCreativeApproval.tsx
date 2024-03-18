import { ADMIN_STATUS, CREATIVE_STATUS, CreativeRequest, UpdateCreativeRequestInput } from 'API';
import { IconLoader } from 'components';
import AdminApprovalContent from 'components/adAdminApproval/Index';
import Modal from 'components/authentication/modal';
import { useRequestStatusSendEmail } from 'hooks/query/useEmail';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withAdmin } from 'state/admin';
import { AdminRoutes, UnknownType } from 'utils';
import './adminCreativeApproval.css';
import { UpdateCreativeRequest } from 'hooks';
interface Props {
  creativeRequestsData: CreativeRequest[];
  sortCreativeRequest: (sort: string) => void;
}

const THIRD_PAGE = 3;
const SEVENTH_PAGE = 7;

export const adminCreativeApproval: FC<Props> = ({
  creativeRequestsData,
}) => {
  const [filteredData, setFilteredData] = useState<CreativeRequest[]>([]);
  const [pagination, setPagination] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInspiration, setShowInspiration] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCreativeRequest, setSelectedCreatveRequest] =
    useState<CreativeRequest | null>(null);
  const [foundData, setFoundData] = useState<CreativeRequest[]>([]);
  const [limit] = useState(10);
  const { sendEmailData } = useRequestStatusSendEmail();
  const navigate = useNavigate();
  const getStatusColor = (status: string) => {
    switch (status) {
      case CREATIVE_STATUS.Approved:
        return 'text-white bg-[#1d1d1d] leading-[20px]';
      case CREATIVE_STATUS.Rejected:
        return 'border-2 border-[#1d1d1d] text-[#1d1d1d]';
      case CREATIVE_STATUS.Submitted:
        return 'text-white bg-[#1d1d1d] leading-[20px]';
      default:
        return 'text-white bg-[#1d1c1c80] leading-[20px]';
    }
  };

  useEffect(() => {
    if (creativeRequestsData) {
      const pagelength = Math.ceil(creativeRequestsData?.length / limit);
      setPagination(pagelength);
      if (currentPage === 1) {
        setFilteredData(creativeRequestsData?.slice(0, limit));
      } else {
        setFilteredData(
          creativeRequestsData?.slice(
            (currentPage - 1) * limit,
            limit * currentPage
          )
        );
      }
      searchCreativeRequest(searchText);
    }
  }, [creativeRequestsData, limit]);

  const { updateRequest } = UpdateCreativeRequest();


  const getPageData = (page) => {
    if (page === 1) {
      setFilteredData(
        foundData.length
          ? foundData?.slice(0, limit)
          : creativeRequestsData?.slice(0, limit)
      );
    } else {
      setFilteredData(
        foundData.length
          ? foundData?.slice((page - 1) * limit, limit * page)
          : creativeRequestsData?.slice((page - 1) * limit, limit * page)
      );
    }
  };

  const checkParam = () => {
    const url = new URL(window.location.href);
    return !!url.searchParams.get('content');
  };

  const selectRequest = (req: CreativeRequest) => {
    navigate(`${AdminRoutes.CreativeApproval}?content=true`);
    setSelectedCreatveRequest(req);
    setShowInspiration(true);
  };

  const updateCreativeRequestStatus = async (
    newStatus: ADMIN_STATUS,
    comment?: string
  ): Promise<void> => {
    try {
      if (selectedCreativeRequest) {
        setLoading(() => {
          return true;
        });
        const creativeRequest: UpdateCreativeRequestInput = { ...selectedCreativeRequest };
        delete creativeRequest['__typename'];
        delete creativeRequest['updatedAt'];
        delete creativeRequest['createdAt'];
        delete creativeRequest['approvedAds'];
        delete creativeRequest['creatorProfile'];
        // TODO: Make a global fix for these
        if (newStatus === ADMIN_STATUS.Rejected || newStatus === ADMIN_STATUS.Revision)
          creativeRequest.adminComment =
            comment && selectedCreativeRequest.adminComment?.length
              ? [...selectedCreativeRequest.adminComment, comment]
              : comment && !selectedCreativeRequest.adminComment?.length
                ? [comment]
                : selectedCreativeRequest.adminComment;

        await updateRequest({
          variables: {
            input: {
              ...creativeRequest,
              adminApproval: newStatus,
            }
          }
        });

        if (newStatus !== 'Approved') {
          await sendEmailData({
            variables: {
              creativeRequestUrl: `${process.env.REACT_APP_FRONTEND_BASE_URL}creatives?id=${creativeRequest.id}`,
              email: creativeRequest.email,
              name: creativeRequest.creatorProfile?.name,
              brandBriefName: creativeRequest.BriefName,
              creativeUniqueId: creativeRequest.uniqueId,
              emailType: newStatus.toUpperCase(),
              feedback: comment || '',
            },
          });
        }
        setLoading(() => {
          return false;
        });
        setCurrentPage(1);
        setShowSuccessModal(true);
      }
    } catch (error) {
      setLoading(() => {
        return false;
      });
      console.log(error);
    }
  };

  const searchCreativeRequest = (text: string) => {
    setSearchText(text);
    setCurrentPage(1);
    if (!text.trim()) {
      setFoundData([]);
      const pagelength = Math.ceil(creativeRequestsData?.length / limit);
      setPagination(pagelength);
      if (currentPage === 1) {
        setFilteredData(creativeRequestsData?.slice(0, limit));
      } else {
        setFilteredData(
          creativeRequestsData?.slice(
            (currentPage - 1) * limit,
            limit * currentPage
          )
        );
      }
    } else {
      const filterData: CreativeRequest[] = [];
      for (const data of creativeRequestsData) {
        const requestStatus = data.adminApproval || 'Submitted';
        if (
          (data.creatorName &&
            data.creatorName.toLowerCase().includes(text.toLowerCase())) ||
          (data.createdAt &&
            String(
              new Date(data?.createdAt || '').toLocaleString().split(',')[0]
            ).includes(text.toLowerCase())) ||
          (data.BriefName &&
            data.BriefName.toLowerCase().includes(text.toLowerCase())) ||
          (data.brandName &&
            data.brandName.toLowerCase().includes(text.toLowerCase())) ||
          (data.email &&
            data.email.toLowerCase().includes(text.toLowerCase())) ||
          (data.uniqueId &&
            data.uniqueId.toLowerCase().includes(text.toLowerCase())) ||
          requestStatus.toLowerCase().includes(text.toLowerCase())
        ) {
          filterData.push(data);
        }
      }
      setFoundData(filterData);
      const pagelength = Math.ceil(filterData?.length / limit);
      setPagination(pagelength);
      setFilteredData(filterData?.slice(0, limit));
    }
  };

  if (showInspiration && checkParam())
    return (
      <>
        <AdminApprovalContent
          videoUrl={selectedCreativeRequest?.tiktokCreativeUrl || ''}
          onClose={(): void => setShowInspiration(false)}
          request={selectedCreativeRequest}
          createAdPayload={{}}
          updateCreativeRequestStatus={updateCreativeRequestStatus}
          type="Admin"
          reqLoading={loading}
        />
        <Modal
          isOpen={showSuccessModal}
          handleClose={() => {
            setShowInspiration(false);
            setShowSuccessModal(false);
          }}
          type="brand"
          content="The Status of the creative request was successfully changed"
        />
      </>
    );

  return (
    <div className="">
      <div className="md:col-span-2">
        <div className="md:flex items-center mb-4">
          <section className="flex gap-4 w-full">
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
                onChange={(e) => {
                  searchCreativeRequest(e.target.value);
                }}
              />
            </div>
          </section>
        </div>
        <div className="overflow-x-auto max-w-full">
          <div className="grid h-[auto]">
            {filteredData && creativeRequestsData ? (
              <div className="w-100 border border-[#F5F1E8] overflow-x-auto max-w-full rounded-[16px] py-[11px] xl:min-h-[calc(100vh-105px)] min-h-[calc(100vh-247px)] flex flex-col justify-between bg-[#ffffff] h-[auto]">
                <table className="brand-table whitespace-nowrap">
                  <thead>
                    <tr className="text-center">
                      <th className="pt-[9px] text-center pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[10%]">
                        Creators
                      </th>
                      <th className="pt-[9px] pb-[20px] pr-[24px] px-0 text-[#0E0D0D] head-text text-left font-[700] text-[16px] uppercase w-[10%]">
                        Date of Submission
                      </th>
                      <th className="pt-[9px] pb-[20px] px-0 text-[#0E0D0D] head-text text-left font-[700] text-[16px] uppercase w-[10%]">
                        Creative ID
                      </th>
                      <th className="pt-[9px] pb-[20px] text-left px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[10%]">
                        Brand Name
                      </th>
                      <th className="pt-[9px] pb-[20px] text-left px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[100px]">
                        Activation Name
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text text-left font-[700] text-[16px] uppercase w-[10%]">
                        Creator Name
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-left text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[10%]">
                        Creator Email
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-left text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[10%]">
                        Admin approval status
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-left text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[10%]">
                        Brand approval status
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text text-center font-[700] text-[16px] uppercase w-[10%]">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&>*:nth-child(even)]:bg-[#F5F1E8]">
                    {filteredData?.map((data, index) => (
                      <tr
                        key={`${data?.id}-brandBrief--${index}`}
                        className="text-[#fff] cursor-pointer"
                        onClick={() => selectRequest(data)}
                        data-cy="creative-requests"
                      >
                        <td className="approved-table-item py-[12px] break-entry best-practice-headline w-[10%]">
                          <div className="flex items-center justify-center">
                            <img
                              className="h-[26px] w-[27px] rounded-full object-cover"
                              //  TODO: FIX
                              src={'/images/default-image.png'
                                // data.userProfileImageUrl
                                //   ? `${data.userProfileImageUrl
                                //   }?time=${new Date().getTime()}`
                                // : '/images/default-image.png'
                              }
                            />
                          </div>
                        </td>
                        <td className="approved-table-item px-0 break-entry best-practice-headline w-[15%]">
                          {
                            new Date(data?.createdAt || '')
                              .toLocaleString()
                              .split(',')[0]
                          }
                        </td>
                        <td className="approved-table-item px-0 break-entry best-practice-headline h-[44px] w-[10%]">
                          <div className="flex items-center">
                            <span>{data?.uniqueId}</span>
                          </div>
                        </td>
                        <td className="approved-table-item break-entry best-practice-headline w-[10%]">
                          {data?.brandName}
                        </td>
                        <td className="approved-table-item best-practice-headline w-[100px]">
                          <div className="ellipsis 2xl:w-[170px] w-[130px] whitespace-nowrap inline-block">
                            {data?.BriefName}
                          </div>
                        </td>
                        <td className="approved-table-item break-entry best-practice-headline w-[10%]">
                          {data?.creatorName}
                        </td>
                        <td className="approved-table-item break-entry best-practice-headline w-[15%]">
                          {data?.email}
                        </td>
                        <td
                          className={`approved-table-item break-entry capitalized best-practice-headline font-[700] w-[10%] `}
                        >
                          <div
                            className={`flex justify-center rounded-[20px] h-[21px] px-[16px] w-fit font-[400] text-[12px] ${getStatusColor(
                              data.adminApproval || 'Submitted'
                            )}`}
                          >
                            {data.adminApproval || 'Submitted'}
                          </div>
                        </td>
                        <td
                          className={`approved-table-item break-entry capitalized best-practice-headline font-[700] w-[10%] `}
                        >
                          <div
                            className={`flex justify-center rounded-[20px] h-[21px] px-[16px] w-fit font-[400] text-[12px] ${getStatusColor(
                              data.status
                            )}`}
                          >
                            {data.status}
                          </div>
                        </td>

                        <td className="w-[10%]">
                          <div className="flex justify-center items-center">
                            <img src="/images/item-details.svg" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="w-full flex justify-center mt-5 text-secondary">
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
                </div>
              </div>
            ) : (
              <div className="w-100 border border-[#F5F1E8] overflow-x-auto max-w-full rounded-[16px] py-[11px] min-h-[576px] bg-[#ffffff] h-[auto]">
                <div className="loader-content min-h-[576px]">
                  <IconLoader />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAdmin(adminCreativeApproval);

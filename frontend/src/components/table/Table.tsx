import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { CREATIVE_STATUS } from 'API';
import { IconLoader } from 'components/loader';
import { verticalOptions } from 'hooks/utils';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UnknownType } from 'utils';
import ISOCodeCountry from 'utils/constants/ISOCodeCountry';
export type Tdata = {
  id?: string;
  name?: string | null;
  brandBriefs?: string | null;
  creatorName?: string | null;
  creativeTiktokHandle?: string | null;
  tiktokCreativeUrl?: string | null;
  creativeLink?: string | null;
  adminApproval?: string | null;
  brand?: string | null;
  objective?: string | null;
  img?: string | null;
  vertical?: string | null;
  earningsCurrent?: string | null;
  created?: string | null;
  creatorhandle?: string | null;
  EarningsLifetime?: string | null;
  country?: string | null;
  adminApprovalStatus?: string | null;
  brandApprovalStatus?: string | null;
  activationName?: string | null;
  brandName?: string | null;
  creatorHandle?: string | null;
  creativeId?: string | null;
  briefName?: string | null;
  status?: string | null;
  linkedTikTokCampaign?: string | null;
  details?: string | null;
  dateOfSubmission?: string | null;
  transactions?: string;
  numberOfTransactions?: string;
  totalAmount?: string;
  transactionDate?: string;
};

type TTable = {
  data: Tdata[] | null;
  rows: string[];
  pagination: number;
  onRowClick?: (brief: UnknownType) => void;
  onEditClick?: (brief: UnknownType) => void;
  onTransationClick?: (date: UnknownType) => void;
  changePage?: (type: string, page: number, limit: number) => Promise<void>;
  mainlyData?: Tdata[];
  colHeight?: number;
  loading?: boolean;
  height?: string;
  firstRowName?: string;
  rowWidth?: string;
  dataCy?: string;
  extended?: boolean;
  extendedURL?: string;
  borderColor?: string;
  creatorUser?: boolean;
  hasSearchBar?: boolean;
  tableCurrentPage?: number;
  header?: {
    title: string;
    icon: string;
    search: boolean;
  };
  pageSize?: number;
};

type TDropDown = { id: string | undefined; dropDown: boolean };

const Table: FC<TTable> = ({
  data,
  rows,
  onRowClick,
  onTransationClick,
  onEditClick,
  changePage,
  mainlyData,
  pagination,
  loading,
  dataCy,
  rowWidth,
  extended = true,
  extendedURL,
  header,
  height = 'big',
  creatorUser = true,
  hasSearchBar = false,
  firstRowName,
  pageSize = 10,
  tableCurrentPage = 1,
}) => {
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(tableCurrentPage);
  const [showCurrentDetails, setShowCurrentDetails] = useState<TDropDown[]>([]);
  const MAX_PAGE_LENGTH_FOR_SHOWING = 7;
  const navigate = useNavigate();
  useEffect(() => {
    if (data && !showCurrentDetails.length) {
      const dropDownData: TDropDown[] = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i]?.id) {
          dropDownData.push({
            id: data[i]?.id,
            dropDown: i !== 0 ? false : true,
          });
        }
        setShowCurrentDetails(dropDownData);
      }
    }
  }, [data]);

  const toggleDropdown = (id: string | undefined) => {
    const updatedData = showCurrentDetails?.map((item) =>
      item.id === id ? { ...item, dropDown: !item.dropDown } : item
    );
    setShowCurrentDetails(() => {
      return updatedData;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case CREATIVE_STATUS.Approved:
        return 'text-white bg-[#1d1d1d]';
      case CREATIVE_STATUS.Rejected:
        return 'text-[#1d1d1d] border border-[#1d1d1d] bg-[transparent]';
      case CREATIVE_STATUS.Submitted:
        return 'text-[#fff] border border-[#1d1d1d] bg-[#1d1d1d]';
      case CREATIVE_STATUS.New:
        return 'text-[#1d1d1d] border border-[#1d1d1d] bg-[transparent]';
      case 'Active':
        return 'text-white bg-[#1d1d1d]';
      case 'In-active':
        return 'text-[#1d1d1d] border border-[#1d1d1d] bg-[transparent]';
      case 'Revision':
        return 'text-white bg-[#1d1c1c80] leading-[20px]';
    }
  };

  useEffect(() => {
    if (pagination && !totalPage) setTotalPage(pagination);
  }, [pagination]);

  return (
    <div className="md:grid grid-cols-1 relative">
      <div
        className={`${!extended ? 'sm:mb-0 mb-[20px]' : ''
          } flex items-center justify-between`}
      >
        <h6
          className={`text-[#0E0D0D] head-text font-[700] text-[14px] uppercase ${!extended ? 'sm:hidden block' : 'hidden'
            }`}
        >
          {firstRowName}
        </h6>
        {extendedURL ? (
          <div
            onClick={() => navigate(extendedURL)}
            className={`sm:absolute bottom-[14px] right-[31px] head-text uppercase font-[600] text-[14px] cursor-pointer ${creatorUser ? 'text-[#FF872F]' : 'text-[#00b1b5]'
              }`}
          >
            view all
          </div>
        ) : null}
      </div>
      <div
        className={`${extended ? 'lg:flex hidden pb-[14px]' : 'flex'} ${loading && !data ? 'justify-between' : 'justify-between'
          } flex-col border border-[#F5F1E8] overflow-x-auto max-w-full rounded-[16px] ${header?.title ? 'pt-0' : 'pt-[22px]'
          } pb-[14px] ${height === 'big'
            ? `${extended && !hasSearchBar
              ? 'xl:min-h-[calc(100vh-41px)] min-h-[calc(100vh-183px)]'
              : extended && hasSearchBar
                ? 'xl:min-h-[calc(100vh-96px)]  min-h-[calc(100vh-239px)]'
                : 'min-h-358'
            } max-h-[100vh]`
            : 'min-h-[200px] max-h-[315px]'
          } bg-[#ffffff]`}
      >
        {!loading ? (
          <div
            className={`${!extended
              ? `${data?.length && data.length > 5 ? 'h-[285px]' : 'h-[295px]'
              } overflow-auto`
              : ''
              } w-100`}
          >
            {header?.title ? (
              <div className="mt-[32px] mb-[22px] flex justify-between items-center">
                <div className="flex items-center ">
                  {header?.icon && (
                    <img
                      src={header?.icon}
                      className="sm:ml-[28px] ml-[10px] mr-[14px] cursor-auto"
                    />
                  )}

                  <h6
                    className={`text-[#0E0D0D] head-text font-[700] sm:text-[16px] text-[14px] uppercase leading-[1px] ${!header.icon ? 'ml-[28px]' : ''
                      }`}
                  >
                    {header?.title}
                  </h6>
                </div>
                {!extended && (
                  <Link
                    className="sm:mr-[24px] mr-[10px]"
                    to={extendedURL ? extendedURL : ''}
                  >
                    <img src="images/item-search.svg" alt="" />
                  </Link>
                )}
              </div>
            ) : null}

            <table className=" whitespace-nowrap">
              <thead>
                <tr
                  className={`${firstRowName === 'BRAND BRIEFS'
                    ? ''
                    : rows.includes('')
                      ? 'sm:[&>*:nth-child(3)]:table-cell [&>*:nth-child(3)]:hidden'
                      : 'sm:[&>*:nth-child(2)]:table-cell [&>*:nth-child(2)]:hidden'
                    }`}
                >
                  {rows.map((row, index) => {
                    return (
                      <th
                        className={`pb-[20px]
                        ${index === 0 && rows.includes('') && !extended
                            ? 'text-center'
                            : ''
                          } 
                        ${extended && rows.includes('') && index === 0
                            ? 'pl-[28px] pr-[20px] '
                            : extended &&
                              firstRowName === 'BRAND BRIEFS' &&
                              row !== 'objective' &&
                              row !== 'status'
                              ? 'pl-[28px]'
                              : ''
                          }
                        ${row === 'details' &&
                            index === rows.length - 1 &&
                            firstRowName !== 'creator'
                            ? '2xl:px-[30px] sm:px-[10px] px-[2px]'
                            : row === 'details'
                              ? 'px-[10px]'
                              : !rows.includes('')
                                ? 'pb-[20px] sm:px-[28px] px-[10px]'
                                : rows.includes('') &&
                                  !extended &&
                                  (firstRowName === 'BRAND BRIEFS' ||
                                    firstRowName === 'BRAND' ||
                                    firstRowName === 'creator') &&
                                  index === 0
                                  ? 'xl:px-[30px] sm:pr-[20px] sm:pl-[28px] px-[4px]'
                                  : rows.includes('') && !extended
                                    ? '2xl:px-[30px] xl:px-[16px] px-[4px]'
                                    : firstRowName === 'BRAND' &&
                                      (row === 'status' || row === 'objective')
                                      ? 'px-[4px]'
                                      : (firstRowName === 'BRAND' ||
                                        (firstRowName === 'creator' &&
                                          row !== 'status')) &&
                                        extended
                                        ? 'px-[28px]'
                                        : 'px-[4px]'
                          } ${row === 'details' || row === 'edit'
                            ? 'text-center w-[80px]'
                            : row === 'created'
                              ? 'w-[130px]'
                              : row.includes('ApprovalStatus')
                                ? 'w-[200px]'
                                : row === 'name'
                                  ? 'text-left '
                                  : ''
                          }${row === 'linkedTikTokCampaign' ||
                            row === 'objective' ||
                            row === 'name'
                            ? 'text-left'
                            : rows.find((row) => row === 'edit') ||
                              row === 'status'
                              ? 'text-left'
                              : ''
                          }`}
                        key={'ss' + index}
                      >
                        <span
                          className={`text-[#0E0D0D] ${!extended && rows.includes('') && index === 1
                            ? 'sm:table-caption hidden'
                            : ''
                            } ${!extended && rows.includes('') && index === 0
                              ? 'sm:table-caption hidden'
                              : ''
                            } head-text font-[700] text-[14px] h-[19px] leading-[19px] uppercase`}
                        >
                          {row !== ''
                            ? row
                              .match(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g)
                              ?.join(' ')
                            : firstRowName}
                        </span>
                        {!extended && rows.includes('') && index === 0 ? (
                          <span
                            className={`text-[#0E0D0D] sm:hidden head-text font-[700] text-[14px] h-[19px] leading-[19px] uppercase`}
                          >
                            {firstRowName?.split(' ')[0]}
                          </span>
                        ) : null}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              {data?.length ? (
                <tbody className="[&>*:nth-child(even)]:bg-[#F5F1E8]">
                  {data?.map((item, index) => (
                    <tr
                      className={`
                      ${firstRowName === 'BRAND BRIEFS'
                          ? ''
                          : rows.includes('')
                            ? 'sm:[&>*:nth-child(3)]:table-cell [&>*:nth-child(3)]:hidden'
                            : 'sm:[&>*:nth-child(2)]:table-cell [&>*:nth-child(2)]:hidden'
                        }
                      h-[50px] whitespace-nowrap border-transparent`}
                      data-cy={`${dataCy}`}
                      key={`tr-${index}`}
                      onClick={() =>
                        onRowClick
                          ? onRowClick(
                            mainlyData?.find((brief) => {
                              return brief.id === item?.id;
                            })
                          )
                          : onTransationClick &&
                          onTransationClick(item?.transactionDate)
                      }
                    >
                      {rows.map((row, index) => {
                        return (
                          <td
                            className={`${row === ''
                              ? 'sm:pl-[28px] pl-[10px] sm:pr-[20px] pr-[10px] 2xl:w-[41px] sm:w-[41px] w-[41px] 2xl:h-[41px] sm:h-[41px] h-[41px] '
                              : ''
                              } font-[400] sm:text-[14px] text-[12px] cursor-pointer text-[#0E0D0D] ${row === 'name' && extended
                                ? 'flex justify-start items-center px-[4px] h-[50px]'
                                : ''
                              } ${row === 'objective' &&
                                extended &&
                                !rows.includes('')
                                ? ''
                                : row === 'objective' && extended
                                  ? 'px-[4px]'
                                  : ''
                              } ${extended && !rows.includes('') && row === 'status'
                                ? 'px-[28px]'
                                : row === 'status' && extended
                                  ? 'pr-[28px] pl-[4px]'
                                  : extended && row === 'linkedTikTokCampaign'
                                    ? 'px-[4px]'
                                    : extended && row !== 'linkedTikTokCampaign'
                                      ? 'px-[28px]'
                                      : !rows.includes('')
                                        ? 'md:px-[28px] sm:px-[28px] px-[10px]'
                                        : '2xl:px-[30px] xl:px-[16px] px-[4px]'
                              } `}
                            key={`td-${index} `}
                          >
                            {row === 'details' ? (
                              <div className="m-auto flex justify-center items-center w-[24px]">
                                <img src="/images/item-details.svg" />
                              </div>
                            ) : row === 'edit' ? (
                              <div
                                className="m-auto flex w-full justify-center items-center"
                                data-cy="edit-action"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditClick &&
                                    onEditClick(
                                      mainlyData?.find((brief) => {
                                        return brief.id === item?.id;
                                      })
                                    );
                                }}
                              >
                                <img src="/images/list-edit.svg" />
                              </div>
                            ) : row === 'addEarnings' ? (
                              <div
                                className="m-auto flex w-full justify-center items-center"
                              >
                                <img
                                  src="/images/square-plus.png"
                                  className="w-[16px] h-[16px]"
                                />
                              </div>
                            ) : row === 'objective' ? (
                              <div
                                className={`flex items-center ${extended && rows.includes('')
                                  ? 'flex justify-start'
                                  : ''
                                  }`}
                              >
                                <img
                                  src="/images/list-tip2.svg"
                                  className="pr-[8px] text-[12px]"
                                />
                                <p>{item[row]}</p>
                              </div>
                            ) : row.toLocaleLowerCase()?.includes('status') ? (
                              <div
                                className={`flex justify-center rounded-[20px] py-[5px] sm:px-[16px] px-[10px] ${getStatusColor(
                                  item[row]
                                )} w-fit font-[400] sm:text-[12px] text-[10px]`}
                              >
                                {item[row]}
                              </div>
                            ) : item['img'] && !row ? (
                              <div className="bg-[#fff] sm:border-none border-2 border-[#000] sm:p-[2px] p-[1px] m-auto rounded-full 2xl:w-[30px] sm:w-[30px] w-[30px] 2xl:h-[30px] sm:h-[30px] h-[30px]">
                                <img
                                  src={item['img']}
                                  alt=""
                                  className="sm:h-[26px] h-[24px] w-[27px] rounded-full object-cover"
                                />
                              </div>
                            ) : (
                              <div
                                className={`${row === 'vertical'
                                  ? 'ellipsis'
                                  : row === 'linkedTikTokCampaign'
                                    ? `ellipsis 2xl:w-full w-[200px] ${item['linkedTikTokCampaign']?.includes(
                                      'creative/'
                                    ) ||
                                      item['linkedTikTokCampaign']?.includes(
                                        'google'
                                      )
                                      ? ''
                                      : 'block'
                                    }`
                                    : 'ellipsis w-full'
                                  }
                                 `}
                              >
                                {row === 'vertical'
                                  ? verticalOptions?.find(
                                    (vertical) => vertical.value === item[row]
                                  )?.text
                                  : row === 'country'
                                    ? ISOCodeCountry?.find(
                                      (vertical) => vertical.code === item[row]
                                    )?.name
                                    : item[row]}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td
                      className={`text-center ${extended
                        ? 'h-[600px]'
                        : height === 'big'
                          ? '2xl:h-[250px] h-[207px]'
                          : 'h-[167px]'
                        } text-gray-500`}
                      colSpan={rows.length}
                    >
                      No Data
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        ) : (
          <div
            className={`loader-content ${height === 'small'
              ? 'h-[360px]'
              : `h-${(totalPage > 1 || loading) && !hasSearchBar
                ? 795
                : (totalPage > 1 || loading) && hasSearchBar
                  ? 'loader'
                  : 346
              }`
              }`}
          >
            <IconLoader />
          </div>
        )}
        {totalPage > 1 || !loading ? (
          <div
            className={`w-full flex justify-center ${extended ? 'mb-[10px] mt-[17px]' : ''
              } text-secondary`}
          >
            {totalPage > 1 ? (
              <button
                className="disabled:text-[#cfcfcf] disabled:cursor-not-allowed text-[#3D636B] px-2 cursor-pointer"
                disabled={currentPage === 1}
                onClick={() => {
                  if (currentPage !== 1 && changePage) {
                    setCurrentPage(currentPage - 1);
                    changePage('creativeRequest', currentPage - 1, pageSize);
                  }
                }}
              >
                &lt;
              </button>
            ) : null}

            {totalPage > MAX_PAGE_LENGTH_FOR_SHOWING ? (
              <div
                className={`px-3 text-[14px]  cursor-pointer ${currentPage === 1
                  ? 'text-[#3D636B] bg-[#0a93961a] rounded-full w-[24px] h-[24px] flex justify-center items-center'
                  : 'text-[#cfcfcf]'
                  }`}
                onClick={() => {
                  if (changePage) {
                    setCurrentPage(1);
                    changePage('creativeRequest', 1, pageSize);
                  }
                }}
              >
                1
              </div>
            ) : null}

            {currentPage > 3 && totalPage > MAX_PAGE_LENGTH_FOR_SHOWING ? (
              <div>...</div>
            ) : null}
            {totalPage > 1
              ? Array.from(
                Array(
                  totalPage > MAX_PAGE_LENGTH_FOR_SHOWING
                    ? totalPage - 2
                    : totalPage
                ),
                (_, i) =>
                  totalPage > MAX_PAGE_LENGTH_FOR_SHOWING ? i + 2 : i + 1
              ).map((x) => {
                if (
                  totalPage > MAX_PAGE_LENGTH_FOR_SHOWING &&
                  (x < currentPage - 1 || x > currentPage + 1)
                )
                  return null;
                return (
                  <div
                    className={`px-3 text-[14px]  cursor-pointer ${currentPage === x
                      ? 'text-[#3D636B] bg-[#0a93961a] rounded-full w-[24px] h-[24px] flex justify-center items-center'
                      : 'text-[#cfcfcf]'
                      }`}
                    key={x}
                    onClick={() => {
                      if (currentPage !== x && changePage) {
                        setCurrentPage(x);
                        changePage('creativeRequest', x, pageSize);
                      }
                    }}
                  >
                    {x}
                  </div>
                );
              })
              : null}
            {totalPage > MAX_PAGE_LENGTH_FOR_SHOWING &&
              currentPage < totalPage - 2 ? (
              <div>...</div>
            ) : null}
            {totalPage > MAX_PAGE_LENGTH_FOR_SHOWING ? (
              <div
                className={`px-3 text-[14px]  cursor-pointer ${currentPage === totalPage
                  ? 'text-[#3D636B] bg-[#0a93961a] rounded-full w-[24px] h-[24px] flex justify-center items-center'
                  : 'text-[#cfcfcf]'
                  }`}
                onClick={() => {
                  if (changePage) {
                    setCurrentPage(totalPage);
                    changePage('creativeRequest', totalPage, pageSize);
                  }
                }}
              >
                {totalPage}
              </div>
            ) : null}
            {totalPage > 1 ? (
              <button
                className="disabled:text-[#cfcfcf] disabled:cursor-not-allowed text-[#3D636B] px-2 cursor-pointer"
                disabled={currentPage === pagination}
                onClick={() => {
                  if (currentPage !== pagination && changePage) {
                    setCurrentPage(currentPage + 1);
                    changePage('creativeRequest', currentPage + 1, pageSize);
                  }
                }}
              >
                &gt;
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      <div
        className={`${extended
          ? `lg:hidden lg:bg-[#ffffff] bg-transparent rounded-[16px] ${hasSearchBar
            ? 'md:min-h-[calc(100vh-240px)] min-h-[calc(100vh-291px)]'
            : 'min-h-[calc(100vh-183px)]'
          } max-h-auto flex flex-col justify-between `
          : 'hidden'
          }`}
      >
        {!loading ? (
          <>
            {data?.length ? (
              <div>
                {data.map((item, index) => {
                  return (
                    <div
                      key={'xx' + index}
                      className={`border border-black transition-height duration-500 overflow-hidden ${showCurrentDetails[index]?.dropDown
                        ? `max-h-[400px]`
                        : 'max-h-[50px]'
                        }${data?.length === 1
                          ? ' rounded-[16px]'
                          : index === 0
                            ? ' rounded-t-[16px]'
                            : index === data?.length - 1
                              ? ' rounded-b-[16px]'
                              : ''
                        }`}
                    >
                      {rows.map((row, rowIndex) => {
                        return (
                          <div
                            className={`flex items-center h-[50px] px-[10px] cursor-pointer bg-white`}
                            key={`${Math.random()}`}
                            onClick={() => {
                              toggleDropdown(showCurrentDetails[index]?.id);
                            }}
                          >
                            {rowIndex === 0 ? (
                              <div className={`sm:w-[48px] w-[40px]`}>
                                <div className="border rounded-full border-black bg-black mr-[40px] w-[27px]">
                                  <ChevronLeftIcon
                                    className={`text-white w-[25px] transition-transform duration-500 ${!showCurrentDetails[index]?.dropDown
                                      ? '-rotate-90'
                                      : 'rotate-90'
                                      }`}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="w-[30px] sm:mr-[23px] mr-[16px]"></div>
                            )}
                            {row === '' ? (
                              <div
                                className={`${item['brandName'] ? 'flex items-center' : ''
                                  }`}
                              >
                                <img
                                  src={
                                    item['img']
                                      ? item['img']
                                      : 'h-[37px] w-[37px]'
                                  }
                                  className={`h-[37px] ${showCurrentDetails[index]?.dropDown
                                    ? 'w-[39px]'
                                    : 'w-[37px]'
                                    } rounded-full object-cover`}
                                  alt=""
                                />
                                {item['creatorName'] ||
                                  firstRowName === 'BRAND' ||
                                  header?.title === 'Brand Briefs' ||
                                  (item['brandName'] &&
                                    !showCurrentDetails[index]?.dropDown) ? (
                                  <div className="w-[173px] text-[#0E0D0D] head-text font-[700] text-[16px] ml-[10px]">
                                    {item['creatorName'] || item['brandName']}
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                            {row ? (
                              <div
                                className={`${rowWidth ? rowWidth : 'sm:w-[150px] w-[109px]'
                                  } head-text font-bold uppercase ${row.includes('Approval')
                                    ? 'text-[12px] w-[10rem]'
                                    : row === 'linkedTikTokCampaign'
                                      ? 'text-[12px] w-[7rem]'
                                      : 'text-[14px]'
                                  }`}
                              >
                                {row !== null
                                  ? row
                                    .match(
                                      /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g
                                    )
                                    ?.join(' ')
                                  : ''}
                              </div>
                            ) : null}

                            <div
                              className={`font-[400] ellipsis w-[calc(100%-60px)] whitespace-nowrap block ${row === 'details' ? 'flex justify-start' : ''
                                } cursor-pointer text-[#3D636B]`}
                            >
                              {row === 'details' ? (
                                <div
                                  className="flex items-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onRowClick &&
                                      onRowClick(
                                        mainlyData?.find((brief) => {
                                          return brief.id === item?.id;
                                        })
                                      );
                                  }}
                                >
                                  <img src="/images/item-details.svg" />
                                  <div className="ml-[5px]">View</div>
                                </div>
                              ) : row === 'edit' ? (
                                <img
                                  src="/images/list-edit.svg"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEditClick &&
                                      onEditClick(
                                        mainlyData?.find(
                                          (brief) => brief.id === item?.id
                                        )
                                      );
                                  }}
                                />
                              ) : row === 'addEarnings' ? (
                                <div>+</div>
                              ) : row === 'objective' ? (
                                <div className="flex items-center">
                                  <img
                                    src="/images/list-tip2.svg"
                                    className="pr-[8px] text-[12px]"
                                  />
                                  <p className="ellipsis w-[calc(100%-60px)] whitespace-nowrap block">
                                    {item[row]}
                                  </p>
                                </div>
                              ) : row === 'country' ? (
                                <p className="ellipsis w-[calc(100%-60px)] whitespace-nowrap block">
                                  {
                                    ISOCodeCountry?.find(
                                      (vertical) => vertical.code === item[row]
                                    )?.name
                                  }
                                </p>
                              ) : row
                                .toLocaleLowerCase()
                                ?.includes('status') ? (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onRowClick &&
                                      item[row].toLocaleLowerCase() ===
                                      'revision' &&
                                      onRowClick(
                                        mainlyData?.find(
                                          (brief) => brief.id === item?.id
                                        )
                                      );
                                  }}
                                  className={`flex justify-center h-[30px] text-[12px] rounded-[20px] py-[5px] px-[16px] ${getStatusColor(
                                    item[row]
                                  )} font-bold w-fit`}
                                >
                                  {item[row]}
                                </div>
                              ) : (
                                <div className="ellipsis  w-[calc(100%-60px)] whitespace-nowrap block">
                                  {item[row]}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border border-[#F5F1E8] h-[350px] rounded-[16px] flex justify-center items-center">
                No Data
              </div>
            )}
          </>
        ) : (
          <div
            className={`loader-content ${hasSearchBar
              ? 'sm:h-[calc(100vh-291px)] h-[calc(100vh-342px)]'
              : 'h-[calc(100vh-250px)]'
              } ${height === 'small' ? 'h-[220px]' : ''}`}
          >
            <IconLoader />
          </div>
        )}
        {totalPage !== 0 && (
          <div className="w-full flex justify-center mb-[10px] mt-[17px] text-secondary">
            <button
              className="disabled:text-[#cfcfcf] disabled:cursor-not-allowed text-[#3D636B] px-2 cursor-pointer"
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage !== 1 && changePage) {
                  setCurrentPage(currentPage - 1);
                  changePage('creativeRequest', currentPage - 1, pageSize);
                }
              }}
            >
              &lt;
            </button>
            {totalPage > MAX_PAGE_LENGTH_FOR_SHOWING ? (
              <div
                className={`px-3 text-[14px]  cursor-pointer ${currentPage === 1
                  ? 'text-[#3D636B] bg-[#0a93961a] rounded-full w-[24px] h-[24px] flex justify-center items-center'
                  : 'text-[#cfcfcf]'
                  }`}
                onClick={() => {
                  if (changePage) {
                    setCurrentPage(1);
                    changePage('creativeRequest', 1, pageSize);
                  }
                }}
              >
                1
              </div>
            ) : null}

            {currentPage > 3 && totalPage > MAX_PAGE_LENGTH_FOR_SHOWING ? (
              <div>...</div>
            ) : null}

            {Array.from(
              Array(
                totalPage > MAX_PAGE_LENGTH_FOR_SHOWING
                  ? totalPage - 2
                  : totalPage
              ),
              (_, i) =>
                totalPage > MAX_PAGE_LENGTH_FOR_SHOWING ? i + 2 : i + 1
            ).map((x) => {
              if (
                totalPage > MAX_PAGE_LENGTH_FOR_SHOWING &&
                (x < currentPage - 1 || x > currentPage + 1)
              )
                return null;
              return (
                <div
                  className={`px-3 text-[14px]  cursor-pointer ${currentPage === x
                    ? 'text-[#3D636B] bg-[#0a93961a] rounded-full w-[24px] h-[24px] flex justify-center items-center'
                    : 'text-[#cfcfcf]'
                    }`}
                  key={x}
                  onClick={() => {
                    if (currentPage !== x && changePage) {
                      setCurrentPage(x);
                      changePage('creativeRequest', x, pageSize);
                    }
                  }}
                >
                  {x}
                </div>
              );
            })}
            {totalPage > MAX_PAGE_LENGTH_FOR_SHOWING &&
              currentPage < totalPage - 2 ? (
              <div>...</div>
            ) : null}
            {totalPage > MAX_PAGE_LENGTH_FOR_SHOWING ? (
              <div
                className={`px-3 text-[14px]  cursor-pointer ${currentPage === totalPage
                  ? 'text-[#3D636B] bg-[#0a93961a] rounded-full w-[24px] h-[24px] flex justify-center items-center'
                  : 'text-[#cfcfcf]'
                  }`}
                onClick={() => {
                  if (changePage) {
                    setCurrentPage(totalPage);
                    changePage('creativeRequest', totalPage, pageSize);
                  }
                }}
              >
                {totalPage}
              </div>
            ) : null}

            <button
              className="disabled:text-[#cfcfcf] disabled:cursor-not-allowed text-[#3D636B] px-2 cursor-pointer"
              disabled={currentPage === pagination}
              onClick={() => {
                if (currentPage !== pagination && changePage) {
                  setCurrentPage(currentPage + 1);
                  changePage('creativeRequest', currentPage + 1, pageSize);
                }
              }}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;

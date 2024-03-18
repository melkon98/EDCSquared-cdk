import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { CREATIVE_STATUS, UpdateCreativeRequestInput } from 'API';
import { API, Auth } from 'aws-amplify';
import { IconLoader } from 'components';
import Modal from 'components/authentication/modal';
import { useEffect, useState } from 'react';
import { withAdmin } from 'state/admin';
import './adminCreativeRequests.css';

type OptionType = {
  name: string;
  id: string;
};

type CreativeRequest = {
  brandBriefId?: string | null;
  creatorId?: string | null;
  BriefName?: string | null;
  status?: string | null;
  tiktokCreativeUrl?: string | null;
  tiktokVideoCode?: string | null;
  creativeTiktokHandle?: string | null;
  creatorDescription?: string | null;
  creatorName?: string | null;
  approvedAd?: string | null;
  id: string;
  updatedAt?: string | null;
  createdAt?: string | null;
  __typename?: string | null;
};

const adminCreativeRequests = ({
  creativeRequestsData,
  updateRequest,
  sortCreativeRequest,
}) => {
  const [filteredData, setFilteredData] = useState<CreativeRequest[]>([]);
  const [OptionData, setOptionData] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sortbyDateType, setSortByDateType] = useState(true);

  const getlistUsers = async () => {
    setLoading(true);
    const apiName = 'AdminQueries';
    const path = '/listUsers';
    const myInit = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    try {
      const { Users } = await API.get(apiName, path, myInit);
      if (Users) {
        const UsersData: OptionType[] = [];
        for (const user of Users) {
          let name = '';
          let family_name = '';
          let id = '';
          for (const att of user.Attributes) {
            switch (att.Name) {
              case 'name':
                name = att.Value;
                break;
              case 'family_name':
                family_name = att.Value;
                break;
              case 'sub':
                id = att.Value;
                break;
            }
          }
          UsersData.push({ name: `${name} ${family_name}`, id });
        }
        UsersData.sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        setOptionData(UsersData);
      }
    } catch (err) {
      console.log(err?.message);
    }
    setLoading(false);
  };

  const searchRequest = (value: string) => {
    if (!value) {
      setFilteredData(creativeRequestsData);
    } else {
      const newFilteredData: UpdateCreativeRequestInput[] = [];
      const filteredDataByName: OptionType[] = [];
      for (const data of OptionData) {
        if (data.name.toLowerCase().includes(value.toLowerCase())) {
          filteredDataByName.push(data);
        }
      }
      for (const data of filteredDataByName) {
        creativeRequestsData.map((prevData) => {
          if (prevData.creatorId === data.id) {
            newFilteredData.push(prevData);
          }
        });
      }
      setFilteredData(newFilteredData);
    }
  };

  const changeRequestCreator = async (reqId: string, id: string) => {
    const found = filteredData.find((item) => item.id === reqId);
    const DataToSend = { ...found };
    if (!found) return;
    else {
      delete DataToSend.updatedAt;
      delete DataToSend.createdAt;
      delete DataToSend.__typename;
      delete DataToSend.approvedAd;
      try {
        await updateRequest({
          variables: { input: { ...DataToSend, creatorId: id } },
        });
        setShowSuccessModal(true);
        setFilteredData((prev) => {
          return prev.map((item) => {
            if (item.id === reqId) {
              return {
                ...item,
                creatorId: id,
              };
            }
            return item;
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      // case CREATIVE_STATUS.Accept:
      //   return 'text-[#94D2BD]';
      case CREATIVE_STATUS.Approved:
        return 'text-[#94D2BD]';
      case CREATIVE_STATUS.Rejected:
        return 'text-[#D01C0B7D]';
      case CREATIVE_STATUS.Submitted:
        return 'text-[#E9D8A6]';
      case CREATIVE_STATUS.New:
        return 'text-[#E9D8A6]';
    }
  };

  const sliceText = (text: string) => {
    if (text.length > 40) text = text.slice(0, 40) + '...';
    return text;
  };

  useEffect(() => {
    getlistUsers();
  }, []);

  useEffect(() => {
    if (creativeRequestsData) {
      setFilteredData(creativeRequestsData);
    }
  }, [creativeRequestsData]);

  return (
    <>
      <section className="flex gap-4 mb-5">
        <div className="brand-dashboard__item search-item search-input border rounded-[16px] h-[48px] px-[30px] border-[#F5F1E8]">
          <img
            className="brand-dashboard__item-search"
            alt=""
            src="/images/search.svg"
          />
          <input
            className="creatives-search bg-white"
            placeholder="Search..."
            type="text"
            name="search creative request"
            onChange={(e) => searchRequest(e.target.value)}
          />
        </div>
      </section>

      <div className="creative-requests py-0">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-[#0E0D0D] uppercase head-text text-[16px] font-[700] p-0 m-0">
            Admin - Creative Linking
          </h2>
          <div className="flex">
            <h6 className="font-[600] mr-2">Sort by date:</h6>
            <div className="flex">
              <div>
                <ArrowUpIcon
                  className={`w-[20px] ${sortbyDateType ? 'text-[#f5a422]' : 'text-primary'
                    } cursor-pointer`}
                  onClick={() => {
                    sortCreativeRequest('ASC');
                    setSortByDateType((prev) => {
                      return !prev;
                    });
                  }}
                />
              </div>
              <div>
                <ArrowDownIcon
                  className={`w-[20px] ${!sortbyDateType ? 'text-[#f5a422]' : 'text-primary'
                    } cursor-pointer`}
                  onClick={() => {
                    sortCreativeRequest('DESC');
                    setSortByDateType((prev) => {
                      return !prev;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="brand-table-wrapper h-[auto]">
          {filteredData && creativeRequestsData ? (
            <div className="w-100 border border-[#F5F1E8] overflow-x-auto max-w-full rounded-[16px] py-[11px] bg-[#ffffff] h-[calc(100vh-145px)]">
              <div className="">
                <table className="creative-requests-table brand-table whitespace-nowrap">
                  <thead>
                    <tr className="">
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[25%]">
                        Activation Name
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[10%]">
                        Status
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[25%]">
                        Ad ID
                      </th>
                      <th className="pt-[9px] pb-[20px] px-[24px] text-[#0E0D0D] head-text font-[700] text-[16px] uppercase w-[25%]">
                        Creator Name
                      </th>
                    </tr>
                  </thead>
                  <thead>
                    {filteredData?.map((data, index) => (
                      <tr
                        key={`${data?.id}-brandBrief--${index}`}
                        className="h-[62px]"
                      >
                        <td className="text-[#3D636B] brand-table-descriptionc request-table-item  break-entry capitalized best-practice-headline w-[25%]">
                          {sliceText(data?.BriefName || '')}
                        </td>
                        <td
                          className={`brand-table-description request-table-item break-entry capitalized best-practice-headline font-[700] w-[10%] ${getStatusColor(
                            data.status || ''
                          )}`}
                        >
                          ● {data?.status}
                        </td>
                        <td className="brand-table-description request-table-item capitalized best-practice-headline w-[25%]">
                          {data.approvedAd ? data.approvedAd : ''}
                        </td>
                        <td className="brand-table-description request-table-item break-entry w-[25%] capitalized best-practice-headline h-[47px]">
                          {!loading ? (
                            OptionData.length ? (
                              <select
                                className="w-full text-[13px]"
                                value={data.creatorId || ''}
                                onChange={(e) =>
                                  changeRequestCreator(data.id, e.target.value)
                                }
                              >
                                {OptionData.map((userData) => {
                                  return (
                                    <option
                                      value={userData.id}
                                      key={userData.id}
                                      className=""
                                    >
                                      {userData.name}
                                    </option>
                                  );
                                })}
                              </select>
                            ) : (
                              <div className="text-[#0E0D0D] head-text text-[16px] font-[700]">
                                Creator is absent
                              </div>
                            )
                          ) : (
                            <div className="options-loader">
                              <IconLoader />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </thead>
                </table>
              </div>
            </div>
          ) : (
            <div className="loader-content">
              <IconLoader />
            </div>
          )}
          <Modal
            isOpen={showSuccessModal}
            handleClose={() => setShowSuccessModal(false)}
            type="brand"
            content="The creator of the creative request was successfully changed"
          />
        </div>
      </div>
    </>
  );
};

export default withAdmin(adminCreativeRequests);

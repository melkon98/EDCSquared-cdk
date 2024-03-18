import { CREATIVE_STATUS, USER_TYPES } from 'API';
import { IconLoader } from 'components';
import { FC, useEffect, useState } from 'react';
import {
  ICreatorBriefListProps,
  INotification,
  withCreatorBriefList,
} from 'state/dashboard';
import './creatorNotifications.css';

export const CreatorNotifications: FC<ICreatorBriefListProps> = ({
  requestList,
  profileData,
  requests,
  requestLoading,
  reqLoading,
}) => {
  const [data, setData] = useState<INotification[] | null>(null);

  const getNotification = (status: CREATIVE_STATUS): string => {
    switch (status) {
      case CREATIVE_STATUS.New:
        return 'has been created';
      case CREATIVE_STATUS.Approved:
        return 'has been approved';
      case CREATIVE_STATUS.Rejected:
        return 'has been rejected';
      default:
        return 'is in review';
    }
  };
  const getTime = (time) => {
    return new Date(time || '').toLocaleString().split(',')[0];
  };
  const createNotificationData = (requestsData) => {    
    const output = [] as Array<INotification>;
    requestsData?.forEach((request) => {
      const {
        createdAt,
        updatedAt,
        status,
        adminApproval,
        BriefName,
        creatorName,
      } = request || {};

      if (adminApproval && createdAt !== updatedAt) {
        if (adminApproval === 'Rejected') {
          output.push({
            type: 'admin',
            name: BriefName,
            creatorName,
            status: getNotification(CREATIVE_STATUS.Rejected),
            time: getTime(updatedAt) || '',
          });
        } else {
          output.push({
            type: 'admin',
            name: BriefName,
            creatorName,
            status: getNotification(CREATIVE_STATUS.Approved),
            time: getTime(updatedAt) || '',
          });
        }
      } else if (status && createdAt !== updatedAt) {
        if (adminApproval !== 'Rejected')
          output.push({
            name: BriefName,
            creatorName,
            status: getNotification(status),
            time: getTime(updatedAt) || '',
          });
      }
    });    
    setData(output.splice(0, 5));
  };

  useEffect(() => {
    if (requestList) {      
      createNotificationData(requestList);
      if (requestList?.length === 0 || requests?.length === 0) {
        setData([]);
      }
    }
    if (requests) {
      createNotificationData(requests);
      if (
        requests?.length === 0 &&
        profileData?.userType === USER_TYPES.BRAND_USER
      ) {
        setData([]);
      }
    }
  }, [requestList, requests]);

  return (
    <div
      className={`creator-dashboard__item pt-[22px] pb-0 border border-[#F5F1E8] min-h-358`}
    >
      {!requestLoading && !reqLoading && data != null ? (
        <table className="whitespace-nowrap">
          <thead>
            <tr>
              <th className=" sm:px-[28px] px-[10px] text-[#0E0D0D] head-text font-[700] text-[14px] uppercase pb-[19px]">
                Messages / Notifications
              </th>
              <th className=" pr-[10px] text-[#0E0D0D] head-text font-[700] text-[14px] uppercase pb-[19px]">
                Date
              </th>
            </tr>
          </thead>
          {profileData?.userType === USER_TYPES.CREATIVE_USER ? (
            <tbody className="[&>*:nth-child(even)]:bg-[#F5F1E8]">
              {data && data?.length > 0 && !requestLoading ? (
                data.map((note, index) => {
                  return (
                    <tr className="whitespace-nowrap h-[50px]" key={index}>
                      <td className=" sm:px-[28px] px-[10px] font-[400] text-[14px] cursor-pointer text-[#0E0D0D] h-[50px]  ">
                        <div className="ellipsis  w-[100%]">
                          {note.type === 'admin'
                            ? `Your creative for ${note.name} ${note.status} by an administrator`
                            : `Your creative for ${note.name} ${note.status}`}
                        </div>
                      </td>
                      <td className="pr-[28px]">{note.time}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    className="text-center 2xl:h-[250px] h-[207px] text-gray-500"
                    colSpan={5}
                  >
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody className="[&>*:nth-child(even)]:bg-[#F5F1E8]">
              {data && data?.length > 0 && !reqLoading ? (
                data.map((note, index) => {
                  return (
                    <tr className="whitespace-nowrap h-[50px]" key={index}>
                      <td className=" sm:px-[28px] px-[10px] font-[400] text-[14px] cursor-pointer text-[#0E0D0D] h-[50px]  ">
                        <div className="ellipsis  w-[100%]">
                          {note.type === 'admin'
                            ? `Creative request by ${note.creatorName} ${note.status} by an administrator`
                            : `Creative request by ${note.creatorName} ${note.status} by you`}
                        </div>
                      </td>
                      <td className="pr-[28px]">{note.time}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    className="text-center 2xl:h-[250px] h-[207px] text-gray-500"
                    colSpan={5}
                  >
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      ) : (
        <div className="loader-content min-h-[322px]">
          <IconLoader />
        </div>
      )}
    </div>
  );
};

export default withCreatorBriefList(CreatorNotifications);

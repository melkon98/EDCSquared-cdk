import { AuthRoutes, BrandRoutes, ProfileProps, UnknownType } from 'utils';
import { FullPageLoader } from 'components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITiktokAccountAccess, withProfile } from 'state/profileSteps';
import { UseUpdateUserProfile, useLinkTiktokAccount } from 'hooks';
import './style.css';
import Modal from 'components/ui/modal';
import Button from 'components/ui/button';
import styled from 'styled-components/macro';
import { AccountsInput, Column } from '../../components/common';
import { AdvertiserData } from '../../API';

const LinkTiktokAccount: React.FC<ProfileProps> = ({
  profileState: { data },
  editBrandProfile,
  refetchProfile,
}) => {
  const navigate = useNavigate();
  const {
    linkTiktok,
    data: tiktokAccountData,
    loading,
  } = useLinkTiktokAccount();
  const { updateProfile } = UseUpdateUserProfile();
  const [advData, setAdvData] = useState<ITiktokAccountAccess | null>(null);
  const [advItems, setAdvItems] = useState<AdvertiserData[]>([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const authCode = localStorage.getItem('authTikTokCode');
    localStorage.removeItem('authTikTokCode');
    const changeUser = url.searchParams.get('change_user');
    if (data?.id && authCode) {
      const variables = { authCode, userProfileId: data.id };
      linkTiktok({ variables });
    }
    if (changeUser && data?.tiktokAccountAccess) {
      setAdvData(data?.tiktokAccountAccess as ITiktokAccountAccess);
      setAdvItems(data?.tiktokAccountAccess?.advertisers_list || []);
    }
  }, [data, linkTiktok]);

  const handleModalAction = () => navigate(AuthRoutes.EditProfile);

  useEffect(() => {
    if (tiktokAccountData && tiktokAccountData !== 'error') {
      try {
        const advertiserData = JSON.parse(tiktokAccountData);
        if (advertiserData?.advertiser_id) {
          setAdvData(advertiserData);
          setAdvItems(advertiserData?.advertisers_list);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [tiktokAccountData]);

  const setActiveAdvertiser = async (advertiser_id: string) => {
    if (advData) {
      const { advertisers_list, access_token } = advData;
      await updateProfile({
        variables: {
          input: {
            tiktokAccountAccess: {
              advertisers_list: advertisers_list.map(
                ({ advertiser_id, advertiser_name }) => ({
                  advertiser_name,
                  advertiser_id,
                })
              ),
              access_token,
              advertiser_id,
            },
            id: data?.id,
          },
        },
      }).then((res) => {
        window.location.href = AuthRoutes.EditProfile;
      });

    }
  };

  const filterItems = (value: string) => {
    const AdStartedData: UnknownType = advData?.advertisers_list;
    value = value.toLowerCase();
    if (advItems && value) {
      const items = AdStartedData.filter(
        ({ advertiser_name, advertiser_id }) =>
          advertiser_name?.toLowerCase().includes(value) ||
          advertiser_id?.includes(value)
      );
      setAdvItems(items);
    } else {
      setAdvItems(AdStartedData);
    }
  };

  if (loading) return <FullPageLoader />;

  return (
    <Modal isOpen={true} handleClose={handleModalAction} title="">
      <div className="flex flex-col items-center gap-4 text-gray-600">
        {advData ? (
          <AccountsWrapper>
            <h4>Select account</h4>
            <AccountsInput
              type="text"
              onChange={(e) => filterItems(e.target.value)}
            />
            {advItems.length ? (
              <ItemsWrapper>
                {advItems.map(({ advertiser_name, advertiser_id }) => (
                  <TiktokAdvertiser
                    key={advertiser_id}
                    onClick={() => setActiveAdvertiser(advertiser_id || '')}
                  >
                    <p>
                      {advertiser_name} <span>({advertiser_id})</span>
                    </p>
                  </TiktokAdvertiser>
                ))}
              </ItemsWrapper>
            ) : null}
          </AccountsWrapper>
        ) : (
          <>
            <h6 className="head-text font-[700] md:text-[24px] text-[18px] text-[#0E0D0D] w-full text-center">
              There was an error linking your TikTok account.
              Please make sure you have an ads profile set up
            </h6>
            <div className="w-full flex justify-center text-white mt-5">
              <button
                className="creator-button text-[16px] mb-5 mt-3"
                onClick={() => handleModalAction()}
              >
                Go back to profile
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

const AccountsWrapper = styled(Column)`
  width: 100%;
  font-family: Arial, sans-serif !important;
  justify-content: flex-start;
  height: 315px;

  h4 {
    width: 100%;
    text-align: left;
    color: #0a9396;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const TiktokAdvertiser = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 7px 0 7px 15px;
  color: #8fa4a9;

  :hover {
    background-color: #f9fbfd;
  }

  p {
    font-family: Arial, sans-serif !important;
    display: block;
  }

  span {
    font-family: Arial, sans-serif !important;
    opacity: 0.5;
  }
`;
const ItemsWrapper = styled(Column)`
  width: 100%;
  border-radius: 10px;
  border: 1px solid #edf3f6;
  align-items: flex-start;
  padding: 10px 0;
  max-height: 240px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    width: 5px;
    height: 10px;
    background-color: #aaaaaa;
    border-radius: 2px;
  }
`;

export default withProfile(LinkTiktokAccount);
import { FullPageLoader } from 'components';
import Modal from 'components/ui/modal';
import { useLinkFacebookAccount, UseUpdateUserProfile } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withProfile } from 'state/profileSteps';
import styled from 'styled-components/macro';
import { AuthRoutes, ProfileProps, UnknownType } from 'utils';
import { AdvertiserData } from '../../API';
import { AccountsInput, Column } from '../../components/common';

type FacebookAccountAccess = {
  access_token?: string | null | undefined;
  advertiser_id?: string | null | undefined;
  advertisers_list?: AdvertiserData[] | null;
};

const LinkFacebookAccount: React.FC<ProfileProps> = ({
  profileState: { data },
  setProfileState,
  refetchProfile,
}) => {
  const navigate = useNavigate();

  const {
    linkFacebook,
    data: facebookAccountData,
    loading,
  } = useLinkFacebookAccount();
  const { updateProfile } = UseUpdateUserProfile();
  const [advData, setAdvData] = useState<FacebookAccountAccess | null>(null);
  const [advItems, setAdvItems] = useState<AdvertiserData[]>([]);

  useEffect(() => {
    const authCode = localStorage.getItem('authFacebookCode');
    localStorage.removeItem('authFacebookCode');
    if (data?.id && authCode) {
      const variables = { authCode, userProfileId: data.id };
      linkFacebook({ variables });
    }
  }, [data, linkFacebook]);

  const handleModalAction = () => navigate(AuthRoutes.EditProfile);

  useEffect(() => {
    if (facebookAccountData) {
      setProfileState((prev) => {
        if (!prev.data) return { isLoading: false };
        return {
          ...prev,
          data: {
            ...prev.data,
            facebookAccountAccess: JSON.parse(facebookAccountData),
          },
        };
      });
    }
    const addData: AdvertiserData[] = [];
    if (facebookAccountData || data?.facebookAccountAccess) {
      const facebookData: FacebookAccountAccess =
        facebookAccountData !== undefined
          ? JSON.parse(facebookAccountData)
          : '' || data?.facebookAccountAccess || [];
      if (facebookData?.advertisers_list) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        for (const add of facebookData?.advertisers_list) {
          addData.push(add);
        }
      }
      setAdvItems(addData);
      setAdvData(facebookData);
    }
  }, [facebookAccountData]);

  const setActiveAdvertiser = async (advertiser_id: string) => {
    if (advData) {
      const { advertisers_list, access_token } = advData;
      if (advertisers_list) {
        await updateProfile({
          variables: {
            input: {
              facebookAccountAccess: {
                advertisers_list: advertisers_list.map(
                  ({ advertiser_id, advertiser_name }) =>
                  ({
                    advertiser_name,
                    advertiser_id,
                  } || null)
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
    }
  };

  const filterItems = (value: string) => {
    const AdStartedData: UnknownType = advData;
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
              There was an error linking your META account.
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
  height: 300px;

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
  max-height: 200px;
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

export default withProfile(LinkFacebookAccount);

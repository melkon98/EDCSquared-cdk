import {
  getlistAdGroups,
  getlistCampaigns,
  getlistMetaAdGroups,
  getlistMetaCampaigns,
} from 'hooks';
import withApolloProvider from 'hooks/apollo/withApollo';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from 'state/profileSteps';
import {
  ISelectDropdown,
  ITikTokCreds,
} from './brandBrief.interface';

export function withSaveBrief<T>(
  Component: React.FC<T>
): React.FC<T> {
  return withApolloProvider((props: T) => {

    const { profileState } = useContext(ProfileContext);
    const [tiktokCreds, setTiktokCreds] = useState<ITikTokCreds>();

    const {
      getCampaignList,
      data: listCampaigns,
      loading: campaignListLoading,
    } = getlistCampaigns();

    const {
      getMetaCampaignList,
      data: listMetaCampaigns,
      loading: metaCampaignListLoading,
    } = getlistMetaCampaigns();
    const {
      getAdGroupList,
      data: listAdGroups,
      loading: adGroupsListLoading,
    } = getlistAdGroups();
    const {
      getMetaAdGroupList,
      data: listMetaAdGroups,
      loading: MetaAdGroupsListLoading,
    } = getlistMetaAdGroups();

    // const editBrief = async (data: CreateBrandBriefInput) => {
    //   editBrief({ variables: { input } });

    // const saveData = async (data: CreateBrandBriefInput, isCreating?: boolean) => {
    //   const brandId = profileState.data?.brand?.items?.[0]?.id;
    //   const brandName = profileState.data?.brand?.items?.[0]?.name;
    //   if (brandId) {
    //     const input = {
    //       brandId,
    //       brandName,
    //       id: data.id,
    //     };
    //     console.log('input :: ', input);

    //     if (input.id && !isCreating) {
    //       return editBrief({ variables: { input } });
    //     }

    //     return createBrief({
    //       variables: {
    //         input: { ...input, vertical: data.vertical, type: 'BrandBrief' },
    //       },
    //     });
    //   }
    // };
    const getAdGroups = (campaignId: string): void => {
      getAdGroupList({ variables: { ...tiktokCreds, campaignId } });
    };
    const getMetaAdGroups = (campaignId: string): void => {
      if (profileState.data?.facebookAccountAccess)
        getMetaAdGroupList({
          variables: {
            campaign_id: campaignId,
            access_token: profileState.data?.facebookAccountAccess.access_token,
          },
        });
    };

    useEffect(() => {
      if (profileState?.data) {
        const { tiktokAccountAccess } = profileState.data;
        if (tiktokAccountAccess) {
          try {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { access_token, advertiser_id } = tiktokAccountAccess;
            if (access_token && advertiser_id) {
              setTiktokCreds({ token: access_token, advertiser_id });
              return;
            }
          } catch (err) {
            console.log(err);
          }
        }
        // TODO: do you really want to goBack() every time profile state changes?
        // history.goBack();
      }
    }, [profileState]);
    useEffect(() => {
      if (tiktokCreds) getCampaignList({ variables: { ...tiktokCreds } });
    }, [tiktokCreds]);

    useEffect(() => {
      if (!listMetaCampaigns && profileState?.data?.facebookAccountAccess) {
        getMetaCampaignList({
          variables: {
            advertiser_id:
              profileState?.data?.facebookAccountAccess.advertiser_id,
            access_token: profileState?.data?.facebookAccountAccess.access_token,
          },
        });
      }
    }, [listMetaCampaigns, listCampaigns]);

    const getFormattedCampaigns = (
      campaigns?: string | null
    ): Array<ISelectDropdown> => {
      if (campaigns) {
        try {
          // TODO: Check and fix
          console.log(campaigns, 'campaigns')
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { data } = JSON.parse(campaigns);
          if (data?.list?.length) {
            const output = [] as Array<ISelectDropdown>;
            data.list.forEach((e) => {
              output.push({
                id: e.campaign_id,
                value: e.campaign_name,
                campaign_type: e.campaign_type || '',
              });
            });
            return output;
          }
        } catch (err) {
          console.log(err);
        }
      }
      return [];
    };

    const getFormattedAdGroups = (
      adgroups?: string | null
    ): Array<ISelectDropdown> => {
      if (adgroups) {
        try {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { data } = JSON.parse(adgroups);
          if (data?.list?.length) {
            const output = [] as Array<ISelectDropdown>;
            data.list.forEach((e) => {
              output.push({
                id: e.adgroup_id,
                value: e.adgroup_name,
                campaign_type: e.campaign_type || '',
              });
            });
            return output;
          }
        } catch (err) {
          console.log(err);
        }
      }
      return [];
    };

    const getFormattedIdentities = (
      campaigns?: string | null
    ): Array<ISelectDropdown> => {
      if (campaigns) {
        try {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { identities } = JSON.parse(campaigns);

          if (identities?.data?.identity_list.length) {
            const output = [] as Array<ISelectDropdown>;
            identities.data.identity_list.forEach((e) => {
              output.push({
                id: e.identity_id,
                value: e.display_name,
                campaign_type: e.campaign_type || '',
              });
            });
            return output;
          }
        } catch (err) {
          console.log(err);
        }
      }
      return [];
    };

    const hocProps = {
      // saveData,
      getAdGroups,
      getMetaAdGroups,
      // loading: createLoading,
      dataLoading: campaignListLoading || adGroupsListLoading,
      metaDataLoading: metaCampaignListLoading || MetaAdGroupsListLoading,
      listAdGroups: getFormattedAdGroups(listAdGroups),
      listMetaAdGroups: getFormattedAdGroups(listMetaAdGroups),
      listCampaigns: getFormattedCampaigns(listCampaigns),
      listMetaCampaigns: getFormattedCampaigns(listMetaCampaigns),
      listIdentities: getFormattedIdentities(listCampaigns),
      // response: createData,
    };
    return <Component {...props} {...hocProps} />;
  });
}
export default withSaveBrief;

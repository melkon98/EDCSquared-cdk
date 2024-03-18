import { ProfileProps, UnAuthRoutes } from 'utils';
import React, { Fragment, useEffect, useState } from 'react';
import { withProfile } from 'state/profileSteps';
import { USER_TYPES } from 'API';
import CreatorDashboard from 'pages/creatorDashboard/creatorDashboard';
import BrandDashboard from 'pages/brandDashboard/brandDashboard';
import AdminDashboard from 'pages/adminDashboard/adminDashboard';
import Modal from '../../components/authentication/TermsAndConditions/modal';
import { Auth } from 'aws-amplify';

const Dashboard: React.FC<ProfileProps> = ({ profileState: { data }, editCreatorProfile }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  useEffect(() => {    
    if(data?.userType === USER_TYPES.CREATIVE_USER && (!data.termsAndConditions || data?.country===null)){      
      setIsShowModal(true);
    }
  }, []);

  const confirm = (country) => {
      localStorage.setItem(`agreementConfirmed_${data?.id}`, 'true');
      editCreatorProfile({ country, termsAndConditions: true })
      setIsShowModal(false);    
  }

  if (isShowModal)
    return (
      <Modal
        withOutLabel={true}
        title={'Terms & conditions'}
        isOpen={isShowModal}
        content="You must agree to terms and conditions to continue."
        handleClose={async () => {
          await Auth.signOut()
          window.location.href = '/';
        }}
        withCheckbox={true}
        checkBoxText={
          <p>
            I agree to the{' '}
            <span
              onClick={() => {
                window.open(
                  `${process.env.REACT_APP_URL
                  }${UnAuthRoutes.TermsAndConditions.slice(1)}`,
                  '_blank'
                );
              }}
            >
              terms and conditions
            </span>
          </p>
        }
        actionLabel="CONFIRM"
        actionHandler={confirm}
        type={'creator'}
      />
    );
  if (data?.userType === USER_TYPES.CREATIVE_USER)
    return <CreatorDashboard data={data} />;
  if (data?.userType === USER_TYPES.BRAND_USER) return <BrandDashboard />;
  if (data?.userType === USER_TYPES.ADMIN_USER) return <AdminDashboard />;
  return <Fragment />;
};

export default withProfile(Dashboard);
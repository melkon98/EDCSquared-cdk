import { BrandProfile } from 'API';
import React, { ReactNode, useEffect, useState } from 'react';
import { initialProfileState } from 'utils';
import { IProfileState } from '.';
import { BrandContext, ProfileContext } from './profile.context';

interface Props {
  children?: ReactNode;
}
export const ProfileProvider: React.FC<Props> = (props) => {
  const [profileState, setProfileState] =
    useState<IProfileState>(initialProfileState);
  const [succModal, setSuccModal] = useState<boolean>(false);

  const [brandState, setBrandState] = useState<BrandProfile | null>(null);
  useEffect(() => {
    document.title = 'EDC squared';
  }, []);
  return (
    <ProfileContext.Provider
      value={{ profileState, setProfileState, succModal, setSuccModal }}
    >
      <BrandContext.Provider value={{ brandState, setBrandState }}>
        {props.children}
      </BrandContext.Provider>
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;

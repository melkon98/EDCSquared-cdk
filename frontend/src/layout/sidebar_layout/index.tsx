import { UserProfile } from 'API';
import { Sidebar } from 'components';
import { FC, ReactNode } from 'react';
import * as S from './styles';
import { Outlet } from 'react-router-dom';

interface Props {
  children?: ReactNode;
  data: UserProfile;
}

export const SidebarLayout: FC<Props> = ({ data }) => {
  const Wrapper =
    data.userType === 'BRAND_USER' ? S.MainWrapperBrand : S.MainWrapperCreator;

  return (
    <>
      <Wrapper>
        <Sidebar />
        <main className="w-full"><Outlet /></main>
      </Wrapper>
    </>
  );
};

export default SidebarLayout;

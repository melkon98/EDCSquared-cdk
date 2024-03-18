import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandRoutes } from 'utils';
import * as S from './styles';

export const NoDataFound: FC = () => {
  const navigate = useNavigate();
  const goToBrand = (): void => navigate(BrandRoutes.EditBrand);

  return (
    <S.NoDataWrapper>
      <S.NoDataTitle>
        You do not currently have a brand setup, build your brand now.{' '}
      </S.NoDataTitle>
      <S.EditBtnCanvas>
        <button className='creator-button' onClick={goToBrand}>Create Brand</button>
      </S.EditBtnCanvas>
    </S.NoDataWrapper>
  );
};

export default NoDataFound;

import styled from 'styled-components/macro';
import { ButtonBlack, Center, Column, Row } from 'components/common';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const navButtons: { name: string; route: string }[] = [
  { name: 'For Creators', route: 'creators' },
  { name: 'For Brands', route: 'brands' },
  { name: 'Our Purpose', route: 'purpose' },
  { name: `Let's Connect`, route: 'connect' },
];

export const Header: FC = () => {
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const redirect = (url: string) => {
    window.location.href = `${process.env.REACT_APP_URL}${url}`;
  };
  return (
    <HeaderWrapper>
      <HeaderBody>
        <LeftSide >
          <Logo src={'/images/logo-long.svg'} onClick={() => redirect('')
          } />
        </LeftSide>
        <RightSide>
          <MenuDesktop>
            {navButtons.map(({ name, route }, idx) => (
              <NavButton key={idx} onClick={() => redirect(route)}>
                {name}
              </NavButton>
            ))}
          </MenuDesktop>
          {isShowMobileMenu ? (
            <MenuMobile>
              {navButtons.map(({ name, route }, idx) => (
                <NavButton key={idx} onClick={() => redirect(route)}>
                  {name}
                </NavButton>
              ))}
            </MenuMobile>
          ) : null}
          <SignInButton onClick={() => navigate("login")}>Login or Sign up</SignInButton>
          <MenuButton
            src={'/images/menu-mobile-hamburger.svg'}
            onClick={() => setIsShowMobileMenu(!isShowMobileMenu)}
          />
        </RightSide>
      </HeaderBody>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  position: fixed;
  width: 96%;
  opacity: rgba(0, 0, 0, 0);
  padding: 20px 0;
  height: 100px;
  z-index: 11;
`;
const HeaderBody = styled.div`
  background-color: white;
  border-radius: 70px;
  box-shadow: 0 2px 50px rgba(82, 82, 82, 0.08);
  height: 60px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;
const LeftSide = styled(Row)`
  padding-left: 24px;
`;

const Logo = styled.img`
  height: 26px;
`;

const MenuButton = styled(Logo)`
  display: none;
  @media screen and (max-width: 991px) {
    display: block;
  }
`;
const RightSide = styled(Row)`
  @media screen and (max-width: 991px) {
    padding-right: 10px;
  }
`;
const NavButton = styled(Center)`
  color: #222222;
  padding: 20px;
  font-family: Inter, sans-serif;

  :hover {
    cursor: pointer;
  }
`;
const MenuDesktop = styled(Row)`
  height: 100%;
  @media screen and (max-width: 991px) {
    display: none;
  }
`;
const MenuMobile = styled(Column)`
  display: none;
  @media screen and (max-width: 991px) {
    display: flex;
    position: absolute;
    z-index: 12;
    width: 200px;
    max-width: 80%;
    margin-top: 330px;
    background-color: white;
    box-shadow: 0 2px 50px rgba(82, 82, 82, 0.08);
    align-items: flex-start;
    margin-right: 170px;
    border-radius: 6px;
  }
`;

const SignInButton = styled(ButtonBlack)`
  height: 44px;
  @media screen and (max-width: 991px) {
    display: none;
  }
`;

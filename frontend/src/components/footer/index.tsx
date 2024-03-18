import styled from 'styled-components/macro';
import { Center, Column, Row } from '../common';
import { useNavigate } from 'react-router-dom';
import { UnAuthRoutes } from 'utils';

export const Footer = () => {
  const navigate = useNavigate();
  const redirect = (url: string) => {
    window.location.href = `${process.env.REACT_APP_URL}${url}`;
  };
  return (
    <>
      <FooterWithEmail>
        <h1>hello@edcsquared.io</h1>
      </FooterWithEmail>
      <FooterWrapper>
        <FooterBody>
          <LogoFooterWrapper>
            <LogoFooter src={'/images/logo-new-white.svg'} />
          </LogoFooterWrapper>
          <FooterColumns>
            <FooterColumn>
              <h1>EDC squared</h1>
              <h3 onClick={() => redirect('creators')}>For Creators</h3>
              <h3 onClick={() => redirect('brands')}>For Brands</h3>
              <h3 onClick={() => redirect('purpose')}>Our Purpose</h3>
            </FooterColumn>
            <FooterColumn>
              <h1>Support</h1>
              <h3 onClick={() => redirect('connect')}>Let&#39;s Connect</h3>
              <h3 onClick={() => redirect('privacy-policy')}>Privacy policy</h3>
            </FooterColumn>
            <FooterColumn>
              <h1>Join Us</h1>
              {/* TODO: Use history push like this in all the places */}
              <h3 onClick={() => navigate(UnAuthRoutes.Login)}>
                Login or Sign up
              </h3>
            </FooterColumn>
          </FooterColumns>
        </FooterBody>
        <h4>© 2024 Copyright EDC Squared. All Rights Reserved.</h4>
      </FooterWrapper>
    </>
  );
};

const FooterWithEmail = styled(Center)`
  position: relative;
  justify-content: flex-start;
  margin-top: -40px;
  background-color: #202020;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
  height: 370px;
  width: 100%;
  padding-left: 40px;
  z-index: 5;
  @media only screen and (max-width: 480px) {
    padding-left: 10px;
    h1 {
      font-size: 30px !important;
    }
  }
  h1 {
    font-size: 40px;
    color: white;
  }
`;
const FooterWrapper = styled(Column)`
  width: 100%;
  background-color: #101010;
  h4 {
    color: white;
    width: 100%;
    text-align: left;
    padding-left: 20px;
    padding-bottom: 10px;
  }
  @media screen and (max-width: 768px) {
    h4 {
      margin-top: 20px;
    }
  }
`;

const FooterBody = styled(Row)`
  position: relative;
  margin-top: -40px;
  width: 100%;
  background-color: #101010;
  align-items: flex-start;
  padding-top: 6%;
  justify-content: flex-start;
  max-height: 500px;
  z-index: 3;
  font-family: Satoshi, sans-serif;
  color: white;
  @media screen and (max-width: 768px) {
    padding-left: 20px;
    flex-direction: column;
  }
`;
const FooterColumn = styled(Column)`
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 240px;
  width: 30%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 50%;
  }
`;

const LogoFooterWrapper = styled(Center)`
  height: 90%;
  flex-direction: column;
  justify-content: space-between;

  width: 30%;
  margin: 0 7%;
`;

const FooterColumns = styled(Row)`
  height: 90%;
  justify-content: space-between;
  align-items: flex-start;
  width: 50%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }

  h1 {
    font-size: 21px;
    padding-bottom: 24px;
    height: 42px;
  }

  h3 {
    cursor: pointer;
    height: 32px;
    margin-bottom: 10px;
  }
`;

const LogoFooter = styled.img`
  height: 100px;
`;

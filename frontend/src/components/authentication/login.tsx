import { FC, useEffect, useState } from 'react';
import './styles/login.scss';
import styled from 'styled-components';
import { ButtonBlack, Center } from '../common';
import { Header } from '../header';
import { Footer } from '../footer';
import CognitoAuth from 'components/cognitoAuth';


export const Login: FC = () => {

  return (
    <Wrapper>
      <Header />
      <ContentWrapper>
        <CognitoAuth />
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginButton = styled(ButtonBlack)`
  height: 56px;
  width: 90%;
`;

const ContentWrapper = styled(Center)`
  width: 100%;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
  z-index: 10;
  background-color: white;
  min-height: 100vh;
`;

const Content = styled(Center)`
  flex-direction: column;
  width: 100%;
  max-width: 620px;
  min-height: 100vh;
  color: #101010;
  justify-content: space-around;

  h1 {
    font-family: OswaldBold, sans-serif;
    font-size: 46px;
    line-height: 68px;
    text-align: center;
    padding: 50px;
    max-width: 500px;
  }

  h3 {
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    max-width: 500px;

    a {
      color: cornflowerblue;
    }
  }
`;

export default Login;

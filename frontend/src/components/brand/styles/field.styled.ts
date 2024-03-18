import styled from 'styled-components';

export const Heading = styled.div`
  text-align: left;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1c;
  margin-top: 15px;
  font-family: 'Raleway';
`;

export const Body = styled.div`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #001219;
  width: 100%;
  &.firstChild {
    margin-top: 6px;
  }
`;

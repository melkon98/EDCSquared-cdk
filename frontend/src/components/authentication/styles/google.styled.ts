import styled from 'styled-components';

export const GoogleButtonCanvas = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GoogleButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #2d3748;
  border-radius: 3.52799px;
  height: 35px;
  color: white;
  cursor: pointer;

  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  &:hover {
    background: black;
  }
`;

export const GoogleLogo = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  margin-right: 10px;
  & img {
    max-width: 100%;
  }
`;

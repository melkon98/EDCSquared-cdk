import styled from 'styled-components';

export const NoDataWrapper = styled.div`
  margin: 30px 0 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
export const NoDataTitle = styled.div`
  font-size: 14px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #001219;
`;
export const NoDataButton = styled.div`
  margin-top: 24px;
  background: linear-gradient(180deg, #005f73 0%, #0a9396 100%);
  border-radius: 4px;
  cursor: pointer;
  padding: 11px 60px;

  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;

  &:hover {
    background: linear-gradient(180deg, #227fa5 0%, #2cb5b8 100%);
  }
`;

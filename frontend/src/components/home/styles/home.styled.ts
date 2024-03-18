import styled from 'styled-components';

export const TopCanvas = styled.div`
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #9fd0bd;
  border-radius: 12px;
  width: 100%;

  @media only screen and (min-width: 600px) {
    width: 50%;
  }
`;
export const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

export const BrandTopHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

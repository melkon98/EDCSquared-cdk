import styled from 'styled-components';

export const BrandTopWrapper = styled.div`
  margin: 0;
  width: 100%;

  @media only screen and (min-width: 600px) {
    margin-left: 60px;
    width: auto;
  }
`;

export const BrandWrapper = styled.div``;

export const BrandName = styled.div`
  font-size: 14px;
  line-height: 28px;
  color: #001219;
  margin-top: 10px;

  &.firstChild {
    margin-top: 40px;
  }
`;

export const BrandBoldTitle = styled.span`
  margin-right: 5px;
  font-weight: bold;
`;

export const BrandBoldHead = styled.div`
  // font-family: "LatoBold";
`;

export const EditBtnCanvas = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto 10px;
`;
export const EditBrandButton = styled.div`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
  color: #041416;
  padding: 9px 54px;
  background: #ffffff;
  border: 1px solid #005f73;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    color: white;
    background: linear-gradient(180deg, #227fa5 0%, #2cb5b8 100%);
  }
`;

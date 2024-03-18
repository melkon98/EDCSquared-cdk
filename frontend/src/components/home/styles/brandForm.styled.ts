import styled from 'styled-components';

export const BrandInputForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SaveButtonContainer = styled.div`
  margin-top: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

export const SaveButton = styled.button`
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
  padding: 9px 68px;
  background: #ffffff;
  border: 1px solid #005f73;
  border-radius: 10px;

  &.no-dirty-state {
    border: 1px solid lightgrey;
    color: grey;
    opacity: 0.8;
  }
  &:hover:not([disabled]),
  &.active:not([disabled]) {
    color: white;
    background: linear-gradient(180deg, #227fa5 0%, #2cb5b8 100%);
  }
`;

export const SaveBtnText = styled.span`
  &.loading {
    margin-right: 10px;
  }
`;

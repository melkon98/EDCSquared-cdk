import styled from 'styled-components';

export const BrandInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const BrandInputTitle = styled.div`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1c;
`;
export const BrandInputPanel = styled.input`
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e8e8ee;
  width: 100%;
  padding: 8px 12px;
  line-height: 16px;
  font-size: 13px;

  &:focus-visible {
    outline: none;
  }
`;

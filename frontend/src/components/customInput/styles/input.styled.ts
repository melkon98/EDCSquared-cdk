import styled from 'styled-components';

export const FieldSet = styled.div`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: #e7d7a7;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const InputLabel = styled.div`
  margin: 12px 0 2px;
  font-style: normal;
  font-weight: 400;
  font-size: 9.87838px;
  line-height: 14px;
  color: #2d3748;
`;

export const Input = styled.input`
  padding: 6px 13px;
  border: none;
  border-bottom: 1px solid #e8e8e8 !important;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    color: #9c9992;
    padding-bottom: 12px;
  }
`;

export const ParagraphError = styled.p`
  margin-bottom: 0;
  color: red;
  text-align: right;
  font-size: 10px;
`;

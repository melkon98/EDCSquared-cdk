import { FC, useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

type InputProps = {
  type: string;
  required?: string;
  register: any;
  placeholder: string;
  valueName?: string;
  validationReq?: any;
  dataCy?: string;
};

export const Input: FC<InputProps> = ({type, placeholder, valueName, dataCy, register, validationReq}) => {
  
  return (    
    <>
      <FormInput
        type={type}
        placeholder={placeholder}
        {...register(valueName || type, validationReq )}
        data-cy={dataCy || ''}
      />
    </>
  );
};

const FormInput = styled.input`
  width: 100%;
  min-height: 64px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  margin-bottom: 0;
  padding: 16px;
  font-size: 18px;
  line-height: 32px;
  @media screen and (max-width: 635px) {
    padding: 8px 16px;
    min-height: 44px;
  }
`;

export default Input;

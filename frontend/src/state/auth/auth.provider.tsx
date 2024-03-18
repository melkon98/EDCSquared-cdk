import React, { ReactNode, useState } from 'react';
import { AuthContext, TitleContext } from 'state/auth';
import { initialAuthContext } from 'utils';
import { AuthStateType } from '../types/authTypes';

interface BaseLayoutProps {
  children?: ReactNode;
}

export const AuthProvider: React.FC<BaseLayoutProps> = (props) => {
  const [authState, setAuthState] = useState<AuthStateType>(initialAuthContext);
  const [title, setTitle] = useState('');
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <TitleContext.Provider value={{ title, setTitle }}>
        {props.children}
      </TitleContext.Provider>
    </AuthContext.Provider>
  );
};
import { createContext } from 'react';
import { initialAuthContext } from 'utils';
import {
  AuthContextType,
  TitleContextType,
} from '../types/authTypes';

export const AuthContext = createContext<AuthContextType>({
  authState: initialAuthContext,
  setAuthState: console.log,
});

export const TitleContext = createContext<TitleContextType>({
  title: '',
  setTitle: console.log,
});

export default AuthContext;

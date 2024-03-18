import React, { useContext } from 'react';
import { updateErrorState } from 'components';
import { ErrorProps, IErrorContextType, IErrorStateType } from 'utils';
import ErrorContext from './error.context';

function withError<T>(Component: React.FC<T & ErrorProps>): React.FC<T> {
  const ErrorConsumer = (props: T): JSX.Element => {
    const { errorState, setErrorState } =
      useContext<IErrorContextType>(ErrorContext);

    const showError = (data: IErrorStateType): void => {
      updateErrorState(data, setErrorState);
    };

    const errorProps = {
      errorState,
      showError,
      setErrorState,
    };

    return <Component {...props} {...errorProps} />;
  };
  return ErrorConsumer as React.FC<T>;
}
export default withError;

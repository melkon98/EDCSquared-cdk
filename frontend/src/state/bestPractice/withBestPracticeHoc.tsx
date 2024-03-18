import React, { useEffect, useState } from 'react';
import withApolloProvider from 'hooks/apollo/withApollo';
import { createBestPractice, editBestPractice } from 'hooks';
import {
  ICreateBestPractice,
  BestPracticeProps,
} from './bestPractice.interface';
import { useNavigate, useLocation } from 'react-router-dom';
import { BestPractices } from 'API';
import { AdminRoutes } from 'utils';

export function withBestPractice<T>(
  Component: React.FC<T & BestPracticeProps>
): React.FC<T> {
  return withApolloProvider((props: T) => {
    const navigate = useNavigate();
    const { pathname, state } = useLocation();

    const [bestPracticeState, setBestPractice] =
      useState<ICreateBestPractice>();

    const {
      createBrief,
      loading: createLoading,
      data: createData,
    } = createBestPractice();
    const {
      editBrief,
      loading: editLoading,
      data: editData,
    } = editBestPractice();

    const saveData = (data: ICreateBestPractice): void => {
      const input = {
        ...data,
        createdAt: undefined,
        updatedAt: undefined,
        __typename: undefined,
        owner: undefined,
        userProfileBestPracticesId: undefined,
      };
      if (data.id) editBrief({ variables: { input } });
      else
        createBrief({
          variables: { input: { ...input, id: undefined } },
        });
    };

    useEffect(() => {
      if (pathname.includes(AdminRoutes.EditPractice)) {
        const { practice } = (state || {}) as { practice: BestPractices };
        if (practice?.id) setBestPractice(practice);
        else navigate(AdminRoutes.CreatePractice);
      }
    }, [state, pathname]);

    const hocProps: BestPracticeProps = {
      saveData,
      bestPracticeState,
      loading: createLoading || editLoading,
      response: createData || editData,
    };
    return <Component {...props} {...hocProps} />;
  });
}
export default withBestPractice;

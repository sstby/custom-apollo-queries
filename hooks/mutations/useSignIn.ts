import { gql } from '@apollo/client';

import { DEFAULT_RESPONSE_NAME } from '$graphql/constants';
import { DEFAULT_RESPONSE_FIELDS } from '$graphql/fragments';
import { DefaultResponse } from '$graphql/types';
import { AuthErrorsMessages } from 'types/auth';

import { useCustomMutation, UseMutationWrapper } from '../helpers';

const PREFIX = 'signIn';

const MUTATION = gql`
  ${DEFAULT_RESPONSE_FIELDS}
  mutation signIn($input: SignInInput!) {
    ${DEFAULT_RESPONSE_NAME}: signIn(input: $input) {
      token
      ...DefaultResponseFields
    }
  }
`;

export type SignInResponse = DefaultResponse & {
  token?: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

type UseSignIn = UseMutationWrapper<typeof PREFIX, SignInResponse, SignInInput>;

export const useSignIn: UseSignIn = options => {
  const { signIn } = useCustomMutation(PREFIX, MUTATION, options);

  const handleSignIn: typeof signIn.request = async input => {
    const response = await signIn.request(input);

    const { token } = response || {};

    if (!token) {
      throw new Error(AuthErrorsMessages.SIGN_IN_ERROR);
    }

    return response;
  };

  return {
    signIn: {
      ...signIn,
      request: handleSignIn,
    },
  };
};

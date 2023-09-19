import { gql } from '@apollo/client';

import { DEFAULT_RESPONSE_NAME } from '$graphql/constants';
import { GroupDetails } from 'types/groups';

import { useCustomMutation, UseMutationWrapper } from '../helpers';

const PREFIX = 'createGroup';

const MUTATION = gql`
  mutation createGroup($input: CreateGroupInput!) {
    ${DEFAULT_RESPONSE_NAME}: createGroup(input: $input) {
      id
    }
  }
`;

type CreateGroupResponse = {
  id: number;
};

type CreateGroupInput = GroupDetails;
type UseCreateGroup = UseMutationWrapper<typeof PREFIX, CreateGroupResponse, CreateGroupInput>;

export const useCreateGroup: UseCreateGroup = options => useCustomMutation(PREFIX, MUTATION, options);

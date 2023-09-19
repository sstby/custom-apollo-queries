import { gql } from '@apollo/client';

import { DEFAULT_RESPONSE_NAME } from '$graphql/constants';
import { GetOneInput } from '$graphql/types';
import { Group } from 'types/groups';

import { useCustomQuery, UseQueryWrapper } from '../helpers';

const PREFIX = 'group';

const QUERY = gql`
  query group($input: GetOneInput) {
    ${DEFAULT_RESPONSE_NAME}: group(input: $input) {
      id
      name
      rules
      moderator {
        id
        fullName
      }
      members {
        email
        name
        status
      }
    }
  }
`;

type GetGroupInput = GetOneInput;

type GetGroupResponse = Group;

export type UseGetGroup = UseQueryWrapper<typeof PREFIX, GetGroupResponse, GetGroupInput>;

export const useGetGroup: UseGetGroup = (...args) => useCustomQuery(PREFIX, QUERY, ...args);

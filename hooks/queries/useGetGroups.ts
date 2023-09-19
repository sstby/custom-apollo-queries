import { gql } from '@apollo/client';

import { DEFAULT_RESPONSE_NAME } from '$graphql/constants';
import { GetManyInput } from '$graphql/types';
import { Group } from 'types/groups';

import { useCustomQuery, UseQueryWrapper } from '../helpers';

const PREFIX = 'groups';

const QUERY = gql`
  query groups($input: GetManyInput!) {
    ${DEFAULT_RESPONSE_NAME}: groups(input: $input) {
      id
      name
      members {
        email
        name
        status
      }
      threads {
        id
      }
      unreadCounter
    }
  }
`;

type GetGroupsInput = GetManyInput;

type GetGroupsResponse = Group[];

type UseGetGroups = UseQueryWrapper<typeof PREFIX, GetGroupsResponse, GetGroupsInput>;

export const useGetGroups: UseGetGroups = (...args) => useCustomQuery(PREFIX, QUERY, ...args);

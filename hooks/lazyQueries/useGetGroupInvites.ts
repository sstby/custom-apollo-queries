import { gql } from '@apollo/client';

import { DEFAULT_RESPONSE_NAME } from '$graphql/constants';
import { GetManyInput } from '$graphql/types';
import { GroupInvite } from 'types/groups';

import { useCustomLazyQuery, UseLazyQueryWrapper } from '../helpers';

const PREFIX = 'groupInvites';

const LAZY_QUERY = gql`
  query groupInvites {
    ${DEFAULT_RESPONSE_NAME}: groupInvites {
      id
      group {
        id
        name
        rules
      }
      name
      email
      createdBy {
        id
        email
        fullName
      }
      createdAt
    }
  }
`;

export type GroupInvitesResponse = GroupInvite[];

export type GroupInvitesInput = GetManyInput;

type UseGetGroupInvites = UseLazyQueryWrapper<typeof PREFIX, GroupInvitesResponse, GroupInvitesInput>;

export const useGetGroupInvites: UseGetGroupInvites = (...args) => useCustomLazyQuery(PREFIX, LAZY_QUERY, ...args);

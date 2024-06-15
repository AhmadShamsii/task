import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      userName
      branchName
      isFirstTimeAccess
      userId
      isCashier
      __typename
    }
  }
`;

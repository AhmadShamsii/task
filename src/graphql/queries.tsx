import { gql } from '@apollo/client';

export const GET_EMPLOYEES_LIST = gql`
  query (
    $first: Int
    $last: Int
    $before: String
    $after: String
    $where: HRMEmployeeDtoFilterInput
    $order: [HRMEmployeeDtoSortInput!]
    $branchId: String
  ) {
    hRMEmployees(
      first: $first
      last: $last
      before: $before
      after: $after
      where: $where
      order: $order
      branchId: $branchId
    ) {
      totalCount
      nodes {
        id
        nameEnglish
        designation {
          id
          title
        }
        contact
        department {
          id
          nameEnglish
        }
        createdAt
        bankName
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
export const GET_HRM_EMPLOYEE_BY_ID = gql`
  query GetHRMEmployeeById($id: Int!) {
    hRMEmployeeById(id: $id) {
      id
      nameEnglish
      designation {
        id
        title
      }
      contact
      createdAt
      department {
        id
        nameEnglish
      }
      bankName
    }
  }
`;

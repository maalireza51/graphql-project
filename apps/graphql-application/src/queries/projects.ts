import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query projects {
    projects {
      id
      name
      description
      status
      client {
        id
        name
      }
    }
  }
`;

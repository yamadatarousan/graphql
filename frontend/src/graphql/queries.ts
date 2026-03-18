import { gql } from "@apollo/client";

// Todo一覧を取得するQuery。
// App.tsx の useQuery から実行される。
export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      done
    }
  }
`;

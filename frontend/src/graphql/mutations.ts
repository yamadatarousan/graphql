import { gql } from "@apollo/client";

// 新しいTodoを1件追加するMutation。
// 変数titleを受け取り、追加後のTodoを返す。
export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      done
    }
  }
`;

// 指定IDのTodoの完了状態(done)を反転するMutation。
// チェックボックス変更時に使う。
export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      title
      done
    }
  }
`;

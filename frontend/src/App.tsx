import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO, TOGGLE_TODO } from "./graphql/mutations";
import { GET_TODOS } from "./graphql/queries";
import "./styles.css";

// 画面で扱うTodoデータの型。
// GraphQLレスポンスのフィールド構成と合わせている。
type Todo = {
  id: string;
  title: string;
  done: boolean;
};

// GET_TODOS のレスポンス全体の型。
// Query名ではなく、返却されるJSON構造に合わせて定義する。
type TodosData = {
  todos: Todo[];
};

export default function App() {
  // 入力欄の文字列を保持するローカル状態。
  const [title, setTitle] = useState("");

  // Todo一覧取得Query。
  // loading/error/data を使ってUI状態を出し分ける。
  const { data, loading, error } = useQuery<TodosData>(GET_TODOS);

  // Todo追加Mutation。
  // 成功後に一覧Queryを再実行して画面を最新化する。
  const [addTodo, { loading: adding }] = useMutation(ADD_TODO, {
    refetchQueries: [GET_TODOS]
  });

  // 完了状態切り替えMutation。
  // こちらも完了後に一覧を取り直す。
  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    refetchQueries: [GET_TODOS]
  });

  // 追加フォーム送信時の処理。
  // 空文字は弾き、正常ならMutation実行後に入力欄をクリアする。
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    await addTodo({ variables: { title: trimmed } });
    setTitle("");
  };

  return (
    // 学習用の最小画面:
    // 1) 入力フォーム
    // 2) ロード/エラー表示
    // 3) Todo一覧表示
    <main className="container">
      <h1>GraphQL Todo</h1>
      <p className="caption">最小構成でQuery / Mutationを試すためのサンプル</p>

      {/* Todo追加フォーム */}
      <form onSubmit={onSubmit} className="todo-form">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="新しいTodo"
          aria-label="Todo title"
        />
        {/* Mutation実行中は連打を避けるためボタンを無効化 */}
        <button type="submit" disabled={adding}>
          追加
        </button>
      </form>

      {/* Query状態の表示 */}
      {loading && <p>読み込み中...</p>}
      {error && <p className="error">エラー: {error.message}</p>}

      {/* Todo一覧。チェック操作でtoggleTodoを呼ぶ */}
      <ul className="todo-list">
        {(data?.todos ?? []).map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo({ variables: { id: todo.id } })}
              />
              {/* done=true のときはCSSクラスで打ち消し線を表示 */}
              <span className={todo.done ? "done" : ""}>{todo.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </main>
  );
}

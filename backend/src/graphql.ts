// Todo1件を表すアプリ内の型。
// GraphQLスキーマのTodo型と対応している。
export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

// 学習用のためDBは使わず、メモリ上の配列をデータストアとして使う。
// サーバ再起動で内容は初期化される。
const todos: Todo[] = [
  { id: "1", title: "GraphQLのQueryを試す", done: false },
  { id: "2", title: "GraphQLのMutationを試す", done: false }
];

// addTodo時に採番するための簡易カウンタ。
let nextId = 3;

// GraphQLのスキーマ定義（SDL）。
// Query: 読み取り系API
// Mutation: 書き込み系API
export const typeDefs = `#graphql
  type Todo {
    id: ID!
    title: String!
    done: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!): Todo!
    toggleTodo(id: ID!): Todo!
  }
`;

// スキーマに対する実処理。
// 「typeDefsの各フィールド名」と「resolver関数名」が対応する。
export const resolvers = {
  Query: {
    // todosクエリ: 現在のTodo一覧をそのまま返す。
    todos: () => todos
  },
  Mutation: {
    // addTodoミューテーション:
    // 1) titleを受け取る
    // 2) 新しいTodoを作る
    // 3) 配列先頭に追加して返す
    addTodo: (_: unknown, args: { title: string }) => {
      const todo: Todo = {
        id: String(nextId++),
        title: args.title.trim(),
        done: false
      };
      todos.unshift(todo);
      return todo;
    },
    // toggleTodoミューテーション:
    // 1) IDで対象Todoを探す
    // 2) 見つからなければエラー
    // 3) doneの真偽値を反転して返す
    toggleTodo: (_: unknown, args: { id: string }) => {
      const todo = todos.find((item) => item.id === args.id);
      if (!todo) {
        throw new Error(`Todo not found: ${args.id}`);
      }
      todo.done = !todo.done;
      return todo;
    }
  }
};

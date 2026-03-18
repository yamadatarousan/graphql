import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// 接続先のGraphQLエンドポイント。
// VITE_GRAPHQL_URLが設定されていればそれを使用し、
// 未設定ならローカル開発用URLにフォールバックする。
const uri = import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:4000/";

// Apollo Clientの共通インスタンス。
// - HttpLink: HTTPでGraphQL APIに送信
// - InMemoryCache: 取得結果のクライアントキャッシュ
export const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache()
});

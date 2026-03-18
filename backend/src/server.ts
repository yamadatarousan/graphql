import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./graphql.js";

// 環境変数PORTがあれば優先し、なければ学習用の既定値4000で起動する。
const port = Number(process.env.PORT) || 4000;

// GraphQLサーバ本体を作成。
// - typeDefs: GraphQLスキーマ（型定義）
// - resolvers: Query/Mutationを実際に処理する関数群
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// HTTPサーバとして待ち受けを開始する。
// startStandaloneServerは Express 等を使わずに最小構成で起動できるユーティリティ。
const { url } = await startStandaloneServer(server, {
  listen: { port }
});

// 起動後のアクセスURLをログに表示する。
console.log(`GraphQL server running at ${url}`);

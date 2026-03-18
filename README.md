# GraphQL Learning App

GraphQL学習用の最小構成Webアプリです。

- Backend: Apollo Server (Node.js + TypeScript)
- Frontend: React + Vite + Apollo Client
- Data: メモリ上のTodo配列（DBなし）

## ディレクトリ構成

```txt
.
├── backend
│   ├── src
│   │   ├── graphql.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend
│   ├── src
│   │   ├── graphql
│   │   │   ├── mutations.ts
│   │   │   └── queries.ts
│   │   ├── lib
│   │   │   └── client.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## 起動手順

### 1. 依存関係インストール

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. バックエンド起動

```bash
cd backend
npm run dev
```

`http://localhost:4000/` でGraphQLサーバが立ち上がります。

### 3. フロントエンド起動（別ターミナル）

```bash
cd frontend
npm run dev
```

表示されたURLを開くと、Todo一覧取得・追加・完了切替を操作できます。

## 学べるポイント

- GraphQLの `Query` と `Mutation`
- Apollo Serverの `typeDefs` と `resolvers`
- Apollo Clientでの `useQuery` / `useMutation`

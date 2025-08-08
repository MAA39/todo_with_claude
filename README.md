# 📝 Todo API with Claude MCP

> Claude MCPとGitHub統合を使って作成したシンプルなTodo REST API

## 🚀 特徴

- **Hono** - 高速で軽量なWebフレームワーク
- **TypeScript** - 型安全な開発
- **インメモリストレージ** - シンプルな実装（後でDBに置き換え可能）
- **完全なCRUD操作** - Create, Read, Update, Delete
- **CORS対応** - フロントエンドから簡単にアクセス可能

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/MAA39/todo_with_claude.git
cd todo_with_claude

# 依存関係をインストール
npm install
```

## 🏃‍♂️ 起動方法

```bash
# 開発モード（ホットリロード付き）
npm run dev

# ビルド
npm run build

# プロダクションモード
npm start
```

サーバーは `http://localhost:3000` で起動します。

## 📚 API エンドポイント

### ヘルスチェック
```
GET /
```

### Todo一覧取得
```
GET /todos
```

### 特定のTodo取得
```
GET /todos/:id
```

### Todo作成
```
POST /todos
Content-Type: application/json

{
  "title": "買い物に行く"
}
```

### Todo更新（完全更新）
```
PUT /todos/:id
Content-Type: application/json

{
  "title": "買い物に行く（牛乳忘れずに）",
  "completed": false
}
```

### Todo部分更新
```
PATCH /todos/:id
Content-Type: application/json

{
  "completed": true
}
```

### Todo削除
```
DELETE /todos/:id
```

## 🧪 テスト用curlコマンド

```bash
# Todo作成
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Claude MCPでリポジトリ作成"}'

# Todo一覧取得
curl http://localhost:3000/todos

# Todo完了状態を更新
curl -X PATCH http://localhost:3000/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## 🔄 今後の改善案

- [ ] PostgreSQL/Supabase連携
- [ ] 認証機能（JWT）
- [ ] バリデーション強化（Zod）
- [ ] エラーハンドリング改善
- [ ] Dockerize
- [ ] テスト追加（Vitest）
- [ ] OpenAPI仕様書生成

## 🛠 技術スタック

- **Hono** - Webフレームワーク
- **TypeScript** - 型システム
- **tsx** - TypeScript実行環境
- **Node.js** - ランタイム

## 📝 ライセンス

MIT

## 👨‍💻 作成者

**まさかず (MAA39)**  
Claude MCP + GitHub統合で作成

---

*このプロジェクトはClaude MCPを使用してGitHub上で直接作成されました* 🚀
# 🎮 Discord通知セットアップガイド

## 📝 概要

GitHub ActionsからDiscordに通知を送るための設定ガイドです。

## 🔧 セットアップ手順

### 1. Discord Webhook URLの取得

1. Discordで通知を受け取りたいチャンネルを選択
2. チャンネル設定（歯車アイコン）をクリック
3. 「連携サービス」タブを選択
4. 「Webhook」を選択
5. 「新しいWebhook」をクリック
6. Webhookの名前を設定（例: GitHub Notifications）
7. 「Webhook URLをコピー」をクリック

### 2. GitHubリポジトリにシークレットを追加

1. GitHubリポジトリの`Settings`タブを開く
2. 左メニューから`Secrets and variables` > `Actions`を選択
3. 「**New repository secret**」をクリック
4. 以下を入力:
   - **Name**: `DISCORD_WEBHOOK_URL`
   - **Secret**: コピーしたDiscord Webhook URL
5. 「Add secret」をクリック

## 📢 通知の種類

現在設定されている通知:

### 🚀 Push通知
- mainブランチへのプッシュ時
- コミット情報、作者、リポジトリ情報を含む

### 🎯 Pull Request通知
- PRの作成、クローズ、更新時
- マージ状態、変更行数、ブランチ情報を含む

### 📝 Issue通知
- Issueの作成、クローズ、アサイン時
- ラベル、アサイニー情報を含む

### ✅ Workflow完了通知
- CI/CDパイプラインの完了時
- 成功/失敗状態、実行番号を含む

### 🎉 リリース通知
- 新しいリリースの公開時
- @everyoneメンション付き

## 🎨 通知のカスタマイズ

### 色の意味
- 🔵 青 (3066993): 成功、新規作成
- 🔴 赤 (15158332): 失敗、エラー
- 🟡 黄 (16776960): 警告、更新
- 🟣 紫 (5814783): リリース
- 🟢 緑 (9936031): マージ済み

### カスタマイズ方法

`.github/workflows/discord-notify.yml`を編集して:
- 通知するイベントを変更
- Embedの色やアイコンを変更
- 通知メッセージをカスタマイズ

## 🔍 トラブルシューティング

### 通知が届かない場合

1. **Webhook URLが正しく設定されているか確認**
   ```bash
   # シークレットが存在するか確認
   gh secret list
   ```

2. **WebhookがDiscordで有効か確認**
   - Discordチャンネル設定 > 連携サービス > Webhookで確認

3. **GitHub Actionsログを確認**
   - Actionsタブ > 該当するワークフロー > ログを確認

### テスト通知を送る

```bash
# コマンドラインからテスト通知を送る
curl -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "content": "🧪 Test notification from GitHub Actions!",
    "username": "Test Bot"
  }' \
  "YOUR_DISCORD_WEBHOOK_URL"
```

## 📦 パッケージの追加

より高度なDiscord通知を実現したい場合:

### Discord.jsを使った通知
```yaml
- name: Advanced Discord Notification
  uses: sarisia/actions-status-discord@v1
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK_URL }}
    status: ${{ job.status }}
    title: "Deployment Status"
    description: "Build and deployment details"
    color: 0x0099ff
```

## 📄 参考リンク

- [Discord Webhookドキュメント](https://discord.com/developers/docs/resources/webhook)
- [GitHub Actionsドキュメント](https://docs.github.com/en/actions)
- [GitHub Secretsドキュメント](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

*Created with Claude MCP + GitHub Integration* 🤖
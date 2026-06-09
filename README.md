# Atlas System Manual

Atlasシステムの公式マニュアルおよびドキュメントリポジトリです。
本書は [mdbook](https://rust-lang.github.io/mdBook/) を用いて構築されており、システムの導入から運用、トラブルシューティングまでの情報を集約しています。

## ローカル環境での閲覧・ビルド

mdbookがインストールされている環境で、以下のコマンドを実行してください。

```bash
# 依存関係（サブモジュール等）の取得
git submodule update --init --recursive

# ローカルサーバーの起動 (http://localhost:3000 でプレビュー)
mdbook serve

# 静的HTMLのビルド (book/ ディレクトリに出力)
mdbook build
```

## 自動デプロイメント (CI/CD)

このリポジトリの `main` ブランチに変更がプッシュされると、GitHub Actions (`deploy.yml`) が自動的に起動し、以下の処理を実行します。

1. リポジトリのチェックアウト（サブモジュール `atlas-common` 含む）
2. `mdbook build` による静的HTMLの生成
3. 本番環境 (VPS) への `rsync` 転送
4. シンボリックリンクを用いた無停止 (Zero-Downtime) デプロイ
5. 古い世代のリリースファイルの自動クリーンアップ（最新3世代を保持）

詳細なインフラ・デプロイ構築手順については、マニュアル内の「運用・管理」セクションを参照してください。
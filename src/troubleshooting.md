# トラブルシューティング (Troubleshooting)

よくあるエラーとその解決策（ハマりポイント）をまとめています。

## デプロイメントに関するトラブル

| ポイント（現象） | 原因 | 解決策 |
|---|---|---|
| **403 Forbidden** | `index.html`が存在しない、またはWebサーバーが読み取れない権限だった。 | `chmod 755` で読み取り権限を付与し、`index.html`を作成・配置する。 |
| **Private Submodule エラー** | CIロボットが非公開の `atlas-common` サブモジュールにアクセスできなかった。 | 必要な権限（Contents: Read-only）を付与したFine-grained Tokenを作成し、`token:` パラメータで渡す。 |
| **Access Denied (403)** | CIロボットが「親」と「子」の両方のリポジトリにアクセスする権限が足りなかった。 | トークンのRepository access設定で `atlas` と `atlas-common` の両方を選択する。 |
| **Command not found** | 送り先のVPSに `rsync` コマンドが入っていなかった。 | `apt install -y rsync` でコマンドをインストールする。 |

# 自動デプロイの設定 (Deployment Setup)

新しいプロジェクトをVPSに公開するための、自動デプロイコンベアの構築手順です。
（リポジトリの `.github/workflows/deploy.yml` がこの処理を担います）

### 1. VPS側の受け入れ態勢構築
- **Webディレクトリ作成**: `/var/www/[プロジェクト名]/v0` を作成し、オーナーを自分のユーザーに変更。
- **シンボリックリンク作成**: `ln -sfn /var/www/[プロジェクト名]/v0 /var/www/[プロジェクト名]/current` で、常に最新版を指す「矢印」を作成。
- **Nginx設定**: root を `/var/www/[プロジェクト名]/current` に指定し、Webサーバーを再起動。
- **SSH鍵作成**: `ssh-keygen -t ed25519` でデプロイ専用の合鍵を作成し、公開鍵を `authorized_keys` に登録。

### 2. GitHubの金庫（Secrets）設定
新しいリポジトリの **Settings > Secrets and variables > Actions** に移動し、以下の環境変数を登録します。

- `VPS_HOST`: VPSのIPアドレス
- `VPS_SSH_KEY`: 手順1で作成した秘密鍵の中身
- `VPS_USERNAME`: VPSへのログインユーザー名
- `SUBMODULE_TOKEN`: `atlas-common` にアクセス可能なPersonal Access Token

### 3. デプロイの実行
以上の設定が完了したら、`main` ブランチにコミットをプッシュするだけで、GitHub Actionsが起動し無停止デプロイが行われます。

## 今後の運用アドバイス

- **.gitignore の設定**: ローカルで生成される `book/` フォルダをGitの管理から外すために、`.gitignore` ファイルに `book/` と書き込んでおくと、リポジトリがよりクリーンになります。
- **VPSのリリースフォルダ整理**: デフォルトのYAMLには、古いリリースを3つまで残して自動削除するお掃除コマンドが入っています。もしディスク容量が気になる場合は、この数字を `1` にすると最新版しか残らなくなり、さらに省エネです。

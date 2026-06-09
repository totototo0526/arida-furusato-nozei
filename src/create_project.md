# 新規プロジェクトの作成 (Getting Started)

このAtlas金型を使って、新しいプロジェクトのドキュメントを立ち上げる手順を説明します。

> [!NOTE]
> **同僚（チームメンバー）にこの金型を使ってもらう場合**
> メンバーにこのページの手順を実施してもらう前に、以下の準備が必要です。
> 1. 大元の `atlas` リポジトリおよび `atlas-common`（サブモジュール）への**読み取り権限**を相手のGitHubアカウントに付与する。
> 2. デプロイ先の**VPSを各自で用意**してもらう。
> 3. GitHub Actionsで自動デプロイを回すために、**相手自身のアカウントでPersonal Access Tokenを発行**し、新しいリポジトリのSecretsに登録してもらう（詳細は[自動デプロイの設定](./deployment.md)を参照）。

## 1. 金型の複製（クローン）

まずはこのリポジトリをベースにして、新しいプロジェクトのリポジトリを作成・クローンします。

```bash
# 例: 新しいプロジェクト名が 'my-project-docs' の場合
git clone https://github.com/your-org/atlas.git my-project-docs
cd my-project-docs
```

## 2. サブモジュールの初期化

Atlasの共通テーマ（`atlas-common`）を読み込むために、サブモジュールを初期化します。

```bash
git submodule update --init --recursive
```

## 3. プロジェクト情報の変更

`book.toml` をエディタで開き、新しいプロジェクトに合わせてメタデータを書き換えます。

```toml
[book]
authors = ["あなたの名前"]
language = "ja"
src = "src"
title = "新しいプロジェクトのマニュアル" # ここを変更

[output.html]
git-repository-url = "https://github.com/your-org/my-project-docs" # 新しいリポジトリURLに変更
edit-url-template = "https://github.com/your-org/my-project-docs/edit/main/{path}" # ここも変更
```

## 4. Gitリモートの変更

新しいリポジトリとして管理するため、Gitのリモート先を変更してプッシュします。

```bash
git remote set-url origin https://github.com/your-org/my-project-docs.git
git add .
git commit -m "Initial commit from Atlas template"
git push -u origin main
```

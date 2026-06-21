# personal-html-pages

個人用の静的 HTML ページを GitHub Pages で公開するためのリポジトリです。一覧ページは `index/index.html` に置き、公開ページ情報は `pages.json` から読み込みます。

## URL structure

- 一覧: `https://<GitHubユーザー名>.github.io/personal-html-pages/index/`
- 各ページ: `https://<GitHubユーザー名>.github.io/personal-html-pages/<slug>/`

## ページ追加方法

1. ルート直下に `.html` を置きます。一覧ページは `index/index.html` です。
2. `publish-html-page` Skill を使って `slug/index.html` へ変換します。
3. Skill が `pages.json` を更新し、元のルート HTML を削除します。

## Codex Skill の使い方

`publish-html-page` Skill は、ルートの HTML を公開用ディレクトリへ移動し、`pages.json` 更新、`git status` 確認、commit / push まで行うための手順書です。

## Note

パスワードは簡易ロックです。本当に秘密の情報や機密情報は置かないでください。

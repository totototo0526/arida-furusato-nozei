.PHONY: default serve update build clean

# デフォルトの挙動（ただ `make` と打った時は serve が走る）
default: serve

# 1. 共通テンプレートを最新化して、ローカルサーバーを起動する
serve: update
	@echo "🚀 ローカルサーバーを起動します..."
	mdbook serve --open

# 2. 共通テンプレートとローカルテーマを合成する
update:
	@echo "🔄 共通テンプレートを最新化しています..."
	git submodule update --remote
	@echo "🎨 テーマを合成しています..."
	@rm -rf .theme_build
	@cp -r atlas-common/theme .theme_build
	@if [ -d theme ]; then cp -r theme/* .theme_build/; fi

# 3. 本番ビルドのテスト（デプロイ前の確認用）
build: update
	@echo "🔨 HTMLをビルドします..."
	mdbook build

# 4. ビルドされた古いファイルをお掃除する
clean:
	@echo "🧹 ビルドファイル(book/)を削除します..."
	rm -rf book
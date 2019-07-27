#パッケージのインストール
`npm install`
#日本語対応
- https://qiita.com/kspotfujita/items/d47666733121eb76fe5b
- gulpをインストール グローバルへ `npm install -g gulp` 既にインストール済みの人は省略
- ディレクトリ作成 `mkdir -p node_modules/pdfmake/examples/fonts`
- fontsの中のものをコピー `cp fonts/*.ttf node_modules/pdfmake/examples/fonts/`
- pdfmakeに移動 `cd node_modules/pdfmake`
- インストール `npm install`
- `gulp buildFonts`

#印鑑
- base64に変換したものを inkan.jsに張り付けてください

#パッケージのインストール
`npm install`
#日本語対応
- gulpをインストール グローバルへ `npm install -g gulp`
- pdfmakeに移動 `cd node_modules/pdfmake`
- ディレクトリ作成 `mkdir -p examples/fonts`
- fontsの中のものをコピー `cp ../../fonts/*.ttf node_modules/pdfmake/examples/fonts/`
- インストール `yarn install`
- `gulp buildFonts`

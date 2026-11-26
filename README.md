# SNOWLINE（スキー場情報サイト）

関東周辺（群馬・栃木・長野・山梨）のスキー場の積雪と営業状況をまとめて確認できるサイト。

- Next.js 16 / Tailwind CSS 4 / Biome / pnpm
- スキー場の基本情報（標高・コース数・アクセス・営業開始日・公式URL）は `lib/resorts.ts` に、公開情報で確認できた値だけを入れている。積雪や当日の営業状況は未取得で「—」表示。データソースが決まったら置き換える（Linear APP-8）
- デザインは Claude の Design キャンバス「関東スキー場情報サイト デザイン案」をもとに実装（白・濃いブルー・グレー、明朝の見出し、筆記体の snowline）

## 開発

```bash
pnpm install
pnpm dev
```

## Vercelへの公開

GitHubにpushし、VercelでこのリポジトリをImportする。設定はすべてデフォルト（Framework: Next.js）でよい。環境変数は不要。

## Googleマップ（スキー場詳細の地図）

詳細ページの地図は [Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)（無料・回数無制限）で埋め込みます。キーが未設定のときは地図を出さず、「Googleマップでルートを調べる／開く」のリンクだけを表示します。

| 環境変数                            | 内容                               |
| ----------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` | Maps Embed API を有効にしたAPIキー |

キーはブラウザに見えるため、Google Cloud コンソールで必ず制限をかけてください。

- アプリケーションの制限：ウェブサイト（`https://ski-resort-site.vercel.app/*`、プレビュー用に `https://*-solid11235llcs-projects.vercel.app/*`、独自ドメイン）
- APIの制限：Maps Embed API のみ

## 楽天トラベル（近くの宿）

詳細ページの「周辺の宿」は楽天トラベルのキーワード検索APIから取得します。Vercel の環境変数に次を設定すると表示されます（未設定なら非表示）。

| 変数                   | 内容                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `RAKUTEN_APP_ID`       | 楽天ウェブサービスのアプリID                                 |
| `RAKUTEN_ACCESS_KEY`   | アクセスキー（`pk_` で始まる）                               |
| `RAKUTEN_AFFILIATE_ID` | 楽天アフィリエイトID（リンクがアフィリエイトURLになる）      |
| `RAKUTEN_ORIGIN`       | アプリに登録したサイトURL（省略時は `NEXT_PUBLIC_SITE_URL`） |

アプリは「Webアプリケーション」で登録し、サイトURLに本番のURLを入れてください。スキー場ごとの検索キーワードは `lib/hotels.ts` の `HOTEL_KEYWORD` です。

# SNOWLINE（スキー場情報サイト）

関東周辺（群馬・栃木・長野・山梨）のスキー場の積雪と営業状況をまとめて確認できるサイト。

- Next.js 16 / Tailwind CSS 4 / Biome / pnpm
- 現在の数値は `lib/resorts.ts` のサンプルデータ。データソースが決まったら置き換える（Linear APP-8）

## 開発

```bash
pnpm install
pnpm dev
```

## Vercelへの公開

GitHubにpushし、VercelでこのリポジトリをImportする。設定はすべてデフォルト（Framework: Next.js）でよい。環境変数は不要。

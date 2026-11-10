# 字體、文案與版面

## 字體

- **字體堆疊：** Geist（拉丁字母與數字），接 `-apple-system`、`PingFang TC`、`Noto Sans TC`、`Microsoft JhengHei`。Geist 維持不動，除非使用者要換；替代字體必須有等寬數字。
- **不用等寬字體。** 原計畫的 `font-mono` 標籤已淘汰，大寫小標一律用 Geist。

## 字距

中文要打開，數字要收回，兩者都已寫進基礎樣式：

- `body` 設 `letter-spacing: 0.03em` 和 `text-autospace: normal`，中文不會擠，中英交界有細縫。
- 數字加 `.num`：字距歸零並啟用 tabular figures。金額、計數、日期、百分比都要加。
- 負字距只給大數字（`.hero-number`、`.amount-field` 的 `-0.02em`）和英文標題（`tracking-tight`）。中文字串一律不加，本文件範例若有 `tracking-tight`，換成中文時要拿掉。

## 字級

| 角色 | 規格 | 實作 |
|---|---|---|
| 主視覺數字 | `clamp(40px, 11vw, 54px)` / 300 | `.hero-number` |
| 金額輸入 | 40px / 300 | `.amount-field` |
| 卡片內重點數字 | 28px / 300 / `-0.015em` | 工具類 |
| 空狀態標題 | 18–24px / 300 | `text-lg font-light tracking-tight` |
| 頂欄標題 | 15px / 600 | `text-[15px] font-semibold` |
| 列表主文 | 14px / 500 | `text-sm font-medium` |
| 內文 | 14px / 400 | `text-sm` |
| 輸入框 | 15px（觸控裝置 16px，避免 iOS 聚焦時放大） | `.field` |
| 次要資訊 | 11.5–12px | `text-[11.5px]`、`text-xs` |
| 按鈕 | 11px / 500 / `0.1em` / 大寫 | `.btn` |
| 區塊標籤 | 10.5px / 500 / `0.1em` / 大寫 / `--ink-3` | `.micro` |

字重用 300、400、500，600 只給頂欄標題。

## 文案語氣

- **介面標籤英文優先。** 導覽、按鈕、區塊標題用簡短的大寫英文（`FEED`、`SETTLEMENT PLAN`、`ADD`）。使用者輸入的資料和成對的提示可用中文（`RATIO 比例`）。
- 若新專案的介面標籤必須是中文，略過 `text-transform` 的效果即可：`.micro` 的字級與墨色照用，字距保留。先問使用者偏好，不要自行決定把介面全改成中文或英文。
- 圖示能明確表達時就不放文字。
- 句子短而直接，說明發生什麼和下一步：`Nothing matches this filter.`、`Add the first one and it lands in your Google Sheet.`
- 分隔資訊用 ` · `：`12 items · 3 days`。
- 單位比數字小而淡（`.unit`），不和數字搶。

## 圖示

- `lucide-react`。
- 線條 `strokeWidth` 1.5–1.6，打勾等確認符號可到 1.8–2.4。
- 尺寸：行內 12–14、一般按鈕 16–18、dock 18、主要新增鈕 20。
- 需要自製圖示時沿用同樣的線條粗細和圓角端點（`strokeLinecap="round"`、`strokeLinejoin="round"`）。

## 版面

**單欄、手機優先，內容寬度上限 672px。**

| 項目 | 數值 |
|---|---|
| 內容容器 | `mx-auto max-w-2xl px-4` |
| 頂欄 | sticky、高 64px，`pt-[env(safe-area-inset-top)]` |
| 底部預留（有 dock 時） | `pb-36` |
| 區塊間距 | `gap-6`（24px）；結算類疏一點用 `gap-7` |
| 表單欄位間距 | `gap-6`；標籤與控制項 `gap-2` |
| 文字卡片內距 | `p-5`，空狀態或設定頁 `p-6`、`p-7` |
| 列表卡片內距 | `p-1`，由列自己負責 `px-2.5 py-2.5` |
| 標籤對齊 | 區塊標題 `px-1`，與卡片邊緣有一點內縮 |
| Sheet 內距 | `px-6`，頂部 `pt-3`，底部 `pb-6` |

要點：

- 卡片外的標籤與數字直接放在頁面背景上，不是所有東西都要裝進卡片。頁面頂端的主視覺數字沒有卡片。
- 同組列表放同一張卡片，用列 hover 區分，不在列之間加分隔線；表格和稽核清單才用 `border-b` hairline。
- 橫向捲動列要延伸到螢幕邊緣（`.scroll-bleed`），邊緣用遮罩淡出，不要在頁面邊距處硬切。
- 使用者姓名這類可能很長的中文字串，用 `[overflow-wrap:anywhere] [word-break:keep-all]`。誰付錢、誰分攤這種關鍵資訊要換行，不要截斷。
- 所有固定元素都要算 safe-area：`pb-[max(14px,env(safe-area-inset-bottom))]`。

## 圓角

| 半徑 | 用途 |
|---|---|
| 999px | 按鈕、pill、chip、圖示鈕、dock、類別圖示 |
| 24px | Sheet |
| 20px | 卡片 |
| 16px（`rounded-2xl`） | 通知條、popover 內選項、tooltip、小統計塊 |
| 14px | 列表列 |
| 12px / 9px | Segmented 外框 / 滑塊 |
| 0 | 底線輸入框 |

## 層次

表面由低到高：`--bg` → `--surface` → `--surface-raised`。卡片只有 hairline 和幾乎看不見的陰影；只有真正浮起來的東西（sheet、popover、dock、tooltip）才用 `--shadow-float`。頁面頂端有一層 `--accent-glow` 的放射暈染，由 `body::before` 提供，淡到幾乎察覺不到，不要加強。

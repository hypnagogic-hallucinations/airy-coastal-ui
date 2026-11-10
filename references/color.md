# 色彩系統

所有值都在 `assets/css/tokens.css`。程式碼引用 token，不要寫 hex。

## 海岸色盤（15 色，冷到暖）

使用者指定的色盤，淺色模式下 hex 不要更動。定義在 `assets/react/palette.ts`。

| 名稱 | Hex | 名稱 | Hex | 名稱 | Hex |
|---|---|---|---|---|---|
| Abyssal Slate | `#1B323C` | Seafoam Jade | `#5BB196` | Sandy Brown | `#F4A261` |
| Charcoal Blue | `#264653` | Eucalyptus Sage | `#8EC18E` | Apricot Glow | `#EE8959` |
| Fjord Teal | `#28646B` | Pistachio Cream | `#BDD07C` | Burnt Peach | `#E76F51` |
| Baltic Pine | `#29817D` | Jasmine | `#E9C46A` | Terracotta Ember | `#C95238` |
| Verdigris（預設主色） | `#2A9D8F` | Honeycomb | `#EEB365` | Roasted Chestnut | `#9E3B26` |

## 語意 token

| Token | 淺色 | 深色 | 用途 |
|---|---|---|---|
| `--bg` | `#f8f8f6` | `#0c0e10` | 頁面背景，帶一點暖 |
| `--surface` | `#ffffff` | `#15181b` | 卡片 |
| `--surface-raised` | `#ffffff` | `#1b1f22` | 浮層：sheet、popover、dock |
| `--ink` | `#15191c` | `#f1f2f3` | 主要文字 |
| `--ink-2` | `#4b5157` | `#bcc1c6` | 次要文字、未選中控制項 |
| `--ink-3` | `#6d737a` | `#8f959b` | 註解、標籤、佔位 |
| `--hairline` | 7% 墨色 | 7% 白 | 卡片邊框、分隔線 |
| `--hairline-strong` | 14% 墨色 | 15% 白 | 控制項外框、欄位底線 |
| `--fill` | 4% 墨色 | 6% 白 | hover 底色、segmented 底 |
| `--track` | 6% 墨色 | 8% 白 | 進度條軌道 |
| `--debit` | `#9e3b26` | `#ee8959` | 負值、錯誤文字 |
| `--debit-soft` | `#c95238` | `#e76f51` | 負值色塊、長條 |
| `--warn` | `#9e3b26` | `#e9c46a` | 警示圖示與文字 |
| `--warn-soft` | 26% Jasmine | 13% Jasmine | 警示底色 |
| `--shadow` | 極淡 | 無 | 卡片。深色模式靠表面色分層，不用陰影 |
| `--shadow-float` | 柔和 | 較深 | 浮層 |

**對比度底線（WCAG）：** `--ink-3` 在淺色 `--bg` 上是 4.51，剛好過 AA，不能再調淡。淺色模式的 `--debit` 在白底上是 6.76。

## 主色（accent）

只設定 `--accent` 和 `--accent-fg`，其餘全部衍生：

| Token | 由來 | 用途 |
|---|---|---|
| `--accent` | 使用者選的顏色 | 主要按鈕、焦點框、選中外框、正向長條 |
| `--accent-fg` | `readableOn()` 選黑或白 | 主色上的文字 |
| `--accent-ink` | 混 62% 主色與黑（深色模式混白） | 彩色小字與圖示 |
| `--accent-soft` | 主色 14%（深色 20%） | 選中項底色 |
| `--accent-glow` | 主色 11%（深色 13%） | 頁面頂端的極淡暈染 |

- 不要拿 `--accent` 當小字顏色：預設的 Verdigris 在白底上只有 3.32。小字用 `--accent-ink`。
- 主色按鈕文字預設是深色 `#0b0b0d`（對比 5.92），不是白色，這是 `readableOn` 算出來的結果，不要硬改成白。
- 用 `useAccent(hex, isDark)` 套用。它會呼叫 `accentForTheme`，只在主色會消失於表面時才移動顏色：深色模式要求對比至少 3，淺色只要 1.4，所以 Jasmine 能保持原樣，只有接近白色的自訂色才會被調整。
- `--accent` 用 `@property` 註冊成顏色，換色時整個介面在 0.5s 內一起漸變，不需要逐一寫 transition。
- 主色可以是個別資料（如每趟旅程）專屬的，頁面會隨之換色。預覽中的顏色即時生效，確認才儲存。

## 類別色（`--cat-1` 到 `--cat-9`）

由冷到暖排列，類別數量少時從中挑選，保持冷暖順序。原專案的對應：

| Token | 淺色 | 深色 | TripSpliter 中的類別 |
|---|---|---|---|
| `--cat-1` | `#264653` | `#8fb8cc` | 機票 |
| `--cat-2` | `#28646b` | `#3a7f88` | 住宿 |
| `--cat-3` | `#2a9d8f` | 同左 | 交通 |
| `--cat-4` | `#5bb196` | 同左 | 門票 |
| `--cat-5` | `#8ec18e` | 同左 | 保險規費 |
| `--cat-6` | `#e9c46a` | 同左 | 伴手禮 |
| `--cat-7` | `#f4a261` | 同左 | 餐飲 |
| `--cat-8` | `#e76f51` | 同左 | 購物 |
| `--cat-9` | `#c95238` | 同左 | 其他 |

用法：在元素上設 `style={{ "--cat": "var(--cat-3)" }}`，`.chip`、`.cat-tile`、`.cat-option` 會自己算出淡底色。**類別色永遠是淡底或小圓點，不做實心大色塊**，圖示本身維持墨色。

## 資料序列色（`--series-1` 到 `--series-8`、`--series-rest`）

冷暖交替排列，相鄰色在色盲下仍能區分。深色模式只提亮會看不見的深藍系（`--series-1`、`--series-5`、`--series-7`）。

**顏色跟著身分，不跟著排名：** 依成員在原始清單中的位置取色，篩選或重新排序時，同一個人的顏色不會變。超過 8 個一律用 `--series-rest`。

```ts
const seriesColor = (members: string[], name: string) => {
  const i = members.indexOf(name);
  return i >= 0 && i < 8 ? `var(--series-${i + 1})` : "var(--series-rest)";
};
```

## 圖表（Recharts）

- **環圈圖：** 要細。`innerRadius="88%"`、`outerRadius="100%"`、`paddingAngle={2.5}`、`cornerRadius={3}`、`stroke="none"`。中間放 `.micro` 標籤和細字重總額。切片保持色盤的冷暖順序，排名和精確數字交給下方長條清單。
- **堆疊長條：** 片段之間用 `stroke="var(--surface-solid)" strokeWidth={1.5}` 留縫；只有最上段圓角 `[6, 6, 0, 0]`；`maxBarSize={28}`。
- **座標軸：** 無軸線、無刻度線。文字 `fill: var(--ink-3)`、`fontSize: 11`。只留水平格線，`stroke="var(--hairline)"`。
- **Tooltip：** 自訂元件。`--surface-raised` 底、`--hairline` 框、`--shadow-float`、`rounded-2xl`；數字加 `.num`。游標是 `--fill` 圓角色塊。
- **圖例：** 8px 小圓點配 `--ink-2` 文字。
- **細長條：** 排名清單用 `.bar-track` + `.bar-fill`，高 3px，依序延遲長出。
- **無障礙：** 圖表外層加 `role="img"` 和描述，精確數字另外以清單或表格呈現。
- **動畫：** 700–900ms，`ease-out`。
- 圖表是最重的相依，用動態載入，載入時顯示骨架。

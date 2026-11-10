# 元件目錄

CSS 全在 `assets/css/components.css`。React 檔在 `assets/react/`，需要 React 19（`Sheet` 把 `ref` 當一般 prop）、Tailwind 工具類和 `lucide-react`。

狀態一律掛在語意屬性上（`aria-pressed`、`aria-selected`、`aria-expanded`、`aria-current`、`data-open`），這樣樣式和無障礙不會脫鉤。不要另外加 `.active`。

## 基礎

| Class | 用途 | 重點 |
|---|---|---|
| `.card` | 內容容器 | 20px 圓角、hairline 框 |
| `.micro` | 區塊與欄位標籤 | 10.5px 大寫 |
| `.num` | 數字 | 等寬、字距歸零 |
| `.hero-number`、`.unit` | 頁首大數字與單位 | 細字重 |
| `.skeleton` | 骨架 | 緩慢掃光 |

## 按鈕

| Class | 用途 | 規格 |
|---|---|---|
| `.btn .btn-primary` | 每個畫面最主要的動作 | 高 42px、主色實心、大寫 |
| `.btn .btn-ghost` | 次要動作 | 內框線 |
| `.btn .btn-danger` | 刪除等危險動作 | 淡紅底 |
| `.icon-btn` | 工具列圖示 | 40×40，按下縮到 0.88 |
| `.stepper-btn` | 加減步進 | 28×28，`::after` 擴大觸控範圍 |

一個畫面只放一個 `.btn-primary`。

## 選擇類

| Class | 用途 | 規格 |
|---|---|---|
| `.pill` | 可切換選項、次要動作 | 高 32px、外框線；`::after` 補足 44px 觸控範圍；選中時淡主色底 |
| `.pill-caps` | 加在 `.pill` 上，用於固定的英文選項 | 10.5px 大寫。使用者資料用一般 `.pill` |
| `.chip`、`.chip-dot` | 類別篩選 | 無外框、6px 彩色點；需設定 `--cat` |
| `.cat-option` | 表單內的類別選擇格 | 3 欄 grid；需設定 `--cat` |
| `.cat-tile` | 列表左側的類別圓形圖示 | 淡色底配墨色圖示；需設定 `--cat` 和尺寸（如 `h-9 w-9`） |
| `.segmented` 系列 | 2–4 個互斥選項 | 用 `Segmented.tsx`；等寬，滑塊位置不必量測 |
| `.swatch`、`.color-well` | 色票與自訂色 | 用 `AccentPicker.tsx` |

**該用哪一個：** 互斥且只有 2–4 項用 `Segmented`；多項或可複選用 `.pill`，放不下時包進 `.scroll-row`；有類別色的篩選用 `.chip`。

## 輸入

| Class | 用途 | 規格 |
|---|---|---|
| `.field` | 所有文字、日期、下拉輸入 | 只有底線；聚焦時主色由左向右畫過 |
| `.field-bare` | 加在 `.field` 上，隱藏靜止底線 | 用於步進器中間的數字 |
| `.amount-field` | 表單的主金額 | 40px 細字重，無底線 |
| `.search` 系列 | 搜尋 | 用 `SearchField.tsx` |

`Sheet.tsx` 匯出的 `Field` 組件統一處理 `.micro` 標籤和提示文字。輸入欄不要有灰底或四邊框。

## 列表與資料

- `.list-row`：可點擊的列，14px 圓角，按下縮到 0.985，hover 時 `--fill` 底。搭配 `flex items-center gap-3`。
- `.bar-track` + `.bar-fill`：3px 細長條。設定 `width`、`background`，用 `--i` 控制錯開延遲。
- `.disclosure`：高度動畫的收合區塊，內層要只有一個子元素；用 `data-open` 控制，收合時加 `inert`。
- `.scroll-row` + `.scroll-bleed`：延伸到螢幕邊緣並淡出的橫向捲動列。
- `.toolbar`、`.toolbar-chips`：chip 列加收合搜尋的組合；搜尋展開時 chip 淡出。

## 導覽與框架

| Class / 檔案 | 用途 | 重點 |
|---|---|---|
| `.top-bar` | 頂欄 | 捲動前透明，捲動 48px 後才出現背景與底線；不支援 scroll-timeline 時直接顯示背景 |
| `.hero-block` | 頁首數字區 | 捲動時淡出並略為縮小 |
| `FloatingDock.tsx`（`.dock*`） | 底部懸浮導覽 | 只有當前項顯示文字；外加圓形新增鈕；`--dock-open` 要放得下最長的標籤 |
| `Sheet.tsx`（`dialog.sheet`） | 底部抽屜 | 原生 `<dialog>`，自帶焦點陷阱和 Esc；可下拉或快速滑動關閉；寬度 ≥640px 變置中對話框 |
| `.sheet-stack` | Sheet 內容容器 | 子區塊依序浮現 |

**導覽與新增分離：** 新增是獨立的圓形按鈕，不放進 tab 裡，每個畫面都能一鍵新增。

**Popover：** 用 `.card .pop`，並設 `background: var(--surface-raised)`、`boxShadow: var(--shadow-float)`、`absolute top-full mt-1 w-72 max-w-[calc(100vw-24px)]`。點外面或按 Esc 要能關閉。

**通知條：** 不用 toast。放在頂欄下方，用 `.reveal`。
- 錯誤：`role="alert"`、`rounded-2xl p-3.5`、`background: color-mix(in srgb, var(--debit-soft) 12%, transparent)`、`color: var(--debit)`，右側 `.icon-btn` 可關閉。
- 警告：`role="status"`、`background: var(--warn-soft)`。

## 動態小元件

| 元件 | 用途 |
|---|---|
| `AnimatedNumber.tsx` | `AnimatedNumber`（含 `.hero-number`）與 `CountUp`（只有數字） |
| `Spinner.tsx` | `Spinner`、`PageSkeleton`，都有延遲出現。`PageSkeleton` 的形狀要依新頁面調整 |
| `useFlip.ts` | 列表項滑到新位置；項目設 `data-flip={key}` |
| `useSteadyFlag.ts` | 防閃爍：短於 300ms 不顯示，顯示後至少維持 700ms |
| `useAccent.ts` | 套用主色 |
| `themeReveal.ts` | `revealTheme(apply, event)`：主題從點擊處以圓形擴散切換 |

## 新增元件的規則

1. 先看能否用現有 class 組合。
2. 顏色、陰影、緩動只引用 token。
3. 靜止時盡量輕：優先外框線，不用實心。
4. 高度低於 44px 的觸控目標用 `::after { inset: -8px }` 擴張。
5. 按下回饋用 `transform: scale(0.88–0.985)` 搭配 `--ease-spring`，元素越小縮得越多。
6. hover 寫在 `@media (hover: hover)` 內，否則觸控螢幕上會黏在最後點的那一列。
7. 放進 `@layer components`，工具類才能覆寫它；未分層的樣式會贏過 Tailwind 的 `absolute` 等工具類。

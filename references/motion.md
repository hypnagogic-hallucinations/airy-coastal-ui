# 動態

動態要交代東西從哪裡來、去了哪裡，而且要快要輕。

## 緩動

| Token | 值 | 用途 |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | 進場、位移、展開：快速抵達後緩緩停下 |
| `--ease-spring` | `cubic-bezier(0.34, 1.4, 0.64, 1)` | 按下回饋、滑塊、圖示：帶一點回彈 |
| `ease` / `ease-in` | 內建 | 顏色與透明度用 `ease`；離場用 `ease-in` |

## 時長

| 時長 | 用途 |
|---|---|
| 0.2–0.28s | 顏色、hover、透明度；離場（約 0.2s，比進場快） |
| 0.3s | 按下回彈 |
| 0.35s | 主題色背景漸變 |
| 0.42–0.52s | 位移、高度展開、滑塊、dock 切換 |
| 0.5–0.55s | 頁面、列表、sheet 進場 |
| 0.72–0.9s | 少數值得注意的時刻：主題切換、圖表、長條生長、數字滾動 |

## 預先定義的動畫

| Class | 效果 | 用在 |
|---|---|---|
| `.view-enter` | 上浮 10px 淡入 0.5s | 分頁切換 |
| `.rise` | 上浮淡入，依 `--i` 錯開 38ms，**上限 10 項** | 清單項目 |
| `.reveal` | 快版上浮 0.28s | 條件式內容 |
| `.pop` | 下移 4px 且略縮小淡入 0.26s | Popover |
| `.swap` | 彈跳出現 0.34s；換 `key` 重新觸發 | 圖示和文字替換 |
| `.sheet-stack > *` | 依序上浮，延遲 40–160ms | Sheet 內區塊 |
| `.flow-arrow` | 由左滑入 | 表示流向的箭頭 |
| `.bar-fill` | 由左長出 0.8s，錯開 40ms | 長條 |

## 招牌手法

- **底線畫過：** 聚焦時主色底線由左畫到右（0.5s）。`.field` 用 `background-size`，`.search` 用 `scaleX`。
- **滑塊：** 共用一個滑塊，用 `transform: translateX(calc(var(--index) * 100%))` 移動，不必量測尺寸。項目等寬是這招的前提。
- **FLIP 列表：** `useFlip` 讓列表項從舊位置滑到新位置。
- **數字滾動：** `CountUp` 以 750ms、四次方緩出滾動到新值；從舊值開始，不從 0 開始。
- **捲動連動：** 用 `animation-timeline: scroll()` 讓頂欄從透明轉為實心、頁首數字淡出，不寫 JS。放在 `@supports` 裡。
- **主題切換：** 新主題用 View Transitions 從點擊處圓形擴散（`revealTheme`）。切換期間 `.theme-switching` 關閉所有 transition，否則顏色漸變會透出成灰霧。
- **主色漸變：** `@property` 註冊 `--accent`，所有衍生色跟著一起變。
- **高度動畫：** `.disclosure` 在 `0fr` 和 `1fr` 之間過渡 `grid-template-rows`，不必量測高度。
- **Sheet：** 進場 0.5s，離場 0.2s。可拖曳關閉，超過 110px 或快速滑動就關，拖曳中關閉 transition 讓它跟手。
- **展開時才生長：** 收合區塊內的長條在打開時才開始動畫，不會在頁面載入時白白播完。

## 載入狀態

使用者對閃爍的 spinner 特別反感。

1. **只有使用者正在等的工作才顯示。** 背景同步不要占據畫面，頂多讓同步圖示轉動。
2. **有延遲才出現。** `.spinner-wait` 延遲 0.35s 才淡入；快速完成時什麼都看不到。
3. **防閃爍旗標。** 由狀態驅動的 spinner 用 `useSteadyFlag(active)`：短於 300ms 不顯示，一旦顯示就至少維持 700ms。
4. **骨架優於 spinner。** 清單與頁面用維持版面形狀的 `.skeleton`，全頁 spinner 只在還不知道頁面長什麼樣時使用。
5. **樂觀更新。** 寫入動作先反映到畫面，失敗再還原並顯示錯誤。

```ts
const spinning = useSteadyFlag(syncing);
<RefreshCw className={spinning ? "animate-spin" : undefined} size={16} strokeWidth={1.5} />
```

## 無障礙

`components.css` 尾端的 `prefers-reduced-motion` 區塊會把時長壓到幾乎為零。三個地方要另外處理，因為它們不受這條規則影響：

- **Scroll-timeline：** 時長對它無效，要直接 `animation: none !important`。新增任何捲動連動動畫都要加進去。
- **JS 動畫：** `useFlip`、`CountUp` 自行檢查 `matchMedia`。自寫的 JS 動畫也要檢查。
- **View Transitions：** `revealTheme` 會判斷並改為立即切換。

## 常見的錯誤

- 不要讓長清單一項一項慢慢出現：`.rise` 有 10 項的錯開上限就是為此。
- 不要用 `transition: all`，明確列出屬性。
- 不要對 `width`、`height` 做動畫（除了少數已設計好的 dock 和收合搜尋）；優先用 `transform` 和 `opacity`。
- FLIP 新進項目要先取消自己的進場動畫，否則會在底下透出來（`useFlip` 已處理）。

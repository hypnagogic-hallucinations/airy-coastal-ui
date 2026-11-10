---
name: airy-coastal-ui
description: 套用「Airy Coastal」設計系統：簡潔、現代、有空氣感的介面，含 15 色海岸色盤、明暗雙主題 token、髮絲線元件、細緻動態，以及可直接複製的 CSS 與 React 元件（源自 TripSpliter）。當使用者要做或改 UI 並提到空氣感、質感、精緻、海岸色系、coastal palette、沿用 TripSpliter 的風格或把這套設計搬到新專案時，務必使用。專案已有 --accent、--ink-3、.micro、.pill 這組 token 或 class 時，任何新畫面、元件、圖表或配色調整也都要使用，即使使用者沒有點名這個風格。Use for "airy", "minimal but refined", or "same look as TripSpliter" UI work.
---

# Airy Coastal UI

讓介面安靜、輕盈、有質感：內容是主角，控制項退到背景，動態交代「東西去了哪裡」。

## 美學原則

判斷規格沒寫到的情況時，回到這六條。

1. **留白與細線取代色塊。** 用 hairline、底線、內框線分界，不用灰底方塊。使用者曾把滿版灰底搜尋框評為「巨大又粗暴」，這是這套風格最核心的一條界線。
2. **控制項小而安靜，用到才展開。** 搜尋平時只是圖示，篩選收在 disclosure 裡，dock 只有當前項顯示文字。
3. **層次靠字重與墨色。** 大數字反而用細字重（300）。層級用 `--ink`、`--ink-2`、`--ink-3` 三階表達，不靠加粗或加色。
4. **Accent 要省著用。** 只給主要操作、選中狀態、焦點和關鍵數值。其他顏色都帶語意（類別、成員、警示），不做裝飾。
5. **動態解釋變化。** 滑塊滑動、列表項滑到新位置、數字滾動到新值。不做純裝飾的循環動畫。
6. **快的事情不顯示等待。** 短暫的等待什麼都不出現，spinner 絕不能閃一下。

## 明確避免

| 不要 | 原因 |
|---|---|
| 金屬紋理、拉絲質感、重漸層、等寬字體 | 專案早期計畫的方向，已被使用者否決 |
| 滿版灰底輸入框或搜尋框 | 被評為巨大又粗暴。改用底線欄位和可收合搜尋 |
| 自選其他飽和色當 accent 或圖表色（例如鈷藍 `#2563EB`） | 最初的配色被使用者評為難看。一律從海岸色盤選 |
| 改動色盤在淺色模式的 hex | 這是使用者指定的值。只有在深色模式會看不見時才提亮 |
| 沒有延遲的 spinner；背景同步也顯示 loading | 會閃爍。見 [motion.md](references/motion.md) |
| 在中文字上用負字距 | 中文會擠。負字距只用於數字 |
| 只靠測試通過就判定完成 | 美感要看截圖判斷 |

## 導入流程

1. **看技術棧。** 查 `package.json` 和全域 CSS，依下表決定複製哪些檔案。專案若已有設計系統，先問使用者要整套替換還是只吸收原則，不要讓兩套 token 並存。

   | 專案類型 | 複製內容 |
   |---|---|
   | Tailwind v4 + React | `assets/css/tokens.css`、`components.css`、需要的 `assets/react/*` |
   | React，無 Tailwind | 同上，再加 `css/reset.css`。元件裡的 Tailwind 工具類要改寫成一般 CSS |
   | 其他框架或純 HTML | `reset.css`、`tokens.css`、`components.css`，class 可直接用；互動邏輯參考 `assets/specimen.html` |
   | Tailwind v3 或其他 CSS 框架 | 這條路徑未驗證。複製後先確認 `@layer components` 的 class 沒被裁掉，並看截圖 |

2. **接上全域設定。** 匯入順序為框架或 reset → `tokens.css` → `components.css`。
   ```css
   @import "tailwindcss";
   @custom-variant dark (&:where(.dark, .dark *));
   @import "./tokens.css";
   @import "./components.css";
   ```
   - 深色模式靠 `<html class="dark">` 切換，Next.js 可用 `next-themes` 的 `attribute="class"`。
   - 字體用 Geist，Next.js 以 `next/font/google` 設定 `variable: "--font-geist"`；其他環境自行載入名為 `Geist` 的字體。換字體時必須保留等寬數字（tabular figures），金額欄才對得齊。
   - 設定 `themeColor`：淺色 `#F8F8F6`，深色 `#0C0E10`。行動裝置要加 `viewport-fit=cover`。
   - 專案自己的 CSS 若沒放進 layer，會蓋過 `@layer components` 裡的 class，發生衝突時先查這裡。

3. **對應業務語意。** 類別對應 `--cat-1`…`--cat-9`（冷到暖），人或資料序列對應 `--series-*`，主色用 `useAccent` 套上去。規則見 [color.md](references/color.md)。
4. **組畫面。** 先看 [screens.md](references/screens.md) 有沒有對應的畫面配方，再從 [components.md](references/components.md) 取元件。優先重用現有 class，缺的再新增，且新元件只引用 token，不寫死顏色。
5. **驗收。** 跑完下面的檢查清單，並實際截圖。

## 參考文件

依需求讀取，不必全讀：

- [references/color.md](references/color.md)：做配色、圖表、主題、自訂主色時。
- [references/type-and-layout.md](references/type-and-layout.md)：決定字級、文案語氣、間距、圓角時。
- [references/components.md](references/components.md)：使用或新增元件時，含每個 class 的用途和檔案對照。
- [references/screens.md](references/screens.md)：組整頁畫面時，含首頁、表單、分析、空狀態的配方。
- [references/motion.md](references/motion.md)：加動畫、處理載入狀態時。
- `assets/specimen.html`：免建置的樣張，直接用瀏覽器開啟，可切換明暗與主色，當成視覺基準。

## 驗收清單

- [ ] 明暗兩個主題、手機寬度（約 390px 與 320px）都截圖看過，沒有橫向捲動。
- [ ] 沒有寫死的顏色；所有顏色都來自 token 或色盤。
- [ ] 主要內容文字沒有比 `--ink-3` 更淡；小字色彩用 `--accent-ink`，不用 `--accent`。
- [ ] 金額、數量都加了 `.num`；中文字串沒有負字距。
- [ ] 小型控制項的觸控範圍仍有 44px（用 `::after` 擴張）。
- [ ] 只在 `@media (hover: hover)` 內寫 hover；有 `:focus-visible` 樣式。
- [ ] 開啟 `prefers-reduced-motion` 後動畫都停了，scroll-timeline 也要另外關閉。
- [ ] 快速操作不會閃 spinner；清單載入時顯示的是骨架，不是孤立的 spinner。
- [ ] 空狀態、篩選無結果、錯誤、離線都有設計過的畫面。

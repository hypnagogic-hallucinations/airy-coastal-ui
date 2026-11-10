# 畫面配方

以下取自 TripSpliter，已抽掉業務內容。範例使用 Tailwind 工具類。

## 應用外框

頂欄 + 單欄內容 + 底部懸浮 dock。切換分頁時內容回到頂部，並以 `key` 重新掛載來觸發 `.view-enter`。

```tsx
<div className="min-h-dvh">
  <header className="top-bar sticky top-0 z-10 pt-[env(safe-area-inset-top)]">
    <div className="mx-auto flex h-16 max-w-2xl items-center gap-0.5 px-3">
      {/* 左：可切換的標題（15px 半粗 + 12px 副標 + 收合箭頭）。右：2–4 個 .icon-btn */}
    </div>
  </header>
  <main className="mx-auto max-w-2xl px-4 pt-1 pb-36">
    <div key={view} className="view-enter">{/* 目前的分頁 */}</div>
  </main>
  <FloatingDock items={ITEMS} view={view} onChange={setView} onAdd={openForm} />
</div>
```

外觀設定（主題 `Segmented`、`AccentPicker`）收在頂欄的調色盤圖示 popover 內。

## 主列表頁

由上而下：沒有卡片的大數字 → 篩選工具列 → 依日期等維度分組的卡片。

```tsx
<div className="flex flex-col gap-6">
  <section className="hero-block px-1 pt-3">
    <p className="micro mb-2">{narrowed ? "FILTERED TOTAL" : "TOTAL"}</p>
    <AnimatedNumber value={total} unit="NT$" />
    <p className="mt-2 text-sm" style={{ color: "var(--ink-3)" }}>12 items · 3 days</p>
  </section>

  <div className="toolbar" data-searching={searching}>
    <div className="toolbar-chips" role="group" aria-label="Filter" inert={searching}>
      {/* .chip + .chip-dot，帶 --cat */}
    </div>
    <SearchField label="Search" value={q} onChange={setQ} collapsible={{ open: searching, onOpenChange: setSearching }} />
  </div>

  <div ref={listRef} className="relative flex flex-col gap-6">
    {groups.map((g, i) => (
      <section key={g.key} data-flip={g.key} className="rise relative flex flex-col gap-1.5" style={{ "--i": i } as React.CSSProperties}>
        <header className="flex items-baseline justify-between px-3">
          <h3 className="text-sm font-medium">{g.title}</h3>
          <span className="num text-xs" style={{ color: "var(--ink-3)" }}>{g.subtotal}</span>
        </header>
        <div className="card overflow-hidden p-1">{/* 列 */}</div>
      </section>
    ))}
  </div>
</div>
```

列的結構：左邊圓形類別圖示，中間標題加可換行的次要資訊，右邊對齊的數字。

```tsx
<button type="button" data-flip={id} className="list-row flex w-full cursor-pointer items-center gap-3 rounded-[14px] px-2.5 py-2.5 text-left">
  <span className="cat-tile h-9 w-9" style={{ "--cat": "var(--cat-3)" } as React.CSSProperties}><Icon size={16} strokeWidth={1.5} /></span>
  <span className="min-w-0 flex-1">
    <span className="block truncate text-sm font-medium">{title}</span>
    <span className="mt-0.5 flex flex-wrap gap-x-2 text-[11.5px]" style={{ color: "var(--ink-3)" }}>{meta}</span>
  </span>
  <span className="num shrink-0 text-right text-sm font-medium">{value}</span>
</button>
```

## 表單（在 Sheet 內）

新增與編輯共用同一張 Sheet。

```tsx
<Sheet title="NEW ITEM" onClose={close} footer={
  <div className="flex items-center gap-3">
    <div className="min-w-0 flex-1">
      <p className="micro" style={{ fontSize: 10 }}>TOTAL</p>
      <p className="num truncate text-lg font-light">{preview}</p>
    </div>
    <button type="button" className="btn btn-primary px-8" onClick={submit}>ADD</button>
  </div>
}>
  <div className="sheet-stack flex flex-col gap-6">
    {/* 最重要的欄位最大：.amount-field */}
    {/* 短欄位並排：grid grid-cols-[1fr_1.6fr] gap-3，每格用 <Field label="DATE"> */}
    {/* 類別：grid grid-cols-3 gap-1 的 .cat-option，下方列出 .pill 子類別 */}
    {/* 條件式欄位用 .reveal 出現 */}
  </div>
</Sheet>
```

原則：

- 主要動作固定在 footer，表單捲動時仍看得到，旁邊即時顯示結果預覽。
- 常用值排前面，新增項目預設填今天的日期等合理預設值。
- 多選一的選項直接攤開成 pill，不藏在下拉選單裡。
- 新增子項的輸入框在原地以 `.reveal` 展開，搭配 `.icon-btn` 的打勾和取消，不另開視窗。
- 錯誤訊息放在 footer 按鈕上方（`role="alert"`），才會在視線內。

## 分析頁

由上而下：大數字 → 篩選 → 圖表卡片 → 可切換維度的表格。

- 篩選預設收合，一顆 `.pill .pill-caps` 控制 `.disclosure`，有作用中的篩選時顯示小圓形計數徽章，並出現 `RESET`。
- 類別卡片：環圈圖在上，總額置中；下方是可展開的長條列（箭頭 + 圖示 + 標籤 + 金額 + 百分比 + `.bar-track`），展開後用 `.disclosure` 顯示子項，長條用同色 65% 透明度。
- 排序變動的清單用 `useFlip`。
- 表格：`w-full border-collapse`，列用 hairline 的 `border-b`，表頭是 10px `.micro` 按鈕並帶 `aria-sort`，數字靠右加 `.num`，無資料顯示 `—`。

圖表細節見 [color.md](color.md)。

## 結果與摘要頁

以 TripSpliter 的結算頁為例，每筆結果一張卡片，內容大而明確：

```tsx
<article className="card rise flex flex-col gap-3.5 p-5" style={{ "--i": i } as React.CSSProperties}>
  <div className="flex items-center gap-2.5 text-[15px]">
    <span>{from}</span>
    <ArrowRight size={16} strokeWidth={1.5} className="flow-arrow shrink-0" style={{ color: "var(--accent-ink)" }} />
    <span className="rounded-full px-3 py-1 font-medium" style={{ background: "var(--accent-soft)" }}>{to}</span>
  </div>
  <span className="num text-[28px] leading-none font-light tracking-[-0.015em]">
    <span className="mr-1.5 text-xs font-normal tracking-normal" style={{ color: "var(--ink-3)" }}>NT$</span>
    <CountUp value={amount} />
  </span>
</article>
```

**正負值長條：** 中央一條 `--hairline-strong` 基準線，正值用 `--accent` 向右、負值用 `--debit-soft` 向左，`transform-origin` 依方向設定。負數文字用 `--debit`，正數加 `+` 並維持 `--ink`。點擊整列可開 Sheet 看明細。

**複製動作：** 按下後圖示與文字用 `.swap` 換成 `COPIED`，約 1.8 秒後還原；被瀏覽器阻擋時顯示錯誤文字。

## 各種狀態

每個畫面都要處理，文案簡短且說明下一步。

| 狀態 | 呈現 |
|---|---|
| **全新無資料** | 置中、`py-14`；`text-lg font-light tracking-tight` 標題 + `--ink-3` 一句說明 + `.btn-primary` |
| **篩選無結果** | 只有一行置中的 `--ink-3` 小字，不給插圖 |
| **全部完成** | `.card` 裡放 `CircleCheck`（`--accent-ink`）配一句話 |
| **載入** | 骨架維持頁面形狀，延遲出現；見 [motion.md](motion.md) |
| **警示** | `flex gap-3 rounded-2xl p-4 text-sm`，`--warn-soft` 底加 `TriangleAlert`，說明被排除了什麼 |
| **離線** | 頂欄同步圖示換成 `CloudOff`（`--warn`）；`.micro` 狀態列顯示等待筆數 |
| **首次設定** | 畫面置中的 `.card .sheet-stack`，`max-w-md p-7`；`.micro` 產品名 + `text-2xl font-light` 標題 + 編號步驟 + 欄位 + `.btn-primary` |

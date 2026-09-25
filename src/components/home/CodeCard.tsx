/** Editor-style card showing a playful `engineer` object (static, zero JS). */
export function CodeCard() {
  const k = "text-sky";
  const s = "text-[#a5e3a0]";
  const p = "text-muted";
  return (
    <div className="border-line overflow-hidden rounded-2xl border bg-[#0b0b0c] shadow-2xl">
      <div className="border-line flex items-center gap-2 border-b px-4 py-3">
        <span className="size-3 rounded-full bg-[#fc605b]" />
        <span className="size-3 rounded-full bg-[#fdbc40]" />
        <span className="size-3 rounded-full bg-[#33c748]" />
        <span className="text-subtle ml-3 font-mono text-xs">engineer.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7 sm:text-sm">
        <code>
          <span className="text-[#c792ea]">const</span> <span className="text-white">engineer</span>{" "}
          <span className={p}>=</span> <span className={p}>{"{"}</span>
          {"\n"}
          {"  "}
          <span className={k}>name</span>
          <span className={p}>:</span> <span className={s}>&quot;Admire Ndaneta&quot;</span>
          <span className={p}>,</span>
          {"\n"}
          {"  "}
          <span className={k}>role</span>
          <span className={p}>:</span> <span className={s}>&quot;Full-Stack Engineer&quot;</span>
          <span className={p}>,</span>
          {"\n"}
          {"  "}
          <span className={k}>stack</span>
          <span className={p}>: [</span>
          <span className={s}>&quot;React&quot;</span>
          <span className={p}>, </span>
          <span className={s}>&quot;Next.js&quot;</span>
          <span className={p}>, </span>
          <span className={s}>&quot;Node&quot;</span>
          <span className={p}>, </span>
          <span className={s}>&quot;Postgres&quot;</span>
          <span className={p}>],</span>
          {"\n"}
          {"  "}
          <span className={k}>experience</span>
          <span className={p}>:</span> <span className="text-[#f78c6c]">6</span>
          <span className={p}>,</span> <span className="text-subtle">{"// years"}</span>
          {"\n"}
          {"  "}
          <span className={k}>shipIt</span>
          <span className={p}>: () =&gt; {"{"}</span>
          {"\n"}
          {"    "}
          <span className="text-[#82aaff]">test</span>
          <span className={p}>();</span> <span className="text-[#82aaff]">review</span>
          <span className={p}>();</span> <span className="text-[#82aaff]">deploy</span>
          <span className={p}>();</span>
          {"\n"}
          {"  "}
          <span className={p}>{"},"}</span>
          {"\n"}
          <span className={p}>{"};"}</span>
          <span className="animate-blink bg-accent-soft ml-0.5 inline-block h-4 w-2 translate-y-0.5" aria-hidden />
        </code>
      </pre>
    </div>
  );
}

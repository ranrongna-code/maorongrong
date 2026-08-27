import { useState } from "react";
import { useApp } from "../store";
import { Screen, Masonry, PetRow, Empty, InitialLoading } from "../ui";
import * as I from "../icons";

export function Search() {
  const { s, pop, activePosts, pet } = useApp();
  const [q, setQ] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [tab, setTab] = useState<"宠物" | "帖子">("宠物");
  const [loading, setLoading] = useState(false);

  const run = () => {
    const t = q.trim();
    if (!t) return;
    setLoading(true); setSubmitted(t);
    setTimeout(() => setLoading(false), 500);
  };

  const petResults = s.pets.filter((p) => p.active &&
    (p.name.includes(submitted) || (p.breed ?? "").includes(submitted) || (p.species ?? "").includes(submitted)));
  const postResults = activePosts().filter((po) => {
    const pt = pet(po.petId);
    return po.title.includes(submitted) || (po.body ?? "").includes(submitted) || (pt?.name ?? "").includes(submitted);
  });

  return (
    <div className="h-full flex flex-col bg-bg">
      <div className="sticky top-0 z-20 bg-bg/95 backdrop-blur">
        <div className="h-11" />
        <div className="h-12 flex items-center gap-2 px-3">
          <div className="flex-1 h-10 rounded-full bg-surface border border-line flex items-center gap-2 px-3">
            <I.Search size={18} className="text-ink3" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="搜索宠物、动态" className="flex-1 outline-none bg-transparent text-[15px] placeholder:text-ink3" />
            {q && <button onClick={() => { setQ(""); setSubmitted(""); }}><I.X size={16} className="text-ink3" /></button>}
          </div>
          <button onClick={pop} className="text-ink2 text-[15px] px-1">取消</button>
        </div>
      </div>

      {!submitted ? (
        <div className="flex-1 flex items-center justify-center text-ink3 text-sm">输入关键词，找找可爱的小家伙</div>
      ) : (
        <>
          <div className="flex border-b border-line">
            {(["宠物", "帖子"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-3 text-[15px] ${tab === t ? "font-bold text-ink border-b-2 border-brand" : "text-ink3"}`}>{t}</button>
            ))}
          </div>
          <Screen className="flex-1 pt-3">
            {loading ? <InitialLoading /> : tab === "宠物" ? (
              petResults.length ? <div className="divide-y divide-line">{petResults.map((p) => <PetRow key={p.id} pet={p} />)}</div>
                : <Empty title="没有找到相关内容" sub="换个关键词试试吧。" icon={<I.Search size={38} />} />
            ) : (
              postResults.length ? <Masonry posts={postResults} />
                : <Empty title="没有找到相关内容" sub="换个关键词试试吧。" icon={<I.Search size={38} />} />
            )}
          </Screen>
        </>
      )}
    </div>
  );
}

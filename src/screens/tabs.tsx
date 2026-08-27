import { useState } from "react";
import { useApp, relTime, kFmt, completion } from "../store";
import { CATEGORIES } from "../data";
import {
  Screen, Masonry, Avatar, FollowButton, TabBarTop, InitialLoading, LoadError, EndOfList,
  Empty, BottomSentinel, useList, Button,
} from "../ui";
import * as I from "../icons";

/* ============ HOME ============ */
export function Home() {
  const [tab, setTab] = useState<"推荐" | "关注">("推荐");
  return (
    <Screen>
      <div className="sticky top-0 z-20 bg-bg/92 backdrop-blur">
        <div className="h-11" />
        <div className="h-12 flex items-center justify-center">
          <TabBarTop tabs={["关注", "推荐"]} value={tab} onChange={(t) => setTab(t as any)} />
        </div>
      </div>
      <div className="pt-2 pb-4">
        {tab === "推荐" ? <RecommendedFeed /> : <FollowingFeed />}
      </div>
    </Screen>
  );
}

function RecommendedFeed() {
  const { recommended } = useApp();
  const L = useList(recommended(), { pageSize: 6 });
  if (L.phase === "loading") return <InitialLoading />;
  if (L.phase === "error") return <LoadError onRetry={L.retry} />;
  return (
    <>
      <Masonry posts={L.items} />
      <BottomSentinel onHit={L.loadMore} />
      <EndOfList hasMore={L.hasMore} more={L.more} />
    </>
  );
}

function FollowingFeed() {
  const { following, setTab } = useApp();
  const all = following();
  const L = useList(all, { pageSize: 6, failFirst: true });
  if (all.length === 0)
    return (
      <Empty title="这里还安静得像猫咪睡着了一样。" sub="去认识一些你喜欢的小家伙吧。"
        cta="去发现" onCta={() => setTab("discover")} />
    );
  if (L.phase === "loading") return <InitialLoading />;
  if (L.phase === "error") return <LoadError onRetry={L.retry} />;
  return (
    <>
      <Masonry posts={L.items} />
      <BottomSentinel onHit={L.loadMore} />
      <EndOfList hasMore={L.hasMore} more={L.more} />
    </>
  );
}

/* ============ DISCOVER ============ */
export function Discover() {
  const { s, push } = useApp();
  const active = s.pets.filter((p) => p.active);
  const trending = [...active].sort((a, b) => b.followers - a.followers).slice(0, 6);
  const recommend = active.filter((p) => !s.follows.includes(p.id) && !p.mine);
  return (
    <Screen className="pb-4">
      <div className="sticky top-0 z-20 bg-bg/92 backdrop-blur">
        <div className="h-11" />
        <div className="h-12 flex items-center px-4"><span className="text-[20px] font-bold">发现</span></div>
      </div>

      <div className="px-4 pt-1">
        <button onClick={() => push("search")}
          className="w-full h-11 rounded-full bg-surface border border-line flex items-center gap-2 px-4 text-ink3 text-sm">
          <I.Search size={18} /><span>搜索宠物、动态</span>
        </button>
      </div>

      <div className="grid grid-cols-6 gap-1 px-3 mt-5">
        {CATEGORIES.map((c) => {
          const rep = active.find((p) => p.category === c);
          return (
            <button key={c} onClick={() => push("category", { category: c })}
              className="flex flex-col items-center gap-1.5 py-1">
              <span className="w-12 h-12 rounded-full bg-cream overflow-hidden flex items-center justify-center">
                {rep ? <img src={rep.avatar} alt={c} className="w-full h-full object-cover" />
                  : <I.Paw size={22} className="text-brand/60" />}
              </span>
              <span className="text-[11px] text-ink2">{c}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <h2 className="px-4 font-bold text-[16px] mb-3">大家最近都在关注</h2>
        <div className="flex gap-3 overflow-x-auto scroll-area px-4 pb-1">
          {trending.map((p) => (
            <button key={p.id} onClick={() => push("pet", { id: p.id })}
              className="shrink-0 w-32 bg-surface rounded-2xl p-3 text-center shadow-[0_1px_10px_rgba(120,90,60,0.05)]">
              <Avatar src={p.avatar} size={64} />
              <div className="mt-2 font-medium text-sm truncate">{p.name}</div>
              <div className="text-[11px] text-ink3 truncate">{p.breed ?? p.category}</div>
              <div className="text-[11px] text-ink3 mt-0.5">{kFmt(p.followers)} 粉丝</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="px-4 font-bold text-[16px] mb-1">推荐认识</h2>
        <div className="divide-y divide-line">
          {recommend.map((p) => (
            <div role="button" key={p.id} onClick={() => push("pet", { id: p.id })}
              className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-cream/60 cursor-pointer">
              <Avatar src={p.avatar} size={50} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[15px] truncate">{p.name}</div>
                <div className="text-[12px] text-ink3 truncate">{[p.breed ?? p.category, p.gender, p.approxAge].filter(Boolean).join(" · ")}</div>
                <div className="text-[12px] text-ink3">{kFmt(p.followers)} 粉丝</div>
              </div>
              <FollowButton id={p.id} small />
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

/* ============ MESSAGES ============ */
export function Messages() {
  const { s, d, push } = useApp();
  const dot = (v: boolean) => v && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger" />;
  const cat = (label: string, kind: "like" | "comment" | "follow", key: "like" | "comment" | "follow") => (
    <button onClick={() => { d({ t: "clear-dot", k: key }); push("msgList", { kind }); }}
      className="relative flex-1 flex flex-col items-center gap-2 py-4 bg-surface rounded-2xl">
      <span className="w-11 h-11 rounded-full bg-brand-soft text-brand-deep flex items-center justify-center">
        {kind === "like" ? <I.Paw size={22} /> : kind === "comment" ? <I.Comment size={22} /> : <I.UserI size={22} />}
      </span>
      <span className="text-[12px] text-ink2">{label}</span>
      {dot(s.dots[key])}
    </button>
  );
  const recent = [...s.messages].sort((a, b) => b.createdAt - a.createdAt);
  return (
    <Screen className="pb-4">
      <div className="sticky top-0 z-20 bg-bg/92 backdrop-blur">
        <div className="h-11" />
        <div className="h-12 flex items-center px-4"><span className="text-[20px] font-bold">消息</span></div>
      </div>
      <div className="flex gap-3 px-4 pt-2">
        {cat("赞与收藏", "like", "like")}
        {cat("评论回复", "comment", "comment")}
        {cat("新关注", "follow", "follow")}
      </div>
      <h2 className="px-4 mt-6 mb-1 font-bold text-[15px]">最近消息</h2>
      <div className="divide-y divide-line">
        {recent.map((m) => <MsgRow key={m.id} m={m} />)}
      </div>
    </Screen>
  );
}

export function MsgRow({ m }: { m: any }) {
  const { s, push } = useApp();
  const go = () => {
    if (m.postId) { push("post", { id: m.postId, focusComment: m.commentId }); return; }
    const pid = s.pets.find((p) => p.name === m.petName)?.id;
    if (pid) push("pet", { id: pid });
  };
  return (
    <button onClick={go} className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-cream/60">
      <Avatar src={m.actorAvatar} size={44} />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] truncate"><span className="font-medium">{m.actor}</span> <span className="text-ink2">{m.text}</span></p>
        <p className="text-[12px] text-ink3 mt-0.5">{relTime(m.createdAt)}</p>
      </div>
      {m.thumb
        ? <img src={m.thumb} alt="" className="w-11 h-11 rounded-lg object-cover bg-cream" />
        : m.petAvatar && <Avatar src={m.petAvatar} size={44} />}
    </button>
  );
}

/* ============ PROFILE ============ */
export function Profile() {
  const { s, push } = useApp();
  const myPets = s.pets.filter((p) => p.mine && p.active);
  const entry = (label: string, name: string, props?: any) => (
    <button onClick={() => push(name, props)}
      className="w-full flex items-center px-4 py-4 active:bg-cream/60">
      <span className="text-[15px]">{label}</span>
      <I.ChevronRight size={18} className="ml-auto text-ink3" />
    </button>
  );
  return (
    <Screen className="pb-4">
      <div className="h-11" />
      <div className="px-5 pt-4 flex items-start gap-4">
        <Avatar src={s.owner.avatar} size={64} />
        <div className="flex-1 min-w-0 pt-1">
          <div className="text-[19px] font-bold truncate">{s.owner.name}</div>
          <div className="text-[13px] text-ink2 mt-1 truncate">{s.owner.bio || "还没有简介"}</div>
        </div>
        <div className="flex flex-col gap-2 items-end pt-1">
          <button onClick={() => push("editOwner")} className="text-ink3"><I.Edit size={20} /></button>
          <button onClick={() => push("settings")} className="text-ink3"><I.Settings size={20} /></button>
        </div>
      </div>

      <div className="mt-6 mx-4 bg-surface rounded-2xl p-4">
        <div className="flex items-center mb-3">
          <span className="font-bold text-[15px]">我的宠物</span>
          <button onClick={() => push("petManage")} className="ml-auto text-[13px] text-ink3">管理</button>
        </div>
        <div className="flex gap-4 overflow-x-auto scroll-area">
          {myPets.map((p) => (
            <button key={p.id} onClick={() => push("pet", { id: p.id })} className="shrink-0 text-center w-16">
              <Avatar src={p.avatar} size={56} />
              <div className="text-[12px] mt-1 truncate">{p.name}</div>
            </button>
          ))}
          <button onClick={() => push("petCreate", { from: "manage" })} className="shrink-0 text-center w-16">
            <span className="w-14 h-14 rounded-full border-2 border-dashed border-brand/40 text-brand flex items-center justify-center mx-auto">
              <I.Plus size={22} />
            </span>
            <div className="text-[12px] mt-1 text-ink3">添加宠物</div>
          </button>
        </div>
      </div>

      <div className="mt-5 mx-4 bg-surface rounded-2xl divide-y divide-line overflow-hidden">
        {entry("我的宠物", "petManage")}
        {entry("我的发布", "myPosts")}
        {entry("我的收藏", "myFavorites")}
        {entry("我关注的宠物", "myFollowing")}
      </div>
    </Screen>
  );
}

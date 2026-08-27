import { useEffect, useRef, useState, type ReactNode } from "react";
import * as I from "./icons";
import { useApp, relTime, petMeta, kFmt, type Tab } from "./store";
import type { Pet, Post } from "./data";

/* ---------- Buttons ---------- */
export function Button({ children, onClick, disabled, loading, variant = "primary", full, small }: {
  children: ReactNode; onClick?: () => void; disabled?: boolean; loading?: boolean;
  variant?: "primary" | "ghost" | "soft" | "danger"; full?: boolean; small?: boolean;
}) {
  const styles = {
    primary: "bg-brand text-white active:bg-brand-deep disabled:bg-brand/40",
    danger: "bg-danger text-white active:opacity-90 disabled:opacity-40",
    soft: "bg-brand-soft text-brand-deep active:bg-brand-soft/70 disabled:opacity-50",
    ghost: "bg-transparent text-ink2 border border-line active:bg-cream disabled:opacity-40",
  }[variant];
  return (
    <button disabled={disabled || loading} onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full font-medium
        transition ${small ? "px-4 h-9 text-sm" : "px-6 h-12 text-[15px]"} ${full ? "w-full" : ""} ${styles}`}>
      {loading && <I.Spinner size={small ? 16 : 18} />}
      {children}
    </button>
  );
}

/* ---------- Chrome ---------- */
export function TopBar({ title, right, onBack, transparent }: {
  title?: string; right?: ReactNode; onBack?: () => void; transparent?: boolean;
}) {
  const { pop } = useApp();
  return (
    <div className={`sticky top-0 z-20 ${transparent ? "" : "bg-bg/92 backdrop-blur border-b border-line"}`}>
      <div className="h-11" />
      <div className="h-12 flex items-center px-2 relative">
        <button onClick={onBack ?? pop} className="w-10 h-10 flex items-center justify-center text-ink -ml-1 active:opacity-60">
          <I.ChevronLeft />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 font-medium text-[17px] truncate max-w-[60%]">{title}</div>
        <div className="ml-auto flex items-center pr-1">{right}</div>
      </div>
    </div>
  );
}

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`flex-1 min-h-0 overflow-y-auto scroll-area ${className ?? ""}`}>{children}</div>;
}

/* ---------- Avatars & stats ---------- */
export function Avatar({ src, size = 44, ring }: { src: string; size?: number; ring?: boolean }) {
  return (
    <img src={src} alt="" width={size} height={size}
      className={`rounded-full object-cover bg-cream shrink-0 ${ring ? "ring-2 ring-white" : ""}`}
      style={{ width: size, height: size }} />
  );
}

export function PawStat({ post }: { post: Post }) {
  const { d } = useApp();
  const [pop, setPop] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); d({ t: "toggle-like", id: post.id }); setPop(true); setTimeout(() => setPop(false), 340); }}
      className={`flex items-center gap-1 text-[13px] ${post.liked ? "text-brand" : "text-ink3"}`}>
      <I.Paw size={18} fill={post.liked} className={pop ? "anim-paw" : ""} />
      <span>{kFmt(post.likes)}</span>
    </button>
  );
}

export function FollowButton({ id, small }: { id: string; small?: boolean }) {
  const { isFollowing, d, toast } = useApp();
  const on = isFollowing(id);
  return (
    <button onClick={(e) => {
      e.stopPropagation();
      d({ t: "toggle-follow", id });
      toast(on ? "已取消关注" : "关注成功");
    }}
      className={`rounded-full font-medium transition ${small ? "h-8 px-4 text-[13px]" : "h-9 px-5 text-sm"}
        ${on ? "bg-cream text-ink2 border border-line" : "bg-brand text-white active:bg-brand-deep"}`}>
      {on ? "已关注" : "＋关注"}
    </button>
  );
}

/* ---------- Post card (masonry) ---------- */
export function PostCard({ post }: { post: Post }) {
  const { pet, push, commentCount } = useApp();
  const p = pet(post.petId)!;
  const inactive = !p.active;
  return (
    <div role="button" onClick={() => push("post", { id: post.id })}
      className="block w-full text-left bg-surface rounded-2xl overflow-hidden shadow-[0_1px_10px_rgba(120,90,60,0.06)] active:scale-[0.99] transition cursor-pointer">
      <div className="bg-cream">
        <img src={post.images[0]} alt={post.title} className="w-full object-cover block" loading="lazy" />
      </div>
      <div className="p-2.5">
        <p className="text-[14px] leading-snug text-ink line-clamp-2 font-medium">{post.title}</p>
        <div className="mt-2 flex items-center gap-1.5">
          <Avatar src={p.avatar} size={22} />
          <span className="text-[12px] text-ink2 truncate flex-1">{p.name}</span>
          {inactive && <span className="text-[10px] text-ink3 shrink-0">已停用</span>}
        </div>
        <div className="mt-1.5 flex items-center gap-3 text-ink3">
          <PawStat post={post} />
          <span className="flex items-center gap-1 text-[13px]"><I.Comment size={16} />{commentCount(post.id)}</span>
        </div>
      </div>
    </div>
  );
}

export function Masonry({ posts }: { posts: Post[] }) {
  return (
    <div className="masonry px-3">
      {posts.map((p) => <PostCard key={p.id} post={p} />)}
    </div>
  );
}

/* ---------- Pet list row ---------- */
export function PetRow({ pet, action }: { pet: Pet; action?: ReactNode }) {
  const { push } = useApp();
  return (
    <div role="button" onClick={() => push("pet", { id: pet.id })}
      className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-cream/60 cursor-pointer">
      <Avatar src={pet.avatar} size={52} />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[15px] truncate">{pet.name}</div>
        <div className="text-[12px] text-ink3 truncate mt-0.5">{petMeta(pet) || pet.category}</div>
        <div className="text-[12px] text-ink3 mt-0.5">{kFmt(pet.followers)} 粉丝</div>
      </div>
      {action ?? <FollowButton id={pet.id} small />}
    </div>
  );
}

/* ---------- List loading states ---------- */
export function useList<T>(all: T[], opts: { pageSize?: number; failFirst?: boolean } = {}) {
  const { pageSize = 6, failFirst } = opts;
  const [phase, setPhase] = useState<"loading" | "error" | "ready">("loading");
  const [shown, setShown] = useState(pageSize);
  const [more, setMore] = useState(false);
  const attempt = useRef(0);
  useEffect(() => {
    const t = setTimeout(() => {
      setPhase(failFirst && attempt.current === 0 ? "error" : "ready");
    }, 650);
    return () => clearTimeout(t);
  }, []);
  const retry = () => {
    attempt.current++; setPhase("loading");
    setTimeout(() => setPhase("ready"), 650);
  };
  const items = all.slice(0, shown);
  const hasMore = shown < all.length;
  const loadMore = () => {
    if (more || !hasMore) return;
    setMore(true);
    setTimeout(() => { setShown((s) => s + pageSize); setMore(false); }, 700);
  };
  return { phase, items, hasMore, more, retry, loadMore };
}

export function InitialLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-ink3 gap-3">
      <I.Spinner size={26} className="text-brand" />
      <span className="text-sm">正在加载…</span>
    </div>
  );
}
export function LoadError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <p className="text-ink2 text-sm">网络开小差了，请稍后再试</p>
      <Button variant="soft" small onClick={onRetry}>重新加载</Button>
    </div>
  );
}
export function EndOfList({ hasMore, more }: { hasMore: boolean; more: boolean }) {
  if (more) return <div className="py-6 flex justify-center text-ink3"><I.Spinner size={20} /></div>;
  if (hasMore) return <div className="py-6" />;
  return <div className="py-7 text-center text-[12px] text-ink3">· 没有更多了 ·</div>;
}
export function Empty({ icon, title, sub, cta, onCta }: {
  icon?: ReactNode; title: string; sub?: string; cta?: string; onCta?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-10 text-center gap-2">
      <div className="text-brand/70 mb-1">{icon ?? <I.Paw size={40} />}</div>
      <p className="text-ink font-medium">{title}</p>
      {sub && <p className="text-ink3 text-sm leading-relaxed">{sub}</p>}
      {cta && <div className="mt-3"><Button variant="soft" small onClick={onCta}>{cta}</Button></div>}
    </div>
  );
}

/* auto load-more sentinel */
export function BottomSentinel({ onHit }: { onHit: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) onHit(); });
    io.observe(el); return () => io.disconnect();
  });
  return <div ref={ref} className="h-1" />;
}

/* ---------- Bottom sheet ---------- */
export function Sheet({ children, onClose, title }: { children: ReactNode; onClose: () => void; title?: string }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/35 anim-fade" onClick={onClose} />
      <div className="relative bg-surface rounded-t-3xl anim-sheet max-h-[85%] flex flex-col">
        {title && <div className="text-center py-4 font-medium border-b border-line">{title}</div>}
        <div className="overflow-y-auto scroll-area">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Tags / fields ---------- */
export function Chip({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className={`px-3 h-8 rounded-full text-[13px] border transition ${active
        ? "bg-brand-soft text-brand-deep border-brand-soft" : "bg-surface text-ink2 border-line"}`}>
      {children}
    </button>
  );
}

export function Field({ label, children, required }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <div className="px-4 py-3.5 border-b border-line">
      <div className="text-[13px] text-ink3 mb-2">{label}{required && <span className="text-brand"> *</span>}</div>
      {children}
    </div>
  );
}

/* ---------- shared tab pill ---------- */
export function TabBarTop({ tabs, value, onChange }: { tabs: string[]; value: string; onChange: (t: string) => void }) {
  return (
    <div className="flex justify-center gap-8">
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)} className="relative py-1">
          <span className={`text-[17px] transition ${value === t ? "font-bold text-ink" : "text-ink3"}`}>{t}</span>
          {value === t && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full bg-brand" />}
        </button>
      ))}
    </div>
  );
}

/* ---------- Bottom navigation ---------- */
export function BottomNav() {
  const { s, setTab, push, d } = useApp();
  const item = (tab: Tab, icon: (a: any) => ReactNode, label: string) => {
    const active = s.tab === tab;
    return (
      <button key={tab} onClick={() => { if (tab === "messages") d({ t: "clear-dot", k: "bottom" }); setTab(tab); }}
        className="flex-1 flex flex-col items-center gap-0.5 py-2 relative">
        <span className={active ? "text-brand" : "text-ink3"}>{icon({ size: 24, fill: active })}</span>
        <span className={`text-[10px] ${active ? "text-brand font-medium" : "text-ink3"}`}>{label}</span>
        {tab === "messages" && s.dots.bottom &&
          <span className="absolute top-1.5 right-[calc(50%-14px)] w-2 h-2 rounded-full bg-danger" />}
      </button>
    );
  };
  return (
    <div className="border-t border-line bg-surface/95 backdrop-blur flex items-end px-1 pb-[env(safe-area-inset-bottom)]">
      {item("home", I.Home, "首页")}
      {item("discover", I.Compass, "发现")}
      <button onClick={() => push("publish")} className="flex-1 flex justify-center -mt-4">
        <span className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/30 active:bg-brand-deep">
          <I.Plus size={26} />
        </span>
      </button>
      {item("messages", I.Bell, "消息")}
      {item("profile", I.UserI, "我的")}
    </div>
  );
}

/* ---------- Toast + Dialog hosts ---------- */
export function ToastHost() {
  const { s, d } = useApp();
  useEffect(() => {
    if (!s.toast) return;
    const id = s.toast.id;
    const t = setTimeout(() => d({ t: "toast-clear", id }), 1800);
    return () => clearTimeout(t);
  }, [s.toast?.id]);
  if (!s.toast) return null;
  return (
    <div className="absolute z-[60] left-1/2 bottom-28 anim-toast">
      <div className="bg-ink/90 text-white text-sm px-4 py-2.5 rounded-xl max-w-[70vw] text-center">{s.toast.text}</div>
    </div>
  );
}

export function DialogHost() {
  const { s, closeDialog } = useApp();
  const dg = s.dialog;
  if (!dg) return null;
  return (
    <div className="absolute inset-0 z-[70] flex items-center justify-center px-8">
      <div className="absolute inset-0 bg-black/35 anim-fade" onClick={closeDialog} />
      <div className="relative bg-surface rounded-2xl w-full max-w-[300px] overflow-hidden anim-fade">
        <div className="px-5 pt-6 pb-5 text-center">
          <p className="font-medium text-[16px]">{dg.title}</p>
          {dg.desc && <p className="text-ink2 text-[13px] mt-2 leading-relaxed">{dg.desc}</p>}
        </div>
        <div className="grid grid-cols-2 border-t border-line">
          <button onClick={closeDialog} className="py-3.5 text-ink2 border-r border-line active:bg-cream">
            {dg.cancelText ?? "取消"}
          </button>
          <button onClick={() => { closeDialog(); dg.onConfirm(); }}
            className={`py-3.5 font-medium active:bg-cream ${dg.danger ? "text-danger" : "text-brand"}`}>
            {dg.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Fullscreen image viewer ---------- */
export function ImageViewer({ images, start, onClose, onIndexChange }: {
  images: string[]; start: number; onClose: () => void; onIndexChange?: (i: number) => void;
}) {
  const [i, setI] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = ref.current; if (el) el.scrollLeft = start * el.clientWidth; }, []);
  return (
    <div className="absolute inset-0 z-[80] bg-black flex flex-col anim-fade">
      <div className="h-11" />
      <div className="h-12 flex items-center justify-between px-4 text-white">
        <button onClick={onClose}><I.X /></button>
        <span className="text-sm">{i + 1} / {images.length}</span>
        <span className="w-6" />
      </div>
      <div ref={ref} className="flex-1 overflow-x-auto scroll-area flex snap-x snap-mandatory"
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollLeft / el.clientWidth);
          setI(idx); onIndexChange?.(idx);
        }}>
        {images.map((src, idx) => (
          <div key={idx} className="min-w-full snap-center flex items-center justify-center">
            <img src={src} alt="" className="max-w-full max-h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

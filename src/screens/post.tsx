import { useEffect, useMemo, useRef, useState } from "react";
import { useApp, fullTime, relTime, petMeta, kFmt } from "../store";
import type { Comment } from "../data";
import {
  Screen, TopBar, Avatar, FollowButton, Sheet, Button, Empty, ImageViewer,
} from "../ui";
import * as I from "../icons";
import { NOW } from "../data";

export function PostDetail({ id, focusComment }: { id: string; focusComment?: string }) {
  const { post, pet, d, toast, dialog, s, push, pop, commentCount } = useApp();
  const p = post(id);
  const [viewer, setViewer] = useState<number | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [inputOpen, setInputOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!p || p.deleted) {
    return (
      <div className="h-full flex flex-col bg-bg">
        <TopBar title="动态详情" />
        <Empty title="该内容已不存在" sub="这条动态可能已被作者删除。" />
      </div>
    );
  }
  const pet0 = pet(p.petId)!;
  const isMine = pet0.mine;

  const doDelete = () =>
    dialog({
      title: "确定删除这条动态吗？", desc: "删除后将不再对外展示。", confirmText: "删除", danger: true,
      onConfirm: () => { d({ t: "delete-post", id: p.id }); toast("已删除"); pop(); },
    });

  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="动态详情" right={isMine && (
        <div className="flex gap-1">
          <button onClick={() => push("publish", { editId: p.id })} className="px-2 text-ink2"><I.Edit size={20} /></button>
          <button onClick={doDelete} className="px-2 text-ink2"><I.Trash size={20} /></button>
        </div>
      )} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-area">
        {/* pet header */}
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => pet0.active && push("pet", { id: pet0.id })} className="flex items-center gap-3 flex-1 min-w-0 text-left">
            <Avatar src={pet0.avatar} size={44} />
            <div className="min-w-0">
              <div className="font-medium truncate flex items-center gap-2">
                {pet0.name}{!pet0.active && <span className="text-[10px] text-ink3 font-normal">档案已停用</span>}
              </div>
              <div className="text-[12px] text-ink3 truncate">{petMeta(pet0)}</div>
            </div>
          </button>
          {!isMine && pet0.active && <FollowButton id={pet0.id} small />}
        </div>

        {/* content: title → horizontal image carousel → body → time */}
        <div className="px-4 pb-3">
          <h1 className="text-[19px] font-bold leading-snug">{p.title}</h1>
        </div>
        <ImageCarousel images={p.images} index={imgIndex} setIndex={setImgIndex} onOpen={() => setViewer(imgIndex)} />
        {p.body && <p className="px-4 pt-4 text-[15px] text-ink leading-relaxed whitespace-pre-wrap">{p.body}</p>}
        <div className="px-4 py-4 text-[12px] text-ink3">{fullTime(p.createdAt)}</div>

        {/* comments */}
        <div className="border-t-8 border-cream px-4 py-4">
          <h2 className="font-bold mb-3">评论 {commentCount(p.id)}</h2>
          <CommentList postId={p.id} focusComment={focusComment}
            onReply={(c) => { setReplyTo(c); setInputOpen(true); }} />
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-line bg-surface flex items-center gap-3 px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <button onClick={() => { setReplyTo(null); setInputOpen(true); }}
          className="flex-1 h-10 rounded-full bg-cream text-ink3 text-sm text-left px-4">说点什么…</button>
        <button onClick={() => { d({ t: "toggle-like", id: p.id }); }}
          className={`flex flex-col items-center text-[11px] ${p.liked ? "text-brand" : "text-ink3"}`}>
          <I.Paw size={24} fill={p.liked} /><span>{kFmt(p.likes)}</span>
        </button>
        <button onClick={() => { setReplyTo(null); setInputOpen(true); }} className="flex flex-col items-center text-[11px] text-ink3">
          <I.Comment size={24} /><span>{commentCount(p.id)}</span>
        </button>
        <button onClick={() => { d({ t: "toggle-fav", id: p.id }); toast(p.favorited ? "已取消收藏" : "收藏成功"); }}
          className={`flex flex-col items-center text-[11px] ${p.favorited ? "text-brand" : "text-ink3"}`}>
          <I.Bookmark size={24} fill={p.favorited} /><span>收藏</span>
        </button>
      </div>

      {viewer !== null && <ImageViewer images={p.images} start={viewer}
        onIndexChange={setImgIndex} onClose={() => setViewer(null)} />}
      {inputOpen && <CommentInput postId={p.id} replyTo={replyTo} onClose={() => { setInputOpen(false); setReplyTo(null); }} />}
    </div>
  );
}

function ImageCarousel({ images, index, setIndex, onOpen }: {
  images: string[]; index: number; setIndex: (i: number) => void; onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const multi = images.length > 1;
  // sync DOM position when index is changed externally (e.g. returning from fullscreen)
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const dom = Math.round(el.scrollLeft / el.clientWidth);
    if (dom !== index) el.scrollTo({ left: index * el.clientWidth });
  }, [index]);
  return (
    <div className="relative px-4">
      <div ref={ref}
        className="flex overflow-x-auto scroll-area snap-x snap-mandatory rounded-2xl bg-cream"
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}>
        {images.map((src, i) => (
          <div key={i} className="min-w-full snap-center flex items-center justify-center"
            onClick={onOpen}>
            <img src={src} alt="" className="w-full max-h-[68vh] object-contain block" />
          </div>
        ))}
      </div>
      {multi && (
        <div className="absolute top-3 right-7 bg-black/45 text-white text-[12px] px-2 py-0.5 rounded-full">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

function CommentList({ postId, onReply, focusComment }: {
  postId: string; onReply: (c: Comment) => void; focusComment?: string;
}) {
  const { commentsFor } = useApp();
  const all = commentsFor(postId);
  const roots = all.filter((c) => !c.parentId).sort((a, b) => a.createdAt - b.createdAt);
  const repliesOf = (rootId: string) =>
    all.filter((c) => c.parentId === rootId).sort((a, b) => a.createdAt - b.createdAt);

  // find which root contains the focus target
  const focusRoot = useMemo(() => {
    if (!focusComment) return undefined;
    const target = all.find((c) => c.id === focusComment);
    if (!target) return undefined;
    return target.parentId ?? target.id;
  }, [focusComment]);

  if (roots.length === 0)
    return <p className="text-ink3 text-sm py-8 text-center">还没有评论，来抢沙发吧</p>;

  return (
    <div className="flex flex-col gap-5">
      {roots.map((c) => (
        <CommentThread key={c.id} root={c} replies={repliesOf(c.id)} onReply={onReply}
          expandInitially={focusRoot === c.id} focusComment={focusComment} />
      ))}
    </div>
  );
}

function CommentThread({ root, replies, onReply, expandInitially, focusComment }: {
  root: Comment; replies: Comment[]; onReply: (c: Comment) => void;
  expandInitially?: boolean; focusComment?: string;
}) {
  const [expanded, setExpanded] = useState(!!expandInitially);
  const shown = expanded ? replies : replies.slice(0, 2);
  const rest = replies.length - shown.length;
  return (
    <div>
      <CommentItem c={root} onReply={onReply} focus={focusComment === root.id} />
      {shown.length > 0 && (
        <div className="ml-11 mt-3 flex flex-col gap-3">
          {shown.map((r) => <CommentItem key={r.id} c={r} onReply={onReply} reply focus={focusComment === r.id} />)}
        </div>
      )}
      {rest > 0 && (
        <button onClick={() => setExpanded(true)} className="ml-11 mt-2 text-[13px] text-brand-deep">
          展开更多 {rest} 条回复
        </button>
      )}
    </div>
  );
}

function CommentItem({ c, onReply, reply, focus }: {
  c: Comment; onReply: (c: Comment) => void; reply?: boolean; focus?: boolean;
}) {
  const { d, dialog, toast } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (focus) ref.current?.scrollIntoView({ block: "center", behavior: "smooth" }); }, [focus]);

  if (c.deleted)
    return <div ref={ref} className={`text-[13px] text-ink3 py-1 ${focus ? "anim-hl rounded-lg px-2" : ""}`}>
      {reply ? "该回复已删除" : "该评论已删除"}
    </div>;

  return (
    <div ref={ref} className={`flex gap-2.5 ${focus ? "anim-hl rounded-lg -mx-1 px-1" : ""}`}>
      {!reply && <Avatar src={c.userAvatar} size={34} />}
      {reply && <Avatar src={c.userAvatar} size={26} />}
      <div className="flex-1 min-w-0">
        <div className="text-[13px] text-ink2">
          {c.userName}{c.replyTo && <span className="text-ink3"> 回复 {c.replyTo}</span>}
        </div>
        <div className="text-[14px] mt-0.5">{c.content}</div>
        <div className="flex items-center gap-4 mt-1 text-[12px] text-ink3">
          <span>{relTime(c.createdAt)}</span>
          <button onClick={() => onReply(c)}>回复</button>
          {c.mine && <button onClick={() => dialog({
            title: reply ? "确定删除这条回复吗？" : "确定删除这条评论吗？", confirmText: "删除", danger: true,
            onConfirm: () => { d({ t: "delete-comment", id: c.id }); toast("已删除"); },
          })}>删除</button>}
        </div>
      </div>
    </div>
  );
}

function CommentInput({ postId, replyTo, onClose }: {
  postId: string; replyTo: Comment | null; onClose: () => void;
}) {
  const { s, d, toast } = useApp();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const valid = text.trim().length > 0 && text.length <= 200;

  const submit = () => {
    if (!valid || sending) return;
    setSending(true);
    setTimeout(() => {
      const rootId = replyTo ? (replyTo.parentId ?? replyTo.id) : undefined;
      d({ t: "add-comment", c: {
        id: "c" + Date.now(), postId, userName: s.owner.name, userAvatar: s.owner.avatar,
        content: text.trim(), createdAt: NOW, parentId: rootId,
        replyTo: replyTo?.userName, mine: true,
      } });
      setSending(false); toast("评论成功"); onClose();
    }, 700);
  };

  return (
    <Sheet onClose={onClose}>
      <div className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <textarea autoFocus value={text} maxLength={200}
          onChange={(e) => setText(e.target.value)}
          placeholder={replyTo ? `回复 ${replyTo.userName}` : "说点什么…"}
          className="w-full h-28 resize-none rounded-xl bg-cream p-3 text-[15px] outline-none placeholder:text-ink3" />
        <div className="flex items-center mt-2">
          <span className="text-[12px] text-ink3">{text.length}/200</span>
          <div className="ml-auto"><Button small disabled={!valid} loading={sending} onClick={submit}>发送</Button></div>
        </div>
      </div>
    </Sheet>
  );
}

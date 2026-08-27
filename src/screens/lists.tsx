import { useApp, kFmt } from "../store";
import type { Category } from "../data";
import {
  Screen, TopBar, Masonry, PetRow, Empty, InitialLoading, LoadError, EndOfList,
  BottomSentinel, useList, FollowButton, Avatar,
} from "../ui";
import { MsgRow } from "./tabs";

export function MyPosts() {
  const { myPosts } = useApp();
  const all = myPosts();
  const L = useList(all, { pageSize: 8 });
  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="我的发布" />
      <Screen className="flex-1 pt-3">
        {all.length === 0 ? <Empty title="这里还没有动态" sub="发布第一条动态，记录小家伙的日常吧。" />
          : L.phase === "loading" ? <InitialLoading />
          : L.phase === "error" ? <LoadError onRetry={L.retry} />
          : <><Masonry posts={L.items} /><BottomSentinel onHit={L.loadMore} /><EndOfList hasMore={L.hasMore} more={L.more} /></>}
      </Screen>
    </div>
  );
}

export function MyFavorites() {
  const { favorites } = useApp();
  const all = favorites();
  const L = useList(all, { pageSize: 8 });
  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="我的收藏" />
      <Screen className="flex-1 pt-3">
        {all.length === 0 ? <Empty title="还没有收藏喜欢的内容" sub="在动态详情里点收藏，就会出现在这里。" />
          : L.phase === "loading" ? <InitialLoading />
          : <><Masonry posts={L.items} /><BottomSentinel onHit={L.loadMore} /><EndOfList hasMore={L.hasMore} more={L.more} /></>}
      </Screen>
    </div>
  );
}

export function MyFollowing() {
  const { s, d, toast, setTab, pop } = useApp();
  const followed = s.follows.map((id) => s.pets.find((p) => p.id === id)).filter(Boolean) as any[];
  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="我关注的宠物" />
      <Screen className="flex-1">
        {followed.length === 0 ? (
          <Empty title="还没有关注的小家伙" cta="去发现" onCta={() => { pop(); setTab("discover"); }} />
        ) : (
          <div className="divide-y divide-line">
            {followed.map((p) => (
              <PetRow key={p.id} pet={p} action={
                <button onClick={(e) => { e.stopPropagation(); d({ t: "toggle-follow", id: p.id }); toast("已取消关注"); }}
                  className="h-8 px-4 rounded-full bg-cream text-ink2 border border-line text-[13px]">已关注</button>
              } />
            ))}
          </div>
        )}
      </Screen>
    </div>
  );
}

export function CategoryList({ category }: { category: Category }) {
  const { s } = useApp();
  const all = s.pets.filter((p) => p.active && p.category === category);
  const L = useList(all, { pageSize: 8, failFirst: false });
  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title={category} />
      <Screen className="flex-1">
        {all.length === 0 ? <Empty title="这个分类还没有小家伙" sub="换个分类看看吧。" />
          : L.phase === "loading" ? <InitialLoading />
          : L.phase === "error" ? <LoadError onRetry={L.retry} />
          : <><div className="divide-y divide-line">{L.items.map((p) => <PetRow key={p.id} pet={p} />)}</div>
            <BottomSentinel onHit={L.loadMore} /><EndOfList hasMore={L.hasMore} more={L.more} /></>}
      </Screen>
    </div>
  );
}

export function MsgList({ kind }: { kind: "like" | "comment" | "follow" }) {
  const { s } = useApp();
  const title = { like: "赞与收藏", comment: "评论回复", follow: "新关注" }[kind];
  const list = s.messages.filter((m) => m.kind === kind).sort((a, b) => b.createdAt - a.createdAt);
  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title={title} />
      <Screen className="flex-1">
        {list.length === 0 ? <Empty title="还没有新的消息" />
          : <div className="divide-y divide-line">{list.map((m) => <MsgRow key={m.id} m={m} />)}</div>}
      </Screen>
    </div>
  );
}

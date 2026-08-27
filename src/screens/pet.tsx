import { useState } from "react";
import { useApp, petMeta, kFmt, completion, relTime, fullTime } from "../store";
import { BREEDS, PERSONALITY, HOBBY, CATEGORIES, type Pet, type Category } from "../data";
import {
  Screen, TopBar, Avatar, Button, FollowButton, Masonry, Empty, Chip, Field, ImageViewer, TabBarTop,
} from "../ui";
import * as I from "../icons";

export function PetProfile({ id }: { id: string }) {
  const { pet, postsByPet, push, s } = useApp();
  const p = pet(id);
  const [tab, setTab] = useState<"动态" | "相册">("动态");
  const [viewer, setViewer] = useState<{ imgs: string[]; i: number } | null>(null);
  if (!p) return <div className="h-full bg-bg"><TopBar title="宠物主页" /><Empty title="该宠物不存在" /></div>;
  const posts = postsByPet(id);
  const album = posts.flatMap((po) => po.images.map((src) => ({ src, postId: po.id })));

  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title={p.name} />
      <Screen className="flex-1">
        <div className="flex flex-col items-center px-6 pt-4 pb-5">
          <Avatar src={p.avatar} size={92} ring />
          <h1 className="mt-3 text-[22px] font-bold">{p.name}</h1>
          <p className="text-[13px] text-ink2 mt-1">{petMeta(p) || p.category}</p>
          {p.bio && <p className="text-[14px] text-ink text-center mt-2 leading-relaxed">{p.bio}</p>}
          <div className="flex items-center gap-6 mt-3 text-center">
            <div><span className="font-bold text-[17px]">{kFmt(p.followers)}</span><span className="text-[12px] text-ink3 ml-1">粉丝</span></div>
            <div><span className="font-bold text-[17px]">{p.postCount}</span><span className="text-[12px] text-ink3 ml-1">动态</span></div>
          </div>
          <p className="text-[12px] text-ink3 mt-2">主人 @{p.ownerName}</p>
          <div className="mt-4">
            {p.mine
              ? <Button variant="soft" small onClick={() => push("petEdit", { id })}>编辑资料</Button>
              : <FollowButton id={id} />}
          </div>
        </div>

        {/* completion — owner only */}
        {p.mine && completion(p) < 100 && (
          <button onClick={() => push("petEdit", { id })}
            className="mx-4 mb-4 w-[calc(100%-2rem)] bg-brand-soft/60 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="flex-1 text-left">
              <div className="text-[13px] font-medium text-brand-deep">档案完成度 {completion(p)}%</div>
              <div className="h-1.5 rounded-full bg-white/70 mt-2 overflow-hidden">
                <div className="h-full bg-brand rounded-full" style={{ width: completion(p) + "%" }} />
              </div>
            </div>
            <span className="text-[13px] text-brand-deep font-medium flex items-center">去完善<I.ChevronRight size={16} /></span>
          </button>
        )}

        {/* about */}
        <div className="mx-4 bg-surface rounded-2xl p-4 mb-4">
          <h2 className="font-bold text-[15px] mb-2">关于{p.name}</h2>
          <div className="flex flex-col gap-1.5 text-[14px]">
            <AboutRow label="品种" value={p.breed} />
            <AboutRow label="性别" value={p.gender} />
            <AboutRow label="年龄" value={p.approxAge} />
            <AboutRow label="到家" value={p.arrival ? `${p.arrival}来到家里` : undefined} />
            {p.personality.length > 0 && <TagRow label="性格" tags={p.personality} />}
            {p.hobby.length > 0 && <TagRow label="爱好" tags={p.hobby} />}
          </div>
        </div>

        <div className="border-b border-line pb-2 pt-1">
          <TabBarTop tabs={["动态", "相册"]} value={tab} onChange={(t) => setTab(t as any)} />
        </div>

        <div className="pt-3 pb-6">
          {tab === "动态" ? (
            posts.length ? <Masonry posts={posts} /> : <Empty title="这里还没有动态" />
          ) : (
            album.length ? (
              <div className="grid grid-cols-3 gap-1 px-1">
                {album.map((a, i) => (
                  <button key={i} onClick={() => setViewer({ imgs: album.map((x) => x.src), i })}
                    className="aspect-square bg-cream"><img src={a.src} alt="" className="w-full h-full object-cover" /></button>
                ))}
              </div>
            ) : <Empty title="相册还是空的" sub="发布动态后，照片会自动收进这里。" />
          )}
        </div>
      </Screen>
      {viewer && <ImageViewer images={viewer.imgs} start={viewer.i} onClose={() => setViewer(null)} />}
    </div>
  );
}

function AboutRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return <div className="flex"><span className="text-ink3 w-14 shrink-0">{label}</span><span>{value}</span></div>;
}
function TagRow({ label, tags }: { label: string; tags: string[] }) {
  return (
    <div className="flex"><span className="text-ink3 w-14 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => <span key={t} className="px-2 py-0.5 rounded-full bg-cream text-[12px] text-ink2">{t}</span>)}
      </div>
    </div>
  );
}

/* ============ PET MANAGEMENT ============ */
export function PetManage() {
  const { s, push, dialog, d, toast } = useApp();
  const [tab, setTab] = useState<"在用" | "已停用">("在用");
  const mine = s.pets.filter((p) => p.mine);
  const active = mine.filter((p) => p.active);
  const inactive = mine.filter((p) => !p.active);

  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="我的宠物" />
      <div className="flex border-b border-line bg-bg">
        {(["在用", "已停用"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[15px] ${tab === t ? "font-bold text-ink border-b-2 border-brand" : "text-ink3"}`}>
            {t}（{t === "在用" ? active.length : inactive.length}）
          </button>
        ))}
      </div>
      <Screen className="flex-1">
        {tab === "在用" ? (
          <div className="divide-y divide-line">
            {active.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-4 py-3.5">
                <button onClick={() => push("pet", { id: p.id })}><Avatar src={p.avatar} size={52} /></button>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-[12px] text-ink3 truncate">{petMeta(p) || p.category}</div>
                  <div className="text-[12px] text-ink3">档案完成度 {completion(p)}%</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => push("petEdit", { id: p.id })} className="h-8 px-3 rounded-full bg-cream text-[13px] text-ink2">编辑</button>
                  <button onClick={() => dialog({
                    title: "确定停用这个宠物档案吗？",
                    desc: "停用后将不能继续使用该宠物发布动态，历史动态仍会保留。",
                    confirmText: "确认停用", danger: true,
                    onConfirm: () => { d({ t: "deactivate-pet", id: p.id }); toast("已停用"); },
                  })} className="h-8 px-3 rounded-full bg-cream text-[13px] text-ink2">停用</button>
                </div>
              </div>
            ))}
            <button onClick={() => push("petCreate", { from: "manage" })}
              className="w-full flex items-center justify-center gap-2 py-4 text-brand font-medium">
              <I.Plus size={20} />添加宠物
            </button>
          </div>
        ) : (
          inactive.length ? (
            <div className="divide-y divide-line">
              {inactive.map((p) => (
                <div key={p.id} className="flex items-center gap-3 px-4 py-3.5">
                  <Avatar src={p.avatar} size={52} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{p.name}</div>
                    <div className="text-[12px] text-ink3">{p.deactivatedAt ? fullTime(p.deactivatedAt) : ""} 停用</div>
                  </div>
                  <button onClick={() => { d({ t: "restore-pet", id: p.id }); toast("已恢复档案"); }}
                    className="h-8 px-4 rounded-full bg-brand-soft text-brand-deep text-[13px] font-medium">恢复档案</button>
                </div>
              ))}
            </div>
          ) : <Empty title="没有已停用的宠物" />
        )}
      </Screen>
    </div>
  );
}

/* ============ EDIT PET PROFILE ============ */
export function PetEdit({ id }: { id: string }) {
  const { pet, d, pop, toast, dialog } = useApp();
  const orig = pet(id)!;
  const [f, setF] = useState<Pet>({ ...orig });
  const [customBreed, setCustomBreed] = useState(
    orig.breed && !(BREEDS[orig.category] ?? []).includes(orig.breed) ? orig.breed : "");
  const [ageMode, setAgeMode] = useState<"birthday" | "approx">(orig.birthday ? "birthday" : "approx");
  const [loading, setLoading] = useState(false);

  const set = (patch: Partial<Pet>) => setF((x) => ({ ...x, ...patch }));
  const changed = JSON.stringify(f) !== JSON.stringify(orig) || (customBreed && f.breed === "其他");
  const nameValid = f.name.trim().length >= 1 && f.name.trim().length <= 10;
  const enabled = changed && nameValid && !loading;

  const toggleTag = (key: "personality" | "hobby", tag: string) => {
    const cur = f[key];
    if (cur.includes(tag)) set({ [key]: cur.filter((t) => t !== tag) } as any);
    else if (cur.length < 5) set({ [key]: [...cur, tag] } as any);
    else toast("最多选择 5 个标签");
  };

  const save = () => {
    if (!enabled) return;
    setLoading(true);
    setTimeout(() => {
      const breed = f.breed === "其他" && customBreed.trim() ? customBreed.trim() : f.breed;
      d({ t: "update-pet", pet: { ...f, name: f.name.trim(), breed } });
      setLoading(false); toast("已保存"); pop();
    }, 800);
  };
  const back = () => changed ? dialog({
    title: "当前修改尚未保存，是否放弃？", cancelText: "继续编辑", confirmText: "放弃修改", danger: true, onConfirm: pop,
  }) : pop();

  const breeds = BREEDS[f.category] ?? ["其他"];

  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="编辑宠物档案" onBack={back} />
      <Screen className="flex-1">
        <div className="flex flex-col items-center py-5">
          <div className="relative"><Avatar src={f.avatar} size={84} />
            <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center border-2 border-bg"><I.Camera size={14} /></span>
          </div>
          <p className="text-[12px] text-ink3 mt-2">点击更换头像</p>
        </div>
        <Field label="名字" required>
          <input value={f.name} maxLength={10} onChange={(e) => set({ name: e.target.value })}
            className="w-full text-[16px] outline-none bg-transparent" />
        </Field>
        <Field label="类别" required>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => <Chip key={c} active={f.category === c}
              onClick={() => set({ category: c as Category, breed: undefined })}>{c}</Chip>)}
          </div>
        </Field>
        <Field label="品种">
          <div className="flex flex-wrap gap-2">
            {breeds.map((b) => <Chip key={b} active={f.breed === b} onClick={() => set({ breed: b })}>{b}</Chip>)}
          </div>
          {f.breed === "其他" && (
            <input value={customBreed} maxLength={10} onChange={(e) => setCustomBreed(e.target.value)}
              placeholder="具体品种（最多10字）" className="mt-2 w-full text-[15px] outline-none bg-cream rounded-lg px-3 py-2" />
          )}
        </Field>
        <Field label="性别">
          <div className="flex gap-2">
            {(["男生", "女生", "未知"] as const).map((g) => <Chip key={g} active={f.gender === g} onClick={() => set({ gender: g })}>{g}</Chip>)}
          </div>
        </Field>
        <Field label="年龄">
          <div className="flex gap-2 mb-2">
            <Chip active={ageMode === "birthday"} onClick={() => setAgeMode("birthday")}>出生日期</Chip>
            <Chip active={ageMode === "approx"} onClick={() => setAgeMode("approx")}>大概年龄</Chip>
          </div>
          {ageMode === "birthday" ? (
            <input type="date" value={f.birthday ?? ""} onChange={(e) => set({ birthday: e.target.value, approxAge: undefined })}
              className="w-full text-[15px] outline-none bg-cream rounded-lg px-3 py-2" />
          ) : (
            <input value={f.approxAge ?? ""} onChange={(e) => set({ approxAge: e.target.value, birthday: undefined })}
              placeholder="例如：2岁3个月" className="w-full text-[15px] outline-none bg-cream rounded-lg px-3 py-2" />
          )}
        </Field>
        <Field label="到家日期">
          <input value={f.arrival ?? ""} onChange={(e) => set({ arrival: e.target.value })}
            placeholder="例如：2024年5月" className="w-full text-[15px] outline-none bg-cream rounded-lg px-3 py-2" />
        </Field>
        <Field label={`性格标签（${f.personality.length}/5）`}>
          <div className="flex flex-wrap gap-2">
            {[...new Set([...PERSONALITY, ...f.personality])].map((t) =>
              <Chip key={t} active={f.personality.includes(t)} onClick={() => toggleTag("personality", t)}>{t}</Chip>)}
          </div>
        </Field>
        <Field label={`爱好标签（${f.hobby.length}/5）`}>
          <div className="flex flex-wrap gap-2">
            {[...new Set([...HOBBY, ...f.hobby])].map((t) =>
              <Chip key={t} active={f.hobby.includes(t)} onClick={() => toggleTag("hobby", t)}>{t}</Chip>)}
          </div>
        </Field>
        <div className="px-4 py-3.5">
          <div className="text-[13px] text-ink3 mb-2">简介</div>
          <textarea value={f.bio ?? ""} maxLength={50} onChange={(e) => set({ bio: e.target.value })}
            placeholder="用一句话介绍它" className="w-full h-20 resize-none outline-none bg-transparent text-[15px]" />
          <div className="text-right text-[12px] text-ink3">{(f.bio ?? "").length}/50</div>
        </div>
      </Screen>
      <div className="border-t border-line bg-surface p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <Button full disabled={!enabled} loading={loading} onClick={save}>保存</Button>
      </div>
    </div>
  );
}

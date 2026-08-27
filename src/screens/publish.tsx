import { useEffect, useState } from "react";
import { useApp } from "../store";
import { u, NOW, CATEGORIES, type Category } from "../data";
import { Screen, TopBar, Avatar, Button, Sheet, Chip, Field, ImageViewer } from "../ui";
import * as I from "../icons";

const POOL = ["photo-1573865526739-10659fec78a5", "photo-1495360010541-f48722b34f7d",
  "photo-1526336024174-e58f5cdd8e13", "photo-1592194996308-7b43878e84a6",
  "photo-1533738363-b7f9aef128ce", "photo-1543852786-1cf6624b9987",
  "photo-1518791841217-8f162f1e1131", "photo-1517423440428-a5a00ad493e8",
  "photo-1583511655857-d19b40a7a54e"];
let poolI = 0;
const nextImage = () => u(POOL[poolI++ % POOL.length], 800, 800);

export function Publish({ editId }: { editId?: string }) {
  const { s, d, pop, toast, dialog, post, pet } = useApp();
  const editing = post(editId);
  const editPet = editing ? pet(editing.petId) : undefined;

  const myPets = s.pets.filter((p) => p.mine && p.active);
  const [petId, setPetId] = useState<string | undefined>(
    editing ? editing.petId : myPets.length === 1 ? myPets[0].id : undefined);
  const [images, setImages] = useState<string[]>(editing ? [...editing.images] : []);
  const [title, setTitle] = useState(editing?.title ?? "");
  const [body, setBody] = useState(editing?.body ?? "");

  const [pickerOpen, setPickerOpen] = useState(false);
  const [petSheet, setPetSheet] = useState(false);
  const [denied, setDenied] = useState<null | "album" | "camera">(null);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [phase, setPhase] = useState<"idle" | "loading" | "failed">("idle");
  const [viewer, setViewer] = useState<number | null>(null);
  const [failDemo, setFailDemo] = useState(false);
  const [denyDemo, setDenyDemo] = useState(false);

  // auto-select newly created pet returning from quick-create (publish flow only)
  useEffect(() => {
    if (!editing && s.lastCreatedPetId) {
      const p = s.pets.find((x) => x.id === s.lastCreatedPetId);
      if (p?.mine) setPetId(p.id);
    }
  }, [s.lastCreatedPetId]);

  const petObj = pet(petId);
  const titleTrim = title.trim();
  const titleValid = titleTrim.length > 0 && title.length <= 15;
  const canSubmit = !!petId && images.length >= 1 && images.length <= 9 && titleValid;
  const changed = editing
    ? title !== editing.title || (body ?? "") !== (editing.body ?? "") ||
      images.join() !== editing.images.join()
    : true;
  const enabled = editing ? canSubmit && changed : canSubmit;

  const dirty = !editing && (!!petId && myPets.length !== 1 || images.length > 0 || title.length > 0 || body.length > 0);

  const back = () => {
    if (editing ? changed : dirty) {
      dialog({
        title: editing ? "当前修改尚未保存，是否放弃？" : "是否放弃本次编辑？",
        cancelText: "继续编辑", confirmText: editing ? "放弃修改" : "放弃", danger: true,
        onConfirm: pop,
      });
    } else pop();
  };

  const addImages = (n: number) => {
    if (denyDemo) return; // handled by denied panel
    const room = 9 - images.length;
    const add = Array.from({ length: Math.min(n, room) }, nextImage);
    setImages((x) => [...x, ...add]);
    setUploadFailed(false);
  };

  const pick = (kind: "album" | "camera") => {
    setPickerOpen(false);
    if (denyDemo) { setDenied(kind); return; }
    addImages(kind === "camera" ? 1 : 3);
  };

  const submit = () => {
    if (!enabled || phase === "loading") return;
    setPhase("loading");
    setTimeout(() => {
      if (uploadFailed || failDemo) { setPhase("failed"); return; }
      if (editing) {
        d({ t: "update-post", post: { ...editing, title: titleTrim, body: body || undefined, images } });
        toast("已保存"); pop();
      } else {
        d({ t: "add-post", post: {
          id: "post" + Date.now(), petId: petId!, title: titleTrim, body: body || undefined,
          images, likes: 0, liked: false, favorited: false, createdAt: NOW,
        } });
        toast("发布成功"); d({ t: "pop-to-tab", tab: "home" });
      }
    }, 1100);
  };

  // no active pet: guide to create
  if (!editing && myPets.length === 0) {
    return (
      <div className="h-full flex flex-col bg-bg">
        <TopBar title="发布动态" onBack={back} />
        <div className="flex-1 flex flex-col items-center justify-center px-10 text-center gap-3">
          <I.Paw size={44} className="text-brand/70" />
          <p className="font-medium">还没有可以发布动态的小家伙</p>
          <p className="text-ink3 text-sm">先创建一个宠物档案吧。</p>
          <div className="mt-3"><Button onClick={() => d({ t: "push", name: "petCreate", props: { from: "publish" } })}>快速创建宠物</Button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title={editing ? "编辑动态" : "发布动态"} onBack={back} />
      <Screen className="flex-1">
        {/* 1. pet */}
        <Field label="选择宠物" required>
          <button disabled={!!editing} onClick={() => setPetSheet(true)}
            className="flex items-center gap-2 disabled:opacity-100">
            {petObj ? <>
              <Avatar src={petObj.avatar} size={36} />
              <span className="font-medium">{petObj.name}</span>
              {editing ? <span className="text-[12px] text-ink3">（发布后不可更改）</span>
                : <I.ChevronRight size={16} className="text-ink3" />}
            </> : <span className="text-ink3 flex items-center gap-1">请选择宠物 <I.ChevronRight size={16} /></span>}
          </button>
        </Field>

        {/* 2. images */}
        <div className="px-4 py-3.5 border-b border-line">
          <div className="text-[13px] text-ink3 mb-2">添加图片 <span className="text-brand">*</span> <span className="text-ink3">（{images.length}/9）</span></div>
          {uploadFailed && <p className="text-danger text-[13px] mb-2">图片上传失败，请重新上传</p>}
          <div className="grid grid-cols-3 gap-2">
            {images.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-cream">
                <button onClick={() => setViewer(i)}><img src={src} alt="" className="w-full h-full object-cover" /></button>
                {i === 0 && <span className="absolute bottom-1 left-1 bg-black/55 text-white text-[10px] px-1.5 py-0.5 rounded">封面</span>}
                <button onClick={() => setImages((x) => x.filter((_, j) => j !== i))}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/55 text-white flex items-center justify-center"><I.X size={12} /></button>
              </div>
            ))}
            {images.length < 9 && (
              <button onClick={() => setPickerOpen(true)}
                className="aspect-square rounded-xl border-2 border-dashed border-line text-ink3 flex flex-col items-center justify-center gap-1">
                <I.Plus size={22} /><span className="text-[11px]">添加</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. title */}
        <div className="px-4 py-3.5 border-b border-line">
          <div className="text-[13px] text-ink3 mb-2">标题 <span className="text-brand">*</span></div>
          <div className="flex items-center gap-2">
            <input value={title} maxLength={15} onChange={(e) => setTitle(e.target.value)}
              placeholder="给这一刻起个标题" className="flex-1 text-[16px] outline-none bg-transparent placeholder:text-ink3" />
            <span className="text-[12px] text-ink3">{title.length}/15</span>
          </div>
        </div>

        {/* 4. body */}
        <div className="px-4 py-3.5">
          <div className="text-[13px] text-ink3 mb-2">正文 <span className="text-ink3">（选填）</span></div>
          <textarea value={body} maxLength={500} onChange={(e) => setBody(e.target.value)}
            placeholder="记录下此刻的心情…" className="w-full h-28 resize-none outline-none bg-transparent text-[15px] placeholder:text-ink3" />
          <div className="text-right text-[12px] text-ink3">{body.length}/500</div>
        </div>

        {phase === "failed" && <p className="text-danger text-[13px] text-center pb-2">{editing ? "保存失败，请重试" : "发布失败，请重试"}</p>}

        {/* dev toggles to preview edge states */}
        <div className="flex justify-center gap-4 text-[11px] text-ink3/70 pb-4">
          <button onClick={() => setDenyDemo((v) => !v)}>{denyDemo ? "✓ " : ""}拒绝相册权限</button>
          <button onClick={() => { setUploadFailed((v) => !v); }}>{uploadFailed ? "✓ " : ""}上传失败</button>
          <button onClick={() => setFailDemo((v) => !v)}>{failDemo ? "✓ " : ""}发布失败</button>
        </div>
      </Screen>

      {/* 5. CTA */}
      <div className="border-t border-line bg-surface p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <Button full disabled={!enabled} loading={phase === "loading"} onClick={submit}>
          {editing ? "保存" : "发布"}
        </Button>
      </div>

      {/* pet selector */}
      {petSheet && (
        <Sheet title="选择宠物" onClose={() => setPetSheet(false)}>
          <div className="pb-4">
            {myPets.map((p) => (
              <button key={p.id} onClick={() => { setPetId(p.id); setPetSheet(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 active:bg-cream/60">
                <Avatar src={p.avatar} size={40} />
                <span className="flex-1 text-left font-medium">{p.name}</span>
                {petId === p.id && <I.Check className="text-brand" />}
              </button>
            ))}
          </div>
        </Sheet>
      )}

      {/* image source picker */}
      {pickerOpen && (
        <Sheet onClose={() => setPickerOpen(false)}>
          <div className="pb-[env(safe-area-inset-bottom)]">
            <button onClick={() => pick("album")} className="w-full py-4 border-b border-line active:bg-cream/60 flex items-center justify-center gap-2"><I.ImageI size={20} />从相册选择</button>
            <button onClick={() => pick("camera")} className="w-full py-4 active:bg-cream/60 flex items-center justify-center gap-2"><I.Camera size={20} />拍照</button>
            <button onClick={() => setPickerOpen(false)} className="w-full py-4 mt-1.5 border-t-8 border-cream text-ink2">取消</button>
          </div>
        </Sheet>
      )}

      {/* permission denied */}
      {denied && (
        <Sheet onClose={() => setDenied(null)}>
          <div className="p-6 text-center pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <p className="font-medium">{denied === "album" ? "需要相册权限才能选择照片" : "需要相机权限才能拍照"}</p>
            <p className="text-ink3 text-sm mt-2">请在系统设置中开启对应权限。</p>
            <div className="flex gap-3 mt-5">
              <Button variant="ghost" full onClick={() => setDenied(null)}>暂不开启</Button>
              <Button full onClick={() => { setDenied(null); toast("请前往微信设置开启权限"); }}>去设置</Button>
            </div>
          </div>
        </Sheet>
      )}

      {viewer !== null && <ImageViewer images={images} start={viewer} onClose={() => setViewer(null)} />}
    </div>
  );
}

/* ============ QUICK PET CREATE ============ */
export function PetCreate({ from }: { from: "manage" | "publish" }) {
  const { s, d, pop, toast, push } = useApp();
  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category | undefined>();
  const [species, setSpecies] = useState("");
  const [loading, setLoading] = useState(false);

  const nameValid = name.trim().length >= 1 && name.trim().length <= 10;
  const speciesOk = category !== "其他" || species.trim().length > 0;
  const valid = !!avatar && nameValid && !!category && speciesOk;

  const create = () => {
    if (!valid || loading) return;
    setLoading(true);
    setTimeout(() => {
      const id = "p_" + Date.now();
      d({ t: "add-pet", pet: {
        id, name: name.trim(), avatar, category: category!,
        species: category === "其他" ? species.trim() : undefined,
        personality: [], hobby: [], ownerId: s.owner.id, ownerName: s.owner.name,
        followers: 0, postCount: 0, active: true, mine: true,
      } });
      setLoading(false); toast("宠物档案已创建");
      if (from === "manage") { pop(); push("pet", { id }); }
      else pop(); // back to publish, auto-select via effect
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="创建宠物档案" />
      <Screen className="flex-1">
        <div className="flex flex-col items-center py-6">
          <button onClick={() => setAvatar(u(["photo-1533738363-b7f9aef128ce", "photo-1592194996308-7b43878e84a6", "photo-1543852786-1cf6624b9987"][Math.floor(Math.random() * 3)], 240, 240))}
            className="relative">
            {avatar ? <Avatar src={avatar} size={88} /> :
              <span className="w-22 h-22 rounded-full bg-cream flex items-center justify-center text-brand" style={{ width: 88, height: 88 }}><I.Camera size={30} /></span>}
            <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center border-2 border-bg"><I.Plus size={16} /></span>
          </button>
          <p className="text-[12px] text-ink3 mt-2">宠物头像 · 1:1 裁剪</p>
        </div>
        <Field label="宠物名字" required>
          <div className="flex items-center gap-2">
            <input value={name} maxLength={10} onChange={(e) => setName(e.target.value)}
              placeholder="给它起个名字" className="flex-1 text-[16px] outline-none bg-transparent placeholder:text-ink3" />
            <span className="text-[12px] text-ink3">{name.length}/10</span>
          </div>
        </Field>
        <Field label="宠物类别" required>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Chip>)}
          </div>
        </Field>
        {category === "其他" && (
          <Field label="具体类别" required>
            <div className="flex items-center gap-2">
              <input value={species} maxLength={10} onChange={(e) => setSpecies(e.target.value)}
                placeholder="例如：兔子、龙猫、刺猬" className="flex-1 text-[16px] outline-none bg-transparent placeholder:text-ink3" />
              <span className="text-[12px] text-ink3">{species.length}/10</span>
            </div>
          </Field>
        )}
      </Screen>
      <div className="border-t border-line bg-surface p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <Button full disabled={!valid} loading={loading} onClick={create}>创建</Button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useApp } from "../store";
import { Screen, TopBar, Avatar, Button, Field } from "../ui";
import * as I from "../icons";

export function Settings() {
  const { push, dialog, d, toast } = useApp();
  const row = (label: string, onClick: () => void, danger?: boolean) => (
    <button onClick={onClick} className="w-full flex items-center px-4 py-4 active:bg-cream/60">
      <span className={`text-[15px] ${danger ? "text-danger" : ""}`}>{label}</span>
      {!danger && <I.ChevronRight size={18} className="ml-auto text-ink3" />}
    </button>
  );
  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="设置" />
      <Screen className="flex-1 pt-3">
        <div className="mx-4 bg-surface rounded-2xl divide-y divide-line overflow-hidden">
          {row("隐私政策", () => push("doc", { kind: "privacy" }))}
          {row("用户协议", () => push("doc", { kind: "agreement" }))}
          {row("关于我们", () => push("about"))}
          {row("意见反馈", () => push("feedback"))}
        </div>
        <div className="mx-4 mt-4 bg-surface rounded-2xl overflow-hidden">
          <div className="flex justify-center">
            {row("退出登录", () => dialog({
              title: "确定退出登录吗？", confirmText: "退出", danger: true,
              onConfirm: () => { d({ t: "logout" }); toast("已退出登录"); },
            }), true)}
          </div>
        </div>
      </Screen>
    </div>
  );
}

export function EditOwner() {
  const { s, d, pop, toast, dialog } = useApp();
  const [name, setName] = useState(s.owner.name);
  const [bio, setBio] = useState(s.owner.bio);
  const [avatar] = useState(s.owner.avatar);
  const [loading, setLoading] = useState(false);
  const nameValid = name.trim().length >= 2 && name.trim().length <= 12;
  const changed = name !== s.owner.name || bio !== s.owner.bio;
  const enabled = changed && nameValid && !loading;
  const save = () => {
    if (!enabled) return;
    setLoading(true);
    setTimeout(() => { d({ t: "update-owner", owner: { name: name.trim(), bio } }); setLoading(false); toast("已保存"); pop(); }, 800);
  };
  const back = () => changed ? dialog({
    title: "当前修改尚未保存，是否放弃？", cancelText: "继续编辑", confirmText: "放弃", danger: true, onConfirm: pop,
  }) : pop();
  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="编辑个人资料" onBack={back} />
      <Screen className="flex-1">
        <div className="flex flex-col items-center py-6">
          <div className="relative"><Avatar src={avatar} size={84} />
            <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center border-2 border-bg"><I.Camera size={14} /></span>
          </div>
          <p className="text-[12px] text-ink3 mt-2">点击更换头像 · 1:1 裁剪</p>
        </div>
        <Field label="昵称" required>
          <div className="flex items-center gap-2">
            <input value={name} maxLength={12} onChange={(e) => setName(e.target.value)}
              className="flex-1 text-[16px] outline-none bg-transparent" />
            <span className="text-[12px] text-ink3">{name.length}/12</span>
          </div>
          {!nameValid && name.length > 0 && <p className="text-danger text-[12px] mt-1">昵称需为 2-12 个字符</p>}
        </Field>
        <div className="px-4 py-3.5">
          <div className="text-[13px] text-ink3 mb-2">一句话简介</div>
          <textarea value={bio} maxLength={50} onChange={(e) => setBio(e.target.value)}
            placeholder="介绍一下自己吧" className="w-full h-20 resize-none outline-none bg-transparent text-[15px]" />
          <div className="text-right text-[12px] text-ink3">{bio.length}/50</div>
        </div>
      </Screen>
      <div className="border-t border-line bg-surface p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <Button full disabled={!enabled} loading={loading} onClick={save}>保存</Button>
      </div>
    </div>
  );
}

const PRIVACY = [
  ["信息收集", "我们仅收集为你提供宠物社区服务所必需的信息，包括你的微信头像、昵称，以及你主动填写的宠物档案与发布内容。"],
  ["信息使用", "收集的信息用于展示你的宠物主页、动态内容，以及向你推荐可能感兴趣的小家伙。"],
  ["信息存储", "我们采取合理的安全措施保护你的信息，存储期限不超过实现目的所必需的时间。"],
  ["你的权利", "你可以随时编辑或删除你发布的内容、停用宠物档案，或退出登录。"],
];
const AGREEMENT = [
  ["服务内容", "本产品为宠物爱好者提供内容分享与浏览服务。你需对自己发布的内容负责。"],
  ["用户行为", "请勿发布违法、侵权或不友善的内容。我们有权对违规内容进行处理。"],
  ["内容权利", "你保留所发布内容的权利，同时授权本产品在服务范围内展示这些内容。"],
  ["协议变更", "我们可能会不时更新本协议，更新后将在产品内提示。"],
];

export function Doc({ kind }: { kind: "privacy" | "agreement" }) {
  const data = kind === "privacy" ? PRIVACY : AGREEMENT;
  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title={kind === "privacy" ? "隐私政策" : "用户协议"} />
      <Screen className="flex-1 px-5 py-4">
        <p className="text-[12px] text-ink3 mb-4">最近更新：2026年8月1日</p>
        {data.map(([t, c], i) => (
          <div key={i} className="mb-5">
            <h3 className="font-bold text-[15px] mb-1.5">{i + 1}. {t}</h3>
            <p className="text-[14px] text-ink2 leading-relaxed">{c}</p>
          </div>
        ))}
        <p className="text-[13px] text-ink3 mt-6">如有疑问，可通过「意见反馈」与我们联系。</p>
      </Screen>
    </div>
  );
}

export function About() {
  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="关于我们" />
      <Screen className="flex-1 flex flex-col items-center px-8 pt-16">
        <div className="w-20 h-20 rounded-3xl bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/25">
          <I.Paw size={44} fill />
        </div>
        <h1 className="mt-5 text-[22px] font-bold">毛茸茸</h1>
        <p className="text-ink3 text-sm mt-1">V1.0.0</p>
        <p className="text-center text-ink2 text-[14px] leading-relaxed mt-6">
          一个温柔的宠物社区。<br />在这里，每一个小家伙都有属于自己的故事，<br />也能遇见喜欢它的人。
        </p>
      </Screen>
    </div>
  );
}

export function Feedback() {
  const { toast, pop } = useApp();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const valid = text.trim().length > 0 && text.length <= 500;
  const submit = () => {
    if (!valid || loading) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); toast("感谢你的反馈"); pop(); }, 800);
  };
  return (
    <div className="h-full flex flex-col bg-bg">
      <TopBar title="意见反馈" />
      <Screen className="flex-1 p-4">
        <div className="bg-surface rounded-2xl p-3">
          <textarea value={text} maxLength={500} onChange={(e) => setText(e.target.value)}
            placeholder="说说你的想法或遇到的问题，我们会认真看每一条。"
            className="w-full h-40 resize-none outline-none bg-transparent text-[15px] placeholder:text-ink3" />
          <div className="text-right text-[12px] text-ink3">{text.length}/500</div>
        </div>
      </Screen>
      <div className="border-t border-line bg-surface p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <Button full disabled={!valid} loading={loading} onClick={submit}>提交</Button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useApp } from "../store";
import { Button } from "../ui";
import * as I from "../icons";

export function Login() {
  const { s, d } = useApp();
  const [agree, setAgree] = useState(false);
  const step = s.authStep;

  const authorize = () => {
    if (!agree) return;
    d({ t: "auth-step", step: "authorizing" });
    setTimeout(() => d({ t: "login" }), 1100);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-brand-soft/70 via-bg to-bg px-8">
      <div className="h-24" />
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/25">
          <I.Paw size={44} fill />
        </div>
        <h1 className="mt-5 text-[26px] font-bold tracking-tight">毛茸茸</h1>
        <p className="mt-2 text-ink2 text-[15px]">每一个小家伙，都有自己的故事</p>
      </div>

      <div className="flex-1" />

      {step === "network" ? (
        <div className="text-center mb-6">
          <p className="text-ink2 text-sm mb-4">网络开小差了，请稍后再试</p>
          <Button variant="soft" small onClick={() => d({ t: "auth-step", step: "welcome" })}>重试</Button>
        </div>
      ) : step === "failed" ? (
        <div className="text-center mb-6">
          <p className="text-ink2 text-sm mb-4">授权失败，请重新授权</p>
          <Button variant="soft" small onClick={() => d({ t: "auth-step", step: "welcome" })}>重新授权</Button>
        </div>
      ) : step === "cancelled" ? (
        <div className="text-center mb-6">
          <p className="text-ink2 text-sm mb-4">你取消了微信授权</p>
          <Button variant="soft" small onClick={() => d({ t: "auth-step", step: "welcome" })}>重新授权</Button>
        </div>
      ) : null}

      <div className="pb-12">
        <Button full loading={step === "authorizing"} disabled={!agree} onClick={authorize}>
          <I.WeChat size={20} />{step === "authorizing" ? "授权中…" : "微信一键登录"}
        </Button>

        <button className="w-full mt-4 flex items-start justify-center gap-2 px-2"
          onClick={() => setAgree((v) => !v)}>
          <span className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0
            ${agree ? "bg-brand border-brand text-white" : "border-ink3"}`}>
            {agree && <I.Check size={12} />}
          </span>
          <span className="text-[12px] text-ink3 leading-relaxed text-left">
            已阅读并同意
            <span className="text-brand">《用户协议》</span>和
            <span className="text-brand">《隐私政策》</span>
          </span>
        </button>

        {/* dev-only shortcuts to preview authorization edge states */}
        <div className="mt-6 flex justify-center gap-4 text-[11px] text-ink3/70">
          <button onClick={() => d({ t: "auth-step", step: "cancelled" })}>授权取消</button>
          <button onClick={() => d({ t: "auth-step", step: "failed" })}>授权失败</button>
          <button onClick={() => d({ t: "auth-step", step: "network" })}>网络异常</button>
        </div>
      </div>
    </div>
  );
}

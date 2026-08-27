import { createContext, useContext, useReducer, type ReactNode } from "react";
import {
  owner as seedOwner, pets as seedPets, posts as seedPosts, comments as seedComments,
  messages as seedMessages, initialFollows, NOW, type Pet, type Post, type Comment, type Msg,
} from "./data";

export type Tab = "home" | "discover" | "messages" | "profile";
export type ScreenEntry = { name: string; props?: any; key: number };

export type Dialog = {
  title: string; desc?: string; cancelText?: string; confirmText: string;
  danger?: boolean; onConfirm: () => void;
};

type State = {
  authed: boolean;
  authStep: "welcome" | "authorizing" | "cancelled" | "failed" | "network";
  tab: Tab;
  stack: ScreenEntry[];
  owner: typeof seedOwner;
  pets: Pet[];
  posts: Post[];
  comments: Comment[];
  messages: Msg[];
  follows: string[];
  lastCreatedPetId?: string;
  dots: { like: boolean; comment: boolean; follow: boolean; bottom: boolean };
  toast: { id: number; text: string } | null;
  dialog: Dialog | null;
};

const initial: State = {
  authed: false, authStep: "welcome", tab: "home", stack: [],
  owner: { ...seedOwner }, pets: seedPets.map((p) => ({ ...p })),
  posts: seedPosts.map((p) => ({ ...p })), comments: seedComments.map((c) => ({ ...c })),
  messages: [...seedMessages], follows: [...initialFollows],
  dots: { like: true, comment: true, follow: true, bottom: true }, toast: null, dialog: null,
};

type Action =
  | { t: "auth-step"; step: State["authStep"] }
  | { t: "login" } | { t: "logout" }
  | { t: "tab"; tab: Tab }
  | { t: "push"; name: string; props?: any } | { t: "pop" } | { t: "pop-to-tab"; tab?: Tab }
  | { t: "toggle-like"; id: string } | { t: "toggle-fav"; id: string }
  | { t: "toggle-follow"; id: string }
  | { t: "add-post"; post: Post } | { t: "update-post"; post: Post } | { t: "delete-post"; id: string }
  | { t: "add-comment"; c: Comment } | { t: "delete-comment"; id: string }
  | { t: "add-pet"; pet: Pet } | { t: "update-pet"; pet: Pet }
  | { t: "deactivate-pet"; id: string } | { t: "restore-pet"; id: string }
  | { t: "update-owner"; owner: Partial<State["owner"]> }
  | { t: "clear-dot"; k: keyof State["dots"] }
  | { t: "toast"; text: string } | { t: "toast-clear"; id: number }
  | { t: "dialog"; dialog: Dialog | null };

let toastId = 0, screenKey = 0;

function reducer(s: State, a: Action): State {
  switch (a.t) {
    case "auth-step": return { ...s, authStep: a.step };
    case "login": return { ...s, authed: true, authStep: "welcome", tab: "home", stack: [] };
    case "logout": return { ...initial, authed: false, dots: s.dots };
    case "tab": return { ...s, tab: a.tab, stack: [] };
    case "push": return { ...s, stack: [...s.stack, { name: a.name, props: a.props, key: ++screenKey }] };
    case "pop": return { ...s, stack: s.stack.slice(0, -1) };
    case "pop-to-tab": return { ...s, stack: [], tab: a.tab ?? s.tab };
    case "toggle-like":
      return { ...s, posts: s.posts.map((p) => p.id === a.id
        ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p) };
    case "toggle-fav":
      return { ...s, posts: s.posts.map((p) => p.id === a.id ? { ...p, favorited: !p.favorited } : p) };
    case "toggle-follow":
      return { ...s, follows: s.follows.includes(a.id)
        ? s.follows.filter((x) => x !== a.id)
        : [...s.follows, a.id],
        pets: s.pets.map((p) => p.id === a.id
          ? { ...p, followers: p.followers + (s.follows.includes(a.id) ? -1 : 1) } : p) };
    case "add-post":
      return { ...s, posts: [a.post, ...s.posts],
        pets: s.pets.map((p) => p.id === a.post.petId ? { ...p, postCount: p.postCount + 1 } : p) };
    case "update-post":
      return { ...s, posts: s.posts.map((p) => p.id === a.post.id ? a.post : p) };
    case "delete-post":
      return { ...s, posts: s.posts.map((p) => p.id === a.id ? { ...p, deleted: true } : p) };
    case "add-comment": return { ...s, comments: [...s.comments, a.c] };
    case "delete-comment":
      return { ...s, comments: s.comments.map((c) => c.id === a.id ? { ...c, deleted: true } : c) };
    case "add-pet": return { ...s, pets: [...s.pets, a.pet], lastCreatedPetId: a.pet.id };
    case "update-pet": return { ...s, pets: s.pets.map((p) => p.id === a.pet.id ? a.pet : p) };
    case "deactivate-pet":
      return { ...s, pets: s.pets.map((p) => p.id === a.id
        ? { ...p, active: false, deactivatedAt: NOW } : p) };
    case "restore-pet":
      return { ...s, pets: s.pets.map((p) => p.id === a.id
        ? { ...p, active: true, deactivatedAt: undefined } : p) };
    case "update-owner": return { ...s, owner: { ...s.owner, ...a.owner } };
    case "clear-dot": {
      const dots = { ...s.dots, [a.k]: false };
      dots.bottom = dots.like || dots.comment || dots.follow;
      return { ...s, dots };
    }
    case "toast": return { ...s, toast: { id: ++toastId, text: a.text } };
    case "toast-clear": return s.toast?.id === a.id ? { ...s, toast: null } : s;
    case "dialog": return { ...s, dialog: a.dialog };
  }
}

const Ctx = createContext<{ s: State; d: React.Dispatch<Action> } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [s, d] = useReducer(reducer, initial);
  return <Ctx.Provider value={{ s, d }}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("no provider");
  const { s, d } = ctx;
  return {
    s, d,
    // navigation
    push: (name: string, props?: any) => d({ t: "push", name, props }),
    pop: () => d({ t: "pop" }),
    setTab: (tab: Tab) => d({ t: "tab", tab }),
    toHome: () => d({ t: "pop-to-tab", tab: "home" }),
    toast: (text: string) => d({ t: "toast", text }),
    dialog: (dialog: Dialog) => d({ t: "dialog", dialog }),
    closeDialog: () => d({ t: "dialog", dialog: null }),
    // selectors
    pet: (id?: string) => s.pets.find((p) => p.id === id),
    post: (id?: string) => s.posts.find((p) => p.id === id),
    activePosts: () => s.posts.filter((p) => !p.deleted),
    postsByPet: (petId: string) =>
      s.posts.filter((p) => p.petId === petId && !p.deleted).sort((a, b) => b.createdAt - a.createdAt),
    myPosts: () => {
      const mine = new Set(s.pets.filter((p) => p.mine).map((p) => p.id));
      return s.posts.filter((p) => mine.has(p.petId) && !p.deleted).sort((a, b) => b.createdAt - a.createdAt);
    },
    favorites: () => s.posts.filter((p) => p.favorited && !p.deleted).sort((a, b) => b.createdAt - a.createdAt),
    recommended: () => s.posts.filter((p) => !p.deleted).sort((a, b) => b.createdAt - a.createdAt),
    following: () => s.posts.filter((p) => !p.deleted && s.follows.includes(p.petId))
      .sort((a, b) => b.createdAt - a.createdAt),
    isFollowing: (id: string) => s.follows.includes(id),
    commentsFor: (postId: string) => s.comments.filter((c) => c.postId === postId),
    commentCount: (postId: string) =>
      s.comments.filter((c) => c.postId === postId && !c.deleted).length,
  };
}

export const relTime = (ts: number) => {
  const diff = NOW - ts;
  if (diff < 60_000) return "刚刚";
  if (diff < 3600_000) return Math.floor(diff / 60_000) + "分钟前";
  if (diff < 86_400_000) return Math.floor(diff / 3600_000) + "小时前";
  const days = Math.floor(diff / 86_400_000);
  if (days === 1) return "昨天";
  if (days === 2) return "前天";
  return days + "天前";
};

export const fullTime = (ts: number) => {
  const d = new Date(ts);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${p(d.getHours())}:${p(d.getMinutes())}`;
};

export const petAge = (p: Pet) => p.approxAge ?? "";
export const petMeta = (p: Pet) =>
  [p.breed, p.gender, petAge(p)].filter(Boolean).join(" · ");
export const kFmt = (n: number) => n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
export const completion = (p: Pet) => {
  const fields = [p.avatar, p.name, p.category, p.breed, p.gender,
    p.birthday || p.approxAge, p.arrival, p.personality.length, p.hobby.length, p.bio];
  return fields.filter(Boolean).length * 10;
};

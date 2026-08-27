import { AppProvider, useApp } from "./store";
import { BottomNav, ToastHost, DialogHost } from "./ui";
import { Login } from "./screens/login";
import { Home, Discover, Messages, Profile } from "./screens/tabs";
import { PostDetail } from "./screens/post";
import { Publish, PetCreate } from "./screens/publish";
import { PetProfile, PetManage, PetEdit } from "./screens/pet";
import { MyPosts, MyFavorites, MyFollowing, CategoryList, MsgList } from "./screens/lists";
import { Search } from "./screens/search";
import { Settings, EditOwner, Doc, About, Feedback } from "./screens/settings";

const SCREENS: Record<string, (p: any) => any> = {
  post: PostDetail, publish: Publish, petCreate: PetCreate, pet: PetProfile,
  petManage: PetManage, petEdit: PetEdit, myPosts: MyPosts, myFavorites: MyFavorites,
  myFollowing: MyFollowing, category: CategoryList, msgList: MsgList, search: Search,
  settings: Settings, editOwner: EditOwner, doc: Doc, about: About, feedback: Feedback,
};

function Inner() {
  const { s } = useApp();
  if (!s.authed) return <Login />;

  const Tab = { home: Home, discover: Discover, messages: Messages, profile: Profile }[s.tab];

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-bg">
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 flex flex-col"><Tab /></div>
        {s.stack.map((e, i) => {
          const C = SCREENS[e.name];
          const top = i === s.stack.length - 1;
          return (
            <div key={e.key} className={`absolute inset-0 bg-bg ${top ? "anim-fade" : "hidden"}`}>
              {C ? <C {...(e.props ?? {})} /> : null}
            </div>
          );
        })}
      </div>
      {s.stack.length === 0 && <BottomNav />}
      <ToastHost />
      <DialogHost />
    </div>
  );
}

export default function App() {
  return (
    <div className="h-full w-full bg-bg flex items-center justify-center overflow-hidden">
      <div className="relative bg-bg overflow-hidden w-full h-full max-w-[440px] mx-auto shadow-[0_0_60px_rgba(120,90,60,0.08)]">
        <AppProvider>
          <Inner />
        </AppProvider>
      </div>
    </div>
  );
}

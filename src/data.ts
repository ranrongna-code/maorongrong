export const NOW = new Date("2026-08-27T15:42:00").getTime();
const min = 60_000, hour = 3600_000, day = 86_400_000;

export const u = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const CAT = ["photo-1504198146285-9aba0ff6292d", "photo-1698919485671-51681c867495",
  "photo-1673822391292-6f0e3a5f7dcb", "photo-1783346063567-7783f728209a",
  "photo-1782936983863-85af00f87143", "photo-1786833430636-0d767a5ce5d7",
  "photo-1783816664990-3696d1b3a170", "photo-1767770801815-6aa244b36392"];
const KIT = ["photo-1529778873920-4da4926a72c2", "photo-1515002246390-7bf7e8f87b54",
  "photo-1611843275167-a9bba9aa65dd", "photo-1567270671170-fdc10a5bf831",
  "photo-1507568237455-03228e5ddb7e", "photo-1445499348736-29b6cdfc03b9"];
const DOG = ["photo-1537151608828-ea2b11777ee8", "photo-1600077106724-946750eeaf3c",
  "photo-1597633544424-4da83804df40", "photo-1554692936-82776f9406db",
  "photo-1537151672256-6caf2e9f8c95", "photo-1537151769678-eb003fb3a153"];
const HAM = ["photo-1425082661705-1834bfd09dca", "photo-1676918555382-fcd06a483e25",
  "photo-1721327900411-b315dce4388e"];

export type Category = "猫咪" | "狗狗" | "仓鼠" | "鸟类" | "爬宠" | "其他";
export const CATEGORIES: Category[] = ["猫咪", "狗狗", "仓鼠", "鸟类", "爬宠", "其他"];

export const BREEDS: Record<string, string[]> = {
  猫咪: ["英国短毛猫", "美国短毛猫", "布偶猫", "暹罗猫", "中华田园猫", "其他"],
  狗狗: ["柯基", "柴犬", "金毛", "拉布拉多", "贵宾", "中华田园犬", "其他"],
  仓鼠: ["金丝熊", "三线", "布丁", "其他"],
  鸟类: ["虎皮鹦鹉", "玄凤", "其他"],
  爬宠: ["守宫", "巴西龟", "其他"],
  其他: ["其他"],
};

export const PERSONALITY = ["粘人", "高冷", "活泼", "胆小", "社牛", "社恐", "贪吃", "拆家", "聪明", "温柔"];
export const HOBBY = ["晒太阳", "睡觉", "吃零食", "玩球", "钻纸箱", "散步", "玩水", "啃玩具"];

export type Pet = {
  id: string; name: string; avatar: string; category: Category; species?: string;
  breed?: string; gender?: "男生" | "女生" | "未知"; birthday?: string; approxAge?: string;
  arrival?: string; personality: string[]; hobby: string[]; bio?: string;
  ownerId: string; ownerName: string; followers: number; postCount: number;
  active: boolean; deactivatedAt?: number; mine: boolean;
};

export type Post = {
  id: string; petId: string; title: string; body?: string; images: string[];
  likes: number; liked: boolean; favorited: boolean; createdAt: number; deleted?: boolean;
};

export type Comment = {
  id: string; postId: string; userName: string; userAvatar: string; content: string;
  createdAt: number; parentId?: string; replyTo?: string; deleted?: boolean; mine?: boolean;
};

export type Msg = {
  id: string; kind: "like" | "comment" | "follow"; actor: string; actorAvatar: string;
  text: string; petName?: string; petAvatar?: string; thumb?: string; postId?: string;
  commentId?: string; createdAt: number;
};

export const owner = {
  id: "o1", name: "小林", avatar: u(KIT[3], 200, 200),
  bio: "家里住着三位真正的主人。",
};

export const pets: Pet[] = [
  { id: "p_naitang", name: "奶糖", avatar: u(CAT[7], 240, 240), category: "猫咪", breed: "英国短毛猫",
    gender: "女生", approxAge: "2岁", arrival: "2024年5月", personality: ["高冷", "贪吃", "粘人"],
    hobby: ["晒太阳", "钻纸箱", "吃零食"], bio: "每天最大的烦恼，就是铲屎官只给我一根猫条。",
    ownerId: "o1", ownerName: "小林", followers: 2314, postCount: 4, active: true, mine: true },
  { id: "p_doubao", name: "豆包", avatar: u(DOG[3], 240, 240), category: "狗狗", breed: "柯基",
    gender: "男生", approxAge: "4岁", personality: ["活泼", "社牛", "贪吃"], hobby: ["散步", "玩球"],
    bio: "别看我腿短，跑得可快了。", ownerId: "o1", ownerName: "小林", followers: 1876,
    postCount: 3, active: true, mine: true },
  { id: "p_huasheng", name: "花生", avatar: u(HAM[0], 240, 240), category: "仓鼠",
    approxAge: "1岁", personality: ["胆小", "爱越狱"], hobby: ["啃玩具", "钻纸箱"],
    bio: "越狱是我毕生的事业。", ownerId: "o1", ownerName: "小林", followers: 642,
    postCount: 2, active: true, mine: true },
  { id: "p_xiaoqi", name: "小七", avatar: u(KIT[0], 240, 240), category: "猫咪", breed: "美国短毛猫",
    gender: "女生", approxAge: "3岁", personality: ["温柔", "粘人"], hobby: ["睡觉", "晒太阳"],
    bio: "安静的美喵子。", ownerId: "o2", ownerName: "阿麦", followers: 5210, postCount: 2, active: true, mine: false },
  { id: "p_tuanzi", name: "团子", avatar: u(KIT[1], 240, 240), category: "猫咪", breed: "布偶猫",
    gender: "男生", approxAge: "1岁", personality: ["社牛", "贪吃"], hobby: ["玩球", "钻纸箱"],
    bio: "谁的手都想抱一抱。", ownerId: "o3", ownerName: "团子的主人", followers: 8900, postCount: 2, active: true, mine: false },
  { id: "p_kafei", name: "咖啡", avatar: u(DOG[0], 240, 240), category: "狗狗", breed: "柴犬",
    gender: "男生", approxAge: "2岁", personality: ["高冷", "聪明"], hobby: ["散步"],
    bio: "微笑是我的营业标准。", ownerId: "o4", ownerName: "七七", followers: 3320, postCount: 1, active: true, mine: false },
  { id: "p_mashu", name: "麻薯", avatar: u(KIT[4], 240, 240), category: "猫咪", breed: "中华田园猫",
    gender: "女生", approxAge: "5岁", personality: ["高冷"], hobby: ["睡觉"],
    bio: "生人勿近。", ownerId: "o5", ownerName: "小北", followers: 1204, postCount: 1, active: true, mine: false },
  { id: "p_buding", name: "布丁", avatar: u(HAM[1], 240, 240), category: "仓鼠",
    approxAge: "半岁", personality: ["贪吃"], hobby: ["啃玩具"], bio: "腮帮子能装下整个世界。",
    ownerId: "o2", ownerName: "阿麦", followers: 380, postCount: 1, active: true, mine: false },
  { id: "p_niangao", name: "年糕", avatar: u(DOG[4], 240, 240), category: "狗狗", breed: "金毛",
    gender: "男生", approxAge: "3岁", personality: ["温柔", "社牛"], hobby: ["玩水", "散步"],
    bio: "天生的暖心大狗。", ownerId: "o4", ownerName: "七七", followers: 6600, postCount: 1, active: true, mine: false },
];

let pc = 0;
const post = (petId: string, title: string, body: string | undefined, imgs: string[],
  likes: number, ago: number, opts: Partial<Post> = {}): Post => ({
  id: "post" + ++pc, petId, title, body, images: imgs, likes, liked: false,
  favorited: false, createdAt: NOW - ago, ...opts,
});

export const posts: Post[] = [
  post("p_naitang", "纸箱才是最好的猫窝",
    "买了一个新窝，结果它还是坚定地选择了纸箱。可能纸箱才是真正的豪宅吧。",
    [u(CAT[0], 800, 1180), u(CAT[5], 800, 1080), u(CAT[7], 800, 800)], 328, 2 * hour, { favorited: true }),
  post("p_doubao", "第一次看到雪", "豆包盯着窗外看了一整个下午。",
    [u(DOG[1], 800, 560), u(DOG[3], 800, 900)], 512, 5 * hour, { liked: true }),
  post("p_huasheng", "今天又越狱成功了", undefined,
    [u(HAM[2], 800, 800), u(HAM[0], 800, 620)], 209, 26 * hour),
  post("p_tuanzi", "谁允许你睡我枕头", "一觉醒来发现枕头被占领了。",
    [u(KIT[1], 800, 1000)], 876, 3 * hour),
  post("p_xiaoqi", "新玩具只喜欢了三分钟", "三分钟热度是猫咪的天性。",
    [u(KIT[0], 800, 900), u(CAT[2], 800, 1100)], 431, 8 * hour),
  post("p_kafei", "微笑营业中", undefined, [u(DOG[0], 800, 620)], 655, 20 * hour),
  post("p_naitang", "午后的一小时阳光", "晒太阳是每天的必修课。",
    [u(CAT[3], 800, 1180), u(CAT[6], 800, 760)], 288, day + 3 * hour, { liked: true, favorited: true }),
  post("p_niangao", "去河边玩水啦", "金毛见到水就走不动路。",
    [u(DOG[4], 800, 1100), u(DOG[5], 800, 780)], 743, 12 * hour),
  post("p_mashu", "生人勿近的一天", undefined, [u(KIT[4], 800, 980)], 190, 30 * hour),
  post("p_tuanzi", "求抱抱的眼神", "这眼神谁顶得住。", [u(KIT[2], 800, 1180)], 1203, 6 * hour),
  post("p_doubao", "短腿也能跑很快", undefined, [u(DOG[2], 800, 540), u(DOG[1], 800, 800)], 402, day + 6 * hour),
  post("p_naitang", "猫条只给一根的抗议", "抗议无效，继续营业。",
    [u(CAT[4], 800, 1300)], 356, 2 * day, { favorited: true }),
  post("p_buding", "腮帮子装满啦", undefined, [u(HAM[1], 800, 700)], 156, 40 * hour),
  post("p_xiaoqi", "安静地打个盹", undefined, [u(CAT[2], 800, 1100)], 267, 2 * day + 2 * hour),
  post("p_doubao", "散步遇到好朋友", "今天在小区认识了新朋友。",
    [u(DOG[3], 800, 900), u(DOG[2], 800, 600)], 380, 3 * day),
];

let cc = 0;
const cm = (postId: string, name: string, avatar: string, content: string, ago: number,
  opts: Partial<Comment> = {}): Comment => ({
  id: "c" + ++cc, postId, userName: name, userAvatar: avatar, content, createdAt: NOW - ago, ...opts,
});

export const comments: Comment[] = [
  cm("post1", "团子的主人", u(KIT[1], 100, 100), "这个睡姿和我家的一模一样哈哈哈", 100 * min, { id: "c_root1" }),
  cm("post1", "小林", owner.avatar, "它每天都这样睡。", 90 * min, { parentId: "c_root1", replyTo: "团子的主人", mine: true }),
  cm("post1", "七七", u(KIT[5], 100, 100), "纸箱之神！", 80 * min, { parentId: "c_root1", replyTo: "小林" }),
  cm("post1", "小北", u(DOG[4], 100, 100), "求这个纸箱的链接", 70 * min, { parentId: "c_root1", replyTo: "七七" }),
  cm("post1", "阿麦", u(KIT[0], 100, 100), "第三张也太可爱了吧", 60 * min, { parentId: "c_root1", replyTo: "小北" }),
  cm("post1", "咖啡的主人", u(DOG[0], 100, 100), "我家的也是只认纸箱", 50 * min, { parentId: "c_root1", replyTo: "阿麦" }),
  cm("post1", "阿麦", u(KIT[0], 100, 100), "奶糖今天也很美", 40 * min, { id: "c_root2" }),
  cm("post1", "七七", u(KIT[5], 100, 100), "这条被我删掉啦", 30 * min, { id: "c_root3", mine: true, deleted: true }),
  cm("post1", "小北", u(DOG[4], 100, 100), "顶一下这条被删的评论", 20 * min, { parentId: "c_root3", replyTo: "七七" }),
];

export const messages: Msg[] = [
  { id: "m1", kind: "like", actor: "阿麦", actorAvatar: u(KIT[0], 100, 100),
    text: "赞了奶糖的动态", thumb: u(CAT[0], 200, 200), postId: "post1", createdAt: NOW - 30 * min },
  { id: "m2", kind: "comment", actor: "团子的主人", actorAvatar: u(KIT[1], 100, 100),
    text: "评论了奶糖的动态", thumb: u(CAT[0], 200, 200), postId: "post1", commentId: "c_root1", createdAt: NOW - 100 * min },
  { id: "m3", kind: "comment", actor: "七七", actorAvatar: u(KIT[5], 100, 100),
    text: "回复了你的评论", thumb: u(CAT[0], 200, 200), postId: "post1", commentId: "c3", createdAt: NOW - 80 * min },
  { id: "m4", kind: "follow", actor: "小北", actorAvatar: u(DOG[4], 100, 100),
    text: "开始关注奶糖了", petName: "奶糖", petAvatar: u(CAT[7], 100, 100), createdAt: NOW - 3 * hour },
  { id: "m5", kind: "like", actor: "七七", actorAvatar: u(KIT[5], 100, 100),
    text: "收藏了奶糖的动态", thumb: u(CAT[3], 200, 200), postId: "post7", createdAt: NOW - 5 * hour },
  { id: "m6", kind: "follow", actor: "团子的主人", actorAvatar: u(KIT[1], 100, 100),
    text: "开始关注豆包了", petName: "豆包", petAvatar: u(DOG[3], 100, 100), createdAt: NOW - day },
];

/** pets the current user (小林) follows initially */
export const initialFollows = ["p_tuanzi", "p_xiaoqi", "p_kafei"];

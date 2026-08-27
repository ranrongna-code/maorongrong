# Build a Complete Developer-Ready Pet Social Community WeChat Mini Program V1

Create a complete, high-fidelity, developer-ready **WeChat Mini Program** from scratch.

This is not a concept mockup and not a small demo.

The result must be sufficiently complete to hand directly to frontend and backend developers for implementation.

## CRITICAL EXECUTION REQUIREMENT

Do NOT only create the five primary screens.

Do NOT only create happy-path screens.

Do NOT only describe interaction logic internally.

You MUST actually build the visible secondary screens, tertiary screens, forms, dialogs, bottom sheets, error states, empty states, loading states, disabled states, confirmation states, and navigation flows described below.

Every screen listed in this prompt must exist as an actual navigable screen or visible UI state.

The final prototype must feel like a complete V1 product rather than a presentation concept.

---

# 1. Language

This prompt is written in English for better AI understanding.

However:

**ALL user-facing UI content MUST be in Simplified Chinese.**

This includes:

- Navigation
- Page titles
- Buttons
- Tabs
- Form labels
- Placeholders
- Validation messages
- Toasts
- Dialogs
- Empty states
- Loading states
- Error states
- Pet names
- User names
- Post titles
- Post content
- Comments
- Messages
- Settings

Do NOT generate English UI copy.

Do NOT use Lorem Ipsum.

Use natural Chinese consumer-app language.

---

# 2. Product Definition

Create a warm pet-centered social community.

The core product concept is:

**Every pet has its own social identity.**

Human users use WeChat to log in and manage accounts.

Humans create and manage pets.

Pets are the primary public identities in the community.

The relationship is:

**主人创建宠物 → 宠物发布动态 → 用户发现宠物 → 用户关注宠物 → 持续查看宠物动态**

Users follow pets, not human owners.

One human account may manage multiple pets.

Do not create a strong human-to-human social network.

---

# 3. V1 Scope

V1 focuses only on:

- 微信登录
- 主人资料
- 宠物档案
- 宠物主页
- 宠物动态发布
- 首页内容浏览
- 宠物发现
- 搜索
- 猫爪点赞
- 收藏
- 评论
- 二级回复
- 关注宠物
- 社区互动消息
- 我的发布
- 我的收藏
- 我的关注
- 宠物管理
- 基础设置

STRICTLY DO NOT INCLUDE:

- 流浪救助
- 医疗求助
- 视频发布
- 私信
- 聊天
- 电商
- 商城
- 会员
- 直播
- 宠物服务
- 宠物医院
- 领养流程
- 举报
- 分享
- 分享海报
- 微信好友分享
- 热门话题
- 话题发布
- 位置
- 草稿箱
- 浏览历史
- 主人公开主页
- 粉丝列表
- 系统消息
- 评论点赞
- 手机号登录
- 短信验证码
- 密码登录
- 注销账号

Do not add these features anywhere in the prototype.

---

# 4. Visual Direction

Create a warm, healing, premium, mature pet lifestyle visual style.

Keywords:

- Warm
- Healing
- Friendly
- Soft
- Premium
- Modern
- Emotional
- Authentic
- Mature
- Lifestyle-oriented

The product should feel warm and approachable but not childish.

## Color

Primary brand color:

**Warm orange / soft apricot orange**

Background:

- Warm cream white
- Soft off-white
- Very light beige

Text:

- Dark warm gray
- Deep brown-gray
- Soft gray-brown secondary text

## Components

Use:

- Real high-quality pet photography
- Rounded corners
- Approximately 12–20px corner radius depending on component size
- Light shadows only when necessary
- Generous whitespace
- Clean typography
- Simple line icons
- Strong image hierarchy

Avoid excessive:

- Paw-print decorations
- Bone illustrations
- Cartoon animals
- Doodles
- Candy colors
- Child-oriented visual language

Real pet photography should dominate.

---

# 5. Platform

Design specifically for a **微信小程序**.

Use realistic Mini Program interaction patterns.

Support modern mobile widths approximately 375–430px.

Respect safe areas and mobile touch targets.

Use a fixed custom bottom navigation.

---

# 6. Main Navigation

Create a fixed five-item bottom navigation:

**首页｜发现｜＋｜消息｜我的**

The center `＋` should be a prominent circular warm-orange action button.

Clicking `＋` directly opens:

**发布动态**

There is no publish-type selection panel.

---

# 7. Home Navigation

The Home page contains only ONE centered top tab row:

**关注｜推荐**

The two tabs must be horizontally centered.

Do not create a second navigation row.

Do not add:

- 宠物分享
- 流浪救助
- 医疗求助

Default selected tab:

**推荐**

---

# 8. Recommended Feed

The 推荐 tab is the default Home experience.

Use a two-column masonry feed.

Images are the dominant visual element.

Maintain the original aspect ratio of the cover image.

Card width is fixed while height adapts to image ratio.

Use a sensible maximum image height for extremely tall images.

Do not crop everything into the same aspect ratio.

Each card contains:

- First image as cover
- Post title
- Pet avatar
- Pet name
- Cat-paw Like icon
- Like count
- Comment icon
- Comment count

Example:

**第一次看到雪**

宠物：

**豆包**

猫爪点赞：

**328**

评论：

**42**

## Important Like Icon Rule

The Like icon MUST be a:

**猫爪图标**

Do NOT use a heart icon for Like anywhere in the product.

Use the cat-paw interaction consistently on:

- Home cards
- Post detail
- My Posts
- My Favorites
- Search results
- Like notifications

---

# 9. Recommended Feed Ranking

The frontend simply displays backend-provided order.

Conceptually use a simple recommendation logic:

- Recent posts prioritized
- Interaction may slightly increase priority
- Avoid too many consecutive posts from the same pet
- Previously viewed content may receive slightly lower priority

Do not create complex personalization controls.

---

# 10. Following Feed

The 关注 tab displays posts from pets the current user follows.

Sort by publication time descending.

Use the same masonry card component.

Support:

- Initial Loading
- Load more / pagination
- Loading failure
- Retry
- Empty state
- No more data

Do NOT implement pull-to-refresh in V1.

Empty example:

**这里还安静得像猫咪睡着了一样。**

**去认识一些你喜欢的小家伙吧。**

CTA:

**去发现**

---

# 11. Feed Pagination

Recommended and Following feeds both use pagination.

Load initial page automatically.

Load more when reaching the bottom.

Do not implement complex scroll-position persistence.

Use a lightweight ending message when no more data is available.

---

# 12. Post Card

Post cards display:

- Cover image
- Title
- Pet avatar
- Pet name
- Cat-paw Like count
- Comment count

Do NOT show favorite count.

Do NOT show owner identity prominently.

The pet identity is primary.

---

# 13. Publishing Flow

Clicking the center `＋` opens:

**发布动态**

The page order must be:

1. 选择宠物
2. 添加图片
3. 标题
4. 正文
5. 发布按钮

---

# 14. Pet Selection During Publishing

Each post MUST belong to exactly one pet.

A post cannot belong to multiple pets.

Do NOT support tagging other pets.

If the user owns only one active pet, automatically select it.

If multiple active pets exist, allow selecting one.

If no active pet exists:

Guide the user to:

**快速创建宠物**

After the pet is created from this flow:

Return automatically to the Publish page and select the newly created pet.

---

# 15. Post Images

Each post requires:

**1–9 images**

At least one image is mandatory.

Pure-text posts are not supported.

Support:

- 从相册选择
- 拍照
- 删除已选择图片
- 大图预览
- 上传失败后重新上传

Do NOT support:

- Video
- Image editing
- Image filters
- Drag sorting
- Custom cover selection

Image order is based on the original selection order.

The first image is always the cover.

New images added during post editing are appended to the end.

If the first image is removed, the second image automatically becomes the new cover.

---

# 16. Image Upload Behavior

Treat post image upload as one batch.

If any image fails:

The entire upload batch fails.

Display:

**图片上传失败，请重新上传**

Keep all current editing data:

- Pet
- Images
- Title
- Body

The user manually retries the complete upload batch.

Only allow final submission after every image has successfully uploaded.

---

# 17. Image Permissions

Use on-demand Mini Program permissions.

Do not request photo/camera permission at first launch.

When user taps:

**从相册选择**

request the relevant photo permission.

When user taps:

**拍照**

request camera permission.

If permission is denied:

Show a visible permission-denied state.

Example:

**需要相册权限才能选择照片**

Actions:

**去设置**

**暂不开启**

Do not clear editing content.

---

# 18. Post Title

Title is required.

Maximum length:

**15 characters**

Display a counter:

**8/15**

Rules:

- Trim leading/trailing spaces
- Spaces-only is invalid
- Empty title cannot be submitted
- Over-limit title cannot be submitted
- Frontend and backend both validate

---

# 19. Post Body

Post body is optional.

Maximum:

**500 characters**

Display character count where appropriate.

A valid post requires:

- One active pet
- 1–9 images
- Valid title

Body may be empty.

---

# 20. Publish Button

Use a fixed bottom primary CTA:

**发布**

States:

### Disabled

When any required field is invalid.

### Enabled

When:

- Pet selected
- At least 1 valid image
- Valid title

### Loading

During submission.

Prevent duplicate submission.

### Failure

Display:

**发布失败，请重试**

Keep all entered content.

Allow manual retry.

### Success

Toast:

**发布成功**

Then automatically return to:

**首页 → 推荐**

Do not create a separate success page.

---

# 21. Exit Publish Confirmation

If the user has:

- Selected a pet
- Added an image
- Entered a title
- Entered body content

and taps Back:

Show:

**是否放弃本次编辑？**

Actions:

**继续编辑**

**放弃**

Do not save a draft.

If the page is completely empty, return directly.

---

# 22. Edit Post

Reuse the same publishing form.

Page title:

**编辑动态**

Pre-fill:

- Original pet
- Original images
- Original title
- Original body

The pet association is LOCKED.

The pet cannot be changed after publishing.

Allow:

- Remove image
- Add image
- Edit title
- Edit body

Bottom button:

**保存**

States:

- No changes → Disabled
- Changed → Enabled
- Saving → Loading
- Failure → Keep edited content

When leaving with unsaved changes:

**当前修改尚未保存，是否放弃？**

Actions:

**继续编辑**

**放弃修改**

---

# 23. Delete Post

Authors can delete their own posts.

Use soft deletion.

Before deleting show:

**确定删除这条动态吗？**

Secondary copy:

**删除后将不再对外展示。**

Actions:

**取消**

**删除**

After deletion:

- Remove from Home
- Remove from Search
- Remove from My Posts
- Remove from Pet Profile
- Remove images from Pet Album
- Make Post Detail inaccessible
- Remove it from active Favorites results

Keep the deleted backend record.

---

# 24. Post Detail

Create a complete Post Detail page.

Top area:

- Pet avatar
- Pet name
- Breed / age if available
- Follow button

Content:

- Post title
- Full body if available
- All images
- Full publication time

Bottom area:

- Comments

Fixed bottom interaction bar:

**猫爪点赞｜评论｜收藏**

Do NOT include:

- Share
- Report

---

# 25. Post Detail Images

If a post contains multiple images:

Display all images vertically in publication order.

Maintain their original aspect ratios.

Tap any image to open fullscreen preview.

Fullscreen preview supports horizontal swiping through all images in that post.

Display:

**2 / 6**

---

# 26. Post Time

List/card contexts use relative time when time is shown:

- 刚刚
- 5分钟前
- 2小时前
- 昨天
- 3天前

Post Detail uses full time:

**2026年8月27日 15:42**

---

# 27. Like

Like applies only to posts.

Use the Cat Paw icon.

Support:

- 点赞
- 取消点赞

Display Like count.

Update optimistically.

If API request fails:

- Roll back state
- Display Toast

Do not support comment Likes.

---

# 28. Favorite

Support:

- 收藏
- 取消收藏

Favorite has only active/inactive state.

Do NOT display public Favorite count.

---

# 29. Comment System

Use a strict two-level comment model.

Structure:

**帖子**
→ **一级评论**
→ **二级回复**

There is no third level.

Replying to a second-level reply still creates another second-level reply within the same first-level thread.

---

# 30. Comment Sorting

First-level comments:

**time ascending**

Oldest first.

Second-level replies:

**time ascending**

Do NOT implement:

- Hot comments
- Popular comment ranking
- Pinned comments

---

# 31. Comment Length

First-level comment:

Maximum **200 characters**

Second-level reply:

Maximum **200 characters**

Rules:

- Empty input invalid
- Spaces-only invalid
- Show counter
- Frontend and backend validate

---

# 32. Comment Input

Tap the Comment action in the fixed Post Detail interaction bar.

Open a bottom input area and keyboard.

Show:

**0/200**

Normal comment:

Creates first-level comment.

Tap Reply on a comment:

Placeholder changes to:

**回复 团子的主人**

Submitting creates a second-level reply.

States:

- Default
- Sending
- Success
- Failed

Failure keeps typed content for retry.

---

# 33. Second-Level Reply Display

Each first-level comment displays the first:

**2 replies**

by default.

If more exist:

Display:

**展开更多 6 条回复**

Tapping expands the remaining replies.

Do not create a separate reply-detail page.

---

# 34. Comment Count

The post comment count includes:

- First-level comments
- Second-level replies

Adding a comment/reply increases the total.

Deleting a comment/reply decreases the valid total.

---

# 35. Delete Comment

Users can delete their own comments and replies.

Use soft deletion.

Deleted first-level comment displays:

**该评论已删除**

Its existing replies remain visible.

Deleted reply displays:

**该回复已删除**

Do not delete an entire thread because its first-level comment was removed.

---

# 36. Login

Use WeChat Mini Program authorization login.

Do NOT create:

- Phone login
- SMS verification
- Password
- Forgot password

First-use flow:

**进入小程序 → 用户协议/隐私确认 → 微信授权登录 → 创建主人账号 → 首页**

Returning user:

**进入小程序 → 恢复登录态 → 首页**

If login state is invalid:

Attempt WeChat login restoration.

If it fails:

Return to the authorization page.

---

# 37. Login Screens and States

Actually create visible states/screens for:

- 首次进入
- 微信授权登录
- 用户协议 / 隐私政策确认
- 授权中
- 授权取消
- 授权失败
- 网络异常
- 重新授权

Do not hide these only as logic.

---

# 38. Owner Profile Initialization

After first successful WeChat login:

Initialize the owner using available:

- WeChat avatar
- WeChat nickname

If unavailable:

Use:

- Default avatar
- Default nickname such as `宠友3826`

If imported nickname exceeds the local limit, gracefully fit it to the supported profile format.

Do not block access to Home due to incomplete owner profile.

---

# 39. Edit Owner Profile

Create a real page:

**编辑个人资料**

Fields:

### 头像

Editable.

Support:

- 相册
- 拍照
- 1:1 crop

Display as circular avatar.

### 昵称

Required.

Length:

**2–12 characters**

### 一句话简介

Optional.

Maximum:

**50 characters**

Do NOT include:

- Gender
- Birthday
- City

Use one unified button:

**保存**

States:

- Disabled
- Enabled
- Loading
- Save failure

When leaving with unsaved changes show:

**当前修改尚未保存，是否放弃？**

---

# 40. Pet Identity

Pets are the primary public social identities.

Owners are managers.

One owner may manage multiple pets.

Users follow pets.

Do NOT create an owner public profile.

On a pet profile:

**主人 @小林**

is only secondary static information.

It is NOT clickable.

---

# 41. Quick Pet Creation

Create a lightweight page:

**创建宠物档案**

Only 3 required pieces of information:

### 宠物头像

Required.

Upload with fixed:

**1:1 crop**

Display as circular avatar.

### 宠物名字

Required.

Length:

**1–10 characters**

### 宠物类别

Required.

Fixed categories:

**猫咪｜狗狗｜仓鼠｜鸟类｜爬宠｜其他**

---

# 42. Custom Species

If category is:

**其他**

show:

**具体类别**

Required.

Maximum:

**10 characters**

Examples:

- 兔子
- 龙猫
- 刺猬

All custom species remain grouped under the standard category:

**其他**

in Discover.

---

# 43. Quick Creation Navigation

Do NOT create a dedicated creation-success screen.

When pet creation is entered from:

**我的 → 我的宠物 → 添加宠物**

creation success navigates directly to the new Pet Profile.

When entered from:

**发布动态**

creation success returns to Publish and automatically selects the new pet.

---

# 44. Pet Profile Completion

Show:

**档案完成度**

only to the owner of that pet.

Other users do NOT see it.

Completion contains 10 equally weighted fields:

1. 头像
2. 名字
3. 类别
4. 品种
5. 性别
6. 生日 / 大概年龄
7. 到家日期
8. 性格标签
9. 爱好标签
10. 简介

Each = 10%.

Quick creation therefore starts at:

**30%**

Show:

**去完善**

when incomplete.

---

# 45. Edit Pet Profile

Create an actual complete secondary page.

Fields:

- 头像
- 名字
- 类别
- 品种
- 性别
- 出生日期 / 大概年龄
- 到家日期
- 性格标签
- 爱好标签
- 简介

Do NOT include city.

Use one unified:

**保存**

button.

States:

- No changes → Disabled
- Changed → Enabled
- Saving → Loading
- Save failed → Keep changes

Unsaved Back confirmation:

**当前修改尚未保存，是否放弃？**

---

# 46. Breed

Breed uses a backend-controlled dictionary.

Example Cat breeds:

- 英国短毛猫
- 美国短毛猫
- 布偶猫
- 暹罗猫
- 中华田园猫
- 其他

Example Dog breeds:

- 柯基
- 柴犬
- 金毛
- 拉布拉多
- 贵宾
- 中华田园犬
- 其他

When selecting:

**其他**

show:

**具体品种**

Required.

Maximum:

**10 characters**

---

# 47. Pet Gender

Optional fixed values:

**男生｜女生｜未知**

Do not allow custom input.

---

# 48. Pet Age

If exact birthday is known:

User selects:

**出生日期**

Age is calculated automatically.

Example:

**2岁3个月**

If birthday is unknown:

User may choose:

**大概年龄**

Birthday and approximate age are mutually exclusive.

Do not manually store a second current-age field when a birthday exists.

---

# 49. Arrival Date

Field:

**到家日期**

is optional.

If empty, do not display it publicly.

If filled, show natural copy such as:

**2024年5月来到家里**

---

# 50. Personality Tags

Use preset + custom tags.

Examples:

**粘人｜高冷｜活泼｜胆小｜社牛｜社恐｜贪吃｜拆家｜聪明｜温柔**

Maximum:

**5 tags**

Custom tag maximum:

**6 characters**

Prevent duplicate tags.

---

# 51. Hobby Tags

Use preset + custom tags.

Examples:

**晒太阳｜睡觉｜吃零食｜玩球｜钻纸箱｜散步｜玩水｜啃玩具**

Maximum:

**5 tags**

Custom tag maximum:

**6 characters**

Prevent duplicate tags.

---

# 52. Pet Bio

Optional.

Maximum:

**50 characters**

Example:

**每天最大的烦恼，就是铲屎官只给我一根猫条。**

---

# 53. Pet Profile

This is one of the signature product screens.

Do NOT create a large profile cover image.

Top section:

- Large circular pet avatar
- Pet name
- Breed
- Gender
- Age
- Bio
- Follower count
- Post count
- Follow button
- Static owner information

Example:

**奶糖**

**英国短毛猫 · 女生 · 2岁**

**每天最大的烦恼，就是铲屎官只给我一根猫条。**

**2.3k 粉丝**

**36 动态**

**主人 @小林**

Other user sees:

**＋关注**

After following:

**已关注**

Follower count is display-only and NOT clickable.

Do not create a follower list.

---

# 54. Pet About Section

Create:

**关于奶糖**

Directly show all available information.

Do not use collapse/expand.

Do not create a separate profile-info page.

Hide missing fields.

Possible content:

- 品种
- 性别
- 年龄
- 到家日期
- 性格
- 爱好

---

# 55. Pet Profile Tabs

Use:

**动态｜相册**

Default:

**动态**

Do not remember previous Tab state.

---

# 56. Pet Dynamic Feed

Use the existing masonry visual system.

Sort posts by publication time descending.

Support pagination.

Editing a post does not move it to the top.

---

# 57. Pet Album

The Pet Album is automatically generated from post images.

Do not create an independent album-upload system.

Rules:

- Every published post image enters the pet album
- Sort according to post publication time descending
- Tap image → fullscreen preview
- Allow navigating to the source post
- Deleting a post removes associated album images
- Removing an image from a post removes that image from album

Do NOT support:

- Independent album upload
- Album sorting
- Album deletion
- Album management

---

# 58. Follow Pet

Support:

- ＋关注
- 已关注
- 取消关注

Follow failures:

Rollback UI state and display Toast.

Do not add a cancel-follow confirmation dialog.

---

# 59. My Following

Create:

**我关注的宠物**

Use a standard vertical pet list.

Each row includes:

- Avatar
- Pet name
- Breed
- Age
- Follower count
- 已关注

Sort by Follow time descending.

Tap pet → Pet Profile.

Tap 已关注 → Cancel follow.

After success:

Remove the pet from the current list.

Support:

- Loading
- Pagination
- Empty
- Failure

---

# 60. Pet Deactivation

Pets are NOT physically deleted.

Use:

**停用宠物档案**

Create a Pet Management page with tabs:

**在用｜已停用**

---

# 61. Active Pets

Each active pet row shows:

- Avatar
- Name
- Breed
- Age
- Profile completion
- 编辑
- 停用

Provide:

**＋ 添加宠物**

---

# 62. Deactivated Pets

Each row shows:

- Avatar
- Name
- Deactivation time
- 恢复档案

Restoring returns the pet to:

**在用**

and makes it available for new publishing again.

---

# 63. Deactivate Confirmation

Before deactivating show a real dialog:

**确定停用这个宠物档案吗？**

Explain:

**停用后将不能继续使用该宠物发布动态，历史动态仍会保留。**

Actions:

**取消**

**确认停用**

---

# 64. Deactivated Pet Historical Posts

Historical posts remain visible.

Keep the original pet identity snapshot:

- Avatar
- Pet name
- Breed

But avatar and name are NOT clickable.

Add subtle label:

**档案已停用**

Do not allow navigation to the inactive Pet Profile.

If the pet is restored, identity links become active again.

---

# 65. Discover Page

The Discover page focuses only on finding pets.

Page title:

**发现**

Include:

1. Search bar
2. Pet categories
3. Trending Pets
4. Recommended Pets

Do NOT include:

- Trending topics
- Weekly popular posts
- Editorial sections
- Rescue
- Medical content

---

# 66. Discover Search

Search field:

**搜索宠物、动态**

Clicking opens Search.

Do not implement:

- Search history
- Trending keywords
- Topic search
- Owner search

---

# 67. Pet Categories

Display:

**猫咪｜狗狗｜仓鼠｜鸟类｜爬宠｜其他**

Use circular real pet photos or elegant simple icons.

Custom species are always included in:

**其他**

---

# 68. Category Pet List

Click a category, for example:

**猫咪**

Open a real secondary page titled:

**猫咪**

Display a vertical pet list/card layout with:

- Avatar
- Pet name
- Breed
- Age
- Follower count
- ＋关注 / 已关注

Tap pet → Pet Profile.

Support:

- Initial loading
- Pagination
- Empty
- Failure
- Retry

---

# 69. Trending Pets

Section:

**大家最近都在关注**

Use horizontal pet cards.

Backend ranking conceptually uses:

- Recent follower growth
- Recent post likes
- Recent comments

Frontend simply displays returned results.

---

# 70. Recommended Pets

Section:

**推荐认识**

Prioritize conceptually:

- Active pets
- Recently posted pets
- Pets current user does not already follow

Do not create complex personalization UI.

---

# 71. Search Result Page

Search only:

- 宠物
- 帖子

Top Tabs:

**宠物｜帖子**

Do not create a 综合 Tab.

---

# 72. Pet Search Results

Display:

- Avatar
- Pet name
- Breed
- Age
- Follower count
- ＋关注 / 已关注

Tap → Pet Profile.

Support:

- Loading
- Empty
- Failure
- Pagination

---

# 73. Post Search Results

Use the same masonry card component as Home.

Search may match:

- Post title
- Post body
- Pet name

Do not search owner nickname.

Display:

- Cover
- Title
- Pet avatar/name
- Cat-paw Like count
- Comment count

---

# 74. Messages

The Message system contains ONLY:

**赞与收藏｜评论回复｜新关注**

Do NOT create:

**系统消息**

---

# 75. Message Home

Page title:

**消息**

Top 3 category shortcuts:

**赞与收藏**

**评论回复**

**新关注**

Each category may display a small red dot.

Do not display numeric unread counts.

Below categories display:

**最近消息**

Mix all three interaction types in descending time order.

---

# 76. Message Bottom Navigation Red Dot

If any new interaction exists:

Display one small red dot on the bottom:

**消息**

Tab.

No number.

Entering the Message page clears the bottom-tab red dot.

---

# 77. Category Red Dots

Each category independently uses a simple red-dot state.

Entering the corresponding category list clears that category red dot.

Do not implement per-item read states.

---

# 78. Like and Favorite Messages

Create category list:

**赞与收藏**

Examples:

**阿麦赞了奶糖的动态**

**七七收藏了奶糖的动态**

Show:

- Actor avatar
- Actor nickname
- Post thumbnail
- Time

Tap → Post Detail.

If deleted:

**该内容已不存在**

---

# 79. Comment and Reply Messages

Create:

**评论回复**

Examples:

**团子的主人评论了奶糖的动态**

**七七回复了你的评论**

Tap notification:

1. Open Post Detail
2. Scroll automatically to target first-level comment
3. If target is a reply, expand the corresponding reply thread
4. Scroll to the reply
5. Temporarily highlight the target item

If the target was soft deleted, still locate:

**该评论已删除**

or:

**该回复已删除**

If post was deleted:

**该内容已不存在**

---

# 80. New Follow Messages

Create:

**新关注**

Example:

**小北开始关注奶糖了**

Display:

- Follower avatar
- Follower nickname
- Pet avatar
- Pet name
- Time

Tap → Pet Profile.

---

# 81. My Page

Page title:

**我的**

Top owner information:

- Avatar
- Nickname
- Bio
- 编辑资料
- 设置

Primary section:

**我的宠物**

Show active pet previews and:

**＋ 添加宠物**

Functional entries:

- 我的宠物
- 我的发布
- 我的收藏
- 我关注的宠物

Do NOT include:

- 草稿
- 浏览历史
- 救助
- 医疗求助

---

# 82. My Posts

Create:

**我的发布**

Reuse Home masonry cards.

Sort by publication time descending.

Display:

- Cover
- Title
- Pet name
- Cat-paw Like count
- Comment count

Tap → Post Detail.

Own posts have access to:

- 编辑
- 删除

Support:

- Loading
- Pagination
- Empty
- Failure

---

# 83. My Favorites

Create:

**我的收藏**

Reuse Home masonry cards.

Sort by Favorite time descending.

Display:

- Cover
- Title
- Pet name
- Cat-paw Like count
- Comment count

Tap → Post Detail.

Favorite cancellation happens primarily from Post Detail.

After returning, remove an unfavorited post from the list.

Support:

- Loading
- Pagination
- Empty
- Failure

---

# 84. Settings

Create an actual Settings page.

Include ONLY:

- 隐私政策
- 用户协议
- 关于我们
- 意见反馈
- 退出登录

Do NOT include:

- 注销账号
- 消息设置
- 黑名单
- 账号安全中心
- Advanced privacy controls

---

# 85. Privacy Policy

Create a readable secondary page:

**隐私政策**

Use realistic structured placeholder policy content in Chinese without overly long legal text.

---

# 86. User Agreement

Create:

**用户协议**

Use realistic structured Chinese agreement content.

---

# 87. About

Create:

**关于我们**

Show:

- Product logo
- Product name
- Short product introduction
- Version, for example `V1.0.0`

Keep it simple and polished.

---

# 88. Feedback

Create:

**意见反馈**

Include:

- Feedback text area
- Maximum 500 characters
- Character counter
- Submit button

Button states:

- Empty → Disabled
- Valid → Enabled
- Submitting → Loading
- Failure → Retry

Success:

**感谢你的反馈**

Do not build a complex support-ticket system.

---

# 89. Logout

Tap:

**退出登录**

Show real confirmation dialog:

**确定退出登录吗？**

Actions:

**取消**

**退出**

After success:

Return to the WeChat authorization/login state.

---

# 90. Common Loading States

Every network-driven list must have visible examples of:

- Initial Loading
- Pagination Loading
- Failure
- Retry
- Empty
- No More Data

Do not leave blank screens.

Use restrained warm styling.

---

# 91. Common Empty States

Use natural Chinese copy.

Avoid generic:

**暂无数据**

Examples:

### No following posts

**这里还安静得像猫咪睡着了一样。**

**去认识一些你喜欢的小家伙吧。**

### No pets

**还没有小家伙住进这里**

CTA:

**添加宠物**

### No posts

**这里还没有动态**

### No favorites

**还没有收藏喜欢的内容**

### No following pets

**还没有关注的小家伙**

CTA:

**去发现**

### No search result

**没有找到相关内容**

**换个关键词试试吧。**

---

# 92. Common Error States

Use clear natural Chinese:

**加载失败，请重试**

**网络开小差了，请稍后再试**

**发布失败，请重试**

**保存失败，请重试**

**图片上传失败，请重新上传**

Do not expose technical error codes.

---

# 93. Button States

Important buttons must have visible UI variants for:

- Disabled
- Enabled
- Loading

Prevent duplicate submissions.

Use warm-orange primary buttons.

---

# 94. Confirmation Dialogs

Actually design visible dialogs for:

- 放弃发布编辑
- 放弃帖子修改
- 删除帖子
- 删除评论
- 停用宠物
- 放弃宠物档案修改
- 放弃主人资料修改
- 退出登录

Do not leave confirmation only as written logic.

---

# 95. Key Prototype Flows

Create working clickable prototype connections.

## Flow 1 — Login

**进入小程序 → 协议/隐私确认 → 微信授权 → 首页推荐**

## Flow 2 — Browse Content

**首页推荐 → 动态详情 → 猫爪点赞 / 收藏 / 评论**

## Flow 3 — Discover Pet

**发现 → 热门宠物 / 分类 → 宠物主页 → 关注**

## Flow 4 — Following

**关注宠物 → 首页 → 关注 → 查看该宠物动态**

## Flow 5 — First Publish

**首页 → ＋ → 发布动态 → 无宠物 → 创建宠物 → 返回发布页 → 自动选中新宠物 → 上传图片 → 标题 → 发布 → 首页推荐**

## Flow 6 — Normal Publish

**首页 → ＋ → 选择宠物 → 图片 → 标题 → 正文 → 发布**

## Flow 7 — Edit Post

**我的 → 我的发布 → 动态详情 → 编辑 → 保存**

## Flow 8 — Delete Post

**我的发布 → 动态详情 → 删除 → 二次确认**

## Flow 9 — Comments

**动态详情 → 评论 → 回复 → 展开更多回复 → 删除自己的评论**

## Flow 10 — Pet Management

**我的 → 我的宠物 → 在用 → 编辑 → 停用 → 已停用 → 恢复**

## Flow 11 — My Favorites

**我的 → 我的收藏 → 动态详情 → 取消收藏 → 返回收藏列表**

## Flow 12 — My Following

**我的 → 我关注的宠物 → 宠物主页 / 取消关注**

## Flow 13 — Comment Notification

**消息 → 评论回复 → 动态详情 → 自动定位评论**

## Flow 14 — Search

**发现 → 搜索 → 宠物 / 帖子结果 → 宠物主页 / 动态详情**

---

# 96. Required Actual Screen Set

Do NOT stop after the main five pages.

At minimum, visibly create these screens/routes/states:

1. 微信登录 / 首次授权
2. 协议与隐私确认
3. 登录失败 / 网络异常状态
4. 首页 - 推荐
5. 首页 - 关注
6. 动态详情
7. 图片全屏预览
8. 评论输入状态
9. 二级回复展开状态
10. 评论删除状态
11. 发现首页
12. 宠物分类列表
13. 搜索页
14. 搜索结果 - 宠物
15. 搜索结果 - 帖子
16. 搜索无结果
17. 发布动态
18. 发布动态填写完成状态
19. 图片权限拒绝状态
20. 图片上传失败状态
21. 发布失败状态
22. 编辑动态
23. 删除动态确认
24. 快速创建宠物
25. 宠物主页 - 他人视角
26. 宠物主页 - 自己视角
27. 完善 / 编辑宠物档案
28. 我的宠物 - 在用
29. 我的宠物 - 已停用
30. 停用宠物确认
31. 消息首页
32. 赞与收藏列表
33. 评论回复列表
34. 新关注列表
35. 我的首页
36. 编辑个人资料
37. 我的发布
38. 我的收藏
39. 我关注的宠物
40. 设置
41. 隐私政策
42. 用户协议
43. 关于我们
44. 意见反馈
45. 退出登录确认

Where loading/error/empty states do not require an entire separate route, create them as clearly visible component variants or dedicated example states.

---

# 97. Consistent Example Data

Use consistent identities throughout the entire prototype.

Main owner:

**小林**

Bio:

**家里住着三位真正的主人。**

Main pets:

### 奶糖

- 猫咪
- 英国短毛猫
- 女生
- 2岁
- Personality: 高冷、贪吃、粘人
- Hobby: 晒太阳、纸箱、鸡胸肉

Bio:

**每天最大的烦恼，就是铲屎官只给我一根猫条。**

### 豆包

- 狗狗
- 柯基
- 男生
- 4岁
- Personality: 活泼、社牛、贪吃

### 花生

- 仓鼠
- 1岁
- Personality: 胆小、爱越狱

Additional pets:

- 小七
- 团子
- 咖啡
- 麻薯
- 布丁
- 年糕

Additional users:

- 阿麦
- 七七
- 团子的主人
- 小北

Keep identity relationships consistent across Home, Post Detail, Messages, Pet Profiles, and Search.

---

# 98. Example Post Content

Use realistic short Chinese titles, always within the 15-character limit.

Examples:

**纸箱才是最好的猫窝**

**第一次看到雪**

**今天又越狱成功了**

**谁允许你睡我枕头**

**新玩具只喜欢了三分钟**

Example post body:

**买了一个新窝，结果它还是坚定地选择了纸箱。可能纸箱才是真正的豪宅吧。**

Example comment:

**团子的主人：这个睡姿和我家的一模一样哈哈哈**

Example reply:

**小林 回复 团子的主人：它每天都这样睡。**

---

# 99. Developer-Ready Quality Standard

The final prototype must clearly tell frontend developers:

- What every page looks like
- Where every button navigates
- What fields are required
- What fields are optional
- Input limits
- Disabled states
- Loading states
- Error states
- Empty states
- Confirmation dialogs
- Upload behavior
- Pagination behavior
- Follow state
- Like state
- Favorite state
- Comment hierarchy
- Pet active/deactivated states

The prototype must also make backend responsibilities understandable:

- Owner account
- Pet entity
- Pet status
- Pet profile fields
- Pet completion percentage
- Post entity
- Post image ordering
- Soft deletion
- Like relationship
- Favorite relationship
- Follow relationship
- Two-level comments
- Message event types
- Search
- Pagination

Do not need to expose backend schemas in the UI.

Use the UI flows to make these requirements unambiguous.

---

# 100. Final Execution Instruction

Build the full prototype now.

Do not return only a description.

Do not stop after generating the Home, Discover, Messages, and My screens.

Do not omit secondary or tertiary screens.

Actually create and connect the full screen set described above.

The result should feel like a real **微信宠物社区小程序 V1** that could be handed directly to a frontend and backend development team.

Maintain a consistent warm, premium, mature pet-community design system across every screen.

Again:

**ALL visible UI content MUST be in Simplified Chinese.**

And:

**The Like icon MUST be a CAT PAW, not a heart.**
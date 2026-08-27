Update ONLY the image browsing interaction on the existing **帖子详情** page.

Do NOT redesign the page.

Do NOT modify other screens or unrelated components.

Keep the current visual style, typography, colors, spacing, pet identity area, title, body text, comment section, and fixed bottom interaction bar unchanged.

## Change Required

The current Post Detail page displays multiple images vertically, requiring the user to scroll downward through all images.

Replace this behavior with an image carousel interaction similar to Xiaohongshu / RED.

### New Image Behavior

At the top of the post content, create ONE main image viewing area.

If the post contains multiple images:

- Display only one image at a time
- Allow the user to swipe LEFT and RIGHT horizontally to view the previous or next image
- Do NOT vertically stack all post images
- Do NOT require vertical scrolling to move between post images
- Swiping the images must not interfere with the normal vertical scrolling of the Post Detail page

Example:

Image 1 → swipe left → Image 2 → swipe left → Image 3

The image carousel should NOT loop infinitely.

---

## Image Indicator

For posts with multiple images, clearly indicate the current image position.

Use a subtle indicator such as:

**1 / 6**

Position it in the upper-right or lower-right corner of the image area.

Alternatively, small pagination dots may be used, but the numeric indicator is preferred.

Example:

**3 / 6**

Keep the indicator visually subtle and consistent with the existing warm premium design.

---

## Single Image Posts

If the post contains only one image:

- Display the image normally
- Do not show pagination dots
- Do not show `1 / 1`
- Horizontal swipe interaction is unnecessary

---

## Image Display

The image area should occupy the main width of the content area.

Maintain the original image composition as much as possible.

Use appropriate `cover` or `contain` behavior depending on the image ratio so that the pet remains visually clear.

Do not excessively crop important parts of the pet.

Use the existing rounded-corner visual language.

---

## Fullscreen Preview

Tapping the currently displayed image should open fullscreen image preview.

Fullscreen preview must also support:

- Swipe left/right between images from the same post
- Current image indicator such as `2 / 6`
- Dark immersive background
- Close/back action

When exiting fullscreen preview, return to the same image position in Post Detail.

---

## Post Detail Structure

The final page hierarchy should be:

1. 宠物身份信息
2. 帖子标题
3. 横向图片轮播区域
4. 帖子正文
5. 发布时间
6. 评论区

The page itself can still scroll vertically to read:

- Post body
- Comments

But **the images inside one post must be browsed horizontally rather than vertically**.

---

## Fixed Bottom Interaction Bar

Keep the existing fixed bottom interaction bar unchanged:

**猫爪点赞｜评论｜收藏**

The Like icon must remain a CAT PAW icon, not a heart.

---

## Critical Requirement

Remove the current vertically stacked multi-image layout from Post Detail.

The final interaction must clearly feel like:

**小红书帖子详情的多图左右滑动浏览体验**

rather than a vertically scrolling photo gallery.

All visible UI copy must remain in Simplified Chinese.

Only modify this Post Detail image browsing behavior.
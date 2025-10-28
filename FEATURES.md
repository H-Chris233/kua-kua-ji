# 核心功能说明

本文档详细说明“今日夸夸机”的核心业务逻辑，帮助你快速理解随机夸奖、拥抱券保底等机制，便于二次开发或复用。

## 随机夸奖机制

- 夸奖文案集中维护于 `HelloWorld.vue` 组件的 `praises` 数组。
- `getNewPraise()` 方法通过 `Math.random()` 随机抽取索引，并利用 `previousPraise` 记录上一条结果。
- 在 `do...while` 循环中比较新旧文案，若重复则重新抽取，最多尝试数组长度次，以此降低连续重复的概率。
- 每次抽取成功后将结果写入 `currentPraise`，并增加查看计数器。

```js
let randomIndex
let attempts = 0
const maxAttempts = this.praises.length

do {
  randomIndex = Math.floor(Math.random() * this.praises.length)
  attempts++
} while (this.praises[randomIndex] === this.previousPraise && attempts < maxAttempts)
```

## 拥抱券系统与保底

- 拥抱券文案集中在 `hugCouponText` 中维护，模板根据 `isHugCoupon` 计算属性判断是否需要渲染为可点击元素。
- `noHugCount` 记录连续未抽到拥抱券的次数，当达到 9 次时触发 `showHugCoupon()`，保障体验者不会长期遇不到彩蛋。
- 保底触发后会重置 `noHugCount`，并同步动画控制，保持与常规刷新一致的视觉反馈。

## 计数器与持久化

- 每当生成新的夸夸或拥抱券时，`counter` 自增并在 `persistCounter()` 中写入 `localStorage`。
- 组件 `mounted` 生命周期中读取缓存值，实现跨会话的查看次数统计。
- 该逻辑对 `localStorage` 访问进行了 try/catch 包裹，确保在隐身模式或受限环境下不会抛出未捕获异常。

## 拥抱券弹窗与交互

- 点击拥抱券文案通过 `showHugImage()` 打开模态框，显示位于 `src/assets/mua.png` 的拥抱券大图。
- 模态框提供键盘可达性：
  - 监听 `Escape` 键关闭弹窗。
  - 弹窗打开后自动聚焦关闭按钮，避免键盘用户迷失焦点。
  - 点击遮罩或关闭按钮均可关闭。
- 弹窗开启时为页面 `body` 添加 `overflow: hidden`，防止背景滚动。

## 调试模式

- 访问地址时添加 `?debug`（大小写不敏感），组件会在 `mounted` 钩子中检测参数并跳过随机抽取，直接展示拥抱券。
- 该模式适用于调试拥抱券样式、弹窗交互或截图演示。

## 动画与视觉反馈

- 主体夸奖文本使用 `transition name="fade"` 实现淡入淡出效果。
- 每次刷新时通过 `showNewHearts` 控制新的爱心动画，`@keyframes showNewHearts` 将多个爱心以不同延迟漂浮。
- 页面背景配合固定爱心元素 (`.hearts .heart`) 做轻微浮动，营造浪漫氛围。
- 拥抱券弹窗以及按钮均带有 hover/active 动态效果，提高可点击的视觉暗示。

## 复制功能

- 复制按钮调用 `copyPraise()`，优先使用现代浏览器的 `navigator.clipboard.writeText`。
- 若浏览器不支持 Clipboard API，则回退至隐藏 `textarea` + `document.execCommand('copy')` 方案。
- 成功或失败时调用 `showToastMessage()` 展示提示气泡，让用户明确操作结果。

## 无障碍支持

- 夸奖展示区域设置了 `role="region"` 与 `aria-live="polite"`，屏幕阅读器会在内容更新时朗读。
- 按钮与可交互元素拥有语义化标签与 `aria-label`。
- 模态框声明了 `role="dialog"`、`aria-modal="true"` 以及标题/描述关联，提升可访问性。

## 扩展建议

- **更多彩蛋**：可在 `praises` 数组中添加特定格式的彩蛋，并在 `isHugCoupon` 基础上扩展新的判定逻辑。
- **国际化**：将夸奖语句与界面文案抽离到 JSON/语言包文件，实现多语言随机夸奖。
- **数据来源**：接入后端 API 或在线文案库，只需在 `getNewPraise()` 中替换数据来源，并做好 loading 状态管理即可。

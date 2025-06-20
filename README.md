# 打工人摸鱼进度小程序 🐟

一个帮助打工人记录和管理摸鱼时间的微信小程序，让摸鱼变得更有仪式感！

## 功能特性 ✨

- 📅 **月历视图**：直观展示每日摸鱼进度，圆形进度条显示完成度
- 🎯 **目标设置**：自定义每日摸鱼目标时长（1-12小时）
- 🐟 **一键摸鱼**：点击大按钮记录摸鱼时间，每次增加0.5小时
- 💾 **数据持久化**：本地存储摸鱼记录，数据不丢失
- 🎨 **紫色主题**：现代化渐变设计，视觉效果佳
- 🎉 **成就提示**：达成每日目标时的庆祝动画

## 技术栈 🛠️

- **框架**：微信小程序原生开发
- **UI组件**：Vant Weapp
- **样式**：WXSS + CSS3渐变效果
- **数据存储**：微信小程序本地存储API

## 项目结构 📁

```
touchfish/
├── app.js                 # 小程序入口文件
├── app.json              # 小程序配置文件
├── pages/
│   └── index/
│       ├── index.js      # 主页面逻辑
│       ├── index.wxml    # 主页面结构
│       └── index.wxss    # 主页面样式
├── package.json          # 项目依赖配置
├── project.config.json   # 微信开发者工具配置
└── sitemap.json         # 小程序索引配置
```

## 快速开始 🚀

### 1. 环境准备
- 安装微信开发者工具
- 下载项目代码到本地

### 2. 安装依赖
在项目根目录下运行：
```bash
npm install @vant/weapp
```

### 3. 构建npm
在微信开发者工具中：
- 点击 工具 → 构建npm
- 等待构建完成

### 4. 运行项目
- 在微信开发者工具中打开项目
- 点击编译运行

## 使用说明 📖

### 首次使用
1. 打开小程序后会自动弹出目标设置弹窗
2. 通过滑动条设置每日摸鱼目标（默认2小时）
3. 点击确认保存设置

### 日常使用
1. **记录摸鱼**：点击底部大大的"摸"按钮，每次增加0.5小时
2. **查看进度**：日历中每天的圆形进度条显示当日完成度
3. **调整目标**：点击标题右侧的编辑按钮重新设置目标
4. **切换月份**：点击日历顶部的左右箭头查看其他月份

### 进度显示
- 🟣 紫色进度条：表示摸鱼进度
- 数字显示：当日已摸鱼小时数
- 达成目标时会有庆祝提示 🎉

## 设计理念 🎨

- **紫色主题**：选用紫色作为主色调，营造神秘而优雅的氛围
- **渐变效果**：大量使用CSS渐变，提升视觉层次感
- **圆形元素**：进度条和按钮采用圆形设计，更加友好
- **现代化UI**：遵循现代移动端设计规范，注重用户体验

## 数据存储 💾

小程序使用微信本地存储API保存数据：
- `dailyGoal`：每日摸鱼目标
- `fishingRecords`：摸鱼记录（格式：{日期: 小时数}）
- `isFirstTime`：是否首次使用标记

## 开发说明 👨‍💻

### 核心功能实现
- **日历生成**：动态计算月份天数和起始星期
- **进度计算**：根据目标时长计算完成百分比
- **数据同步**：实时更新本地存储和页面显示
- **交互反馈**：Toast提示和动画效果

### 样式特色
- 使用`conic-gradient`实现圆形进度条
- `linear-gradient`创建渐变背景
- `box-shadow`增加立体感
- 响应式布局适配不同屏幕

## 许可证 📄

MIT License - 详见 [LICENSE](LICENSE) 文件

## 贡献 🤝

欢迎提交Issue和Pull Request来改进这个项目！

---

**免责声明**：本项目仅供娱乐和学习使用，请合理安排工作和休息时间 😄 
# Cloudflare Pages 部署说明

本文档用于把当前这个静态毕业相册项目部署到 Cloudflare Pages，并方便后续继续更新。

## 1. 这个项目是什么类型

当前项目是一个**纯静态网站**，不需要 Node.js、数据库，也不需要服务端运行环境。

项目里的主要文件如下：

- `index.html`：网页入口
- `styles.css`：页面样式
- `app.js`：前端交互逻辑
- `gallery-data.json`：相册数据
- `assets/images/`：所有本地照片资源

这类项目非常适合部署到 **Cloudflare Pages**。

---

## 2. 部署前准备

在开始前，请先准备好：

- 一个可登录的 Cloudflare 账号
- 当前项目文件夹完整可用
- 确认以下文件都存在：
  - `index.html`
  - `styles.css`
  - `app.js`
  - `gallery-data.json`
  - `assets/images/`

如果你打算使用 Git 自动部署，还需要：

- 一个 GitHub / GitLab 仓库
- 能把当前项目上传到仓库

---

## 3. 推荐的部署方式

Cloudflare Pages 常见有两种方式：

### 方式 A：连接 Git 仓库自动部署（推荐）

适合后续会继续更新页面的人。

优点：

- 以后改完代码直接推送到仓库即可自动发布
- 方便回滚历史版本
- 适合长期维护

### 方式 B：直接上传静态文件部署

适合只想先快速上线一次的人。

优点：

- 不需要先学 Git
- 操作简单

注意：

- 直接上传方式也可以部署静态站点
- 但后续每次更新都要重新上传
- 如果你后面会反复改照片或文案，还是更建议使用 Git 自动部署

---

## 4. 用 Git 仓库部署到 Cloudflare Pages

### 第 1 步：把项目上传到 GitHub

如果你还没有仓库，可以先在 GitHub 新建一个仓库，例如：

- 仓库名：`graduation-album`

然后把当前目录里的这些文件上传进去：

- `index.html`
- `styles.css`
- `app.js`
- `gallery-data.json`
- `assets/images/`

如果你本地会用 Git，可以在项目目录执行：

```bash
git init
git add index.html styles.css app.js gallery-data.json assets
git commit -m "Initial graduation album site"
git branch -M main
git remote add origin <你的仓库地址>
git push -u origin main
```

如果你不想用命令行，也可以直接在 GitHub 网页里上传这些文件。

### 第 2 步：进入 Cloudflare Pages

1. 登录 Cloudflare
2. 打开左侧菜单中的 **Workers & Pages**
3. 点击 **Create application**
4. 选择 **Pages**
5. 选择 **Connect to Git**

### 第 3 步：授权并选择仓库

1. 按提示授权 Cloudflare 访问你的 GitHub / GitLab
2. 选择刚才上传项目的仓库
3. 点击继续

### 第 4 步：填写构建设置

因为这个项目是纯静态站点，所以构建设置非常简单：

- **Framework preset**：`None`
- **Build command**：留空
- **Build output directory**：留空，或者填写 `.`
- **Root directory**：留空

推荐理解方式：

- 这个项目没有打包步骤
- Cloudflare 直接把仓库中的静态文件发布出去
- `index.html` 会作为首页

### 第 5 步：开始部署

点击 **Save and Deploy**。

Cloudflare 会开始拉取仓库并发布站点。部署成功后，会给你一个默认域名，通常类似：

- `https://你的项目名.pages.dev`

打开这个地址，如果能看到毕业相册页面，就说明部署成功。

---

## 5. 用直接上传方式部署

如果你暂时不想用 Git，也可以直接上传静态文件。

### 第 1 步：整理要上传的内容

确保上传时包含以下内容：

- `index.html`
- `styles.css`
- `app.js`
- `gallery-data.json`
- `assets/images/`

注意：

- 这些文件的相对路径必须保持不变
- `assets/images/` 文件夹不能漏
- 如果只上传 `index.html` 而没上传图片目录，页面会打开但图片全部失效

### 第 2 步：进入 Pages 创建项目

1. 登录 Cloudflare
2. 打开 **Workers & Pages**
3. 点击 **Create application**
4. 选择 **Pages**
5. 选择 **Upload assets**（如果你的界面显示为直接上传静态资源，也属于这一类）

### 第 3 步：上传文件

把整个项目需要发布的静态文件上传上去。

如果 Cloudflare 当前界面不支持你逐个选择目录，最稳妥的方法是：

- 先把站点文件整理在一个独立文件夹中
- 保持目录结构完整
- 再整体上传

上传完成后，Cloudflare 会分配一个 `*.pages.dev` 域名。

### 直接上传方式是否适合这个项目

适合，但仅适合：

- 快速上线
- 临时演示
- 不频繁更新

如果后面你还要继续：

- 替换照片
- 修改文案
- 优化样式
- 绑定正式域名并长期维护

建议改用 **Git 自动部署**。

---

## 6. 自定义域名绑定

如果你已经有自己的域名，可以把这个相册绑定成正式网址。

### 操作步骤

1. 打开 Cloudflare Pages 项目
2. 进入 **Custom domains**
3. 点击 **Set up a custom domain**
4. 输入你的域名，例如：
   - `album.yourdomain.com`
5. 按提示完成绑定

如果这个域名本身就在 Cloudflare 管理，通常会自动帮你配置 DNS。

如果域名不在 Cloudflare，需要你去域名服务商后台按提示添加 DNS 记录。

### 建议

相册站更适合使用二级域名，例如：

- `album.xxx.com`
- `graduation.xxx.com`
- `class2026.xxx.com`

这样不会影响你主站的其他内容。

---

## 7. 后续如何更新网站

### 如果你使用 Git 自动部署

以后每次更新，只需要：

1. 在本地修改文件
2. 提交到 Git 仓库
3. 推送到远程仓库

例如：

```bash
git add index.html styles.css app.js gallery-data.json assets
git commit -m "Update album content"
git push
```

Cloudflare Pages 会自动重新部署。

### 如果你使用直接上传方式

以后每次更新，都需要：

1. 在本地改好文件
2. 重新进入 Cloudflare Pages
3. 再上传一次最新版本的静态文件

如果更新频率高，这种方式会比较麻烦。

---

## 8. 最常见的更新场景

### 场景 1：只增加或替换图片

你需要同时更新：

- `assets/images/`
- `gallery-data.json`

因为页面里的图片列表是由 `gallery-data.json` 驱动的。

### 场景 2：只改页面文案

通常只需要改：

- `index.html`
- `gallery-data.json`

### 场景 3：调整页面样式

通常只需要改：

- `styles.css`

### 场景 4：修改交互效果

通常只需要改：

- `app.js`

---

## 9. 常见问题排查

### 问题 1：网页能打开，但图片不显示

优先检查：

- `assets/images/` 是否完整上传
- `gallery-data.json` 是否也上传了
- `gallery-data.json` 中的 `src` 路径是否仍然正确

当前项目里的图片路径应该类似：

- `assets/images/photo-001.jpg`

### 问题 2：页面样式丢失

检查：

- `styles.css` 是否上传成功
- `index.html` 中是否正确引用 `./styles.css`

### 问题 3：页面结构正常，但相册列表空白

检查：

- `gallery-data.json` 是否能被访问
- `app.js` 是否上传成功
- 浏览器开发者工具里是否有 `fetch('./gallery-data.json')` 失败

### 问题 4：上传后和本地效果不一致

检查：

- 是否漏传了最新文件
- 浏览器缓存是否还在
- Cloudflare Pages 是否已经完成最新一次部署

可以先强制刷新页面再看：

- Windows：`Ctrl + F5`
- Mac：`Cmd + Shift + R`

### 问题 5：部署成功但打开是 404

检查：

- 根目录里是否有 `index.html`
- 发布的是否是项目根目录，而不是错误的子目录

### 问题 6：中文显示异常

检查：

- `index.html` 是否保留了 `UTF-8`：
  - `<meta charset="UTF-8" />`

---

## 10. 适合当前项目的 Pages 设置建议

这个项目目前最适合以下配置：

- 部署平台：Cloudflare Pages
- 项目类型：静态网站
- 构建命令：无
- 输出目录：项目根目录
- 推荐部署方式：Git 自动部署

原因是：

- 文件结构简单
- 没有依赖安装
- 没有构建产物目录
- 图片和 JSON 都是静态资源

---

## 11. 部署完成后的检查清单

部署完成后，建议你打开站点检查以下内容：

- 首页是否正常显示
- 首屏文案是否完整
- 照片墙是否加载成功
- 点击照片后灯箱是否可打开
- 手机端打开是否布局正常
- 图片是否全部加载成功

如果你绑定了自定义域名，还要再确认：

- 新域名是否已生效
- `pages.dev` 域名和自定义域名是否都可访问

---

## 12. 一句话建议

如果你只是想尽快上线，直接上传即可；如果你后面还会继续改这个毕业相册，**优先选择 Git 自动部署到 Cloudflare Pages**。

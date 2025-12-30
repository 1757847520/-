# 莲藕平台 Vercel 部署指南

## 准备工作

1. **安装 Vercel CLI** (已完成)
   ```bash
   npm install -g vercel
   ```

2. **创建 Vercel 配置文件** (已完成)
   - 已在项目根目录创建 `vercel.json` 配置文件
   - 配置文件包含了静态资源的构建和路由规则

## 部署步骤

### 1. 登录 Vercel 账户

在终端中运行以下命令，按照提示完成登录：

```bash
vercel login
```

- 会生成一个认证链接和验证码
- 复制链接到浏览器打开
- 使用你的 Vercel 账户登录
- 输入终端显示的验证码完成认证

### 2. 部署项目

在项目根目录运行以下命令开始部署：

```bash
vercel
```

部署过程中会出现以下提示，按照实际情况选择或输入：

1. **Set up and deploy “your-project-path”?** (Y/n) → 输入 `Y`
2. **Which scope do you want to deploy to?** → 选择你的 Vercel 账户
3. **Link to existing project?** (y/N) → 如果是首次部署，输入 `N`
4. **What’s your project’s name?** → 输入项目名称，或直接回车使用默认名称
5. **In which directory is your code located?** → 输入 `.` (表示当前目录)
6. **Want to override the settings?** (y/N) → 输入 `N`

### 3. 访问部署后的项目

部署完成后，终端会显示项目的访问链接，类似：
```
✅  Production: https://your-project.vercel.app
```

复制链接到浏览器即可访问部署后的网站。

### 4. 后续部署

对于后续的代码更新，只需在项目根目录运行：

```bash
vercel --prod
```

## 注意事项

1. 确保项目根目录下有 `index.html` 文件作为网站入口
2. 所有静态资源（HTML、CSS、JS、图片等）会被自动部署
3. 如果需要自定义域名，可以在 Vercel 控制台中设置
4. 部署过程中遇到问题，可以查看 Vercel CLI 的错误提示，或访问 [Vercel 文档](https://vercel.com/docs)

## 项目结构说明

```
莲藕平台/
├── index.html          # 网站入口文件
├── *.html              # 其他页面文件
├── *.css               # 样式文件
├── *.js                # JavaScript 文件
├── *.png, *.svg        # 图片资源
├── package.json        # 项目配置
└── vercel.json         # Vercel 部署配置
```

## 常见问题

### Q: 部署后页面无法正常显示怎么办？
A: 检查浏览器控制台的错误信息，确认资源路径是否正确。Vercel 部署后，所有资源的路径应该是相对路径，确保 HTML 文件中的资源引用使用相对路径。

### Q: 如何查看部署日志？
A: 登录 Vercel 控制台，找到对应项目，在 "Deployments" 标签页中查看详细日志。

### Q: 如何设置自定义域名？
A: 在 Vercel 控制台中，进入项目的 "Settings" → "Domains"，添加你的自定义域名，并按照提示完成 DNS 配置。

---

部署成功后，你的莲藕平台就可以通过 Vercel 提供的域名访问了！

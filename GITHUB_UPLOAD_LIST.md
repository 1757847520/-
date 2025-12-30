# GitHub上传文件清单

以下是需要上传到GitHub的文件和目录，确保项目能在Vercel上正确部署：

## 1. 核心HTML文件
- `home1.html` - 官方网站主页面
- `index.html` - 平台管理后台
- `dashboard.html` - 仪表盘页面
- `user_management.html` - 用户管理页面
- `course_management.html` - 课程管理页面
- `interest_group_management.html` - 兴趣小组管理页面
- `career_plaza_management.html` - 职业广场管理页面
- `data_statistics.html` - 数据统计页面
- `personnel_archive.html` - 人员档案页面
- `resource_allocation.html` - 资源分配页面
- `risk_warning.html` - 风险预警页面

## 2. 样式文件
- `styles.css` - 主要样式文件
- `style-updates.css` - 更新的样式文件

## 3. 图片资源
- `logo.png` - 网站Logo（PNG格式）
- `logo.webp` - 网站Logo（WebP格式，优化加载速度）
- `lotus-logo.svg` - 莲花Logo（矢量格式）

## 4. 配置文件
- `vercel.json` - Vercel部署配置
- `netlify.toml` - Netlify部署配置（可选，若同时使用Netlify）
- `package.json` - 项目依赖配置
- `package-lock.json` - 依赖版本锁定文件
- `.gitignore` - Git忽略文件配置

## 5. 组件目录
- `components/` - 可复用HTML组件
  - `button.html` - 按钮组件
  - `card.html` - 卡片组件
  - `input.html` - 输入框组件

## 6. 脚本文件
- `compress-images.js` - 图片压缩脚本
- `deploy.bat` - 部署批处理脚本（可选）

## 7. 文档文件
- `README.md` - 项目说明文档
- `DEPLOYMENT_GUIDE.md` - 部署指南
- `VERCEL_DEPLOYMENT_GUIDE.md` - Vercel部署指南

## 8. 需要忽略的文件

**以下文件/目录不需要上传到GitHub：**
- `dist/` - 生产构建目录（会在部署时自动生成）
- `.trae/` - Trae IDE配置目录
- `.vscode/` - VS Code配置目录
- 临时文件和缓存目录

## 上传步骤

1. 创建GitHub仓库
2. 将上述文件上传到仓库根目录
3. 在Vercel上连接GitHub仓库
4. 配置Vercel部署设置
5. 触发自动部署

## 注意事项

- 确保`.gitignore`文件正确配置，避免上传不必要的文件
- 图片资源建议同时保留PNG和WebP格式，以支持不同浏览器
- 配置文件（如vercel.json）要放在仓库根目录
- 上传前可运行`git status`检查文件状态
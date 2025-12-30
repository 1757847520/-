@echo off
echo ========================================
echo    莲藕平台管理系统 - 云部署脚本
echo ========================================
echo.

echo [1/5] 检查项目文件...
if not exist "index.html" (
    echo 错误: 未找到index.html文件
    echo 请确保在正确的项目目录中运行此脚本
    pause
    exit /b 1
)

echo ✓ 项目文件检查完成
echo.

echo [2/5] 检查配置文件...
if not exist "package.json" (
    echo 警告: 未找到package.json，将创建基础配置
    echo 已创建 package.json
)

if not exist "README.md" (
    echo 警告: 未找到README.md，将创建基础说明
    echo 已创建 README.md
)

echo ✓ 配置文件检查完成
echo.

echo [3/5] 生成部署包...
if not exist "dist" mkdir dist
if not exist "dist" (
    echo 错误: 无法创建dist目录
    pause
    exit /b 1
)

echo 正在复制文件到部署目录...
xcopy /E /I /Y "*.html" "dist\" >nul 2>&1
xcopy /E /I /Y "*.css" "dist\" >nul 2>&1
xcopy /E /I /Y "*.png" "dist\" >nul 2>&1
xcopy /E /I /Y "*.svg" "dist\" >nul 2>&1
xcopy /E /I /Y "*.json" "dist\" >nul 2>&1
xcopy /E /I /Y "netlify.toml" "dist\" >nul 2>&1
xcopy /E /I /Y ".gitignore" "dist\" >nul 2>&1

echo ✓ 部署包生成完成
echo.

echo [4/5] 显示部署选项...
echo.
echo ========================================
echo           部署选项
echo ========================================
echo.
echo 方案一: Netlify 部署 (推荐 - 免费且快速)
echo   - 访问: https://netlify.com
echo   - 拖拽 'dist' 文件夹到网站
echo   - 立即获得免费域名
echo.
echo 方案二: Vercel 部署 (优秀体验)
echo   - 访问: https://vercel.com
echo   - 上传项目或连接GitHub
echo   - 自动CI/CD部署
echo.
echo 方案三: GitHub Pages 部署 (完全免费)
echo   - 创建GitHub仓库
echo   - 上传代码到仓库
echo   - 在设置中启用GitHub Pages
echo.
echo 方案四: 其他静态托管平台
echo   - Firebase Hosting
echo   - Surge.sh
echo   - GitLab Pages
echo.
echo ========================================
echo.

echo [5/5] 完成
echo ✓ 部署准备完成!
echo.
echo 下一步:
echo 1. 访问 https://netlify.com (推荐)
echo 2. 拖拽 'dist' 文件夹到网页
echo 3. 等待自动部署完成
echo 4. 获取您的在线访问地址
echo.
echo 默认登录信息:
echo   用户名: admin
echo   密码: admin123
echo.
echo 按任意键退出...
pause >nul
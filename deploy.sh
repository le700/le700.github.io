#!/bin/bash
# GitHub Pages 部署脚本

echo "🚀 开始部署简历到 GitHub Pages..."

# 配置
REPO_NAME="le700.github.io"  # 或者你想要的仓库名
GITHUB_USER="le700"

# 检查 git
if ! command -v git &> /dev/null; then
    echo "❌ 请先安装 git"
    exit 1
fi

# 初始化 git
git init
git add .
git commit -m "Initial commit: Resume website"

# 创建 GitHub 仓库并推送
echo "📦 推送到 GitHub..."
git branch -M main
git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git
git push -u origin main

echo "✅ 部署完成！"
echo ""
echo "🔗 访问地址: https://$GITHUB_USER.github.io"
echo ""
echo "⚠️  如果这是第一次部署，请等待 2-5 分钟让 GitHub Pages 生效"

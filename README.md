# 岳金豪 - 个人简历网站

🔗 **在线访问**: https://le700.github.io

## 技术栈
- HTML5 + CSS3
- Canvas 粒子动画
- 响应式设计

## 本地预览
```bash
# 方式1: 直接用浏览器打开
open index.html

# 方式2: 使用 Python 简易服务器
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 部署到 GitHub Pages

### 方式一：自动脚本（推荐）
```bash
chmod +x deploy.sh
./deploy.sh
```

### 方式二：手动步骤

1. **创建 GitHub 仓库**
   - 登录 GitHub
   - 新建仓库，命名为 `le700.github.io`
   - 选择 Public

2. **上传代码**
   ```bash
   cd resume
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/le700/le700.github.io.git
   git push -u origin main
   ```

3. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main" / "/ (root)"
   - 点击 Save

4. **等待部署**
   - 2-5 分钟后访问 https://le700.github.io

## 自定义
修改 `index.html` 中的内容即可更新简历信息。

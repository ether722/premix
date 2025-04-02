# 多框架组件项目

这是一个基于 Astro 的多框架组件项目，支持在同一个应用中使用 React、Vue 3、Solid.js 和 Svelte 组件，并且支持 Pug 模板语法。项目使用 TypeScript 开发，并集成了依赖注入系统。

## 特性

- ✨ 基于 Astro 的文件系统路由
- 🎨 支持多框架组件：
  - React
  - Vue 3
  - Solid.js
  - Svelte
- 🔧 支持 Pug 模板语法
- 💉 使用 InversifyJS 进行依赖注入
- 🎯 TypeScript 支持
- 📦 开箱即用的开发体验

## 快速开始

1. 安装依赖：

\`\`\`bash
npm install
# 或
yarn
# 或
pnpm install
\`\`\`

2. 启动开发服务器：

\`\`\`bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
\`\`\`

3. 在浏览器中打开 [http://localhost:4321](http://localhost:4321)

## 项目结构

\`\`\`
.
├── src/
│   ├── pages/             # Astro 页面目录（自动路由）
│   ├── components/        # 组件目录
│   │   ├── react/        # React 组件
│   │   ├── vue/          # Vue 组件
│   │   ├── svelte/       # Svelte 组件
│   │   └── solid/        # Solid.js 组件
│   ├── layouts/          # 布局组件
│   └── lib/              # 工具库
│       └── container.ts   # 依赖注入容器
├── public/               # 静态资源
├── astro.config.mjs      # Astro 配置
├── package.json
└── tsconfig.json
\`\`\`

## 使用指南

### 创建新组件

1. React 组件：
   - 在 `src/components/react` 目录下创建 `.tsx` 文件
   - 使用标准的 React 组件语法

2. Vue 组件：
   - 在 `src/components/vue` 目录下创建 `.vue` 文件
   - 可以使用 Pug 模板语法
   - 使用 `<script setup>` 语法

3. Svelte 组件：
   - 在 `src/components/svelte` 目录下创建 `.svelte` 文件
   - 使用标准的 Svelte 语法

4. Solid.js 组件：
   - 在 `src/components/solid` 目录下创建 `.tsx` 文件
   - 使用 Solid.js 的特定语法

### 创建新页面

在 `src/pages` 目录下创建新的 `.astro` 文件，文件路径将自动映射为路由路径。例如：

- `src/pages/index.astro` -> `/`
- `src/pages/about.astro` -> `/about`
- `src/pages/blog/[slug].astro` -> `/blog/:slug`

### 依赖注入

使用 `@injectable()` 装饰器标记可注入的服务：

\`\`\`typescript
import { injectable } from 'inversify'

@injectable()
export class MyService {
  // ...
}
\`\`\`

在容器中注册服务：

\`\`\`typescript
container.bind<MyService>('MyService').to(MyService)
\`\`\`

在组件中使用服务：

\`\`\`typescript
const myService = container.get<MyService>('MyService')
\`\`\`

### 组件间通信

1. 通过依赖注入共享服务
2. 通过 Props 传递数据
3. 使用事件总线（可以通过依赖注入容器实现）
4. 使用 URL 参数和查询字符串

## 开发建议

1. 使用 TypeScript 编写所有组件和服务
2. 遵循依赖注入原则，避免直接实例化服务
3. 使用 Pug 模板时注意缩进
4. 组件通信优先使用依赖注入
5. 利用 Astro 的 Islands 架构优化性能

## 许可证

MIT 
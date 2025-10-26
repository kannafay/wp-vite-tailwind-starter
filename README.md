# WP Vite Tailwind Starter

通过vite+tailwindcss构建wp主题，零配置快速搭建一个模块化的wp主题。支持添加更多npm包，如vue，react，gsap，swup等。

本项目内置2个实用js功能模块（目录：src/utils）：

- ColorMode：主题模式，支持浅色、深色和跟随系统三种模式
- RestAPI：用于请求WP REST API的功能模块，支持多种请求方式

详情请查看对应js文件注释

## 安装依赖

```bash
# 安装 pnpm包 依赖
pnpm i

# 安装 composer 依赖（可选，仅WP提示工具）
composer i
```

## 启动项目

在主题根目录运行命令行，支持两种运行方式：

- `pnpm dev` ：HMR热更新模式，默认端口 `777`
- `pnpm watch` ：Vite监听模式（推荐）

**pnpm dev:** 对pjax、大型项目更友好，更新速度比watch快，缺点就是刷新会有闪烁现象。

**pnpm watch:** 使用build监听模式，wp直接引用js，运行时更稳定，也是最终构建形态，缺点是项目过大时，构建时间稍长

## 构建项目

执行 `pnpm build` ，vite会将src构建到主题根目录的assets目录下，images目录将自动复制到assets目录内。

更多配置请查看 `functions.php` 和 `vite.config.js`

## Kit套件

- Vite
- Tailwind CSS
- Alpine.js
- Axios
- Iconify Design

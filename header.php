<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color">
    <script>
        // Color mode handling
        const mode = localStorage.getItem('color-mode') || 'auto';
        let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (mode === 'light') isDark = false; else if (mode === 'dark') isDark = true;
        const root = document.documentElement;
        isDark ? root.classList.add('dark') : root.classList.remove('dark');
        root.style.colorScheme = isDark ? 'dark' : 'light';
    </script>
    <?php wp_head(); ?>
</head>

<body>
    <header class="sticky top-0 z-50 w-full h-15 bg-neutral-100 dark:bg-neutral-800">
        <nav class="container mx-auto px-6 flex items-center justify-between h-full">
            <ul class="flex items-center gap-4">
                <a href="/">首页</a>
                <a href="/sample-page">示例页面</a>
                <a href="/wp-admin">后台管理</a>
            </ul>

            <!-- 主题模式切换功能 -->
            <div>
                <button class="flex justify-between items-center cursor-pointer" x-data="{
                    mode: ColorMode.getMode(),
                    modeIcon: {
                        'auto': 'line-md:light-dark-loop',
                        'light': 'line-md:sunny-filled-loop',
                        'dark': 'line-md:moon-filled-loop',
                    },
                    toggle() {
                        this.mode = this.mode === 'auto'
                        ? this.mode = 'light'
                        : (this.mode === 'light'
                        ? this.mode = 'dark'
                        : this.mode = 'auto')
                        ColorMode.setMode(this.mode)
                    }
                    }" @click="toggle()">

                    <template x-if="mode === 'auto'">
                        <iconify-icon icon="line-md:light-dark-loop" class="text-2xl"></iconify-icon>
                    </template>
                    <template x-if="mode === 'light'">
                        <iconify-icon icon="line-md:sunny-filled-loop" class="text-2xl"></iconify-icon>
                    </template>
                    <template x-if="mode === 'dark'">
                        <iconify-icon icon="line-md:moon-filled-loop" class="text-2xl"></iconify-icon>
                    </template>
                </button>
            </div>
        </nav>
    </header>

    <div class="w-full min-h-[calc(100vh-60px)] flex flex-col justify-between">
        <main class="container mx-auto px-6 py-8">
/**
 * 主题模式管理模块
 * 
 * 支持浅色、深色和自动三种模式
 * 自动模式下根据系统主题自动切换
 * 
 * 用法:
 * setMode(mode) - 设置主题模式
 * getMode() - 获取当前主题模式
 * getSystemMode() - 获取当前系统主题模式
 * getColor() - 获取当前主题颜色
 * toggle() - 切换浅色/深色模式
 */

class ColorMode {
    static instance = null

    static MODES = {
        LIGHT: 'light',
        DARK: 'dark',
        AUTO: 'auto',
    }

    constructor(storageKey = 'color-mode') {
        if (ColorMode.instance) return ColorMode.instance
        this.storageKey = storageKey
        this.media = window.matchMedia('(prefers-color-scheme: dark)')
        this.mode = this.getSavedMode()
        this.applyTheme(this.mode)

        // 监听系统主题变化（仅执行一次）
        this.media.addEventListener('change', () => {
            if (this.mode === ColorMode.MODES.AUTO) {
                this.applyTheme(this.mode)
            }
        })

        ColorMode.instance = this
    }

    getSavedMode() {
        return localStorage.getItem(this.storageKey) || ColorMode.MODES.AUTO
    }

    setMode(mode) {
        if (!Object.values(ColorMode.MODES).includes(mode)) {
            console.warn(`[ColorMode] 无效模式: ${mode}`)
            return
        }
        this.mode = mode
        localStorage.setItem(this.storageKey, mode)
        this.applyTheme(mode)
    }

    getMode() {
        return this.mode
    }

    getSystemMode() {
        return this.media.matches ? ColorMode.MODES.DARK : ColorMode.MODES.LIGHT
    }

    getColor() {
        return this.mode === ColorMode.MODES.AUTO ? this.getSystemMode() : this.mode
    }

    toggle() {
        const { LIGHT, DARK, AUTO } = ColorMode.MODES
        this.mode === AUTO
            ? this.setMode(this.getSystemMode() === LIGHT ? DARK : LIGHT)
            : this.setMode(this.mode === LIGHT ? DARK : LIGHT)
    }

    applyTheme(mode) {
        const root = document.documentElement
        const { LIGHT, DARK } = ColorMode.MODES
        let isDark
        switch (mode) {
            case LIGHT:
                isDark = false; break
            case DARK:
                isDark = true; break
            default:
                isDark = this.media.matches
        }
        const hasDark = root.classList.contains('dark')
        if (isDark && !hasDark) root.classList.add('dark')
        else if (!isDark && hasDark) root.classList.remove('dark')
        root.style.colorScheme = isDark ? 'dark' : 'light'
        const bgColor = getComputedStyle(root).getPropertyValue('--color-bg').trim()
        const meta = document.querySelector('meta[name="theme-color"]')
        if (meta) meta.setAttribute('content', bgColor)
    }
}

export default ColorMode

// 浏览器全局兼容（可选）
if (typeof window !== 'undefined') {
    window.ColorMode = new ColorMode()
}


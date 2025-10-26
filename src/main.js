import '@/style.css'
import 'iconify-icon'
import Alpine from 'alpinejs'
import ColorMode from '@/utils/ColorMode'
import RestAPI from '@/utils/RestAPI'

// 挂载到全局
if (typeof window !== 'undefined') {
    // Alpine.js 初始化
    window.Alpine = Alpine
    Alpine.start()

    // ColorMode
    window.ColorMode = new ColorMode()

    // RestAPI
    window.RestAPI = RestAPI
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const log1 = `%cWelcome to WP Vite Tailwind Starter!`
    const log2 = `%cAuthor：神秘布偶猫`
    const log3 = `%cVersion：${wp.theme_version}`
    const log4 = `%c❤️ Powered by Vite + Tailwind CSS + Alpine.js`
    console.log(log1, 'color: #41b883;')
    console.log(log2, 'color: #41b883;')
    console.log(log3, 'color: #41b883;')
    console.log(log4, 'color: #ff4081;')
    // console.log(`%cTheme version: ${wp.theme_version}\n%c❤️ Powered by Vite + Tailwind CSS + Alpine.js`, 'color: #41b883; font-weight: bold;', 'color: #ff4081; font-weight: bold;')
})
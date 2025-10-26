<?php

// 阻止直接访问
defined('ABSPATH') || exit;

// Vite 开发服务器端口
const VITE_PORT = 777;

if (!function_exists('')) {
    /**
     * 获取 Vite 开发服务器状态
     * @return bool
     */
    function is_vite_dev_running(): bool {
        $connection = @fsockopen('localhost', VITE_PORT, $errno, $errstr, 0.05);
        if (is_resource($connection)) {
            fclose($connection);
            return true;
        }
        return false;
    }
}

/**
 * 引入样式和脚本
 */
add_action('wp_enqueue_scripts', function () {
    if (!is_vite_dev_running()) {
        // 生产模式
        wp_enqueue_style(
            'main-style',
            get_template_directory_uri() . '/assets/css/style.min.css',
            [],
            filemtime(get_template_directory() . '/assets/css/style.min.css'),
        );
        wp_enqueue_script(
            'main-script',
            get_template_directory_uri() . '/assets/js/main.min.js',
            [],
            filemtime(get_template_directory() . '/assets/js/main.min.js'),
            true,
        );
    } else {
        // Vite Dev 模式
        wp_enqueue_script('vite-client', 'http://localhost:' . VITE_PORT . '/@vite/client', [], null, false);
        wp_enqueue_script('main-script', 'http://localhost:' . VITE_PORT . '/src/main.js', ['vite-client'], null, false);
    }

    // 本地化脚本，传递 PHP 数据到 JavaScript
    wp_localize_script('main-script', 'wp', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'rest_url' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
        'theme_version' => wp_get_theme()->get('Version'),
        'theme_options' => [],
    ]);

    // 将指定脚本类型改为 module
    add_filter('script_loader_tag', function ($tag, $handle, $src) {
        $scripts = [
            'main-script',
            'vite-client'
        ];
        if (in_array($handle, $scripts)) {
            return str_replace('type="text/javascript"', 'type="module"', $tag);
        }
        return $tag;
    }, 10, 3);
});

/**
 * 主题支持
 */
add_action('after_setup_theme', function () {
    // 文章缩略图
    add_theme_support('post-thumbnails');

    // 自动添加标题标签
    add_theme_support('title-tag');

    // 禁用前端管理员工具栏
    add_filter('show_admin_bar', '__return_false');
});



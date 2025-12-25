<?php
/**
 * Plugin Name: MediumMate Code Block
 * Plugin URI: https://github.com/priyanksukhadiya/mediummate-codeblock
 * Description: A custom Gutenberg code block with line numbers and syntax highlighting for the MediumMate theme.
 * Version: 1.0.0
 * Author: Priyank Sukhadiya
 * Author URI: https://profiles.wordpress.org/priyanksukhadiya/
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: mediummate-codeblock
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 *
 * @package MediumMate_CodeBlock
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define plugin constants.
define( 'MMCB_VERSION', '1.0.0' );
define( 'MMCB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'MMCB_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Register the custom code block.
 */
function mmcb_register_block() {
    register_block_type( MMCB_PLUGIN_DIR . 'blocks/code-box' );
}
add_action( 'init', 'mmcb_register_block' );

/**
 * Enqueue frontend scripts for copy functionality and syntax highlighting
 */
function mmcb_enqueue_scripts() {
    // Only enqueue if our block is present on the page
    if ( mmcb_has_block_on_page() ) {
        // Enqueue highlight.js from CDN
        wp_enqueue_script(
            'highlightjs-core',
            MMCB_PLUGIN_URL . 'assets/highlight.min.js',
            array(),
            '11.9.0',
            true
        );
        
        // Enqueue highlight.js CSS
        wp_enqueue_style(
            'highlightjs-theme',
            MMCB_PLUGIN_URL . 'assets/github-dark.min.css',
            array(),
            '11.9.0'
        );
        
        // Enqueue our custom highlight script
        wp_enqueue_script(
            'mmcb-highlight-script',
            MMCB_PLUGIN_URL . 'assets/highlight-script.js',
            array('highlightjs-core'),
            MMCB_VERSION,
            true
        );
        
        // Enqueue copy functionality
        wp_enqueue_script(
            'mmcb-copy-script',
            MMCB_PLUGIN_URL . 'assets/copy-script.js',
            array(),
            MMCB_VERSION,
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'mmcb_enqueue_scripts' );

/**
 * Check if our block is present on the current page
 */
function mmcb_has_block_on_page() {
    if ( is_admin() ) {
        return false;
    }
    
    global $post;
    
    // Check if we're on a singular page with content
    if ( is_singular() && isset( $post->post_content ) ) {
        return has_block( 'mediummate/code-box', $post );
    }
    
    // For archive pages, check all posts in the query
    if ( is_home() || is_archive() || is_search() ) {
        global $wp_query;
        
        if ( isset( $wp_query->posts ) && is_array( $wp_query->posts ) ) {
            foreach ( $wp_query->posts as $query_post ) {
                if ( has_block( 'mediummate/code-box', $query_post ) ) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

/**
 * Enqueue editor scripts for syntax highlighting in the block editor
 */
function mmcb_enqueue_editor_scripts() {
    // Enqueue highlight.js for the editor
    wp_enqueue_script(
        'highlightjs-editor',
        MMCB_PLUGIN_URL . 'assets/highlight.min.js',
        array(),
        '11.9.0',
        true
    );
    
    wp_enqueue_style(
        'highlightjs-editor-theme',
        MMCB_PLUGIN_URL . 'assets/github-dark.min.css',
        array(),
        '11.9.0'
    );
}
add_action( 'enqueue_block_editor_assets', 'mmcb_enqueue_editor_scripts' );
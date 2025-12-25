=== MediumMate Code Block ===
Contributors: priyanksukhadiya
Donate link: https://github.com/priyanksukhadiya/mediummate-codeblock
Tags: code block, gutenberg, copy clipboard, line numbers
Requires at least: 5.8
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Feature-rich WordPress plugin adding a beautiful Gutenberg code block with syntax highlighting, line numbers, and copy-to-clipboard.

== Description ==

**MediumMate Code Block** transforms how you display code on your WordPress website. This powerful Gutenberg block provides professional syntax highlighting, clean line numbers, and one-click copy functionality, making it perfect for developers, bloggers, and technical websites.

= 🌟 Key Features =

* **Advanced Syntax Highlighting** - Powered by highlight.js with support for 190+ languages
* **Smart Line Numbers** - Automatically generated and synchronized with code content
* **One-Click Copy** - Professional copy-to-clipboard functionality with visual feedback
* **Live Editor Preview** - See syntax highlighting in real-time while editing
* **Language Auto-Detection** - Automatically detects language when not specified
* **Responsive Design** - Works beautifully on all devices and screen sizes
* **Performance Optimized** - Scripts load only when blocks are present on the page
* **Theme Compatible** - Designed for MediumMate theme but works with any theme

= 🎯 Perfect for =

* **Developers** - Share code snippets with professional presentation
* **Technical Bloggers** - Enhance tutorials with highlighted code examples
* **Documentation Sites** - Create clear, readable code documentation
* **Educational Content** - Teach programming with visually appealing code blocks
* **Portfolio Sites** - Showcase your coding projects professionally

= 🚀 Supported Languages =

* **Web Technologies**: HTML, CSS, JavaScript, TypeScript, React, Vue.js
* **Backend Languages**: PHP, Python, Java, C++, C#, Ruby, Go, Node.js
* **Databases**: SQL, MySQL, PostgreSQL, MongoDB
* **Data Formats**: JSON, XML, YAML, TOML
* **Shell Scripts**: Bash, PowerShell, Command Line
* **And 180+ more languages with auto-detection**

= 🎨 Customization =

The plugin includes a beautiful dark theme out of the box that works with any WordPress theme. Advanced users can customize the appearance through CSS or by selecting different highlight.js themes.

= 📱 User Experience =

* **Intuitive Interface** - Simple language selection dropdown in block settings
* **Real-time Preview** - See changes instantly in the editor
* **Copy Feedback** - Visual confirmation when code is copied
* **Accessible Design** - Follows WordPress accessibility guidelines
* **Mobile Friendly** - Optimized for touch devices

= 🔧 Technical Details =

* **Modern Architecture** - Built as a native Gutenberg block
* **CDN Optimized** - Uses highlight.js from reliable CDN for fast loading
* **Performance First** - Conditional script loading for optimal speed
* **SEO Friendly** - Proper semantic markup for search engines
* **Translation Ready** - Fully internationalized for global use

== Installation ==

= From WordPress Admin =

1. Go to Plugins > Add New
2. Search for "MediumMate Code Block"
3. Install and activate the plugin
4. Start using the block in Gutenberg editor

= Manual Installation =

1. Download the plugin files
2. Upload to `/wp-content/plugins/mediummate-codeblock/`
3. Activate through the 'Plugins' menu in WordPress
4. Find "MediumMate Code Block" in the Gutenberg block inserter

== Frequently Asked Questions ==

= Does this work with any theme? =

Yes! While designed for the MediumMate theme, it works perfectly with any WordPress theme. The plugin includes its own styling that integrates well with most themes.

= What programming languages are supported? =

The plugin supports 190+ programming languages through highlight.js, including all popular languages like JavaScript, PHP, Python, Java, C++, and many more. If a language isn't recognized, it will use auto-detection.

= Does the copy feature work on mobile devices? =

Yes! The copy functionality works on all modern browsers and devices, including mobile phones and tablets.

= Will this slow down my website? =

No! The plugin is performance-optimized and only loads JavaScript/CSS when your posts actually contain code blocks. Pages without code blocks have zero performance impact.

= Can I customize the appearance? =

Yes! You can customize the appearance through CSS. The plugin also supports different highlight.js themes if you want to change the color scheme.

= Is it compatible with page builders? =

The plugin works with any page builder that supports Gutenberg blocks, including the WordPress block editor, Full Site Editing, and block-based page builders.

= Does it work with caching plugins? =

Yes! The plugin is fully compatible with all major caching plugins including WP Rocket, W3 Total Cache, and WP Super Cache.

== Screenshots ==

1. **Block in Editor** - Clean interface with live syntax highlighting preview
2. **Frontend Display** - Professional code presentation with line numbers
3. **Language Selection** - Easy dropdown to choose programming language
4. **Copy Functionality** - One-click copy with visual feedback
5. **Mobile View** - Responsive design works perfectly on all devices
6. **Multiple Languages** - Support for all major programming languages

== Changelog ==

= 1.0.0 =
* Initial release
* Advanced syntax highlighting powered by highlight.js
* Smart line numbers with auto-synchronization
* Professional copy-to-clipboard functionality
* Real-time editor preview with syntax highlighting
* Performance-optimized conditional script loading
* Support for 190+ programming languages
* Auto-detection for unknown languages
* Responsive design for all devices
* Full WordPress coding standards compliance
* Translation ready with internationalization support
* SEO-friendly semantic markup
* Accessibility features following WCAG guidelines

== Upgrade Notice ==

= 1.0.0 =
Initial release of MediumMate Code Block with professional syntax highlighting and copy functionality.

== Developer Notes ==

= Technical Implementation =

* **Block Registration**: Native Gutenberg block using modern WordPress APIs
* **Syntax Highlighting**: highlight.js v11.9.0 for reliable language support
* **Performance**: Smart script loading only when blocks are present
* **Compatibility**: Works with WordPress 5.8+ and PHP 7.4+
* **Standards**: Follows WordPress coding standards and best practices

= Hooks and Filters =

The plugin provides several hooks for developers:

* `mmcb_supported_languages` - Filter to modify supported languages
* `mmcb_highlight_theme` - Filter to change the highlight.js theme
* `mmcb_block_attributes` - Filter to modify block attributes

= Contributing =

This is an open-source project. Contributions are welcome on [GitHub](https://github.com/priyanksukhadiya/mediummate-codeblock).

== Privacy Policy ==

This plugin does not collect, store, or transmit any personal data. All functionality is client-side except for loading highlight.js from the official CDN.

== Support ==

For support, feature requests, or bug reports, please visit the [GitHub repository](https://github.com/priyanksukhadiya/mediummate-codeblock) or the WordPress.org support forums.
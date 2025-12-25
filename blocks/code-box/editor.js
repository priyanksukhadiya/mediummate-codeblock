/**
 * MediumMate Code Box Block - Editor Script
 *
 * @package MediumMate_CodeBlock
 */

(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls, RichText, PlainText } = wp.blockEditor;
    const { PanelBody, SelectControl, TextControl } = wp.components;
    const { createElement: el, Fragment, useEffect, useRef } = wp.element;
    const { __ } = wp.i18n;

    // Helper function to apply syntax highlighting in editor
    function applyEditorHighlighting(codeElement, language, code) {
        if (typeof hljs === 'undefined' || !codeElement || !code) {
            return;
        }

        // Clear previous highlighting
        codeElement.classList.remove('hljs');
        codeElement.className = 'mm-code-box-preview';

        try {
            if (language && language !== 'text' && language !== '') {
                // Use specific language
                codeElement.className = 'mm-code-box-preview language-' + language;
                const highlighted = hljs.highlight(code, { language: language });
                codeElement.innerHTML = highlighted.value;
            } else {
                // Use auto-detection
                const highlighted = hljs.highlightAuto(code);
                codeElement.innerHTML = highlighted.value;
                if (highlighted.language) {
                    codeElement.className = 'mm-code-box-preview language-' + highlighted.language;
                }
            }
            codeElement.classList.add('hljs');
        } catch (error) {
            // Fallback to plain text if highlighting fails
            codeElement.textContent = code;
        }
    }

    // Editor Preview Component
    function CodePreview({ code, language }) {
        const previewRef = useRef();

        useEffect(() => {
            if (previewRef.current && code) {
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    applyEditorHighlighting(previewRef.current, language, code);
                }, 10);
            }
        }, [code, language]);

        // Generate line numbers for preview
        const lines = code ? code.split('\n') : [''];
        const lineNumbers = lines.map(function(_, index) {
            return el('span', { key: index, className: 'mm-line-number' }, index + 1);
        });

        return el(
            'div',
            { className: 'mm-code-box-body' },
            el(
                'div',
                { className: 'mm-line-numbers' },
                lineNumbers
            ),
            el(
                'pre',
                { className: 'mm-code-box-content' },
                el(
                    'code',
                    { 
                        ref: previewRef,
                        className: 'mm-code-box-preview language-' + (language || 'text')
                    },
                    code
                )
            )
        );
    }

    // Deprecated version - old save without line numbers
    const deprecatedV1 = {
        attributes: {
            title: { type: 'string', default: 'Code Example' },
            code: { type: 'string', default: '' },
            language: { type: 'string', default: 'javascript' }
        },
        save: function(props) {
            const { attributes } = props;
            const { title, code, language } = attributes;

            const blockProps = useBlockProps.save({
                className: 'mm-code-box-wrapper'
            });

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    { className: 'mm-code-box', 'data-language': language },
                    el(
                        'div',
                        { className: 'mm-code-box-header' },
                        el(
                            'div',
                            { className: 'mm-code-box-dots' },
                            el('span', { className: 'dot red' }),
                            el('span', { className: 'dot yellow' }),
                            el('span', { className: 'dot green' })
                        ),
                        title && el(
                            'span',
                            { className: 'mm-code-box-title' },
                            title
                        )
                    ),
                    el(
                        'pre',
                        { className: 'mm-code-box-content' },
                        el(
                            'code',
                            { className: 'language-' + language },
                            code
                        )
                    )
                )
            );
        }
    };

    registerBlockType('mediummate/code-box', {
        deprecated: [deprecatedV1],
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const { title, code, language } = attributes;

            const blockProps = useBlockProps({
                className: 'mm-code-box-editor'
            });

            const languageOptions = [
                { label: 'JavaScript', value: 'javascript' },
                { label: 'PHP', value: 'php' },
                { label: 'HTML', value: 'html' },
                { label: 'CSS', value: 'css' },
                { label: 'Python', value: 'python' },
                { label: 'Java', value: 'java' },
                { label: 'C++', value: 'cpp' },
                { label: 'C#', value: 'csharp' },
                { label: 'Ruby', value: 'ruby' },
                { label: 'Go', value: 'go' },
                { label: 'SQL', value: 'sql' },
                { label: 'Bash/Shell', value: 'bash' },
                { label: 'JSON', value: 'json' },
                { label: 'XML', value: 'xml' },
                { label: 'Plain Text', value: 'text' }
            ];

            return el(
                Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: __('Code Box Settings', 'mediummate-codeblock'), initialOpen: true },
                        el(TextControl, {
                            label: __('Title', 'mediummate-codeblock'),
                            value: title,
                            onChange: function(value) {
                                setAttributes({ title: value });
                            }
                        }),
                        el(SelectControl, {
                            label: __('Language', 'mediummate-codeblock'),
                            value: language,
                            options: languageOptions,
                            onChange: function(value) {
                                setAttributes({ language: value });
                            }
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'mm-code-box' },
                        el(
                            'div',
                            { className: 'mm-code-box-header' },
                            el(
                                'div',
                                { className: 'mm-code-box-dots' },
                                el('span', { className: 'dot red' }),
                                el('span', { className: 'dot yellow' }),
                                el('span', { className: 'dot green' })
                            ),
                            el(RichText, {
                                tagName: 'span',
                                className: 'mm-code-box-title',
                                value: title,
                                onChange: function(value) {
                                    setAttributes({ title: value });
                                },
                                placeholder: __('Enter title...', 'mediummate-codeblock')
                            })
                        ),
                        el(
                            'div',
                            { className: 'mm-code-box-editor-content' },
                            el(PlainText, {
                                value: code,
                                onChange: function(value) {
                                    setAttributes({ code: value });
                                },
                                placeholder: __('Enter your code here...', 'mediummate-codeblock'),
                                className: 'mm-code-box-textarea'
                            }),
                            // Show preview with syntax highlighting if code exists
                            code && el(
                                'div',
                                { className: 'mm-code-box-preview-container' },
                                el('h4', { className: 'mm-preview-title' }, __('Preview:', 'mediummate-codeblock')),
                                el(CodePreview, { code: code, language: language })
                            )
                        )
                    )
                )
            );
        },

        save: function(props) {
            const { attributes } = props;
            const { title, code, language } = attributes;

            const blockProps = useBlockProps.save({
                className: 'mm-code-box-wrapper'
            });

            // Generate line numbers
            const lines = code ? code.split('\n') : [''];
            const lineNumbers = lines.map(function(_, index) {
                return el('span', { key: index, className: 'mm-line-number' }, index + 1);
            });

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    { className: 'mm-code-box', 'data-language': language },
                    el(
                        'div',
                        { className: 'mm-code-box-header' },
                        el(
                            'div',
                            { className: 'mm-code-box-dots' },
                            el('span', { className: 'dot red' }),
                            el('span', { className: 'dot yellow' }),
                            el('span', { className: 'dot green' })
                        ),
                        title && el(
                            'span',
                            { className: 'mm-code-box-title' },
                            title
                        ),
                        el(
                            'button',
                            { 
                                className: 'mm-code-box-copy',
                                'aria-label': 'Copy code to clipboard'
                            },
                            'Copy'
                        )
                    ),
                    el(
                        'div',
                        { className: 'mm-code-box-body' },
                        el(
                            'div',
                            { className: 'mm-line-numbers' },
                            lineNumbers
                        ),
                        el(
                            'pre',
                            { className: 'mm-code-box-content' },
                            el(
                                'code',
                                { className: 'language-' + language },
                                code
                            )
                        )
                    )
                )
            );
        }
    });

})(window.wp);

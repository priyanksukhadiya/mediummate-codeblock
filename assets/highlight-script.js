/**
 * MediumMate Code Block - Syntax Highlighting Script
 * 
 * @package MediumMate_CodeBlock
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize highlight.js when DOM is ready
    if (typeof hljs !== 'undefined') {
        initializeSyntaxHighlighting();
    } else {
        // Fallback: wait a bit for highlight.js to load
        setTimeout(initializeSyntaxHighlighting, 100);
    }
});

/**
 * Initialize syntax highlighting for all MediumMate code blocks
 */
function initializeSyntaxHighlighting() {
    if (typeof hljs === 'undefined') {
        console.warn('highlight.js not loaded, skipping syntax highlighting');
        return;
    }

    // Find all MediumMate code blocks
    const codeBlocks = document.querySelectorAll('.mm-code-box');
    
    codeBlocks.forEach(function(codeBlock) {
        const codeElement = codeBlock.querySelector('.mm-code-box-content code');
        const language = codeBlock.getAttribute('data-language');
        
        if (codeElement && !codeElement.classList.contains('hljs')) {
            // Store original content before highlighting for copy functionality
            const originalContent = codeElement.textContent || codeElement.innerText;
            codeElement.setAttribute('data-original-content', originalContent);
            
            if (language && language !== 'text' && language !== '') {
                // Use specific language if provided
                try {
                    // Update the class to match highlight.js conventions
                    codeElement.className = 'language-' + language;
                    
                    // Apply syntax highlighting
                    hljs.highlightElement(codeElement);
                    
                    // Ensure line numbers still work by preserving line breaks
                    updateLineNumbers(codeBlock, originalContent);
                    
                } catch (error) {
                    console.warn('Error highlighting code with language "' + language + '":', error);
                    // Fallback to auto-detection
                    highlightWithAutoDetection(codeElement, codeBlock, originalContent);
                }
            } else {
                // Use auto-detection for unknown or empty languages
                highlightWithAutoDetection(codeElement, codeBlock, originalContent);
            }
        }
    });
}

/**
 * Highlight code using auto-detection
 */
function highlightWithAutoDetection(codeElement, codeBlock, originalContent) {
    try {
        const result = hljs.highlightAuto(originalContent);
        codeElement.innerHTML = result.value;
        codeElement.classList.add('hljs');
        
        // Store original content for copy functionality
        codeElement.setAttribute('data-original-content', originalContent);
        
        // Update detected language in the code block
        if (result.language) {
            codeElement.className = 'language-' + result.language + ' hljs';
        }
        
        updateLineNumbers(codeBlock, originalContent);
        
    } catch (error) {
        console.warn('Error with auto-detection highlighting:', error);
        // Keep original content if highlighting fails
        codeElement.textContent = originalContent;
        codeElement.setAttribute('data-original-content', originalContent);
    }
}

/**
 * Update line numbers to match the highlighted content
 */
function updateLineNumbers(codeBlock, originalContent) {
    const lineNumbersContainer = codeBlock.querySelector('.mm-line-numbers');
    
    if (!lineNumbersContainer) {
        return;
    }
    
    // Count lines based on original content to ensure consistency
    const lines = originalContent.split('\n');
    const currentLineNumbers = lineNumbersContainer.querySelectorAll('.mm-line-number');
    
    // Only update if the count doesn't match
    if (currentLineNumbers.length !== lines.length) {
        lineNumbersContainer.innerHTML = '';
        
        lines.forEach(function(_, index) {
            const lineNumber = document.createElement('span');
            lineNumber.className = 'mm-line-number';
            lineNumber.textContent = index + 1;
            lineNumbersContainer.appendChild(lineNumber);
        });
    }
}

/**
 * Refresh highlighting for dynamically added code blocks
 */
function refreshHighlighting() {
    initializeSyntaxHighlighting();
}

// Make refresh function available globally for dynamic content
window.mmcbRefreshHighlighting = refreshHighlighting;
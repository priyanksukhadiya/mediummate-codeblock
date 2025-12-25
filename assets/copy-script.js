/**
 * MediumMate Code Block - Copy Functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add copy buttons to existing code blocks (for frontend)
    const codeBlocks = document.querySelectorAll('.mm-code-box');
    
    codeBlocks.forEach(function(codeBlock) {
        const header = codeBlock.querySelector('.mm-code-box-header');
        const codeContent = codeBlock.querySelector('.mm-code-box-content code');
        
        if (header && codeContent && !header.querySelector('.mm-code-box-copy')) {
            const copyButton = document.createElement('button');
            copyButton.className = 'mm-code-box-copy';
            copyButton.innerHTML = '<i class="far fa-copy"></i>';
            copyButton.setAttribute('aria-label', 'Copy code to clipboard');
            
            copyButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the original code content, avoiding highlighted HTML
                let code;
                if (codeContent.hasAttribute('data-original-content')) {
                    // Use stored original content if available
                    code = codeContent.getAttribute('data-original-content');
                } else {
                    // Extract text content, handling highlighted code
                    code = codeContent.textContent || codeContent.innerText;
                }
                
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    // Modern browsers
                    navigator.clipboard.writeText(code).then(function() {
                        showCopyFeedback(copyButton, '<i class="fas fa-check"></i>');
                    }).catch(function() {
                        fallbackCopyToClipboard(code, copyButton);
                    });
                } else {
                    // Fallback for older browsers
                    fallbackCopyToClipboard(code, copyButton);
                }
            });
            
            header.appendChild(copyButton);
        }
    });
});

/**
 * Fallback copy method for older browsers
 */
function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback(button, '<i class="fas fa-check"></i>');
        } else {
            showCopyFeedback(button, '<i class="fas fa-times"></i>');
        }
    } catch (err) {
        showCopyFeedback(button, '<i class="fas fa-times"></i>');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show copy feedback to user
 */
function showCopyFeedback(button, message) {
    const originalHTML = button.innerHTML;
    button.innerHTML = message;
    
    // Set background color based on success/failure
    if (message.includes('fa-check')) {
        button.style.background = 'rgba(39, 174, 96, 0.8)';
    } else if (message.includes('fa-times')) {
        button.style.background = 'rgba(231, 76, 60, 0.8)';
    }
    
    setTimeout(function() {
        button.innerHTML = originalHTML;
        button.style.background = '';
    }, 2000);
}
// Verbitsky Systems - Enhanced Main JavaScript

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Set active nav link based on page
    const activeLink = document.querySelector(`a[onclick*="showPage('${pageId}')"]`);
    if (activeLink && activeLink.classList.contains('nav-link')) {
        activeLink.classList.add('active');
    }
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Mobile menu functionality
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (navLinks && mobileMenuBtn && mobileMenuOverlay) {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (navLinks && mobileMenuBtn && mobileMenuOverlay) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Chat functionality
let messageCount = 1;
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Auto-resize textarea
if (chatInput) {
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    // Send on Enter
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

function insertPrompt(prompt) {
    if (chatInput) {
        chatInput.value = prompt;
        chatInput.focus();
        chatInput.style.height = 'auto';
        chatInput.style.height = chatInput.scrollHeight + 'px';
    }
}

function sendMessage() {
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = `
        <div class="message-avatar">You</div>
        <div class="message-content">${escapeHtml(message)}</div>
    `;
    chatMessages.appendChild(userMessage);

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Update message count
    messageCount += 2;
    const messageCountEl = document.getElementById('messageCount');
    if (messageCountEl) {
        messageCountEl.textContent = messageCount;
    }

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI response
    setTimeout(() => {
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message';
        
        // Generate contextual response
        let response = generateResponse(message);
        
        aiMessage.innerHTML = `
            <div class="message-avatar ai">AI</div>
            <div class="message-content">${response}</div>
        `;
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('plc') && lowerMessage.includes('hmi')) {
        return `For PLC-HMI communication issues, let's diagnose systematically:

1. **Check physical connections** - Ensure all cables are properly seated
2. **Verify network settings** - IP addresses, subnet masks must match
3. **Test ping connectivity** - Can the HMI ping the PLC?
4. **Review communication drivers** - Ensure correct driver and version

Common causes: IP conflicts, cable issues, or driver mismatches. 

What error messages are you seeing on the HMI?`;
    } else if (lowerMessage.includes('motor') && lowerMessage.includes('overheat')) {
        return `Motor overheating requires immediate attention. Check these items:

1. **Ambient temperature** - Is cooling adequate?
2. **Load conditions** - Verify motor isn't overloaded
3. **VFD parameters** - Check acceleration/deceleration times
4. **Mechanical issues** - Listen for bearing noise

Safety first: Ensure proper lockout/tagout before inspection.

What's the motor's rated capacity versus actual load?`;
    } else if (lowerMessage.includes('safety') || lowerMessage.includes('e-stop')) {
        return `Safety system reset issues are critical. Follow this sequence:

1. **Verify all E-stops** are pulled out/reset
2. **Check safety relay** status LEDs
3. **Review safety circuit** continuity
4. **Inspect door switches** and light curtains

The safety system requires all conditions cleared before reset.

Are there any specific fault codes on the safety relay?`;
    } else if (lowerMessage.includes('sensor')) {
        return `For sensor diagnostic issues:

1. **Check power supply** - Verify correct voltage
2. **Inspect wiring** - Look for damage or interference
3. **Test with multimeter** - Measure output signal
4. **Review mounting** - Ensure proper alignment

Environmental factors like EMI or temperature can affect readings.

What type of sensor and what's the expected vs actual output?`;
    } else {
        return `I understand you're experiencing: "${escapeHtml(message)}"

To provide the most accurate troubleshooting guidance, I need a bit more information:
- Equipment make/model
- Error codes or alarms present
- When the issue started
- Any recent changes to the system

This helps me give you specific, actionable solutions. What additional details can you provide?`;
    }
}

// FAQ toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Add scroll effect to nav
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(24, 24, 27, 0.95)';
            nav.style.backdropFilter = 'blur(12px)';
            nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'var(--bg-primary)';
            nav.style.backdropFilter = 'none';
            nav.style.boxShadow = 'none';
        }
    }
});

// Documents page functionality
let selectedFiles = [];

// Initialize upload area
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            handleFiles(e.dataTransfer.files);
        });
        
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }

    // Initialize lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

function handleFiles(files) {
    const fileList = Array.from(files);
    selectedFiles = [...selectedFiles, ...fileList];
    displayFileQueue();
    
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.disabled = selectedFiles.length === 0;
    }
}

function displayFileQueue() {
    const uploadQueue = document.getElementById('uploadQueue');
    const fileListContainer = document.getElementById('fileList');
    
    if (!uploadQueue || !fileListContainer) return;
    
    if (selectedFiles.length === 0) {
        uploadQueue.style.display = 'none';
        return;
    }
    
    uploadQueue.style.display = 'block';
    fileListContainer.innerHTML = '';
    
    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-name">${escapeHtml(file.name)}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
            <button class="file-remove" onclick="removeFile(${index})">×</button>
            <div class="upload-progress">
                <div class="upload-progress-bar"></div>
            </div>
        `;
        fileListContainer.appendChild(fileItem);
    });
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    displayFileQueue();
    
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.disabled = selectedFiles.length === 0;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function openUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        selectedFiles = [];
        displayFileQueue();
        const uploadCategory = document.getElementById('uploadCategory');
        if (uploadCategory) {
            uploadCategory.value = '';
        }
    }
}

function startUpload() {
    const category = document.getElementById('uploadCategory').value;
    if (!category) {
        alert('Please select a category for the documents');
        return;
    }
    
    // Simulate upload progress
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach((item, index) => {
        const progressBar = item.querySelector('.upload-progress');
        const progressFill = item.querySelector('.upload-progress-bar');
        
        if (progressBar && progressFill) {
            setTimeout(() => {
                progressBar.style.display = 'block';
                let progress = 0;
                
                const interval = setInterval(() => {
                    progress += Math.random() * 30;
                    if (progress > 100) progress = 100;
                    progressFill.style.width = progress + '%';
                    
                    if (progress === 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            item.style.opacity = '0.5';
                            const fileName = item.querySelector('.file-name');
                            if (fileName && !fileName.textContent.includes('✓')) {
                                fileName.textContent += ' ✓';
                            }
                        }, 300);
                    }
                }, 300);
            }, index * 200);
        }
    });
    
    // Close modal after all uploads
    setTimeout(() => {
        closeUploadModal();
        // In a real application, you would refresh the document list here
        alert('Documents uploaded successfully!');
    }, selectedFiles.length * 1000 + 1000);
}

function filterByCategory(category) {
    // Update active category
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    if (event && event.target) {
        event.target.closest('.category-item').classList.add('active');
    }
    
    // Filter documents
    const documents = document.querySelectorAll('.document-card');
    documents.forEach(doc => {
        if (category === 'all' || doc.dataset.category === category) {
            doc.style.display = 'flex';
        } else {
            doc.style.display = 'none';
        }
    });
}

function searchDocuments(query) {
    const documents = document.querySelectorAll('.document-card');
    const lowerQuery = query.toLowerCase();
    
    documents.forEach(doc => {
        const title = doc.querySelector('.doc-title').textContent.toLowerCase();
        if (title.includes(lowerQuery)) {
            doc.style.display = 'flex';
        } else {
            doc.style.display = 'none';
        }
    });
}

function addCategory() {
    const categoryName = prompt('Enter new category name:');
    if (categoryName) {
        alert(`Category "${categoryName}" would be added to the system.`);
    }
}

// Close modal on click outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('uploadModal');
    if (modal && e.target === modal) {
        closeUploadModal();
    }
});

// Contact form handler
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const submitButton = event.target.querySelector('button[type="submit"]');
    
    // Disable submit button
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending... <span>→</span>';
    }
    
    try {
        const response = await fetch('/php/contact-handler.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Message sent successfully! We\'ll get back to you within 24 hours.');
            event.target.reset();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        // Fallback to mailto
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const message = formData.get('message');
        
        const subject = `Contact from ${name}${company ? ' (' + company + ')' : ''}`;
        const body = `Name: ${name}\nEmail: ${email}\n${company ? 'Company: ' + company + '\n' : ''}\nMessage:\n${message}`;
        const mailtoLink = `mailto:tyler@verbitskysystems.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
    } finally {
        // Re-enable submit button
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message <span>→</span>';
        }
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on desktop resize
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);
});

// Page transition effects
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

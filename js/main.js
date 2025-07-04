// Verbitsky Systems - Main JavaScript

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Set active nav link if event exists
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // Find and activate the correct nav link
        const navLink = document.querySelector(`a[href="#${pageId}"]`);
        if (navLink) {
            navLink.classList.add('active');
        }
    }
    
    // Update URL hash without triggering scroll
    history.pushState(null, null, `#${pageId}`);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Handle browser back/forward
window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1) || 'home';
    const page = document.getElementById(hash);
    if (page) {
        showPage(hash);
    }
});

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1) || 'home';
    if (document.getElementById(hash)) {
        showPage(hash);
    }
});

// Chat functionality
let messageCount = 5;
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Auto-resize textarea
if (chatInput) {
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        
        // Update send button state
        const sendBtn = document.querySelector('.chat-send');
        if (sendBtn) {
            sendBtn.disabled = this.value.trim() === '';
        }
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
        
        // Update send button state
        const sendBtn = document.querySelector('.chat-send');
        if (sendBtn) {
            sendBtn.disabled = false;
        }
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
        <div class="message-avatar user">You</div>
        <div class="message-content">${escapeHtml(message)}</div>
    `;
    chatMessages.appendChild(userMessage);

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Update send button state
    const sendBtn = document.querySelector('.chat-send');
    if (sendBtn) {
        sendBtn.disabled = true;
    }

    // Update message count
    messageCount += 1;
    const messageCountEl = document.getElementById('messageCount');
    if (messageCountEl) {
        messageCountEl.textContent = messageCount;
    }

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI response
    setTimeout(() => {
        hideTypingIndicator();
        
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
        
        // Update message count for AI response
        messageCount += 1;
        if (messageCountEl) {
            messageCountEl.textContent = messageCount;
        }
    }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
}

function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message typing-indicator';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.innerHTML = `
        <div class="message-avatar ai">AI</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    
    // Add typing animation CSS if not already present
    if (!document.getElementById('typingStyles')) {
        const style = document.createElement('style');
        style.id = 'typingStyles';
        style.textContent = `
            .typing-dots {
                display: flex;
                gap: 4px;
                align-items: center;
                padding: 8px 0;
            }
            .typing-dots span {
                width: 8px;
                height: 8px;
                background: var(--text-muted);
                border-radius: 50%;
                animation: typing 1.4s infinite ease-in-out;
            }
            .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
            .typing-dots span:nth-child(3) { animation-delay: 0s; }
            @keyframes typing {
                0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                40% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('plc') && (lowerMessage.includes('hmi') || lowerMessage.includes('communication'))) {
        return `For PLC-HMI communication issues, let's diagnose systematically:
        <br><br>
        1. <strong>Check physical connections</strong> - Ensure all cables are properly seated
        <br>
        2. <strong>Verify network settings</strong> - IP addresses, subnet masks must match
        <br>
        3. <strong>Test ping connectivity</strong> - Can the HMI ping the PLC?
        <br>
        4. <strong>Review communication drivers</strong> - Ensure correct driver and version
        <br><br>
        Common causes: IP conflicts, cable issues, or driver mismatches.
        <br><br>
        What error messages are you seeing on the HMI?`;
    } else if (lowerMessage.includes('motor') && (lowerMessage.includes('overheat') || lowerMessage.includes('thermal') || lowerMessage.includes('hot'))) {
        return `Motor overheating requires immediate attention. Check these items:
        <br><br>
        1. <strong>Ambient temperature</strong> - Is cooling adequate?
        <br>
        2. <strong>Load conditions</strong> - Verify motor isn't overloaded
        <br>
        3. <strong>VFD parameters</strong> - Check acceleration/deceleration times
        <br>
        4. <strong>Mechanical issues</strong> - Listen for bearing noise
        <br><br>
        <strong>Safety first:</strong> Ensure proper lockout/tagout before inspection.
        <br><br>
        What's the motor's rated capacity versus actual load?`;
    } else if (lowerMessage.includes('safety') || lowerMessage.includes('e-stop') || lowerMessage.includes('estop')) {
        return `Safety system reset issues are critical. Follow this sequence:
        <br><br>
        1. <strong>Verify all E-stops</strong> are pulled out/reset
        <br>
        2. <strong>Check safety relay</strong> status LEDs
        <br>
        3. <strong>Review safety circuit</strong> continuity
        <br>
        4. <strong>Inspect door switches</strong> and light curtains
        <br><br>
        The safety system requires all conditions cleared before reset.
        <br><br>
        Are there any specific fault codes on the safety relay?`;
    } else if (lowerMessage.includes('sensor') && (lowerMessage.includes('inconsistent') || lowerMessage.includes('reading') || lowerMessage.includes('signal'))) {
        return `For sensor diagnostic issues:
        <br><br>
        1. <strong>Check power supply</strong> - Verify correct voltage (typically 24VDC)
        <br>
        2. <strong>Inspect wiring</strong> - Look for damage, loose connections, or EMI
        <br>
        3. <strong>Test with multimeter</strong> - Measure 4-20mA or 0-10V output signal
        <br>
        4. <strong>Review mounting</strong> - Ensure proper alignment and distance
        <br><br>
        Environmental factors like temperature, vibration, or electromagnetic interference can affect readings.
        <br><br>
        What type of sensor (proximity, analog, temperature) and what's the expected vs actual output?`;
    } else if (lowerMessage.includes('plc') || lowerMessage.includes('programming')) {
        return `PLC troubleshooting approach:
        <br><br>
        1. <strong>Check I/O status</strong> - Verify input/output LED indicators
        <br>
        2. <strong>Review fault codes</strong> - Check diagnostic registers
        <br>
        3. <strong>Validate program logic</strong> - Step through ladder logic
        <br>
        4. <strong>Test communications</strong> - Verify network connections
        <br><br>
        What PLC model are you working with and what specific issue are you seeing?`;
    } else if (lowerMessage.includes('vfd') || lowerMessage.includes('drive') || lowerMessage.includes('frequency')) {
        return `Variable Frequency Drive diagnostics:
        <br><br>
        1. <strong>Check fault history</strong> - Review drive's fault log
        <br>
        2. <strong>Verify parameters</strong> - Motor nameplate vs drive settings
        <br>
        3. <strong>Test motor insulation</strong> - Megger test if available
        <br>
        4. <strong>Inspect connections</strong> - Power and control wiring
        <br><br>
        Common VFD issues: overcurrent, overvoltage, overheating, or ground faults.
        <br><br>
        What fault code is the drive displaying?`;
    } else {
        return `I understand you're experiencing: "<em>${escapeHtml(message)}</em>"
        <br><br>
        To provide the most accurate troubleshooting guidance, I need more information:
        <br><br>
        • <strong>Equipment details</strong> - Make, model, and type
        <br>
        • <strong>Error codes or alarms</strong> - Any displayed messages
        <br>
        • <strong>When it started</strong> - Timeline of the issue
        <br>
        • <strong>Recent changes</strong> - Any modifications to the system
        <br><br>
        This helps me give you specific, actionable solutions. What additional details can you provide?`;
    }
}

// FAQ toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Mobile menu toggle
function toggleMobileMenu() {
    // Implementation for mobile menu
    alert('Mobile menu functionality would be implemented here for production');
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
    
    // Initialize send button state
    const sendBtn = document.querySelector('.chat-send');
    if (sendBtn) {
        sendBtn.disabled = true;
    }
});

function handleFiles(files) {
    const fileList = Array.from(files);
    
    // Validate file types and sizes
    const validFiles = fileList.filter(file => {
        const validTypes = ['.pdf', '.doc', '.docx', '.txt'];
        const fileExt = '.' + file.name.split('.').pop().toLowerCase();
        const maxSize = 50 * 1024 * 1024; // 50MB
        
        if (!validTypes.includes(fileExt)) {
            alert(`${file.name} is not a supported file type.`);
            return false;
        }
        
        if (file.size > maxSize) {
            alert(`${file.name} exceeds the 50MB size limit.`);
            return false;
        }
        
        return true;
    });
    
    selectedFiles = [...selectedFiles, ...validFiles];
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
            <div class="file-name">${escapeHtml(file.name)}</div>
            <div class="file-size">${formatFileSize(file.size)}</div>
            <button class="file-remove" onclick="removeFile(${index})" type="button">×</button>
            <div class="upload-progress" style="display: none;">
                <div class="upload-progress-bar" style="width: 0%"></div>
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
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        selectedFiles = [];
        displayFileQueue();
        const uploadCategory = document.getElementById('uploadCategory');
        if (uploadCategory) {
            uploadCategory.value = '';
        }
    }
}

function startUpload() {
    const category = document.getElementById('uploadCategory');
    if (!category || !category.value) {
        alert('Please select a category for the documents');
        return;
    }
    
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Uploading...';
    }
    
    // Simulate upload progress
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach((item, index) => {
        const progressBar = item.querySelector('.upload-progress');
        const progressFill = item.querySelector('.upload-progress-bar');
        
        setTimeout(() => {
            progressBar.style.display = 'block';
            let progress = 0;
            
            const interval = setInterval(() => {
                progress += Math.random() * 25 + 5; // 5-30% increments
                if (progress > 100) progress = 100;
                progressFill.style.width = progress + '%';
                
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        item.style.opacity = '0.5';
                        const fileName = item.querySelector('.file-name');
                        if (fileName) {
                            fileName.innerHTML += ' <span style="color: var(--accent-green)">✓</span>';
                        }
                    }, 300);
                }
            }, 200);
        }, index * 300);
    });
    
    // Close modal after all uploads
    setTimeout(() => {
        closeUploadModal();
        alert('Documents uploaded successfully!');
        // In production, this would refresh the document list
    }, selectedFiles.length * 1500 + 1000);
}

function filterByCategory(category) {
    // Update active category
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (event && event.target) {
        const categoryItem = event.target.closest('.category-item');
        if (categoryItem) {
            categoryItem.classList.add('active');
        }
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
        const title = doc.querySelector('.doc-title');
        if (title && title.textContent.toLowerCase().includes(lowerQuery)) {
            doc.style.display = 'flex';
        } else {
            doc.style.display = 'none';
        }
    });
}

function addCategory() {
    const categoryName = prompt('Enter new category name:');
    if (categoryName && categoryName.trim()) {
        alert(`Category "${categoryName}" would be added to the system.`);
        // In production, this would make an API call to add the category
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
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    const formData = new FormData(event.target);
    
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
            throw new Error(result.error || 'Unknown error occurred');
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
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

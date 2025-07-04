// Verbitsky Systems - Main JavaScript

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        const navLink = document.querySelector(`a[href="#${pageId}"]`);
        if (navLink) navLink.classList.add('active');
    }
    
    history.pushState(null, null, `#${pageId}`);
    window.scrollTo(0, 0);
}

// Handle browser back/forward
window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1) || 'home';
    if (document.getElementById(hash)) showPage(hash);
});

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1) || 'home';
    if (document.getElementById(hash)) showPage(hash);
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
        
        const sendBtn = document.querySelector('.chat-send');
        if (sendBtn) sendBtn.disabled = this.value.trim() === '';
    });

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
        
        const sendBtn = document.querySelector('.chat-send');
        if (sendBtn) sendBtn.disabled = false;
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
    
    const sendBtn = document.querySelector('.chat-send');
    if (sendBtn) sendBtn.disabled = true;

    // Update message count
    messageCount += 1;
    const messageCountEl = document.getElementById('messageCount');
    if (messageCountEl) messageCountEl.textContent = messageCount;

    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI response
    setTimeout(() => {
        hideTypingIndicator();
        
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message';
        
        let response = generateResponse(message);
        
        aiMessage.innerHTML = `
            <div class="message-avatar ai">AI</div>
            <div class="message-content">${response}</div>
        `;
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        messageCount += 1;
        if (messageCountEl) messageCountEl.textContent = messageCount;
    }, Math.random() * 2000 + 1000);
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
    
    if (!document.getElementById('typingStyles')) {
        const style = document.createElement('style');
        style.id = 'typingStyles';
        style.textContent = `
            .typing-dots { display: flex; gap: 4px; align-items: center; padding: 8px 0; }
            .typing-dots span { width: 8px; height: 8px; background: var(--text-muted); border-radius: 50%; animation: typing 1.4s infinite ease-in-out; }
            .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
            .typing-dots span:nth-child(3) { animation-delay: 0s; }
            @keyframes typing { 0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }
        `;
        document.head.appendChild(style);
    }
    
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function generateResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('plc') && (msg.includes('hmi') || msg.includes('communication'))) {
        return `<strong>PLC-HMI Communication Issues:</strong><br><br>
        1. <strong>Check connections</strong> - Cable seating<br>
        2. <strong>Verify network</strong> - IP addresses match<br>
        3. <strong>Test ping</strong> - HMI to PLC connectivity<br>
        4. <strong>Review drivers</strong> - Correct version<br><br>
        What error messages are you seeing?`;
    } 
    if (msg.includes('motor') && (msg.includes('overheat') || msg.includes('thermal'))) {
        return `<strong>Motor Overheating:</strong><br><br>
        1. <strong>Ambient temp</strong> - Adequate cooling?<br>
        2. <strong>Load check</strong> - Motor overloaded?<br>
        3. <strong>VFD params</strong> - Accel/decel times<br>
        4. <strong>Mechanical</strong> - Bearing noise<br><br>
        What's rated vs actual load?`;
    }
    if (msg.includes('safety') || msg.includes('e-stop')) {
        return `<strong>Safety System Reset:</strong><br><br>
        1. <strong>E-stops</strong> - All pulled out/reset<br>
        2. <strong>Safety relay</strong> - Check LEDs<br>
        3. <strong>Circuit check</strong> - Continuity<br>
        4. <strong>Door switches</strong> - Light curtains<br><br>
        Any fault codes on safety relay?`;
    }
    if (msg.includes('sensor')) {
        return `<strong>Sensor Diagnostics:</strong><br><br>
        1. <strong>Power supply</strong> - 24VDC verified<br>
        2. <strong>Wiring</strong> - Damage/EMI check<br>
        3. <strong>Signal test</strong> - 4-20mA/0-10V<br>
        4. <strong>Mounting</strong> - Alignment/distance<br><br>
        What sensor type and expected vs actual output?`;
    }
    
    return `I can help with: "<em>${escapeHtml(message)}</em>"<br><br>
    Need more details:<br>
    • Equipment make/model<br>
    • Error codes/alarms<br>
    • When issue started<br>
    • Recent changes<br><br>
    What additional info can you provide?`;
}

// FAQ toggle
function toggleFAQ(element) {
    element.parentElement.classList.toggle('active');
}

// Mobile menu toggle
function toggleMobileMenu() {
    alert('Mobile menu functionality - production implementation needed');
}

// Scroll effect
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

// Documents functionality
let selectedFiles = [];

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
    
    const sendBtn = document.querySelector('.chat-send');
    if (sendBtn) sendBtn.disabled = true;
});

function handleFiles(files) {
    const fileList = Array.from(files);
    
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
    if (uploadBtn) uploadBtn.disabled = selectedFiles.length === 0;
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
    if (uploadBtn) uploadBtn.disabled = selectedFiles.length === 0;
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
        if (uploadCategory) uploadCategory.value = '';
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
    
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach((item, index) => {
        const progressBar = item.querySelector('.upload-progress');
        const progressFill = item.querySelector('.upload-progress-bar');
        
        setTimeout(() => {
            progressBar.style.display = 'block';
            let progress = 0;
            
            const interval = setInterval(() => {
                progress += Math.random() * 25 + 5;
                if (progress > 100) progress = 100;
                progressFill.style.width = progress + '%';
                
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        item.style.opacity = '0.5';
                        const fileName = item.querySelector('.file-name');
                        if (fileName) fileName.innerHTML += ' <span style="color: var(--accent-green)">✓</span>';
                    }, 300);
                }
            }, 200);
        }, index * 300);
    });
    
    setTimeout(() => {
        closeUploadModal();
        alert('Documents uploaded successfully!');
    }, selectedFiles.length * 1500 + 1000);
}

function filterByCategory(category) {
    document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
    
    if (event && event.target) {
        const categoryItem = event.target.closest('.category-item');
        if (categoryItem) categoryItem.classList.add('active');
    }
    
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
    }
}

// Close modal on click outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('uploadModal');
    if (modal && e.target === modal) closeUploadModal();
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

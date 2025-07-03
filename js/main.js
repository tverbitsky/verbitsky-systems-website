// Verbitsky Systems - Fixed Main JavaScript

// Global state
let currentPage = 'home';
let messageHistory = [];
let uploadedDocuments = [];
let selectedFiles = [];

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page navigation
    initPageNavigation();
    
    // Initialize AI chat
    initAIChat();
    
    // Initialize document system
    initDocumentSystem();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize forms
    initForms();
    
    // Show home page by default
    showPage('home');
});

// Page Navigation System
function initPageNavigation() {
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const page = window.location.hash.slice(1) || 'home';
        showPage(page, false);
    });
}

function showPage(pageId, updateHistory = true) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        currentPage = pageId;
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the corresponding nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.onclick && link.onclick.toString().includes(pageId)) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Update URL
    if (updateHistory) {
        history.pushState(null, null, `#${pageId}`);
    }
}

// Mobile Menu
function initMobileMenu() {
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        
        if (mobileNav && mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        if (mobileNav.classList.contains('active')) {
            closeMobileMenu();
        } else {
            mobileNav.style.display = 'block';
            setTimeout(() => {
                mobileNav.classList.add('active');
            }, 10);
        }
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.remove('active');
        setTimeout(() => {
            mobileNav.style.display = 'none';
        }, 300);
    }
}

// AI Chat System (Claude-style)
function initAIChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (!chatInput || !sendBtn) return;
    
    // Enable/disable send button based on input
    chatInput.addEventListener('input', function() {
        sendBtn.disabled = this.value.trim() === '';
        
        // Auto-resize textarea
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });
    
    // Send on Enter (not Shift+Enter)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

function insertPrompt(prompt) {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (chatInput) {
        chatInput.value = prompt;
        chatInput.focus();
        sendBtn.disabled = false;
        
        // Auto-resize
        chatInput.style.height = 'auto';
        chatInput.style.height = chatInput.scrollHeight + 'px';
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendBtn = document.getElementById('sendBtn');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage('user', message);
    
    // Clear input and disable button
    chatInput.value = '';
    chatInput.style.height = 'auto';
    sendBtn.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate response after delay
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateAIResponse(message);
        addMessage('assistant', response);
    }, 1500);
}

function addMessage(type, content) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${type}`;
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'message-header';
    
    const avatarSpan = document.createElement('span');
    avatarSpan.className = 'message-avatar';
    avatarSpan.textContent = type === 'user' ? 'You' : 'AI';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'message-name';
    nameSpan.textContent = type === 'user' ? 'You' : 'Industrial AI Assistant';
    
    headerDiv.appendChild(avatarSpan);
    headerDiv.appendChild(nameSpan);
    
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'message-body';
    
    // Parse content for formatting
    const formattedContent = formatMessageContent(content);
    bodyDiv.innerHTML = formattedContent;
    
    messageDiv.appendChild(headerDiv);
    messageDiv.appendChild(bodyDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Save to history
    messageHistory.push({ type, content, timestamp: Date.now() });
}

function formatMessageContent(content) {
    // Convert markdown-like formatting to HTML
    return content
        .split('\n\n')
        .map(paragraph => {
            if (paragraph.startsWith('- ')) {
                // Convert bullet points to list
                const items = paragraph.split('\n')
                    .filter(line => line.startsWith('- '))
                    .map(line => `<li>${line.substring(2)}</li>`)
                    .join('');
                return `<ul>${items}</ul>`;
            } else {
                // Regular paragraph with bold text
                return `<p>${paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
            }
        })
        .join('');
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message assistant typing-message';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-header">
            <span class="message-avatar">AI</span>
            <span class="message-name">Industrial AI Assistant</span>
        </div>
        <div class="message-body">
            <div class="typing-dots">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Context-aware responses
    if (lowerMessage.includes('plc') || lowerMessage.includes('communication')) {
        return `I can help you diagnose PLC communication issues. Here's a systematic approach:

**1. Physical Layer Check**
- Verify all cables are properly connected and not damaged
- Check termination resistors if using RS-485
- Ensure proper grounding to avoid interference

**2. Network Configuration**
- Confirm IP addresses are in the same subnet
- Verify subnet masks match across devices
- Check that no duplicate IP addresses exist

**3. Communication Parameters**
- Ensure baud rate, data bits, stop bits, and parity match
- Verify the correct communication protocol is selected
- Check timeout settings

**4. Testing Steps**
- Use ping command to test basic connectivity
- Try a simple read/write test with minimal data
- Monitor communication statistics for errors

What specific PLC model and communication protocol are you using?`;
    } else if (lowerMessage.includes('motor') || lowerMessage.includes('overheat')) {
        return `Motor overheating is a critical issue that requires immediate attention. Let me guide you through the diagnosis:

**Immediate Safety Steps:**
- Implement proper lockout/tagout procedures
- Allow motor to cool before inspection
- Check for any visible damage or burning smell

**Common Causes to Investigate:**
- **Overloading**: Compare actual load to motor nameplate rating
- **Ambient Temperature**: Ensure adequate ventilation and cooling
- **Power Quality**: Check for voltage imbalance or harmonics
- **Mechanical Issues**: Listen for bearing noise or misalignment

**VFD Settings to Review:**
- Acceleration/deceleration ramp times
- Current limit settings
- Carrier frequency (higher frequency = more heat)

**Preventive Measures:**
- Install temperature monitoring
- Schedule regular thermal imaging
- Implement predictive maintenance

What are the motor specifications and current operating conditions?`;
    } else if (lowerMessage.includes('safety') || lowerMessage.includes('e-stop')) {
        return `Safety system diagnostics require careful attention to detail. Here's how to troubleshoot:

**Safety System Reset Procedure:**
1. Verify all E-stops are fully pulled out/reset
2. Check all safety doors are properly closed
3. Ensure light curtains are unobstructed
4. Verify safety mats are not activated

**Diagnostic Steps:**
- Check safety relay status LEDs for fault codes
- Test continuity of the entire safety circuit
- Verify 24VDC power to all safety devices
- Review safety PLC diagnostics if applicable

**Common Issues:**
- Welded contacts in safety relays
- Broken wires in flexible conduits
- Misaligned safety sensors
- Timing issues between redundant channels

**Important:** Never bypass safety devices. If you can't identify the issue, consult the safety system manual or manufacturer support.

What specific safety devices are in your system?`;
    } else if (lowerMessage.includes('sensor') || lowerMessage.includes('diagnostic')) {
        return `I'll help you troubleshoot sensor issues systematically:

**Initial Checks:**
- Verify power supply voltage matches sensor specifications
- Check for proper grounding and shielding
- Ensure sensor is within detection range

**Signal Testing:**
- Measure output signal with multimeter
- For analog sensors: Check 4-20mA or 0-10V signal
- For digital sensors: Verify switching states

**Environmental Factors:**
- Temperature: Is sensor rated for current conditions?
- Moisture: Check for condensation or water ingress
- EMI: Look for nearby sources of interference

**Mounting and Alignment:**
- Verify sensor is securely mounted
- Check alignment with target
- Ensure sensing face is clean

What type of sensor are you working with and what symptoms are you seeing?`;
    } else {
        return `I understand you need help with: "${message}"

To provide the most accurate assistance, I need some additional information:

- **Equipment Details**: Make, model, and specifications
- **Symptoms**: What exactly is happening or not working?
- **Error Codes**: Any alarms or fault messages displayed?
- **Recent Changes**: Any modifications or maintenance performed?
- **Operating Conditions**: Current load, speed, temperature, etc.

With this information, I can provide targeted troubleshooting steps specific to your situation.

Feel free to share any documentation, wiring diagrams, or parameter lists that might help diagnose the issue.`;
    }
}

// Document Management System
function initDocumentSystem() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea && fileInput) {
        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());
        
        // Drag and drop
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
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }
    
    // Initialize with sample documents
    initializeSampleDocuments();
}

function initializeSampleDocuments() {
    // This would normally load from a database
    uploadedDocuments = [
        {
            id: 1,
            name: 'PLC Communication Protocols Guide',
            category: 'plc',
            size: 2359296,
            date: '2024-01-15',
            type: 'PDF'
        },
        {
            id: 2,
            name: 'SCADA Alarm Management Best Practices',
            category: 'scada',
            size: 1887437,
            date: '2024-01-10',
            type: 'PDF'
        },
        {
            id: 3,
            name: 'VFD Parameter Optimization Guide',
            category: 'drives',
            size: 3250176,
            date: '2024-01-05',
            type: 'PDF'
        },
        {
            id: 4,
            name: 'Safety System Integration Manual',
            category: 'safety',
            size: 4404019,
            date: '2023-12-20',
            type: 'PDF'
        }
    ];
}

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
            <span class="file-name">${file.name}</span>
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
    }
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.classList.remove('active');
        selectedFiles = [];
        displayFileQueue();
        const uploadCategory = document.getElementById('uploadCategory');
        if (uploadCategory) {
            uploadCategory.value = '';
        }
    }
}

function startUpload() {
    const category = document.getElementById('uploadCategory')?.value;
    if (!category) {
        alert('Please select a category for the documents');
        return;
    }
    
    // Simulate upload progress
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach((item, index) => {
        const progressBar = item.querySelector('.upload-progress-bar');
        
        if (progressBar) {
            setTimeout(() => {
                let progress = 0;
                
                const interval = setInterval(() => {
                    progress += Math.random() * 30;
                    if (progress > 100) progress = 100;
                    progressBar.style.width = progress + '%';
                    
                    if (progress === 100) {
                        clearInterval(interval);
                        
                        // Add to uploaded documents
                        const file = selectedFiles[index];
                        if (file) {
                            uploadedDocuments.push({
                                id: uploadedDocuments.length + 1,
                                name: file.name,
                                category: category,
                                size: file.size,
                                date: new Date().toISOString().split('T')[0],
                                type: file.name.split('.').pop().toUpperCase()
                            });
                        }
                    }
                }, 300);
            }, index * 200);
        }
    });
    
    // Close modal after upload
    setTimeout(() => {
        closeUploadModal();
        updateDocumentCount();
        updateStorageInfo();
    }, selectedFiles.length * 1000 + 1000);
}

function filterDocuments(category) {
    // Update active category
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.category-item').classList.add('active');
    
    // Filter document cards
    const cards = document.querySelectorAll('.document-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchDocuments(query) {
    const cards = document.querySelectorAll('.document-card');
    const lowerQuery = query.toLowerCase();
    
    cards.forEach(card => {
        const title = card.querySelector('.doc-title')?.textContent.toLowerCase() || '';
        if (title.includes(lowerQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function sortDocuments(sortBy) {
    const grid = document.getElementById('documentGrid');
    const cards = Array.from(grid.querySelectorAll('.document-card'));
    
    cards.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.dataset.name.localeCompare(b.dataset.name);
            case 'size':
                return parseInt(b.dataset.size) - parseInt(a.dataset.size);
            case 'date':
            default:
                return new Date(b.dataset.date) - new Date(a.dataset.date);
        }
    });
    
    // Re-append in sorted order
    cards.forEach(card => grid.appendChild(card));
}

function setView(view) {
    // Update active toggle
    document.querySelectorAll('.view-toggle').forEach(toggle => {
        toggle.classList.remove('active');
    });
    event.target.closest('.view-toggle').classList.add('active');
    
    // Change grid layout
    const grid = document.getElementById('documentGrid');
    if (view === 'list') {
        grid.style.gridTemplateColumns = '1fr';
    } else {
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    }
}

function addCategory() {
    const categoryName = prompt('Enter new category name:');
    if (categoryName) {
        // Here you would add the category to the system
        alert(`Category "${categoryName}" has been added.`);
        // Refresh category list
        updateCategoryList();
    }
}

function updateDocumentCount() {
    const totalDocs = document.getElementById('totalDocs');
    if (totalDocs) {
        totalDocs.textContent = uploadedDocuments.length;
    }
    
    // Update category counts
    const categories = ['plc', 'scada', 'drives', 'safety'];
    categories.forEach(cat => {
        const count = uploadedDocuments.filter(doc => doc.category === cat).length;
        // Update UI with counts
    });
}

function updateStorageInfo() {
    const totalSize = uploadedDocuments.reduce((sum, doc) => sum + doc.size, 0);
    const totalSizeEl = document.getElementById('totalSize');
    if (totalSizeEl) {
        totalSizeEl.textContent = formatFileSize(totalSize);
    }
    
    const lastUpdatedEl = document.getElementById('lastUpdated');
    if (lastUpdatedEl) {
        lastUpdatedEl.textContent = 'Just now';
    }
}

function updateCategoryList() {
    // Refresh category list with new categories
}

// Forms
function initForms() {
    // Add input validation and styling
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement?.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement?.classList.remove('focused');
        });
    });
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Contact Form
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    try {
        // In production, this would send to your server
        const response = await fetch('/php/contact-handler.php', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Message sent successfully! We\'ll be in touch within 24 hours.');
            event.target.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        // Fallback to mailto
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const message = formData.get('message');
        
        const subject = `Contact from ${name} (${company})`;
        const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:tyler@verbitskysystems.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
    }
}

// Close modals on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeUploadModal();
    }
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('uploadModal');
    if (modal && e.target === modal) {
        closeUploadModal();
    }
});

// Export functions for global access
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.insertPrompt = insertPrompt;
window.sendMessage = sendMessage;
window.handleFiles = handleFiles;
window.removeFile = removeFile;
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.startUpload = startUpload;
window.filterDocuments = filterDocuments;
window.searchDocuments = searchDocuments;
window.sortDocuments = sortDocuments;
window.setView = setView;
window.addCategory = addCategory;
window.toggleFAQ = toggleFAQ;
window.handleContactSubmit = handleContactSubmit;

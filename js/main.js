// Verbitsky Systems - Operating System-Like Experience
// Enhanced with smooth animations, system-like interactions, and refined performance

// =============================================================================
// CORE SYSTEM MANAGEMENT
// =============================================================================

class SystemManager {
    constructor() {
        this.isInitialized = false;
        this.activeAnimations = new Set();
        this.pendingTransitions = new Map();
        this.performanceMetrics = {
            frameTime: 0,
            interactionLatency: 0,
            animationsFPS: 0
        };
        this.preferences = {
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            theme: 'dark',
            animations: true
        };
        this.init();
    }

    init() {
        this.setupPerformanceMonitoring();
        this.setupGlobalEventListeners();
        this.setupSystemOptimizations();
        this.isInitialized = true;
        this.emit('system:ready');
    }

    setupPerformanceMonitoring() {
        // Monitor frame rate and performance
        let lastTime = performance.now();
        const measureFrame = (currentTime) => {
            const delta = currentTime - lastTime;
            this.performanceMetrics.frameTime = delta;
            this.performanceMetrics.animationsFPS = 1000 / delta;
            lastTime = currentTime;
            requestAnimationFrame(measureFrame);
        };
        requestAnimationFrame(measureFrame);
    }

    setupGlobalEventListeners() {
        // Global system events
        document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 100));
        window.addEventListener('beforeunload', this.handleSystemShutdown.bind(this));
        
        // Performance optimization events
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        window.addEventListener('focus', () => this.emit('system:focus'));
        window.addEventListener('blur', () => this.emit('system:blur'));
    }

    setupSystemOptimizations() {
        // Preload critical resources
        this.preloadImages();
        this.optimizeScrolling();
        this.setupIntersectionObserver();
    }

    preloadImages() {
        const criticalImages = [
            '/images/industrial-ai-hero.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    optimizeScrolling() {
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.1 });
    }

    handleGlobalKeydown(e) {
        // System-wide keyboard shortcuts
        if (e.metaKey || e.ctrlKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    this.emit('system:search');
                    break;
                case '/':
                    e.preventDefault();
                    this.emit('system:help');
                    break;
            }
        }
        
        // Navigation shortcuts
        if (e.key === 'Escape') {
            this.emit('system:escape');
        }
    }

    handleResize() {
        this.emit('system:resize');
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.pauseAnimations();
        } else {
            this.resumeAnimations();
        }
    }

    handleSystemShutdown() {
        this.cleanup();
    }

    handleScroll() {
        this.emit('system:scroll', { scrollY: window.scrollY });
    }

    // Event system
    emit(event, data = null) {
        const customEvent = new CustomEvent(event, { detail: data });
        document.dispatchEvent(customEvent);
    }

    on(event, callback) {
        document.addEventListener(event, callback);
    }

    off(event, callback) {
        document.removeEventListener(event, callback);
    }

    // Animation management
    registerAnimation(id, animation) {
        this.activeAnimations.add(id);
        animation.addEventListener('finish', () => {
            this.activeAnimations.delete(id);
        });
        return animation;
    }

    pauseAnimations() {
        this.activeAnimations.forEach(id => {
            // Pause active animations for performance
        });
    }

    resumeAnimations() {
        this.activeAnimations.forEach(id => {
            // Resume animations
        });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    cleanup() {
        this.activeAnimations.clear();
        this.pendingTransitions.clear();
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// =============================================================================
// ENHANCED NAVIGATION SYSTEM
// =============================================================================

class NavigationSystem {
    constructor(system) {
        this.system = system;
        this.currentPage = 'home';
        this.history = ['home'];
        this.isTransitioning = false;
        this.transitionDuration = 300;
        this.init();
    }

    init() {
        this.setupPageTransitions();
        this.setupNavigationEffects();
        this.setupMobileNavigation();
        this.setupHashNavigation();
        this.system.on('system:ready', this.initializeNavigation.bind(this));
    }

    setupPageTransitions() {
        // Create smooth page transition system
        this.createTransitionOverlay();
        this.setupPagePreloading();
    }

    createTransitionOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-secondary);
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
        `;
        document.body.appendChild(overlay);
        this.transitionOverlay = overlay;
    }

    setupPagePreloading() {
        // Preload page content for instant transitions
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            if (this.system.observer) {
                this.system.observer.observe(page);
            }
        });
    }

    setupNavigationEffects() {
        // Enhanced navigation with smooth hover effects
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            this.enhanceNavLink(link);
        });

        // Smooth scroll effects for navigation
        this.setupScrollEffects();
    }

    enhanceNavLink(link) {
        // Create hover effect elements
        const hoverBackground = document.createElement('div');
        hoverBackground.className = 'nav-link-hover';
        hoverBackground.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-elevated);
            border-radius: var(--radius-md);
            opacity: 0;
            transform: scale(0.95);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: -1;
        `;
        
        link.style.position = 'relative';
        link.insertBefore(hoverBackground, link.firstChild);

        // Enhanced hover interactions
        link.addEventListener('mouseenter', () => {
            if (!this.isTransitioning) {
                hoverBackground.style.opacity = '1';
                hoverBackground.style.transform = 'scale(1)';
                this.system.registerAnimation('nav-hover', 
                    link.animate([
                        { transform: 'translateY(0px)' },
                        { transform: 'translateY(-1px)' }
                    ], { duration: 150, easing: 'ease-out', fill: 'forwards' })
                );
            }
        });

        link.addEventListener('mouseleave', () => {
            hoverBackground.style.opacity = '0';
            hoverBackground.style.transform = 'scale(0.95)';
            link.style.transform = 'translateY(0px)';
        });

        // Enhanced click feedback
        link.addEventListener('mousedown', () => {
            this.system.registerAnimation('nav-click',
                link.animate([
                    { transform: 'translateY(-1px) scale(1)' },
                    { transform: 'translateY(0px) scale(0.98)' }
                ], { duration: 100, easing: 'ease-out' })
            );
        });

        link.addEventListener('mouseup', () => {
            link.style.transform = 'translateY(-1px) scale(1)';
        });
    }

    setupScrollEffects() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        let lastScrollY = window.scrollY;
        let scrollDirection = 'up';

        this.system.on('system:scroll', (e) => {
            const currentScrollY = e.detail.scrollY;
            scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = currentScrollY;

            // Smooth navbar background transition
            if (currentScrollY > 50) {
                nav.style.background = 'rgba(24, 24, 27, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
                nav.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.3)';
                nav.style.borderBottom = '1px solid rgba(63, 63, 70, 0.5)';
            } else {
                nav.style.background = 'var(--bg-primary)';
                nav.style.backdropFilter = 'none';
                nav.style.boxShadow = 'none';
                nav.style.borderBottom = '1px solid var(--border-secondary)';
            }

            // Auto-hide navbar on scroll down (mobile)
            if (window.innerWidth <= 768) {
                if (scrollDirection === 'down' && currentScrollY > 100) {
                    nav.style.transform = 'translateY(-100%)';
                } else if (scrollDirection === 'up') {
                    nav.style.transform = 'translateY(0)';
                }
            }
        });
    }

    setupMobileNavigation() {
        // Enhanced mobile navigation with smooth animations
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        if (!mobileMenuBtn) return;

        // Create mobile menu overlay
        this.createMobileMenuOverlay();
        
        mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
    }

    createMobileMenuOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        overlay.innerHTML = `
            <div class="mobile-nav-content">
                <div class="mobile-nav-header">
                    <div class="mobile-nav-logo">
                        <div class="logo-icon"></div>
                        <span>Verbitsky Systems</span>
                    </div>
                    <button class="mobile-nav-close">×</button>
                </div>
                <nav class="mobile-nav-links">
                    <a href="#" onclick="navigationSystem.showPage('home')" class="mobile-nav-link">Home</a>
                    <a href="#" onclick="navigationSystem.showPage('about')" class="mobile-nav-link">About</a>
                    <a href="#" onclick="navigationSystem.showPage('ai-assistant')" class="mobile-nav-link">AI Assistant</a>
                    <a href="#" onclick="navigationSystem.showPage('knowledge-base')" class="mobile-nav-link">Knowledge Base</a>
                    <a href="#" onclick="navigationSystem.showPage('support')" class="mobile-nav-link">Support</a>
                    <a href="#" onclick="navigationSystem.showPage('contact')" class="mobile-nav-link">Contact</a>
                </nav>
            </div>
        `;
        
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        document.body.appendChild(overlay);
        this.mobileNavOverlay = overlay;

        // Setup mobile nav close
        const closeBtn = overlay.querySelector('.mobile-nav-close');
        closeBtn.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (this.mobileNavOverlay.style.visibility === 'hidden' || !this.mobileNavOverlay.style.visibility) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileNavOverlay.style.visibility = 'visible';
        this.mobileNavOverlay.style.opacity = '1';
        
        const content = this.mobileNavOverlay.querySelector('.mobile-nav-content');
        this.system.registerAnimation('mobile-nav-open',
            content.animate([
                { transform: 'translateY(-100%)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ], { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
        );

        // Animate links
        const links = content.querySelectorAll('.mobile-nav-link');
        links.forEach((link, index) => {
            setTimeout(() => {
                this.system.registerAnimation(`mobile-nav-link-${index}`,
                    link.animate([
                        { transform: 'translateX(-20px)', opacity: 0 },
                        { transform: 'translateX(0)', opacity: 1 }
                    ], { duration: 200, easing: 'ease-out', fill: 'forwards' })
                );
            }, index * 50);
        });
    }

    closeMobileMenu() {
        const content = this.mobileNavOverlay.querySelector('.mobile-nav-content');
        this.system.registerAnimation('mobile-nav-close',
            content.animate([
                { transform: 'translateY(0)', opacity: 1 },
                { transform: 'translateY(-100%)', opacity: 0 }
            ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
        ).addEventListener('finish', () => {
            this.mobileNavOverlay.style.visibility = 'hidden';
            this.mobileNavOverlay.style.opacity = '0';
        });
    }

    setupHashNavigation() {
        // Enhanced hash navigation with smooth transitions
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                this.showPage(hash);
            }
        });

        // Handle initial hash
        const initialHash = window.location.hash.slice(1);
        if (initialHash) {
            this.showPage(initialHash);
        }
    }

    initializeNavigation() {
        // Set initial active states
        this.updateActiveStates();
    }

    showPage(pageId, addToHistory = true) {
        if (this.isTransitioning || this.currentPage === pageId) return;

        this.isTransitioning = true;
        const startTime = performance.now();

        // Update URL
        if (addToHistory) {
            window.history.pushState({ page: pageId }, '', `#${pageId}`);
            this.history.push(pageId);
        }

        // Start transition
        this.startPageTransition(pageId).then(() => {
            this.currentPage = pageId;
            this.updateActiveStates();
            this.isTransitioning = false;
            
            // Calculate interaction latency
            const endTime = performance.now();
            this.system.performanceMetrics.interactionLatency = endTime - startTime;
            
            // Emit page change event
            this.system.emit('navigation:change', { page: pageId });
        });
    }

    startPageTransition(pageId) {
        return new Promise((resolve) => {
            const currentPageEl = document.querySelector('.page.active');
            const nextPageEl = document.getElementById(pageId);

            if (!nextPageEl) {
                resolve();
                return;
            }

            // Show transition overlay
            this.transitionOverlay.style.visibility = 'visible';
            this.transitionOverlay.style.pointerEvents = 'auto';
            
            const overlayAnimation = this.system.registerAnimation('page-transition-overlay',
                this.transitionOverlay.animate([
                    { opacity: 0 },
                    { opacity: 1 }
                ], { duration: 150, easing: 'ease-out', fill: 'forwards' })
            );

            overlayAnimation.addEventListener('finish', () => {
                // Hide current page
                if (currentPageEl) {
                    currentPageEl.classList.remove('active');
                }

                // Show next page
                nextPageEl.classList.add('active');
                
                // Trigger page entrance animation
                this.animatePageEntrance(nextPageEl);

                // Hide transition overlay
                const overlayExitAnimation = this.system.registerAnimation('page-transition-overlay-exit',
                    this.transitionOverlay.animate([
                        { opacity: 1 },
                        { opacity: 0 }
                    ], { duration: 150, easing: 'ease-in', fill: 'forwards' })
                );

                overlayExitAnimation.addEventListener('finish', () => {
                    this.transitionOverlay.style.visibility = 'hidden';
                    this.transitionOverlay.style.pointerEvents = 'none';
                    
                    // Smooth scroll to top
                    this.smoothScrollToTop();
                    
                    resolve();
                });
            });
        });
    }

    animatePageEntrance(pageEl) {
        const elements = pageEl.querySelectorAll('[data-animate]');
        elements.forEach((el, index) => {
            setTimeout(() => {
                this.system.registerAnimation(`page-entrance-${index}`,
                    el.animate([
                        { transform: 'translateY(20px)', opacity: 0 },
                        { transform: 'translateY(0)', opacity: 1 }
                    ], { duration: 400, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
                );
            }, index * 100);
        });
    }

    smoothScrollToTop() {
        const scrollAnimation = this.system.registerAnimation('smooth-scroll-top',
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        );
    }

    updateActiveStates() {
        // Update navigation active states
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[onclick*="${this.currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    goBack() {
        if (this.history.length > 1) {
            this.history.pop(); // Remove current page
            const previousPage = this.history[this.history.length - 1];
            this.showPage(previousPage, false);
        }
    }
}

// =============================================================================
// ENHANCED CHAT SYSTEM
// =============================================================================

class ChatSystem {
    constructor(system) {
        this.system = system;
        this.messages = [];
        this.isTyping = false;
        this.currentConversationId = null;
        this.messageCount = 0;
        this.typingIndicator = null;
        this.init();
    }

    init() {
        this.setupChatInterface();
        this.setupTypingAnimation();
        this.setupMessageEffects();
        this.setupChatOptimizations();
    }

    setupChatInterface() {
        const chatInput = document.getElementById('chatInput');
        const chatSendBtn = document.getElementById('chatSendBtn');
        const chatMessages = document.getElementById('chatMessages');

        if (!chatInput || !chatMessages) return;

        // Enhanced auto-resize with smooth animation
        this.setupAutoResize(chatInput);
        
        // Enhanced send button states
        this.setupSendButton(chatInput, chatSendBtn);
        
        // Enhanced message handling
        this.setupMessageHandling(chatInput, chatMessages);
    }

    setupAutoResize(input) {
        const minHeight = 44;
        const maxHeight = 120;
        
        input.style.height = `${minHeight}px`;
        
        const resizeInput = () => {
            input.style.height = 'auto';
            const scrollHeight = input.scrollHeight;
            const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
            
            // Smooth height transition
            this.system.registerAnimation('chat-input-resize',
                input.animate([
                    { height: input.style.height },
                    { height: `${newHeight}px` }
                ], { duration: 150, easing: 'ease-out', fill: 'forwards' })
            );
        };

        input.addEventListener('input', this.system.throttle(resizeInput, 50));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage(input.value.trim());
                input.value = '';
                input.style.height = `${minHeight}px`;
            }
        });
    }

    setupSendButton(input, sendBtn) {
        if (!sendBtn) return;

        const updateSendButton = () => {
            const hasContent = input.value.trim().length > 0;
            const newColor = hasContent ? 'var(--accent-green)' : 'var(--gray-400)';
            const newScale = hasContent ? '1' : '0.9';
            
            sendBtn.style.background = newColor;
            sendBtn.style.transform = `scale(${newScale})`;
            sendBtn.style.pointerEvents = hasContent ? 'auto' : 'none';
        };

        input.addEventListener('input', updateSendButton);
        
        sendBtn.addEventListener('click', () => {
            if (input.value.trim()) {
                this.sendMessage(input.value.trim());
                input.value = '';
                input.style.height = '44px';
                updateSendButton();
            }
        });

        // Enhanced button feedback
        sendBtn.addEventListener('mousedown', () => {
            if (input.value.trim()) {
                this.system.registerAnimation('send-btn-click',
                    sendBtn.animate([
                        { transform: 'scale(1)' },
                        { transform: 'scale(0.95)' }
                    ], { duration: 100, easing: 'ease-out', fill: 'forwards' })
                );
            }
        });

        sendBtn.addEventListener('mouseup', () => {
            sendBtn.style.transform = 'scale(1)';
        });
    }

    setupMessageHandling(input, messagesContainer) {
        this.messagesContainer = messagesContainer;
        
        // Setup intersection observer for message visibility
        if (this.system.observer) {
            this.system.observer.observe(messagesContainer);
        }
    }

    setupTypingAnimation() {
        // Create enhanced typing indicator
        this.typingIndicator = document.createElement('div');
        this.typingIndicator.className = 'typing-indicator';
        this.typingIndicator.innerHTML = `
            <div class="message typing">
                <div class="message-avatar ai">AI</div>
                <div class="message-content">
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        
        this.typingIndicator.style.cssText = `
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
    }

    setupMessageEffects() {
        // Setup particle effects for message sending
        this.setupParticleEffects();
        
        // Setup message sound effects (silent but visual feedback)
        this.setupMessageFeedback();
    }

    setupParticleEffects() {
        // Create subtle particle system for message interactions
        this.particleCanvas = document.createElement('canvas');
        this.particleCanvas.className = 'chat-particles';
        this.particleCanvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        if (this.messagesContainer) {
            this.messagesContainer.style.position = 'relative';
            this.messagesContainer.appendChild(this.particleCanvas);
        }
    }

    setupMessageFeedback() {
        // Visual feedback for successful message sending
        this.createMessageFeedback();
    }

    createMessageFeedback() {
        // Create success ripple effect
        this.rippleEffect = document.createElement('div');
        this.rippleEffect.className = 'message-ripple';
        this.rippleEffect.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.3);
            transform: scale(0);
            pointer-events: none;
            z-index: 2;
        `;
    }

    setupChatOptimizations() {
        // Virtual scrolling for performance with many messages
        this.setupVirtualScrolling();
        
        // Message batching for performance
        this.messageBatch = [];
        this.batchTimer = null;
    }

    setupVirtualScrolling() {
        // Implement virtual scrolling for large message lists
        if (this.messagesContainer) {
            let isScrolling = false;
            this.messagesContainer.addEventListener('scroll', () => {
                if (!isScrolling) {
                    requestAnimationFrame(() => {
                        this.handleMessageScroll();
                        isScrolling = false;
                    });
                    isScrolling = true;
                }
            }, { passive: true });
        }
    }

    handleMessageScroll() {
        // Optimize message rendering based on scroll position
        const messages = this.messagesContainer.querySelectorAll('.message');
        const containerRect = this.messagesContainer.getBoundingClientRect();
        
        messages.forEach((message, index) => {
            const messageRect = message.getBoundingClientRect();
            const isVisible = messageRect.top < containerRect.bottom && messageRect.bottom > containerRect.top;
            
            if (isVisible) {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }
        });
    }

    sendMessage(content) {
        if (this.isTyping || !content.trim()) return;

        const messageData = {
            id: Date.now(),
            content: content,
            timestamp: new Date(),
            type: 'user'
        };

        this.addMessage(messageData);
        this.simulateAIResponse(content);
        this.updateMessageCount();
    }

    addMessage(messageData) {
        this.messages.push(messageData);
        
        const messageElement = this.createMessageElement(messageData);
        this.messagesContainer.appendChild(messageElement);
        
        // Animate message entrance
        this.animateMessageEntrance(messageElement);
        
        // Smooth scroll to bottom
        this.smoothScrollToBottom();
    }

    createMessageElement(messageData) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${messageData.type}`;
        messageEl.setAttribute('data-message-id', messageData.id);
        
        const isUser = messageData.type === 'user';
        const avatarText = isUser ? 'You' : 'AI';
        const avatarClass = isUser ? 'user' : 'ai';
        
        messageEl.innerHTML = `
            <div class="message-avatar ${avatarClass}">${avatarText}</div>
            <div class="message-content">
                <div class="message-text">${this.formatMessageContent(messageData.content)}</div>
                <div class="message-time">${this.formatTime(messageData.timestamp)}</div>
            </div>
        `;
        
        return messageEl;
    }

    formatMessageContent(content) {
        // Enhanced message formatting with markdown-like support
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    formatTime(timestamp) {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    animateMessageEntrance(messageEl) {
        // Initial state
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(20px) scale(0.95)';
        
        // Animate entrance
        requestAnimationFrame(() => {
            this.system.registerAnimation('message-entrance',
                messageEl.animate([
                    { opacity: 0, transform: 'translateY(20px) scale(0.95)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)' }
                ], { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
            );
        });
    }

    smoothScrollToBottom() {
        const scrollAnimation = this.system.registerAnimation('smooth-scroll-bottom',
            this.messagesContainer.animate([
                { scrollTop: this.messagesContainer.scrollTop },
                { scrollTop: this.messagesContainer.scrollHeight }
            ], { duration: 300, easing: 'ease-out', fill: 'forwards' })
        );
    }

    simulateAIResponse(userMessage) {
        this.isTyping = true;
        this.showTypingIndicator();
        
        // Simulate realistic response time
        const responseTime = Math.random() * 1000 + 1500;
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const aiResponse = this.generateAIResponse(userMessage);
            
            const messageData = {
                id: Date.now(),
                content: aiResponse,
                timestamp: new Date(),
                type: 'ai'
            };
            
            this.addMessage(messageData);
            this.isTyping = false;
            
            // Trigger response effect
            this.triggerResponseEffect();
        }, responseTime);
    }

    showTypingIndicator() {
        this.messagesContainer.appendChild(this.typingIndicator);
        
        // Animate typing indicator
        requestAnimationFrame(() => {
            this.typingIndicator.style.opacity = '1';
            this.typingIndicator.style.transform = 'translateY(0)';
        });
        
        this.smoothScrollToBottom();
    }

    hideTypingIndicator() {
        this.system.registerAnimation('typing-indicator-exit',
            this.typingIndicator.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-10px)' }
            ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
        ).addEventListener('finish', () => {
            if (this.typingIndicator.parentNode) {
                this.typingIndicator.parentNode.removeChild(this.typingIndicator);
            }
        });
    }

    generateAIResponse(message) {
        // Enhanced AI response generation with context awareness
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('plc') && lowerMessage.includes('hmi')) {
            return `**PLC-HMI Communication Diagnostics**

🔍 **Systematic Diagnosis Steps:**

1. **Physical Layer Check**
   - Verify all cable connections are secure
   - Check cable integrity and shielding

2. **Network Configuration**
   - Confirm IP addresses are in same subnet
   - Verify subnet masks match
   - Check for IP conflicts

3. **Connectivity Test**
   - Ping test from HMI to PLC
   - Check network switch/router status

4. **Driver Verification**
   - Ensure correct communication driver
   - Verify driver version compatibility

**Common Issues:**
- IP address conflicts (most common)
- Faulty Ethernet cables
- Incorrect driver configuration
- Network switch problems

What specific error messages are you seeing on the HMI interface?`;
        } else if (lowerMessage.includes('motor') && lowerMessage.includes('overheat')) {
            return `**Motor Overheating Analysis**

🚨 **Immediate Safety**: Ensure proper lockout/tagout procedures

**Diagnostic Sequence:**
1. **Environmental Factors**
   - Ambient temperature measurement
   - Ventilation adequacy check
   - Cooling system functionality

2. **Load Analysis**
   - Compare actual vs rated load
   - Check for mechanical binding
   - Verify proper coupling alignment

3. **Electrical Checks**
   - Voltage balance across phases
   - Current measurement under load
   - Insulation resistance testing

4. **VFD Parameters** (if applicable)
   - Acceleration/deceleration ramp times
   - Carrier frequency settings
   - Thermal protection settings

**Next Steps:**
What's the motor's nameplate rating versus current load conditions?`;
        } else if (lowerMessage.includes('safety') || lowerMessage.includes('e-stop')) {
            return `**Safety System Reset Protocol**

⚠️ **Critical Safety Notice**: All safety conditions must be verified before reset

**Reset Sequence:**
1. **E-Stop Verification**
   - Check all E-stop buttons are pulled out
   - Verify no E-stops are activated
   - Test E-stop functionality

2. **Safety Relay Status**
   - Check status LEDs on safety relay
   - Verify input/output states
   - Review safety circuit continuity

3. **Protective Devices**
   - Door switches properly engaged
   - Light curtains unobstructed
   - Pressure mats cleared

4. **System Reset**
   - Follow manufacturer's reset procedure
   - Verify all safety interlocks cleared
   - Test safety system functionality

Are you seeing any specific fault codes on the safety relay display?`;
        } else if (lowerMessage.includes('sensor')) {
            return `**Sensor Diagnostic Protocol**

🔧 **Systematic Sensor Testing:**

1. **Power Supply Verification**
   - Check supply voltage (DC sensors: typically 12-24V)
   - Verify current capacity
   - Test supply stability under load

2. **Wiring Inspection**
   - Visual inspection for damage
   - Continuity testing
   - Check for electromagnetic interference

3. **Signal Analysis**
   - Measure output signal with multimeter
   - Check signal-to-noise ratio
   - Verify signal within specification range

4. **Environmental Factors**
   - Temperature effects on accuracy
   - Mechanical vibration impact
   - Contamination or debris interference

**Troubleshooting Matrix:**
- **No Output**: Power supply or wiring issue
- **Erratic Output**: EMI, loose connections, or sensor failure
- **Fixed Output**: Sensor saturation or internal failure

What type of sensor are you working with, and what symptoms are you observing?`;
        } else {
            return `**Industrial Troubleshooting Assistant**

I understand you're experiencing: *"${message}"*

To provide targeted diagnostic guidance, I need additional context:

**System Information:**
- Equipment manufacturer and model
- Error codes or alarm messages
- When the issue first occurred
- Recent system changes or modifications

**Operational Context:**
- Current operational state
- Environmental conditions
- Recent maintenance activities

**Diagnostic Priority:**
1. **Safety First** - Ensure all safety systems are functional
2. **Systematic Analysis** - Follow logical troubleshooting sequence
3. **Root Cause** - Identify underlying issue, not just symptoms

What specific equipment details and error conditions can you provide?`;
        }
    }

    triggerResponseEffect() {
        // Create subtle success effect
        const lastMessage = this.messagesContainer.querySelector('.message:last-child');
        if (lastMessage) {
            this.system.registerAnimation('response-effect',
                lastMessage.animate([
                    { boxShadow: '0 0 0 rgba(16, 185, 129, 0.3)' },
                    { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },
                    { boxShadow: '0 0 0 rgba(16, 185, 129, 0.3)' }
                ], { duration: 1000, easing: 'ease-out' })
            );
        }
    }

    updateMessageCount() {
        this.messageCount = this.messages.length;
        const messageCountEl = document.getElementById('messageCount');
        if (messageCountEl) {
            messageCountEl.textContent = this.messageCount;
        }
    }

    insertPrompt(prompt) {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.value = prompt;
            chatInput.focus();
            
            // Trigger auto-resize
            const event = new Event('input', { bubbles: true });
            chatInput.dispatchEvent(event);
            
            // Smooth focus animation
            this.system.registerAnimation('prompt-insert',
                chatInput.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.02)' },
                    { transform: 'scale(1)' }
                ], { duration: 200, easing: 'ease-out' })
            );
        }
    }
}

// =============================================================================
// ENHANCED DOCUMENT SYSTEM
// =============================================================================

class DocumentSystem {
    constructor(system) {
        this.system = system;
        this.documents = [];
        this.categories = ['Technical Manuals', 'Safety Procedures', 'Training Materials', 'Maintenance Logs'];
        this.selectedFiles = [];
        this.currentView = 'grid';
        this.currentSort = 'date';
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupDocumentInterface();
        this.setupFileUpload();
        this.setupDocumentInteractions();
        this.setupDocumentAnimations();
        this.loadMockDocuments();
    }

    setupDocumentInterface() {
        // Enhanced document grid interactions
        this.setupDocumentGrid();
        
        // Enhanced search functionality
        this.setupDocumentSearch();
        
        // Enhanced filtering system
        this.setupDocumentFiltering();
    }

    setupDocumentGrid() {
        const documentGrid = document.querySelector('.document-grid');
        if (!documentGrid) return;

        // Add smooth grid transitions
        documentGrid.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Setup intersection observer for document cards
        const documentCards = documentGrid.querySelectorAll('.document-card');
        documentCards.forEach(card => {
            if (this.system.observer) {
                this.system.observer.observe(card);
            }
            
            // Enhanced hover effects
            this.enhanceDocumentCard(card);
        });
    }

    enhanceDocumentCard(card) {
        // Add smooth hover transformations
        card.addEventListener('mouseenter', () => {
            this.system.registerAnimation('doc-card-hover',
                card.animate([
                    { transform: 'translateY(0) scale(1)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)' },
                    { transform: 'translateY(-4px) scale(1.02)', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)' }
                ], { duration: 200, easing: 'ease-out', fill: 'forwards' })
            );
        });

        card.addEventListener('mouseleave', () => {
            this.system.registerAnimation('doc-card-leave',
                card.animate([
                    { transform: 'translateY(-4px) scale(1.02)', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)' },
                    { transform: 'translateY(0) scale(1)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)' }
                ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
            );
        });

        // Enhanced click feedback
        card.addEventListener('mousedown', () => {
            this.system.registerAnimation('doc-card-click',
                card.animate([
                    { transform: 'translateY(-4px) scale(1.02)' },
                    { transform: 'translateY(-2px) scale(1.01)' }
                ], { duration: 100, easing: 'ease-out', fill: 'forwards' })
            );
        });

        card.addEventListener('mouseup', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });
    }

    setupDocumentSearch() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;

        // Enhanced search with debouncing and smooth results
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        // Search focus effects
        searchInput.addEventListener('focus', () => {
            this.system.registerAnimation('search-focus',
                searchInput.animate([
                    { borderColor: 'var(--border-primary)', boxShadow: '0 0 0 transparent' },
                    { borderColor: 'var(--accent-green)', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' }
                ], { duration: 200, easing: 'ease-out', fill: 'forwards' })
            );
        });

        searchInput.addEventListener('blur', () => {
            this.system.registerAnimation('search-blur',
                searchInput.animate([
                    { borderColor: 'var(--accent-green)', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' },
                    { borderColor: 'var(--border-primary)', boxShadow: '0 0 0 transparent' }
                ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
            );
        });
    }

    setupDocumentFiltering() {
        // Enhanced category filtering with smooth transitions
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const category = e.target.closest('.category-item').textContent.trim();
                this.filterByCategory(category);
            });
        });
    }

    setupFileUpload() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const uploadModal = document.getElementById('uploadModal');
        
        if (!uploadArea || !fileInput) return;

        // Enhanced drag and drop with smooth animations
        this.setupDragAndDrop(uploadArea, fileInput);
        
        // Enhanced file selection
        this.setupFileSelection(uploadArea, fileInput);
        
        // Enhanced upload process
        this.setupUploadProcess();
    }

    setupDragAndDrop(uploadArea, fileInput) {
        let dragCounter = 0;

        const handleDragEnter = (e) => {
            e.preventDefault();
            dragCounter++;
            
            if (dragCounter === 1) {
                uploadArea.classList.add('drag-over');
                this.system.registerAnimation('drag-enter',
                    uploadArea.animate([
                        { transform: 'scale(1)', backgroundColor: 'var(--bg-elevated)' },
                        { transform: 'scale(1.02)', backgroundColor: 'var(--bg-hover)' }
                    ], { duration: 200, easing: 'ease-out', fill: 'forwards' })
                );
            }
        };

        const handleDragLeave = (e) => {
            e.preventDefault();
            dragCounter--;
            
            if (dragCounter === 0) {
                uploadArea.classList.remove('drag-over');
                this.system.registerAnimation('drag-leave',
                    uploadArea.animate([
                        { transform: 'scale(1.02)', backgroundColor: 'var(--bg-hover)' },
                        { transform: 'scale(1)', backgroundColor: 'var(--bg-elevated)' }
                    ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
                );
            }
        };

        const handleDrop = (e) => {
            e.preventDefault();
            dragCounter = 0;
            uploadArea.classList.remove('drag-over');
            
            // Drop animation
            this.system.registerAnimation('drop-effect',
                uploadArea.animate([
                    { transform: 'scale(1.02)' },
                    { transform: 'scale(0.98)' },
                    { transform: 'scale(1)' }
                ], { duration: 300, easing: 'ease-out', fill: 'forwards' })
            );
            
            this.handleFiles(e.dataTransfer.files);
        };

        uploadArea.addEventListener('dragenter', handleDragEnter);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('dragover', (e) => e.preventDefault());
        uploadArea.addEventListener('drop', handleDrop);
    }

    setupFileSelection(uploadArea, fileInput) {
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
    }

    setupUploadProcess() {
        // Enhanced upload progress visualization
        this.setupUploadProgress();
        
        // Enhanced upload feedback
        this.setupUploadFeedback();
    }

    setupUploadProgress() {
        // Create enhanced progress visualization
        this.progressSystem = {
            active: false,
            files: [],
            totalProgress: 0
        };
    }

    setupUploadFeedback() {
        // Setup success/error feedback system
        this.feedbackSystem = {
            show: (type, message) => {
                this.showFeedback(type, message);
            }
        };
    }

    setupDocumentInteractions() {
        // Enhanced document actions
        this.setupDocumentActions();
        
        // Enhanced modal interactions
        this.setupModalInteractions();
    }

    setupDocumentActions() {
        // Document action buttons with smooth feedback
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('doc-action')) {
                const action = e.target.dataset.action;
                const docId = e.target.closest('.document-card').dataset.docId;
                
                // Button press feedback
                this.system.registerAnimation('doc-action-click',
                    e.target.animate([
                        { transform: 'scale(1)' },
                        { transform: 'scale(0.9)' },
                        { transform: 'scale(1)' }
                    ], { duration: 150, easing: 'ease-out' })
                );
                
                this.performDocumentAction(action, docId);
            }
        });
    }

    setupModalInteractions() {
        const modal = document.getElementById('uploadModal');
        if (!modal) return;

        // Enhanced modal open/close animations
        this.enhanceModalAnimations(modal);
        
        // Enhanced modal backdrop
        this.enhanceModalBackdrop(modal);
    }

    enhanceModalAnimations(modal) {
        const originalShow = this.openUploadModal;
        const originalHide = this.closeUploadModal;
        
        // Override with enhanced animations
        window.openUploadModal = () => {
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
            
            const content = modal.querySelector('.modal-content');
            this.system.registerAnimation('modal-open',
                content.animate([
                    { transform: 'scale(0.9) translateY(-20px)', opacity: 0 },
                    { transform: 'scale(1) translateY(0)', opacity: 1 }
                ], { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
            );
            
            this.system.registerAnimation('modal-backdrop',
                modal.animate([
                    { backgroundColor: 'rgba(0, 0, 0, 0)' },
                    { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
                ], { duration: 300, easing: 'ease-out', fill: 'forwards' })
            );
        };
        
        window.closeUploadModal = () => {
            const content = modal.querySelector('.modal-content');
            this.system.registerAnimation('modal-close',
                content.animate([
                    { transform: 'scale(1) translateY(0)', opacity: 1 },
                    { transform: 'scale(0.9) translateY(-20px)', opacity: 0 }
                ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
            );
            
            this.system.registerAnimation('modal-backdrop-close',
                modal.animate([
                    { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                    { backgroundColor: 'rgba(0, 0, 0, 0)' }
                ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
            ).addEventListener('finish', () => {
                modal.style.display = 'none';
                modal.style.visibility = 'hidden';
            });
        };
    }

    enhanceModalBackdrop(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.closeUploadModal();
            }
        });
    }

    setupDocumentAnimations() {
        // Stagger animations for document grid
        this.setupStaggeredAnimations();
        
        // Smooth view transitions
        this.setupViewTransitions();
    }

    setupStaggeredAnimations() {
        const animateDocumentCards = () => {
            const cards = document.querySelectorAll('.document-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    if (card.classList.contains('in-view')) {
                        this.system.registerAnimation(`doc-card-${index}`,
                            card.animate([
                                { transform: 'translateY(30px)', opacity: 0 },
                                { transform: 'translateY(0)', opacity: 1 }
                            ], { duration: 400, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
                        );
                    }
                }, index * 100);
            });
        };

        // Trigger on page load and filter changes
        this.system.on('navigation:change', (e) => {
            if (e.detail.page === 'knowledge-base') {
                setTimeout(animateDocumentCards, 100);
            }
        });
    }

    setupViewTransitions() {
        // Smooth transitions between grid/list views
        this.viewTransitions = {
            toGrid: () => this.animateToGrid(),
            toList: () => this.animateToList()
        };
    }

    animateToGrid() {
        const documentGrid = document.querySelector('.document-grid');
        if (!documentGrid) return;

        this.system.registerAnimation('view-to-grid',
            documentGrid.animate([
                { transform: 'scale(0.95)', opacity: 0.8 },
                { transform: 'scale(1)', opacity: 1 }
            ], { duration: 300, easing: 'ease-out', fill: 'forwards' })
        );
    }

    animateToList() {
        const documentGrid = document.querySelector('.document-grid');
        if (!documentGrid) return;

        this.system.registerAnimation('view-to-list',
            documentGrid.animate([
                { transform: 'scale(0.95)', opacity: 0.8 },
                { transform: 'scale(1)', opacity: 1 }
            ], { duration: 300, easing: 'ease-out', fill: 'forwards' })
        );
    }

    // Enhanced methods
    handleFiles(files) {
        const fileList = Array.from(files);
        this.selectedFiles = [...this.selectedFiles, ...fileList];
        
        // Animate file addition
        this.animateFileAddition(fileList);
        
        this.displayFileQueue();
        this.updateUploadButton();
    }

    animateFileAddition(files) {
        files.forEach((file, index) => {
            setTimeout(() => {
                this.showFileAddedFeedback(file);
            }, index * 100);
        });
    }

    showFileAddedFeedback(file) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.className = 'file-added-feedback';
        feedback.textContent = `${file.name} added`;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-green);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: var(--radius-md);
            z-index: 10001;
            transform: translateX(100%);
            transition: all 0.3s ease-out;
        `;
        
        document.body.appendChild(feedback);
        
        // Animate in
        requestAnimationFrame(() => {
            feedback.style.transform = 'translateX(0)';
        });
        
        setTimeout(() => {
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (feedback.parentNode) {
                    document.body.removeChild(feedback);
                }
            }, 300);
        }, 3000);
    }

    displayFileQueue() {
        const uploadQueue = document.getElementById('uploadQueue');
        const fileListContainer = document.getElementById('fileList');
        
        if (!uploadQueue || !fileListContainer) return;
        
        if (this.selectedFiles.length === 0) {
            uploadQueue.style.display = 'none';
            return;
        }
        
        uploadQueue.style.display = 'block';
        fileListContainer.innerHTML = '';
        
        this.selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-name">${file.name}</div>
                <div class="file-size">${this.formatFileSize(file.size)}</div>
                <button class="file-remove" onclick="documentSystem.removeFile(${index})">×</button>
                <div class="upload-progress" style="display: none;">
                    <div class="upload-progress-bar"></div>
                </div>
            `;
            
            // Animate file item entrance
            fileItem.style.opacity = '0';
            fileItem.style.transform = 'translateY(-10px)';
            fileListContainer.appendChild(fileItem);
            
            setTimeout(() => {
                this.system.registerAnimation(`file-item-${index}`,
                    fileItem.animate([
                        { opacity: 0, transform: 'translateY(-10px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], { duration: 200, easing: 'ease-out', fill: 'forwards' })
                );
            }, index * 50);
        });
    }

    removeFile(index) {
        const fileItem = document.querySelector(`.file-item:nth-child(${index + 1})`);
        if (fileItem) {
            this.system.registerAnimation('file-remove',
                fileItem.animate([
                    { opacity: 1, transform: 'translateX(0)' },
                    { opacity: 0, transform: 'translateX(-20px)' }
                ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
            ).addEventListener('finish', () => {
                this.selectedFiles.splice(index, 1);
                this.displayFileQueue();
                this.updateUploadButton();
            });
        }
    }

    updateUploadButton() {
        const uploadBtn = document.getElementById('uploadBtn');
        if (uploadBtn) {
            uploadBtn.disabled = this.selectedFiles.length === 0;
            uploadBtn.style.opacity = this.selectedFiles.length === 0 ? '0.5' : '1';
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    loadMockDocuments() {
        // Load mock documents for demonstration
        this.documents = [
            { id: 1, title: 'PLC Programming Guide', category: 'Technical Manuals', size: '2.3 MB', date: '2024-01-15' },
            { id: 2, title: 'Safety Procedures Manual', category: 'Safety Procedures', size: '1.8 MB', date: '2024-01-10' },
            { id: 3, title: 'Motor Control Training', category: 'Training Materials', size: '4.2 MB', date: '2024-01-08' },
            { id: 4, title: 'Maintenance Log Template', category: 'Maintenance Logs', size: '0.5 MB', date: '2024-01-05' }
        ];
    }
}

// =============================================================================
// ENHANCED FORM SYSTEM
// =============================================================================

class FormSystem {
    constructor(system) {
        this.system = system;
        this.forms = new Map();
        this.validators = new Map();
        this.init();
    }

    init() {
        this.setupFormEnhancements();
        this.setupValidation();
        this.setupFormAnimations();
    }

    setupFormEnhancements() {
        // Enhanced form inputs with smooth interactions
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            this.enhanceInput(input);
        });
    }

    enhanceInput(input) {
        // Add floating label effect
        this.addFloatingLabel(input);
        
        // Add smooth focus/blur effects
        this.addFocusEffects(input);
        
        // Add validation feedback
        this.addValidationFeedback(input);
    }

    addFloatingLabel(input) {
        const label = input.labels?.[0];
        if (!label) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        wrapper.style.cssText = `
            position: relative;
            display: flex;
            flex-direction: column;
        `;

        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(label);

        label.style.cssText = `
            position: absolute;
            top: 0.75rem;
            left: 1rem;
            pointer-events: none;
            transition: all 0.2s ease-out;
            color: var(--text-muted);
            font-size: 0.875rem;
        `;

        const updateLabelPosition = () => {
            const hasValue = input.value.trim() !== '';
            const isFocused = document.activeElement === input;
            
            if (hasValue || isFocused) {
                label.style.top = '-0.5rem';
                label.style.left = '0.75rem';
                label.style.fontSize = '0.75rem';
                label.style.color = 'var(--accent-green)';
                label.style.background = 'var(--bg-primary)';
                label.style.padding = '0 0.25rem';
            } else {
                label.style.top = '0.75rem';
                label.style.left = '1rem';
                label.style.fontSize = '0.875rem';
                label.style.color = 'var(--text-muted)';
                label.style.background = 'transparent';
                label.style.padding = '0';
            }
        };

        input.addEventListener('focus', updateLabelPosition);
        input.addEventListener('blur', updateLabelPosition);
        input.addEventListener('input', updateLabelPosition);
        
        // Initial state
        updateLabelPosition();
    }

    addFocusEffects(input) {
        input.addEventListener('focus', () => {
            this.system.registerAnimation('input-focus',
                input.animate([
                    { borderColor: 'var(--border-primary)', boxShadow: '0 0 0 transparent' },
                    { borderColor: 'var(--accent-green)', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' }
                ], { duration: 200, easing: 'ease-out', fill: 'forwards' })
            );
        });

        input.addEventListener('blur', () => {
            this.system.registerAnimation('input-blur',
                input.animate([
                    { borderColor: 'var(--accent-green)', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)' },
                    { borderColor: 'var(--border-primary)', boxShadow: '0 0 0 transparent' }
                ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
            );
        });
    }

    addValidationFeedback(input) {
        const feedback = document.createElement('div');
        feedback.className = 'validation-feedback';
        feedback.style.cssText = `
            font-size: 0.75rem;
            margin-top: 0.25rem;
            opacity: 0;
            transform: translateY(-5px);
            transition: all 0.2s ease-out;
        `;

        input.parentNode.appendChild(feedback);

        const showFeedback = (message, type) => {
            feedback.textContent = message;
            feedback.style.color = type === 'error' ? '#ef4444' : 'var(--accent-green)';
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        };

        const hideFeedback = () => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-5px)';
        };

        input.addEventListener('blur', () => {
            this.validateInput(input, showFeedback, hideFeedback);
        });
    }

    setupValidation() {
        // Setup form validation rules
        this.validators.set('email', (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? null : 'Please enter a valid email address';
        });

        this.validators.set('required', (value) => {
            return value.trim() !== '' ? null : 'This field is required';
        });

        this.validators.set('minLength', (value, min) => {
            return value.length >= min ? null : `Must be at least ${min} characters`;
        });
    }

    validateInput(input, showFeedback, hideFeedback) {
        const rules = input.dataset.validate?.split(',') || [];
        const value = input.value.trim();

        for (const rule of rules) {
            const [type, param] = rule.split(':');
            const validator = this.validators.get(type);
            
            if (validator) {
                const error = validator(value, param);
                if (error) {
                    showFeedback(error, 'error');
                    return false;
                }
            }
        }

        if (rules.length > 0) {
            showFeedback('Valid', 'success');
            setTimeout(hideFeedback, 2000);
        }
        return true;
    }

    setupFormAnimations() {
        // Enhanced form submission animations
        this.setupSubmissionFeedback();
    }

    setupSubmissionFeedback() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.tagName === 'FORM') {
                e.preventDefault();
                this.handleFormSubmission(form);
            }
        });
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) return;

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';

        // Add loading animation
        this.system.registerAnimation('submit-loading',
            submitBtn.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(0.98)' }
            ], { duration: 100, easing: 'ease-out', fill: 'forwards' })
        );

        // Simulate form submission
        setTimeout(() => {
            this.showSubmissionSuccess();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.transform = 'scale(1)';
            form.reset();
        }, 2000);
    }

    showSubmissionSuccess() {
        const success = document.createElement('div');
        success.className = 'submission-success';
        success.innerHTML = `
            <div class="success-icon">✓</div>
            <div class="success-message">Message sent successfully!</div>
        `;
        success.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: var(--bg-primary);
            border: 1px solid var(--accent-green);
            border-radius: var(--radius-lg);
            padding: 2rem;
            text-align: center;
            z-index: 10001;
            opacity: 0;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        `;

        document.body.appendChild(success);

        // Animate success message
        this.system.registerAnimation('submission-success',
            success.animate([
                { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
                { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
            ], { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
        );

        // Remove after delay
        setTimeout(() => {
            this.system.registerAnimation('submission-success-exit',
                success.animate([
                    { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
                    { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' }
                ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
            ).addEventListener('finish', () => {
                document.body.removeChild(success);
            });
        }, 3000);
    }
}

// =============================================================================
// ENHANCED FAQ SYSTEM
// =============================================================================

class FAQSystem {
    constructor(system) {
        this.system = system;
        this.activeItems = new Set();
        this.init();
    }

    init() {
        this.setupFAQInteractions();
        this.setupFAQAnimations();
    }

    setupFAQInteractions() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            this.enhanceFAQItem(item);
        });
    }

    enhanceFAQItem(item) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            this.toggleFAQItem(item, question, answer, icon);
        });

        // Enhanced hover effects
        question.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                this.system.registerAnimation('faq-hover',
                    question.animate([
                        { backgroundColor: 'var(--bg-elevated)' },
                        { backgroundColor: 'var(--bg-hover)' }
                    ], { duration: 200, easing: 'ease-out', fill: 'forwards' })
                );
            }
        });

        question.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                this.system.registerAnimation('faq-hover-out',
                    question.animate([
                        { backgroundColor: 'var(--bg-hover)' },
                        { backgroundColor: 'var(--bg-elevated)' }
                    ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
                );
            }
        });
    }

    toggleFAQItem(item, question, answer, icon) {
        const isActive = item.classList.contains('active');
        
        if (isActive) {
            this.closeFAQItem(item, question, answer, icon);
        } else {
            this.openFAQItem(item, question, answer, icon);
        }
    }

    openFAQItem(item, question, answer, icon) {
        item.classList.add('active');
        this.activeItems.add(item);

        // Animate question background
        this.system.registerAnimation('faq-question-active',
            question.animate([
                { backgroundColor: 'var(--bg-elevated)' },
                { backgroundColor: 'var(--bg-hover)' }
            ], { duration: 200, easing: 'ease-out', fill: 'forwards' })
        );

        // Animate icon rotation
        if (icon) {
            this.system.registerAnimation('faq-icon-rotate',
                icon.animate([
                    { transform: 'rotate(0deg)' },
                    { transform: 'rotate(180deg)' }
                ], { duration: 300, easing: 'ease-out', fill: 'forwards' })
            );
        }

        // Animate answer expansion
        const answerHeight = answer.scrollHeight;
        this.system.registerAnimation('faq-answer-expand',
            answer.animate([
                { maxHeight: '0px', opacity: 0, paddingTop: '0px', paddingBottom: '0px' },
                { maxHeight: `${answerHeight}px`, opacity: 1, paddingTop: '1.25rem', paddingBottom: '1.25rem' }
            ], { duration: 400, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
        );
    }

    closeFAQItem(item, question, answer, icon) {
        item.classList.remove('active');
        this.activeItems.delete(item);

        // Animate question background
        this.system.registerAnimation('faq-question-inactive',
            question.animate([
                { backgroundColor: 'var(--bg-hover)' },
                { backgroundColor: 'var(--bg-elevated)' }
            ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
        );

        // Animate icon rotation
        if (icon) {
            this.system.registerAnimation('faq-icon-rotate-back',
                icon.animate([
                    { transform: 'rotate(180deg)' },
                    { transform: 'rotate(0deg)' }
                ], { duration: 300, easing: 'ease-in', fill: 'forwards' })
            );
        }

        // Animate answer collapse
        this.system.registerAnimation('faq-answer-collapse',
            answer.animate([
                { maxHeight: `${answer.scrollHeight}px`, opacity: 1, paddingTop: '1.25rem', paddingBottom: '1.25rem' },
                { maxHeight: '0px', opacity: 0, paddingTop: '0px', paddingBottom: '0px' }
            ], { duration: 300, easing: 'ease-in', fill: 'forwards' })
        );
    }

    setupFAQAnimations() {
        // Staggered FAQ item animations on page load
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item, index) => {
            if (this.system.observer) {
                this.system.observer.observe(item);
            }
        });

        // Trigger animations when FAQ section comes into view
        this.system.on('navigation:change', (e) => {
            if (e.detail.page === 'support') {
                setTimeout(() => {
                    this.animateFAQItems();
                }, 300);
            }
        });
    }

    animateFAQItems() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item, index) => {
            if (item.classList.contains('in-view')) {
                setTimeout(() => {
                    this.system.registerAnimation(`faq-item-${index}`,
                        item.animate([
                            { transform: 'translateY(20px)', opacity: 0 },
                            { transform: 'translateY(0)', opacity: 1 }
                        ], { duration: 400, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
                    );
                }, index * 100);
            }
        });
    }
}

// =============================================================================
// SYSTEM INITIALIZATION
// =============================================================================

// Initialize all systems
let systemManager, navigationSystem, chatSystem, documentSystem, formSystem, faqSystem;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize core system
    systemManager = new SystemManager();
    
    // Initialize subsystems
    navigationSystem = new NavigationSystem(systemManager);
    chatSystem = new ChatSystem(systemManager);
    documentSystem = new DocumentSystem(systemManager);
    formSystem = new FormSystem(systemManager);
    faqSystem = new FAQSystem(systemManager);
    
    // Global system events
    systemManager.on('system:search', () => {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    });
    
    systemManager.on('system:escape', () => {
        // Close any open modals
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            if (modal.id === 'uploadModal') {
                window.closeUploadModal();
            }
        });
        
        // Close mobile menu
        if (navigationSystem.mobileNavOverlay && 
            navigationSystem.mobileNavOverlay.style.visibility === 'visible') {
            navigationSystem.closeMobileMenu();
        }
    });
    
    // Performance monitoring
    systemManager.on('system:focus', () => {
        // Resume optimizations when window gains focus
        systemManager.resumeAnimations();
    });
    
    systemManager.on('system:blur', () => {
        // Pause non-essential animations when window loses focus
        systemManager.pauseAnimations();
    });
    
    // Initialize page-specific features
    initializePageSpecificFeatures();
    
    // Add smooth page entrance animation
    const currentPage = document.querySelector('.page.active');
    if (currentPage) {
        const elements = currentPage.querySelectorAll('[data-animate]');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                systemManager.registerAnimation(`initial-entrance-${index}`,
                    el.animate([
                        { opacity: 0, transform: 'translateY(20px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], { duration: 600, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
                );
            }, index * 100);
        });
    }
});

// Page-specific feature initialization
function initializePageSpecificFeatures() {
    // Add data-animate attributes to elements that should animate
    const animateElements = document.querySelectorAll(`
        .hero, .stats, .features, .section-header, .feature-card, 
        .stat-card, .team-member, .support-card, .faq-item, 
        .document-card, .about-content, .chat-container
    `);
    
    animateElements.forEach(el => {
        el.setAttribute('data-animate', 'true');
    });
}

// Legacy function compatibility
function showPage(pageId) {
    if (navigationSystem) {
        navigationSystem.showPage(pageId);
    }
}

function toggleFAQ(element) {
    if (faqSystem) {
        const faqItem = element.closest('.faq-item');
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        const icon = faqItem.querySelector('.faq-icon');
        faqSystem.toggleFAQItem(faqItem, question, answer, icon);
    }
}

function insertPrompt(prompt) {
    if (chatSystem) {
        chatSystem.insertPrompt(prompt);
    }
}

function sendMessage() {
    if (chatSystem) {
        const input = document.getElementById('chatInput');
        if (input && input.value.trim()) {
            chatSystem.sendMessage(input.value.trim());
            input.value = '';
        }
    }
}

// Document system legacy functions
function openUploadModal() {
    window.openUploadModal();
}

function closeUploadModal() {
    window.closeUploadModal();
}

function filterByCategory(category) {
    if (documentSystem) {
        documentSystem.filterByCategory(category);
    }
}

function searchDocuments(query) {
    if (documentSystem) {
        documentSystem.performSearch(query);
    }
}

function addCategory() {
    const categoryName = prompt('Enter new category name:');
    if (categoryName && documentSystem) {
        documentSystem.showFeedback('info', `Category "${categoryName}" would be added to the system.`);
    }
}

// Contact form handler
async function handleContactSubmit(event) {
    event.preventDefault();
    
    if (formSystem) {
        formSystem.handleFormSubmission(event.target);
    }
}

// Export for debugging
window.systemManager = systemManager;
window.navigationSystem = navigationSystem;
window.chatSystem = chatSystem;
window.documentSystem = documentSystem;
window.formSystem = formSystem;
window.faqSystem = faqSystem;
        });
        
        // Animate out and remove
        setTimeout(() => {
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 2000);
    }

    performSearch(query) {
        const documents = document.querySelectorAll('.document-card');
        const lowerQuery = query.toLowerCase();
        
        documents.forEach((doc, index) => {
            const title = doc.querySelector('.doc-title').textContent.toLowerCase();
            const shouldShow = title.includes(lowerQuery);
            
            if (shouldShow) {
                setTimeout(() => {
                    doc.style.display = 'flex';
                    this.system.registerAnimation(`search-show-${index}`,
                        doc.animate([
                            { transform: 'scale(0.8)', opacity: 0 },
                            { transform: 'scale(1)', opacity: 1 }
                        ], { duration: 200, easing: 'ease-out', fill: 'forwards' })
                    );
                }, index * 50);
            } else {
                this.system.registerAnimation(`search-hide-${index}`,
                    doc.animate([
                        { transform: 'scale(1)', opacity: 1 },
                        { transform: 'scale(0.8)', opacity: 0 }
                    ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
                ).addEventListener('finish', () => {
                    doc.style.display = 'none';
                });
            }
        });
    }

    filterByCategory(category) {
        // Enhanced category filtering with smooth animations
        const documents = document.querySelectorAll('.document-card');
        const categoryItems = document.querySelectorAll('.category-item');
        
        // Update active category
        categoryItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const activeCategory = Array.from(categoryItems).find(item => 
            item.textContent.trim() === category
        );
        if (activeCategory) {
            activeCategory.classList.add('active');
        }
        
        // Filter documents with staggered animation
        documents.forEach((doc, index) => {
            const docCategory = doc.dataset.category;
            const shouldShow = category === 'All Categories' || docCategory === category;
            
            if (shouldShow) {
                setTimeout(() => {
                    doc.style.display = 'flex';
                    this.system.registerAnimation(`filter-show-${index}`,
                        doc.animate([
                            { transform: 'translateY(20px)', opacity: 0 },
                            { transform: 'translateY(0)', opacity: 1 }
                        ], { duration: 300, easing: 'ease-out', fill: 'forwards' })
                    );
                }, index * 50);
            } else {
                this.system.registerAnimation(`filter-hide-${index}`,
                    doc.animate([
                        { transform: 'translateY(0)', opacity: 1 },
                        { transform: 'translateY(-20px)', opacity: 0 }
                    ], { duration: 200, easing: 'ease-in', fill: 'forwards' })
                ).addEventListener('finish', () => {
                    doc.style.display = 'none';
                });
            }
        });
    }

    performDocumentAction(action, docId) {
        switch(action) {
            case 'view':
                this.viewDocument(docId);
                break;
            case 'download':
                this.downloadDocument(docId);
                break;
            case 'delete':
                this.deleteDocument(docId);
                break;
        }
    }

    viewDocument(docId) {
        // Enhanced document viewing with smooth modal
        this.showDocumentModal(docId);
    }

    downloadDocument(docId) {
        // Enhanced download feedback
        this.showDownloadProgress(docId);
    }

    deleteDocument(docId) {
        // Enhanced delete confirmation
        this.showDeleteConfirmation(docId);
    }

    showFeedback(type, message) {
        const feedback = document.createElement('div');
        feedback.className = `system-feedback ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            z-index: 10001;
            transform: translateX(100%);
            transition: all 0.3s ease-out;
            ${type === 'success' ? 'background: var(--accent-green); color: white;' : ''}
            ${type === 'error' ? 'background: #ef4444; color: white;' : ''}
            ${type === 'info' ? 'background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border-primary);' : ''}
        `;
        
        document.body.appendChild(feedback);
        
        requestAnimationFrame(() => {
            feedback.style.transform = 'translateX(0)';

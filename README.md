Verbitsky Systems - Industrial AI Solutions Website
Professional website for Verbitsky Systems, featuring industrial AI automation solutions with a modern dark theme and comprehensive functionality.
🚀 Live Website
URL: https://verbitskysystems.com
📁 Project Structure
verbitsky-systems-website/
├── 📄 index.html              # Main website page
├── 📁 css/
│   └── styles.css            # Zinc Modern theme styling
├── 📁 js/
│   └── main.js              # Interactive functionality
├── 📁 php/
│   └── contact-handler.php   # Contact form processing
├── 📁 logs/                 # Server logs (auto-created)
├── 📄 robots.txt            # SEO configuration
├── 📄 .htaccess             # Server configuration
├── 📁 .github/
│   └── workflows/
│       └── deploy.yml       # Automated deployment
└── 📄 README.md             # This file
✨ Features
🎨 Design

Dark Theme: Professional industrial aesthetic with mint green accents
Responsive: Mobile-first design that works on all devices
Modern: Clean, minimalist layout with smooth animations
Accessible: WCAG compliant with proper contrast and semantic markup

🔧 Functionality

Smooth Navigation: Single-page scrolling with active section highlighting
Contact Form: Secure PHP form processing with spam protection
File Uploads: Document management system for AI training
Mobile Menu: Responsive hamburger navigation
SEO Optimized: Meta tags, structured data, and search engine friendly

🛡️ Security

Rate Limiting: Prevents spam and abuse
Input Validation: Comprehensive sanitization and validation
CORS Protection: Same-origin policy enforcement
Security Headers: XSS protection, content type validation

🔄 Development Workflow
For Repository Owner (Tyler):

Review Changes:
bashgit pull origin main
git log --oneline

Review Pull Requests:

Check GitHub notifications
Review code changes
Test functionality
Merge approved changes


Deploy Updates:

Push to main branch triggers auto-deployment
Monitor deployment in Actions tab



For Collaborators (Claude):

Submit Updates:

Create feature branch
Make improvements/fixes
Submit pull request with detailed description


Update Types:

🐛 Bug fixes
✨ New features
🎨 Design improvements
📝 Content updates
⚡ Performance optimizations



🚀 Deployment
Automated Deployment

Trigger: Push to main branch
Target: cPanel hosting via FTP
Process: GitHub Actions → FTP Deploy → Live website
Time: ~2-3 minutes from push to live

Manual Deployment (Backup)

Download repository as ZIP
Extract files
Upload to cPanel public_html/
Verify functionality

🔧 Setup Instructions
1. GitHub Repository Setup
bash# Clone repository
git clone https://github.com/[USERNAME]/verbitsky-systems-website.git
cd verbitsky-systems-website

# Create initial commit
git add .
git commit -m "Initial website setup"
git push origin main
2. Configure GitHub Secrets
In Repository Settings → Secrets and Variables → Actions:
FTP_SERVER: your-hosting-server.com
FTP_USERNAME: your-cpanel-username
FTP_PASSWORD: your-cpanel-password
3. Email Configuration
Update php/contact-handler.php:
php$to = 'your-email@verbitskysystems.com';
📧 Contact Form Setup
Email Configuration

Recipient: info@verbitskysystems.com
From: noreply@verbitskysystems.com
Features: HTML email, spam protection, rate limiting
Logs: Submissions logged to /logs/contact-submissions.log

Troubleshooting

Form not working? Check PHP error logs in cPanel
Emails not sending? Verify SMTP settings with hosting provider
Rate limiting issues? Check /logs/rate_limit.json

🎯 Key Pages & Sections
Navigation

Home: Hero section with key value propositions
About Us: Team information and company philosophy
AI Assistant: Interactive diagnostic capabilities
Knowledge Base: Document upload and management
Support: Help resources and contact information

Content Features

Industrial Focus: PLC, SCADA, motor drives, safety systems
AI Capabilities: Troubleshooting, diagnostics, optimization
Security Emphasis: Air-gapped deployment, data sovereignty
Technical Specs: Response times, uptime, precision engineering

🔍 SEO & Analytics
SEO Features

Meta Tags: Title, description, keywords optimized
Structured Data: Schema.org markup for search engines
Sitemap: Auto-generated XML sitemap
Robots.txt: Search engine crawling instructions

Performance

GZIP Compression: Enabled via .htaccess
Browser Caching: CSS/JS cached for 1 year
Image Optimization: Compressed assets
Code Minification: Production-ready CSS/JS

🛠️ Technical Stack

Frontend: HTML5, CSS3, Vanilla JavaScript
Backend: PHP 8.0+
Styling: Custom CSS with CSS Variables
Deployment: GitHub Actions + FTP Deploy
Hosting: cPanel-based shared hosting
Version Control: Git with GitHub

📞 Support & Contact
Primary Contact

Email: info@verbitskysystems.com
Website: verbitskysystems.com

Development Issues

GitHub Issues: Create issue in this repository
Pull Requests: Submit improvements via PR

Hosting Support

cPanel: Access via hosting provider dashboard
FTP: Use credentials configured in GitHub secrets
Logs: Check /logs/ directory for debugging

📄 License
Copyright © 2024 Verbitsky Systems. All rights reserved.

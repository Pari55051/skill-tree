// Skill Tree Application - Minimal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeSkillTree();
    initializeForm();
    addScrollEffects();
});

function initializeSkillTree() {
    // Add interactive hover effects to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        // Click interaction for skill details
        card.addEventListener('click', function() {
            const skillName = this.querySelector('h3').textContent;
            const progressText = this.querySelector('.progress-text').textContent;
            showSkillDetails(skillName, progressText);
        });
    });
    
    // Add hover effects to branches
    const branches = document.querySelectorAll('.branch');
    branches.forEach(branch => {
        branch.addEventListener('mouseenter', function() {
            if (!this.classList.contains('dead-end')) {
                this.style.backgroundColor = '#b8a082';
                this.style.transform = 'scale(1.1)';
            }
        });
        
        branch.addEventListener('mouseleave', function() {
            if (!this.classList.contains('dead-end')) {
                this.style.backgroundColor = '#d4b896';
                this.style.transform = 'scale(1)';
            }
        });
    });
}

function initializeForm() {
    const form = document.getElementById('suggestionForm');
    const formMessage = document.getElementById('formMessage');
    
    if (form && formMessage) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const skillName = formData.get('skillName').trim();
            const skillCategory = formData.get('skillCategory');
            const skillDescription = formData.get('skillDescription').trim();
            
            // Validation
            if (!skillName) {
                showFormMessage('Please enter a skill name.', 'error');
                document.getElementById('skillName').focus();
                return;
            }
            
            if (!skillCategory) {
                showFormMessage('Please select a category.', 'error');
                document.getElementById('skillCategory').focus();
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Planting...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                showFormMessage(
                    `🌱 Thank you! "${skillName}" has been suggested for the ${skillCategory} category. It will be reviewed for addition to our skill tree!`, 
                    'success'
                );
                
                // Reset form
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Auto-hide message after 5 seconds
                setTimeout(() => {
                    hideFormMessage();
                }, 5000);
                
            }, 1500);
        });
    }
}

function addScrollEffects() {
    // Smooth scrolling for navbar link
    const navbarLink = document.querySelector('.navbar-link');
    if (navbarLink) {
        navbarLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#suggest');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Parallax effect for tree trunk
    const treeTrunk = document.querySelector('.tree-trunk');
    if (treeTrunk) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.02;
            treeTrunk.style.transform = `translateX(-50%) translateY(${parallax}px)`;
        });
    }
}

function showSkillDetails(skillName, progress) {
    // Skill descriptions
    const skillInfo = {
        'HTML': 'The foundation of web development. HTML provides structure and semantic meaning to web content.',
        'CSS': 'Styles and layouts for beautiful, responsive web pages that work across all devices.',
        'JavaScript': 'Brings interactivity and dynamic behavior to web applications. Essential for modern development.',
        'Tailwind CSS': 'Utility-first CSS framework for rapidly building custom user interfaces.',
        'Git': 'Version control system for tracking changes and collaborating with development teams.',
        'Debugging': 'Essential skill for identifying and fixing issues in code efficiently.',
        'Accessibility': 'Making web applications usable by everyone, including people with disabilities.',
        'Problem Solving': 'Critical thinking and analytical skills for breaking down complex challenges.'
    };
    
    const description = skillInfo[skillName] || 'An important skill in the web development journey.';
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'skill-modal';
    modal.innerHTML = `
        <div class="skill-modal-content">
            <div class="skill-modal-header">
                <h3>🌟 ${skillName}</h3>
                <button class="skill-modal-close">&times;</button>
            </div>
            <div class="skill-modal-body">
                <div class="skill-progress-info">
                    <span>Current Progress: <strong>${progress}</strong></span>
                </div>
                <p>${description}</p>
                <p><em>Keep growing your skills! 🌱</em></p>
            </div>
        </div>
    `;
    
    // Modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.skill-modal-content');
    modalContent.style.cssText = `
        background: #ffffff;
        padding: 24px;
        border-radius: 12px;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: scale(0.9);
        transition: transform 0.3s ease;
        border: 2px solid #d4e4d4;
    `;
    
    const modalHeader = modal.querySelector('.skill-modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #d4e4d4;
    `;
    
    const modalHeaderTitle = modal.querySelector('.skill-modal-header h3');
    modalHeaderTitle.style.cssText = `
        color: #2d5016;
        margin: 0;
        font-size: 20px;
    `;
    
    const closeButton = modal.querySelector('.skill-modal-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #4a7c59;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    `;
    
    const skillProgressInfo = modal.querySelector('.skill-progress-info');
    skillProgressInfo.style.cssText = `
        background: #e8f5e8;
        padding: 8px 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        color: #2d5016;
        font-size: 14px;
    `;
    
    const modalBody = modal.querySelector('.skill-modal-body');
    modalBody.style.cssText = `
        color: #2d5016;
        line-height: 1.6;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close handlers
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeButton.addEventListener('click', closeModal);
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = '#d4e4d4';
    });
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'transparent';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.classList.remove('hidden');
        
        // Scroll into view
        formMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
}

function hideFormMessage() {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.classList.add('hidden');
    }
}
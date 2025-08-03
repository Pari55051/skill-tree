document.addEventListener('DOMContentLoaded', function () {
    initializeSkillTree();
    initializeForm();
    addScrollEffects();
});

function initializeSkillTree() {
    // hover effects
    const skillCards = document.querySelectorAll('[class*="col-start-"][class*="row-start-"]');

    skillCards.forEach(card => {
        if (card.querySelector('h3')) {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(-4px)';
                this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            });

            // skill details on click
            card.addEventListener('click', function () {
                const skillName = this.querySelector('h3').textContent;
                const progressText = this.querySelector('span').textContent;
                showSkillDetails(skillName, progressText);
            });
        }
    });
}

function initializeForm() {
    const form = document.getElementById('suggestionForm');
    const formMessage = document.getElementById('formMessage');

    if (form && formMessage) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const skillName = formData.get('skillName').trim();
            const skillCategory = formData.get('skillCategory');
            const skillDescription = formData.get('skillDescription').trim();

            // --- form validation ---
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

            // --- fake form submission animation ---
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            // loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Planting...';
            submitButton.disabled = true;

            // submitted message
            setTimeout(() => {
                showFormMessage(
                    `Thank you! "${skillName}" has been suggested for the ${skillCategory} category. It will be reviewed for addition to our skill tree!`,
                    'success'
                );

                // reset form
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;

                setTimeout(() => {
                    hideFormMessage();
                }, 5000);

            }, 1500);
        });
    }
}

function addScrollEffects() {
    const navbarLink = document.querySelector('nav a[href="#suggest"]');
    if (navbarLink) {
        navbarLink.addEventListener('click', function (e) {
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
}

function showSkillDetails(skillName, progress) {
    // skill descriptions
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

    
    const modal = document.createElement('div');
    modal.className = 'fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
    modal.innerHTML = `
                <div class="bg-white p-6 rounded-xl max-w-lg mx-5 transform scale-90 transition-transform duration-300 border-2 border-mint-200">
                    <div class="flex justify-between items-center mb-4 pb-3 border-b border-mint-200">
                        <h3 class="text-xl text-sage-600 m-0">${skillName}</h3>
                        <button class="bg-transparent border-none text-2xl cursor-pointer text-sage-500 p-1 rounded hover:bg-mint-200 transition-colors duration-200">×</button>
                    </div>
                    <div class="bg-mint-100 p-2 rounded mb-4 text-sage-600 text-sm">
                        Progress: ${progress}
                    </div>
                    <div class="text-sage-600 leading-relaxed">
                        ${description}
                    </div>
                </div>
            `;

    document.body.appendChild(modal);

    // In - animatation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('div').style.transform = 'scale(1)';
    }, 10);

    // close details
    const closeModal = () => {
        modal.style.opacity = '0';
        modal.querySelector('div').style.transform = 'scale(0.9)';
        setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('button').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

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

        if (type === 'success') {
            formMessage.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-mint-600 bg-opacity-10 text-green-800 border border-mint-600 border-opacity-30';
        } else if (type === 'error') {
            formMessage.className = 'mt-4 p-3 rounded-lg text-center font-medium bg-red-500 bg-opacity-10 text-red-800 border border-red-500 border-opacity-30';
        }

        formMessage.classList.remove('hidden');

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

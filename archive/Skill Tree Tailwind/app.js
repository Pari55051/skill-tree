// Minimal JavaScript for The Skill Tree (under 15% of total code)

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navbarToggle = document.getElementById('navbarToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (navbarToggle && mobileMenu) {
        navbarToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between bars and times
            const icon = navbarToggle.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                navbarToggle.querySelector('i').className = 'fas fa-bars text-xl';
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = 80;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Handling
    const suggestionForm = document.getElementById('suggestionForm');
    const formMessage = document.getElementById('formMessage');
    
    if (suggestionForm && formMessage) {
        suggestionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const skillName = formData.get('skillName');
            const skillCategory = formData.get('skillCategory');
            
            // Simple validation
            if (!skillName || !skillCategory) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Planting...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showMessage(`🌱 Thank you! "${skillName}" has been suggested for the ${skillCategory} category!`, 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 4000);
            }, 1000);
        });
    }
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `mt-4 p-4 text-center font-medium ${
            type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
        }`;
        formMessage.classList.remove('hidden');
    }
});
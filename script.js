// ===== Email Signup Form Handler =====
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const emailInput = document.getElementById('email-input');
    const successMessage = document.getElementById('success-message');
    const signupSection = document.querySelector('.signup-section');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                shakeElement(emailInput);
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('.btn-primary');
            const originalContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = `
                <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-linecap="round"/>
                </svg>
                <span>Subscribing...</span>
            `;
            submitBtn.disabled = true;
            
            // Add spinner animation
            const spinner = submitBtn.querySelector('.spinner');
            spinner.style.animation = 'spin 1s linear infinite';
            
            // Simulate API call
            await delay(1500);
            
            // Show success
            signupSection.style.display = 'none';
            successMessage.classList.add('show');
            
            // Store email in localStorage (for demo purposes)
            saveEmail(email);
            
            // Log for debugging
            console.log('Email subscribed:', email);
        });
    }

    // ===== Helper Functions =====
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function shakeElement(element) {
        element.classList.add('shake');
        element.style.borderColor = '#ef4444';
        
        setTimeout(() => {
            element.classList.remove('shake');
            element.style.borderColor = '';
        }, 500);
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function saveEmail(email) {
        const emails = JSON.parse(localStorage.getItem('templateory_subscribers') || '[]');
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('templateory_subscribers', JSON.stringify(emails));
        }
    }

    // ===== Add Shake Animation Styles =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-8px); }
            40%, 80% { transform: translateX(8px); }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .shake {
            animation: shake 0.4s ease;
        }
        
        .spinner {
            width: 20px;
            height: 20px;
        }
    `;
    document.head.appendChild(style);

    // ===== Parallax Effect for Background Shapes =====
    let ticking = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax(e);
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateParallax(e) {
        const shapes = document.querySelectorAll('.floating-shape');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const x = mouseX * speed;
            const y = mouseY * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // ===== Smooth Scroll for Any Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Console Easter Egg =====
    console.log('%c✨ Templateory', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cWe\'re building something amazing. Stay tuned!', 'font-size: 14px; color: #888;');
    console.log('%cInterested in joining our team? Reach out!', 'font-size: 12px; color: #667eea;');
});

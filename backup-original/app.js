// Global variables
let currentSection = 'hero';
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenWords = 2000;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initTypingAnimation();
    initSmoothScrolling();
    initMobileMenu();
    initScrollAnimations();
    initContactForm();
    initMouseEffects();
    initNavigationHighlight();
    initFloatingShapes();
}

// Typing Animation - Fixed to show ARUNPANDIAN C first
function initTypingAnimation() {
    const textElement = document.getElementById('typing-text');
    const cursor = document.getElementById('cursor');
    const texts = ['ARUNPANDIAN C', 'Full Stack Developer', 'Python Developer', 'Frontend Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(typeText, typeSpeed);
    }

    // Start typing immediately
    typeText();
}

// Smooth Scrolling Navigation - Fixed navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Fix hero buttons navigation
    const viewWorkBtn = document.querySelector('a[href="#projects"]');
    const contactBtn = document.querySelector('a[href="#contact"]');
    
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Scroll Animations (Custom AOS implementation)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Also observe timeline items, project cards, and experience cards
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const experienceCards = document.querySelectorAll('.experience-card');
    const contactItems = document.querySelectorAll('.contact-item');

    [...timelineItems, ...projectCards, ...experienceCards, ...contactItems].forEach(element => {
        observer.observe(element);
    });
}

// Navigation Highlight
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        currentSection = current;
    }

    window.addEventListener('scroll', throttle(updateActiveNav, 100));
    updateActiveNav(); // Initial call
}

// Contact Form - Enhanced with proper validation messages
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('.form-control');
    
    // Add focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Form submission with proper validation messages
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation with visible messages
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Remove focused class from form groups
            inputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
        }, 2000);
    });
}

// Enhanced Mouse Effects for 3D elements
function initMouseEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    // Enhanced project card 3D effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
            this.style.zIndex = '10';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            const cardInner = card.querySelector('.project-card-inner');
            cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) scale(1.02)`;
            
            // Add glow effect
            card.style.boxShadow = `0 20px 50px rgba(var(--color-primary-rgb, 33, 128, 141), 0.3)`;
        });
        
        card.addEventListener('mouseleave', function() {
            const cardInner = card.querySelector('.project-card-inner');
            cardInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.zIndex = '1';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Floating shapes mouse interaction
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.8;
            const x = (mouseX - 0.5) * speed * 80;
            const y = (mouseY - 0.5) * speed * 80;
            
            shape.style.transform = `translate(${x}px, ${y}px) rotate(${(x + y) * 0.5}deg)`;
        });
    });
}

// Floating shapes animation
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Random animation duration and delay
        const duration = 4 + Math.random() * 4; // 4-8 seconds
        const delay = Math.random() * 2; // 0-2 seconds delay
        
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;
        
        // Add random rotation
        const randomRotation = Math.random() * 360;
        shape.style.transform += ` rotate(${randomRotation}deg)`;
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Create icon based on type
    const icon = type === 'error' ? '❌' : '✅';
    notification.innerHTML = `<span class="notification-icon">${icon}</span><span class="notification-text">${message}</span>`;
    
    // Enhanced styles
    const bgColor = type === 'error' ? 'var(--color-error)' : 'var(--color-success)';
    const borderColor = type === 'error' ? 'rgba(var(--color-error-rgb), 0.3)' : 'rgba(var(--color-success-rgb), 0.3)';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--radius-lg);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        border: 2px solid ${borderColor};
        z-index: 10000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s var(--ease-standard);
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        backdrop-filter: blur(10px);
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 5000);
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Parallax effect on scroll
function initParallaxEffect() {
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    }, 16));
}

// Initialize parallax effect
initParallaxEffect();

// Enhanced navbar background on scroll
window.addEventListener('scroll', throttle(() => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(31, 33, 33, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(31, 33, 33, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}, 16));

// Enhanced skill cards hover effect
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-category');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(var(--color-primary-rgb, 33, 128, 141), 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--color-charcoal-700) 0%, var(--color-slate-900) 100%);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transition: opacity 0.5s ease-out;
        }
        
        body.loaded::before {
            opacity: 0;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});

// Enhanced intersection observer for better performance
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for timeline items
            if (entry.target.classList.contains('timeline-item')) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.opacity = '1';
                }, Math.random() * 300);
            }
            
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
};

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
};

const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .experience-card, .contact-item');
    
    elementsToObserve.forEach(element => {
        intersectionObserver.observe(element);
    });
});

// Add smooth reveal animation for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Add CSS for section animations
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s var(--ease-standard);
    }
    
    section.section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    #hero {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(sectionStyle);
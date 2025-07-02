// Smooth scrolling for anchor links
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

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
const downloadForm = document.getElementById('downloadForm');

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#dc2626';
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    return isValid;
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm(this)) {
        // Show success message
        alert('お問い合わせありがとうございます。担当者より3営業日以内にご連絡いたします。');
        this.reset();
    } else {
        alert('必須項目をご入力ください。');
    }
});

downloadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm(this)) {
        // Show success message
        alert('資料のダウンロードリンクをメールでお送りしました。ご確認ください。');
        this.reset();
    } else {
        alert('必須項目をご入力ください。');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to elements
const animatedElements = document.querySelectorAll('.problem-card, .solution-point, .case-card, .process-step');
animatedElements.forEach(el => {
    observer.observe(el);
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
    
    lastScroll = currentScroll;
});

// Number counter animation
function animateNumber(element, target, suffix = '') {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Animate achievement numbers when in view
const achievementObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            if (target) {
                const suffix = entry.target.nextElementSibling && 
                              entry.target.nextElementSibling.classList.contains('achievement-suffix') 
                              ? entry.target.nextElementSibling.textContent : '';
                animateNumber(entry.target, target);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.achievement-number[data-target]').forEach(el => {
    achievementObserver.observe(el);
});

// Logo slider enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Clone logos for seamless loop (if needed for dynamic content)
    const logoTracks = document.querySelectorAll('.trust-logos-track, .client-logos-track');
    
    logoTracks.forEach(track => {
        // Ensure smooth infinite scroll
        const logos = track.querySelectorAll('img');
        const trackWidth = track.scrollWidth;
        
        // Adjust animation duration based on content width
        const duration = trackWidth / 50; // Adjust speed as needed
        track.style.animationDuration = `${duration}s`;
    });
    
    // Optional: Add intersection observer for performance
    const logoSections = document.querySelectorAll('.trust-logos-wrapper, .client-logos-wrapper');
    
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const track = entry.target.querySelector('.trust-logos-track, .client-logos-track');
            if (entry.isIntersecting) {
                track.style.animationPlayState = 'running';
            } else {
                track.style.animationPlayState = 'paused';
            }
        });
    });
    
    logoSections.forEach(section => {
        logoObserver.observe(section);
    });
});

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('.header-nav');
    
    // Create mobile menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none';
    
    // Insert menu button
    header.querySelector('.header-content').insertBefore(menuButton, nav);
    
    // Toggle menu
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
    });
    
    // Show/hide menu button based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        } else {
            menuButton.style.display = 'none';
            nav.classList.remove('mobile-active');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile menu
createMobileMenu();

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

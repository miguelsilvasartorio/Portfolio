// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    
    // Initialize Scroll Animations
    initScrollReveal();
    
    // Initialize Smooth Scroll for Anchor Links
    initSmoothScroll();
    
    // Initialize Navbar Behavior
    initNavbar();
});

// Scroll Reveal Animation using Intersection Observer
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el, index) => {
        // Add staggered delay based on index if not already set
        if (!el.classList.contains('delay-100') && 
            !el.classList.contains('delay-150') && 
            !el.classList.contains('delay-200') && 
            !el.classList.contains('delay-300')) {
            // Only add delay if it's not the first element
            if (index > 0) {
                const delayClass = `delay-${Math.min(index * 50, 300)}`;
                el.classList.add(delayClass);
            }
        }
        observer.observe(el);
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('apple-nav')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Show/Hide on Scroll
function initNavbar() {
    let lastScroll = 0;
    const nav = document.querySelector('apple-nav');
    
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Show nav after scrolling past hero section (approx 100vh)
        if (currentScroll > window.innerHeight * 0.8) {
            nav.classList.add('nav-visible');
        } else {
            nav.classList.remove('nav-visible');
        }
        
        lastScroll = currentScroll;
    });
}

// Parallax Effect for Hero Section (Subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('section:first-of-type');
    
    if (hero && scrolled < window.innerHeight) {
        const rate = scrolled * 0.3;
        const content = hero.querySelector('div > div');
        if (content) {
            content.style.transform = `translateY(${rate}px)`;
            content.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    }
});

// Form Handling (if contact form is added later)
document.addEventListener('submit', (e) => {
    if (e.target.matches('form')) {
        e.preventDefault();
        // Add form handling logic here
        console.log('Form submitted');
    }
});

// Lazy Loading Images (if any are added dynamically)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add active state to navigation links
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Highlight active section in navigation
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all book cards and blog posts
    document.querySelectorAll('.book-card, .blog-post').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .book-card, .blog-post {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .book-card.fade-in, .blog-post.fade-in {
            opacity: 1;
            transform: translateY(0);
        }

        .nav-links a.active {
            color: var(--secondary-color);
            position: relative;
        }

        .nav-links a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--secondary-color);
        }
    `;
    document.head.appendChild(style);
});

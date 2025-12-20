document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling is handled by 'scroll-smooth' class on html, 
    // but we still want to intercept for potential analytics or custom offsets if needed.
    // However, for active state highlighting, we need JS.

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Function to set active state
    const setActiveLink = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjustment for header height
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            // Reset classes
            a.className = 'hover:text-brand-600 transition-colors duration-300';

            if (a.getAttribute('href').includes(current)) {
                // Active state classes (Brand Color + Bold)
                a.className = 'text-brand-600 font-bold transition-colors duration-300';
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);
    // Call once on load
    setActiveLink();
});

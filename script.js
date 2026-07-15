document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Menu Toggle (All Pages) ---
    const menu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menu && navLinks) {
        menu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Navbar Scroll Effect (for pages with transparent-on-top nav) ---
    const navbar = document.querySelector('.navbar');
    // Run this only on pages that DON'T start with the 'scrolled' class (i.e., the homepage)
    if (navbar && !navbar.classList.contains('scrolled')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Statistics Counter Animation (Homepage) ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const speed = 200; // Slower animation

        const animateCounter = (counter) => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, ''); // Remove commas if any
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString();
                    setTimeout(updateCount, 15); // Smoother interval
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% is visible

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // --- Lightbox Functionality (Gallery Page) ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const galleryItems = document.querySelectorAll('.gallery-item img');

        galleryItems.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                lightboxCaption.innerHTML = img.alt; // Use alt text for caption
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
        };

        const lightboxCloseButton = document.querySelector('.lightbox-close');
        if (lightboxCloseButton) {
            lightboxCloseButton.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
    }
});
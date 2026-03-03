document.addEventListener('DOMContentLoaded', () => {

    // 1. UPDATE FOOTER YEAR
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. MOBILE MENU TOGGLE
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Cambiare icona da hamburger a X
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Chiudi il menu mobile quando si clicca un link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // 3. NAVBAR SCROLL EFFECT (Sfondo blur al scroll)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 22, 32, 0.9)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
            navbar.style.padding = '0.8rem 0';
        } else {
            navbar.style.background = 'rgba(18, 22, 32, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 0';
        }
    });

    // 4. SCROLL ANIMATIONS (Intersection Observer)
    // Scegliamo tutti gli elementi con la classe .fade-in
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15% dell'elemento deve essere visibile
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Smettiamo di osservare l'elemento una volta che è apparso (animazione singola)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 5. THEME TOGGLE (Light/Dark Mode)
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;

    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeBtn) themeBtn.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const icon = themeBtn.querySelector('i');

            if (body.classList.contains('light-mode')) {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

});

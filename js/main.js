// ===== SLIDER =====
document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            });
        });
    }

    // Hero Slider
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.arrow.prev');
    const nextBtn = document.querySelector('.arrow.next');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.slide').length;

    function goToSlide(index) {
        if (!slides) return;
        currentSlide = (index + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
            if (i === currentSlide) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });
    }

    if (dots.length) {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goToSlide(i));
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Auto slide
    if (slides && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    // Product Carousel
    const track = document.querySelector('.carousel-track');
    const prevCarousel = document.querySelector('.carousel-btn.prev');
    const nextCarousel = document.querySelector('.carousel-btn.next');
    let carouselIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = 305; // 280 + gap

    function updateCarousel() {
        if (!track) return;
        const maxIndex = Math.max(0, items.length - Math.floor(track.parentElement.offsetWidth / itemWidth));
        carouselIndex = Math.max(0, Math.min(carouselIndex, maxIndex));
        track.style.transform = `translateX(-${carouselIndex * itemWidth}px)`;
    }

    if (prevCarousel) {
        prevCarousel.addEventListener('click', () => {
            carouselIndex--;
            updateCarousel();
        });
    }
    if (nextCarousel) {
        nextCarousel.addEventListener('click', () => {
            carouselIndex++;
            updateCarousel();
        });
    }

    window.addEventListener('resize', updateCarousel);

    // Scroll animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const delay = entry.target.dataset.delay || 0;
                    entry.target.style.transitionDelay = `${delay}ms`;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .product-card, .vm-card').forEach((el, i) => {
            el.dataset.delay = i * 100;
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('.feature-card, .product-card, .vm-card').forEach(el => {
            el.classList.add('visible');
        });
    }

    // Contact form simple validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#nombre').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const mensaje = contactForm.querySelector('#mensaje').value.trim();

            if (!name || !email || !mensaje) {
                alert('Por favor completa todos los campos.');
                return;
            }
            if (!email.includes('@')) {
                alert('Por favor ingresa un correo válido.');
                return;
            }
            alert('¡Mensaje enviado con éxito! Gracias por contactarnos.');
            contactForm.reset();
        });
    }
});


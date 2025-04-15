// Dave Shah Solutions Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
    
    // Animate stats counter
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        const animateStats = function() {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const count = parseInt(stat.innerText);
                const increment = target / 30; // Divide by number of frames
                
                if (count < target) {
                    stat.innerText = Math.ceil(count + increment);
                    setTimeout(animateStats, 50);
                } else {
                    stat.innerText = target;
                }
            });
        };
        
        // Initialize GSAP ScrollTrigger for stats animation
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.create({
                trigger: '.about-stats',
                start: 'top 80%',
                onEnter: animateStats
            });
        }
    }
    
    // Simple testimonial slider
    const testimonials = [
        {
            text: "Dave Shah Solutions transformed our business operations with Business Central. Their expertise and support throughout the implementation process was exceptional.",
            author: "John Smith",
            position: "CFO, Manufacturing Company"
        },
        {
            text: "The team at Dave Shah Solutions provided excellent support during our NAV to Business Central migration. The process was smooth and their ongoing support has been invaluable.",
            author: "Sarah Johnson",
            position: "IT Director, Retail Chain"
        },
        {
            text: "We've been working with Dave Shah Solutions for over 5 years. Their knowledge of Business Central and commitment to our success has made them an invaluable partner.",
            author: "Michael Brown",
            position: "Operations Manager, Distribution Company"
        }
    ];
    
    const testimonialContainer = document.querySelector('.testimonials-slider');
    let currentTestimonial = 0;
    
    if (testimonialContainer) {
        // Function to show testimonial
        const showTestimonial = (index) => {
            const testimonial = testimonials[index];
            testimonialContainer.innerHTML = `
                <div class="testimonial-item">
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="testimonial-author">${testimonial.author}</div>
                    <div class="testimonial-position">${testimonial.position}</div>
                </div>
            `;
        };
        
        // Initialize with first testimonial
        showTestimonial(0);
        
        // Auto rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 8000);
    }
    
    // GSAP animations for scroll effects
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Animate service cards on scroll
        gsap.utils.toArray('.service-card').forEach(card => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Animate case study cards on scroll
        gsap.utils.toArray('.case-study-card').forEach(card => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Animate about section
        gsap.from('.about-content', {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        gsap.from('.about-image', {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate partner logos
        gsap.from('.partner-logo', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.partners-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Dropdown menu touch support for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (dropdowns.length > 0 && 'ontouchstart' in window) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            
            link.addEventListener('click', function(e) {
                // Check if we're on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const menu = this.nextElementSibling;
                    
                    // Toggle the current dropdown
                    if (menu.style.display === 'block') {
                        menu.style.display = 'none';
                    } else {
                        menu.style.display = 'block';
                    }
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            if (otherMenu) {
                                otherMenu.style.display = 'none';
                            }
                        }
                    });
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Menu Toggle ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // ========== Header Scroll Effect ==========
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Enquiry Form Submission ==========
    const enquiryForm = document.getElementById('enquiryForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            
            if (!name || !phone || service === "") {
                alert('Please fill in all required fields');
                return;
            }

            // Create form data object
            const formData = {
                name: name,
                phone: phone,
                email: document.getElementById('email').value.trim(),
                service: service,
                message: document.getElementById('message').value.trim(),
                timestamp: new Date().toISOString()
            };

            // In a real implementation, you would send this to your backend
            // For now, we'll store in localStorage and log to console
            try {
                // Get existing enquiries or initialize array
                const existingEnquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
                
                // Add new enquiry
                existingEnquiries.push(formData);
                
                // Save back to localStorage
                localStorage.setItem('enquiries', JSON.stringify(existingEnquiries));
                
                // Show success message
                enquiryForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // You could also send this data to your email using a service like Formspree
                // Example fetch request (would need backend):
                /*
                fetch('https://your-backend-endpoint.com/enquiries', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    enquiryForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('There was an error submitting your enquiry. Please try again.');
                });
                */
                
                console.log('Form submitted:', formData);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    enquiryForm.reset();
                    enquiryForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                console.error('Error saving enquiry:', error);
                alert('There was an error submitting your enquiry. Please try again.');
            }
        });
    }

    // ========== Gallery Lightbox ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.getAttribute('src');
            const imgAlt = img.getAttribute('alt');
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <span class="close-btn">&times;</span>
                    <span class="caption">${imgAlt}</span>
                </div>
            `;
            
            lightbox.classList.add('active');
            
            // Close lightbox when clicking outside image
            lightbox.addEventListener('click', (e) => {
                if (e.target !== e.currentTarget) return;
                lightbox.classList.remove('active');
            });
            
            // Close button
            const closeBtn = lightbox.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    lightbox.classList.remove('active');
                });
            }
            
            // Close with ESC key
            document.addEventListener('keydown', function closeOnEsc(e) {
                if (e.key === 'Escape') {
                    lightbox.classList.remove('active');
                    document.removeEventListener('keydown', closeOnEsc);
                }
            });
        });
    });

    // ========== Current Year for Copyright ==========
    const yearSpan = document.querySelector('.copyright p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2023', currentYear);
    }

    // ========== WhatsApp Button Animation ==========
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    }

    // ========== Service Cards Animation ==========
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // ========== Video Lazy Loading ==========
    const videoItems = document.querySelectorAll('.video-item');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && !iframe.src) {
                    iframe.src = iframe.getAttribute('data-src');
                    videoObserver.unobserve(entry.target);
                }
            }
        });
    }, { rootMargin: '200px' });

    videoItems.forEach(video => {
        const iframe = video.querySelector('iframe');
        if (iframe) {
            iframe.setAttribute('data-src', iframe.src);
            iframe.removeAttribute('src');
            videoObserver.observe(video);
        }
    });
});

// ========== Add Lightbox CSS ==========
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    #lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    
    #lightbox.active {
        opacity: 1;
        pointer-events: all;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-height: 80vh;
        max-width: 90vw;
        border-radius: 5px;
    }
    
    .close-btn {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    
    .caption {
        position: absolute;
        bottom: -30px;
        left: 0;
        color: white;
        width: 100%;
        text-align: center;
    }
    
    .whatsapp-float.pulse {
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .service-card.animate {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(lightboxStyles);
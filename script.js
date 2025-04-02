document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Menu Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuGrid = document.getElementById('menuGrid');
    
    // Sample menu data
    const menuItems = [
        {
            id: 1,
            title: "Tropical Sunrise",
            category: "fruit",
            description: "A refreshing blend of pineapple, mango, and orange",
            price: "$5.99",
            image: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
        },
        {
            id: 2,
            title: "Green Detox",
            category: "detox",
            description: "Kale, spinach, cucumber, green apple, and lemon",
            price: "$6.49",
            image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
        },
        {
            id: 3,
            title: "Berry Blast",
            category: "fruit",
            description: "Strawberry, blueberry, raspberry, and banana",
            price: "$5.99",
            image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        {
            id: 4,
            title: "Carrot Kick",
            category: "vegetable",
            description: "Carrot, orange, ginger, and turmeric",
            price: "$5.49",
            image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
        },
        {
            id: 5,
            title: "Tropical Smoothie",
            category: "smoothie",
            description: "Pineapple, coconut milk, banana, and chia seeds",
            price: "$6.99",
            image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        {
            id: 6,
            title: "Liver Cleanse",
            category: "detox",
            description: "Beetroot, apple, lemon, and ginger",
            price: "$6.49",
            image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
        }
    ];
    
    // Load all menu items initially
    displayMenuItems(menuItems);
    
    // Tab click event
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            let filteredItems;
            
            if (category === 'all') {
                filteredItems = menuItems;
            } else {
                filteredItems = menuItems.filter(item => item.category === category);
            }
            
            displayMenuItems(filteredItems);
        });
    });
    
    // Function to display menu items
    function displayMenuItems(items) {
        menuGrid.innerHTML = '';
        
        if (items.length === 0) {
            menuGrid.innerHTML = '<p class="no-items">No items found in this category</p>';
            return;
        }
        
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
                <div class="menu-item-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="menu-item-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="price">${item.price}</div>
                </div>
            `;
            menuGrid.appendChild(menuItem);
        });
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialSlides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        console.log({ name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});







// Login/Signup Toggle (if needed)
document.getElementById('toggleSignup').addEventListener('click', function(e) {
    e.preventDefault();
    const form = document.getElementById('loginForm');
    const submitBtn = form.querySelector('button');
    
    if (submitBtn.textContent.includes('Login')) {
        submitBtn.textContent = 'Sign Up';
        document.querySelector('.login-footer p:first-child').innerHTML = 'Already have an account? <a href="#" id="toggleSignup">Login</a>';
    } else {
        submitBtn.textContent = 'Login / Sign Up';
        document.querySelector('.login-footer p:first-child').innerHTML = 'Don\'t have an account? <a href="#" id="toggleSignup">Sign Up</a>';
    }
});

// Form Submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!name || !phone || !username || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    // In a real app, you would send this to a server
    console.log('Submitted:', { name, phone, username, password });
    
    // Show success message
    alert(`Welcome, ${name}! You are now logged in.`);
    
    // Redirect to home page (optional)
    // window.location.href = 'index.html';
});








// Cart Page Functionality (cart.html)
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotalElement.textContent = '₹0';
            checkoutBtn.disabled = true;
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <div class="price">₹${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="remove-btn">Remove</button>
                </div>
                <div class="item-total">₹${item.price * item.quantity}</div>
            </div>
        `).join('');
        
        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = `₹${total}`;
        
        // Add event listeners
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }
    
    function decreaseQuantity(e) {
        const itemId = e.target.closest('.cart-item').dataset.id;
        const item = cart.find(item => item.id === itemId);
        
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(item => item.id !== itemId);
        }
        
        saveCart();
    }
    
    function increaseQuantity(e) {
        const itemId = e.target.closest('.cart-item').dataset.id;
        const item = cart.find(item => item.id === itemId);
        item.quantity++;
        saveCart();
    }
    
    function removeItem(e) {
        const itemId = e.target.closest('.cart-item').dataset.id;
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
    }
    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateHeaderCartCount();
    }
    
    function updateHeaderCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => el.textContent = totalItems);
    }
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        alert('Order placed successfully! Total: ' + cartTotalElement.textContent);
        cart = [];
        saveCart();
    });
    
    // Initialize
    renderCart();
});
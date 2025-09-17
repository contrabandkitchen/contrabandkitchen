// Menu data
const menuItems = [
    // Maggi Items
    { name: 'Plain Maggi', price: 35, isVeg: true, description: 'Simple and classic Maggi noodles' },
    { name: 'Veg Maggi', price: 49, isVeg: true, description: 'Loaded with fresh vegetables', popular: true },
    { name: 'Egg Maggi', price: 65, isVeg: false, description: 'Maggi with perfectly cooked eggs' },
    
    // Bhurji Items
    { name: 'Paneer Bhurji', price: 119, isVeg: true, description: 'Scrambled cottage cheese with spices', popular: true },
    { name: 'Egg Bhurji', price: 159, isVeg: false, description: 'Spiced scrambled eggs with onions' },
    
    // Chicken Items
    { name: 'Chicken Lollipop', price: { half: 199, full: 349 }, isVeg: false, description: '4 pieces (Half) / 8 pieces (Full)', popular: true },
    { name: 'Chicken Curry', price: { half: 219, full: 379 }, isVeg: false, description: 'Rich and flavorful chicken curry' },
    
    // Curry Items
    { name: 'Egg Curry', price: 189, isVeg: false, description: 'Boiled eggs in spicy gravy' },
    { name: 'Aloo Jeera', price: 79, isVeg: true, description: 'Cumin flavored potatoes' },
    
    // Rice & Sabji
    { name: 'Fried Rice', price: 79, isVeg: true, description: 'Aromatic fried rice with vegetables' },
    { name: 'Bhindi Sabji', price: 119, isVeg: true, description: 'Traditional okra curry' },
    { name: 'Kurkuri Bhindi', price: 169, isVeg: true, description: 'Crispy fried okra', popular: true },
    
    // Bread Rolls
    { name: 'Bread Rolls', price: { small: 129, large: 199 }, isVeg: true, description: '4 pieces / 6 pieces' },
    { name: 'Cheese Bread Rolls', price: { small: 159, large: 249 }, isVeg: true, description: '4 pieces / 6 pieces' },
    
    // Snacks
    { name: 'Aloo Pakode', price: 59, isVeg: true, description: '8 pieces of crispy potato fritters' },
    { name: 'Cheese Aloo Sandwich', price: 89, isVeg: true, description: 'Grilled sandwich with cheese and potatoes' },
    { name: 'Pav Bhaji', price: 99, isVeg: true, description: 'Mumbai street food special', popular: true },
    
    // Momos
    { name: 'Veg Momos', price: { small: 79, large: 139 }, isVeg: true, description: '4 pieces / 8 pieces' },
    { name: 'Non Veg Momos', price: { small: 119, large: 189 }, isVeg: false, description: '4 pieces / 8 pieces', popular: true },
];

// Global variables
let currentTheme = 'light';
let currentFilter = 'all';
let currentRating = 0;

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const menuGrid = document.getElementById('menuGrid');
const starRating = document.getElementById('starRating');
const feedbackForm = document.getElementById('feedbackForm');
const orderTextarea = document.getElementById('orderText');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupEventListeners();
    renderMenuItems();
    setupStarRating();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const hour = new Date().getHours();
    const isNightTime = hour >= 18 || hour < 6;
    
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        currentTheme = isNightTime ? 'dark' : 'light';
    }
    
    applyTheme();
    updateThemeIcon();
    
    // Auto-update theme every minute if no manual preference
    if (!savedTheme) {
        setInterval(() => {
            const hour = new Date().getHours();
            const isNightTime = hour >= 18 || hour < 6;
            const newTheme = isNightTime ? 'dark' : 'light';
            
            if (newTheme !== currentTheme) {
                currentTheme = newTheme;
                applyTheme();
                updateThemeIcon();
            }
        }, 60000);
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
    updateThemeIcon();
}

function applyTheme() {
    document.body.setAttribute('data-theme', currentTheme);
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    document.getElementById(sectionName.toLowerCase()).classList.add('active');
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn, .nav-btn-mobile').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionName.toLowerCase()) {
            btn.classList.add('active');
        }
    });
}

// Menu Functions
function renderMenuItems() {
    menuGrid.innerHTML = '';
    
    const filteredItems = menuItems.filter(item => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'veg') return item.isVeg;
        if (currentFilter === 'nonveg') return !item.isVeg;
        return true;
    });
    
    filteredItems.forEach(item => {
        const menuItemElement = createMenuItemElement(item);
        menuGrid.appendChild(menuItemElement);
    });
}

function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    
    const popularBadge = item.popular ? '<div class="popular-badge">Popular</div>' : '';
    const vegClass = item.isVeg ? 'veg' : 'nonveg';
    const vegLabel = item.isVeg ? 'Vegetarian' : 'Non-Vegetarian';
    const price = formatPrice(item.price);
    
    div.innerHTML = `
        ${popularBadge}
        <div class="veg-indicator">
            <div class="veg-icon ${vegClass}">
                <div class="veg-dot ${vegClass}"></div>
            </div>
            <span class="veg-label ${vegClass}">${vegLabel}</span>
        </div>
        <h3>${item.name}</h3>
        <p class="description">${item.description}</p>
        <div class="price">₹${price}</div>
    `;
    
    return div;
}

function formatPrice(price) {
    if (typeof price === 'number') {
        return price;
    }
    
    if (price.half && price.full) {
        return `${price.half} (Half) / ₹${price.full} (Full)`;
    }
    
    if (price.small && price.large) {
        return `${price.small} (4pcs) / ₹${price.large} (6pcs)`;
    }
    
    return '--';
}

function filterMenu(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    renderMenuItems();
}

// WhatsApp Integration
function sendToWhatsApp(phoneNumber) {
    const orderText = orderTextarea.value.trim();
    
    if (!orderText) {
        alert('Please enter your order details');
        return;
    }
    
    const message = encodeURIComponent(`Hi! I would like to place an order:\n\n${orderText}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Star Rating
function setupStarRating() {
    const stars = starRating.querySelectorAll('i');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentRating = index + 1;
            updateStarDisplay();
        });
        
        star.addEventListener('mouseenter', () => {
            highlightStars(index + 1);
        });
    });
    
    starRating.addEventListener('mouseleave', () => {
        updateStarDisplay();
    });
}

function highlightStars(rating) {
    const stars = starRating.querySelectorAll('i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateStarDisplay() {
    highlightStars(currentRating);
}

// Feedback Form
async function submitFeedback(e) {
    e.preventDefault();
    
    const feedbackText = document.getElementById('feedbackText').value.trim();
    const submitBtn = document.getElementById('feedbackBtn');
    
    if (!feedbackText) {
        alert('Please enter your feedback');
        return;
    }
    
    if (currentRating === 0) {
        alert('Please rate your experience');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
}

// Event Listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Navigation buttons
    document.querySelectorAll('.nav-btn, .nav-btn-mobile').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            showSection(section);
        });
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterMenu(filter);
        });
    });
    
    // Feedback form
    feedbackForm.addEventListener('submit', submitFeedback);
    
    // Hero buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = e.target.textContent.trim();
            if (text === 'Order Now') {
                showSection('order');
            } else if (text === 'View Menu') {
                showSection('food');
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    console.log('The Contraband Kitchen website loaded successfully!');
}
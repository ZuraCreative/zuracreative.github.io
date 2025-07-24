// Function to load external HTML content
async function loadHTML(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading HTML:', error);
        return '';
    }
}

// Function to set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Check if this is the about page
        if (currentPage === 'about.html' && link.getAttribute('data-page') === 'about') {
            link.classList.add('active');
        }
        // Check if this is index page and link points to services or contact (for same-page navigation)
        else if (currentPage === 'index.html' || currentPage === '') {
            if (link.getAttribute('data-page') === 'services' || link.getAttribute('data-page') === 'contact') {
                // We don't set these as active since they're anchors on the same page
                // The active state will be handled by scroll position if needed
            }
        }
    });
}

// Function to initialize header and footer
async function initializeIncludes() {
    // Load header
    const headerContainer = document.getElementById('header-placeholder');
    if (headerContainer) {
        const headerHTML = await loadHTML('header.html');
        headerContainer.innerHTML = headerHTML;
    }
    
    // Load footer  
    const footerContainer = document.getElementById('footer-placeholder');
    if (footerContainer) {
        const footerHTML = await loadHTML('footer.html');
        footerContainer.innerHTML = footerHTML;
    }
    
    // Set active navigation link after header is loaded
    setTimeout(setActiveNavLink, 100);
}

// Theme management
function initializeTheme() {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle icon
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Add theme toggle event listener after header is loaded
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    initializeTheme();
    await initializeIncludes();
    setupThemeToggle();
}); 
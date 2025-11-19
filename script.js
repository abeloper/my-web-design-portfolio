// Background images array
const backgroundImages = [
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
];

// DOM elements
const backgroundContainer = document.getElementById('background-container');
const topnav = document.getElementById('topnav');
const navbar = document.getElementById('navbar');
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelectorAll('.navbar li a, .nav li a');
const sections = document.querySelectorAll('section');
const aboutImage = document.querySelector('.about-image');
const aboutText = document.querySelector('.about-text');
const projects = document.querySelectorAll('.project');
const certificates = document.querySelectorAll('.certificate');
const services = document.querySelectorAll('.service');

// Typing effect
var typed = new Typed(".input", {
    strings: ["Abeje Goshu", "Software Engineering Student", "Fullstack Developer (Entry Level)", "Problem Solver", "Frontend Developer"],
    typeSpeed: 65,
    backSpeed: 55,
    loop: true
});

// Change background image
let currentBgIndex = 0;
function changeBackground() {
    currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
    backgroundContainer.style.backgroundImage = `url(${backgroundImages[currentBgIndex]})`;
}

// Initialize background
backgroundContainer.style.backgroundImage = `url(${backgroundImages[0]})`;
backgroundContainer.style.backgroundSize = 'cover';
backgroundContainer.style.backgroundPosition = 'center';

// Set interval for changing background
setInterval(changeBackground, 5000);

// Sticky header on scroll
window.addEventListener('scroll', function() {
    topnav.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile menu toggle
menuIcon.addEventListener('click', function() {
    navbar.classList.toggle('open');
    if (menuIcon.classList.contains("fa-bars")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
    } else {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }
});

// Active navigation link on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('open');
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    });
});

// Scroll animation for sections
function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
            
            // Special animations for specific sections
            if (section.id === 'about') {
                if (aboutImage) aboutImage.classList.add('animate');
                if (aboutText) aboutText.classList.add('animate');
            }
            
            if (section.id === 'projects') {
                projects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('animate');
                    }, index * 200);
                });
            }
            
            if (section.id === 'resume') {
                certificates.forEach((certificate, index) => {
                    setTimeout(() => {
                        certificate.classList.add('animate');
                    }, index * 200);
                });
            }
            
            if (section.id === 'services') {
                services.forEach((service, index) => {
                    setTimeout(() => {
                        service.classList.add('animate');
                    }, index * 200);
                });
            }
        }
    });
}

// About section text color animation
function animateAboutText() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    const aboutRect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (aboutRect.top < windowHeight * 0.7 && aboutRect.bottom > 0) {
        const scrollPercent = 1 - (aboutRect.top / (windowHeight * 0.7));
        
        // Change text color based on scroll position
        const hue = Math.floor(scrollPercent * 60);
        document.documentElement.style.setProperty('--text-color', `hsl(${40 + hue}, 100%, 70%)`);
        
        // Scale profile image based on scroll
        const profileImage = document.querySelector('.profile-image-container');
        if (profileImage) {
            const scale = 1 + (scrollPercent * 0.1);
            profileImage.style.transform = `scale(${scale})`;
        }
    }
}

// Initialize scroll animations
window.addEventListener('scroll', () => {
    checkScroll();
    animateAboutText();
});

// Initial check on page load
window.addEventListener('load', () => {
    checkScroll();
    
    // Make home section visible immediately
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('visible');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS variable for dynamic text color
document.documentElement.style.setProperty('--text-color', '#ffffff');
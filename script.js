// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Modal Functions
function openModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'flex';
    
    // Small delay for animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

function closeModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.getElementById('bookingModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Form Submission - Send SMS with appointment details
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Format the service name nicely
    const serviceNames = {
        'haircut': 'Haircut ($10)',
        'haircut-beard': 'Haircut + Beard ($15)',
        'lineup': 'Lineup ($10)',
        'housecall': 'House Call ($25)'
    };
    
    // Format time for display
    const formatTime = (time) => {
        const hour = parseInt(time.split(':')[0]);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${time.split(':')[1] || '00'} ${suffix}`;
    };
    
    // Build the message
    const message = `New BR Fades Booking Request:
    
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Service: ${serviceNames[data.service] || data.service}
Date: ${data.date}
Time: ${formatTime(data.time)}
Notes: ${data.notes || 'None'}`;

    // Phone number to send to
    const phoneNumber = '7744413099';
    
    // Create SMS link (works on mobile devices)
    const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    
    // Open SMS app with pre-filled message
    window.location.href = smsLink;
    
    // Show confirmation
    alert('Opening your messaging app! Please send the pre-filled message to complete your booking request.');
    
    // Reset form and close modal
    e.target.reset();
    closeModal();
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Smooth reveal animations on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all service cards and gallery items
document.querySelectorAll('.service-card, .gallery-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add revealed class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Add stagger effect to cards
document.querySelectorAll('.services-grid .service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.gallery-grid .gallery-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.contact-info .info-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

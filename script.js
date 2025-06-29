// Reserved for future interactivity 

// Enhanced animations and interactivity

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
  }
});

// Section reveal on scroll with enhanced animations
function revealSections() {
  const sections = document.querySelectorAll('.animated-section');
  const triggerBottom = window.innerHeight * 0.8;
  
  sections.forEach((section, index) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
      // Add staggered animation delay
      section.style.animationDelay = `${index * 0.2}s`;
    }
  });
}

// Parallax effect for hero section
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
}

// Enhanced smooth scroll for nav links with animation
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // Add ripple effect
      createRippleEffect(this, e);
      
      // Smooth scroll with offset
      const targetSection = document.querySelector(href);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
    
    // Add scale animation for click feedback
    link.classList.remove('clicked');
    void link.offsetWidth; // trigger reflow
    link.classList.add('clicked');
  });
});

// Ripple effect function
function createRippleEffect(element, event) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Card hover animations
function initializeCardAnimations() {
  const cards = document.querySelectorAll('.section-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Floating animation for elements
function addFloatingAnimation() {
  const floatingElements = document.querySelectorAll('.hero-subtitle, .hero-animated-text');
  floatingElements.forEach((element, index) => {
    element.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
  });
}

// Progress bar animation for skills
function animateProgressBars() {
  const skillElements = document.querySelectorAll('.skills-section p span');
  skillElements.forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;
    skill.classList.add('skill-animate');
  });
}

// Counter animation for numbers
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
  revealSections();
  initializeCardAnimations();
  addFloatingAnimation();
  
  // Add scroll event listeners
  window.addEventListener('scroll', () => {
    revealSections();
    parallaxEffect();
  });
  
  // Add animation class removal after animation ends
  navLinks.forEach(link => {
    link.addEventListener('animationend', function() {
      link.classList.remove('clicked');
    });
  });
  
  // Animate skills when they come into view
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateProgressBars();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(skillsSection);
  }
});

// Add smooth reveal animation for page load
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
}); 
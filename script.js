// Admin Login System
const adminCredentials = {
  username: 'admin',
  password: 'pontozero2025'
};

let isAdminLoggedIn = false;

// Admin Modal Elements
const adminModal = document.getElementById('adminModal');
const adminPanel = document.getElementById('adminPanel');
const adminForm = document.getElementById('adminForm');
const adminClose = document.querySelector('.admin-close');
const logoutBtn = document.getElementById('logoutBtn');

// Intro Animation Control
let introComplete = false;

// Auto-hide intro after 5.5 seconds
setTimeout(() => {
  const introScreen = document.getElementById('introScreen');
  const mainContent = document.getElementById('mainContent');
  
  if (introScreen && mainContent) {
    introScreen.style.display = 'none';
    mainContent.style.display = 'block';
    introComplete = true;
    
    // Initialize main site functionality after intro
    initializeMainSite();
  }
}, 5500);

// Skip intro on click/touch (optional)
document.addEventListener('DOMContentLoaded', function() {
  const introScreen = document.getElementById('introScreen');
  
  if (introScreen) {
    introScreen.addEventListener('click', function() {
      if (!introComplete) {
        const mainContent = document.getElementById('mainContent');
        introScreen.style.animation = 'introFadeOut 0.5s ease-out forwards';
        
        setTimeout(() => {
          introScreen.style.display = 'none';
          mainContent.style.display = 'block';
          mainContent.style.animation = 'mainContentFadeIn 0.5s ease-out forwards';
          introComplete = true;
          initializeMainSite();
        }, 500);
      }
    });
  }
});

// Initialize main site functionality
function initializeMainSite() {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth scrolling for navigation links
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

  // Navbar background on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
      }
    }
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const service = formData.get('service');
      const message = formData.get('message');
      
      // Create WhatsApp message
      const whatsappMessage = `Olá! Gostaria de solicitar um orçamento:
      
*Nome:* ${name}
*Email:* ${email}
*Serviço:* ${service}
*Mensagem:* ${message}`;
      
      // Encode message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // WhatsApp URL
      const whatsappURL = `https://wa.me/5542998319122?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappURL, '_blank');
      
      // Show success message
      showNotification('Redirecionando para o WhatsApp...', 'success');
      
      // Reset form
      this.reset();
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.service-card, .contact-item, .tech-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Service card hover effects
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Parallax effect for floating elements
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const elements = document.querySelectorAll('.particle');
    
    elements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  });
}

// Secret key combination to open admin login (Ctrl + Shift + A)
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && e.key === 'A') {
    e.preventDefault();
    if (!isAdminLoggedIn && introComplete) {
      adminModal.style.display = 'block';
    }
  }
});

// Close admin modal
if (adminClose) {
  adminClose.addEventListener('click', function() {
    adminModal.style.display = 'none';
  });
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  if (e.target === adminModal) {
    adminModal.style.display = 'none';
  }
});

// Admin form submission
if (adminForm) {
  adminForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUser').value;
    const password = document.getElementById('adminPass').value;
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
      isAdminLoggedIn = true;
      adminModal.style.display = 'none';
      adminPanel.style.display = 'block';
      showNotification('Login realizado com sucesso!', 'success');
      
      // Clear form
      adminForm.reset();
    } else {
      showNotification('Credenciais inválidas!', 'error');
      
      // Shake animation for wrong credentials
      const modalContent = adminModal.querySelector('.admin-modal-content');
      if (modalContent) {
        modalContent.style.animation = 'shake 0.5s';
        setTimeout(() => {
          modalContent.style.animation = '';
        }, 500);
      }
    }
  });
}

// Logout functionality
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    isAdminLoggedIn = false;
    adminPanel.style.display = 'none';
    showNotification('Logout realizado com sucesso!', 'info');
  });
}

// Add shake animation to CSS dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// Enhanced Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles based on type
  let bgColor, textColor;
  switch(type) {
    case 'success':
      bgColor = '#00ff00';
      textColor = '#000';
      break;
    case 'error':
      bgColor = '#ff0080';
      textColor = '#fff';
      break;
    case 'info':
      bgColor = '#00ffff';
      textColor = '#000';
      break;
    default:
      bgColor = '#00ffff';
      textColor = '#000';
  }
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${bgColor};
    color: ${textColor};
    padding: 1rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
  // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);

// Easter egg: Konami code for special effects
let konamiCode = [];
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
  if (!introComplete) return; // Only work after intro
  
  konamiCode.push(e.code);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Activate special neon mode
    document.body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
    showNotification('🎉 Modo Neon Especial Ativado!', 'success');
    
    setTimeout(() => {
      document.body.style.filter = '';
    }, 5000);
    
    konamiCode = [];
  }
});

// Auto-update admin stats (simulated)
function updateAdminStats() {
  if (isAdminLoggedIn) {
    const stats = document.querySelectorAll('.admin-stat strong');
    stats.forEach(stat => {
      const currentValue = parseInt(stat.textContent);
      const newValue = currentValue + Math.floor(Math.random() * 3);
      stat.textContent = newValue;
    });
  }
}

// Update stats every 30 seconds
setInterval(updateAdminStats, 30000);

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
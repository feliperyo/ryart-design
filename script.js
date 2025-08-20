// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.9)';
    }
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Counter Animation for Stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
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
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Portfolio Show More/Less Functionality
document.addEventListener('DOMContentLoaded', function () {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Create show more/less button
    const showMoreButton = document.createElement('div');
    showMoreButton.className = 'show-more-container';
    showMoreButton.innerHTML = `
        <button class="btn-show-more" id="showMoreBtn">
            <span class="btn-text">Ver Mais Projetos</span>
            <i class="fas fa-chevron-down"></i>
        </button>
    `;

    // Add CSS styles for the button
    const showMoreCSS = `
        .show-more-container {
            display: flex;
            justify-content: center;
            margin-top: 3rem;
        }
        
        .btn-show-more {
            padding: 1rem 2rem;
            background: var(--gradient-1);
            color: var(--text-light);
            border: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: var(--shadow-glow);
        }
        
        .btn-show-more:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
        }
        
        .btn-show-more i {
            transition: transform 0.3s ease;
        }
        
        .btn-show-more.expanded i {
            transform: rotate(180deg);
        }
        
        .portfolio-item.hidden {
            display: none;
        }
        
        .portfolio-item.show {
            display: block;
            animation: fadeInUp 0.5s ease forwards;
        }
    `;

    // Add styles to document
    const style = document.createElement('style');
    style.textContent = showMoreCSS;
    document.head.appendChild(style);

    // Insert button after portfolio grid
    portfolioGrid.parentNode.insertBefore(showMoreButton, portfolioGrid.nextSibling);

    const showMoreBtn = document.getElementById('showMoreBtn');
    const btnText = showMoreBtn.querySelector('.btn-text');
    const btnIcon = showMoreBtn.querySelector('i');

    let isExpanded = false;
    const itemsToShow = 6; // Número de projetos visíveis inicialmente

    // Initially hide items beyond the first 6
    function initializePortfolio() {
        portfolioItems.forEach((item, index) => {
            if (index >= itemsToShow) {
                item.classList.add('hidden');
            } else {
                item.classList.add('show');
            }
        });
    }

    // Toggle show more/less
    function togglePortfolioItems() {
        if (!isExpanded) {
            // Show more
            portfolioItems.forEach((item, index) => {
                if (index >= itemsToShow) {
                    item.classList.remove('hidden');
                    item.classList.add('show');
                }
            });
            btnText.textContent = 'Ver Menos Projetos';
            btnIcon.classList.add('expanded');
            isExpanded = true;
        } else {
            // Show less
            portfolioItems.forEach((item, index) => {
                if (index >= itemsToShow) {
                    item.classList.remove('show');
                    item.classList.add('hidden');
                }
            });
            btnText.textContent = 'Ver Mais Projetos';
            btnIcon.classList.remove('expanded');
            isExpanded = false;

            // Scroll back to portfolio section smoothly
            document.querySelector('#portfolio').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Event listener for button
    showMoreBtn.addEventListener('click', togglePortfolioItems);

    // Initialize portfolio on load
    initializePortfolio();

    // Update portfolio filter to work with show/hide functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            let visibleCount = 0;

            portfolioItems.forEach((item, index) => {
                const shouldShow = filterValue === 'all' || item.getAttribute('data-category') === filterValue;

                if (shouldShow) {
                    if (!isExpanded && visibleCount >= itemsToShow) {
                        item.classList.add('hidden');
                        item.classList.remove('show');
                    } else {
                        item.classList.remove('hidden');
                        item.classList.add('show');
                    }
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('show');
                }
            });

            // Show/hide the "show more" button based on filtered results
            const totalVisible = Array.from(portfolioItems).filter(item => {
                return filterValue === 'all' || item.getAttribute('data-category') === filterValue;
            }).length;

            if (totalVisible > itemsToShow) {
                showMoreButton.style.display = 'flex';
            } else {
                showMoreButton.style.display = 'none';
            }
        });
    });
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Form Handling
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.btn-submit');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Simulate form submission
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Reset form
        contactForm.reset();
        submitBtn.textContent = 'Mensagem Enviada!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            submitBtn.textContent = 'Enviar Mensagem';
            submitBtn.style.background = 'var(--gradient-1)';
            submitBtn.disabled = false;
        }, 3000);

        // Show success message
        showNotification('Mensagem enviada com sucesso!', 'success');
    }, 2000);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Scroll Animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .section-header').forEach(el => {
    animationObserver.observe(el);
});

// Hero Buttons Functionality
document.querySelector('.btn-primary').addEventListener('click', () => {
    document.querySelector('#portfolio').scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelector('.btn-secondary').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// // Portfolio Modal (Optional Enhancement)
// function createPortfolioModal() {
//     const modal = document.createElement('div');
//     modal.className = 'portfolio-modal';
//     modal.innerHTML = `
//         <div class="modal-content">
//             <span class="close-modal">&times;</span>
//             <img src="" alt="" class="modal-image">
//             <div class="modal-info">
//                 <h3 class="modal-title"></h3>
//                 <p class="modal-description"></p>
//                 <div class="modal-technologies"></div>
//                 <a href="#" class="modal-link" target="_blank">Ver Site</a>
//             </div>
//         </div>
//     `;

//     modal.style.cssText = `
//         display: none;
//         position: fixed;
//         z-index: 10000;
//         left: 0;
//         top: 0;
//         width: 100%;
//         height: 100%;
//         background: rgba(0, 0, 0, 0.9);
//         backdrop-filter: blur(10px);
//     `;

//     const modalContent = modal.querySelector('.modal-content');
//     modalContent.style.cssText = `
//         position: relative;
//         margin: 5% auto;
//         padding: 2rem;
//         width: 80%;
//         max-width: 800px;
//         background: var(--dark-bg);
//         border-radius: 20px;
//         border: 1px solid rgba(255, 255, 255, 0.1);
//     `;

//     document.body.appendChild(modal);

//     // Close modal functionality
//     modal.querySelector('.close-modal').addEventListener('click', () => {
//         modal.style.display = 'none';
//     });

//     modal.addEventListener('click', (e) => {
//         if (e.target === modal) {
//             modal.style.display = 'none';
//         }
//     });

//     return modal;
// }

// const portfolioModal = createPortfolioModal();

// Add click events to portfolio items
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.portfolio-overlay h3').textContent;
        const description = item.querySelector('.portfolio-overlay p').textContent;

        portfolioModal.querySelector('.modal-image').src = img.src;
        portfolioModal.querySelector('.modal-title').textContent = title;
        portfolioModal.querySelector('.modal-description').textContent = description;
        portfolioModal.style.display = 'block';
    });
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title .glitch');
        if (heroTitle) {
            typeWriter(heroTitle, 'RyArt Design', 150);
        }
    }, 2000);
});

// Mouse Move Parallax Effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    cards.forEach(card => {
        const speed = 5;
        const rotateX = (y - 0.5) * speed;
        const rotateY = (x - 0.5) * speed;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Reset card transforms when mouse leaves
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});

// Particle System for Background
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite linear;
        `;
        particleContainer.appendChild(particle);
    }

    document.body.appendChild(particleContainer);
}

// CSS for particle animation
const particleCSS = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Glitch effect trigger
setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'glitch 0.5s ease-in-out';
        }, 10);
    });
}, 5000);

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Parallax and other scroll effects here
}, 16)); // ~60fps

document.getElementById("whatsappForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let assunto = document.getElementById("assunto").value;
    let mensagem = document.getElementById("mensagem").value;

    let texto = `Olá! Me chamo ${nome}%0AEmail: ${email}%0AAssunto: ${assunto}%0AMensagem: ${mensagem}`;

    let url = `https://wa.me/5511972821988?text=${texto}`; // coloque seu número no formato internacional

    window.open(url, "_blank");
});
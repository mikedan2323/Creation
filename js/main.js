/*
  Creation Explorer - Main JavaScript
  Handles common functionality across all pages
*/

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeModal();
    initializeQuiz();
    initializeAnimations();
    highlightCurrentPage();
});

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('scripture-modal');
    const scriptureBtn = document.getElementById('scripture-btn');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (!modal || !scriptureBtn || !closeModalBtn) return;
    
    scriptureBtn.addEventListener('click', () => {
        openModal(modal);
    });
    
    closeModalBtn.addEventListener('click', () => {
        closeModal(modal);
    });
    
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    // Add a slight delay to trigger the nested animation
    setTimeout(() => {
        const content = modal.querySelector('.modal-content');
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 50);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    const content = modal.querySelector('.modal-content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }, 300);
}

// Quiz Functionality
function initializeQuiz() {
    const checkAnswerBtn = document.getElementById('check-answer');
    const feedbackEl = document.getElementById('feedback');
    const quizForm = document.getElementById('quiz-form');
    
    if (!checkAnswerBtn || !feedbackEl || !quizForm) return;
    
    checkAnswerBtn.addEventListener('click', () => {
        checkQuizAnswer(quizForm, feedbackEl);
    });
}

function checkQuizAnswer(form, feedbackEl) {
    const selectedOption = form.querySelector('input[type="radio"]:checked');
    feedbackEl.textContent = '';
    feedbackEl.classList.remove('correct', 'incorrect', 'visible');
    
    if (!selectedOption) {
        feedbackEl.textContent = 'Please select an answer.';
        feedbackEl.classList.add('visible');
        return;
    }
    
    const isCorrect = selectedOption.hasAttribute('data-correct');
    
    if (isCorrect) {
        feedbackEl.textContent = getCorrectFeedback(selectedOption.value);
        feedbackEl.classList.add('correct', 'visible');
        highlightCorrectAnswer(form);
    } else {
        feedbackEl.textContent = getIncorrectFeedback(selectedOption.value);
        feedbackEl.classList.add('incorrect', 'visible');
    }
}

function highlightCorrectAnswer(form) {
    const options = form.querySelectorAll('.quiz-option');
    options.forEach(option => {
        if (option.querySelector('input').hasAttribute('data-correct')) {
            option.querySelector('label').style.boxShadow = '0 0 15px rgba(45, 95, 62, 0.5)';
        }
    });
}

// Content-specific feedback messages
function getCorrectFeedback(answer) {
    const feedbackMessages = {
        'Light': 'Correct! God created light on the first day, before any other element of creation.',
        // Add more specific feedback for other days/answers
    };
    return feedbackMessages[answer] || 'Correct!';
}

function getIncorrectFeedback(answer) {
    const feedbackMessages = {
        'Sun': 'Not quite. God created light on the first day, but the sun wasn\'t created until the fourth day.',
        'Water': 'Not quite. While the waters existed, God\'s first creative act was bringing light into existence.',
        'Land': 'Not quite. Land wasn\'t created until the third day. God created light first.',
        // Add more specific feedback for other days/answers
    };
    return feedbackMessages[answer] || 'Not quite. Try again!';
}

// Initialize special animations
function initializeAnimations() {
    // Check if we're on Day 1 and initialize light particles
    if (document.body.classList.contains('day1')) {
        initializeLightParticles();
    }
    
    // Check for other day-specific animations
    if (document.body.classList.contains('day2')) {
        initializeWaterAnimation();
    }
    
    // Add more day-specific initializations...
}

function initializeLightParticles() {
    const lightContainer = document.querySelector('.light-container');
    if (!lightContainer) return;
    
    // Create additional dynamic light particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'light-particle';
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(230, 182, 85, 0.7)';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = `${Math.random() * 0.5}`;
        particle.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out`;
        lightContainer.appendChild(particle);
    }
}

function initializeWaterAnimation() {
    // Water animation for Day 2
    // ... Add specific implementation
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.day-nav-item');
    
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (itemPath === currentPath) {
            item.classList.add('active');
            item.setAttribute('aria-current', 'page');
        } else {
            item.classList.remove('active');
            item.removeAttribute('aria-current');
        }
    });
}

// Smooth scrolling for internal links
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

// Helper functions
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

// Export functions for use in other modules if needed
window.CreationExplorer = {
    openModal,
    closeModal,
    checkQuizAnswer,
    initializeAnimations
};
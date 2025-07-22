// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navigation
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

// Smooth scrolling
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

// Typewriter effect
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

// Initialize typewriter when page loads
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        typeWriter(typewriterElement, 'Étudiant Epitech PGE • Dev C Systems');
    }
});

// Particles animation (orange theme)
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ff6600;
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        particlesContainer.appendChild(particle);
    }
}

// CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
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
            entry.target.classList.add('animate');
            
            // Trigger counter animation for stats section
            if (entry.target.classList.contains('about-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .stat-card, .skill-item, .terminal-window');
    animatedElements.forEach(el => observer.observe(el));
    
    // Create particles
    createParticles();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Form handling with Epitech style
document.querySelector('.neural-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'COMPILATION...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'MESSAGE COMPILÉ ✓';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            this.reset();
        }, 2000);
    }, 1000);
});

// Terminal cursor effect
function addCursorEffect() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach(line => {
        const cursor = document.createElement('span');
        cursor.textContent = '█';
        cursor.style.cssText = `
            animation: blink 1s infinite;
            color: #ff6600;
            margin-left: 5px;
        `;
        line.appendChild(cursor);
    });
}

// Initialize cursor effect
document.addEventListener('DOMContentLoaded', addCursorEffect);

// Hologram scan effect (orange theme)
function createHologramScan() {
    const hologram = document.querySelector('.hologram-content');
    if (!hologram) return;
    
    setInterval(() => {
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #ff6600, transparent);
            animation: scan-vertical 2s linear;
            pointer-events: none;
        `;
        
        hologram.appendChild(scanLine);
        
        setTimeout(() => {
            scanLine.remove();
        }, 2000);
    }, 3000);
}

// Add scan animation
const scanStyle = document.createElement('style');
scanStyle.textContent = `
    @keyframes scan-vertical {
        0% { top: -2px; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { top: 100%; opacity: 0; }
    }
`;
document.head.appendChild(scanStyle);

// Initialize hologram scan
document.addEventListener('DOMContentLoaded', createHologramScan);

// Matrix rain effect (orange theme)
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.05;
    `;
    
    const characters = '01EPITECH';
    
    for (let i = 0; i < 15; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            top: -100px;
            left: ${Math.random() * 100}%;
            color: #ff6600;
            font-family: monospace;
            font-size: 12px;
            animation: matrix-fall ${Math.random() * 15 + 15}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        for (let j = 0; j < 15; j++) {
            const char = document.createElement('div');
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.marginBottom = '15px';
            column.appendChild(char);
        }
        
        matrixContainer.appendChild(column);
    }
    
    document.body.appendChild(matrixContainer);
}

// Matrix animation CSS
const matrixStyle = document.createElement('style');
matrixStyle.textContent = `
    @keyframes matrix-fall {
        0% { transform: translateY(-100vh); }
        100% { transform: translateY(100vh); }
    }
`;
document.head.appendChild(matrixStyle);

// Initialize matrix rain
document.addEventListener('DOMContentLoaded', createMatrixRain);

// Glitch effect on hover for project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const title = card.querySelector('h3');
            title.classList.add('glitch');
            title.setAttribute('data-text', title.textContent);
        });
        
        card.addEventListener('mouseleave', () => {
            const title = card.querySelector('h3');
            title.classList.remove('glitch');
        });
    });
});

// Aviation easter egg
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        const plane = document.createElement('div');
        plane.innerHTML = '✈️';
        plane.style.cssText = `
            position: fixed;
            top: 50%;
            left: -50px;
            font-size: 2rem;
            z-index: 9999;
            animation: fly-across 3s linear;
            pointer-events: none;
        `;
        document.body.appendChild(plane);
        
        setTimeout(() => {
            plane.remove();
        }, 3000);
    }
});

// Add fly animation
const flyStyle = document.createElement('style');
flyStyle.textContent = `
    @keyframes fly-across {
        0% { left: -50px; transform: rotate(0deg); }
        50% { transform: rotate(10deg); }
        100% { left: 100vw; transform: rotate(0deg); }
    }
`;
document.head.appendChild(flyStyle);

// Gaming retro easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Retro game activated!
        document.body.style.filter = 'sepia(1) hue-rotate(50deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        // Show retro message
        const retroMsg = document.createElement('div');
        retroMsg.innerHTML = '🎮 RETRO MODE ACTIVATED! 🎮';
        retroMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff6600;
            color: #000;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-family: 'Orbitron', monospace;
            font-weight: bold;
            z-index: 9999;
            animation: pulse 1s infinite;
        `;
        document.body.appendChild(retroMsg);
        
        setTimeout(() => {
            retroMsg.remove();
        }, 3000);
        
        konamiCode = [];
    }
});

// Audio feedback (orange themed beeps)
function initAudioFeedback() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playBeep(frequency = 800, duration = 100) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.05;
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
    
    // Add sound to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            playBeep(1200, 50);
        });
    });
    
    // Add sound to nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            playBeep(900, 30);
        });
    });
}

// Initialize audio on first user interaction
document.addEventListener('click', initAudioFeedback, { once: true });

// Console ASCII art for developers who inspect the code
console.log(`
    ██╗     ███████╗██╗   ██╗██╗   ██╗
    ██║     ██╔════╝╚██╗ ██╔╝╚██╗ ██╔╝
    ██║     █████╗   ╚████╔╝  ╚████╔╝ 
    ██║     ██╔══╝    ╚██╔╝    ╚██╔╝  
    ███████╗███████╗   ██║      ██║   
    ╚══════╝╚══════╝   ╚═╝      ╚═╝   
    
    🛩️ Epitech Marseille PGE Student
    🎮 Retro Gaming & Aviation Enthusiast
    💻 C Programming Specialist
    
    Try Ctrl+P for a surprise! 🛩️
    Or the Konami Code for retro vibes! 🎮
`);
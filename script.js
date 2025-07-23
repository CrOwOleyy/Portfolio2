// Loading Screen - CORRECTION
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    // Attendre que tous les éléments soient chargés
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            loadingScreen.remove(); // Supprimer complètement l'élément
        }, 500);
    }, 2000);
});

// Initialize EmailJS
(function() {
    // Vérifier si EmailJS est disponible avant de l'initialiser
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY"); // Remplacez par votre clé publique EmailJS
    }
})();

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
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
    if (!element) return;
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
        // Attendre un peu avant de démarrer l'effet
        setTimeout(() => {
            typeWriter(typewriterElement, 'Étudiant Epitech PGE • Dev C Systems');
        }, 3000); // Démarrer après le chargement
    }
});

// Particles animation (orange theme)
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Vider le conteneur d'abord
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 30; i++) { // Réduire le nombre pour les performances
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

// CSS for particle animation - CORRECTION
const style = document.createElement('style');
style.id = 'particle-style'; // Ajouter un ID pour éviter les doublons
if (!document.getElementById('particle-style')) {
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
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        if (counter.dataset.animated) return; // Éviter la double animation
        counter.dataset.animated = 'true';
        
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
            if (entry.target.classList.contains('about-stats') || entry.target.querySelector('.stat-number')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation - CORRECTION
document.addEventListener('DOMContentLoaded', () => {
    // Attendre que le chargement soit terminé
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.project-card, .stat-card, .skill-item, .terminal-window');
        animatedElements.forEach(el => {
            if (el) observer.observe(el);
        });
        
        // Create particles seulement une fois
        createParticles();
    }, 3000);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Form handling with EmailJS - CORRECTION
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            if (!submitBtn) return;
            
            const originalText = submitBtn.textContent;
            
            // Animation de chargement
            submitBtn.textContent = 'COMPILATION...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'linear-gradient(45deg, #ff6600, #ffaa00)';
            
            // Simuler l'envoi si EmailJS n'est pas configuré
            if (typeof emailjs === 'undefined') {
                setTimeout(() => {
                    submitBtn.textContent = 'MESSAGE TRANSMIS ✓';
                    submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                    showTerminalMessage('✓ Message simulé - Configurez EmailJS pour l\'envoi réel', 'success');
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        contactForm.reset();
                    }, 3000);
                }, 1500);
                return;
            }
            
            // Envoi via EmailJS si configuré
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    submitBtn.textContent = 'MESSAGE TRANSMIS ✓';
                    submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                    showTerminalMessage('✓ Message transmis avec succès!', 'success');
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        contactForm.reset();
                    }, 3000);
                    
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    submitBtn.textContent = 'ERREUR - RETRY';
                    submitBtn.style.background = 'linear-gradient(45deg, #dc3545, #e74c3c)';
                    showTerminalMessage('✗ Erreur de transmission. Réessayez.', 'error');
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                });
        });
    }
});

// Fonction pour afficher des messages dans le terminal
function showTerminalMessage(message, type = 'info') {
    const terminal = document.querySelector('.contact-terminal .terminal-body');
    if (!terminal) return;
    
    const newLine = document.createElement('p');
    newLine.className = 'terminal-line';
    
    const color = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#ff6600';
    
    newLine.innerHTML = `
        <span class="prompt">system@neural:~$</span> 
        <span class="output" style="color: ${color}">${message}</span>
    `;
    terminal.appendChild(newLine);
    
    // Auto-scroll
    terminal.scrollTop = terminal.scrollHeight;
    
    // Supprimer après 10 secondes
    setTimeout(() => {
        if (newLine && newLine.parentNode) {
            newLine.remove();
        }
    }, 10000);
}

// Terminal cursor effect - CORRECTION
function addCursorEffect() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach(line => {
        // Vérifier si le curseur n'existe pas déjà
        if (!line.querySelector('.terminal-cursor')) {
            const cursor = document.createElement('span');
            cursor.className = 'terminal-cursor';
            cursor.textContent = '█';
            cursor.style.cssText = `
                animation: blink 1s infinite;
                color: #ff6600;
                margin-left: 5px;
            `;
            line.appendChild(cursor);
        }
    });
}

// Initialize cursor effect - CORRECTION
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        addCursorEffect();
    }, 3500); // Après le chargement
});

// Hologram scan effect (orange theme) - CORRECTION
function createHologramScan() {
    const hologram = document.querySelector('.hologram-content');
    if (!hologram) return;
    
    const scanInterval = setInterval(() => {
        // Vérifier si l'élément existe encore
        if (!document.body.contains(hologram)) {
            clearInterval(scanInterval);
            return;
        }
        
        const scanLine = document.createElement('div');
        scanLine.className = 'hologram-scan';
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
            if (scanLine && scanLine.parentNode) {
                scanLine.remove();
            }
        }, 2000);
    }, 4000); // Augmenter l'intervalle
}

// Add scan animation - CORRECTION
const scanStyle = document.createElement('style');
scanStyle.id = 'scan-style';
if (!document.getElementById('scan-style')) {
    scanStyle.textContent = `
        @keyframes scan-vertical {
            0% { top: -2px; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
    `;
    document.head.appendChild(scanStyle);
}

// Initialize hologram scan - CORRECTION
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createHologramScan();
    }, 4000);
});

// Matrix rain effect (orange theme) - CORRECTION
function createMatrixRain() {
    // Vérifier si la matrice existe déjà
    if (document.getElementById('matrix-container')) return;
    
    const matrixContainer = document.createElement('div');
    matrixContainer.id = 'matrix-container';
    matrixContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.03;
    `;
    
    const characters = '01EPITECH';
    
    for (let i = 0; i < 10; i++) { // Réduire le nombre
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            top: -100px;
            left: ${Math.random() * 100}%;
            color: #ff6600;
            font-family: monospace;
            font-size: 12px;
            animation: matrix-fall ${Math.random() * 20 + 20}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        for (let j = 0; j < 10; j++) { // Réduire le nombre
            const char = document.createElement('div');
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.marginBottom = '15px';
            column.appendChild(char);
        }
        
        matrixContainer.appendChild(column);
    }
    
    document.body.appendChild(matrixContainer);
}

// Matrix animation CSS - CORRECTION
const matrixStyle = document.createElement('style');
matrixStyle.id = 'matrix-style';
if (!document.getElementById('matrix-style')) {
    matrixStyle.textContent = `
        @keyframes matrix-fall {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(matrixStyle);
}

// Initialize matrix rain - CORRECTION
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createMatrixRain();
    }, 5000); // Attendre plus longtemps
});

// Glitch effect on hover for project cards
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const title = card.querySelector('h3');
                if (title) {
                    title.classList.add('glitch');
                    title.setAttribute('data-text', title.textContent);
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const title = card.querySelector('h3');
                if (title) {
                    title.classList.remove('glitch');
                }
            });
        });
    }, 3000);
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
            if (plane && plane.parentNode) {
                plane.remove();
            }
        }, 3000);
    }
});

// Add fly animation - CORRECTION
const flyStyle = document.createElement('style');
flyStyle.id = 'fly-style';
if (!document.getElementById('fly-style')) {
    flyStyle.textContent = `
        @keyframes fly-across {
            0% { left: -50px; transform: rotate(0deg); }
            50% { transform: rotate(10deg); }
            100% { left: 100vw; transform: rotate(0deg); }
        }
    `;
    document.head.appendChild(flyStyle);
}

// Gaming retro easter egg - MODIFICATION KONAMI CODE
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA', 'Enter'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Retro game activated with redirect!
        document.body.style.filter = 'sepia(1) hue-rotate(30deg)';
        
        // Show activation message
        const retroMsg = document.createElement('div');
        retroMsg.innerHTML = '🎮 KONAMI CODE ACTIVATED! 🎮<br><span style="font-size: 0.8em;">Redirecting to secret zone...</span>';
        retroMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff6600;
            color: #000;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            font-family: 'Orbitron', monospace;
            font-weight: bold;
            z-index: 9999;
            animation: pulse 0.5s infinite;
            text-align: center;
            border: 3px solid #ffaa00;
            box-shadow: 0 0 30px rgba(255, 102, 0, 0.8);
        `;
        document.body.appendChild(retroMsg);
        
        // Sound effect simulation
        if (typeof playBeep === 'function') {
            playBeep(800, 200);
            setTimeout(() => playBeep(1000, 200), 200);
            setTimeout(() => playBeep(1200, 300), 400);
        }
        
        // Afficher message dans le terminal si disponible
        if (typeof showTerminalMessage === 'function') {
            showTerminalMessage('🚀 KONAMI CODE: Accès à la zone secrète autorisé!', 'success');
        }
        
        // Redirection après 3 secondes
        setTimeout(() => {
            // Choix du site de redirection - vous pouvez changer l'URL ici
            const secretSites = [
                'https://niggachain.ai/'
            ]
            // Vous pouvez choisir un site spécifique ou aléatoire
            const randomSite = secretSites[Math.floor(Math.random() * secretSites.length)];
            
            // Ou forcer un site spécifique en décommentant la ligne suivante :
            // const targetSite = 'https://github.com/CrOwOleyy';
            
            // Animation de téléportation
            document.body.style.transition = 'all 0.5s ease';
            document.body.style.transform = 'scale(0)';
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                // Redirection vers le site choisi
                window.open(randomSite, '_blank'); // Ouvre dans un nouvel onglet
                // ou utilisez window.location.href = randomSite; pour rediriger dans le même onglet
                
                // Restaurer la page après la redirection
                document.body.style.transform = 'scale(1)';
                document.body.style.opacity = '1';
                document.body.style.filter = '';
            }, 500);
            
            retroMsg.remove();
        }, 3000);
        
        konamiCode = [];
    }
});

// Audio feedback (orange themed beeps) - CORRECTION
function initAudioFeedback() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        function playBeep(frequency = 800, duration = 100) {
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
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
    } catch (error) {
        console.log('Audio not supported in this browser');
    }
}

// Initialize audio on first user interaction
document.addEventListener('click', initAudioFeedback, { once: true });

// Console ASCII art - CORRECTION
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
    
    Portfolio by LEYY - Neocron Evolution Theme
`);

// Initialize everything when DOM is ready - CORRECTION
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔥 Neocron Evolution Portfolio initialized');
    console.log('👨‍💻 Created by LEYY - Epitech Marseille PGE');
    console.log('🚀 Ready for neural connections...');
});
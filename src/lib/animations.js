// GSAP ANIMATIONS
gsap.registerPlugin(ScrollTrigger);

// 1. Text Reveal Engine (Jason Zhou Style)
// Wraps text in spans for animation.
// If type is 'word', it splits by space. If 'char', by character.
const splitText = (element, type = 'word') => {
    if (!element) return;
    // Use textContent to preserve spaces better, trim to avoid empty words
    const text = element.textContent.trim();
    element.innerHTML = '';
    
    if (type === 'word') {
        // Split by one or more whitespace characters
        const words = text.split(/\s+/);
        words.forEach(word => {
            const span = document.createElement('span');
            span.className = 'word';
            span.style.display = 'inline-block';
            span.style.overflow = 'hidden';
            span.style.verticalAlign = 'bottom';
            
            const inner = document.createElement('span');
            inner.className = 'word-inner';
            inner.style.display = 'inline-block';
            inner.innerText = word;
            
            span.appendChild(inner);
            element.appendChild(span);
            // Add a non-breaking space after each word for proper wrapping
            element.appendChild(document.createTextNode('\u00A0'));
        });
    } else if (type === 'char') {
         const chars = text.split('');
         chars.forEach(char => {
             const span = document.createElement('span');
             span.className = 'char';
             span.style.display = 'inline-block';
             span.innerHTML = char === ' ' ? '&nbsp;' : char;
             element.appendChild(span);
         });
    }
};

// Apply split text to elements with .js-split-text
document.querySelectorAll('.js-split-text').forEach(el => {
    splitText(el, 'word');
    
    gsap.from(el.querySelectorAll('.word-inner'), {
        y: '110%',
        opacity: 0,
        rotationZ: 3,
        duration: 1.5,
        ease: "power4.out",
        stagger: {
            amount: 0.5,
            from: "start"
        },
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });
});

// Title Letter Animation (v3.2 - Decoupled Lines)
document.querySelectorAll('.js-title-line').forEach((el, i) => {
    splitText(el, 'char');
    gsap.from(el.querySelectorAll('.char'), {
        opacity: 0,
        y: 60,
        rotateX: -100,
        stagger: 0.02,
        duration: 1.8,
        ease: "expo.out",
        delay: 0.3 + (i * 0.4) // Stagger the two lines
    });
});


// 2. Global Reveal & Table Dynamics
// Standard reveal for sections
document.querySelectorAll('.reveal').forEach((el) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// Gatekeeper Flow Sequential Animation (Slide 7)
const gateRows = document.querySelectorAll('.gate-row');
if (gateRows.length > 0) {
    gsap.from(gateRows, {
        opacity: 0,
        x: -30,
        stagger: 0.3,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".gate-flow",
            start: "top 80%",
        }
    });
    
    // Animate the arrows specifically
    gsap.from('.gate-arrow', {
        opacity: 0,
        scale: 0.5,
        stagger: 0.3,
        delay: 0.5,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".gate-flow",
            start: "top 80%",
        }
    });
}

// Stagger items with "Waterfall" effect
document.querySelectorAll('.container').forEach((container) => {
    const items = container.querySelectorAll('.stagger-item:not(.gate-row)'); // Exclude gates as they have their own logic
    if (items.length > 0) {
        // Set initial state only if not already visible (inline opacity fix)
        items.forEach(item => {
            if (getComputedStyle(item).opacity === "0") {
                gsap.set(item, { opacity: 0, y: 30, x: 20 });
            }
        });
        
        gsap.to(items, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    }
});

// 3. Diagram & Data Pulse
const setupPathAnimation = (pathId, trigger) => {
    const path = document.querySelector(pathId);
    if (!path) return;
    
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    
    gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: trigger,
            start: "top 60%",
        }
    });
};

setupPathAnimation('#gen-path', '#inversion');
setupPathAnimation('#eval-path', '#inversion');
setupPathAnimation('#tech-skills-path', '#arbitrage');
setupPathAnimation('#judgment-path', '#arbitrage');

// Pulse effect for Slide 2 "Growing Gap" text
const gapText = document.querySelector('#inversion text[font-weight="500"]');
if(gapText) {
    gsap.to(gapText, {
        opacity: 0.5,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });
}

// Crossover Pulse Animation
gsap.fromTo(["#crossover-circle", "#crossover-line", "#crossover-text"], 
    { scale: 0, opacity: 0, transformOrigin: "center center" }, 
    { 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#arbitrage",
            start: "top 40%",
        },
        onComplete: () => {
             // Continuous pulse after entrance
             gsap.to("#crossover-circle", {
                 scale: 1.2,
                 opacity: 0.8,
                 duration: 1.5,
                 yoyo: true,
                 repeat: -1,
                 ease: "sine.inOut"
             });
        }
    }
);


// 4. Box Animations - Clean, Alignment-Preserving Entrance
// Removed parallax to maintain perfect alignment
document.querySelectorAll('.two-col').forEach(section => {
    const boxes = section.querySelectorAll('.box');
    if (boxes.length >= 2) {
        // Simple fade + slide entrance that doesn't affect final position
        boxes.forEach((box, index) => {
            gsap.from(box, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out",
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    }
});


// 5. Navigation Logic (Retained)
document.addEventListener('keydown', (e) => {
    const slides = document.querySelectorAll('.slide');
    const scrollY = window.scrollY;
    let currentIndex = 0;
    
    slides.forEach((slide, i) => {
        if (slide.offsetTop <= scrollY + 100) {
            currentIndex = i;
        }
    });
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentIndex < slides.length - 1) {
            slides[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
            slides[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }
});

const updateNav = () => {
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav a');
    const scrollY = window.scrollY;
    
    slides.forEach((slide, i) => {
        const isActive = slide.offsetTop <= scrollY + window.innerHeight / 2 &&
                       slide.offsetTop + slide.offsetHeight > scrollY + window.innerHeight / 2;
        if (navDots[i]) {
            navDots[i].style.background = isActive ? '#f59e0b' : '#ddd';
            if(isActive) {
                gsap.to(navDots[i], { scale: 1.3, duration: 0.3 });
            } else {
                gsap.to(navDots[i], { scale: 1, duration: 0.3 });
            }
        }
    });
};

window.addEventListener('scroll', updateNav);
updateNav();
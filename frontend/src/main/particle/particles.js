////////////////////////////////// Canvas //////////////////////////////////////

const canvas = document.getElementById('background-particle-canvas');
const context = canvas.getContext('2d');

function resizeCanvas() {
    context.setupSize(window.innerWidth, window.innerHeight);
}
resizeCanvas();

let resizeEvent;
window.addEventListener('resize', () => {
    if (resizeEvent)
        clearTimeout(resizeEvent);

    resizeEvent = setTimeout(() => {
        resizeCanvas();
        initParticles();
    }, 100);
});


//////////////////////////////// Mouse/Touch ///////////////////////////////////

const mouse = new RadiusMouse();

let mouseRadiusZeroTimeout;
canvas.addEventListener('mousemove', event => {
    if (mouseRadiusZeroTimeout)
        clearTimeout(mouseRadiusZeroTimeout);
    mouse.initMouseRadius();
    mouse.x = event.x;
    mouse.y = event.y;
    mouseRadiusZeroTimeout = setTimeout(() => mouse.shrinkRadiusToZero(), 50);
});

canvas.addEventListener('mouseout', event => {
    mouse.x = null;
    mouse.y = null;
});

canvas.addEventListener('touchmove', event => {
    const touch = event.touches[0]; // Only single touch
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    // Delegate touchmove to mousemove
    canvas.dispatchEvent(mouseEvent);
});


/////////////////////////////// Particles //////////////////////////////////////

let particles;
/**
 * Initializes the particles of the canvas
 */
function initParticles() {
    particles = [];

    // Particles count
    const x = canvas.clientWidth * canvas.clientHeight;
    const particlesCount = Math.floor(350 * (1 - Math.exp(-0.0000015 * x)));

    for (let i = 0; i < particlesCount; i++) {
        particles.push(Particle.initRandom(context));
    }
}

// Frame-by-frame handling
let lastFrameTime;
function step(timestamp) {
    timestamp = timestamp || Date.now();
    const deltaTime = timestamp - lastFrameTime;

    context.clear(true);
    for (const particle of particles) {
        particle.update(deltaTime);
    }

    lastFrameTime = timestamp; // as reference for next frame
    requestAnimationFrame(step);
}

// Start
initParticles();
requestAnimationFrame((timestamp) => {
    timestamp = timestamp || Date.now(); // initial timestamp
    lastFrameTime = timestamp;
    step(timestamp);
});

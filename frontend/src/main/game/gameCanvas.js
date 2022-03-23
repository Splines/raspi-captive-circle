async function startGame(ws) {
    // Gestures
    handleGestures(ws);

    // Show default background above everything (so far)
    const backgroundGradient = document.getElementById('background-gradient');
    // background gradient should have opacity 0 at this point
    // strangely, if we set opacity to 0 manually at this point,
    // there won't be any transition later from opacity 0 to 1
    // backgroundGradient.style.opacity = 0;
    backgroundGradient.style.zIndex = 1999;
    backgroundGradient.style.opacity = 1;

    // Show canvas above everything
    const backgroundCanvas = document.getElementById('background-particle-canvas');
    backgroundCanvas.style.zIndex = 2000;
    backgroundCanvas.style.display = 'flex'; // show canvas for the first time
    resizeCanvas();

    // Remove elements below
    // TODO: semantically this should not be part of this file
    const checkmark = document.getElementById('checkmark');
    checkmark.style.display = 'None';

    const arrow = document.getElementById('arrow-left-double-img');
    arrow.style.display = 'None';

    const middleText = document.getElementById('starting-soon-text');
    middleText.style.marginBottom = '0';
}

function hideCanvas() {
    // Hide canvas
    const backgroundCanvas = document.getElementById('background-particle-canvas');
    backgroundCanvas.style.zIndex = -1;
}

////////////////////////////////// Canvas //////////////////////////////////////

const canvas = document.getElementById('background-particle-canvas');
const context = canvas.getContext('2d');

function resizeCanvas() {
    context.setupSize(window.innerWidth, window.innerHeight);
}

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
let pressing = false;

canvas.addEventListener('mousedown', event => {
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.addEventListener('mousemove', event => {
    if (typeof event === 'object') {
        if (event.buttons >= 1) {
            mouse.x = event.x;
            mouse.y = event.y;
        }
    }

});

canvas.addEventListener('mouseout', event => {
    mouse.x = undefined;
    mouse.y = undefined;
});

canvas.addEventListener('touchmove', event => {
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
        buttons: 1
    });
    canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('mouseup', event => {
    // Resize particles close to mouse
    for (const particle of particles) {
        const distance = Math.pow(mouse.x - particle.x, 2) + Math.pow(mouse.y - particle.y, 2);
        if (distance < 60 * mouse.radius) {
            particle.size += 8;
            particle.draw();
        }
    }
    mouse.x = undefined;
    mouse.y = undefined;
});

canvas.addEventListener('touchend', event => {
    const touch = event.changedTouches[0]; // Only single touch
    const mouseEvent = new MouseEvent('mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
});


/////////////////////////////// Particles //////////////////////////////////////

let particles;
/**
 * Initializes the particles of the canvas
 */
function initParticles() {
    const colors = ['#F656CB', '#DE4367', '#FA594B', '#CA43DE', '#B44BFA'];
    particles = [];
    for (let i = 0; i < 4000; i++) {
        const randomColor = colors[Math.random() * colors.length >> 0];
        particles.push(Particle.initRandom(context, randomColor));
    }
}

// Frame-by-frame handling
let lastFrameTime;
function step(timestamp) {
    timestamp = timestamp || Date.now();
    const deltaTime = timestamp - lastFrameTime;

    context.clear(true);
    for (const particle of particles) {
        particle.update(deltaTime, mouse);
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

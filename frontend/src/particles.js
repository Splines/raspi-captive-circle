const canvas = document.getElementById('background-particle-canvas');
const context = canvas.getContext('2d');

setupWholePageCanvas();
function setupWholePageCanvas() {
    setupCanvasSize(canvas, context, window.innerWidth, window.innerHeight);
}

// https://medium.com/@williamsdewi/html-canvas-and-accessibility-ffcfc317fab5
function setupCanvasSize(canvasTarget, context, drawWidth, drawHeight) {
    const pixelDensity = window.devicePixelRatio;

    // Size the raster taking into account the device pixel ratio
    const nativeCanvasWidth = drawWidth * pixelDensity;
    const nativeCanvasHeight = drawHeight * pixelDensity;
    canvasTarget.width = nativeCanvasWidth;
    canvasTarget.height = nativeCanvasHeight;

    // Set on-page size to the size we want
    canvasTarget.style.width = drawWidth + "px";
    canvasTarget.style.height = drawHeight + "px";

    context.setTransform(pixelDensity, 0, 0, pixelDensity, 0, 0);
};


// https://stackoverflow.com/a/6722031/9655481
// https://stackoverflow.com/a/9722502/9655481
CanvasRenderingContext2D.prototype.clear = function (preserveTransform) {
    // const pixelDensity = window.devicePixelRatio;
    // this.clearRect(0, 0, this.canvas.width * pixelDensity, this.canvas.height * pixelDensity);

    if (preserveTransform) {
        // Store the current transformation matrix
        // Use the identity matrix while clearing the canvas
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
        // Restore the transform
        this.restore();
    }
};


///////////////////////////////// Mouse ////////////////////////////////////////

const mouse = {
    x: null,
    y: null,
    radius: null
}

resetMouseRadius();
let mouseRadiusZeroTimeout;

function resetMouseRadius() {
    mouse.radius = 110;
}

window.addEventListener('resize', () => {
    clearTimeout(this.resizeEvent);
    this.resizeEvent = setTimeout(() => {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        setupWholePageCanvas();
        init();
    }, 100);
});

canvas.addEventListener('mousemove', event => {
    if (mouseRadiusZeroTimeout)
        clearTimeout(mouseRadiusZeroTimeout);
    resetMouseRadius();
    mouse.x = event.x;
    mouse.y = event.y;
    mouseRadiusZeroTimeout = setTimeout(() => mouse.radius = 0, 50);
});

canvas.addEventListener('mouseout', event => {
    mouse.x = undefined;
    mouse.y = undefined;
});


////////////////////////////// Touch events ////////////////////////////////////

canvas.addEventListener('touchmove', event => {
    const touch = event.touches[0]; // Only single touch
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
});


///////////////////////////// Particle /////////////////////////////////////////

class Particle {

    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
    }

    /**
     * Checks if particles are close enough to draw a line between them.
     */
    connectToOtherParticles() {
        let opacity = 1;

        for (const otherParticle of particles) {
            let distance = (this.x - otherParticle.x) * (this.x - otherParticle.x);
            distance += (this.y - otherParticle.y) * (this.y - otherParticle.y);

            const DISTANCE_THRESHOLD = 10;
            if (distance < (canvas.clientWidth / DISTANCE_THRESHOLD)
                * (canvas.clientHeight / DISTANCE_THRESHOLD)) {
                opacity = 1 - (distance / 7000);
                context.strokeStyle = 'rgb(80, 52, 135, ' + opacity + ')';
                context.lineWidth = 1;
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(otherParticle.x, otherParticle.y);
                context.stroke();
            }
        }
    }

    update(deltaTime) {
        // Is particle still within canvas?
        if (this.x < 0 || this.x > canvas.clientWidth) {
            this.directionX = -this.directionX;
        }
        if (this.y < 0 || this.y > canvas.clientHeight) {
            this.directionY = -this.directionY;
        }

        // Circle collision
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const REPEL_SPEED = 0.1 * deltaTime;

        if (distance < mouse.radius + this.size) {
            // Direction to push the particle
            // Only push particle if is not close to border
            if (mouse.x < this.x && this.x < canvas.clientWidth - 10 * this.size) {
                this.x += REPEL_SPEED;
            } else if (mouse.x > this.x && this.x > 10 * this.size) {
                this.x -= REPEL_SPEED;
            }

            if (mouse.y < this.y && this.y < canvas.clientHeight - 10 * this.size) {
                this.y += REPEL_SPEED;
            } else if (mouse.y > this.y && this.y > 0 + 10 * this.size) {
                this.y -= REPEL_SPEED;
            }
        }

        // Move particle
        this.x += this.directionX * 0.05 * deltaTime;
        this.y += this.directionY * 0.05 * deltaTime;

        this.draw();
        this.connectToOtherParticles();
    }

}

let particles;
function init() {
    particles = [];

    const x = canvas.clientWidth * canvas.clientHeight;
    const particlesCount = Math.floor(350 * (1 - Math.exp(-0.0000015 * x)));

    for (let i = 0; i < particlesCount; i++) {
        const size = 5 * Math.random() + 1;
        const x = Math.random() * (window.innerWidth - 2 * size - 2 * size) + 2 * size;
        const y = Math.random() * (window.innerHeight - 2 * size - 2 * size) + 2 * size;
        const directionX = 5 * Math.random() - 2.5;
        const directionY = 5 * Math.random() - 2.5;
        const color = '#F656CB';
        particles.push(new Particle(x, y, directionX, directionY, size, color));
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

init();
requestAnimationFrame((timestamp) => {
    timestamp = timestamp || Date.now();
    lastFrameTime = timestamp;
    step(timestamp);
});

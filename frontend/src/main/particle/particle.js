class Particle {

    constructor(context, x, y, directionX, directionY, size, color) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    static initRandom(context) {
        const size = 5 * Math.random() + 1;

        // 2*size buffer around edges
        const x = Math.random() * (canvas.clientWidth - 4 * size) + 2 * size;
        const y = Math.random() * (canvas.clientHeight - 4 * size) + 2 * size;

        const directionX = 5 * Math.random() - 2.5;
        const directionY = 5 * Math.random() - 2.5;

        return new Particle(context, x, y, directionX, directionY, size, '#F656CB');
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.color;
        this.context.fill();
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
                this.context.strokeStyle = 'rgb(80, 52, 135, ' + opacity + ')';
                this.context.lineWidth = 1;
                this.context.beginPath();
                this.context.moveTo(this.x, this.y);
                this.context.lineTo(otherParticle.x, otherParticle.y);
                this.context.stroke();
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

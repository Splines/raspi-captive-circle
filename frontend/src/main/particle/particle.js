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

    static initRandom(context, color) {
        const size = 0;

        // 2*size buffer around edges
        const x = Math.random() * (canvas.clientWidth - 4 * size) + 2 * size;
        const y = Math.random() * (canvas.clientHeight - 4 * size) + 2 * size;

        const directionX = 5 * Math.random() - 2.5;
        const directionY = 5 * Math.random() - 2.5;

        return new Particle(context, x, y, directionX, directionY, size, color);
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.color;
        this.context.fill();
    }

    update(deltaTime, mouse) {
        // Check for edges
        if ((this.x - this.size) < 0 || (this.x + this.size) > canvas.clientWidth) {
            this.directionX = -this.directionX;
        }
        if ((this.y - this.size) < 0 || (this.y + this.size) > canvas.clientHeight) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;

        // Is within mouse range?
        const distance = Math.pow(mouse.x - this.x, 2) + Math.pow(mouse.y - this.y, 2);
        if (distance < 40 * mouse.radius) {
            this.size += 5;
        } else {
            this.size -= 0.5;
        }

        // Limit size
        if (this.size < 0)
            this.size = 0;
        if (this.size > 22)
            this.size = 22;

        this.draw();
    }

}

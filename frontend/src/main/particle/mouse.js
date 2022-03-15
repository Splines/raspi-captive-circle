class RadiusMouse {

    x = null;
    y = null;
    radius = null;

    constructor() {
        this.initMouseRadius();
    }

    initMouseRadius() {
        this.radius = 110;
    }

    shrinkRadiusToZero() {
        this.radius = 0;
    }
}

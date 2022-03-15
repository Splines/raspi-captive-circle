// https://medium.com/@williamsdewi/html-canvas-and-accessibility-ffcfc317fab5
CanvasRenderingContext2D.prototype.setupSize =
    function (drawWidth, drawHeight) {
        const pixelDensity = window.devicePixelRatio;

        // Size the raster taking into account the device pixel ratio
        const nativeCanvasWidth = drawWidth * pixelDensity;
        const nativeCanvasHeight = drawHeight * pixelDensity;
        this.canvas.width = nativeCanvasWidth;
        this.canvas.height = nativeCanvasHeight;

        // Set on-page size to the size we want
        this.canvas.style.width = drawWidth + "px";
        this.canvas.style.height = drawHeight + "px";

        this.setTransform(pixelDensity, 0, 0, pixelDensity, 0, 0);
    }

// https://stackoverflow.com/a/6722031/9655481
// https://stackoverflow.com/a/9722502/9655481
CanvasRenderingContext2D.prototype.clear = function (preserveTransform) {
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

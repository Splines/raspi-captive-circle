class LayerManager {

    zIndex = 100000;

    showOnTop(id) {
        // It is very unlikely that we will eventually reach the
        // cross-browser highest z-index of 16777271 (Safari 3)
        // https://stackoverflow.com/a/8565868/9655481
        this.zIndex++;

        const element = document.getElementById(id);
        element.style.zIndex = this.zIndex;

        return element;
    }

    showOnTopWithOpacityChange(id) {
        const element = document.getElementById(id);

        element.style.opacity = 0;
        this.showOnTop(id);
        element.style.opacity = 1;

        return element;
    }

    showOnTopWithOpacityChangeHideBefore(id) {
        const element = document.getElementById(id);

        const transition = getComputedStyle(element).transition;
        element.style.transition = 'none';
        element.style.opacity = 0;
        this.showOnTop(id);
        setTimeout(() => {
            element.style.transition = transition;
            element.style.opacity = 1;
        }, 20); // otherwise transition won't work

        return element;
    }

}

const layers = new LayerManager();

function enterCalibrateMode() {
    // Resize blob
    const blobDivs = document.getElementsByClassName('blob-div');
    for (const blobDiv of blobDivs) {
        blobDiv.style.width = '150vh'; // we set vh not vw on purpose
    }

    layers.showOnTopWithOpacityChange('background-gradient');
    layers.showOnTop('ready-wrapper');
    layers.showOnTop('starting-soon');

    const middleText = document.getElementById('starting-soon-text');
    middleText.style.marginBottom = '0';
    fadeToText(middleText, "Tap when it's your turn");

    // Change click listener
    const blob = document.getElementById('clickable-blob');
    blob.removeEventListener('click', onBlobFullscreen);
    blob.addEventListener('click', handleGetReady);
}

async function handleGetReady() {
    // Call endpoint
    try {
        const res = await axios.post('/api/ready', { withCredentials: true });
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
    if (!isFullscreen) {
        enterFullscreen(document.documentElement);
        isFullscreen = true;
    }

    // Remove click listenerg
    const blob = document.getElementById('clickable-blob');
    blob.removeEventListener('click', handleGetReady);

    // Remove blob
    const blobDivs = document.getElementsByClassName('blob-div');
    for (const blobDiv of blobDivs) {
        blobDiv.style.width = '0vh'; // we set vh not vw on purpose
    }

    // Layers
    layers.showOnTopWithOpacityChangeHideBefore('background-gradient-success');
    layers.showOnTop('ready-wrapper'); // to show full hiding animation
    layers.showOnTop('starting-soon');
    layers.showOnTopWithOpacityChangeHideBefore('checkmark');

    // Change text
    const middleText = document.getElementById('starting-soon-text');
    middleText.style.marginBottom = '4rem';
    fadeToText(middleText, "Yeah, you're ready", () => {
        layers.showOnTopWithOpacityChangeHideBefore('arrow-left-double');
        // const arrow = document.getElementById('arrow-left-double-img');
        // arrow.style.opacity = 1;
    });
}

// Fullscreen handling
document.getElementById('checkmark-img').addEventListener('click', onCheckmarkFullscreen);
function onCheckmarkFullscreen() {
    if (isFullscreen) {
        exitFullscreen(document.body);
        isFullscreen = false;
    } else {
        enterFullscreen(document.body);
        isFullscreen = true;
    }
}

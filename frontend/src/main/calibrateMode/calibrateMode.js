const middleText = document.getElementById('starting-soon-text');
const blobDivs = document.getElementsByClassName('blob-div');
const blob = document.getElementById('clickable-blob');
const checkmark = document.getElementById('checkmark');

function transitionToCalibrateMode() {
    // Resize blob
    for (const blobDiv of blobDivs) {
        blobDiv.style.width = '150vh'; // we set vh not vw on purpose
    }

    fadeToText(middleText, "Tap when it's your turn");

    // Change click listener
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
    blob.removeEventListener('click', handleGetReady);

    // Remove blob
    for (const blobDiv of blobDivs) {
        blobDiv.style.width = '0vh'; // we set vh not vw on purpose
    }

    // Change text
    middleText.style.marginBottom = '4rem';
    fadeToText(middleText, "Yeah, you're ready", () => {
        const arrow = document.getElementById('arrow-left-double-img');
        arrow.style.opacity = 1;
    });

    // Change background
    const successGradient = document.getElementById('background-gradient-success');
    successGradient.style.opacity = 1;

    const normalGradient = document.getElementById('background-gradient');
    normalGradient.style.opacity = 0;

    // Checkmark
    checkmark.style.opacity = 1;
    checkmark.style.zIndex = 1000;
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

// Flicker for calibration check
const flickerDiv = document.getElementById('background-gradient-flicker');
async function checkCalibration() {
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    // Flicker once
    flickerDiv.style.opacity = 1;
    await sleep(1000);
    flickerDiv.style.opacity = 0;
}

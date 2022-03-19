const middleText = document.getElementById('starting-soon-text');
const blobDivs = document.getElementsByClassName('blob-div');
const blob = document.getElementById('clickable-blob');
const checkmark = document.getElementById('checkmark');

function transitionToCalibrateMode() {
    // Resize blob
    for (const blobDiv of blobDivs) {
        blobDiv.style.width = '150vh'; // we set vh not vw on purpose
    }

    // Change text
    middleText.addEventListener("transitionend", calibrateOnTransitionEnd);
    middleText.classList.add('fade');

    // Change click listener
    blob.removeEventListener('click', onBlobFullscreen);
    blob.addEventListener('click', handleGetReady);
}

function calibrateOnTransitionEnd() {
    // Text transition end
    middleText.removeEventListener('transitionend', calibrateOnTransitionEnd);
    middleText.innerHTML = "Tap when it's your turn";
    middleText.classList.remove('fade');
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
    middleText.style.marginBottom = '6rem';
    middleText.addEventListener('transitionend', readyOnTransitionEnd);
    middleText.classList.add('fade');

    // Change background
    const successGradient = document.getElementById('background-gradient-success');
    successGradient.style.opacity = 1;

    // Checkmark
    checkmark.style.opacity = 1;
    checkmark.style.zIndex = 1000;
}

function readyOnTransitionEnd(event) {
    // Text transition end
    middleText.removeEventListener('transitionend', readyOnTransitionEnd);
    middleText.innerHTML = "Yeah, you're ready";
    middleText.classList.remove('fade');
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

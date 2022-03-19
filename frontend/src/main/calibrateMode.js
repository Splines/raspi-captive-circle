const middleText = document.getElementById('starting-soon-text');

function transitionToCalibrateMode() {
    const blobDivs = document.getElementsByClassName('blob-div');
    for (const blobDiv of blobDivs) {
        blobDiv.style.width = '150vh'; // we set vh not vw on purpose
    }

    middleText.addEventListener("transitionend", calibrateOnTransitionEnd);
    middleText.classList.add('fade'); // remove the class for leave state
}

function calibrateOnTransitionEnd() {
    middleText.removeEventListener('transitionend', calibrateOnTransitionEnd);
    middleText.innerHTML = "Tap when it's your turn";
    middleText.classList.remove('fade'); // add class again
}

function fadeToText(textElement, newText, afterTransitionCallback) {
    textElement.addEventListener('transitionend', onTransitionEnd);
    textElement.classList.add('fade');

    function onTransitionEnd() {
        if (afterTransitionCallback) {
            afterTransitionCallback();
        }

        textElement.removeEventListener('transitionend', onTransitionEnd);
        textElement.innerHTML = newText;
        textElement.classList.remove('fade');
    }
}

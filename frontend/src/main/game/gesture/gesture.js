const DIRECTION_LEFT = 2;
const DIRECTION_HORIZONTAL = 6;

const passOnSound = new Audio('/assets/audio/pass-on.mp3');
const passOnWithSkipSound = new Audio('/assets/audio/pass-on-with-skip.mp3');

const mc = new Hammer.Manager(document.documentElement);
mc.add(new Hammer.Swipe({ event: 'oneFingerHorizontalSwipe', pointers: 1, direction: DIRECTION_HORIZONTAL }));
mc.add(new Hammer.Swipe({ event: 'twoFingersHorizontalSwipe', pointers: 2, direction: DIRECTION_HORIZONTAL }));

let isLastGesture = false;

function handleOneFingerHorizontalSwipe(event, ws) {
    catchPlayPromise(passOnSound.play());
    navigator.vibrate(100);

    const action = (event.direction === DIRECTION_LEFT)
        ? "PASS_ON_CLOCKWISE" : "PASS_ON_COUNTER_CLOCKWISE";
    console.log(`🎈 1 Finger: ${action}`);
    ws.send(action);
    if (isLastGesture) {
        removeGestureHandling();
        handleLastGesture();
    }
}

function handleTwoFingersHorizontalSwipe(event, ws) {
    catchPlayPromise(passOnWithSkipSound.play());
    navigator.vibrate([30, 30, 100]);

    const action = (event.direction === DIRECTION_LEFT)
        ? "PASS_ON_CLOCKWISE_SKIP" : "PASS_ON_COUNTER_CLOCKWISE_SKIP";
    console.log(`🎈 2 Fingers: ${action}`);
    ws.send(action);
    if (isLastGesture) {
        removeGestureHandling();
        handleLastGesture();
    }
}

function handleGestures(ws) {
    mc.on('oneFingerHorizontalSwipe', event => handleOneFingerHorizontalSwipe(event, ws));
    mc.on('twoFingersHorizontalSwipe', event => handleTwoFingersHorizontalSwipe(event, ws));
    console.log('Gesture handling added');
}

function removeGestureHandling() {
    mc.off('oneFingerHorizontalSwipe', handleOneFingerHorizontalSwipe);
    mc.off('twoFingersHorizontalSwipe', handleTwoFingersHorizontalSwipe);
    console.log('Gesture handling removed');

    // Reset for new game
    isLastGesture = false;
}

function removeGestureHandlingOnNextGesture() {
    isLastGesture = true;
}

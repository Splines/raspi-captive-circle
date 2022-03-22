const DIRECTION_LEFT = 2;
const DIRECTION_HORIZONTAL = 6;

const swellPleng = new Audio('/assets/audio/Swell-Pleng-Short-Attack.mp3');
const swellPlengDark = new Audio('/assets/audio/Swell-Pleng-Dark.mp3');

const mc = new Hammer.Manager(document.documentElement);

function handleGestures(ws) {
    mc.add(new Hammer.Swipe({ event: 'oneFingerHorizontalSwipe', pointers: 1, direction: DIRECTION_HORIZONTAL }));
    mc.add(new Hammer.Swipe({ event: 'twoFingersHorizontalSwipe', pointers: 2, direction: DIRECTION_HORIZONTAL }));

    mc.on('oneFingerHorizontalSwipe', event => {
        swellPleng.load();
        swellPleng.play();
        const action = (event.direction === DIRECTION_LEFT)
            ? "PASS_ON_CLOCKWISE" : "PASS_ON_COUNTER_CLOCKWISE";
        console.log(`🎈 1 Finger: ${action}`);
        ws.send(action);
    });

    mc.on('twoFingersHorizontalSwipe', event => {
        swellPlengDark.load();
        swellPlengDark.play();
        const action = (event.direction === DIRECTION_LEFT)
            ? "PASS_ON_CLOCKWISE_SKIP" : "PASS_ON_COUNTER_CLOCKWISE_SKIP";
        console.log(`🎈 2 Fingers: ${action}`);
        ws.send(action);
    });

}

function removeGestureHandling() {
    mc.remove('oneFingerHorizontalSwipe');
    mc.remove('twoFingersHorizontalSwipe');
}

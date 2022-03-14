const DIRECTION_LEFT = 2;
const DIRECTION_HORIZONTAL = 6;

function handleGestures(ws) {
    const gestureArea = document.getElementById('gesture-area');
    const mc = new Hammer.Manager(gestureArea);
    mc.add(new Hammer.Swipe({ event: 'oneFingerHorizontalSwipe', pointers: 1, direction: DIRECTION_HORIZONTAL }));
    mc.add(new Hammer.Swipe({ event: 'twoFingersHorizontalSwipe', pointers: 2, direction: DIRECTION_HORIZONTAL }));

    mc.on("oneFingerHorizontalSwipe", event => {
        const action = (event.direction === DIRECTION_LEFT)
            ? "PASS_ON_CLOCKWISE" : "PASS_ON_COUNTER_CLOCKWISE";
        console.log(`🎈 1 Finger: ${action}`);
        ws.send(action);
    });

    mc.on("twoFingersHorizontalSwipe", event => {
        const action = (event.direction === DIRECTION_LEFT)
            ? "PASS_ON_CLOCKWISE_SKIP" : "PASS_ON_COUNTER_CLOCKWISE_SKIP";
        console.log(`🎈 2 Fingers: ${action}`);
        ws.send(action);
    });

}

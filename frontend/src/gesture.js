function handleGestures(ws) {
    const gestureArea = document.getElementById('gesture-area');
    const mc = new Hammer.Manager(gestureArea, {
        recognizers: [
            [Hammer.Tap],
            [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
        ]
    });

    const THRESHOLD_TAP_SWIPE_GAP_IN_MS = 300;
    let lastTapTime = Date.now();
    let tapOccurred = false;

    mc.on("tap", event => {
        console.log('tap');
        lastTapTime = Date.now();
        tapOccurred = true;
        setTimeout(() => tapOccurred = false, THRESHOLD_TAP_SWIPE_GAP_IN_MS);
    });

    mc.on("swipeleft swiperight", event => {
        if (tapOccurred) {
            const deltaTime = Date.now() - lastTapTime;
            if (deltaTime > THRESHOLD_TAP_SWIPE_GAP_IN_MS) {
                return;
            }

            const action = (event.type === "swipeleft")
                ? "PASS_ON_CLOCKWISE_SKIP" : "PASS_ON_COUNTER_CLOCKWISE_SKIP";
            console.log(`🎈⚡ Tap-Swipe: ${action}`);
            ws.send(action);
        } else {
            const action = (event.type === "swipeleft")
                ? "PASS_ON_CLOCKWISE" : "PASS_ON_COUNTER_CLOCKWISE";
            console.log(`⚡ Swipe: ${action}`);
            ws.send(action);
        }
    });

}

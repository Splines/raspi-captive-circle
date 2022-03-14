function handleGestures(ws) {
    // Gestures
    const gestureArea = document.getElementById('gesture-area');
    const mc = new Hammer.Manager(gestureArea, {
        recognizers: [
            [Hammer.Tap],
            [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
        ]
    });

    const THRESHOLD_SWIPE_TAP_GAP_IN_MS = 190;
    let lastSwipeTime;
    let lastSwipeDirection = "";
    let swipeOccurred = false;

    mc.on("swipeleft swiperight", event => {
        // Update state
        lastSwipeTime = Date.now();
        lastSwipeDirection = event.type;
        swipeOccurred = true;

        // Wait for threshold time
        setTimeout(() => {
            // Check if swipe already consumed together with tap
            if (!swipeOccurred)
                return;

            const action = event.type === "swipeleft"
                ? "PASS_ON_CLOCKWISE" : "PASS_ON_COUNTER_CLOCKWISE";
            console.log(`🎈 Only Swipe: ${action}`);
            ws.send(action);
        }, THRESHOLD_SWIPE_TAP_GAP_IN_MS);
    });

    mc.on("tap", event => {
        if (!swipeOccurred)
            return;

        const deltaTime = Date.now() - lastSwipeTime;
        if (deltaTime > THRESHOLD_SWIPE_TAP_GAP_IN_MS) {
            return;
        }

        swipeOccurred = false;
        const action = lastSwipeDirection === "swipeleft"
            ? "PASS_ON_CLOCKWISE_SKIP" : "PASS_ON_COUNTER_CLOCKWISE_SKIP";
        console.log(`🎈 Swipe-Tap: ${action}`);
        ws.send(action);
    });
}

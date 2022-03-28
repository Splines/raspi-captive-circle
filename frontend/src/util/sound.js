// https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
function catchPlayPromise(playPromise) {
    if (playPromise) {
        playPromise.catch(error => {
            console.error('Could not play back audio file: ', error);
        });
    }
}

let song;

function setupMusic() {
    song = select("audio");
    playMusic();

    // listen for mousemovement to start song, as autoplay is disabled in chrome in a non-extension use case
    document.onmousemove = function() {
        // check if song is already playing
        if (song.elt.currentTime === 0 || song.elt.paused) {
            playMusic();
        } else {
            // remove listener once play() was executed
            document.onmousemove = null;
        }
    }
}

function playMusic() {
    if (isMusicChecked()) {
        song.volume(getVolume());
        song.loop();
    }
}

function stopMusic() {
    song.stop();
}

function setVolume(value) {
    song.volume(value);
}
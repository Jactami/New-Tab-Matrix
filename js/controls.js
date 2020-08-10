let musicSwitch;
let animationSwitch;
let volumeSlider;

function setupControls() {
    selectAll(".controls").map(elem => elem.show());
    musicSwitch = select("input", select(".switch blue"));
    musicSwitch.changed(musicChecked);
    animationSwitch = select("input", select(".switch red"));
    volumeSlider = select(".volumeSlider");
    volumeSlider.changed(volumeChanged);
    volumeSlider.input(volumeChanged);

    document.onfullscreenchange = handleFullscreen;
    document.onwebkitfullscreenchange = handleFullscreen;
}

function musicChecked() {
    if (this.checked()) {
        playMusic();
    } else {
        stopMusic();
    }
}

function isMusicChecked() {
    return musicSwitch.checked();
}

function isAnimationChecked() {
    return animationSwitch.checked();
}

function volumeChanged() {
    setVolume(this.value());
}

function getVolume() {
    return volumeSlider.value();
}

function keyPressed() {
    if (keyCode === ENTER) {
        let fs = fullscreen();
        fullscreen(!fs);
    }
}

function handleFullscreen() {
    if (fullscreen()) {
        selectAll(".controls").map(elem => elem.hide());
        select("html").elt.style.cursor = "none";
    } else {
        selectAll(".controls").map(elem => elem.show());
        select("html").elt.style.cursor = "initial";
    }
}
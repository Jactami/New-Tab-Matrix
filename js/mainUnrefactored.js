// TODO: move theme to audio-tag to load and play dynamically without splitting

// combines main.js, matrix.js, controls.js, music.js
// does not work anymore because p5.sound.js + themeFst/ themeSnd are deleted

let matrix = [];
let fontSize = 17;
let offset = 4;
let themeFst, themeSnd;
let musicSwitch, animationSwitch, volumeSlider;
let timer;

function setup() {
    // preload and play small first part of theme while rest is still loading in the background
    soundFormats("mp3");
    themeFst = loadSound("music/themeFst", playTheme);
    themeSnd = loadSound("music/themeSnd.mp3");

    // handle controls
    selectAll(".controls").map(elem => elem.show());
    musicSwitch = select("input", select(".switch blue"));
    musicSwitch.changed(musicChecked);
    animationSwitch = select("input", select(".switch red"));
    animationSwitch.changed(animationChecked);
    volumeSlider = select(".volumeSlider");
    volumeSlider.changed(volumeChanged);
    volumeSlider.input(volumeChanged);

    // create matrix
    createCanvas(displayWidth, displayHeight);
    background(0);
    drawingContext.shadowColor = "rgb(200, 255, 200, 220)";
    for (let i = 0; i <= (displayWidth - fontSize) / fontSize; i++) {
        // if (round(random(0, 5)) !== 0) {
        if (i % 5 !== 0) {
            matrix[i] = new Stream(i * fontSize);
        } else {
            // create gaps
            i += round(random(0, 4));
        }
    }
}

function draw() {
    if (!animationSwitch.checked()) {
        noLoop();
    }

    //redraw background without shadow blurring
    drawingContext.shadowBlur = 0;
    background(0, 110);

    // draw matrix with shadow blurring
    drawingContext.shadowBlur = 15;
    for (let stream of matrix) {
        if (stream) {
            stream.update();
            stream.display();
        }
    }
}

function playTheme() {
    if (!musicSwitch.checked()) {
        return;
    }

    themeFst.setVolume(volumeSlider.value());
    themeFst.play();

    // switch theme parts after 9 seconds
    timer = setTimeout(function() {
        themeSnd.setVolume(volumeSlider.value());
        themeSnd.play();
    }, 9000);

    // loop theme (alternatively load the complete theme meanwhile)
    themeSnd.onended(playTheme);
}

function musicChecked() {
    if (this.checked()) {
        playTheme();
    } else {
        themeFst.stop();
        themeSnd.stop();
        clearTimeout(timer);
    }
}

function animationChecked() {
    if (this.checked()) {
        loop();
    } else {
        noLoop();
    }
}

function volumeChanged() {
    themeFst.setVolume(this.value());
    themeSnd.setVolume(this.value());
}

function keyPressed() {
    if (keyCode === ENTER) {
        let fs = fullscreen();
        fullscreen(!fs);
    }
    document.onwebkitfullscreenchange = function() {
        if (fullscreen()) {
            selectAll(".controls").map(elem => elem.hide());
            select("html").elt.style.cursor = "none";
        } else {
            selectAll(".controls").map(elem => elem.show());
            select("html").elt.style.cursor = "initial";
        }
    }
}
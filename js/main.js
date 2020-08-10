function setup() {
    // handle controls
    setupControls();

    // play theme
    setupMusic();

    // create matrix
    setupMatrix();
}

function draw() {
    // update Matrix if animation is set to looping
    if (isAnimationChecked()) {
        updateMatrix();
    }
}
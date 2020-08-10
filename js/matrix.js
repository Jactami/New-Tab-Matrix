let matrix = [];
let fontSize = 17;
let offset = 4;

function setupMatrix() {
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

function updateMatrix() {
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
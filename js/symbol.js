class Symbol {
    constructor(x, y) {
        this.value = this.getValue();
        this.x = x;
        this.y = y;
        this.changeInterval = round(random(10, 30));
    }

    getValue() {
        return String.fromCharCode(0x30A0 + round(random(0, 96)));

        // uncomment for 1s and 0s only
        // return round(random());
    }

    display(highlighted) {
        if (highlighted) {
            fill(200, 255, 200, 220);
        } else {
            fill(0, 255, 100, 160);
        }
        textSize(fontSize);
        text(this.value, this.x, this.y);
    }

    update() {
        if (frameCount % this.changeInterval === 0) {
            this.value = this.getValue();
        }
    }
}
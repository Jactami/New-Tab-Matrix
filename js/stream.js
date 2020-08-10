class Stream {
    constructor(x) {
        this.symbols = [];
        this.speed = round(random(1, 3));

        // random start location for a smooth beginning
        let y = round(random(-50, -displayHeight));
        // amount depending on to display and font size (35 to 70% of displayHeight)
        let amount = round((random(0.35, 0.7) * displayHeight) / (fontSize + offset))
        for (let i = 0; i < amount; i++) {
            this.symbols[i] = new Symbol(x, y);
            y -= fontSize + offset;
        }
    }

    display() {
        for (let i = 0; i < this.symbols.length; i++) {
            let highlighted = false;
            if (i < 3) {
                highlighted = true;
            }
            this.symbols[i].display(highlighted);
        }
    }

    update() {
        // randomly switch symbol value
        for (let symbol of this.symbols) {
            symbol.update();
        }

        // move last symbol to front
        if (frameCount % this.speed === 0) {
            let newFirst = this.symbols.pop();
            newFirst.y = (this.symbols[0].y + fontSize + offset) % displayHeight;
            this.symbols.unshift(newFirst);
        }
    }
}
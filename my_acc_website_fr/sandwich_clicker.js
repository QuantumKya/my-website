
// Variable setup

let numberOfSandwiches = 0;
let sandwichesPerSecond = 0;
let bakeryNumber = 0;
let bakeryPrice = 15;

const expFactor = 1.25;


// Method setup

const Game = {

    update() {
        document.getElementById("NOSdisplay").innerHTML = ((isInt(numberOfSandwiches)) ? numberOfSandwiches : Math.floor(numberOfSandwiches)).toString() + " sandwiches";

        document.getElementById("SPSdisplay").innerHTML = sandwichesPerSecond.toString() + " sandwiches per second";
        document.getElementById("NOBdisplay").innerHTML = bakeryNumber.toString() + " bakeries";
        document.getElementById("bakeryButton").innerHTML = "Buy bakery (" + bakeryPrice.toString() + ")";
    },

    earn(amount) {
        numberOfSandwiches += amount;
        this.update();
    },

    earnBakery(amount) {
        if (numberOfSandwiches >= bakeryPrice) {
            numberOfSandwiches -= bakeryPrice;
            bakeryNumber += amount;
            this.earnSPS(amount * 0.5);
            this.priceScale();
            this.update();
        }
    },

    earnSPS(amount) {
        sandwichesPerSecond += amount;
        this.update();
    },

    priceScale() {
        bakeryPrice = Math.floor(bakeryPrice * expFactor);
        this.update();
    },

    SPSincr() {
        Game.earn(sandwichesPerSecond);
    }
}

function isInt(n) {
    return n % 1 === 0;
}

setInterval(Game.SPSincr, 1000);
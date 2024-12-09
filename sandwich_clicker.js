
// Variable setup

let sandwiches = 0;
let sandwichRate = 0;
let bakeries = 0;
let bakeryPrice = 15;

let owns = {
    deli: {
        name: "delis",
        count: 0
    },

    bakery: {
        name: "bakeries",
        count: 0
    }
}

let inventory = {
    loaf: {
        name: "loaves of bread",
        count: 0,
        rate: 0
    },

    cheese: {
        name: "slices of cheese",
        count: 0,
        rate: 0
    },
}

const expFactor = 1.25;

const sandwichesText = document.getElementById("NOSdisplay");
const sandwichRateText = document.getElementById("SPSdisplay");
const bakeriesText = document.getElementById("NOBdisplay");
const loavesText = document.getElementById("LoavesDisplay");
const bakeryButton = document.getElementById("bakeryButton");


// Method setup

const Game = {

    update() {
        inventory.loaf.rate = this.calcSPS();
        Game.earn(sandwichRate);
        Game.earnLoaf(inventory.loaf.rate);

        sandwichesText.innerHTML = Math.floor(sandwiches).toString() + " sandwiches";

        sandwichRateText.innerHTML = sandwichRate.toString() + " sandwiches per second";
        bakeriesText.innerHTML = bakeries.toString() + " bakeries";
        loavesText.innerHTML = inventory.loaf.count.toString() + " " + inventory.loaf.name;

        bakeryButton.innerHTML = "Buy bakery (" + bakeryPrice.toString() + ")";
    },

    earn(amount) { sandwiches += amount; },
    earnLoaf(amount) { inventory.loaf.count += amount; },
    earnBakery(amount) { owns.bakery.count += amount; },
    earnSPS(amount) { sandwichRate += amount; },
    earnBPS(amount) { loafRate += amount; },

    buyBakery(amount) {
        if (sandwiches >= bakeryPrice * amount) {
            sandwiches -= bakeryPrice * amount;
            this.earnBakery(amount);
            bakeryPrice = Math.floor(bakeryPrice * expFactor);
        }
    },

    calcSPS() {
        let sps = bakeries * 0.5;
        return sps;
    },
}

function isInt(n) {
    return n % 1 === 0;
}

setInterval(Game.update, 1000);
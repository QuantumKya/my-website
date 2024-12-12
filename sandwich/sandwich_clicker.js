
// Variable setup

const expFactor = 1.25;

const sandwichesText = document.getElementById("NOSdisplay");
const sandwichRateText = document.getElementById("SPSdisplay");
const bakeriesText = document.getElementById("NOBdisplay");
const loavesText = document.getElementById("LoavesDisplay");
const bakeryButton = document.getElementById("bakeryButton");

const FPS = 60;


// Method setup

const Game = {

    owns: {
        deli: {
            name: "delis",
            count: 0,
            price: 10,
            rateFactor: 1
        },
    
        bakery: {
            name: "bakeries",
            count: 0,
            price: 5,
            rateFactor: 1.1
        }
    },
    
    inventory: {
        sandwich: {
            name: "sandwiches",
            count: 0,
            rate: 0
        },
    
        loaf: {
            name: "loaves of bread",
            count: 0,
            rate: 0
        },
    
        cheese: {
            name: "slices of cheese",
            count: 0,
            rate: 0
        }
    },

    updateRates() {
        this.inventory.loaf.rate = this.owns.bakery.count * this.owns.bakery.rateFactor;
        this.inventory.sandwich.rate = this.owns.deli.count * this.owns.deli.rateFactor;
        this.earn(this.inventory.sandwich.rate / FPS);
        this.earnLoaf(this.inventory.loaf.rate / FPS);
    },

    updateStats() {
        document.getElementById("NOSdisplay").innerHTML = Math.floor(this.inventory.sandwich.count).toString() + " sandwiches";
        document.getElementById("SPSdisplay").innerHTML = this.inventory.sandwich.rate.toString() + " sandwiches per second";
        
        document.getElementById("LoavesDisplay").innerHTML = Math.floor(this.inventory.loaf.count).toString() + " " + this.inventory.loaf.name;

        document.getElementById("bakeryButton").innerHTML = "Buy bakery (" + this.owns.bakery.price.toString() + ")";
        document.getElementById("NOBdisplay").innerHTML = Math.floor(this.owns.bakery.count).toString() + " " + this.owns.bakery.name;
        
        document.getElementById("deliButton").innerHTML = "Buy Deli (" + this.owns.deli.price.toString() + ")";
        document.getElementById("DeliDisplay").innerHTML = this.owns.deli.count.toString() + " " + this.owns.deli.name;
    },

    earn(amount) { this.inventory.sandwich.count += amount; },
    earnLoaf(amount) { this.inventory.loaf.count += amount; },
    earnBakery(amount) { this.owns.bakery.count += amount; },
    earnDeli(amount) { this.owns.deli.count += amount; },

    buyBakery(amount) {
        if (this.inventory.sandwich.count >= this.owns.bakery.price * amount) {
            this.inventory.sandwich.count -= this.owns.bakery.price * amount;
            this.earnBakery(amount);
            this.owns.bakery.price = Math.floor(this.owns.bakery.price * expFactor);
        }
    },

    buyDeli(amount) {
        if (this.inventory.sandwich.count >= this.owns.deli.price * amount) {
            this.inventory.sandwich.count -= this.owns.deli.price * amount;
            this.earnDeli(amount);
            this.owns.deli.price = Math.floor(this.owns.deli.price * expFactor);
        }
    }
};

function isInt(n) {
    return n % 1 === 0;
}

function upR() { Game.updateRates(); }
function upS() { Game.updateStats(); }

setInterval(upS, 1000 / FPS);
setInterval(upR, 1000 / FPS);

let t = 0;
function setPanzer() {
    t++;
    if (t === 6283) t = 0;
    document.getElementById("panzervier").style.transform = `translateY(${200*Math.sin(0.001*t)}px)`;
}
setInterval(setPanzer, 1000 / FPS);
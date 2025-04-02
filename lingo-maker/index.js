const numSelect = document.getElementById("icon-count");

const canvas = document.getElementById("kansas");
const ctx = canvas.getContext("2d");
const lingo2image = document.getElementById("lingo2icons");

var symbolCount = 1;

class Symbol {
    constructor(name, {nx, ny}) {
        this.name = name;
        this.spritePos = {x: nx, y: ny};
        this.index = 0;
    }

    draw() {
        var offset = 0;
        if (symbolCount == 1 || (symbolCount == 3 && this.index == 1)) {
            offset = 0;
        }
        else if (symbolCount == 2) {
            if (this.index == 0) offset = -50 - 5;
            else if (this.index == 1) offset = 50 + 5;
        }
        else if (symbolCount == 3) {
            if (this.index == 0) offset = -100 - 5;
            else if (this.index == 2) offset = 100 + 5;
        }

        ctx.drawImage(lingo2image,
            this.spritePos.x * 8,
            this.spritePos.y * 8,
            80, 80,
            150 + offset,
            150,
            100, 100
        );
    }
}

var lingo2symbols = [];
var lingo2names = [];

function setNames(symbolarr, namearr) {
    let arr = [];
    let names = [];
    for (let i = 2; i < arguments.length; i++) {
        names.push(arguments[i]);
        let row = Math.floor(i / 5);
        let column = i % 5;
        arr.push(new Symbol(arguments[i], {x: column, y: row}));
    }
    symbolarr = arr;
    namearr = names;
}

setNames(lingo2symbols, lingo2names,
    "sundae", "gemini", "gears", "pyramid", "box",
    "quake", "saturn", "magenta", "cross", "starstruck",
    "nullset", "scramble", "speaker", "northernlights", "smiley",
    "ultrahand", "pinky", "weird", "questionmark",

    "doubledot", "braket", "squiggle"
);

function drawIcon(name) {
    let index = lingo2names.findIndex((element) => { name == element });
    lingo2symbols[index].draw();
}

numSelect.onchange = (event) => {
    console.log(event.target.value);
    symbolCount = event.target.value;
    const container = document.getElementById("select-holder");
    container.innerHTML = "";

    for (let i = 0; i < event.target.value; i++) {
        const select = document.createElement("select");

        for (let j = 1; j <= 3; j++) {
            const option = document.createElement("option");
            option.value = `Option ${j}`;
            option.textContent = `Option ${j}`;
            select.appendChild(option);
        }

        container.appendChild(select);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = "#1e5c7d";
    ctx.fillRect(25, 25, 350, 350);
    drawIcon("sundae");
}
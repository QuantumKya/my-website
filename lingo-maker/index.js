const numSelect = document.getElementById("icon-count");
const clueText = document.getElementById("cluetext");
const ansText = document.getElementById("anstext");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lingo2image = document.getElementById("lingo2icons");

const container = document.getElementById("select-holder");

var symbolCount = 1;
var lingo2dict = {};

function setNames() {
    let newDict = {};
    for (let i = 0; i < arguments.length; i++) {
        let row = Math.floor(i / 5);
        let column = i % 5;
        newDict[arguments[i]] = {x: column, y: row};
    }
    lingo2dict = newDict;
}

setNames(
    "sundae", "gemini", "gears", "pyramid", "box",
    "quake", "saturn", "magenta", "cross", "starstruck",
    "nullset", "scramble", "speaker", "northernlights", "smiley",
    "ultrahand", "pinky", "weird", "questionmark",
);

function getOffset(i) {
    var offset = 0;
    if (symbolCount == 1) {
        offset = 0;
    }
    else if (symbolCount == 2) {
        if (i == 0) offset = -50 - 5;
        else if (i == 1) offset = 50 + 5;
    }
    else if (symbolCount == 3) {
        if (i == 0) offset = -100 - 10;
        else if (i == 2) offset = 100 + 10;
        else if (i == 1) offset = 0;
    }
    return offset;
}

function draw(x, y, i) {
    ctx.drawImage(lingo2image,
        x * 80,
        y * 80,
        80, 80,
        200 + getOffset(i),
        200,
        100, 100
    );
}

function drawNegative(i, high) {
    if (high) {
        ctx.drawImage(lingo2image,
            0 * 80,
            4 * 80,
            80, 80,
            200 + getOffset(i),
            100,
            100, 100
        );
    }
    else {
        ctx.drawImage(lingo2image,
            0 * 80,
            4 * 80,
            80, 80,
            200 + getOffset(i),
            130,
            100, 100
        );
    }
}
function drawSquiggle(i) {
    ctx.drawImage(lingo2image,
        1 * 80,
        4 * 80,
        80, 80,
        200 + getOffset(i),
        130,
        100, 100
    );
}
function drawDots(count, i) {
    for (let j = 0; j < count; j++) {
        let offset = 0;
        if (count == 1) {
            offset = 0;
        }
        else if (count == 2) {
            if (j == 0) offset = -25;
            else if (j == 1) offset = 15;
        }
        else if (count == 3) {
            if (j == 0) offset = -35;
            else if (j == 1) offset = -5;
            else if (j == 2) offset = 25;
        }
        ctx.drawImage(lingo2image,
            4 * 80,
            3 * 80,
            80, 80,
            200 + getOffset(i) + offset,
            270,
            100, 100
        );
    }
}

function drawIcon(name, index) {
    if (name == "braket") {
        drawNegative(index);
    }
    draw(lingo2dict[name].x, lingo2dict[name].y, index);
}


currySymbols = [];

numSelect.onchange = (event) => {
    console.log(event.target.value);
    symbolCount = event.target.value;
    container.innerHTML = "";

    currySymbols = [];
    for (let i = 0; i < symbolCount; i++) {
        const select = document.createElement("select");
        for (const key in lingo2dict) {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = key;
            select.appendChild(option);
        }
        select.id = i.toString();
        currySymbols[i] = {name: "sundae", neg: true, squiggle: true, dots: 0};

        container.appendChild(select);
    }

    for (let i = 0; i < symbolCount; i++) {
        container.children[i].onchange = (event) => {
            currySymbols[i].name = event.target.value;
        };
    }
};

var topText = "";
var btmText = "";

clueText.onchange = (event) => {
    topText = event.target.value;
};
ansText.onchange = (event) => {
    btmText = event.target.value;
};

function update() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = "#1e5c7d";
    ctx.fillRect(25, 25, 450, 450);
    for (let i = 0; i < currySymbols.length; i++) {
        drawIcon(currySymbols[i].name, i);
        if (currySymbols[i].neg && currySymbols[i].squiggle) {
            drawSquiggle(i);
            drawNegative(i, true);
        }
        else if (currySymbols[i].neg) {
            drawNegative(i, false);
        }
        else if (currySymbols[i].squiggle) {
            drawSquiggle(i);
        }
        drawDots(currySymbols[i].dots, i);
    }

    document.fonts.ready.then(() => {
        ctx.font = `${fontSize}px Lingo`;
        ctx.textAlign = "center";
        ctx.fillStyle = "white";

        let fontSize = 56;
        if (topText.length > 12) fontSize = 54 - (topText.length - 12) * 2;
        if (topText.length > 18) fontSize = 48 - Math.floor((topText.length - 12) * 1.5);
        ctx.fillText(topText, 250, 125);

        fontSize = 56;
        if (btmText.length > 12) fontSize = 54 - (btmText.length - 12) * 2;
        if (btmText.length > 18) fontSize = 48 - Math.floor((btmText.length - 12) * 1.5);
        ctx.fillText(btmText, 250, 375);
    })
    .catch(() => {
    console.log("Error");
    });
    
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
const numSelect = document.getElementById("icon-count");
const clueText = document.getElementById("cluetext");
const ansText = document.getElementById("anstext");

const dotter = document.getElementById("dotter");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lingo2image = document.getElementById("lingo2icons");

const container = document.getElementById("select-holder");


document.onload = (event) => {
    numSelect.value = 0;
    clueText.value = "";
    ansText.value = "";
}

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
    "ultrahand", "pinky", "pinkie (pie)", "questionmark",
    
    "double dot", "braket", "squiggle"
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

var symbolX = 210;
var symbolY = 210;

function draw(x, y, i) {
    ctx.drawImage(lingo2image,
        x * 80,
        y * 80,
        80, 80,
        symbolX + getOffset(i),
        symbolY,
        100, 100
    );
}

function drawNegative(i, high) {
    if (high) {
        ctx.drawImage(lingo2image,
            0 * 80,
            4 * 80,
            80, 80,
            symbolX + getOffset(i),
            symbolY - 100,
            100, 100
        );
    }
    else {
        ctx.drawImage(lingo2image,
            0 * 80,
            4 * 80,
            80, 80,
            symbolX + getOffset(i),
            symbolY - 70,
            100, 100
        );
    }
}
function drawSquiggle(i) {
    ctx.drawImage(lingo2image,
        1 * 80,
        4 * 80,
        80, 80,
        symbolX + getOffset(i),
        symbolY - 70,
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
            symbolX + getOffset(i) + offset,
            symbolY + 70,
            100, 100
        );
    }
}

function drawIcon(name, index) {
    draw(lingo2dict[name].x, lingo2dict[name].y, index);
}


var dottedPuzzle = false;
dotter.onchange = (event) => {
    dottedPuzzle = event.target.checked;
}

var currySymbols = [];

numSelect.onchange = (event) => {
    console.log(event.target.value);
    symbolCount = event.target.value;
    container.innerHTML = "";

    
    currySymbols = [];
    for (let i = 0; i < symbolCount; i++) {
        const theSpan = document.createElement("span");
        theSpan.classList.add("symbol-custom");
        const select = document.createElement("select");
        for (const key in lingo2dict) {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = key;
            select.appendChild(option);
        }
        select.id = i.toString();
        theSpan.appendChild(select);

        const negateSpan = document.createElement("span");
        const negateCheckbox = document.createElement("input");
        negateCheckbox.type = "checkbox";
        negateCheckbox.id = `neg-${i}`;
        const negateLabel = document.createElement("label");
        negateLabel.htmlFor = `neg-${i}`;
        negateLabel.textContent = "negated";
        negateSpan.appendChild(negateCheckbox);
        negateSpan.appendChild(negateLabel);

        const squiggleSpan = document.createElement("span");
        const squiggleCheckbox = document.createElement("input");
        squiggleCheckbox.type = "checkbox";
        squiggleCheckbox.id = `squiggle-${i}`;
        const squiggleLabel = document.createElement("label");
        squiggleLabel.htmlFor = `squiggle-${i}`;
        squiggleLabel.textContent = "squiggle";
        squiggleSpan.appendChild(squiggleCheckbox);
        squiggleSpan.appendChild(squiggleLabel);

        const dotSpan = document.createElement("span");
        const dotCount = document.createElement("input");
        dotCount.type = "number";
        dotCount.min = 0;
        dotCount.max = 3;
        dotCount.id = `dot-${i}`;
        const dotLabel = document.createElement("label");
        dotLabel.htmlFor = `dot-${i}`;
        dotLabel.textContent = "dots";
        dotSpan.appendChild(dotCount);
        dotSpan.appendChild(dotLabel);

        theSpan.appendChild(negateSpan);
        theSpan.appendChild(squiggleSpan);
        theSpan.appendChild(dotSpan);

        container.appendChild(theSpan);
        currySymbols[i] = {name: "sundae", neg: false, squiggle: false, dots: 0};
    }

    for (let i = 0; i < symbolCount; i++) {
        container.children[i].children[0].onchange = (event) => {
            currySymbols[i].name = event.target.value;
        };
        container.children[i].children[1].children[0].onchange = (event) => {
            currySymbols[i].neg = event.target.checked;
        };
        container.children[i].children[2].children[0].onchange = (event) => {
            currySymbols[i].squiggle = event.target.checked;
        };
        container.children[i].children[3].children[0].onchange = (event) => {
            currySymbols[i].dots = event.target.value;
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

    let fontSize = 56;
    ctx.font = `${fontSize}px Lingo`;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";

    if (topText.length > 12) fontSize = 54 - (topText.length - 12) * 2;
    if (topText.length > 18) fontSize = 48 - Math.floor((topText.length - 12) * 1.5);
    ctx.fillText(topText, 250, 125);

    fontSize = 56;
    if (btmText.length > 12) fontSize = 54 - (btmText.length - 12) * 2;
    if (btmText.length > 18) fontSize = 48 - Math.floor((btmText.length - 12) * 1.5);
    let str = "";
    for (let i = 0; i < btmText.length; i++) {
        if (btmText[i] == " ") str += " ";
        str += "-";
    }
    ctx.fillText(str, 250, 425);

    if (dottedPuzzle) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(250, 487.5, 5, 0, 360);
        ctx.closePath();
        ctx.fill();
    }
    
    requestAnimationFrame(update);
}

requestAnimationFrame(update);


function exportPuzzle() {
    const link = document.createElement("a");
    link.download = "puzzle.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}
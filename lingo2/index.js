const numSelect = document.getElementById("icon-count");
const clueText = document.getElementById("cluetext");
const ansText = document.getElementById("anstext");

const dotter = document.getElementById("dotter");
//const customer = document.getElementById("customcheck");
const pixler = document.getElementById("pixler");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
const lingo2image = document.getElementById("lingo2icons");
const customimage = document.getElementById("customicons");

const container = document.getElementById("select-holder");

/*
var customOn = false;
customer.onchange = (event) => {
    customOn = event.target.checked;
}
*/

var pixeled = true;
pixler.onchange = (event) => {
    pixeled = event.target.checked;
}


var symbolCount = 1;
var lingo2dict = {};
var customdict = {};
var symbolDict = {};

function setNames() {
    let newDict = {};
    for (let i = 0; i < 23; i++) {
        let row = Math.floor(i / 5);
        let column = i % 5;
        newDict[arguments[i]] = {x: column, y: row};
    }
    lingo2dict = newDict;

    let newNewDict = {};
    for (let i = 23; i < arguments.length; i++) {
        let row = Math.floor((i - 23) / 5);
        let column = (i - 23) % 5;
        newNewDict[arguments[i]] = {x: column, y: row};
    }
    customdict = newNewDict;

    let symDict = {};
    for (let i = 0; i < 23; i++) {
        symDict[arguments[i]] = String.fromCharCode(97 + i);
    }
    symbolDict = symDict;
}

setNames(
    "sundae", "gemini", "gears", "pyramid", "box",
    "quake", "saturn", "magenta", "cross", "starstruck",
    "nullset", "scramble", "speaker", "northernlights", "smiley",
    "ultrahand", "pinky", "pinkie (pie)", "questionmark",
    "dot", "braket", "squiggle", "empty",

    "katar", "parabox", "halo", "tuna"
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



function draw(x, y, i, c) {
    ctx.drawImage(c ? customimage : lingo2image,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i),
        symbolY,
        100, 100
    );
}

function drawNegative(i, high) {
    if (high) {
        ctx.drawImage(lingo2image,
            0 * 8,
            4 * 8,
            8, 8,
            symbolX + getOffset(i),
            symbolY - 100,
            100, 100
        );
    }
    else {
        ctx.drawImage(lingo2image,
            0 * 8,
            4 * 8,
            8, 8,
            symbolX + getOffset(i),
            symbolY - 70,
            100, 100
        );
    }
}
function drawSquiggle(i) {
    ctx.drawImage(lingo2image,
        1 * 8,
        4 * 8,
        8, 8,
        symbolX + getOffset(i),
        symbolY - 70,
        100, 100
    );
}
function drawHalo(i) {
    ctx.drawImage(customimage,
        2 * 8,
        0 * 8,
        8, 8,
        symbolX + getOffset(i),
        symbolY - 70,
        100, 100
    );
}
function drawTuna(i) {
    ctx.drawImage(customimage,
        3 * 8,
        0 * 8,
        8, 8,
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
            4 * 8,
            3 * 8,
            8, 8,
            symbolX + getOffset(i) + offset,
            symbolY + 70,
            100, 100
        );
    }
}

function drawIcon(name, index) {
    if (Object.hasOwn(lingo2dict, name)) draw(lingo2dict[name].x, lingo2dict[name].y, index, false);
    else draw(customdict[name].x, customdict[name].y, index, true);
}


function symbolIcon(name, index, dots) {
    ctx.fillStyle = "white";
    ctx.font = "132px Symbolingo";
    ctx.textAlign = "center";
    let text = "";
    if (dots > 0) text = symbolDict[name] + String.fromCharCode(787 + parseInt(dots));
    else text = symbolDict[name];
    ctx.fillText(text, symbolX + getOffset(index) + 44, symbolY + 88);
}
function symbolNegate(name, index, dots) {
    ctx.fillStyle = "white";
    ctx.font = "132px Symbolingo";
    ctx.textAlign = "center";
    let text = "";
    if (dots > 0) text = symbolDict[name] + String.fromCharCode(787 + parseInt(dots));
    else text = symbolDict[name];
    ctx.fillText(text + String.fromCharCode(787), symbolX + getOffset(index) + 44, symbolY + 88);
}
function symbolSquiggle(name, index, dots) {
    ctx.fillStyle = "white";
    ctx.font = "132px Symbolingo";
    ctx.textAlign = "center";
    let text = "";
    if (dots > 0) text = symbolDict[name] + String.fromCharCode(787 + parseInt(dots));
    else text = symbolDict[name];
    ctx.fillText(text + String.fromCharCode(786), symbolX + getOffset(index) + 44, symbolY + 88);
}
function symbolSquigation(name, index, dots) {
    ctx.fillStyle = "white";
    ctx.font = "132px Symbolingo";
    ctx.textAlign = "center";
    let text = "";
    if (dots > 0) text = symbolDict[name] + String.fromCharCode(787 + parseInt(dots));
    else text = symbolDict[name];
    ctx.fillText(text + String.fromCharCode(786) + String.fromCharCode(787), symbolX + getOffset(index) + 44, symbolY + 88);
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
        for (const key in customdict) {
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

        const haloSpan = document.createElement("span");
        const haloCheckbox = document.createElement("input");
        haloCheckbox.type = "checkbox";
        haloCheckbox.id = `halo-${i}`;
        const haloLabel = document.createElement("label");
        haloLabel.htmlFor = `halo-${i}`;
        haloLabel.textContent = "halo";
        haloSpan.appendChild(haloCheckbox);
        haloSpan.appendChild(haloLabel);

        const tunaSpan = document.createElement("span");
        const tunaCheckbox = document.createElement("input");
        tunaCheckbox.type = "checkbox";
        tunaCheckbox.id = `tuna-${i}`;
        const tunaLabel = document.createElement("label");
        tunaLabel.htmlFor = `tuna-${i}`;
        tunaLabel.textContent = "tuna";
        tunaSpan.appendChild(tunaCheckbox);
        tunaSpan.appendChild(tunaLabel);

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
        theSpan.appendChild(haloSpan);
        theSpan.appendChild(tunaSpan);
        theSpan.appendChild(dotSpan);

        container.appendChild(theSpan);
        currySymbols[i] = {name: "sundae", neg: false, squiggle: false, halo: false, tuna: false, dots: 0};
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
            currySymbols[i].halo = event.target.checked;
        };
        container.children[i].children[4].children[0].onchange = (event) => {
            currySymbols[i].tuna = event.target.checked;
        };
        container.children[i].children[5].children[0].onchange = (event) => {
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
        if (pixeled) {
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
            else if (currySymbols[i].halo) {
                drawHalo(i);
            }
            else if (currySymbols[i].tuna) {
                drawTuna(i);
            }
            drawDots(currySymbols[i].dots, i);
        }
        else {
            let dots = currySymbols[i].dots;
            if (currySymbols[i].neg && currySymbols[i].squiggle) {
                symbolSquigation(currySymbols[i].name, i, dots);
            }
            else if (currySymbols[i].neg) {
                symbolNegate(currySymbols[i].name, i, dots);
            }
            else if (currySymbols[i].squiggle) {
                symbolSquiggle(currySymbols[i].name, i, dots);
            }
            else {
                symbolIcon(currySymbols[i].name, i, dots);
            }
        }
    }

    let fontSize = 56;

    ctx.textAlign = "center";
    ctx.fillStyle = "white";

    fontSize = 56;
    if (topText.length > 12) fontSize = 54 - (topText.length - 12) * 2;
    if (topText.length > 18) fontSize = 48 - Math.floor((topText.length - 12) * 1.5);
    ctx.font = `${fontSize}px Lingo`;
    ctx.fillText(topText, 250, 125);

    fontSize = 56;
    if (btmText.length > 12) fontSize = 54 - (btmText.length - 12) * 2;
    if (btmText.length > 18) fontSize = 48 - Math.floor((btmText.length - 12) * 1.5);
    let str = "";
    for (let i = 0; i < btmText.length; i++) {
        if (btmText[i] == " ") str += " ";
        str += "-";
    }
    ctx.font = `${fontSize}px Lingo`;
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
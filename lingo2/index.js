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
const alphabet = document.getElementById("alphabet");

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

document.onload = () => {
    pixeled = true;
    pixler.setAttribute("checked", true);
    dottedPuzzle = false;
    dotter.setAttribute("checked", false);
    symbolCount = 1;
    numSelect.setAttribute("value", 1);
    
    topText = "clue";
    btmText = "answer";
    clueText.value = topText;
    ansText.value = btmText;
}


var symbolCount = 1;
var lingo2dict = {};
var customdict = {};
var letterdict = {};
var symbolDict = {};

function setNames() {
    let newDict = {};
    for (let i = 0; i < 23; i++) {
        let row = Math.floor(i / 5);
        let column = i % 5;
        newDict[arguments[i]] = {x: column, y: row};
    }
    lingo2dict = newDict;

    newDict = {};
    for (let i = 23; i < 49; i++) {
        let row = Math.floor((i - 23) / 5);
        let column = (i - 23) % 5;
        newDict[arguments[i]] = {x: column, y: row};
    }
    letterdict = newDict;

    newDict = {};
    for (let i = 49; i < arguments.length; i++) {
        let row = Math.floor((i - 49) / 5);
        let column = (i - 49) % 5;
        newDict[arguments[i]] = {x: column, y: row};
    }
    customdict = newDict;

    newDict = {};
    for (let i = 0; i < 23; i++) {
        newDict[arguments[i]] = String.fromCharCode(97 + i);
    }
    newDict[arguments[22]] = 't';
    for (let i = 23; i < 49; i++) {
        newDict[arguments[i]] = String.fromCharCode(65 + (i - 23));
    }
    symbolDict = newDict;
}

setNames(
    "sundae", "gemini", "gears", "pyramid", "box",
    "quake", "saturn", "magenta", "cross", "starstruck",
    "nullset", "scramble", "speaker", "northernlights", "smiley",
    "ultrahand", "pinky", "pinkie (pie)", "questionmark",
    "dot", "braket", "squiggle", "empty",

    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",

    "katar", "parabox", "halo", "tuna", "cymbal", "quatrefoil", "linkbetweenwords", "poketoads"
);

function getOffset(i) {
    const rdjt = -10;
    var offset = 0;
    if (symbolCount == 1) {
        offset = rdjt;
    }
    else if (symbolCount == 2) {
        if (i == 0) offset = -50 - 5 - 2 + rdjt;
        else if (i == 1) offset = 50 + 5 + 2 + rdjt;
    }
    else if (symbolCount == 3) {
        if (i == 0) offset = -100 - 10 - 4 + rdjt;
        else if (i == 1) offset = 0 + rdjt;
        else if (i == 2) offset = 100 + 10 + 4 + rdjt;
    }
    else if (symbolCount == 4) {
        if (i == 0) offset = -150 - 15 - 6 + rdjt;
        else if (i == 1) offset = -50 - 5 - 2 + rdjt;
        else if (i == 2) offset = 50 + 5 + 2 + rdjt;
        else if (i == 3) offset = 150 + 15 + 6 + rdjt;
    }
    return offset;
}

var symbolX = 210;
var symbolY = 225;


function drawFunc(x, y, i, map) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i),
        symbolY,
        104, 104
    );
}
function drawFuncO(x, y, i, map, offset) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i),
        symbolY + offset,
        104, 104
    );
}

function draw(x, y, i, c) {
    let map;
    switch(c) {
        case 0:
            map = lingo2image;
            break;
        case 1:
            map = customimage;
            break;
        case 2:
            map = alphabet;
            break;
        default:
            map = lingo2image;
            break;
    };
    drawFunc(x, y, i, map);
}

function drawNegative(i, high = 70) {
    drawFuncO(0, 4, i, lingo2image, -high);
}
function drawSquiggle(i) {
    drawFuncO(1, 4, i, lingo2image, -70);
}
function drawHalo(i) {
    drawFuncO(2, 0, i, customimage, -70);
}
function drawTuna(i) {
    drawFuncO(3, 0, i, customimage, -70);
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
        drawFuncO(4, 3, i, lingo2image, 70);
    }
}

function drawIcon(name, index) {
    if (Object.keys(lingo2dict).includes(name)) {
        draw(lingo2dict[name].x, lingo2dict[name].y, index, 0);
    } else if (Object.keys(customdict).includes(name)) {
        draw(customdict[name].x, customdict[name].y, index, 1);
    } else if (Object.keys(letterdict).includes(name)) {
        draw(letterdict[name].x, letterdict[name].y, index, 2);
    } else {
        console.error(`Icon "${name}" not found in any dictionary.`);
    }
}


function symbolDraw(text, index) {
    ctx.fillStyle = "white";
    ctx.font = "132px Symbolingo";
    ctx.textAlign = "center";
    ctx.fillText(text, symbolX + getOffset(index) + 44, symbolY + 88);
}

function symbolProc(name, dots, extraC = '') {
    let letter = Object.hasOwn(letterdict, name);
    let text = "";
    if (letter) {
        if (dots > 0) text = name.toUpperCase() + String.fromCharCode(787 + parseInt(dots)) + extraC;
        else text = name.toUpperCase() + extraC;
    }
    else {
        if (dots > 0) text = symbolDict[name] + String.fromCharCode(787 + parseInt(dots)) + extraC;
        else text = symbolDict[name] + extraC;
    }
    return text;
}

function symbolIcon(name, index, dots) {
    symbolDraw(symbolProc(name, dots), index);
}
function symbolNegate(name, index, dots) {
    symbolDraw(symbolProc(name, dots, String.fromCharCode(787)), index);
}
function symbolSquiggle(name, index, dots) {
    symbolDraw(symbolProc(name, dots, String.fromCharCode(786)), index);
}
function symbolSquigation(name, index, dots) {
    symbolDraw(symbolProc(name, dots, String.fromCharCode(786) + String.fromCharCode(787)), index);
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
        for (const key in letterdict) {
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
            if (currySymbols[i].neg) {
                if (currySymbols[i].squiggle) {
                    drawNegative(i, 100);
                }
                else if (currySymbols[i].halo || currySymbols[i].tuna) {
                    drawNegative(i, 115);
                }
                else if ((currySymbols[i].halo || currySymbols[i].tuna) && currySymbols[i].squiggle) {
                    drawNegative(i, 145);
                }
                else drawNegative(i, 70);
            }
            if (currySymbols[i].squiggle) {
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
        else str += "-";
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
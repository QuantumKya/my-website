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

const oldloadr = document.getElementById("oldfile");

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
    for (let i = 0; i < 24; i++) {
        let row = Math.floor(i / 5);
        let column = i % 5;
        newDict[arguments[i]] = {x: column, y: row};
    }
    lingo2dict = newDict;

    newDict = {};
    for (let i = 24; i < 50; i++) {
        let row = Math.floor((i - 24) / 5);
        let column = (i - 24) % 5;
        newDict[arguments[i]] = {x: column, y: row};
    }
    letterdict = newDict;

    newDict = {};
    for (let i = 50; i < arguments.length; i++) {
        let row = Math.floor((i - 50) / 5);
        let column = (i - 50) % 5;
        newDict[arguments[i]] = {x: column, y: row};
    }
    customdict = newDict;

    newDict = {};
    for (let i = 0; i < 24; i++) {
        newDict[arguments[i]] = String.fromCharCode(97 + i);
    }
    for (let i = 24; i < 50; i++) {
        newDict[arguments[i]] = String.fromCharCode(65 + (i - 24));
    }
    symbolDict = newDict;
}

setNames(
    "sundae", "gemini", "gears", "pyramid", "box",
    "quake", "saturn", "magenta", "cross", "starstruck",
    "nullset", "scramble", "speaker", "northernlights", "smiley",
    "ultrahand", "pinky", "pinkie (pie)", "questionmark",
    "dot", "braket", "squiggle", "divider", "empty",

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
function drawFuncD(x, y, i, map, offset) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i) + offset,
        symbolY + 70,
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
function drawHalo(i, high = 70) {
    drawFuncO(2, 0, i, customimage, -high);
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
            if (j == 0) offset = -20;
            else if (j == 1) offset = 20;
        }
        else if (count == 3) {
            if (j == 0) offset = -30;
            else if (j == 1) offset = 0;
            else if (j == 2) offset = 30;
        }
        else if (count == 4) {
            if (j == 0) offset = -45;
            else if (j == 1) offset = -15;
            else if (j == 2) offset = 15;
            else if (j == 3) offset = 45;
        }
        drawFuncD(4, 3, i, lingo2image, offset);
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


function symbolDraw(proc, index) {
    ctx.fillStyle = "white";
    ctx.font = "132px Symbolingo";
    ctx.textAlign = "center";
    ctx.fillText(proc.t, symbolX + getOffset(index) + 44 + proc.bumpR, symbolY + 88);
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
    return {t: text, bumpR: (dots == 2) ? 27 : 0};
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
function setGlyphs(isNew = false) {
    container.innerHTML = "";
    if (isNew) currySymbols = [];
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
        dotCount.max = 4;
        dotCount.id = `dot-${i}`;
        const dotLabel = document.createElement("label");
        dotLabel.htmlFor = `dot-${i}`;
        dotLabel.textContent = "dots";
        dotSpan.appendChild(dotCount);
        dotSpan.appendChild(dotLabel);

        /*
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete Glyph";
        */

        theSpan.appendChild(negateSpan);
        theSpan.appendChild(squiggleSpan);
        theSpan.appendChild(haloSpan);
        theSpan.appendChild(tunaSpan);
        theSpan.appendChild(dotSpan);
        // theSpan.appendChild(deleteButton);

        container.appendChild(theSpan);
        if (isNew) currySymbols[i] = {name: "sundae", neg: false, squiggle: false, halo: false, tuna: false, dots: 0};
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
        // container.children[i].children[6].onclick = removeGlyph(i);
    }
}

/*
function addGlyph() {
    symbolCount++;
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
    select.id = (symbolCount - 1).toString();
    select.onchange = (event) => {
        currySymbols[symbolCount - 1].name = event.target.value;
    };
    theSpan.appendChild(select);

    const negateSpan = document.createElement("span");
    const negateCheckbox = document.createElement("input");
    negateCheckbox.type = "checkbox";
    negateCheckbox.id = `neg-${symbolCount - 1}`;
    const negateLabel = document.createElement("label");
    negateLabel.htmlFor = `neg-${symbolCount - 1}`;
    negateLabel.textContent = "negated";

    negateCheckbox.onchange = (event) => {
        currySymbols[symbolCount - 1].neg = event.target.checked;
    };
    negateSpan.appendChild(negateCheckbox);
    negateSpan.appendChild(negateLabel);

    // ----------------------------------------------------

    const squiggleSpan = document.createElement("span");
    const squiggleCheckbox = document.createElement("input");
    squiggleCheckbox.type = "checkbox";
    squiggleCheckbox.id = `squiggle-${symbolCount - 1}`;
    const squiggleLabel = document.createElement("label");
    squiggleLabel.htmlFor = `squiggle-${symbolCount - 1}`;
    squiggleLabel.textContent = "squiggle";

    squiggleCheckbox.onchange = (event) => {
        currySymbols[symbolCount - 1].squiggle = event.target.checked;
    };
    squiggleSpan.appendChild(squiggleCheckbox);
    squiggleSpan.appendChild(squiggleLabel);

    // ----------------------------------------------------

    const haloSpan = document.createElement("span");
    const haloCheckbox = document.createElement("input");
    haloCheckbox.type = "checkbox";
    haloCheckbox.id = `halo-${symbolCount - 1}`;
    const haloLabel = document.createElement("label");
    haloLabel.htmlFor = `halo-${symbolCount - 1}`;
    haloLabel.textContent = "halo";

    haloCheckbox.onchange = (event) => {
        currySymbols[symbolCount - 1].halo = event.target.checked;
    };
    haloSpan.appendChild(haloCheckbox);
    haloSpan.appendChild(haloLabel);

    // ----------------------------------------------------

    const tunaSpan = document.createElement("span");
    const tunaCheckbox = document.createElement("input");
    tunaCheckbox.type = "checkbox";
    tunaCheckbox.id = `tuna-${symbolCount - 1}`;
    const tunaLabel = document.createElement("label");
    tunaLabel.htmlFor = `tuna-${symbolCount - 1}`;
    tunaLabel.textContent = "tuna";

    tunaCheckbox.onchange = (event) => {
        currySymbols[symbolCount - 1].tuna = event.target.checked;
    };
    tunaSpan.appendChild(tunaCheckbox);
    tunaSpan.appendChild(tunaLabel);

    // ----------------------------------------------------

    const dotSpan = document.createElement("span");
    const dotCount = document.createElement("input");
    dotCount.type = "number";
    dotCount.min = 0;
    dotCount.max = 4;
    dotCount.id = `dot-${symbolCount - 1}`;
    const dotLabel = document.createElement("label");
    dotLabel.htmlFor = `dot-${symbolCount - 1}`;
    dotLabel.textContent = "dots";

    dotCount.onchange = (event) => {
        currySymbols[symbolCount - 1].dots = event.target.value;
    };
    dotSpan.appendChild(dotCount);
    dotSpan.appendChild(dotLabel);

    // ----------------------------------------------------

    theSpan.appendChild(negateSpan);
    theSpan.appendChild(squiggleSpan);
    theSpan.appendChild(haloSpan);
    theSpan.appendChild(tunaSpan);
    theSpan.appendChild(dotSpan);

    container.appendChild(theSpan);
    currySymbols.push({name: "sundae", neg: false, squiggle: false, halo: false, tuna: false, dots: 0});
    symbolCount--;
}

function removeGlyph(index) {
    symbolCount--;
    currySymbols.splice(index, 1);
    container.removeChild(container.children[index]);
    setGlyphs();
}
*/

numSelect.onchange = (event) => {
    console.log(event.target.value);
    symbolCount = event.target.value;
    setGlyphs(true);
};

var topText = "";
var btmText = "";

clueText.onchange = (event) => {
    topText = event.target.value;
};
ansText.onchange = (event) => {
    btmText = event.target.value;
};


function DataBase64() {
    let data = {
        clue: topText,
        answer: btmText,
        symbol: symbolCount,
        symbolArr: currySymbols,
        dotted: dottedPuzzle,
        pixelMode: pixeled
    };
    navigator.clipboard.writeText(btoa(JSON.stringify(data)));
    alert("Puzzle copied to clipboard!");
}

function DataSmaller() {
    let data = `puzzlepuzzlepuzzle${topText}.${btmText}.${symbolCount}.`;
    for (symbol of currySymbols) {
        data += `${symbol.name}.${Number(symbol.neg)}.${Number(symbol.squiggle)}.${Number(symbol.halo)}.${Number(symbol.tuna)}.${symbol.dots}.`;
    }
    data += `${Number(dottedPuzzle)}.${Number(pixeled)}`;
    navigator.clipboard.writeText(btoa(data));
    alert("Puzzle copied to clipboard!");
}

function ParseSmaller(data) {
    const decodedData = atob(data);
    if (!decodedData.includes("puzzlepuzzlepuzzle")) {
        console.error("Invalid data format: Missing 'puzzlepuzzlepuzzle' marker.");
        return;
    }

    const text = decodedData.split("puzzlepuzzlepuzzle")[1];
    if (!text) {
        console.error("Invalid data format: No content after 'puzzlepuzzlepuzzle'.");
        return;
    }

    let parts = text.split('.');
    if (parts.length < 3) {
        console.error("Invalid data format: Insufficient parts in the data.");
        return;
    }

    topText = parts[0];
    btmText = parts[1];
    symbolCount = parseInt(parts[2]);
    currySymbols = [];
    let index = 3;
    for (let i = 0; i < symbolCount; i++) {
        currySymbols.push({
            name: parts[index++],
            neg: Boolean(parseInt(parts[index++])),
            squiggle: Boolean(parseInt(parts[index++])),
            halo: Boolean(parseInt(parts[index++])),
            tuna: Boolean(parseInt(parts[index++])),
            dots: parseInt(parts[index++])
        });
    }
    dottedPuzzle = Boolean(parseInt(parts[index++]));
    pixeled = Boolean(parseInt(parts[index++]));
    dotter.checked = dottedPuzzle;
    pixler.checked = pixeled;
    setGlyphs();
    for (let i = 0; i < symbolCount; i++) {
        container.children[i].children[0].value = currySymbols[i].name;
        container.children[i].children[1].children[0].checked = currySymbols[i].neg;
        container.children[i].children[2].children[0].checked = currySymbols[i].squiggle;
        container.children[i].children[3].children[0].checked = currySymbols[i].halo;
        container.children[i].children[4].children[0].checked = currySymbols[i].tuna;
        container.children[i].children[5].children[0].value = currySymbols[i].dots;
    }
}

function LoadPuzzle(data) {
    let json = JSON.parse(atob(data));
    topText = json.clue;
    btmText = json.answer;
    symbolCount = json.symbol;
    currySymbols = json.symbolArr;
    dottedPuzzle = json.dotted;
    dotter.checked = dottedPuzzle;
    pixeled = json.pixelMode;
    pixler.checked = pixeled;
    setGlyphs();
    for (let i = 0; i < symbolCount; i++) {
        container.children[i].children[0].value = currySymbols[i].name;
        container.children[i].children[1].children[0].checked = currySymbols[i].neg;
        container.children[i].children[2].children[0].checked = currySymbols[i].squiggle;
        container.children[i].children[3].children[0].checked = currySymbols[i].halo;
        container.children[i].children[4].children[0].checked = currySymbols[i].tuna;
        container.children[i].children[5].children[0].value = currySymbols[i].dots;
    }
}

async function convertOldNew() {
    if (!oldloadr.files || oldloadr.files.length === 0) {
        alert("No file selected. Please select a file to convert.");
        return;
    }
    const file = oldloadr.files[0];
    const text = await file.text();
    let olddata = text.trim().split('\n');
    
    for (let i = 0; i < olddata.length; i++) {
        if (olddata[i].trim() === "") {
            continue;
        }
        else if (!olddata[i].startsWith("eyJjbHV")) {
            const index = olddata[i].indexOf("eyJjbHV");
            if (index !== -1) {
                const line = olddata[i].substring(index);
                const linedata = JSON.parse(atob(line));
                let newline = `puzzlepuzzlepuzzle${linedata.clue}.${linedata.answer}.${linedata.symbol}.`;
                for (symbol of linedata.symbolArr) {
                    newline += `${symbol.name}.${Number(symbol.neg)}.${Number(symbol.squiggle)}.${Number(symbol.halo)}.${Number(symbol.tuna)}.${symbol.dots}.`;
                }
                newline += `${Number(linedata.dotted)}.${Number(linedata.pixelMode)}`;
                olddata[i] = olddata[i].replace(/eyJjbHV.*/, btoa(newline));
            } else {
                continue;
            }
        }

        const linedata = JSON.parse(atob(olddata[i]));
        let newline = `puzzlepuzzlepuzzle${linedata.clue}.${linedata.answer}.${linedata.symbol}.`;
        for (symbol of linedata.symbolArr) {
            newline += `${symbol.name}.${Number(symbol.neg)}.${Number(symbol.squiggle)}.${Number(symbol.halo)}.${Number(symbol.tuna)}.${symbol.dots}.`;
        }
        newline += `${Number(linedata.dotted)}.${Number(linedata.pixelMode)}`;
        olddata[i] = olddata[i].replace(/eyJjbHV.*/, btoa(newline));
    }
    
    const link = document.createElement("a");
    link.download = "newpack.txt";
    link.href = URL.createObjectURL(new Blob([olddata.join('\n')], { type: 'text/plain' }));
    link.click();
}

function update() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = "#1e5c7d";
    ctx.fillRect(25, 25, 450, 450);
    for (let i = 0; i < currySymbols.length; i++) {
        if (pixeled) {
            if (currySymbols[i].squiggle && currySymbols[i].neg) {
                symbolY = 225;
                drawNegative(i, 100);
            }
            else if (currySymbols[i].tuna && currySymbols[i].neg) {
                symbolY = 225;
                drawNegative(i, 115);
            }
            else if (currySymbols[i].halo && currySymbols[i].neg) {
                symbolY = 225;
                drawNegative(i, 115);
                drawHalo(i);
            }
            else if (currySymbols[i].neg) {
                symbolY = 225;
                drawNegative(i, 85);
            }
            else if (currySymbols[i].squiggle && currySymbols[i].halo) {
                symbolY = 225;
                drawHalo(i, 100);
            }
            else if (currySymbols[i].tuna && currySymbols[i].halo) {
                symbolY = 225;
                drawHalo(i, 115);
            }
            else if (currySymbols[i].halo) {
                symbolY = 225;
                drawHalo(i);
            }
            else symbolY = 210;
            if (currySymbols[i].squiggle) {
                symbolY = 225;
                drawSquiggle(i);
            }
            else if (currySymbols[i].tuna) {
                symbolY = 225;
                drawTuna(i);
            }
            drawDots(currySymbols[i].dots, i);
            drawIcon(currySymbols[i].name, i);
            symbolY = 210;
        }
        else {
            let dots = currySymbols[i].dots;
            if (currySymbols[i].neg && currySymbols[i].squiggle) {
                symbolY = 225;
                symbolSquigation(currySymbols[i].name, i, dots);
            }
            else if (currySymbols[i].neg) {
                symbolY = 225;
                symbolNegate(currySymbols[i].name, i, dots);
            }
            else if (currySymbols[i].squiggle) {
                symbolY = 225;
                symbolSquiggle(currySymbols[i].name, i, dots);
            }
            else {
                symbolY = 210;
                symbolIcon(currySymbols[i].name, i, dots);
            }
            symbolY = 210;
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
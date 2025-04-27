const numSelect = document.getElementById("icon-count");
const clueText = document.getElementById("cluetext");
const ansText = document.getElementById("anstext");

const dotter = document.getElementById("dotter");
//const customer = document.getElementById("customcheck");
const pixler = document.getElementById("pixler");
const reverser = document.getElementById("reverser");

const canvas = document.getElementById("kansas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
const lingo2image = document.getElementById("lingo2icons");
const customimage = document.getElementById("customicons");
const alphabet = document.getElementById("alphabet");

const container = document.getElementById("select-holder");

const oldloadr = document.getElementById("oldfile");

const maxWidth = 425;

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

var reversed = false;
reverser.onchange = (event) => {
    reversed = event.target.checked;
}

window.onload = () => {
    pixeled = true;
    pixler.checked = true;
    dottedPuzzle = false;
    dotter.checked = false;
    reversed = false;
    reverser.checked = false;
    symbolCount = 0;
    numSelect.setAttribute("value", 1);
    
    topText = "clue";
    btmText = "answer";
    clueText.value = topText;
    ansText.value = btmText;
}


var symbolCount = 0;
var lingo2dict = {};
var customdict = {};
var letterdict = {};
var symbolDict = {};

function setNames(a) {
    let newDict = {};
    const b = a + 1;
    for (let i = 0; i < b; i++) {
        let row = Math.floor(i / 5);
        let column = i % 5;
        newDict[arguments[i+1]] = {x: column, y: row};
    }
    lingo2dict = newDict;

    newDict = {};
    for (let i = 0; i < 26; i++) {
        let row = Math.floor(i / 5);
        let column = i % 5;
        newDict[arguments[i+b]] = {x: column, y: row};
    }
    letterdict = newDict;

    newDict = {};
    for (let i = 0; i < arguments.length - (b+26); i++) {
        let row = Math.floor(i / 5);
        let column = (i) % 5;
        newDict[arguments[i+b+26]] = {x: column, y: row};
    }
    customdict = newDict;

    newDict = {};
    for (let i = 0; i < b; i++) {
        newDict[arguments[i+1]] = String.fromCharCode(97 + i);
    }
    for (let i = 0; i < 26; i++) {
        newDict[arguments[i+b]] = String.fromCharCode(65 + i);
    }
    symbolDict = newDict;
}

setNames(25,
    "sundae", "gemini", "gears", "pyramid", "box",
    "quake", "saturn", "magenta", "cross", "starstruck",
    "nullset", "scramble", "speaker", "northernlights", "smiley",
    "ultrahand", "pinky", "pinkie (pie)", "questionmark",
    "dot", "braket", "squiggle", "divider", "walc", "empty",

    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",

    "katar", "parabox", "halo", "tuna", "cymbal",
    "quatrefoil", "linkbetweenwords", "poketoads", "golgiyoshi", "shell",
    "bitshiftL", "bitshiftR"
);
symbolDict["walc"] = "x";
symbolDict["empty"] = "y";

const symbolCustomMap = {
    "katar": 'È',
    "linkbetweenwords": 'É',
    "cymbal": 'Ê',
    "shell": 'Ë',
    "quatrefoil": 'Ì',
    "tuna": 'Í',
    "halo": 'Î'
};

var sprWidth = 104;
var dotHeight = 70;

function getOffset(i) {
    sprWidth = 104;
    dotHeight = 70;
    symbolY = 225;
    const rdjt = -10;
    let offset = 0;

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
    else if (symbolCount > 4) {
        let expectWidth = (sprWidth + 5) * symbolCount;
        while (expectWidth > maxWidth && sprWidth > 8) {
            sprWidth -= 8;
            expectWidth = (sprWidth + 5) * symbolCount;
        }
        const centerOffset = (symbolCount - 1) / 2;
        offset = (i - centerOffset) * (sprWidth + 5) + sprWidth / 4 + rdjt;
        symbolY = 225 + (symbolCount - 4) * 3;
        dotHeight = 70 - (symbolCount - 4) * 10;
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
        sprWidth, sprWidth
    );
}
function drawFuncO(x, y, i, map, offset) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i),
        symbolY + offset,
        sprWidth, sprWidth
    );
}
function drawFuncD(x, y, i, map, offset) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i) + offset,
        symbolY + dotHeight,
        sprWidth, sprWidth
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
        if (symbolCount > 4) offset *= 104 / ((symbolCount - 4 + 0.5) * sprWidth);
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


var symbolList = [];
function symbolProc(name, dots, extraC = '') {
    const letter = Object.hasOwn(letterdict, name);
    const custom = Object.hasOwn(symbolCustomMap, name);
    let text = "";
    if (letter) {
        if (dots > 0) text = name.toUpperCase() + String.fromCharCode(787 + parseInt(dots)) + extraC;
        else text = name.toUpperCase() + extraC;
    }
    else if (custom) {
        if (dots > 0) text = symbolCustomMap[name] + String.fromCharCode(787 + parseInt(dots)) + extraC;
        else text = symbolCustomMap[name] + extraC;
    }
    else {
        if (dots > 0) text = symbolDict[name] + String.fromCharCode(787 + parseInt(dots)) + extraC;
        else text = symbolDict[name] + extraC;
    }
    return text;
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
        for (const key in letterdict) {
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


function DataSmaller() {
    let data = `puzzlepuzzlepuzzle${topText}.${btmText.toLowerCase()}.${symbolCount}.`;
    for (symbol of currySymbols) {
        data += `${symbol.name}.${Number(symbol.neg)}.${Number(symbol.squiggle)}.${Number(symbol.halo)}.${Number(symbol.tuna)}.${symbol.dots}.`;
    }
    data += `${Number(dottedPuzzle)}.${Number(pixeled)}.${Number(reversed)}`;
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

    let index = 0;
    topText = parts[index++];
    btmText = parts[index++];
    symbolCount = parseInt(parts[index++]);
    currySymbols = [];
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
    if (parts.length >= index) reversed = Boolean(parseInt(parts[index++]));
    else reversed = false;
    dotter.checked = dottedPuzzle;
    pixler.checked = pixeled;
    reverser.checked = reversed;
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
        else {
            const linedata = JSON.parse(atob(olddata[i]));
            let newline = `puzzlepuzzlepuzzle${linedata.clue}.${linedata.answer}.${linedata.symbol}.`;
            for (symbol of linedata.symbolArr) {
                newline += `${symbol.name}.${Number(symbol.neg)}.${Number(symbol.squiggle)}.${Number(symbol.halo)}.${Number(symbol.tuna)}.${symbol.dots}.`;
            }
            newline += `${Number(linedata.dotted)}.${Number(linedata.pixelMode)}`;
            olddata[i] = olddata[i].replace(/eyJjbHV.*/, btoa(newline));
        }
    }
    
    const link = document.createElement("a");
    link.download = "newpack.txt";
    link.href = URL.createObjectURL(new Blob([olddata.join('\n')], { type: 'text/plain' }));
    link.click();
}

function update() {
    let fontSize = 56;

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
            const symbol = currySymbols[i];
            if (symbol.neg && symbol.squiggle) {
                symbolY = 225;
                symbolList[i] = symbolProc(currySymbols[i].name, dots, String.fromCharCode(786) + String.fromCharCode(787));
            }
            else if (symbol.neg && symbol.halo) {
                symbolY = 225;
                symbolList[i] = symbolProc(symbol.name, dots, String.fromCharCode(793) + String.fromCharCode(787));
            }
            else if (symbol.neg && symbol.tuna) {
                symbolY = 225;
                symbolList[i] = symbolProc(symbol.name, dots, String.fromCharCode(792) + String.fromCharCode(787));
            }
            else if (currySymbols[i].neg) {
                symbolY = 225;
                symbolList[i] = symbolProc(currySymbols[i].name, dots, String.fromCharCode(787));
            }
            else if (symbol.halo && symbol.squiggle) {
                symbolY = 225;
                symbolList[i] = symbolProc(symbol.name, dots, String.fromCharCode(786) + String.fromCharCode(793));
            }
            else if (symbol.halo && symbol.tuna) {
                symbolY = 225;
                symbolList[i] = symbolProc(symbol.name, dots, String.fromCharCode(792) + String.fromCharCode(793));
            }
            else if (symbol.squiggle) {
                symbolY = 225;
                symbolList[i] = symbolProc(symbol.name, dots, String.fromCharCode(786));
            }
            else if (symbol.halo) {
                symbolY = 225;
                symbolList[i] = symbolProc(symbol.name, dots, String.fromCharCode(793));
            }
            else if (symbol.tuna) {
                symbolY = 225;
                symbolList[i] = symbolProc(symbol.name, dots, String.fromCharCode(792));
            }
            else {
                symbolY = 210;
                symbolList[i] = symbolProc(symbol.name, dots);
            }
            symbolY = 210;

            let symbolsFinal = symbolList.join('');

            ctx.fillStyle = "white";
            fontSize = 132;
            ctx.font = `${fontSize}px Symbolingo`;
            let textWidth = ctx.measureText(symbolsFinal).width;
            while (textWidth > maxWidth && fontSize > 0) {
                fontSize--;
                ctx.font = `${fontSize}px Symbolingo`;
                textWidth = ctx.measureText(symbolsFinal).width;
            }
            ctx.textAlign = "center";
            ctx.fillText(symbolsFinal, canvas.width / 2, 300);
        }
    }

    ctx.textAlign = "center";
    ctx.fillStyle = "white";

    fontSize = 56;
    ctx.font = `${fontSize}px Lingo`;
    let textWidth = ctx.measureText(topText).width;
    while (textWidth > maxWidth && fontSize > 0) {
        fontSize--;
        ctx.font = `${fontSize}px Lingo`;
        textWidth = ctx.measureText(topText).width;
    }
    let str = "";
    if (reversed) for (let i = 0; i < topText.length; i++) {
        if (topText[i] == " ") str += " ";
        else str += "-";
    }
    else str = topText;
    ctx.fillText(str, 250, 125);

    fontSize = 56;
    textWidth = ctx.measureText(btmText).width;
    while (textWidth > maxWidth && fontSize > 0) {
        fontSize--;
        ctx.font = `${fontSize}px Lingo`;
        textWidth = ctx.measureText(btmText).width;
    }
    str = "";
    if (!reversed) for (let i = 0; i < btmText.length; i++) {
        if (btmText[i] == " ") str += " ";
        else str += "-";
    }
    else str = btmText;
    ctx.font = `${fontSize}px Lingo`;
    ctx.fillText(str, 250, 425);

    if (dottedPuzzle) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(250, 487.5, 5, 0, 360);
        ctx.closePath();
        ctx.fill();
    }

    console.log(canvas.id);
    requestAnimationFrame(update);
}

requestAnimationFrame(update);


function exportPuzzle() {
    const link = document.createElement("a");
    link.download = "puzzle.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}
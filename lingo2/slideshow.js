const fileLoader = document.getElementById("chainfile");
const base64text = document.getElementById("64file");

const canvas = document.getElementById("kansas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
const lingo2image = document.getElementById("lingo2icons");
const customimage = document.getElementById("customicons");
const alphabet = document.getElementById("alphabet");

const currentSlide = document.getElementById("currentslide");
const slideNumber = document.getElementById("slideindex");
const imageHolder = document.getElementById("imageholder");

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

function getOffset(i, symbolCount) {
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


let finalData = [];
let totalSlides = 0;
let currentSlideIndex = 0;

let symbolX = 210;
let symbolY = 210;
function drawFunc(x, y, i, map, dataObj) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i, dataObj.symbolCount),
        symbolY,
        104, 104
    );
}
function drawFuncO(x, y, i, map, offset, dataObj) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i, dataObj.symbolCount),
        symbolY + offset,
        104, 104
    );
}
function drawFuncD(x, y, i, map, offset, dataObj) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i, dataObj.symbolCount) + offset,
        symbolY + 70,
        104, 104
    );
}

function draw(x, y, i, c, dataObj) {
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
    drawFunc(x, y, i, map, dataObj);
}

function drawNegative(i, high = 70, dataObj) {
    drawFuncO(0, 4, i, lingo2image, -high, dataObj);
}
function drawSquiggle(i, dataObj) {
    drawFuncO(1, 4, i, lingo2image, -70, dataObj);
}
function drawHalo(i, high = 70, dataObj) {
    drawFuncO(2, 0, i, customimage, -high, dataObj);
}
function drawTuna(i, dataObj) {
    drawFuncO(3, 0, i, customimage, -70, dataObj);
}
function drawDots(count, i, dataObj) {
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
        drawFuncD(4, 3, i, lingo2image, offset, dataObj);
    }
}

function drawIcon(name, index, dataObj) {
    if (Object.keys(lingo2dict).includes(name)) {
        draw(lingo2dict[name].x, lingo2dict[name].y, index, 0, dataObj);
    } else if (Object.keys(customdict).includes(name)) {
        draw(customdict[name].x, customdict[name].y, index, 1, dataObj);
    } else if (Object.keys(letterdict).includes(name)) {
        draw(letterdict[name].x, letterdict[name].y, index, 2, dataObj);
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

var chain = false;

function LoadPuzzle(data, fullObj) {
    let json = JSON.parse(atob(data));
    fullObj.topText = json.clue;
    fullObj.ans = json.answer;
    fullObj.btmText = json.answer.replace(/[^\s]/g, '-');
    fullObj.symbolCount = json.symbol;
    fullObj.curryArr = json.symbolArr;
    fullObj.dottedPuzzle = json.dotted;
    fullObj.pixeled = json.pixelMode;
    fullObj.solved = false;
    fullObj.firstLetter = false;
}

function DrawAll(dataObj, primary = false) {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 500, 500);
    if (!dataObj.solved) ctx.fillStyle = "#1e5c7d";
    else ctx.fillStyle = "#138012";
    ctx.fillRect(25, 25, 450, 450);
    for (let i = 0; i < dataObj.curryArr.length; i++) {
        if (dataObj.pixeled) {
            if (dataObj.curryArr[i].squiggle && dataObj.curryArr[i].neg) {
                symbolY = 225;
                drawNegative(i, 85, dataObj);
            }
            else if ((dataObj.curryArr[i].halo || dataObj.curryArr[i].tuna) && dataObj.curryArr[i].neg) {
                symbolY = 225;--
                drawNegative(i, 115, dataObj);
                if (dataObj.curryArr[i].halo) drawHalo(i, dataObj);
            }
            else if (dataObj.curryArr[i].neg) {
                symbolY = 225;
                drawNegative(i, 85, dataObj);
            }
            else if (dataObj.curryArr[i].squiggle && dataObj.curryArr[i].halo) {
                symbolY = 225;
                drawHalo(i, 85, dataObj);
            }
            else if (dataObj.curryArr[i].tuna && dataObj.curryArr[i].halo) {
                symbolY = 225;
                drawHalo(i, 115, dataObj);
            }
            else if (dataObj.curryArr[i].halo) {
                symbolY = 225;
                drawHalo(i, dataObj);
            }
            if (dataObj.curryArr[i].squiggle) {
                symbolY = 225;
                drawSquiggle(i, dataObj);
            }
            else if (dataObj.curryArr[i].tuna) {
                symbolY = 225;
                drawTuna(i, dataObj);
            }
            else symbolY = 210;
            drawDots(dataObj.curryArr[i].dots, i, dataObj);
            drawIcon(dataObj.curryArr[i].name, i, dataObj);
            symbolY = 210;
        }
        else {
            let dots = dataObj.curryArr[i].dots;
            if (dataObj.curryArr[i].neg && dataObj.curryArr[i].squiggle) {
                symbolY = 225;
                symbolSquigation(dataObj.curryArr[i].name, i, dots);
            }
            else if (dataObj.curryArr[i].neg) {
                symbolY = 225;
                symbolNegate(dataObj.curryArr[i].name, i, dots);
            }
            else if (dataObj.curryArr[i].squiggle) {
                symbolY = 225;
                symbolSquiggle(dataObj.curryArr[i].name, i, dots);
            }
            else {
                symbolY = 210;
                symbolIcon(dataObj.curryArr[i].name, i, dots);
            }
            symbolY = 210;
        }
    }

    let fontSize = 56;

    ctx.textAlign = "center";
    ctx.fillStyle = "white";

    fontSize = 56;
    if (dataObj.topText.length > 12) fontSize = 54 - (dataObj.topText.length - 12) * 2;
    if (dataObj.topText.length > 18) fontSize = 48 - Math.floor((dataObj.topText.length - 12) * 1.5);
    ctx.font = `${fontSize}px Lingo`;
    /*
    if (chain) {
        if (primary);
        else dataObj.topText = dataObj.topText.replace(/[^\s]/g, '-');
    }
    else;
    */
    ctx.fillText(dataObj.topText, 250, 125);

    fontSize = 56;
    if (dataObj.ans.length > 12) fontSize = 54 - (dataObj.ans.length - 12) * 2;
    if (dataObj.ans.length > 18) fontSize = 48 - Math.floor((dataObj.ans.length - 12) * 1.5);
    ctx.font = `${fontSize}px Lingo`;
    ctx.fillText(dataObj.btmText, 250, 425);

    if (dataObj.dottedPuzzle) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(250, 487.5, 5, 0, 360);
        ctx.closePath();
        ctx.fill();
    }
}

const images = [];

async function LoadPuzzleFile() {
    singleMode = false;
    currentSlideIndex = 0;
    totalSlides = 0;
    const file = fileLoader.files[0];
    let text = await file.text();
    text = text.split("\n").join(" ");
    let data = text.split(" ");
    totalSlides = data.length - 1;

    finalData = [];
    for (let i = 0; i < data.length - 1; i++) {
        finalData[i] = {
            topText: "",
            ans: "",
            btmText: "",
            symbolCount: 0,
            curryArr: [],
            dottedPuzzle: false,
            pixeled: false,
            solved: false
        };
        LoadPuzzle(data[i], finalData[i]);
        DrawAll(finalData[i], (i == 0));
        const slide = new Image();
        slide.src = canvas.toDataURL("image/png");
        images[i] = slide.src;
    }
    chain = data[data.length - 1] == 0 ? false : true;

    slideNumber.innerHTML = `${currentSlideIndex+1}/${totalSlides}`;
    currentSlide.src = images[currentSlideIndex];
    currentSlide.style.display = "block";
}

var singleMode = false;
function LoadPuzzle64() {
    singleMode = true;
    currentSlideIndex = 0;
    totalSlides = 1;
    const b64 = base64text.value;
    finalData = {
        topText: "",
        ans: "",
        btmText: "",
        symbolCount: 0,
        curryArr: [],
        dottedPuzzle: false,
        pixeled: false,
        solved: false
    };
    LoadPuzzle(b64, finalData);
    DrawAll(finalData);
    const slide = new Image();
    slide.src = canvas.toDataURL("image/png");
    images[0] = slide.src;
    currentSlideIndex = 0;

    slideNumber.innerHTML = `${currentSlideIndex+1}/${totalSlides}`;
    currentSlide.src = images[0];
    currentSlide.style.display = "block";
}

var currentChar = 0;

function updatePanel(index) {
    if (singleMode) {
        DrawAll(finalData);
        const updatedSlide = new Image();
        updatedSlide.src = canvas.toDataURL("image/png");
        images[0] = updatedSlide.src;
    }
    else {
        DrawAll(finalData[index]);
        const updatedSlide = new Image();
        updatedSlide.src = canvas.toDataURL("image/png");
        images[index] = updatedSlide.src;
    }
}

document.addEventListener('keydown', (event) => {
    if (!singleMode) {
        if (event.code == 'ArrowRight') {
            currentSlideIndex += 1;
            if (currentSlideIndex == totalSlides) currentSlideIndex = 0;
        }
        else if (event.code == 'ArrowLeft') {
            currentSlideIndex -= 1;
            if (currentSlideIndex == -1) currentSlideIndex = totalSlides - 1;
        }
    }

    const key = event.key;
    if (singleMode) {
        if (event.code.startsWith('Key') || event.code === 'Space') {
            let bT = finalData.btmText;
            finalData.btmText = bT.slice(0, currentChar) + key + bT.slice(currentChar + 1);
            if (currentChar < finalData.ans.length - 1) currentChar += 1;
            if (finalData.btmText == finalData.ans) {
                finalData.solved = true;
            }
            else {
                finalData.solved = false;
            }
            updatePanel(0);
        }
        else if (event.code === 'Backspace') {
            let bT = finalData.btmText;
            finalData.btmText = bT.slice(0, currentChar) + '-' + bT.slice(currentChar + 1);
            if (currentChar >= 1) currentChar -= 1;
            finalData.solved = false;
            updatePanel(0);
        }
        
        if (event.code === 'CapsLock') {
            finalData.btmText = finalData.ans[0] + finalData.btmText.slice(1);
            currentChar = 1;
            updatePanel(0);
        }
    }
    else {
        if (event.code.startsWith('Key') || event.code === 'Space') {
            let bT = finalData[currentSlideIndex].btmText;
            finalData[currentSlideIndex].btmText = bT.slice(0, currentChar) + key + bT.slice(currentChar + 1);
            if (currentChar < finalData[currentSlideIndex].ans.length - 1) currentChar += 1;
            if (finalData[currentSlideIndex].btmText == finalData[currentSlideIndex].ans) {
                finalData[currentSlideIndex].solved = true;
            }
            else {
                finalData[currentSlideIndex].solved = false;
            }
            updatePanel(currentSlideIndex);
        }
        else if (event.code === 'Backspace') {
            let bT = finalData[currentSlideIndex].btmText;
            finalData[currentSlideIndex].btmText = bT.slice(0, currentChar) + '-' + bT.slice(currentChar + 1);
            if (currentChar >= 1) currentChar -= 1;
            finalData[currentSlideIndex].solved = false;
            updatePanel(currentSlideIndex);
        }

        if (event.code === 'CapsLock') {
            finalData[currentSlideIndex].btmText = finalData[currentSlideIndex].ans[0] + finalData[currentSlideIndex].btmText.slice(1);
            currentChar = 1;
            updatePanel(currentSlideIndex);
        }
    }

    slideNumber.innerHTML = `${currentSlideIndex+1}/${totalSlides}`;
    currentSlide.src = images[currentSlideIndex];
    currentSlide.style.display = "block";
});
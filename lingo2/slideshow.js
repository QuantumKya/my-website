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
const correctNumber = document.getElementById("correctcount");
const imageHolder = document.getElementById("imageholder");

const maxWidth = 425;

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

    "katar", "parabox", "halo", "tuna", "cymbal", "quatrefoil", "linkbetweenwords", "poketoads", "golgiyoshi", "shell"
);

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
    const data = finalData[currentSlideIndex];
    sprWidth = 104;
    dotHeight = 70;
    symbolY = 225;
    const rdjt = -10;
    let offset = 0;
    if (data.symbolCount == 1) {
        offset = rdjt;
    }
    else if (data.symbolCount == 2) {
        if (i == 0) offset = -50 - 5 - 2 + rdjt;
        else if (i == 1) offset = 50 + 5 + 2 + rdjt;
    }
    else if (data.symbolCount == 3) {
        if (i == 0) offset = -100 - 10 - 4 + rdjt;
        else if (i == 1) offset = 0 + rdjt;
        else if (i == 2) offset = 100 + 10 + 4 + rdjt;
    }
    else if (data.symbolCount == 4) {
        if (i == 0) offset = -150 - 15 - 6 + rdjt;
        else if (i == 1) offset = -50 - 5 - 2 + rdjt;
        else if (i == 2) offset = 50 + 5 + 2 + rdjt;
        else if (i == 3) offset = 150 + 15 + 6 + rdjt;
    }
    else if (data.symbolCount > 4) {
        let expectWidth = (sprWidth + 5) * data.symbolCount;
        while (expectWidth > maxWidth && sprWidth > 8) {
            sprWidth -= 8;
            expectWidth = (sprWidth + 5) * data.symbolCount;
        }
        const centerOffset = (data.symbolCount - 1) / 2;
        offset = (i - centerOffset) * (sprWidth + 5) + sprWidth / 4 + rdjt;
        symbolY = 225 + (data.symbolCount - 4) * 3;
        dotHeight = 70 - (data.symbolCount - 4) * 10;
    }
    return offset;
}


var finalData = [];
var totalSlides = 0;
var currentSlideIndex = 0;

var symbolX = 210;
var symbolY = 210;
function drawFunc(x, y, i, map) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i, finalData[currentSlideIndex].symbolCount),
        symbolY,
        sprWidth, sprWidth
    );
}
function drawFuncO(x, y, i, map, offset) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i, finalData[currentSlideIndex].symbolCount),
        symbolY + offset,
        sprWidth, sprWidth
    );
}
function drawFuncD(x, y, i, map, offset) {
    ctx.drawImage(map,
        x * 8,
        y * 8,
        8, 8,
        symbolX + getOffset(i, finalData[currentSlideIndex].symbolCount) + offset,
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
    const data = finalData[currentSlideIndex];
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
        if (data.symbolCount > 4) offset *= 104 / ((data.symbolCount - 4 + 0.5) * sprWidth);
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
    return {t: text, bumpR: (dots == 2) ? 27 : 0};
}


function LoadPuzzle(data, fullObj) {
    let json = JSON.parse(atob(data));
    fullObj.clue = json.clue.toLowerCase();
    fullObj.topText = json.clue.replace(/[^\s]/g, '-');
    fullObj.ans = json.answer.toLowerCase();
    fullObj.btmText = json.answer.replace(/[^\s]/g, '-');
    fullObj.symbolCount = json.symbol;
    fullObj.curryArr = json.symbolArr;
    fullObj.dottedPuzzle = json.dotted;
    fullObj.pixeled = json.pixelMode;
    fullObj.reversed = Object.hasOwn(json, "reversed") ? json.reversed : false;
    fullObj.solved = false;
    fullObj.currentChar = 0;
}

function DrawAll() {
    const dataObj = finalData[currentSlideIndex];
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 500, 500);
    if (!dataObj.solved) ctx.fillStyle = "#1e5c7d";
    else ctx.fillStyle = "#138012";
    ctx.fillRect(25, 25, 450, 450);
    for (let i = 0; i < dataObj.curryArr.length; i++) {
        const symbol = dataObj.curryArr[i];
        const dots = symbol.dots;
        if (dataObj.pixeled) {
            if (symbol.squiggle && symbol.neg) {
                symbolY = 225;
                drawNegative(i, 100);
            }
            else if (symbol.tuna && symbol.neg) {
                symbolY = 225;
                drawNegative(i, 115);
            }
            else if (symbol.halo && symbol.neg) {
                symbolY = 225;
                drawNegative(i, 115);
                drawHalo(i);
            }
            else if (symbol.neg) {
                symbolY = 225;
                drawNegative(i, 85);
            }
            else if (symbol.squiggle && symbol.halo) {
                symbolY = 225;
                drawHalo(i, 100);
            }
            else if (symbol.tuna && symbol.halo) {
                symbolY = 225;
                drawHalo(i, 115);
            }
            else if (symbol.halo) {
                symbolY = 225;
                drawHalo(i);
            }
            else symbolY = 210;
            if (symbol.squiggle) {
                symbolY = 225;
                drawSquiggle(i);
            }
            else if (symbol.tuna) {
                symbolY = 225;
                drawTuna(i);
            }
            drawDots(dots, i);
            drawIcon(symbol.name, i);
            symbolY = 210;
        }
        else {
            if (symbol.neg && symbol.squiggle) {
                symbolY = 225;
                symbolDraw(symbolProc(symbol.name, dots, String.fromCharCode(786) + String.fromCharCode(787)), i);
            }
            else if (symbol.neg && symbol.halo) {
                symbolY = 225;
                symbolDraw(symbolProc(symbol.name, dots, String.fromCharCode(793) + String.fromCharCode(787)), i);
            }
            else if (symbol.neg && symbol.tuna) {
                symbolY = 225;
                symbolDraw(symbolProc(symbol.name, dots, String.fromCharCode(792) + String.fromCharCode(787)), i);
            }
            else if (symbol.neg) {
                symbolY = 225;
                symbolDraw(symbolProc(symbol.name, dots, String.fromCharCode(787)), i);
            }
            else if (symbol.halo && symbol.squiggle) {
                symbolY = 225;
                symbolDraw(symbolProc(symbol.name, dots, String.fromCharCode(786) + String.fromCharCode(793)), i);
            }
            else if (symbol.halo && symbol.tuna) {
                symbolY = 225;
                symbolDraw(symbolProc(symbol.name, dots, String.fromCharCode(792) + String.fromCharCode(793)), i);
            }
            else if (symbol.squiggle) {
                symbolY = 225;
                symbolDraw(symbolProc(symbol.name, dots, String.fromCharCode(786)), i);
            }
            else if (symbol.halo) {
                symbolY = 225;
                symbolDraw(symbolProc(symbol.name, dots, String.fromCharCode(793)), i);
            }
            else if (symbol.tuna) {
                symbolY = 225;
                symbolDraw(symbolProc(symbol.name, dots, String.fromCharCode(792)), i);
            }
            else {
                symbolY = 210;
                symbolDraw(symbolProc(symbol.name, dots), i);
            }
            symbolY = 210;
        }
    }


    let fontSize = 56;

    ctx.textAlign = "center";
    ctx.fillStyle = "white";

    fontSize = 56;
    ctx.font = `${fontSize}px Lingo`;
    let textWidth = ctx.measureText(dataObj.topText).width;
    while (textWidth > maxWidth && fontSize > 0) {
        fontSize--;
        ctx.font = `${fontSize}px Lingo`;
        textWidth = ctx.measureText(dataObj.topText).width;
    }
    let str = "";
    ctx.fillText(dataObj.topText, 250, 125);

    fontSize = 56;
    textWidth = ctx.measureText(dataObj.btmText).width;
    while (textWidth > maxWidth && fontSize > 0) {
        fontSize--;
        ctx.font = `${fontSize}px Lingo`;
        textWidth = ctx.measureText(dataObj.btmText).width;
    }
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

var singleMode = false;
async function LoadPuzzleFile() {
    singleMode = false;
    currentSlideIndex = 0;
    totalSlides = 0;
    const file = fileLoader.files[0];
    let text = await file.text();
    let data = text.trim().split("\n"); // Trim and split by lines

    let total = 0;

    finalData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].trim() === "") {
            data.splice(i, 1);
            i--;
            continue;
        }
        else if (!data[i].startsWith("eyJjbHV")) {
            const index = data[i].indexOf("eyJjbHV");
            if (index !== -1) {
                data[i] = data[i].substring(index);
            } else {
                data.splice(i, 1);
                i--;
                continue;
            }
        }
        total++;
        finalData[i] = {
            clue: "",
            topText: "",
            ans: "",
            btmText: "",
            symbolCount: 0,
            curryArr: [],
            dottedPuzzle: false,
            pixeled: false,
            solved: false,
            reversed: false,
            currentChar: 0,
        };
        LoadPuzzle(data[i], finalData[i]);
        DrawAll();
        const slide = new Image();
        slide.src = canvas.toDataURL("image/png");
        images[i] = slide.src;
    }
    totalSlides = total;

    slideNumber.innerHTML = `${currentSlideIndex+1}/${totalSlides}`;
    currentSlide.src = images[currentSlideIndex];
    currentSlide.style.display = "block";
}

async function FormatData() {
    const inputter = document.getElementById("formatter");
    const file = inputter.files[0];
    const data = await file.text();
    let dataArr = data.split('\n');
    for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].trim() === "") {
            dataArr.splice(i, 1);
            i--;
        }
        if (!dataArr[i].trim().startsWith("cHV6emxlcHV6emxlcHV6emxl")) {
            let index = dataArr[i].indexOf("cHV6emxlcHV6emxlcHV6emxl");
            dataArr[i] = dataArr[i].substring(index);
        }
    }

    const link = document.createElement("a");
    link.download = "formatted.txt";
    link.href = URL.createObjectURL(new Blob([dataArr.join('\n')], { type: 'text/plain' }));
    link.click();
}

function LoadSmaller(data = base64text.value) {
    singleMode = true;
    currentSlideIndex = 0;
    totalSlides = 1;
    correctCount = 0;
    finalData[0] = {
        clue: "",
        topText: "",
        ans: "",
        btmText: "",
        symbolCount: 0,
        curryArr: [],
        dottedPuzzle: false,
        pixeled: false,
        solved: false,
        reversed: false,
        currentChar: 0,
    };
    ParseSmaller(data, finalData[0]);
    DrawAll(finalData[0]);
    const slide = new Image();
    slide.src = canvas.toDataURL("image/png");
    images[0] = slide.src;

    slideNumber.innerHTML = `${currentSlideIndex+1}/${totalSlides}`;
    currentSlide.src = images[0];
    currentSlide.style.display = "block";
}

function ParseSmaller(data, target) {
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

    target.clue = parts[0]
    target.ans = parts[1];
    target.symbolCount = parseInt(parts[2]);
    target.curryArr = [];
    let index = 3;
    for (let i = 0; i < target.symbolCount; i++) {
        target.curryArr.push({
            name: parts[index++],
            neg: Boolean(parseInt(parts[index++])),
            squiggle: Boolean(parseInt(parts[index++])),
            halo: Boolean(parseInt(parts[index++])),
            tuna: Boolean(parseInt(parts[index++])),
            dots: parseInt(parts[index++])
        });
    }
    target.dottedPuzzle = Boolean(parseInt(parts[index++]));
    target.pixeled = Boolean(parseInt(parts[index++]));

    target.reversed = parts.length > index ? Boolean(parseInt(parts[index++])) : false;
    target.topText = target.reversed ? parts[0].replace(/[^\s]/g, '-') : parts[0];
    target.btmText = target.reversed ? parts[1] : parts[1].replace(/[^\s]/g, '-');
}

async function LoadSmaller64() {
    singleMode = false;
    currentSlideIndex = 0;
    totalSlides = 0;
    correctCount = 0;
    const file = fileLoader.files[0];
    let text = await file.text();
    let data = text.trim().split("\n"); // Trim and split by lines

    let total = 0;

    finalData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].trim() === "") {
            data.splice(i, 1);
            i--;
            continue;
        }
        else if (!data[i].startsWith("cHV6emxlcHV6emxlcHV6emxl")) {
            const index = data[i].indexOf("cHV6emxlcHV6emxlcHV6emxl");
            if (index !== -1) {
                data[i] = data[i].substring(index);
            } else {
                data.splice(i, 1);
                i--;
                continue;
            }
        }
        total++;
        finalData[i] = {
            clue: "",
            topText: "",
            ans: "",
            btmText: "",
            symbolCount: 0,
            curryArr: [],
            dottedPuzzle: false,
            pixeled: false,
            reversed: false,
            solved: false,
            currentChar: 0
        };
        ParseSmaller(data[i], finalData[i]);
        DrawAll();
        const slide = new Image();
        slide.src = canvas.toDataURL("image/png");
        images[i] = slide.src;
    }
    totalSlides = total;

    slideNumber.innerHTML = `${currentSlideIndex+1}/${totalSlides}`;
    currentSlide.src = images[currentSlideIndex];
    currentSlide.style.display = "block";
}

function updatePanel() {
    DrawAll();
    const updatedSlide = new Image();
    updatedSlide.src = canvas.toDataURL("image/png");
    images[currentSlideIndex] = updatedSlide.src;
}

var correctCount = 0;

document.addEventListener('keydown', (event) => {
    let targetText = finalData[currentSlideIndex].reversed ? finalData[currentSlideIndex].topText : finalData[currentSlideIndex].btmText;

    if (!singleMode) {
        if (event.code == 'ArrowRight') {
            currentSlideIndex += 1;
            if (currentSlideIndex == totalSlides) currentSlideIndex = 0;
            updatePanel();
        }
        else if (event.code == 'ArrowLeft') {
            currentSlideIndex -= 1;
            if (currentSlideIndex == -1) currentSlideIndex = totalSlides - 1;
            updatePanel();
        }
    }


    const dataObj = finalData[currentSlideIndex];
    const key = event.key.toLowerCase();
    let bT = dataObj.reversed ? dataObj.topText : dataObj.btmText;
    const aT = dataObj.reversed ? dataObj.clue : dataObj.ans;

    if ((event.key.length === 1 && /^[a-zA-Z]$/.test(event.key)) || event.code === 'Space') {
        if (!event.shiftKey && !event.ctrlKey) event.preventDefault();
        targetText = bT.slice(0, dataObj.currentChar) + key + bT.slice(dataObj.currentChar + 1);
        if (dataObj.currentChar < aT.length - 1) dataObj.currentChar += 1;
        if (targetText == aT && !dataObj.solved) {
            dataObj.solved = true;
            correctCount += 1;
        }
        else if (targetText == aT && dataObj.solved);
        else {
            if (dataObj.solved) correctCount -= 1;
            dataObj.solved = false;
        }
    }
    else if (event.code === 'Backspace') {
        if (dataObj.currentChar >= 1 && bT[dataObj.currentChar] == '-' || bT[dataObj.currentChar] == ' ') dataObj.currentChar -= 1;

        if (aT[dataObj.currentChar] == ' ') targetText = bT.slice(0, dataObj.currentChar) + ' ' + bT.slice(dataObj.currentChar + 1);
        else targetText = bT.slice(0, dataObj.currentChar) + '-' + bT.slice(dataObj.currentChar + 1);
        if (dataObj.solved) {
            correctCount -= 1;
            dataObj.solved = false;
        }
    }

    if (event.code === 'CapsLock' || event.code =='Insert') {
        targetText = aT[0] + targetText.slice(1);
        if (aT.length > 1) dataObj.currentChar = 1;
    }

    if (dataObj.reversed) finalData[currentSlideIndex].topText = targetText;
    else finalData[currentSlideIndex].btmText = targetText;
    updatePanel();

    slideNumber.innerHTML = `${currentSlideIndex+1}/${totalSlides}`;
    correctNumber.innerHTML = `Correct: ${correctCount}/${totalSlides}`;
    currentSlide.src = images[currentSlideIndex];
    currentSlide.style.display = "block";
});


window.onload = () => {
    LoadSmaller("cHV6emxlcHV6emxlcHV6emxlaGkuaGkuMC4wLjA=");
    updatePanel();
};
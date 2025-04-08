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

    "katar", "parabox", "halo", "tuna", "cymbal", "quatrefoil", "linkbetweenwords", "poketoads", "golgiyoshi"
);

var sprWidth = 104;

function getOffset(i) {
    sprWidth = sprWidth;
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
        symbolY + 70,
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
            if (j == 0) offset = -25;
            else if (j == 1) offset = 15;
        }
        else if (count == 3) {
            if (j == 0) offset = -35;
            else if (j == 1) offset = -5;
            else if (j == 2) offset = 25;
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


function symbolDraw(text, index) {
    ctx.fillStyle = "white";
    ctx.font = "132px Symbolingo";
    ctx.textAlign = "center";
    ctx.fillText(text, symbolX + getOffset(index, finalData[currentSlideIndex].symbolCount) + 44, symbolY + 88);
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

function LoadPuzzle(data, fullObj) {
    let json = JSON.parse(atob(data));
    fullObj.topText = json.clue;
    fullObj.ans = json.answer.toLowerCase();
    fullObj.btmText = json.answer.replace(/[^\s]/g, '-');
    fullObj.symbolCount = json.symbol;
    fullObj.curryArr = json.symbolArr;
    fullObj.dottedPuzzle = json.dotted;
    fullObj.pixeled = json.pixelMode;
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
        if (dataObj.pixeled) {
            if (dataObj.curryArr[i].squiggle && dataObj.curryArr[i].neg) {
                symbolY = 225;
                drawNegative(i, 100);
            }
            else if (dataObj.curryArr[i].tuna && dataObj.curryArr[i].neg) {
                symbolY = 225;
                drawNegative(i, 115);
            }
            else if (dataObj.curryArr[i].halo && dataObj.curryArr[i].neg) {
                symbolY = 225;
                drawNegative(i, 115);
                drawHalo(i);
            }
            else if (dataObj.curryArr[i].neg) {
                symbolY = 225;
                drawNegative(i, 85);
            }
            else if (dataObj.curryArr[i].squiggle && dataObj.curryArr[i].halo) {
                symbolY = 225;
                drawHalo(i, 100);
            }
            else if (dataObj.curryArr[i].tuna && dataObj.curryArr[i].halo) {
                symbolY = 225;
                drawHalo(i, 115);
            }
            else if (dataObj.curryArr[i].halo) {
                symbolY = 225;
                drawHalo(i);
            }
            else symbolY = 210;
            if (dataObj.curryArr[i].squiggle) {
                symbolY = 225;
                drawSquiggle(i);
            }
            else if (dataObj.curryArr[i].tuna) {
                symbolY = 225;
                drawTuna(i);
            }
            drawDots(dataObj.curryArr[i].dots, i);
            drawIcon(dataObj.curryArr[i].name, i);
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
            topText: "",
            ans: "",
            btmText: "",
            symbolCount: 0,
            curryArr: [],
            dottedPuzzle: false,
            pixeled: false,
            solved: false,
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

function LoadPuzzle64() {
    singleMode = true;
    currentSlideIndex = 0;
    totalSlides = 1;
    const b64 = base64text.value;
    finalData[0] = {
        topText: "",
        ans: "",
        btmText: "",
        symbolCount: 0,
        curryArr: [],
        dottedPuzzle: false,
        pixeled: false,
        solved: false,
        currentChar: 0
    };
    LoadPuzzle(b64, finalData[0]);
    DrawAll(finalData[0]);
    const slide = new Image();
    slide.src = canvas.toDataURL("image/png");
    images[0] = slide.src;

    slideNumber.innerHTML = `${currentSlideIndex+1}/${totalSlides}`;
    currentSlide.src = images[0];
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

function LoadSmaller() {
    singleMode = true;
    currentSlideIndex = 0;
    totalSlides = 1;
    correctCount = 0;
    const b64 = base64text.value;
    finalData[0] = {
        topText: "",
        ans: "",
        btmText: "",
        symbolCount: 0,
        curryArr: [],
        dottedPuzzle: false,
        pixeled: false,
        solved: false,
        currentChar: 0
    };
    ParseSmaller(b64, finalData[0]);
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

    target.topText = parts[0];
    target.ans = parts[1];
    target.btmText = parts[1].replace(/[^\s]/g, '-');
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
            topText: "",
            ans: "",
            btmText: "",
            symbolCount: 0,
            curryArr: [],
            dottedPuzzle: false,
            pixeled: false,
            solved: false,
            currentChar: 0,
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
    if ((event.key.length === 1 && /^[a-zA-Z]$/.test(event.key)) || event.code === 'Space') {
        if (!event.shiftKey && !event.ctrlKey) event.preventDefault();
        let bT = dataObj.btmText;
        dataObj.btmText = bT.slice(0, dataObj.currentChar) + key + bT.slice(dataObj.currentChar + 1);
        if (dataObj.currentChar < dataObj.ans.length - 1) dataObj.currentChar += 1;
        if (dataObj.btmText == dataObj.ans && !dataObj.solved) {
            dataObj.solved = true;
            correctCount += 1;
        }
        else {
            if (dataObj.solved) correctCount -= 1;
            dataObj.solved = false;
        }
        updatePanel();
    }
    else if (event.code === 'Backspace') {
        let bT = dataObj.btmText;
        if (dataObj.currentChar >= 1 && bT[dataObj.currentChar] == '-' || bT[dataObj.currentChar] == ' ') dataObj.currentChar -= 1;

        if (dataObj.ans[dataObj.currentChar] == ' ') dataObj.btmText = bT.slice(0, dataObj.currentChar) + ' ' + bT.slice(dataObj.currentChar + 1);
        else dataObj.btmText = bT.slice(0, dataObj.currentChar) + '-' + bT.slice(dataObj.currentChar + 1);
        if (dataObj.solved) {
            correctCount -= 1;
            dataObj.solved = false;
        }
        updatePanel();
    }

    if (event.code === 'CapsLock' || event.code =='Insert') {
        dataObj.btmText = dataObj.ans[0] + dataObj.btmText.slice(1);
        dataObj.currentChar = 1;
        updatePanel();
    }

    slideNumber.innerHTML = `${currentSlideIndex+1}/${totalSlides}`;
    correctNumber.innerHTML = `Correct: ${correctCount}/${totalSlides}`;
    currentSlide.src = images[currentSlideIndex];
    currentSlide.style.display = "block";
});
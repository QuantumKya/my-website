//---- Setup ----\\

const canvas = document.getElementById("kansas");
const ctx = canvas.getContext("2d");

const res = 50;
const cols = canvas.width / res;
const rows = canvas.height / res;
const grid = [];



//---- Func Nation ---\\

function update() {
    drawGrid();

    requestAnimationFrame(update);
}


function createGrid(cols, rows) {
    let arr = [];

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            arr[j] = {
                x: i * res,
                y: j * res,
                state: Math.floor(Math.random() * 2)
            }
        }

        grid[i] = arr;
        arr = [];
    }
}

function drawGrid() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let elem = grid[i][j];

            ctx.fillStyle = determineColor2(elem, "fill");
            ctx.strokeStyle = determineColor2(elem, "stroke");
            ctx.fillRect(elem.x, elem.y, res, res);
            ctx.strokeRect(elem.x, elem.y, res, res);
        }
    }
}

/* function drawGrid3() {
    for (i of grid) {
        for (elem of grid[i]) {
            ctx.fillStyle = determineColor3(elem);
            ctx.strokeStyle = "black";
            ctx.fillRect(elem.x, elem.y, res, res);
            ctx.strokeRect(elem.x, elem.y, res, res);
        }
    }
} */

function toggleColor2(elem) {
    elem.state = elem.state === 0 ? 1 : 0;
}

/* function toggleColor3(elem) {
    elem.state = (elem.state === 2) ? 0 : elem.state + 1;
} */

function determineColor2(elem, type) {
    if (type === "fill") {
        return elem.state === 0 ? "white" : "black";
    }
    else if (type === "stroke") {
        return elem.state === 0 ? "black" : "white";
    }
}

/* function determineColor3(elem) {
    switch (elem.state) {
        case 0:
            return "red";
        case 1:
            return "blue";
        case 2:
            return "yellow";
    }
} */



//---- Event Listeners ----\\

let temp_toggle = [];
let click_toggle = [];
let z_toggle = [];
let x_toggle = [];
let click = 0;

for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

        canvas.addEventListener("click", function(event) {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
            

            let square = grid[i][j];

            if (
                mouseX >= square.x &&
                mouseX <= square.x + res &&
                mouseY >= square.y &&
                mouseY <= square.y + res
            ) {
                if (i + 1 >= cols) {
                    if (j + 1 >= rows) {
                        click_toggle = [
                            square,
                            grid[i - 1][j],
                            grid[i][j - 1]
                        ];
                    }
                    else if (j - 1 < 0) {
                        click_toggle = [
                            square,
                            grid[i - 1][j],
                            grid[i][j + 1]
                        ];
                    }
                    else {
                        click_toggle = [
                            square,
                            grid[i - 1][j],
                            grid[i][j + 1],
                            grid[i][j - 1]
                        ];
                    }
                }   
                else if (i - 1 < 0) {
                    if (j + 1 >= rows) {
                        click_toggle = [
                            square,
                            grid[i + 1][j],
                            grid[i][j - 1]
                        ];
                    }
                    else if (j - 1 < 0) {
                        click_toggle = [
                            square,
                            grid[i + 1][j],
                            grid[i][j + 1]
                        ];
                    }
                    else {
                        click_toggle = [
                            square,
                            grid[i + 1][j],
                            grid[i][j + 1],
                            grid[i][j - 1]
                        ];
                    }
                }
                else if (j + 1 >= rows) {
                    click_toggle = [
                        square,
                        grid[i + 1][j],
                        grid[i - 1][j],
                        grid[i][j - 1]
                    ];
                }
                else if (j - 1 < 0) {
                    click_toggle = [
                        square,
                        grid[i + 1][j],
                        grid[i - 1][j],
                        grid[i][j + 1]
                    ];
                }
                else {
                    click_toggle = [
                        square,
                        grid[i + 1][j],
                        grid[i - 1][j],
                        grid[i][j + 1],
                        grid[i][j - 1]
                    ];
                }

                for (z of click_toggle) {
                    toggleColor2(z);
                }

                temp_toggle[click] = click_toggle;
                click++;
            }

            drawGrid();
        });
    }
}

document.addEventListener("keypress", function(event) {
    if (event.key === "r") {
        if (confirm("Do you wish to reset?")) {
            for (let i = 0; j < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    grid[i][j].state = 0;
                }
            }
            
            temp_toggle = [];
            z_toggle = [];
            click = 0;

        }
    }

    if (event.key === "z") {
        if (click < 1) {
            return
        }
        else {
            z_toggle = temp_toggle[click - 1];

            for (z of z_toggle) {
                toggleColor2(z);
            }

            click--;
        }
    }

    if (event.key === "x") {
        if (click + 1 > temp_toggle.length) {
            return
        }
        else {
            x_toggle = temp_toggle[click];

            for (x of x_toggle) {
                toggleColor2(x);
            }

            click++;
        }
    }
});



//---- Run ----\\

createGrid(cols, rows);

requestAnimationFrame(update);
const numSelect = document.getElementById("icon-count");

const canvas = document.getElementById("kansas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "./lingo2icons.png";

class Symbol {
    constructor(name, {x, y}) {
        this.name = name;
        this.spritePos = {x, y};
    }

    draw() {
        ctx.drawImage(
            image,
            this.spritePos.x * 8,
            this.spritePos.y * 8,
            8,
            8,
            0,
            0,
            64,
            64
        );
    }
}

const lingo2symbols = [
    new Symbol("sundae", {x: 0, y: 0}),
    new Symbol("gemini", {x: 1, y: 0})
];

numSelect.onchange = (event) => {
    console.log(event.target.value);
    const container = document.getElementById("select-holder");
    container.innerHTML = "";

    for (let i = 0; i < event.target.value; i++) {
        const select = document.createElement("select");

        for (let j = 1; j <= 3; j++) {
            const option = document.createElement("option");
            option.value = `Option ${j}`;
            option.textContent = `Option ${j}`;
            select.appendChild(option);
        }

        container.appendChild(select);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);
    lingo2symbols[0].draw();
}
let canvas: HTMLCanvasElement = document.getElementById("kansas") as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

let WIDTH: number = 600
let HEIGHT: number = 600

canvas.width = WIDTH;
canvas.height = HEIGHT;

const MAX_FPS: number = 60;
const DELTATIME: number = 1000 / MAX_FPS;


class Vector2 {
    x: number;
    y: number;

    constructor(xin: number, yin: number) {
        this.x = xin;
        this.y = yin;
    }

    get mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    static get Zero() {
        return new Vector2(0, 0);
    }


    static add(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
    add(v2: Vector2) {
        return new Vector2(this.x + v2.x, this.y + v2.y);
    }

    static sub(v1: Vector2, v2: Vector2) {
        return Vector2.add(v1, Vector2.negate(v2));
    }
    sub(v2: Vector2) {
        return this.add(v2.negate());
    }

    static scale(vec: Vector2, s: number) {
        return new Vector2(vec.x * s, vec.y * s);
    }
    scale(s: number) {
        return new Vector2(this.x * s, this.y * s);
    }

    static shrink(vec: Vector2, s: number) {
        return Vector2.scale(vec, 1/s);
    }
    shrink(s: number) {
        return this.scale(1/s);
    }

    static negate(vec: Vector2) {
        return Vector2.scale(vec, -1);
    }
    negate() {
        return this.scale(-1);
    }

    static normalize(vec: Vector2) {
        return Vector2.shrink(vec, vec.mag);
    }
    normalize() {
        return this.shrink(this.mag);
    }
}

function LIMIT_MIN(a: number, b: number) { return (a>b)?a:b; }
function LIMIT_MAX(a: number, b: number) { return (a>b)?b:a; }
function LIMIT_MINV(vec: Vector2, min: Vector2) {
    return new Vector2(LIMIT_MIN(vec.x, min.x), LIMIT_MIN(vec.y, min.y));
}
function LIMIT_MAXV(vec: Vector2, max: Vector2) {
    return new Vector2(LIMIT_MAX(vec.x, max.x), LIMIT_MAX(vec.y, max.y));
}

class Player {
    position: Vector2;
    velocity: Vector2;
    controlVel: Vector2;

    dim: Vector2;


    term_vel: number = 7;
    gravity: number = 1.4;

    speed: number = 5;

    constructor(pos: Vector2, indim: Vector2) {
        this.position = pos;
        this.dim = indim;

        this.InitMove();
    }

    public Update() {
        this.velocity.y += this.gravity;
        this.velocity.y = (this.velocity.y > this.term_vel) ? this.term_vel : this.velocity.y;

        this.position = this.position.add(this.velocity);
        this.position = this.position.add(this.controlVel);

        this.CheckCollision();
    }

    public Draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, this.dim.x, this.dim.y);
    }

    private CheckCollision() {
        this.position = LIMIT_MINV(this.position, Vector2.Zero);
        this.position = LIMIT_MAXV(this.position, new Vector2(WIDTH, HEIGHT));
    }

    private InitMove() {
        document.addEventListener("keydown", (event) => {
            this.controlVel.x = 0;
            if (event.code == "ArrowRight") this.controlVel.x += this.speed;
            if (event.code == "ArrowLeft") this.controlVel.x -= this.speed;
        });
    }
}


let player: Player = new Player(new Vector2(300, 300), new Vector2(50, 50));

function updateGame() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    player.Update();
    player.Draw();
}

function _MainUpdate() {
    let start = Date.now();

    updateGame();

    let elapsed = Date.now() - start;
    if (elapsed < DELTATIME) {
        setTimeout(() => {
            requestAnimationFrame(_MainUpdate);
        },
        DELTATIME - elapsed);
    }
}

_MainUpdate();
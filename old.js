"use strict";
let backgroundFar;
let backgroundClose;
let foreground;
let context;
const playerAnimation = {
    "frames": {

        "Symbol 2 instance 10000":
        {
            "frame": { "x": 0, "y": 0, "w": 67, "h": 92 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 4, "y": 5, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        },
        "Symbol 2 instance 10001":
        {
            "frame": { "x": 67, "y": 0, "w": 66, "h": 93 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 5, "y": 4, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        },
        "Symbol 2 instance 10002":
        {
            "frame": { "x": 133, "y": 0, "w": 67, "h": 92 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 5, "y": 3, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        },
        "Symbol 2 instance 10003":
        {
            "frame": { "x": 0, "y": 93, "w": 67, "h": 93 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 6, "y": 1, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        },
        "Symbol 2 instance 10004":
        {
            "frame": { "x": 67, "y": 93, "w": 66, "h": 93 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 7, "y": 0, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        },
        "Symbol 2 instance 10005":
        {
            "frame": { "x": 133, "y": 93, "w": 71, "h": 92 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 2, "y": 0, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        },
        "Symbol 2 instance 10006":
        {
            "frame": { "x": 0, "y": 186, "w": 71, "h": 93 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 2, "y": 0, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        },
        "Symbol 2 instance 10007":
        {
            "frame": { "x": 71, "y": 186, "w": 71, "h": 93 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 1, "y": 2, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        },
        "Symbol 2 instance 10008":
        {
            "frame": { "x": 142, "y": 186, "w": 70, "h": 93 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 1, "y": 3, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        },
        "Symbol 2 instance 10009":
        {
            "frame": { "x": 0, "y": 279, "w": 71, "h": 93 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 0, "y": 4, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        },
        "Symbol 2 instance 10010":
        {
            "frame": { "x": 71, "y": 279, "w": 67, "h": 92 },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": { "x": 4, "y": 5, "w": 73, "h": 97 },
            "sourceSize": { "w": 73, "h": 97 }
        }
    },
    "meta": {
        "app": "Adobe Flash CS6",
        "version": "12.0.2.529",
        "image": "p1_walk.png",
        "format": "RGBA8888",
        "size": { "w": 256, "h": 512 },
        "scale": "1"
    }
}

const spritesheet = new SpriteSheet("resources/Base pack/Tiles/tiles_spritesheet.png", 914, 936, 70, 70);
const player = new SpriteAnimation("resources/Base pack/Player/p1_walk/p1_walk.png", playerAnimation, 30);
const dirt = spritesheet.sprite(0, 0);
const enemy1 = spritesheet.sprite(9, 2);
window.onload = init;
const setup = {
    frame: {
        width: window.innerWidth,
        height: window.innerHeight,
        spriteWidth: 70,
        spriteHeight: 70,
        blockWidth: window.innerWidth / 70,
        blockHeight: window.innerHeight / 70
    }
}
function init() {
    backgroundFar = document.getElementById('backgroundFar');
    backgroundClose = document.getElementById('backgroundClose');
    foreground = document.getElementById('foreground');
    context = foreground.getContext('2d');

    foreground.width = setup.frame.width;
    foreground.height = setup.frame.height;

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}
let secondsPassed;
let oldTimeStamp;
let fps;
let xBlockOffset = 0.0;
let xSpeed = 0.2;
let play = false;
let playerX = 400, playerY = 1050;

class ValueAnimation {
    constructor(now, fps, onNextFrame) {
        this.frameTime = 1000 / fps;
        this.then = now;
        this.onNextFrame = onNextFrame;
    }
    next(now) {
        this.then = this.then || now;
        const diff = now - this.then;

        if (diff > this.frameTime) {
            this.frame = this.frame + 1;
            this.then = now;
            this.onNextFrame(diff);
        }
    }
}
function ViewPort(now, fps) {
    this.animation = new ValueAnimation(now, 30, (diff) => {
        this.x += this.vector.x * diff;
        this.y += this.vector.y * diff;
    });
    this.vector = { x: 0, y: 0 };
    this.setVector = function (vector) {
        this.vector = vector;
    };
    this.next = this.animation.next;
}

function drawBackground(xBlockOffset) {
    for (let index = 0; index < setup.frame.blockWidth + 1; index++) {
        dirt.draw(context, xBlockOffset + index * setup.frame.spriteWidth, setup.frame.height - setup.frame.spriteHeight);
    }
}
function drawEnemies() {
    enemy1.draw(context, 20 * setup.frame.spriteWidth, setup.frame.height - setup.frame.spriteHeight)
}
const Jump = function (now, scale = -5) {
    this.animation = new ValueAnimation(now, 15, (diff) => {
        this.frame = this.frame + 1;
    })
    this.frames = [1, 5, 6, 5, 1];
    this.frame = 0;
    this.scale = scale;
    this.next = function (now) {
        const result = { x: 0, y: this.frames[this.frame] * this.scale }
        this.animation.next(now);
        return result;
    }
    this.finished = function () {
        return this.frame >= this.frames.length;
    }
}
function SpriteAnimation(src, animation, fps) {

    const image = new Image();
    image.src = src;
    image.onload = () => {
        this.image = image;
    }
    this.frames = Object.values(animation.frames);
    this.currentFrame = 0;
    this.frameTime = 1000 / fps;
    this.animations = [];
    this.jump = (now) => {
        this.animations.push(new Jump(now))
    };
    this.drawFrame = (context, x, y, now) => {
        this.then = this.then || now;
        const diff = now - this.then;
        if (this.image) {
            const frame = this.frames[this.currentFrame].frame;
            this.animations = this.animations.filter(a => !a.finished());
            const position = this.animations.reduce((p, c) => {
                const shift = c.next(now);
                return { x: p.x + shift.x, y: p.y + shift.y }
            }, { x, y })
            console.log(position)
            context.drawImage(this.image, frame.x, frame.y, frame.w, frame.h, position.x, position.y, frame.w, frame.h);
            if (diff > this.frameTime) {
                this.then = now;
                this.currentFrame = (this.currentFrame + 1) % this.frames.length;
            }
        }

    }
}
function SpriteSheet(src, width, height, sWidth, sHeight) {
    const image = new Image();
    image.src = src;
    image.onload = () => {
        this.image = image;
    }
    this.width = width;
    this.height = height;
    this.sWidth = sWidth;
    this.sHeight = sHeight;

    this.sprite = (sx, sy) => {
        return {
            draw: (context, x, y) => {
                if (this.image) {
                    context.drawImage(this.image, sx * this.sWidth, sy * this.sHeight, this.sWidth, this.sHeight, x, y, this.sWidth, this.sHeight);
                }
            }
        }
    }
}



function drawFps(timeStamp) {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp || timeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);

    // Draw number to the screen
    context.fillStyle = 'white';
    context.fillRect(0, 0, 90, 40);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText(fps + ' fps', 10, 30);
    return secondsPassed;
}
function gameLoop(timeStamp) {
    context.clearRect(0, 0, setup.frame.width, setup.frame.height);
    const secondsPassed = drawFps(timeStamp);
    draw(timeStamp, secondsPassed);

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function draw(timeStamp, secondsPassed) {

    if (play) {
        xBlockOffset = ((secondsPassed * -xSpeed * 1000) + xBlockOffset) % setup.frame.spriteWidth;
    }
    // if (downPressed) {
    //     playerY += 200 * secondsPassed;
    // }
    // if (upPressed) {
    //     playerY -= 200 * secondsPassed;
    // }
    // if (rightPressed) {
    //     playerX += 200 * secondsPassed;
    // }
    // if (leftPressed) {
    //     playerX -= 200 * secondsPassed;
    // }
    if (upPressed) {
        player.jump(timeStamp);
    }
    drawBackground(xBlockOffset)

    player.drawFrame(context, playerX, playerY, timeStamp)
}
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
function keyDownHandler(event) {
    if (event.code === 'Space') {
        play = !play;
    }

    if (event.keyCode == 39) {
        rightPressed = true;
    }
    else if (event.keyCode == 37) {
        leftPressed = true;
    }
    if (event.keyCode == 40) {
        downPressed = true;
    }
    else if (event.keyCode == 38) {
        upPressed = true;
    }
}
function keyUpHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = false;
    }
    else if (event.keyCode == 37) {
        leftPressed = false;
    }
    if (event.keyCode == 40) {
        downPressed = false;
    }
    else if (event.keyCode == 38) {
        upPressed = false;
    }
}

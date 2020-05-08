var canvas          = document.getElementById("snakeField");
var scoreCounter    = document.getElementById("scoreCounter");
var foodX           = Math.round((Math.random(canvas.height - gridSize) * (canvas.width - gridSize)) / gridSize) * gridSize;
var foodY           = Math.round((Math.random(canvas.height - gridSize) * (canvas.width - gridSize)) / gridSize) * gridSize;
var ctx             = canvas.getContext("2d");
var snake           = [];
var nextX           = 0,
    nextY           = 0,
    gridSize        = 25,
    score           = 0,
    snakeX          = 0,
    snakeY          = 0,
    snakeTail       = 1;

// loads functions on window load
window.onload = function() {
    this.spawnFruit();
    this.snakeController();
};

function snakeBody() {
    snakeX += nextX;
    snakeY += nextY;
    ctx.fillStyle = "green";
    for(var i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    };
    snake.push({x: snakeX, y: snakeY});
    while(snake.length > snakeTail) {
        snake.shift();
    };
};

function snakeController() {
    document.addEventListener("keydown", function(event) {
        switch(event.keyCode) {
            // left
            case 37:
                if (nextX == 25 && nextY == 0) {
                    return
                }
                nextX =-25;
                nextY = 0;
                break;
            // up
            case 38:
                if (nextX == 0 && nextY == 25) {
                    return;
                }
                nextX = 0;
                nextY =-25;
                break;
            // right
            case 39:
                if (nextX == -25 && nextY == 0) {
                    return;
                }
                nextX = 25;
                nextY = 0;
                break;
            // down
            case 40:
                if (nextX == 0 && nextY == -25) {
                    return;
                }
                nextX = 0;
                nextY = 25;
                break;
        };  
    });
};

function drawFruit() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, gridSize, gridSize);
};

function spawnFruit() {
    foodX = Math.round((Math.random(canvas.height - gridSize) * (canvas.width - gridSize)) / gridSize) * gridSize;
    foodY = Math.round((Math.random(canvas.height - gridSize) * (canvas.width - gridSize)) / gridSize) * gridSize;
    drawFruit();
};

function eatFruit() {
    if(snakeX === foodX && snakeY === foodY) {
        spawnFruit();
        score++;
        snakeTail++;
        scoreCounter.textContent = score;
    };
};

// shows Game Over screen when outside bounds or hit itself
function gameOver() {
    if(snakeX === 0 - gridSize || snakeY === 0 - gridSize || snakeY === canvas.height || snakeX === canvas.height) {
        gameOverText();
    }
    for(var i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            gameOverText();
        };
    };
};

function gameOverText() {
    clearInterval(canvasRefresh);
    ctx.font = "80px Verdana";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.height/2, canvas.width/2);
}

function updateCanvas() {
    // clear canvas to delete snake trail
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    // draw new snake on X and Y coordinates
    snakeBody();
    // update/draw fruit to show
    drawFruit();
};

// sets interval to update the Canvas
var canvasRefresh = setInterval(function() {
    updateCanvas();
    gameOver();
    eatFruit();
}, 100);
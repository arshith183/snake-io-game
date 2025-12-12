// Game Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

// Game Variables
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];
let velocityX = 0;
let velocityY = 0;
let food = { x: 15, y: 15 };
let goldenFood = null;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gamePaused = false;
let gameSpeed = 100;

// Update high score display
document.getElementById('highScore').textContent = highScore;

// Button Event Listeners
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('restartBtn').addEventListener('click', restartGame);

// Keyboard Controls
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (velocityY === 0) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (velocityY === 0) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (velocityX === 0) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (velocityX === 0) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        gamePaused = false;
        velocityX = 1;
        velocityY = 0;
        gameLoop();
    }
}

function togglePause() {
    if (gameRunning) {
        gamePaused = !gamePaused;
        if (!gamePaused) {
            gameLoop();
        }
    }
}

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    velocityX = 0;
    velocityY = 0;
    food = generateFood();
    goldenFood = null;
    score = 0;
    gameRunning = false;
    gamePaused = false;
    updateScore();
    drawGame();
}

function gameLoop() {
    if (!gameRunning || gamePaused) return;
    
    setTimeout(() => {
        updateGame();
        drawGame();
        gameLoop();
    }, gameSpeed);
}

function updateGame() {
    // Move snake
    const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };
    
    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        food = generateFood();
        
        // Generate golden food randomly
        if (Math.random() < 0.2 && !goldenFood) {
            goldenFood = generateFood();
        }
    } else if (goldenFood && head.x === goldenFood.x && head.y === goldenFood.y) {
        score += 50;
        updateScore();
        goldenFood = null;
    } else {
        snake.pop();
    }
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#0f3460';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
    
    // Draw snake
    snake.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(
            segment.x * gridSize,
            segment.y * gridSize,
            (segment.x + 1) * gridSize,
            (segment.y + 1) * gridSize
        );
        
        if (index === 0) {
            gradient.addColorStop(0, '#00ff88');
            gradient.addColorStop(1, '#00cc66');
        } else {
            gradient.addColorStop(0, '#00cc66');
            gradient.addColorStop(1, '#009944');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );
        
        // Draw eyes on head
        if (index === 0) {
            ctx.fillStyle = 'white';
            const eyeSize = 3;
            ctx.fillRect(segment.x * gridSize + 5, segment.y * gridSize + 5, eyeSize, eyeSize);
            ctx.fillRect(segment.x * gridSize + 12, segment.y * gridSize + 5, eyeSize, eyeSize);
        }
    });
    
    // Draw regular food
    ctx.fillStyle = '#ff4757';
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // Draw golden food
    if (goldenFood) {
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(
            goldenFood.x * gridSize + gridSize / 2,
            goldenFood.y * gridSize + gridSize / 2,
            gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // Add sparkle effect
        ctx.fillStyle = '#ffed4e';
        ctx.fillRect(goldenFood.x * gridSize + gridSize / 2 - 1, goldenFood.y * gridSize + 2, 2, 4);
        ctx.fillRect(goldenFood.x * gridSize + 2, goldenFood.y * gridSize + gridSize / 2 - 1, 4, 2);
    }
}

function generateFood() {
    let newFood;
    let validPosition = false;
    
    while (!validPosition) {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        validPosition = true;
        for (let segment of snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                validPosition = false;
                break;
            }
        }
    }
    
    return newFood;
}

function updateScore() {
    document.getElementById('score').textContent = score;
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
}

function gameOver() {
    gameRunning = false;
    
    // Draw game over text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ff4757';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30);
}

// Initial draw
drawGame();

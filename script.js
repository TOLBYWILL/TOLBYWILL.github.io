const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const endPoint = document.getElementById('endPoint');
const gameOverText = document.getElementById('gameOver');

const gravity = 0.5;
let isJumping = false;
let velocityY = 0;
let posX = 50; // Player's X position
let posY = 50; // Player's Y position

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && !isJumping) {
        isJumping = true;
        velocityY = -10; // Jump strength
    }
    if (event.key === 'ArrowRight') {
        posX += 5; // Move right
        player.style.left = `${posX}px`;
    }
    if (event.key === 'ArrowLeft') {
        posX -= 5; // Move left
        player.style.left = `${posX}px`;
    }
});

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    const endPointRect = endPoint.getBoundingClientRect();

    // Check for collision with the obstacle
    if (
        playerRect.x < obstacleRect.x + obstacleRect.width &&
        playerRect.x + playerRect.width > obstacleRect.x &&
        playerRect.y < obstacleRect.y + obstacleRect.height &&
        playerRect.y + playerRect.height > obstacleRect.y
    ) {
        gameOver();
    }

    // Check if player reaches the end point
    if (
        playerRect.x < endPointRect.x + endPointRect.width &&
        playerRect.x + playerRect.width > endPointRect.x &&
        playerRect.y < endPointRect.y + endPointRect.height &&
        playerRect.y + playerRect.height > endPointRect.y
    ) {
        alert("You've reached the end point! You win!");
        resetGame();
    }
}

function gameOver() {
    gameOverText.style.display = 'block';
    document.removeEventListener('keydown', handleKeydown);
}

function resetGame() {
    posX = 50;
    posY = 50;
    player.style.left = `${posX}px`;
    player.style.bottom = '50px';
    gameOverText.style.display = 'none';
    isJumping = false;
    velocityY = 0;
}

function update() {
    if (isJumping) {
        posY += velocityY;
        velocityY += gravity;

        // Check if player is on the ground
        if (posY >= window.innerHeight - 100) {
            posY = window.innerHeight - 100; // Reset to ground level
            isJumping = false;
            velocityY = 0; // Reset velocity
        }
    } else {
        posY = window.innerHeight - 100; // Keep player on ground
    }

    player.style.bottom = `${posY}px`;
    player.style.left = `${posX}px`;
    
    checkCollision();
    
    requestAnimationFrame(update);
}

update();

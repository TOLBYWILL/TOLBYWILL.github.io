const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
let isJumping = false;
let gravity = 0.5;
let velocityY = 0;
let playerBottom = 50; // Initial position of player bottom
let playerLeft = 100; // Initial position of player left
let moveRight = false;
let moveLeft = false;

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
        moveRight = true; // Start moving right
    }
    if (event.code === 'ArrowLeft') {
        moveLeft = true; // Start moving left
    }
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        velocityY = -10; // Jump strength
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowRight') {
        moveRight = false; // Stop moving right
    }
    if (event.code === 'ArrowLeft') {
        moveLeft = false; // Stop moving left
    }
});

function gameLoop() {
    if (moveRight) {
        playerLeft += 5; // Move right
        player.style.left = playerLeft + 'px';
    }
    if (moveLeft) {
        playerLeft -= 5; // Move left
        player.style.left = playerLeft + 'px';
    }
    
    if (isJumping) {
        velocityY += gravity; // Apply gravity
        playerBottom += velocityY; // Update player's vertical position
        player.style.bottom = playerBottom + 'px';

        // Check for collision with ground
        if (playerBottom <= 50) {
            playerBottom = 50; // Reset to ground level
            isJumping = false; // Stop jumping
            velocityY = 0; // Reset velocity
        }
    }
    
    requestAnimationFrame(gameLoop); // Keep the loop going
}

gameLoop(); // Start the game loop

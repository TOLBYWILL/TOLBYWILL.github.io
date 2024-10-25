const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
let isJumping = false;
let gravity = 0.5;
let velocityY = 0;
let playerBottom = 50; // Initial position of player bottom
let playerLeft = 100; // Initial position of player left

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
        playerLeft += 5;
        player.style.left = playerLeft + 'px';
    }
    if (event.code === 'ArrowLeft') {
        playerLeft -= 5;
        player.style.left = playerLeft + 'px';
    }
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        velocityY = -10; // Jump strength
    }
});

function gameLoop() {
    if (isJumping) {
        velocityY += gravity; // Apply gravity
        playerBottom += velocityY; // Update player's vertical position
        player.style.bottom = playerBottom + 'px';

        // Check for collision with ground/platforms
        if (playerBottom <= 50) {
            playerBottom = 50; // Reset to ground level
            isJumping = false; // Stop jumping
            velocityY = 0; // Reset velocity
        }
    }
    requestAnimationFrame(gameLoop); // Keep the loop going
}

gameLoop(); // Start the game loop

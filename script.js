const player = document.getElementById('player');
const gameContainer = document.querySelector('.game-container');
let isJumping = false;
let gravity = 0.5;
let velocityY = 0;
let playerSpeed = 5; // Speed of horizontal movement

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        velocityY = -10;
    }
    
    // Move left
    if (event.code === 'ArrowLeft') {
        player.style.left = `${Math.max(0, parseFloat(player.style.left) - playerSpeed)}px`;
    }
    
    // Move right
    if (event.code === 'ArrowRight') {
        player.style.left = `${Math.min(gameContainer.clientWidth - player.clientWidth, parseFloat(player.style.left) + playerSpeed)}px`;
    }
});

function gameLoop() {
    // Gravity effect
    if (isJumping) {
        velocityY += gravity;
        player.style.bottom = `${parseFloat(player.style.bottom) + velocityY}px`;

        // Check for landing
        if (parseFloat(player.style.bottom) <= 0) {
            player.style.bottom = '0px';
            isJumping = false;
            velocityY = 0;
        }
    }

    // Check if player reaches the goal
    const playerRect = player.getBoundingClientRect();
    const goalRect = document.querySelector('.goal').getBoundingClientRect();

    if (
        playerRect.x < goalRect.x + goalRect.width &&
        playerRect.x + playerRect.width > goalRect.x &&
        playerRect.y < goalRect.y + goalRect.height &&
        playerRect.y + playerRect.height > goalRect.y
    ) {
        alert('You reached the goal!');
        resetGame();
    }

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    player.style.bottom = '0px';
    player.style.left = '50px';
    isJumping = false;
    velocityY = 0;
}

gameLoop();

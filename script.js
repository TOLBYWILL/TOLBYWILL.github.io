let score = 0;
let clickValue = 1;

const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');

clickButton.addEventListener('click', () => {
    score += clickValue;
    scoreDisplay.textContent = score;
    upgradeButton.disabled = score < 10; // Enable upgrade button if score is enough
});

upgradeButton.addEventListener('click', () => {
    if (score >= 10) {
        score -= 10;
        clickValue++;
        scoreDisplay.textContent = score;
        upgradeButton.textContent = `Upgrade (Cost: ${10 * (clickValue)})`;
    }
});

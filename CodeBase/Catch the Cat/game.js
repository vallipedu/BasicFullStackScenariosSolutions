const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const gameContainer = document.getElementById('game-container');

let score = 0;
let timeLeft = 30;
let gameRunning = true;

function createAndPlaceCat() {
    if (!gameRunning) return;

    // Remove the previous cat if it exists
    const oldCat = document.querySelector('.cat');
    if (oldCat) oldCat.remove();

    const cat = document.createElement('div');
    cat.classList.add('cat');
    cat.textContent = '🐱';

    // Get container dimensions
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;
    const catSize = 60;

    // Calculate random position
    const randomX = Math.floor(Math.random() * (containerWidth - catSize));
    const randomY = Math.floor(Math.random() * (containerHeight - catSize));

    cat.style.left = `${randomX}px`;
    cat.style.top = `${randomY}px`;

    cat.addEventListener('click', () => {
        score++;
        scoreElement.textContent = score;
        createAndPlaceCat(); // Create a new cat right away
    });

    gameContainer.appendChild(cat);
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = timeLeft;
    } else {
        clearInterval(timerInterval);
        gameRunning = false;
        alert(`Game Over! Your final score is: ${score}`);
        // Remove the final cat
        const finalCat = document.querySelector('.cat');
        if (finalCat) finalCat.remove();
    }
}

// Start the game
createAndPlaceCat();
const catInterval = setInterval(createAndPlaceCat, 1500); // Cat moves every 1.5 seconds
const timerInterval = setInterval(updateTimer, 1000); // Timer updates every second
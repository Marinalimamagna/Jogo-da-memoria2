const gameBoard = document.getElementById('gameBoard');
const fireworksContainer = document.getElementById('fireworks');
const winSound = document.getElementById('winSound');

const emojis = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍊', '🍍', '🍒'];
const cardValues = [...emojis, ...emojis];
let flippedCards = [];
let matchedCards = 0;

function createCard(value) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === cardValues.length) {
            celebrate();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            flippedCards = [];
        }, 1000);
    }
}

function celebrate() {
    winSound.play();
    showFireworks();
}

function showFireworks() {
    fireworksContainer.style.display = 'block';
    for (let i = 0; i < 10; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + 'vw';
        fireworksContainer.appendChild(firework);

        setTimeout(() => {
            firework.remove();
        }, 500);
    }
}

function initGame() {
    cardValues.sort(() => Math.random() - 0.5);
    cardValues.forEach(value => {
        const card = createCard(value);
        gameBoard.appendChild(card);
    });
}

initGame();


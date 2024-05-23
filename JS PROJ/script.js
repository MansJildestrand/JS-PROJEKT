// Initiera variabler för spelet
let scores = [0, 0]; // Totala poäng för båda spelarna
let currentScore = 0; // Löpande poäng för den aktuella spelaren
let activePlayer = 0; // Aktiv spelare, 0 eller 1
const winningScore = 50; // Vinstgräns

// Hämta HTML-element
const score0El = document.getElementById('score-0'); // Element för spelare 1:s totala poäng
const score1El = document.getElementById('score-1'); // Element för spelare 2:s totala poäng
const current0El = document.getElementById('current-0'); // Element för spelare 1:s löpande poäng
const current1El = document.getElementById('current-1'); // Element för spelare 2:s löpande poäng
const diceResultEl = document.getElementById('dice-result'); // Element för att visa tärningsresultat
const winnerMessageEl = document.getElementById('winner-message'); // Element för att visa vinnarmeddelande
const rollDiceBtn = document.getElementById('roll-dice'); // Knapp för att kasta tärning
const holdScoreBtn = document.getElementById('hold-score'); // Knapp för att hålla poäng

// Händelsehanterare för "Kasta tärning" knappen
rollDiceBtn.addEventListener('click', () => {
    const dice = Math.floor(Math.random() * 6) + 1; // Kasta tärning (1-6)
    animateDice(dice); // Animering av tärningskast

    if (dice === 1) {
        // Om tärningen visar 1, nollställ löpande poäng och byt spelare
        currentScore = 0;
        document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        switchPlayer(); // Byt spelare
    } else {
        // Lägg till tärningsresultatet till löpande poäng
        currentScore += dice;
        document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    }
});

// Händelsehanterare för "Håll poäng" knappen
holdScoreBtn.addEventListener('click', () => {
    // Lägg till löpande poäng till den totala poängen för den aktuella spelaren
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    // Kontrollera om den aktuella spelaren har vunnit
    if (scores[activePlayer] >= winningScore) {
        winnerMessageEl.textContent = `Spelare ${activePlayer + 1} vinner!`; // Visa vinnarmeddelande
        winnerMessageEl.classList.add('show'); // Lägg till klass för vinnarmeddelandets animation
        rollDiceBtn.disabled = true; // Inaktivera knappen "Kasta tärning"
        holdScoreBtn.disabled = true; // Inaktivera knappen "Håll poäng"
    } else {
        // Nollställ löpande poäng och byt spelare
        currentScore = 0;
        document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        switchPlayer(); // Byt spelare
    }
});

// Funktion för att byta spelare
function switchPlayer() {
    document.getElementById(`player-${activePlayer}`).classList.remove('active'); // Ta bort klass från nuvarande spelare
    activePlayer = activePlayer === 0 ? 1 : 0; // Växla mellan spelare 0 och 1
    document.getElementById(`player-${activePlayer}`).classList.add('active'); // Lägg till klass till ny aktiv spelare
}

// Funktion för att animera tärningskast
function animateDice(dice) {
    diceResultEl.classList.add('animate'); // Lägg till klass för animation
    setTimeout(() => {
        diceResultEl.classList.remove('animate'); // Ta bort klass för animation
        diceResultEl.textContent = `Tärning: ${dice}`; // Uppdatera tärningsresultatet
    }, 300); // Vänta 300 ms för animationens varaktighet
}

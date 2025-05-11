function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice1").src = `images/dice${dice1}.png`;
    document.getElementById("dice2").src = `images/dice${dice2}.png`;

    if (dice1 > dice2) {
        document.getElementById("result").textContent = "🚩 Player 1 Wins!";
    } else if (dice2 > dice1) {
        document.getElementById("result").textContent = "Player 2 Wins! 🚩";
    } else {
        document.getElementById("result").textContent = "It's a Draw!";
    }
}

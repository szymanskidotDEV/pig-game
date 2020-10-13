/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying, previousDice1, previousDice2;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;
}

function game() {
    document.querySelector('.about-game').classList.add('about-game-game');
    document.querySelector('.wrapper').classList.add('wrapper-game');
  }

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying) {

        // 1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        console.log('prevdice1 ' + previousDice1 + ' prevdice2 ' + previousDice2);
        console.log('dice1 ' + dice1 + ' dice2 ' + dice2);        

        // 2. Display result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src ='dice-' + dice1 + '.png';
        document.getElementById('dice-2').src ='dice-' + dice2 + '.png';

        // 3. Update the round score if the rolled number wan not a 1
        if (previousDice1 === 6 && dice1 ===6 || previousDice1 === 6 && dice2 ===6 || previousDice2 === 6 && dice1 ===6 || previousDice2 === 6 && dice2 ===6) {
            previousDice1 = undefined;
            previousDice2 = undefined;
            console.log('prevdice1 ' + previousDice1 + ' prevdice2 ' + previousDice2);
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;

            document.querySelector('.btn-new').disabled = true;
            document.querySelector('.btn-roll').disabled = true;
            document.querySelector('.btn-hold').disabled = true;
            document.querySelector('.active').classList.add('diced-1');
            setTimeout(function() { nextPlayer(); }, 1000);
        } else if (dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            document.querySelector('.btn-new').disabled = true;
            document.querySelector('.btn-roll').disabled = true;
            document.querySelector('.btn-hold').disabled = true;
            document.querySelector('.active').classList.add('diced-1');
            setTimeout(function() { nextPlayer(); }, 1000);
        }
        previousDice1 = dice1;   
        previousDice2 = dice2;   
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Add current score to global score
        scores[activePlayer] += roundScore;
        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var winScore = document.getElementById('final-score').value;

        if (winScore) {
        } else {
            winScore = 100;
        }
        //3. Check if player won the game
        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }        
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('.btn-new').removeAttribute('disabled');
    document.querySelector('.btn-roll').removeAttribute('disabled');
    document.querySelector('.btn-hold').removeAttribute('disabled');
    document.querySelector('.active').classList.remove('diced-1');
    previousDice1 = undefined;
    previousDice2 = undefined;
};

document.querySelector('.btn-new').addEventListener('click', init);
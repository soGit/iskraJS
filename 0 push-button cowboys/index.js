const BUZZER_PIN = P12;
const PLAYER_COUNT = 2;

//const Led = require('@amperka/led');
//const Button = require('@amperka/button');
const buzzer = require('@amperka/buzzer').connect(BUZZER_PIN);

let winnerId;
let buttonPins = [P3, P13];
let ledPins = [P9, P11];

const Player = function (ledPin, buttonPin) {
    this.led = require('@amperka/led').connect(ledPin);
    this.button = require('@amperka/button').connect(buttonPin);
};

Player.prototype.blinkLed = function (seconds) {
    this.led.blink(seconds || 1);
};

Player.prototype.isButtonPressed = function () {
    return this.button.isPressed();
};


const Game = function () {
    this.players = [new Player(ledPins[0], buttonPins[0]), new Player(ledPins[1], buttonPins[1])];
};

//Game.prototype.finishGame = function() {
//	this.players.forEach((player) => player.blinkLed());
//};

Game.prototype.getWinner = function (players) {
    //buzzer.beep(0.1);
    for (let i = 0;; i = (i + 1) % PLAYER_COUNT) {
        if (players[i].isButtonPressed()) {
            return i;
        }
    }
};

Game.prototype.startGame = function (onFinish) {
    console.log('Ready.');
    const that = this;
    setTimeout(() => {
        console.log('Pless!!!');
        const winnerId = that.getWinner(that.players);
        that.players[winnerId].blinkLed();
        console.log('Winner is Player #', winnerId + 1);
        setTimeout(() => {
            //that.finishGame();
            onFinish();
        }, 3000);
    }, Math.random() * 1000);
};

function startNewGame() {
    console.log('Start new game!');
    game.startGame(startNewGame);
}

const game = new Game();
startNewGame();
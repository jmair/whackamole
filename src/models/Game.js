import Mole from './Mole';

const startLocations = [
  { x: 100, y:100 },
  { x: 300, y:100 },
  { x: 100, y:300 },
  { x: 300, y:300 },
];

class Game {
  constructor(target) {
    this.target = target;
    this.timeLimit = 60;
    this.timeString = 'Timer: ';
    this.scoreString = 'Score: ';

    this.state = {
      score: 0,
      time: 0,
      timeStarted: 0,
      timeLeft: this.timeLimit,
    };

    this.loop = this.loop.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.incrementScore = this.incrementScore.bind(this);

    this.timer = Game.createUIDisplay('timer', this.timeString, this.state.timeLeft);
    this.scoreboard = Game.createUIDisplay('scoreboard', this.scoreString, this.state.score);
    this.renderButtons();
  }

  static createUIDisplay(className, string, value) {
    const el = document.createElement('div');
    el.className = className;
    el.innerText = `${string}${value}`;
    document.body.appendChild(el);

    return el;
  }

  handleStart() {
    this.state.gameStarted = true;
  }

  handlePause() {
    this.state.gameStarted = false;
  }

  handleReset() {
    this.state.score = 0;
    this.state.gameStarted = false;
    this.state.timeLeft = this.timeLimit;
    this.timer.innerText = `${this.timeString}${this.timeLimit}`;
    this.scoreboard.innerText = `${this.scoreString}0`;
  }

  renderButtons() {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'button-wrapper';

    const buttons = [
      { text: 'start', onclick: this.handleStart },
      { text: 'pause', onclick: this.handlePause },
      { text: 'reset', onclick: this.handleReset },
    ];

    buttons.forEach(button => {
      const current =  document.createElement('button');
      current.innerText = button.text;
      current.onclick = button.onclick;
      buttonWrapper.append(current);
    });

    document.body.appendChild(buttonWrapper);
  }

  incrementScore() {
    if (this.state.gameStarted) {
      this.state.score += 1;
    }
  }

  init() {
    this.moles = startLocations.map(loc => {
      return new Mole(loc, this.target, this.incrementScore);
    });

    this.loop();
  }

  update(seconds) {
    if (this.state.timeLeft < 1) this.state.gameStarted = false;
    this.timer.innerText = `${this.timeString}${parseInt(this.state.timeLeft)}`;
    this.scoreboard.innerText = `${this.scoreString}${this.state.score}`;
    this.moles.forEach(mole => mole.move(seconds));
  }

  loop(timestamp) {
    if (!this.state.start) { this.state.start = timestamp }
    if (timestamp - this.state.start > 1) { // ensure consistent time
      this.state.start = timestamp;

      if (this.state.gameStarted) {
        this.state.time = parseInt(timestamp / 1000);
        this.state.timeLeft = this.state.timeLeft - .01;
        this.update(this.state.time)
      }
    }

    window.requestAnimationFrame(this.loop);
  }
}

export default Game;

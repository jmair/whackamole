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

    this.state = {
      gameStarted: false,
      time: 0,
      timeLeft: this.timeLimit,
    };

    this.loop = this.loop.bind(this);
    this.timer = this.createTimer();
  }

  createTimer() {
    const timer = document.createElement('div');
    timer.className = 'timer';
    timer.innerText = `${this.timeString}${this.state.timeLeft}`;
    document.body.appendChild(timer);

    return timer;
  }

  init() {
    this.moles = startLocations.map(loc => {
      return new Mole(loc, this.target);
    });

    this.loop();
  }

  update(seconds) {
    if (this.state.timeLeft < 1) this.state.gameStarted = false;
    this.timer.innerText = `${this.timeString}${this.state.timeLeft}`;
    this.moles.forEach(mole => mole.move(seconds));
  }

  loop(timestamp) {
    if (timestamp - this.state.start > 1) { // ensure consistent time
      this.state.start = timestamp;

      if (this.state.gameStarted) {
        this.state.time = parseInt(timestamp / 1000);
        this.state.timeLeft = this.timeLimit - this.state.time;
        this.update(this.state.time)
      }
    }

    window.requestAnimationFrame(this.loop);
  }
}

export default Game;

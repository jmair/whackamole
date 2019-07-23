import Mole from './Mole';
import mallet from '../images/mallet.png';

const startLocations = [
  { x: 100, y:100 },
  { x: 300, y:100 },
  { x: 100, y:300 },
  { x: 300, y:300 },
];

class Game {
  constructor(target) {
    this.target = target;
    this.state = {
      gameStarted: true,
      start: undefined,
      time: 0,
    };

    this.loop = this.loop.bind(this);
  }

  init() {
    this.moles = startLocations.map(loc => {
      return new Mole(loc, this.target);
    });

    this.loop();
  }

  update(seconds) {
    this.moles.forEach(mole => mole.move(seconds));
  }

  loop(timestamp) {
    if (!this.state.start) { this.state.start = timestamp }
    if (timestamp - this.state.start > 1) { // ensure consistent time
      this.state.start = timestamp;
      this.state.time = timestamp / 1000;
      if (this.state.gameStarted) { this.update(this.state.time) }
    }

    window.requestAnimationFrame(this.loop);
  }
}

export default Game;

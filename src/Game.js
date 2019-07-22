import Mole from './Mole';

const startLocations = [
  { x: 100, y:100 },
  { x: 300, y:100 },
  { x: 100, y:300 },
  { x: 300, y:300 },
]

class Game {
  constructor(target) {
    this.target = target;
  }
  init() {
    const [mole1, mole2, mole3, mole4] = startLocations.map(loc => {
      return new Mole(loc, this.target);
    });
  }
}

export default Game;

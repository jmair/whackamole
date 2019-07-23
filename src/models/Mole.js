import image from '../images/mole.png';

const createMole = (location) => {
  const mole = document.createElement('img');
  mole.className = 'mole';
  mole.src = image;
  mole.onclick = () => { console.log('hit') };
  mole.ondragstart = () => false;

  return mole;
};

const createForeground = () => {
  const fore = document.createElement('div');
  fore.className = 'foreground';

  return fore;
};

const createBackground = () => {
  const back = document.createElement('div');
  back.className = 'background';

  return back;
};

class Mole {
  constructor(location, container) {
    this.mole = createMole(location);
    this.limits = {
      top: 0,
      bottom: 100,
      minVelocity: 4,
      maxVelocity: 8,
      pauseTopMin: 0,
      pauseTopMax: 1,
      pauseBotMin: 3,
      pauseBotMax: 5,
    };

    this.state = {
      direction: 'down',
      velocity: Mole.getRandomRange(this.limits.minVelocity, this.limits.maxVelocity),
      paused: true,
      pauseUntil: 0,
      timeElapsed: 0,
    };

    const wrapper = document.createElement('div');
    wrapper.className = 'mole-wrapper';
    wrapper.style.left = `${location.x}px`;
    wrapper.style.top = `${location.y}px`;

    const background = createBackground();
    const foreground = createForeground();

    wrapper.appendChild(background);
    wrapper.appendChild(this.mole);
    wrapper.appendChild(foreground);

    container.appendChild(wrapper);
  }

  setPause(position) {
    const { pauseTopMin, pauseBotMin, pauseTopMax, pauseBotMax } = this.limits;
    this.state.paused = true;
    const min = position === 'top' ? pauseTopMin : pauseBotMin;
    const max = position === 'top' ? pauseTopMax : pauseBotMax;

    this.state.pauseUntil = this.state.timeElapsed + Mole.getRandomRange(min, max);
  }

  checkPause() {
    if (this.state.paused) {
      if (this.state.timeElapsed >= this.state.pauseUntil) this.state.paused = false;
    }
  }

  static getRandomRange(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  }

  getNewParams() {
    this.state.velocity = Mole.getRandomRange(this.limits.minVelocity, this.limits.maxVelocity);
  }

  checkDirection(top) {
    if (this.direction === 'up') {
      if (top < this.limits.top) {
        this.direction = 'down';
        this.getNewParams();
        this.setPause('top');
      }
    } else {
      if (top > this.limits.bottom) {
        this.direction = 'up';
        this.getNewParams();
        this.setPause('bottom');
      }
    }
  }

  move(seconds) {
    this.state.timeElapsed = seconds;
    const top = parseInt(this.mole.style.top, 10) || 0;
    this.checkDirection(top);
    this.checkPause();

    if (!this.state.paused) {
      if (this.direction === 'up') {
        this.mole.style.top = `${top - this.state.velocity}px`;
      } else {
        this.mole.style.top = `${top + this.state.velocity}px`;
      }
    }
  }
}

export default Mole;

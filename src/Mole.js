import image from './images/mole.png';

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
    const wrapper = document.createElement('div');
    wrapper.className = 'mole-wrapper';
    wrapper.style.left = `${location.x}px`;
    wrapper.style.top = `${location.y}px`;

    const background = createBackground();
    const mole = createMole(location);
    const foreground = createForeground();

    wrapper.appendChild(background);
    wrapper.appendChild(mole);
    wrapper.appendChild(foreground);

    container.appendChild(wrapper);
  }
}

export default Mole;

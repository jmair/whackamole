import './global.scss';
import Game from './models/Game';

const startGame = () => {
  const target = document.querySelector('#whack');
  const game = new Game(target);
  game.init();
};

startGame();

const View = require("./c4-view")
const Game = require("./game")

$( () => {
  const $container = $('.c4');
  const game = new Game();
  new View(game, $container);
  });

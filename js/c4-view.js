class View {
  constructor(game, $container) {
    this.$container = $container;
    this.game = game;

    this.setupBoard($container);
    this.bindEvents();
  }

  //install event handler for li's and clicks and bind event to makeMove which will call playMove(pos);
  bindEvents() {
    this.$container.on("click", "li", event => {
      const $square = $(event.currentTarget);
      console.log($square);
      this.makeMove($square);
    });
  }

  makeMove($square) {
    const pos = $square.data("pos");

    try {    
      this.game.playMove(pos); 
    } catch (e) {
      alert("This " + e.msg.toLowerCase());
      return;
     }

    $square
      .html(`${this.game.currentPlayer}`)
      .addClass("played")
      .addClass(`${this.game.currentPlayer}`)
      .removeClass("square");

    if (this.game.isOver()) {
      this.$container.off('click');
      this.$container.addClass('game-over');
      
      const winner = this.game.winner();
      
      const $figcaption = $("<figcaption>");

      if (winner) {
        this.$container.addClass(`winner-${winner}`);
        $figcaption.html(`You win, ${winner}`);

      } else {
        console.log('got here in conditional')
        $figcaption.html(`It's a draw`);
      }

      this.$container.append($figcaption);
    }
  }

  setupBoard($container) {
    const $board = $('<ul class="board"></ul>').appendTo($container);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let $li = $("<li>");
        $li
          .data("pos", [i, j])
          .addClass("square")
          .appendTo($board);
      }
    }
  }
}

module.exports = View;

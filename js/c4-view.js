class View {
  constructor(game, $container) {
    this.$container = $container;
    this.game = game;

    this.setupBoard($container);
    this.bindEvents();
    this.bindReset();
  }

  //install event handler for li's and clicks and bind event to makeMove which will call playMove(pos);
  bindEvents() {
    this.$container.on("click", "li", event => {
      const $square = $(event.currentTarget);
    
      this.makeMove($square);
    });
  }

  bindReset() {
    $(":button").on("click", event => {
      console.log('it logs event');
      this.$container.attr("class", "played").addClass("drop");
    });
  }

  makeMove($square) {
    const col = $square.data("col");
    let pos;
    const player = this.game.currentPlayer;
    try {   
      for (let i = 5; i >= 0; i--) {
        if (this.game.board.isEmptyPos([i,col])) {
          pos = [i, col] 
          this.game.playMove(pos); 
          break;
        }}
    } catch (e) {
      alert("This " + e.msg.toLowerCase());
      return;
     }

    let $circle = $(".board").find(`[data-pos="${pos}"]`);
   

    $circle
      .append(`<div class="played ${player}"></div>`);
      
// .removeClass("square");

    if (this.game.winner() || this.game.isOver()) {
      this.$container.off('click');
      this.$container.addClass('game-over');
      
      const winner = this.game.winner();
      
      const $figcaption = $("<figcaption>");

      if (winner) {
        this.$container.addClass(`winner-${winner}`);
        $figcaption.html(`You win, ${winner}`);

      } else {
      
        $figcaption.html(`It's a draw`);
      }

      this.$container.append($figcaption);
    }
  }

  setupBoard($container) {
    const $board = $('<ul class="board"></ul>').appendTo($container);

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        let $li = $("<li>");
        $li.attr("data-col", [j]);
        $li
          .attr("data-pos", [i, j])
          .addClass("square")
          .appendTo($board);
      }
    }
  }
}

module.exports = View;

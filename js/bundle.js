/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/board.js":
/*!*********************!*\
  !*** ./js/board.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MoveError = __webpack_require__(/*! ./moveError */ \"./js/moveError.js\");\n\nclass Board {\n  constructor() {\n    this.grid = Board.makeGrid();\n  }\n\n  isEmptyPos(pos) {\n    if (!Board.isValidPos(pos)) {\n      throw new MoveError(\"Is not valid position!\");\n    }\n\n    return this.grid[pos[0]][pos[1]] === null;\n  }\n\n  isOver() {\n    if (this.winner() != null) {\n      return true;\n    }\n\n    for (let rowIdx = 0; rowIdx < 6; rowIdx++) {\n      for (let colIdx = 0; colIdx < 7; colIdx++) {\n        if (this.isEmptyPos([rowIdx, colIdx])) {\n          return false;\n        }\n      }\n    }\n\n    return true;\n  }\n\n  placeMark(pos, mark) {\n    if (!this.isEmptyPos(pos)) {\n      throw new MoveError(\"Is not an empty position!\");\n    }\n\n    this.grid[pos[0]][pos[1]] = mark;\n  }\n\n  winner() {\n    for (let i = 0; i < 6; i++) {\n      for (let j = 0; j < 7; j++) {\n        //rows\n        // console.log(i,j);\n        if (j < 4) {\n          if (this.winnerHelper([[i, j], [i, j + 1], [i, j + 2], [i, j + 3]])) {\n            return this.winnerHelper([\n              [i, j],\n              [i, j + 1],\n              [i, j + 2],\n              [i, j + 3]\n            ]);\n          }\n        }\n        //check columns\n        if (i < 3) {\n          if (this.winnerHelper([[i, j], \n            [i + 1, j], \n            [i + 2, j], \n            [i + 3, j]])) {\n            return this.winnerHelper([\n              [i, j],\n              [i + 1, j],\n              [i + 2, j],\n              [i + 3, j]\n            ]);\n          }\n        }\n      }\n    }\n    //check diagonal\n    for (let i = 0; i < 3; i++) {\n      for (let j = 0; j < 7; j++) {\n        if (j <= 3 && i <= 2) {\n          //diag right and down\n          if (\n            this.winnerHelper([\n              [i, j],\n              [i + 1, j + 1],\n              [i + 2, j + 2],\n              [i + 3, j + 3]\n            ])\n          ) {\n            return this.winnerHelper([\n              [i, j],\n              [i + 1, j + 1],\n              [i + 2, j + 2],\n              [i + 3, j + 3]\n            ]);\n          }\n        } else if (i > 2 && j <= 3) {\n          //diag right and up\n          if (\n            this.winnerHelper([\n              [i, j],\n              [i - 1, j + 1],\n              [i - 2, j + 2],\n              [i - 3, j + 3]\n            ])\n          ) {\n            return this.winnerHelper([\n              [i, j],\n              [i - 1, j + 1],\n              [i - 2, j + 2],\n              [i - 3, j + 3]\n            ]);\n          }\n        } else if (i > 2 && j >= 3) {\n          // diag left and up\n          if (\n            this.winnerHelper([\n              [i, j],\n              [i - 1, j - 1],\n              [i - 2, j - 2],\n              [i - 3, j - 3]\n            ])\n          ) {\n            return this.winnerHelper([\n              [i, j],\n              [i - 1, j - 1],\n              [i - 2, j - 2],\n              [i - 3, j - 3]\n            ]);\n          }\n        } else if (i <= 2 && j >= 3) {\n          // diag left and down\n          if (\n            this.winnerHelper([\n              [i, j],\n              [i + 1, j - 1],\n              [i + 2, j - 2],\n              [i + 3, j - 3]\n            ])\n          ) {\n            return this.winnerHelper([\n              [i, j],\n              [i + 1, j - 1],\n              [i + 2, j - 2],\n              [i + 3, j - 3]\n            ]);\n          }\n        }\n      }\n    }\n    return null;\n  }\n\n  winnerHelper(array) {\n    let grid = this.grid;\n    let first = grid[array[0][0]][array[0][1]];\n    let second = grid[array[1][0]][array[1][1]];\n    let third = grid[array[2][0]][array[2][1]];\n    let fourth = grid[array[3][0]][array[3][1]];\n  \n    if (\n      first == second &&\n      third == fourth &&\n      first == fourth &&\n      first !== null\n    ) {\n      return first;\n    }\n    return null;\n  }\n\n  static isValidPos(pos) {\n    return 0 <= pos[0] && pos[0] < 6 && 0 <= pos[1] && pos[1] < 7;\n  }\n\n  static makeGrid() {\n    const grid = [];\n\n    for (let i = 0; i < 6; i++) {\n      grid.push([]);\n      for (let j = 0; j < 7; j++) {\n        grid[i].push(null);\n      }\n    }\n\n    return grid;\n  }\n}\n\nBoard.marks = [\"red\", \"yellow\"];\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./js/board.js?");

/***/ }),

/***/ "./js/c4-view.js":
/*!***********************!*\
  !*** ./js/c4-view.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class View {\n  constructor(game, $container) {\n    this.$container = $container;\n    this.game = game;\n\n    this.setupBoard($container);\n    this.bindEvents();\n    this.bindReset();\n  }\n\n  //install event handler for li's and clicks and bind event to makeMove which will call playMove(pos);\n  bindEvents() {\n    this.$container.on(\"click\", \"li\", event => {\n      const $square = $(event.currentTarget);\n    \n      this.makeMove($square);\n    });\n  }\n\n  bindReset() {\n    $(\":button\").on(\"click\", event => {\n      console.log('it logs event');\n      this.$container.attr(\"class\", \"played\").addClass(\"drop\");\n    });\n  }\n\n  makeMove($square) {\n    const col = $square.data(\"col\");\n    let pos;\n    const player = this.game.currentPlayer;\n    try {   \n      for (let i = 5; i >= 0; i--) {\n        if (this.game.board.isEmptyPos([i,col])) {\n          pos = [i, col] \n          this.game.playMove(pos); \n          break;\n        }}\n    } catch (e) {\n      alert(\"This \" + e.msg.toLowerCase());\n      return;\n     }\n\n    let $circle = $(\".board\").find(`[data-pos=\"${pos}\"]`);\n   \n\n    $circle\n      .append(`<div class=\"played ${player}\"></div>`);\n      \n// .removeClass(\"square\");\n\n    if (this.game.winner() || this.game.isOver()) {\n      this.$container.off('click');\n      this.$container.addClass('game-over');\n      \n      const winner = this.game.winner();\n      \n      const $figcaption = $(\"<figcaption>\");\n\n      if (winner) {\n        this.$container.addClass(`winner-${winner}`);\n        $figcaption.html(`You win, ${winner}`);\n\n      } else {\n      \n        $figcaption.html(`It's a draw`);\n      }\n\n      this.$container.append($figcaption);\n    }\n  }\n\n  setupBoard($container) {\n    const $board = $('<ul class=\"board\"></ul>').appendTo($container);\n\n    for (let i = 0; i < 6; i++) {\n      for (let j = 0; j < 7; j++) {\n        let $li = $(\"<li>\");\n        $li.attr(\"data-col\", [j]);\n        $li\n          .attr(\"data-pos\", [i, j])\n          .addClass(\"square\")\n          .appendTo($board);\n      }\n    }\n  }\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./js/c4-view.js?");

/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./js/board.js\");\nconst MoveError = __webpack_require__(/*! ./moveError */ \"./js/moveError.js\");\n\nclass Game {\n  constructor() {\n    this.board = new Board();\n    this.currentPlayer = Board.marks[0];\n  }\n\n  isOver() {\n    return this.board.isOver();\n  }\n\n  playMove(pos) {\n    this.board.placeMark(pos, this.currentPlayer);\n    this.swapTurn();\n  }\n\n  \n  swapTurn() {\n    if (this.currentPlayer === Board.marks[0]) {\n      this.currentPlayer = Board.marks[1];\n    } else {\n      this.currentPlayer = Board.marks[0];\n    }\n  }\n\n  winner() {\n    return this.board.winner();\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./js/game.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const View = __webpack_require__(/*! ./c4-view */ \"./js/c4-view.js\")\nconst Game = __webpack_require__(/*! ./game */ \"./js/game.js\")\n\n$( () => {\n  const $container = $('.c4');\n  const game = new Game();\n  new View(game, $container);\n  });\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/moveError.js":
/*!*************************!*\
  !*** ./js/moveError.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst MoveError = function (msg) { this.msg = msg; };\n\n// MoveError really should be a child class of the built in Error object provided\n// by Javascript, but since we haven't covered inheritance yet, we'll just\n// let it be a vanilla Object for now!\n\nmodule.exports = MoveError;\n\n\n//# sourceURL=webpack:///./js/moveError.js?");

/***/ })

/******/ });
/****************************************************
 * Conway's Game of Life - javascript style
 ****************************************************/

"use strict";
// Tasks:
// 01. Display a Matrix of 10 x 10
// 02. Insert random elements into the Matrix (any single digit) and display it
// 03. Ask if user wants a new random matrix and display if user said yes
// 04. Generate a Matrix of max(30) rows x max(100) columns, based on user input
// With values only being ' ' and '0'
// 05. Test is cells are alive or not (' ' is dead and '0' is alive)
// 06. Apply Rules of Conways game of life - Part 1
// Count living cells surrounding each element in matrix
// 07. Apply Rules of Conways game of life - Part 2
// Create new matrix with rules applied, display it and iterate it for 10 times
// Rules:
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
// Extra 01. Use n iterations
// Extra 02. Fix menus and presentation
// Extra 03. Let user decide what percentage of board to fill with '0' at the beginning.
// Extra 04. Move classes to files of their own


var Vector = function(x, y){
    this.x = x;
    this.y = y;
};
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.neighbors = function(game){
  var found = [];
  for (var dir in directions)
    if (this.look(dir, game) != null)
      found.push(dir);
  return found.length;
};

Vector.prototype.look = function(dir, game) {
  var target = this.plus( directions[dir] );
  target = game.isInside(target);
    return game.get(target);
};

var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

var Game = function(width, height, percent){
    this.grid = new Array(width * height);
    this.width = (width == undefined) ? 10 : width;
    this.height = (height == undefined) ? 10 : height;
    this.setup = false;
    this.percentage = (percent==undefined ? .5 : (percent > 1 ? percent/100 : percent));
    this.turn(true);
};
Game.prototype.get = function(vector){
    return this.grid[vector.x + vector.y * this.width];
    // 00000
    // 00000
    // 00000
    // 00000
};

Game.prototype.set = function(vector, state){
    return this.grid[vector.x + vector.y * this.width] = state;
};
Game.prototype.isInside = function(vector){
    return new Vector( (vector.x + this.width) % this.width, (vector.y + this.height) % this.height);

    // 10000
    // 00000
    // 000010
    // 00000
};

Game.prototype.toString = function(){
    var string = "";
    for(var y=0; y<this.height; y++){
        for(var x=0; x<this.width; x++){
            var char = this.get(new Vector(x,y));
            if(char == null) char = " ";
            else char = "O";
            string += char;
        }
        string += "\n";
    }
    return string;
};





Game.prototype.turn = function(setup) {
    var acted = [];
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            // var currentstate = this.grid[x + y * this.width];
            var cell = new Vector(x,y);
            var currentstate = this.get( cell );
            var neighbors = cell.neighbors(this);

            if(currentstate == 1 ){
                if(neighbors <= 3 && neighbors >= 2){
                    currentstate = 1;
                }
                if(neighbors > 3 || neighbors < 2){
                    currentstate = null;
                }
            } else {
                if(neighbors == 3) currentstate = 1;
            }

            if(setup){
                currentstate = Math.random() < this.percentage ? 1 : null;
            }

            acted[cell] = currentstate;
        }
    }
    this.grid = acted;
}

//Tests
    var game = new Game(10, 5);
//    game.forEach(function(element, index){
//        return new Vector(x,y);
//    });
    try{
        var CreateGameWithSpaceArray = assert(game.grid.length == 50,
                                          "Game array creation failed. Game looks like this: " + game.grid.length);
//        var PopulateGameTest = assert(function(){
//            game.forEach(grid.set());
//
//        }, "Game failed to populate");
    }
    catch(e){
        console.log(e);
//        console.log(CreateGameWithSpaceArray);
    }
    console.log(CreateGameWithSpaceArray);
//
//    var PopulateGameTest = assert(function(){
//        var grid = new Game(5, 5);
//
//    }, "Game failed to populate");
//
// Test Setup
function AssertionFailed(message) {
  this.message = message;
}
AssertionFailed.prototype = Object.create(Error.prototype);

function assert(test, message) {
  if (!test)
    throw new AssertionFailed(message);
    else
        return true;
}


function gameSetup(){

}


  var active = null;



  function Animated(game) {
    this.game = game;
    var outer = document.body, doc = document;
    var node = outer.appendChild(doc.createElement("div"));
    node.style.cssText = "position: relative; width: intrinsic; width: fit-content;";
    this.pre = node.appendChild(doc.createElement("pre"));
    this.pre.appendChild(doc.createTextNode(game.toString()));
    this.button = node.appendChild(doc.createElement("div"));
    this.button.style.cssText = "position: absolute; bottom: 8px; right: -4.5em; color: white; font-family: tahoma, arial; " +
      "background: #4ab; cursor: pointer; border-radius: 18px; font-size: 70%; width: 3.5em; text-align: center;";
    this.button.innerHTML = "stop";
    var self = this;
    this.button.addEventListener("click", function() { self.clicked(); });
    this.disabled = false;
    if (active) active.disable();
    active = this;
    this.interval = setInterval(function() { self.tick(); }, 1000);
  }

  Animated.prototype.clicked = function() {
    if (this.disabled) return;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.button.innerHTML = "start";
    } else {
      var self = this;
      this.interval = setInterval(function() { self.tick(); }, 1000);
      this.button.innerHTML = "stop";
    }
  };

  Animated.prototype.tick = function() {
    this.game.turn();
    this.pre.removeChild(this.pre.firstChild);
    this.pre.appendChild(this.pre.ownerDocument.createTextNode(this.game.toString()));
  };

  Animated.prototype.disable = function() {
    this.disabled = true;
    clearInterval(this.interval);
    this.button.innerHTML = "Disabled";
    this.button.style.color = "red";
  };

  window.animateWorld = function(game) { new Animated(game); };
//})();


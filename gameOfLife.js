var dimension = 15;
var chanceOfLiveCell = 0.5;
$( document ).ready(function() {
  initGame();
  $("#randomize").click(placeRandomCells);
  $("#start").click(nextTurn);
  $("#stop").click(function() { location.reload(); });
  $("#blinker").click(placeBlinkerCells);
  $("#toad").click(placeToadCells);
});

function initGame() {
  var tbl = $('<table id="main"></table>');
  _.times(dimension, function(y) {
    var tr = $('<tr>');
    _.times(dimension, function(x) {
      tr.append('<td id="cell-' + [x,y].join('-') + '">&nbsp;</td>');
    });
    tbl.append(tr);
  });
  $('#board').append(tbl);
}
// sample seed generators
function placeRandomCells() {
  _.times(dimension, function(y) {
    _.times(dimension, function(x) {
      var cell = getCell(x,y);
      if (Math.random() > chanceOfLiveCell) {
        cell.addClass("alive");
      } else {
        cell.removeClass("alive");
      }
    });
  });
}

function placeBlinkerCells() {
  _([[7,7],[6,7],[8,7]])
    .each(function(pos) {
      getCell.apply(null, pos).addClass("alive");
    });
}

function placeToadCells() {
  _([[8,7],[7,7],[9,7],[8,8],[7,8],[6,8]])
    .each(function(pos) {
      getCell.apply(null, pos).addClass("alive");
    });
}

// game of life code...
function nextTurn() {
  _.times(dimension, function(y) {
    _.times(dimension, function(x) {
      var cell = getCell(x,y);
      var neighbors = getNeighbors(x,y);
      if (cell.hasClass('alive') && shouldDie(neighbors)) {
        cell.removeClass('alive');
      } else if (canReproduce(neighbors)) {
        cell.addClass('alive');
      }
    });
  });
  setTimeout(nextTurn, 200);
}

function shouldDie(neighbors) {
  return neighbors < 2 || neighbors > 3;
}

function canReproduce(neighbors) {
  return neighbors === 3;
}

function getNeighbors(x,y) {
  var count = 0;
  _.each([
     [x - 1,y - 1], [x,y - 1] ,[x + 1,y - 1],
     [x - 1, y],              ,[1, 0],
     [x - 1, y + 1],[x,y + 1] ,[x + 1, y + 1]], function(cell) {
    if (getCell.apply(null, cell).hasClass("alive")) { count++; }
  });
  return count;
}

function getCell(x,y) {
  return $('#cell-' + [x,y].join('-'));
}
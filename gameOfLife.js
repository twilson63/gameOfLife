var dimension = 15;
var chanceOfLiveCell = 0.5;
var table;
var cell;

$( document ).ready(function() {
    table = $("#main");
  initialiseGame();
  cells = table.find("td");
  //placeRandomCells();
  //playGame();
  $("#randomize").click(placeRandomCells);
  $("#start").click(playGame);
  $("#stop").click(function() { location.reload(); });
  $("#blinker").click(placeBlinkerCells);
  $("#toad").click(placeToadCells);
});

function initialiseGame() {
  var trHtml = [];
  for (var y = 0; y < dimension; ++y) {
  trHtml.push("<tr>");
    for (var x = 0; x < dimension; ++x) {
      trHtml.push("<td>&nbsp;</td>");
    }
    trHtml.push("</tr>");
  }
  trHtml = trHtml.join("");
  table.append($(trHtml));
}

function placeRandomCells() {
  for (var y = 0; y < dimension; ++y) {
    for (var x = 0; x < dimension; ++x) {
      var cell = getCell(x,y);
      if (Math.random() > chanceOfLiveCell) {
        cell.addClass("alive");
      } else {
        cell.removeClass("alive");
      }
    }
  }
}

function placeBlinkerCells() {
    var cell = getCell(7,7);
    cell.addClass("alive");
    cell = getCell(6,7);
    cell.addClass("alive");
    cell = getCell(8,7);
    cell.addClass("alive");
}

function placeToadCells() {
    var cell = getCell(8,7);
    cell.addClass("alive");
    cell = getCell(7,7);
    cell.addClass("alive");
    cell = getCell(9,7);
    cell.addClass("alive");
    cell = getCell(8,8);
    cell.addClass("alive");
    cell = getCell(7,8);
    cell.addClass("alive");
    cell = getCell(6,8);
    cell.addClass("alive");
}

function playGame() {
  prepareNextGeneration();
  renderNextGeneration();
  setTimeout('playGame()', 200);
}

function prepareNextGeneration() {
  for (var y = 0; y < dimension; ++y) {
    for (var x = 0; x < dimension; ++x) {
      var cell = getCell(x,y);
      var neighbors = getLiveNeighborCount(x,y);
      cell.attr("isalive", "false");
      if (isCellAlive(x,y)) {
        if (neighbors === 2 || neighbors === 3) {
          cell.attr("isalive", "true");
        }
      } else if (neighbors === 3) {
        cell.attr("isalive", "true");
      }
    }
  }
}

function renderNextGeneration() {
  cells.each(function () {
    var cell = $(this);
    cell.removeClass("alive");
      if (cell.attr("isalive") === "true") { cell.addClass("alive"); }
    cell.removeAttr("isalive");
  });
}

function getLiveNeighborCount(x,y) {
  var count = 0;
  if (isCellAlive(x-1, y-1)) {count++;}
  if (isCellAlive(x, y-1)) {count++;}
  if (isCellAlive(x+1, y-1)) {count++;}
  if (isCellAlive(x-1, y)) {count++;}
  if (isCellAlive(x+1, y)) {count++;}
  if (isCellAlive(x-1, y+1)) {count++;}
  if (isCellAlive(x, y+1)) {count++;}
  if (isCellAlive(x+1, y+1)) {count++;}
  return count;
}

function isCellAlive(x,y) {
  return getCell(x,y).attr("class") === "alive";
}

function getCell(x,y) {
  if (x >= dimension) {x = 0;}
  if (y >= dimension) {y = 0;}
  if (x < 0) {x = dimension - 1;}
  if (y < 0) {y = dimension - 1;}
  return $(cells[y * dimension + x]);
}
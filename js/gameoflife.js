function seed() {
  let retour = []
  for (i = 0; i < arguments.length; i++) {
    retour[i] = arguments[i]
  }
  return retour;
}

function same([x, y], [j, k]) {

  if (x == j && y == k) return true;
  else return false;
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {

  return this.some((c) => same(c, cell));

}

const printCell = (cell, state) => {
  if (contains.call(state, cell)) return '\u25A3';

  else return '\u25A2';
};

const corners = (state = []) => {
  let corner = {
    topRight: [0, 0],
    bottomLeft: [0, 0]
  };

  if (state.length === 0) {

    return corner;
  }

  let y = [];
  let x = [];
  state.forEach((h) => { y.push(h[1]) });
  state.forEach((h) => { x.push(h[0]) });

  y.sort();
  x.sort();
  let highestY = y.pop();
  let lowestX = x.shift();

  let lowestY = y.shift();
  let highestX = x.pop();

  corner.topRight = [highestX, highestY];
  corner.bottomLeft = [lowestX, lowestY];

  return corner;
};

const printCells = (state) => {

  let { topRight, bottomLeft } = corners(state);
  let ground = [];


  for (let y = topRight[0]; y >= bottomLeft[0]; y--) {

    for (let x = bottomLeft[1]; x <= topRight[1]; x++) {
      ground += printCell([x, y], state);

    }

    ground += '\n';


  }

  return ground;




};

const getNeighborsOf = ([x, y]) => {
  return [
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
    [x - 1, y], [x + 1, y],
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1]
  ];
};

const getLivingNeighbors = (cell, state) => {
  let newContains = contains.bind(state);

  let livingNeighbors = getNeighborsOf(cell).filter(neighbor => {
    return newContains(neighbor);
  })

  return livingNeighbors;

};

const willBeAlive = (cell, state) => { };

const calculateNext = (state) => { };

const iterate = (state, iterations) => { };

const main = (pattern, iterations) => { };

const startPatterns = {
  rpentomino: [
    [3, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4]
  ],
  glider: [
    [-2, -2],
    [-1, -2],
    [-2, -1],
    [-1, -1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3]
  ],
  square: [
    [1, 1],
    [2, 1],
    [1, 2],
    [2, 2]
  ]
};

const [pattern, iterations] = process.argv.slice(2);
const runAsScript = require.main === module;

if (runAsScript) {
  if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
    main(pattern, parseInt(iterations));
  } else {
    console.log("Usage: node js/gameoflife.js rpentomino 50");
  }
}

exports.seed = seed;
exports.same = same;
exports.contains = contains;
exports.getNeighborsOf = getNeighborsOf;
exports.getLivingNeighbors = getLivingNeighbors;
exports.willBeAlive = willBeAlive;
exports.corners = corners;
exports.calculateNext = calculateNext;
exports.printCell = printCell;
exports.printCells = printCells;
exports.startPatterns = startPatterns;
exports.iterate = iterate;
exports.main = main;

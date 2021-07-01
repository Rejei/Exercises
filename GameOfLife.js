/*///////////////////////////////////////////////////////////////////
Given a 2D array and a number of generations, compute n timesteps of Conway's Game of Life.
The rules of the game are:
Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any live cell with two or three live neighbours lives on to the next generation.
Any dead cell with exactly three live neighbours becomes a live cell.
Each cell's neighborhood is the 8 cells immediately around it (i.e. Moore Neighborhood).
The universe is infinite in both the x and y dimensions and all cells are initially dead - except for those specified in the arguments. 
The return value should be a 2d array cropped around all of the living cells. (If there are no living cells, then return [[]].)
////////////////////////////////////////////////////////////////////*/

function getGeneration(cells, generations) {
    let next = [],
        cellsMod = [],
        x = 0,
        y = 0,
        frame = 0;
    let nextCell = function () {
        let value = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (((y + i > -1) && (x + j > -1)) && ((y + i < cellsMod.length) && (x + j < cellsMod[y].length))) {
                    value += cellsMod[y + i][x + j];
                }
            }
        }
        value -= cellsMod[y][x];
        if (cellsMod[y][x] === 1 && (value === 2 || value === 3)) {
            return 1;
        } else if (cellsMod[y][x] === 0 && (value === 3)) {
            return 1;
        } else {
            return 0;
        }
    }

    const nextGeneration = function () {
        //new array with edges for safe transform
        if (cellsMod.length === 0) {
            for (let i = -1; i < cells.length + 1; i++) {
                cellsMod[i + 1] = [];
                for (let j = -1; j < cells[0].length + 1; j++) {
                    if (j < 0 || i < 0 || j >= cells[0].length || i >= cells.length) {
                        cellsMod[i + 1].push(0);
                    } else {
                        cellsMod[i + 1].push(cells[i][j]);
                    }
                }
            }
        }
        //array of new generation;  
        for (let i = 0; i < cellsMod.length; i++) {
            next[i] = [];
            y = i;
            for (let j = 0; j < cellsMod[i].length; j++) {
                x = j;
                next[i].push(nextCell(cells, y, x));
            }
        }
        //cutting edges;
        while (!next[0].includes(1) && next.length > cells.length) {
            next.shift();                                                            //cut top;
        }
        while (!next[next.length - 1].includes(1) && next.length > cells.length) {
            next.pop();                                                              //cut bottom;
        }
        let sumLeft, sumRight;
        do {
            sumLeft = 0,
                sumRight = 0;
            for (let i = 0; i < next.length; i++) {
                if (next[i][0] === 0) {
                    sumLeft++;
                }
                if (next[i][next[i].length - 1] === 0) {
                    sumRight++;
                }
                if (sumLeft === next.length) {
                    for (let l = 0; l < next.length; l++) {
                        next[l].shift();                                                       //cut left
                    }
                }
                if (sumRight === next.length) {
                    for (let r = 0; r < next.length; r++) {
                        next[r].pop();                                                         //cut right;
                    }
                }
            }
        } while (sumLeft === next.length || sumRight === next.length)
        for (let i = -1; i < next.length + 1; i++) {
            cellsMod[i + 1] = [];
            for (let j = -1; j < next[0].length + 1; j++) {
                if (j < 0 || i < 0 || j >= next[0].length || i >= next.length) {
                    cellsMod[i + 1].push(0);
                } else {
                    cellsMod[i + 1].push(next[i][j]);
                }
            }
        }
        return (next, cellsMod, cells);
    }
    for (let i = 0; i < generations + 1; i++) {
        if (generations !== 0 && generations === i) {
            return next;
        } else if (generations === 0) {
            return cells;
        } else {
            nextGeneration(cells, cellsMod);
        }
    }
}
let cells =
    [[0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]];

let generations = 16;
getGeneration(cells, generations)

function sum(n) {
    let currentSum = n;
    function f(b) {
        currentSum += b;
        return f;
    }
    return f;
}

sum(1)(2)(3);
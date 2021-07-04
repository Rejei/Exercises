/* Write a function that will solve a 9x9 Sudoku puzzle.
The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.
The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) 
and can be solved with a brute-force approach. */

function sudoku(puzzle) {
    let result = [];
    let value = 0;
    //copy puzzle array - blank for result
    for (let k = 0; k < 9; k++){
          result[k] = [];
         for(let j = 0; j < 9; j++){
             result[k].push(puzzle[k][j]);
         };
    };
    let cell = [],
        y = 0,
        x = 0;
          //filling result array
            for (y; y < 9; y++){
               x > 8 ? x = 0 : x;
               for (x; x < 9; x++){
                   if (puzzle[y][x] === 0) {
                       value = result[y][x] + 1;
                       result[y][x] = testingDigit(y, x, value);
                       result[y][x] === 0 ? (cell = moveBack(y, x), y = cell[0], x = cell[1]) : (y, x);
                   };
               };
            };
    //go to back cell, if can't find unique value
    function moveBack (){
                  for(y; y > -1; ){
                      for(x; x > -1; ){
                      x > 0 ? x-- : (y--, x = 8);
                        if(puzzle[y][x] === 0){
                          if((result[y][x]+1) > 9){
                              result[y][x] = 0;
                          } else {
                              x--;
                              return [y, x];
                          }
                        }
                      }
                  }
    };
    //making test for unique value with sudoku's rules
    function testingDigit(){
             let areaArr = [],
                 rowArr = [];
                for (value; value < 10; value++){
                        //forming row array for testing value
                            for (let i = 0; i < 9; i++){
                                   rowArr.push(result[i][x]);
                            };
                        //forming area array for testing value
                            if(areaArr.length === 0){
                              let rowArea = Math.floor(y / 3) * 3;
                              let r = rowArea + 3;
                               for(rowArea; rowArea < r; rowArea++){
                                  let colArea = Math.floor( x / 3) * 3;
                                  let c = colArea + 3;
                                   for(colArea; colArea < c; colArea++){
                                      areaArr.push(result[rowArea][colArea]);
                                   };
                               };
                           };
                        //testing values
                        if(!result[y].includes(value) && !rowArr.includes(value) && !areaArr.includes(value)){
                               return value;
                        }
                        if (value === 9 && (result[y].includes(value) || rowArr.includes(value) || areaArr.includes(value))){
                               return 0;
                        };
              };
      };
      return result
    };
/* Screen Locking Patterns
You might already be familiar with many smartphones that allow you to use a geometric pattern as a security measure. 
To unlock the device, you need to connect a sequence of dots/points in a grid by swiping your finger without lifting it as you trace the pattern through the screen.

For this kata, your job is to implement a function that returns the number of possible patterns starting from a given first point, that have a given length.

More specifically, for a function countPatternsFrom(firstPoint, length), the parameter firstPoint is a single-character string corresponding to the point in the grid (i.e.: 'A') where your patterns start, 
and the parameter length is an integer indicating the number of points (length) every pattern must have.

For example, countPatternsFrom("C", 2), should return the number of patterns starting from 'C' that have 2 two points. The return value in this case would be 5, because there are 5 possible patterns:

(C -> B), (C -> D), (C -> E), (C -> F) and (C -> H).

Bear in mind that this kata requires returning the number of patterns, not the patterns themselves, so you only need to count them. 
Also, the name of the function might be different depending on the programming language used, but the idea remains the same.

Rules
In a pattern, the dots/points cannot be repeated: they can only be used once, at most.
In a pattern, any two subsequent dots/points can only be connected with direct straight lines in either of these ways:
Horizontally: like (A -> B) in the example pattern image.
Vertically: like (D -> G) in the example pattern image.
Diagonally: like (I -> E), as well as (B -> I), in the example pattern image.
Passing over a point between them that has already been 'used': like (G -> C) passing over E, in the example pattern image. 
This is the trickiest rule. Normally, you wouldn't be able to connect G to C, because E is between them, 
however when E has already been used as part the pattern you are tracing, you can connect G to C passing over E, because E is ignored, as it was already used once. */


function countPatternsFrom(firstPoint, length) {
    const points = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
    const combs = new Map();
    let result = 0;
    //Forming Map of dependencies: 'letter => Array of coordinates'
    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < points[i].length; j++) {
        combs.set(points[i][j], [i, j])
      }
    }
    //Forming Array with all possibilities for each letter
    const searchPossibilities = point => {
      return points.join('').split([]).filter(el => {
        if (el === ',' || el === point) el = ''
        return el
      })
    }
    //Checking a mid char for 'slick' combs, like 'A -> C' or 'B -> H' etc.
    const midPoint = (preXY, nextXY) => {
      let char = ''
      const xMidChar = (preXY[0] + nextXY[0]) / 2
      const yMidChar = (preXY[1] + nextXY[1]) / 2
      if (Math.abs(preXY[0] - nextXY[0]) === 2 || Math.abs(preXY[1] - nextXY[1]) === 2) {
        if (preXY[0] === nextXY[0] || preXY[1] === nextXY[1]) {
          if (preXY[0] === nextXY[0]) {
            char = points[preXY[0]][yMidChar]
          } else if (preXY[1] === nextXY[1]) {
            char = points[xMidChar][preXY[1]]
          }
        } else if (preXY[0] + nextXY[0] === 2 && preXY[1] + nextXY[1] === 2) {
          char = points[1][1]
        }
      }
      return char
    }
    //Forming routes and Validating Array of Dependencies: 'Previous letters => possibilities', like ['AB', 'C','D','E','F','G','H','I']
    const newPointPossibillity = (parentPoint, point) => {
  
        const positions = searchPossibilities(point).map(el => {
          const preChar = [...combs.get(point)]
          const nextChar = [...combs.get(el)]
          const myChar = midPoint(preChar, nextChar)
  
          if (myChar !== '') {
            if (!parentPoint.includes(myChar)) {
              el = ''
            }
            if (parentPoint.length + 2 > length) {
              el = ''
            }
          }
          for (let char of parentPoint) {
            if (char === el) el = ''
          }
          return el
        }
        ).filter(el => el)
        parentPoint = parentPoint + point
        return [parentPoint, ...positions]
    }
    //Cut off too long variations and setting preliminary result to Map
    //getting only uniq results with Set() for our length 
    let prepare = new Map(Object.entries({ '': [firstPoint] }));
    prepare.forEach((value, key) => {
      value.map(el => {
        const collect = newPointPossibillity(key, el)
        if(length === 1 || length === 0 || length > 9){ 
        return result = length === 1 ? 1 : 0
        }
         if (collect[0].length <= length) {
          if (collect[0].length + 1 === length) {
            result += collect.length - 1
          }
          prepare.set(collect.shift(), collect)
        }
        return el
      })
    })
    return result
  }
  countPatternsFrom('C', 1 )
  
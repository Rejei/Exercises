/* Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.
array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
For better understanding, please follow the numbers of the next array consecutively:
array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]
 */

function snake(array) {
    let path = [];
    while (array.length > 0) {
        array[0].forEach(el => path.push(el));
        array.splice(0, 1);
        for (let y = 0; y < array.length - 1; y++) {
            path.push(array[y][array[y].length - 1]);
            array[y].splice(-1, 1);
        };
        array[array.length - 1]?.reverse().forEach(el => path.push(el));
        array.splice(-1, 1);
        for (let y = array.length - 1; y >= 0; y--) {
            path.push(array[y][0]);
            array[y].splice(0, 1);
        };
    }
    return path;
};
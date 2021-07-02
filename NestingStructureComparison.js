/* Complete the function/method to return true/True when its argument is an array that has the same nesting structures and same corresponding length of nested arrays as the first array. 
For example:
  should return true
[ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );          
[ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] );  

  should return false 
[ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );  
[ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] );  

 should return true
[ [ [ ], [ ] ] ].sameStructureAs( [ [ [ ], [ ] ] ] ); 

 should return false
[ [ [ ], [ ] ] ].sameStructureAs( [ [ 1, 1 ] ] ); */
function asSame(arr, arr2) {
    let arr3 = [];
    if (arr2.length === arr.length) {
        arr.forEach(function (item, index) {
            if (!Array.isArray(item)) {
                this[index] = '1';
            }
        }, arr);
        let a = arr.map(item => item.length);
        arr2.forEach(function (item, index) {
            if (!Array.isArray(item)) {
                this[index] = '1';
            }
        }, arr2);
        let a2 = arr2.map(item => item.length)
        for (let i = 0; i < a.length; i++) {
            if (a[i] === a2[i]) {
                if (Array.isArray(arr[i]) && Array.isArray(arr2[i])) {
                    for (let j = 0; j < arr[i].length; j++) {
                        if (arr[i][j].length === arr2[i][j].length) {
                            arr3.push(1);
                        } else { arr3.push(0) }
                    }
                }
                if (Array.isArray(arr[i]) && Array.isArray(arr2[i])) {
                    arr3.push(1)
                }
            } else {
                arr3.push(0)
            }
        }
        return !arr3.includes(0) ? true : false
    }
}
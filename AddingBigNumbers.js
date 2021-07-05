/* We need to sum big numbers and we require your help.
Write a function that returns the sum of two numbers.
The input numbers are strings and the function must return a string.

Example
add("123", "321"); -> "444"
add("11", "99");   -> "110"

Notes
The input numbers are big.
The input is a string of only digits
The numbers are positives */

function add(a, b) {
    a = [...a].reverse(),
        b = [...b].reverse();

    for (let i = 0; i < b.length; ++i) {
        if ((a[i] = (Number(a[i]) || 0) + (Number(b[i]) || 0)) > 9) {
            a[i] -= 10
            b[i + 1] = (Number(b[i + 1]) || 0) + 1;
        };
    };

    return a.reverse().join("")
};
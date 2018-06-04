var read = require('read-file');

read('package.json', 'utf8', function(err, buffer) {
  //=> <Buffer 74 68 69 73 20 69 73 20 66 6f 6f>
  //console.log(buffer);
});

const fs = require('fs');

fs.readFile('test.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});

var compare = {};

module.exports = compare;


// todo list:
// auto rewrite compare.js and compare-product.js
// add option to add compare on product page
// allow user point the insert position

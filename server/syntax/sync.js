var fs = require('fs');

/*
//readFileSync
console.log('a');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('c');
*/

console.log('a');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
  console.log(result);
});
var i = 0;
for(i = 0 ; i < 100000 ; i++)
{
  console.log('c');
}


var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('./data/20180101-logs.txt'),
    console: false
});

rd.on('line', function(line) {
	let ip = line.split(' ')[14]
	let templateId = line.split(' ')[23].slice(61, 88)
    console.log(`${ip} : ${templateId}`)
});

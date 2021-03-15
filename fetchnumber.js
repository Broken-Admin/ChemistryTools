const {elements} = require('./PeriodicTableJSON.json');
const symbolReg = /[A-Z]{1}[a-z]{0,}/g

// Clean up the arguments
process.argv.splice(0,2);
// Attempt to repare array of symbols
var symbols = process.argv.join("").match(symbolReg);

if(!symbols) {
    console.log("Usage: node fetchnumber.js symbol1 [symbol2] [symbol3] ...");
    console.log("Exiting...");
    process.exit();
}

var numberes = [];

for(let i = 0; i < symbols.length; i++) {
    let currentSymbol = symbols[i];
    let matches = elements.filter(element => element.symbol == currentSymbol);
    if(matches.length != 1) {
        console.log(`Invalid symbol \"${currentSymbol}\" provided, skipping.`);
        continue;
    }
    console.log(`Atomic number of element \"${matches[0].name}\" with symbol \"${matches[0].symbol}\" is ${matches[0].number}`);
    // Trailing newline
    console.log();
}

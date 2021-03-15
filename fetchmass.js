const {elements} = require('./PeriodicTableJSON.json');
const symbolReg = /[A-Z]{1}[a-z]{0,}/g

// Clean up the arguments
process.argv.splice(0,2);
// Attempt to repare array of symbols
var symbols = process.argv.join("").match(symbolReg);

if(!symbols) {
    console.log("Usage: node fetchmass.js symbol1 [symbol2] [symbol3] ...");
    console.log("Exiting...");
    process.exit();
}

var masses = [];

for(let i = 0; i < symbols.length; i++) {
    let currentSymbol = symbols[i];
    let matches = elements.filter(element => element.symbol == currentSymbol);
    if(matches.length != 1) {
        console.log(`Invalid symbol \"${currentSymbol}\" provided, skipping.`);
        continue;
    }
    console.log(`Atomic mass of element \"${matches[0].name}\" with symbol \"${matches[0].symbol}\" is ${matches[0].atomic_mass}`);
    console.log(`Atomic mass rounded to two decimal places is ${(Math.round(matches[0].atomic_mass * 100)/100).toFixed(2)}.`);
    // Trailing newline
    console.log();
}

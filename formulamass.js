// Calculate percent composition and formula mass.
const { parseFormula } = require("./formulafunctions.js");
const { elements } = require("./PeriodicTableJSON.json");

// Prepare args
process.argv.splice(0, 2);
// Check if proper argument was provided
if (!process.argv[0] || !process.argv[0].match(tokenReg)) {
    console.log("No formula provided.");
    console.log("Usage: node formulamass.js formula");
    console.log("Exiting...");
    process.exit(1);
}

const formula = process.argv[0];

var objectTokens = parseFormula(formula);

var formulaMass = 0;
// Loop through tokens
for (let i = 0; i < objectTokens.length; i++) {
    let currentToken = objectTokens[i];
    let currentSymbol = currentToken.symbol;
    let currentSubscript = currentToken.subscript;
    // Get element from symbol
    currentElement = elements.filter(element => element.symbol == currentSymbol)[0];
    if (!currentElement) {
        console.log(`Invalid element symbol \"${currentSymbol}\" found in formula, exiting...`);
        process.exit(1);
    }
    // Because there is no roundTo function, this performs a rounding to the secnd decimal place 
    let atomicMass = Math.round(currentElement.atomic_mass * 100) / 100;
    let atomicMassString = atomicMass.toFixed(2);
    // Display the process.
    let totalAtomicMass = ((atomicMass * 100) * currentSubscript) / 100;
    let totalAtomicMassString = totalAtomicMass.toFixed(2);
    console.log(`${currentSymbol + ([] + currentSubscript)} = ${atomicMassString}g ${currentSymbol} * ${currentSubscript} = ${totalAtomicMassString}g ${currentSymbol}`);
    formulaMass += (atomicMass*100) * currentSubscript;
}
// Reduce the function, as the * 100 prevented odd decimal issues.
formulaMass /= 100;
// Display final formula mass
console.log(`${formulaMass.toFixed(2)}g ${formula}`);
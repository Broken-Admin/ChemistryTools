// Calculate percent composition and formula mass.
const { parseFormula } = require("./formulafunctions.js");
const { elements } = require("./PeriodicTableJSON.json");

// Prepare args
process.argv.splice(0, 2);
// Check if proper argument was provided
if (!process.argv[0] || !process.argv[0].match(tokenReg)) {
    console.log("No formula provided.");
    console.log("Usage: node percentcomposition.js formula");
    console.log("Exiting...");
    process.exit(1);
}

const formula = process.argv[0];

var objectTokens = parseFormula(formula);

var formulaMass = 0;
var totalAtomicMasses = [];
// Loop through tokens and calculate total atomic masses and single formula mass
for (let i = 0; i < objectTokens.length; i++) {
    let currentToken = objectTokens[i];
    // Get element from symbol
    currentElement = elements.filter(element => element.symbol == currentToken.symbol)[0];
    if (!currentElement) {
        console.log(`Invalid element symbol \"${currentToken.symbol}\" found in formula, exiting...`);
        process.exit(1);
    }
    // Because there is no roundTo function, this performs a rounding to the second decimal place 
    let atomicMass = Math.round(currentElement.atomic_mass * 100) / 100;
    // The totalAtomicMass is the mass of a single atom times the subscript
    let totalAtomicMass = atomicMass * currentToken.subscript;
    // Add it to an array of multiple calculated totalAtomicMasses
    totalAtomicMasses.push({symbol: currentToken.symbol, totalAtomicMass: totalAtomicMass});
    // Add the unrounded mass of a single times the subscript to the formulaMass
    formulaMass += (atomicMass * 100) * currentToken.subscript;
}
// Reduce the formula mass to two decmial points, as the * 100 prevented odd decimal issues.
formulaMass /= 100;

var percentCompositions = [];
// Calculate and display percent compositions
for (let i = 0; i < totalAtomicMasses.length; i++) {
    let currentSymbol = totalAtomicMasses[i].symbol;
    let currentMass = totalAtomicMasses[i].totalAtomicMass;
    // Because there is no roundTo function, this performs a rounding to the secnd decimal place 
    let percentage = Math.round((currentMass/formulaMass) * 100*100)/100;
    // Push to percentComposition array for later
    percentCompositions.push(Number(percentage));
    // Display each percent composition
    console.log(`${currentMass.toFixed(2)}g ${currentSymbol} / ${formulaMass.toFixed(2)}g ${formula} = ${percentage.toFixed(2)}% ${currentSymbol}`);
}

var totalPercentage = 0;
// Add all the percents up together
for (let i = 0; i < percentCompositions.length; i++) {
    totalPercentage += percentCompositions[i];
}
console.log(`All adding up to ${totalPercentage}%, which is ${Math.abs(Math.round((100-totalPercentage) * 100) / 100)} away from 100%.`);
if(100-totalPercentage > 0.5) console.log("You may want to confirm this script does not have an error in its logic.");

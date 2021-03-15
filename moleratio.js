// Prepare args
process.argv.splice(0, 2);
// Check if proper argument was provided
if (process.argv.length != 3 ||
    process.argv.findIndex((x) => isNaN(parseInt(x))) != -1 // This is just a fancy all-in-one way to confirm all arguments are integers
) {
    console.log("No formula provided.");
    console.log("Usage: node moleratio.js [known amount's coefficient] [unknown amount's coefficient] [known amount]");
    console.log("Note that if a compound or element does not have a shown coefficient, it has a coefficient of 1.");
    console.log("Exiting...");
    process.exit(1);
}

const coKnown = process.argv[0]; // Coefficient of known amount
const coUnknown = process.argv[1]; // Coefficient of unknown amount
const knownAmount = process.argv[2]; // Known amount (In moles!)

// Ratio of coefficients
console.log(`Coefficient ratio, known to unknown -\n${coKnown} : ${coUnknown}`);
console.log(`Mole ratio of known and unknown amounts -\n${knownAmount} : x`);

// Get the amount of significant digits in the known amount value provided
// I hate this, I don't know if it really works 100% or not
// Regexes ([1-9]{1,}), ([1-9]{1,}0{0,}\.[0-9]{0,}), ([1-9]{1,}0{0,}[1-9]{1,})

var significantCount;
knownString = knownAmount.toString();
if(knownString.match(/\./)) { // Check if the number contains a decimal
    // If the decimal is the last character of the number, then the entire number can
    // be considered "significant"
    if(knownString[knownAmount.length] == '.') {
        // Replace the decimal point and count all of the other digits
        significantCount = knownString.replace(/\./,'').length;
    }

    // Otherwise, count using a regex
    
    // This regex matches where the number has sigificant digits before, and possibly after, the decimal 
    if(knownString.match(/[1-9]{1,}0{0,}\.[0-9]{0,}/)) {
        significantCount = knownString.match(/[1-9]{1,}0{0,}\.[0-9]{0,}/)[0].replace(/\./, '').length;
    }

    console.log(`Count of sigfigs = ${significantCount}`);

    if(knownString.match(/[1-9]{1,}0{0,}[1-9]{1,}/)) {
        // FINISH THIS
        significantCount = knownString.match(/[1-9]{1,}0{0,}[1-9]{1,}/)
    }
}

// The algebraic breakdown
console.log("The algebraic breakdown -");
// TODO: Take the unknown as input
console.log(`${coKnown}x = ${coUnknown} * ${knownAmount} moles of the unknown compound or element`);
console.log(`${coKnown}x = ${coUnknown * knownAmount}`);
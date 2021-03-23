// Returns -1 upon an inability to parse the formula
// Returns -2 upon encountering a nonexistent element
function formulaMass(formula) {
    let objectTokens = parseFormula(formula);
    if(objectTokens.length == 0) return(-1);

    let formulaMass = 0;
    // Loop through tokens
    for (let i = 0; i < objectTokens.length; i++) {
        let currentToken = objectTokens[i];
        let currentSymbol = currentToken.symbol;
        let currentSubscript = currentToken.subscript;
        // Get element from symbol
        currentElement = periodicTable.elements.filter(element => element.symbol == currentSymbol)[0];
        if (!currentElement) { // Invalid element encountered
            return(-2);
        }
        // Because there is no roundTo function, this performs a rounding to the second decimal place 
        let atomicMass = Math.round(currentElement.atomic_mass * 100) / 100;
        let atomicMassString = atomicMass.toFixed(2);
        // Display the process.
        let totalAtomicMass = ((atomicMass * 100) * currentSubscript) / 100;
        let totalAtomicMassString = totalAtomicMass.toFixed(2);
        // Multiply the atomic mass as to allow for rounding to the second decimal place
        formulaMass += (atomicMass * 100) * currentSubscript;
    }
    // Reduce to two decimal places, as the * 100 prevented odd decimal issues.
    formulaMass /= 100;
    return(formulaMass);
}
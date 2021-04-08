// Matches a singular formula, parenthesis, subscripts and all,
// only used to confirm that a formula is valid
entireFormulaReg = /([A-Z]{1}[a-z]{0,1}\d{0,}|\(([A-Z]{1}[a-z]{0,}\d{0,}){2,}\)\d{0,})+/;

function handleFormulaInput() {
    let userFormula = document.getElementById("formula-input").value;
    // Confirm that the user entered a valid formula
    let entireFormula = userFormula.match(entireFormulaReg);
    if(!entireFormula || entireFormula[0] != userFormula) {
        displayText(`Formula ${userFormula} is invalid.`);
        return;
    }
    let mass = formulaMass(userFormula);
    // If the formulaMass returned a negative value, which should never
    // happen unless you're measuring the mass of exotic matter.
    // If you happen to be measuring the mass of exotic matter, please
    // claim your Nobel Prize.
    if(mass < 0) {
        if(mass == -1) displayText(`Unable to parse formula ${userFormula}, please confirm this is a valid formula and try again.`);
        if(mass == -2) displayText(`Encountered a nonexistent or undocumented element in the formula ${userFormula}, please confirm you have not made any typos.`);
        // Something else has happened, let's assume you made a scientific breakthrough beyond any other and have found
        // exotic matter.
    } // Otherwise assume the value was calculated as expected
    else displayFormula(userFormula, mass);
    return;
}

function displayFormula(formula, mass) {
    let node = document.createElement("code");
    mass = mass.toFixed(2).toString();
    // Use a clever replace and regex to display subscripts
    // Basic subscripts
    formula = formula.replace(/([A-Z][a-z]{0,1})(\d+)/g, '$1<sub>$2</sub>')
    // Subscripts of parenthesis
    .replace(/(\(.+\))(\d+)/g, '$1<sub>$2</sub>');
    node.innerHTML = `1mol ${formula} = ${mass}g ${formula}`;
    let massOut = document.getElementById("mass-out");
    massOut.appendChild(node);
}

function displayText(text) {
    let node = document.createElement("code");
    node.innerText = text;
    let out = document.getElementById("mass-out");
    out.appendChild(node);
}

function clearText() {
    let out = document.getElementById("mass-out");
    out.innerHTML = "";
}
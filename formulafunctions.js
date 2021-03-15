// Matches parenthesis formula groups
parenthesisReg = /\(([A-Z]{1}[a-z]{0,}[0-9]{0,}){2,}\)[0-9]+/g
// Matches the element symbol and its subscript, if a subscript exists
// Will behave oddly when used on formulas with parenthesis
tokenReg = /[A-Z]{1}[a-z]{0,}[0-9]{0,}/g;
// Matches only the element symbol
symbolReg  = /[A-Z]{1}[a-z]{0,}/;
// Matches only numbers
numberReg = /[0-9]+/;

// Ideally, perform a match check on the entire formula
// with tokenReg, then performing individual matching
// of elementReg and numberReg on each token in the array

/*
 * @param token {Object} Token object which consists of both a "symbol" field and a "subscript", which are nonempty
 * @summary Converts a token object to a string which could be part of a formula
 * @returns {String} A string of the symbol then its subscript, if token provided was invalid, returns empty string
 */
function tokenToString(token) {
    if (!token || !token.symbol || !token.subscript) return("");
    return(token.symbol + ([] + token.subscript));
}

/*
 * @param formula {String} Formula with parenthesis
 * @summary Converts a formula with parenthesis into a formula with only subscripts of symbols, no groups
 * @returns {String} Formula without parenthesis, but with equal ratio of elements
 */
function parseParenthesis(formula) {
    parenthesisGroups = formula.match(parenthesisReg);
    let tempFormula = formula;
    for(let i = 0; i < parenthesisGroups.length; i++) {
        let currentGroup = parenthesisGroups[i]
        let parenthesisTokens = tokenizeFormula(currentGroup, false);
        // Must use a different regex from numberReg, as to capture all of the numbers in the group
        let parenthesisSubscript = currentGroup.match(/[0-9]/g).pop();
        // Contains parsed token objects
        let parsedParenthesisTokens = [];
        // Loop through and parse token objects, pushing them on top of parsedParenthesisTokens
        for(let j = 0; j < parenthesisTokens.length; j++) {
            let tokenObject = parseToken(parenthesisTokens[j]);
            tokenObject.subscript *= parenthesisSubscript; 
            parsedParenthesisTokens.push(tokenObject);
        }
        // The formula which was parsed from the parenthesis group
        let parsedFormula = "";
        // Loop through and add to the parsedFormula
        for(let j = 0; j < parsedParenthesisTokens.length; j++) {
            parsedFormula += tokenToString(parsedParenthesisTokens[j]);
        }
        // Replace the current group with its parsedFormula in the provided formula
        formula = formula.replace(currentGroup, parsedFormula);
        
    }
    return(formula);
} 

/*
 * @param formula {String} Chemical formula to tokenize into split strings
 * @param parenthesisCheck {Boolean} Whether or not the function should check for parenthesis in the formula and make a call to parseParenthesis, true by default
 * @summary Uses the match function and a prepared regex to return string tokens which consist of the element symbol, and its subscript if provided one
 * @returns {String[]} An array of string tokens in the formula, if the array is empty, no matching string tokens were found
 */
function tokenizeFormula(formula, parenthesisCheck=true) {
    // If parenthesis need be parsed and parenthesisCheck is not provided to be false, parse out the parenthesis.
    if(parenthesisCheck && formula.match(parenthesisReg)) formula = parseParenthesis(formula);
    tokens = formula.match(tokenReg);
    return(tokens);
}

/*
 * @param token {String} A token which consist of an element symbol with its subscript if the abundance of the element is not one
 * @summary Uses the match function and prepared regexes
 * @returns {Object} An object with the fields "symbol" and "subscript", consisting of the element's respective parts, both fields will consist of an empty string if the token provided did not have a valid symbol, otherwise with a symbol the "subscript" field defaults to one
 */
function parseToken(token) {
    symbol = token.match(symbolReg);
    // The match function returns null upon finding no matches in the string
    // If the match check does not find a symbol, return empty strings
    if(symbol == null) return({symbol: "", subscript: ""})
    // Otherwise check if there is a subscript
    subscript = token.match(numberReg);
    // If no subscript was found default the subscript to 1
    if(subscript == null) subscript = [1];
    // Return the object
    return({
        symbol: symbol[0],
        subscript: parseInt(subscript[0])
    });
}

/*
 * @param {String} formula Formula to handle and turn into an array of objects
 * @summary Making use of other functions created, converts a formula into an array of token objects
 * @returns {Object[]} An array of object tokens consisting of a "symbol" field and a "subscript" field
 */
function parseFormula(formula) {
    let stringTokens = tokenizeFormula(formula);
    let objectTokens = []
    for(let i = 0; i < stringTokens.length; i++) {
        // Current token to parse and add to objectTokens array
        let currentStringToken = stringTokens[i];
        let currentObjectToken = parseToken(currentStringToken);
        objectTokens.push(currentObjectToken);
    }
    // Return the parsed object tokens
    return(objectTokens);
}

module.exports = {
    tokenToString: tokenToString,
    parseParenthesis: parseParenthesis,
    tokenizeFormula: tokenizeFormula,
    parseToken: parseToken,
    parseFormula: parseFormula
};

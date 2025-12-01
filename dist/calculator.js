// --- 1. TYPING AND SETUP ---
// Get the display element and all button elements from the HTML.
// The '!' (non-null assertion) and 'as HTMLDivElement' casting tell TypeScript
// that these elements definitely exist and what type they are.
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
// This is the single source of truth for the calculator's state (what's on the screen).
// It MUST be 'let' because its value changes constantly.
let currentInput = '';
// --- 2. CORE LOGIC FUNCTION ---
// This function processes one button press, updates the state, and handles errors.
const processInput = (btnText, dataVal) => {
    // Decide the actual value to add to the math string. 
    // dataVal is used for complex operations (like 'sin(') while btnText is for simple numbers.
    const valueToAdd = dataVal ? dataVal : btnText;
    // --- LOGIC TREE ---
    // A. CLEAR BUTTON ('C')
    if (btnText === 'C') {
        currentInput = '';
        display.innerText = '0';
    }
    // B. DELETE BUTTON ('DEL')
    else if (btnText === 'DEL') {
        // .slice(0, -1) removes the last character from the string.
        currentInput = currentInput.slice(0, -1);
        // If the string is empty (''), display '0' instead.
        display.innerText = currentInput || '0';
    }
    // C. EQUALS BUTTON ('=') - Calculation
    else if (btnText === '=') {
        if (currentInput === '')
            return; // Don't calculate if nothing is entered
        try {
            // Use the safe math.evaluate() from the external library.
            const result = math.evaluate(currentInput);
            // Format the result to limit decimal places and handle large numbers professionally.
            const formattedResult = math.format(result, { precision: 14 });
            // Update UI and state with the result
            display.innerText = formattedResult;
            currentInput = formattedResult.toString();
        }
        catch (error) {
            // Handle any math errors (e.g., division by zero, unmatched parentheses)
            display.innerText = 'Error';
            currentInput = ''; // Reset state after an error
        }
    }
    // D. ALL OTHER BUTTONS (Numbers, Operators, Scientific Functions)
    else {
        // Append the value to the input string.
        currentInput += valueToAdd;
        // Update the display immediately to show the new number/operator.
        display.innerText = currentInput;
    }
};
// --- 3. EVENT HANDLING ---
// Attach the main logic function to every button click.
buttons.forEach((button) => {
    // We only need to define the anonymous function once here.
    button.addEventListener('click', () => {
        // We retrieve the necessary data only when the button is actually clicked.
        const dataVal = button.getAttribute('data-val');
        // Call the clean, testable logic function
        processInput(button.innerText, dataVal);
    });
});
export {};
//# sourceMappingURL=calculator.js.map
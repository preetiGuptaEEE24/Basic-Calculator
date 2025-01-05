const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = ''; // This stores the current input
let operator = ''; // This stores the current operator
let firstValue = ''; // This stores the first value before operator is pressed
let resultDisplayed = false; // To prevent resetting the display unnecessarily after pressing =

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;

        if (buttonValue === 'C') {
            // Clear all values when "C" is pressed
            currentInput = '';
            operator = '';
            firstValue = '';
            resultDisplayed = false;
            display.value = '';
        } else if (buttonValue === '=') {
            // Calculate the result when "=" is pressed
            if (firstValue && operator && currentInput !== '') {
                const result = calculate(firstValue, operator, currentInput);
                display.value = `${firstValue} ${operator} ${currentInput} = ${result}`;
                // Store the result in firstValue for further calculations
                firstValue = result;
                operator = '';
                currentInput = '';
                resultDisplayed = true;
            }
        } else if (['+', '-', '*', '/'].includes(buttonValue)) {
            // Handle operators
            if (firstValue === '') {
                firstValue = currentInput; // Store the first number entered
                currentInput = ''; // Clear current input for the next number
            } else if (currentInput !== '') {
                firstValue = calculate(firstValue, operator, currentInput); // Calculate intermediate result
            }
            operator = buttonValue; // Store the operator
            display.value = `${firstValue} ${operator}`; // Update display
            currentInput = ''; // Clear current input to enter next number
            resultDisplayed = false;
        } else {
            // If it's a number or decimal point, update the display
            if (resultDisplayed) {
                // If result is displayed, reset for a new calculation
                firstValue = '';
                operator = '';
                currentInput = buttonValue;
                resultDisplayed = false;
            } else {
                currentInput += buttonValue;
            }
            display.value = `${firstValue} ${operator} ${currentInput}`.trim(); // Show the current equation
        }
    });
});

function calculate(a, op, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return b;
    }
}

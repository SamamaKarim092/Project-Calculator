// Operations
const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const division = (a, b) => a / b;

// Initialization of Variables
let firstNumber = '';      // To store the first number
let secondNumber = '';     // To store the second number
let currentOperator = '';  // To store the chosen operator
let operatorSelected = false; // To check if an operator has been selected
const output = document.querySelector('.output'); // Output display
let displayValue = ''; // Variable to store display value

// Function to update the display
function updateDisplay(value) {
    output.textContent = value; // Directly update the output to the current value
}

// Function to clear the display
function clearDisplay() {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    operatorSelected = false; // Reset operator flag
    updateDisplay(''); // Clear the display
}

// Operation Function
const operate = (operator, num1, num2) => {
    // Handle division by zero
    if (operator === '/' && num2 === 0) {
        return "Cannot divide by zero"; // Error message
    }
    switch (operator) {
        case '+':
            return sum(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if (num2 === 0) {
                return 'Error'; // Prevent division by zero
            }
            return division(num1, num2);
        default:
            return "Invalid Operator";
    }
}

// Add event listeners to buttons
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        switch (value) {
            case 'Clear':
                clearDisplay(); // Clear all values
                break;

            case '=':
                if (firstNumber && currentOperator && secondNumber) {
                    const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
                    updateDisplay(result); // Show the result
                    // Prepare for the next calculation
                    firstNumber = result.toString(); // Convert result to string for further calculations
                    secondNumber = ''; // Reset second number
                    currentOperator = ''; // Reset operator
                    operatorSelected = false; // Reset operator flag
                }
                break;

            case '+':
            case '-':
            case '*':
            case '/':
                // Store the operator if it hasn't been selected already
                if (!operatorSelected && firstNumber) {
                    currentOperator = value; // Store operator
                    operatorSelected = true; // Mark that an operator has been selected
                    updateDisplay(firstNumber); // Update display to show the first number
                }
                break;

            case 'DEL':
                // Handle delete/backspace
                if (operatorSelected) {
                    // Remove the last character from the second number
                    secondNumber = secondNumber.slice(0, -1);
                    updateDisplay(secondNumber); // Update the display with the modified second number
                } else {
                    // Remove the last character from the first number
                    firstNumber = firstNumber.slice(0, -1);
                    updateDisplay(firstNumber); // Update the display with the modified first number
                }
                break;

            default: // Handle number button clicks
                if (!operatorSelected) {
                    firstNumber += value; // Build the first number
                    updateDisplay(firstNumber); // Update display to show the first number
                } else {
                    secondNumber += value; // Build the second number
                    updateDisplay(secondNumber); // Update display to show the second number
                }
        }
    });
});

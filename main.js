const canvas = document.getElementById("canvas");
const clearBtn = document.querySelector(".function"); // AC button
let currentValue = ""; // Tracks input

// Format numbers with commas
function formatWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Update the display
function updateDisplay(value) {
    canvas.textContent = formatWithCommas(value || "0");
    resizeText();
}

// Append to the display
function appendToDisplay(input) {
    if (currentValue === "0" && input !== ".") currentValue = ""; // Clear leading zero
    currentValue += input;
    updateDisplay(currentValue);
    updateClearButton();
}

// Resize text to fit within the canvas
function resizeText() {
    const canvasWidth = canvas.offsetWidth; // Get canvas width
    const fontSize = Math.min(48, canvasWidth / currentValue.length * 1.5); // Adjust font size
    canvas.style.fontSize = `${Math.max(fontSize, 18)}px`; // Minimum font size is 18px
}

// Clear the display
function clearDisplay() {
    currentValue = "";
    updateDisplay(currentValue);
    updateClearButton();
}

// Perform the calculation
function calculate() {
    try {
        const result = eval(currentValue.replace(/,/g, "")); // Remove commas before evaluation
        currentValue = result.toString();
        updateDisplay(currentValue);
    } catch {
        canvas.textContent = "Error";
        currentValue = "";
    }
}

// Update the "AC" to "C"
function updateClearButton() {
    clearBtn.textContent = currentValue ? "C" : "AC";
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    const validKeys = "0123456789+-*/.%";
    if (validKeys.includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === "Enter") {
        event.preventDefault();
        calculate();
    } else if (event.key === "Backspace") {
        currentValue = currentValue.slice(0, -1);
        updateDisplay(currentValue);
        updateClearButton();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});

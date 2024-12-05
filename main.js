

const canvas = document.getElementById("canvas");
const clearBtn = document.getElementById("clear-btn");

//  numbers appear with commas
function formatWithCommas(number) {
    return Number(number).toLocaleString();
}

// Resizes the font based on input length
function resizeFont() {
    const maxFontSize = 3;
    const minFontSize = 1;
     // Minimum font size
    const lengthThreshold = 10;
     // Length at which font size reduces
    const inputLength = canvas.value.length;

    if (inputLength > lengthThreshold) {
        const newFontSize = Math.max(
            minFontSize,
            maxFontSize - (inputLength - lengthThreshold) * 0.2
        );
        canvas.style.fontSize = `${newFontSize}rem`;
    } else {
        canvas.style.fontSize = `${maxFontSize}rem`;
    }
}

// Append input to display
function appendToDisplay(input) {
    canvas.value += input;
    canvas.value = formatWithCommas(canvas.value.replace(/,/g, ''));
    resizeFont();
    updateClearButton();
}

// ac/c Clear the display
function clearDisplay() {
    canvas.value = ""; // Clear the display
    resizeFont(); // Reset font size
    updateClearButton(); // Update button text
}

// Calculates the result
function calculate() {
    try {
        const result = eval(canvas.value.replace(/,/g, ''));
        canvas.value = formatWithCommas(result);
    } catch {
        canvas.value = "Error";
    }
    resizeFont();
    updateClearButton();
}

// Updates the  "AC" button to "C" dynamically
function updateClearButton() {
    clearBtn.textContent = canvas.value.length > 0 ? "C" : "AC";
}

// enables the keyboard to input values
document.addEventListener("keydown", (event) => {
    const validKeys = "0123456789+-*/.%";
    const key = event.key;

    if (validKeys.includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        event.preventDefault(); // Prevent default browser action
        calculate();
    } else if (key === "Backspace") {
        canvas.value = canvas.value.slice(0, -1);
        canvas.value = formatWithCommas(canvas.value.replace(/,/g, ''));
        resizeFont();
        updateClearButton();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

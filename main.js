const canvas = document.getElementById("canvas");

function appendToDisplay(input) {
    canvas.value += input;
}

function clearDisplay() {
    canvas.value = "";
}

function calculate() {
    try {
        
        canvas.classList.add("fade-shrink");

        
        setTimeout(() => {
            canvas.value = eval(canvas.value);
           
            canvas.classList.remove("fade-shrink");
        }, 1000); 
    } catch (error) {
        canvas.value = "Error";
    }
}

function toggleSign() {
    if (canvas.value) {
        canvas.value = parseFloat(canvas.value) * -1;
    }
}

function applyPercentage() {
    if (canvas.value) {
        canvas.value = parseFloat(canvas.value) / 100;
    }
}

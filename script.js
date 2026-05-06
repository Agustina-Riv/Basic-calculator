const display = document.querySelector(".calculator-display");
const keypad = document.querySelector(".calculator-keypad");
const historyDisplay = document.querySelector(".history-display");
const btn = document.querySelector("#boton-oscuro");
const body = document.body;

btn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        btn.textContent = "Modo claro 🌤️";
    } else {
        btn.textContent = "Modo oscuro 🌑";
    }
})

const buttons = [
    {label: "CE", type: "clear"},
    {label: "←", type: "delete"},
    {label: "/", type: "operator"},
    {label: "7", type: "number"},
    {label: "8", type: "number"},
    {label: "9", type: "number"},
    {label: "*", type: "operator"},
    {label: "4", type: "number"},
    {label: "5", type: "number"},
    {label: "6", type: "number"},
    {label: "-", type: "operator"},
    {label: "1", type: "number"},
    {label: "2", type: "number"},
    {label: "3", type: "number"},
    {label: "+", type: "operator"},
    {label: "0", type: "number"},
    {label: ".", type: "number"},
    {label: "=", type: "operator"}
];

buttons.forEach(function(buttonConfig) {
    const button = document.createElement("button");

    button.textContent = buttonConfig.label;
    button.dataset.type = buttonConfig.type;
    button.dataset.value = buttonConfig.label;
    button.classList.add("calculator-button");
    if (buttonConfig.type === "operator") {
        button.classList.add("operator");
    }
    
    if (buttonConfig.label === "0" || buttonConfig.label === "CE") {
        button.style.gridColumn = "span 2";
    }

    keypad.append(button);
});

const calculatorState = {
    currentValue: "0",
    previousValue: null,
    operator: null,
}

function renderDisplay() {
    display.textContent = calculatorState.currentValue;
}

keypad.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) return;
    const type = button.dataset.type;
    const value = button.dataset.value;

    if (type === "number") {
        handleNumber(value);
    }
    
    if (type === "operator") {
        if (value === "=") {
            calculateResult();
        } else {
            handleOperator(value);
        }
    }

    if (type === "clear") {
        clearCalculator();
    }

    if (type === "delete") {
        deleteLastDigit();
    }

    renderDisplay();
})

function handleNumber(value) {
    if (value === ".") {
        if (calculatorState.currentValue.includes(".")) {
            return;
        }
        calculatorState.currentValue += value;
        return;
    }

    if (calculatorState.currentValue === "0") {
        calculatorState.currentValue = value;
        return;
    }
    calculatorState.currentValue += value;
}

function handleOperator(operator) {
    calculatorState.previousValue = calculatorState.currentValue;
    calculatorState.operator = operator;
    calculatorState.currentValue = "0";
}

function clearCalculator() {
    calculatorState.currentValue = "0";
    calculatorState.previousValue = null;
    calculatorState.operator = null;
}

function deleteLastDigit() {
    if (calculatorState.currentValue.length > 1) {
        calculatorState.currentValue = calculatorState.currentValue.slice(0, -1);
    } else {
        calculatorState.currentValue = "0";
    }
}

function calculateResult() {
    if (calculatorState.previousValue === null || calculatorState.operator === null) {
        return;
    }

    const previous = Number(calculatorState.previousValue);
    const current = Number(calculatorState.currentValue);
    let result = 0;
    
    if (calculatorState.operator === "+") {
    result = previous + current;
    }
    if (calculatorState.operator === "-") {
    result = previous - current;
    }
    if (calculatorState.operator === "*") {
    result = previous * current;
    }
    if (calculatorState.operator === "/") {
    result = previous / current;
    }
    
    // Guardar en el historial
    historyDisplay.textContent = `${previous} ${calculatorState.operator} ${current} = ${result}`;

    calculatorState.currentValue = String(result);
    calculatorState.previousValue = null;
    calculatorState.operator = null;
}


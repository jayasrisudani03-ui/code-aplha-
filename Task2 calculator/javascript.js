const display =
    document.getElementById("display");

const history =
    document.getElementById("history");

const buttons =
    document.querySelector(".buttons");

const themeBtn =
    document.getElementById("themeBtn");


let current = "0";

let previous = null;

let operator = null;

let waitingForNumber = false;

let calculated = false;


/* DISPLAY */

function updateDisplay() {

    display.value = current;

}


/* FORMAT NUMBER */

function formatNumber(number) {

    if (!Number.isFinite(number)) {

        return "Error";

    }

    return String(
        Number(
            number.toFixed(10)
        )
    );

}


/* NUMBER */

function inputNumber(number) {

    if (
        current === "Error" ||
        waitingForNumber ||
        calculated
    ) {

        current = number;

        waitingForNumber = false;

        calculated = false;

    }

    else {

        if (current === "0") {

            current = number;

        }

        else {

            current += number;

        }

    }

    updateDisplay();

}


/* DECIMAL */

function decimal() {

    if (
        current === "Error" ||
        waitingForNumber ||
        calculated
    ) {

        current = "0.";

        waitingForNumber = false;

        calculated = false;

    }

    else if (
        !current.includes(".")
    ) {

        current += ".";

    }

    updateDisplay();

}


/* CLEAR */

function clearCalculator() {

    current = "0";

    previous = null;

    operator = null;

    waitingForNumber = false;

    calculated = false;

    history.textContent = "";

    updateDisplay();

}


/* DELETE */

function deleteNumber() {

    if (
        waitingForNumber ||
        calculated ||
        current === "Error"
    ) {

        return;

    }

    if (current.length > 1) {

        current =
            current.slice(0, -1);

    }

    else {

        current = "0";

    }

    updateDisplay();

}


/* PERCENTAGE */

function percentage() {

    if (current === "Error") {

        return;

    }

    const number =
        Number(current);

    current =
        formatNumber(number / 100);

    updateDisplay();

}


/* CALCULATION */

function calculate(a, b, op) {

    switch (op) {

        case "+":

            return a + b;

        case "−":

            return a - b;

        case "×":

            return a * b;

        case "÷":

            if (b === 0) {

                return null;

            }

            return a / b;

        default:

            return b;

    }

}


/* OPERATOR */

function chooseOperator(nextOperator) {

    const number =
        Number(current);


    if (!Number.isFinite(number)) {

        clearCalculator();

        return;

    }


    if (
        operator &&
        waitingForNumber
    ) {

        operator =
            nextOperator;

        return;

    }


    if (previous === null) {

        previous = number;

    }

    else if (operator) {

        const result =
            calculate(
                previous,
                number,
                operator
            );


        if (result === null) {

            current = "Error";

            history.textContent =
                "Cannot divide by zero";

            previous = null;

            operator = null;

            updateDisplay();

            return;

        }


        current =
            formatNumber(result);

        previous =
            Number(current);

    }


    operator =
        nextOperator;

    waitingForNumber = true;

    calculated = false;

    history.textContent =
        `${previous} ${operator}`;

    updateDisplay();

}


/* EQUAL */

function equals() {

    if (
        operator === null ||
        previous === null ||
        waitingForNumber
    ) {

        return;

    }


    const second =
        Number(current);

    const first =
        previous;

    const selectedOperator =
        operator;


    const result =
        calculate(
            first,
            second,
            selectedOperator
        );


    if (result === null) {

        current = "Error";

        history.textContent =
            "Cannot divide by zero";

    }

    else {

        current =
            formatNumber(result);

        history.textContent =
            `${first} ${selectedOperator} ${second} =`;

    }


    previous = null;

    operator = null;

    waitingForNumber = false;

    calculated = true;

    updateDisplay();

}


/* BUTTON CLICK */

buttons.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest("button");


        if (!button) {

            return;

        }


        /* NUMBER */

        if (
            button.dataset.number
            !== undefined
        ) {

            inputNumber(
                button.dataset.number
            );

        }


        /* OPERATOR */

        else if (
            button.dataset.operator
        ) {

            chooseOperator(
                button.dataset.operator
            );

        }


        /* DECIMAL */

        else if (
            button.dataset.action ===
            "decimal"
        ) {

            decimal();

        }


        /* CLEAR */

        else if (
            button.dataset.action ===
            "clear"
        ) {

            clearCalculator();

        }


        /* DELETE */

        else if (
            button.dataset.action ===
            "delete"
        ) {

            deleteNumber();

        }


        /* PERCENT */

        else if (
            button.dataset.action ===
            "percent"
        ) {

            percentage();

        }


        /* EQUAL */

        else if (
            button.dataset.action ===
            "equals"
        ) {

            equals();

        }

    }
);


/* KEYBOARD SUPPORT */

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key;


        /* NUMBERS */

        if (/^[0-9]$/.test(key)) {

            inputNumber(key);

        }


        /* DECIMAL */

        else if (key === ".") {

            decimal();

        }


        /* ADDITION */

        else if (key === "+") {

            chooseOperator("+");

        }


        /* SUBTRACTION */

        else if (key === "-") {

            chooseOperator("−");

        }


        /* MULTIPLICATION */

        else if (
            key === "*" ||
            key.toLowerCase() === "x"
        ) {

            chooseOperator("×");

        }


        /* DIVISION */

        else if (key === "/") {

            event.preventDefault();

            chooseOperator("÷");

        }


        /* PERCENT */

        else if (key === "%") {

            percentage();

        }


        /* EQUAL */

        else if (
            key === "Enter" ||
            key === "="
        ) {

            equals();

        }


        /* DELETE */

        else if (key === "Backspace") {

            deleteNumber();

        }


        /* CLEAR */

        else if (
            key === "Escape" ||
            key.toLowerCase() === "c"
        ) {

            clearCalculator();

        }

    }
);


/* DARK MODE */

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeBtn.textContent = "☀";

        }

        else {

            themeBtn.textContent = "☾";

        }

    }
);


/* INITIAL DISPLAY */

updateDisplay();
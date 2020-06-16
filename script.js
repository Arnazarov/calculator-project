const container = document.querySelector(".container");
const buttons = document.querySelectorAll(".btn");
const digits = document.querySelectorAll(".btn-digits");
const others = document.querySelectorAll(".btn-other");
const operators = document.querySelectorAll(".btn-operator");
const display = document.getElementById("display");
const clear = document.querySelector(".btn-clear");
const del = document.querySelector(".btn-del");
const equalSign = document.getElementById("equals");
display.value = "0";
let minus = true;
let sum = 0, digit = "", operator = "", choose = "";

clear.addEventListener("click", clearScreen);
del.addEventListener("click", backspace);
operators.forEach(operator => operator.addEventListener("click", operate));
digits.forEach(digit => digit.addEventListener("click", displayOnScreen));
others.forEach(other => other.addEventListener("click", displayOnScreen));
equalSign.addEventListener("click", onEqual);

function displayOnScreen(e) {
    if (!display.value || display.value === "0")
        display.value = "";
    
    if (e.target.classList[2] === "btn-digits") 
        digit += e.target.textContent;
    else if (e.target.classList[1] === "btn-point") 
        digit += e.target.textContent;

    digit = checkLength(digit)
    display.value = digit; 
    removeChosen();
}

function checkLength(str) {
    if (str.length <= 9)
        arr = str.split("");
    else if (str.length > 9)
        str = arr.join("");

    return str;
}
function operate(e) {
    removeChosen();
    calculate(e); 
    operator = e.target.textContent;
    choose = e.target;
    choose.classList.add('chosen'); 
    display.value = sum + operator;
    digit = "";
}

function calculate(e) {
    digit = Number(digit);
    if (operator === "+")
        sum += digit;
    else if (operator === "-") {
        sum -= (sum===0) ? -1*digit:digit;
    }
    else if (operator === "*") {
        digit = (digit=== 0) ? 1 : digit;
        sum = (sum===0)?digit:(sum*digit);
    }
    else if (operator === "/") {
        digit = (digit=== 0) ? 1 : digit;
        sum = (sum===0)?digit:(sum/digit);
    }
    else
        sum = digit;

    if (e.target.textContent === "=")
        digit = "";

    sum = checkDecimal(sum);
    removeChosen();
}

function checkDecimal(n) {
    return (n % 1 === 0) ? n: parseFloat(n.toFixed(2));
}

function removeChosen() {
    if (choose)
        choose.classList.remove('chosen');
}

function onEqual(e) {
    calculate(e);
    display.value = sum;
}

function backspace() {
    let string = display.value;
    digit = Number(string.substring(0, string.length-1));
    display.value = digit;
    if (choose) {
        removeChosen();
        operator = "";
    }
    if (digit === 0)
        digit = "";
}

function clearScreen() {
    display.value = "0";
    minus = true;
    sum = 0;
    digit = "";
    operator = "";
    removeChosen(); 
    choose = "";
}

// keypress
const numKeyCodes = {
    48 : '0',
    49 : '1',
    50 : '2',
    51 : '3',
    52 : '4',
    53 : '5',
    54 : '6',
    55 : '7',
    56 : '8',
    57 : '9',
    96 : '0',
    97 : '1',
    98 : '2',
    99 : '3',
    100 : '4',
    101 : '5',
    102 : '6',
    103 : '7',
    104 : '8',
    105 : '9',
    110 : '.',
    190 : '.',
};

const operatorKeyCodes = {
    109 : '-',
    107 : '+',
    111 : '/',
    106 : '*',

}

const functionKeyCodes = {
    61 : '=',
    13 : '=',
}

document.addEventListener("keyup", (e) => {
    if (e.keyCode in numKeyCodes) {
        digit += e.key;
        digit = checkLength(digit)
        display.value = digit; 
        removeChosen();
    }
    else if (e.keyCode in operatorKeyCodes) {
        removeChosen();
        calculate(e); 
        operator = e.key;
        choose = e.target;
        choose.classList.add('chosen'); 
        display.value = sum + operator;
        digit = "";
    }
    else if (e.keyCode in functionKeyCodes) {
        calculate(e);
        display.value = sum;
    }
});
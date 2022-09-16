let firstnum = "";
let secondnum = "";
let numtypedtimes = 0;
let operatorclickedTimes = 0;
let clicktimes = 0;
let operators = "+-÷×";
let firstoperator = "";
let secondoperator = "";
let currentelement = '';

/* basic mathematical operator operating on two numbers*/
function add(result, newnum) {
    result = Number(result);
    newnum = Number(newnum);
    result += newnum;
    secondnum = '';
    firstoperator = secondoperator;
    console.log("added=" + result);
    return result;
}

function subtract(result, newnum) {
    result = Number(result);
    newnum = Number(newnum);
    result -= newnum;
    secondnum = '';
    firstoperator = secondoperator;
    console.log("subtracted=" + result);
    return result;
}

function multiply(result, newnum) {
    result = Number(result);
    newnum = Number(newnum);
    result *= newnum;
    secondnum = '';
    firstoperator = secondoperator;
    console.log("multiplied=" + result);
    return result;
}

function divide(result, newnum) {
    result = Number(result);
    newnum = Number(newnum);
    result /= newnum;
    secondnum = '';
    firstoperator = secondoperator;
    console.log("divided=" + result);
    return result;
}

/* checks for the operator and calls the appropriate function */
function operate(result, newnum, operation) {
    if (operation == "add") {
        firstnum = (Math.round(add(result, newnum)*100)/100).toString();
        result_display.textContent = firstnum;
    } else if (operation == "subtract") {
        firstnum = (Math.round(subtract(result, newnum)*100)/100).toString();
        result_display.textContent = firstnum;
    } else if (operation == "multiply") {
        firstnum = (Math.round(multiply(result, newnum)*100)/100).toString();
        result_display.textContent = firstnum;
    } else if (operation == "divide") {
        firstnum = (Math.round(divide(result, newnum)*100)/100).toString();
        result_display.textContent = firstnum;
    }

}

/* add event listener for each numerical buttons */

let number_btns = document.querySelectorAll(".num");
number_btns.forEach(number_btn => {
    number_btn.addEventListener("click", function(){
        if (numtypedtimes == 0) {
            // clears the 0 symbol from display
            if (clicktimes == 0) {
                display_btn.textContent = '';
            }
            //catches adjacent double '.' in a single number
            if ((display_btn.textContent.slice(-1) == ".") && (number_btn.textContent == ".")) {
                return;
            }
            clicktimes = 1;
            firstnum += number_btn.textContent;
            display_btn.textContent += number_btn.textContent;
            result_display.textContent = firstnum;
            currentelement = "firstnum";
            
            console.log("firstnum="+firstnum);
        } else if (numtypedtimes == 1) {
            //catches adjacent double '.' in a single number
            if ((display_btn.textContent.slice(-1) == ".") && (number_btn.textContent == ".")) {
                return;
            }
            secondnum += number_btn.textContent;
            
            display_btn.textContent += number_btn.textContent;
            currentelement = "secondnum";

            console.log("secondnum="+secondnum);
        }
    });
});


/* add event listener for each operator */
let operator_btns = document.querySelectorAll(".operator");
operator_btns.forEach(operator_btn => {
    operator_btn.addEventListener("click", function() {
        if (operatorclickedTimes == 0) {
            firstoperator = operator_btn.id;
            display_btn.textContent += operator_btn.textContent;
            numtypedtimes = 1;
            operatorclickedTimes = 1;
        } else if (operatorclickedTimes == 1) {
            //catches adjacent double operators in a single number
            display_btn.textContent.slice(-1)
            if (operators.includes(display_btn.textContent.slice(-1))) {
                return;
            }
            secondoperator = operator_btn.id;
            display_btn.textContent += operator_btn.textContent;
            operate(firstnum, secondnum, firstoperator);
            firstoperator = secondoperator;
        }
    });
});

/* query for the display to insert the clicked number */
display_btn = document.querySelector(".display span");

/* add event listener for equal operator */
let equal_btn = document.querySelector(".equalto");
equal_btn.addEventListener("click", () => {
    operate(firstnum, secondnum, firstoperator);
    display_btn.textContent = firstnum;
    result_display.textContent = firstnum;
});

/* always displays the result in bigger font */
let result_display = document.querySelector(".result_display");

/* ac button clicked to clear the screen */
let ac_btn = document.querySelector(".clear");
ac_btn.addEventListener("click", () =>{
    firstnum = "";
    secondnum = "";
    numtypedtimes = 0;
    operatorclickedTimes = 0;
    clicktimes = 0;
    firstoperator = "";
    secondoperator = "";
    result_display.textContent = '';
    display_btn.textContent = 0;
});

/* event listener for backspace btn to edit text*/
let backspace_btn = document.querySelector(".backspace");
backspace_btn.addEventListener("click", () => {
    if(currentelement == "firstnum") {
        firstnum = firstnum.slice(0, -1);
        display_btn.textContent = display_btn.textContent.slice(0, -1);
        result_display.textContent = firstnum;
    } else if (currentelement == "secondnum") {
        secondnum = secondnum.slice(0, -1);
        display_btn.textContent = display_btn.textContent.slice(0, -1);
    }
});
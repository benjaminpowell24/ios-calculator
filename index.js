const display = document.getElementById("display");
const form = document.getElementById("calc_form");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let is_operator = false;
let is_neg = 1;
let equation = [];

const remove_active = () => {
  operator_btns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    if (display.value == "0") {
      display.value = e.target.value;
    } else if (is_operator) {
      is_operator = false;
      display.value = e.target.value;
    } else if (display.value.includes(".")) {
      display.value = display.value + "" + e.target.value.replace(".", "");
    } else {
      display.value = display.value + "" + e.target.value;
    }
  });
});

operator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    e.currentTarget.classList.add("active");

    switch (e.target.value) {
      case "%":
        display.value = parseFloat(display.value) / 100;
        break;
      case "invert":
        display.value = parseFloat(display.value) * -1;
        break;
      case "=":
        equation.push(display.value);
        let last_operand = equation[equation.length - 2];
        console.log(last_operand);
        display.value = eval(equation.join(""));
        display.value = eval(`${display.value} * ${is_neg}`);
        equation = [];
        is_neg = 1;
        break;
      default:
        let last_item = equation[equation.length - 1];
        if (
          ["/", "*", "+", "-"].includes(last_item) &&
          is_operator &&
          e.target.value !== "-"
        ) {
          equation.pop();
          equation.push(e.target.value);
        } else if (
          ["/", "*"].includes(last_item) &&
          is_operator &&
          e.target.value === "-"
        ) {
          is_neg = parseFloat(is_neg) * -1;
        } else {
          equation.push(display.value);
          equation.push(e.target.value);
        }
        console.log(equation);
        is_operator = true;
        break;
    }
  });
});

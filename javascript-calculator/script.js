// Disable the three out of scope buttons for AC, +/-, and %
const ac_button = document.getElementById("clear");
ac_button.disabled = true;

const plusminus_button = document.getElementById("plusminus");
plusminus_button.disabled = true;

const percent_button = document.getElementById("percent");
percent_button.disabled = true;

// function for getting current output value
function getOutput() {
	return document.getElementById("output-value").innerText;
}

// function for printing new output value and checking errors/constraints
function printOutput(num) {
	if (num.toString().length > 10) {
		document.getElementById("output-value").innerText = "Error";
	} else if (num === Infinity) {
		document.getElementById("output-value").innerText = "Undefined";
	} else {
		document.getElementById("output-value").innerText = num;
	}
}

// variable to store equation to be evaluated
var calculation = "";

// add event listeners for all operator buttons
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
	operator[i].addEventListener('click', function () {
		// get current output value
		var output = getOutput();
		// build equation for evaluation
		if (output != "") {
			calculation = calculation + output;
			if (this.id == "=") {
				var result = eval(calculation);
				printOutput(result);
				calculation = "";
			} else {
				calculation = calculation + this.id;
				printOutput("");
			}
		}
	});
}

// add event listeners for all number buttons
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
	number[i].addEventListener('click', function () {
		var output = getOutput();
		if (output != NaN) {
			output = output + this.id;
			printOutput(output);
		}
	});
}
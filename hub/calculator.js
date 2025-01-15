const result = document.querySelector('#result');
const reset = document.querySelector('#reset');
const zero = document.querySelector('#zero');
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const seven = document.querySelector('#seven');
const heigth = document.querySelector('#heigth');
const nine = document.querySelector('#nine');
const divide = document.querySelector('#divide');
const multiply = document.querySelector('#multiply');
const dot = document.querySelector('#dot');
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const equal = document.querySelector('#equal');

equal.addEventListener('click', () => {
	let resultValue = result.value
	result.value = eval(resultValue)
})

reset.addEventListener('click', () => {
	result.value = ""
})

document.addEventListener('keypress', () => {
	if (event.key === 'Enter')
	{
		equal.click()
	}
	if (event.key == '0' || event.key == '1' 
		|| event.key == '2' || event.key == '3' 
		|| event.key == '4' || event.key == '5' 
		|| event.key == '6' || event.key == '7' 
		|| event.key == '8' || event.key == '9' 
		|| event.key == '+' || event.key == '-' 
		|| event.key == '*' || event.key == '/'
		|| event.key == "." || event.key == "(" || event.key == ")")
	{
		if(!(result === document.activeElement))
		{
			result.value += event.key
		}
	}
})

result.addEventListener('keypress', () => {
	if (!(event.key == '0' || event.key == '1' 
		|| event.key == '2' || event.key == '3' 
		|| event.key == '4' || event.key == '5' 
		|| event.key == '6' || event.key == '7' 
		|| event.key == '8' || event.key == '9' 
		|| event.key == '+' || event.key == '-' 
		|| event.key == '*' || event.key == '/'
		|| event.key == "." || event.key == "(" || event.key == ")" || event.key === "Enter"))
	{
		console.log('non usable character entered');
		event.preventDefault();
	}
})

zero.addEventListener('click', () => {
	result.value += zero.value
})

one.addEventListener('click', () => {
	result.value += one.value
})

two.addEventListener('click', () => {
	result.value += two.value
})

three.addEventListener('click', () => {
	result.value += three.value
})

four.addEventListener('click', () => {
	result.value += four.value
})

five.addEventListener('click', () => {
	result.value += five.value
})

six.addEventListener('click', () => {
	result.value += six.value
})

seven.addEventListener('click', () => {
	result.value += seven.value
})

heigth.addEventListener('click', () => {
	result.value += heigth.value
})

nine.addEventListener('click', () => {
	result.value += nine.value
})

divide.addEventListener('click', () => {
	result.value += divide.value
})

plus.addEventListener('click', () => {
	result.value += plus.value
})

minus.addEventListener('click', () => {
	result.value += minus.value
})

dot.addEventListener('click', () => {
	result.value += dot.value
})

multiply.addEventListener('click', () => {
	result.value += multiply.value
})
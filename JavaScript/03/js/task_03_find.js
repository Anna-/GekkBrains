/*
1). Напишите регулярное выражение для поиска HTML-цвета, заданного как #ABCDEF, то есть # и содержит затем 6 шестнадцатеричных символов.
2). Создайте регэксп, который ищет все положительные числа, в том числе и с десятичной точкой. Например, var str = "1.5 0 12. 123.4."
3). Время может быть в формате часы:минуты или часы-минуты. И часы и минуты состоят из двух цифр, например 09:00, 21-30. 
Напишите регулярное выражение для поиска времени.
4). Написать проверку правильности координаты в файле инициализации шахматной доски c помощью регулярного выражения. 
Он должен иметь формат вида A6.
*/

function FinderForm (type) {
	var self = this;
	var inputFieldId = "";
	var outputFieldId = "";
	var REGS = [
		/(#[0-9a-f]{3}) | (#[0-9a-f]{6})\b/ig, /*посик цвета*/
		/number/ig, /*посик положительного числа*/
		/date/ig, /*посик даты в двух возможных форматах*/
		/[A-H][1-8]\b/g, /*посик коррдинат шахматной доски*/
		];

	this.init = function (submitButtonId, inputId, outputId) {
		inputFieldId = inputId;
		outputFieldId = outputId;
		document.getElementById(submitButtonId).onclick = function () {
			self.find();
			return false;
		};
	}

	this.find = function () {
		console.log(type);
		switch(type) {
			case "1":
				findValueBy(REGS[0]);
				break;
			case "2":
				findValueBy(REGS[1]);
				break;
			case "3":
				findValueBy(REGS[2]);
				break;
			case "4":
				findValueBy(REGS[3]);
				break;
			default:
				showError("Тип формы неизвестен. Что надо найти?");
				break;
		}
	}

	function findValueBy(reg) {
		var input = document.getElementById(inputFieldId).value;
		var res = input.match(reg);
		showAnswer(res);
	}

	function showError(text) {
		document.getElementById(outputFieldId + "_message").innerText = text;
	}

	function showAnswer(text) {
		document.getElementById(outputFieldId).value = text;
	}

}

function getFormType() {
	return window.location.search.replace("?", "");
}

var form = new FinderForm(getFormType());
form.init("submit", "text", "found");

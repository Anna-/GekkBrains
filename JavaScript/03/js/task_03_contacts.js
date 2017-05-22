/*
5). Написать регулярные выражения для следующих сущностей: номер телефона в формате +7(965)-123-45-67, email, серии и номера паспорта. 
Применить написанные регулярные выражения необходимо для валидации произвольной формы, 
в которой обязательно должны присутствовать описанные выше поля. 
Поля, которые проходят валидацию подсветить зеленым, остальные – красным.

*/

function FeedbackForm () {
	var self = this;
	var FIELDS = [
		"telephone",
		"email",
		"passport"
		];
	var REGS = [
		/(\+?[0-9]\((\d{3})\)(\d{3})-?(\d{2})-?(\d{2}))\b/g, /*проверка телефона*/
		/(\w+@\w+.\w+)\b/g, /*проверка почты*/
		/(\d{4}\s?\d{6})\b/g /*проверка пасспорта*/
		];

	this.init = function (submitButtonId) {
		document.getElementById(submitButtonId).onclick = function () {
			self.validate();
			return false;
		};
	}

	this.validate = function () {
		for (var i in FIELDS) {
			checkFieldByReg(FIELDS[i], REGS[i]);
		}
	}

	function checkFieldByReg(formField, reg) {
		var value = document.getElementById(formField).value;
		var res = reg.test(value);
		if (res) {
			removeError(formField);
		} else {
			showError(formField);
		}
	}

	function showError(fieldName) {
		document.getElementById(fieldName).classList.add("error");
		document.getElementById(fieldName).classList.remove("correct");
	}

	function removeError(fieldName) {
		document.getElementById(fieldName).classList.add("correct");
		document.getElementById(fieldName).classList.remove("error");
	}
}

var form = new FeedbackForm();
form.init("submit");

/*
1). С помощью ajax запросов к этому файлу необходимо реализовать валидатор формы. 

*/

function FeedbackForm () {
	var self = this;
	var FIELDS = [
		"Username",
		"Password",
		"Email",
		"Gender",
		"Credit Card",
		"Bio",
		"Birth"
		];

	this.init = function (submitButtonId) {
		document.getElementById(submitButtonId).onclick = function () {
			self.validate();
			return false;
		};
	}

	this.submit = function () {
		window.location.href = "contacts.php";
	}

	this.validate = function () {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "validator.php", true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

		xhr.timeout = 15000;
		xhr.ontimeout = function () {
			console.log("Время ожидания ответа превышено");
		}

		xhr.onreadystatechange = function () {
			console.log(xhr.readyState, xhr.status);
			if (xhr.readyState == 4 && xhr.status == 200) {
				parseResponse(xhr.responseText);
			}
		}

		var formData = getFormData();
		console.log(formData);
		xhr.send(formData);
	}

	function toFormField (fieldName) {
		return fieldName.toLowerCase().replace(" ", "_");
	}

	function getFormData() {
		var res = "";

		for (var i in FIELDS) {
			var field = toFormField(FIELDS[i]);
			if (res != "") {
				res += "&";
			}
			res += (field + "=" + document.getElementById(field).value);
		}
		return res;
	}

	function parseResponse(text) {
		var response = JSON.parse(text);

		var result = response['result'];
		if (result) {
			console.log("Форму можно отправлять");
			self.submit();
		} else {
			console.log("Некоторые поля заполнены некорректно");
			document.getElementById('message').innerText = "Некоторые поля заполнены некорректно";
			displayErrors(response['error']);
		}
	}

	function displayErrors(errors) {
		console.log(errors);
		for (var i in FIELDS) {
			var field = FIELDS[i];
			var formField = toFormField(field);

			if (errors[field]) {
				showError(formField, errors[field]);
			} else {
				removeError(formField);
			}
		}
	}

	function showError(fieldName, textError) {
		document.getElementById(fieldName + "_message").innerText = textError;
		document.getElementById(fieldName).classname += "error";
	}

	function removeError(fieldName) {
		document.getElementById(fieldName + "_message").innerText = "";
		document.getElementById(fieldName).classList.remove("error");
	}
}

var form = new FeedbackForm();
form.init("submit_button");

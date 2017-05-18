/*
1). С помощью ajax запросов к этому файлу необходимо реализовать валидатор формы. 

*/

var FIELDS = [
	"Username",
	"Password",
	"Email",
	"Gender",
	"Credit Card",
	"Bio",
	"Birth"
	];

function toFormField (fieldName) {
	return fieldName.toLowerCase().replace(" ", "_");
}

function submit() {
	window.location.href = "contacts.php";
}

function validate () {
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

function getFormData() {
	var res = "";

	for (var i in FIELDS) {
		var field = toFormField(FIELDS[i]);
		if (res != "") {
			res += "&";
		}
		res += (field + "=" + document.getElementById("input_" + field).value);
	}
	return res;
}

function parseResponse(text) {
	var response = JSON.parse(text);

	var result = response['result'];
	if (result) {
		console.log("Форму можно отправлять");
		submit();
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
	document.getElementById("input_" + fieldName).classname += "error";
}

function removeError(fieldName) {
	document.getElementById(fieldName + "_message").innerText = "";
	document.getElementById("input_" + fieldName).classList.remove('error');
}


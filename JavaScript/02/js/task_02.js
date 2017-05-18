/*
1). С помощью ajax запросов к этому файлу необходимо реализовать валидатор формы. 

*/

function validate () {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'validator.php', true);

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
	var	name = "username=" + document.getElementById("input_name").value;
	var	password = "password=" + document.getElementById('input_password').value;
	var	email = "email=" + document.getElementById('input_email').value;
	var	gender = "gender=" + document.getElementById('input_gender').value;
	var	credit_card = "credit_card=" + document.getElementById('input_credit_card').value;
	var bio = "bio=" + document.getElementById('input_bio').value;
	var birth = "birth=" + document.getElementById('input_birth').value;
	
	return 	name + '&' + 
			password + '&' + 
			email +'&' + 
			gender + '&' + 
			credit_card + '&' + 
			bio + '&' + 
			birth;
}

function parseResponse(text) {
	var response = JSON.parse(text);

	var result = response['result'];
	if (result) {
		console.log("Форму можно отправлять");
	} else {
		console.log("Некоторые поля заполнены некорректно");
		document.getElementById('message').innerText = "Некоторые поля заполнены некорректно";
	}

	var errors = response['error'];
	console.log(errors);
}

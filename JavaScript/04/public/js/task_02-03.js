/*
2). В форму обратной связи добавить возможность выбора города обращения. 
Сам список должен загружаться после загрузки страницы через AJAX.

3). Список из п.2 превратить в текстовое поле-автокомплит. 
Если пользователь ввёл 3 и более символов, нужно подгрузить список городов и показать подходящие по вводу. 
При клике на подходящий город, ввести его полное название в текстовое поле.
*/

function FeedbackForm (formId) {
	var self = this;
	this.citiesLimit = 5;
	this.citiesGroupId = "";
	this.citiesInputId = "";
	this.citiesSelectId = "";

	this.init = function (submitButtonId, citiesGroupId, citiesInputId, citiesSelectId) {
		self.citiesGroupId = citiesGroupId;
		self.citiesSelectId = citiesSelectId;
		self.citiesInputId = citiesInputId;
		document.getElementById(submitButtonId).onclick = function (event) {
			self.submit();
			event.preventDefault();
		};
		initCitiesInput();
	}

	this.submit = function () {
		console.log("submit");
		document.getElementById("message").innerText = "Форма отправлена";
	}

	this.getCities = function () {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "cities.php", true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

		xhr.timeout = 15000;
		xhr.ontimeout = function () {
			console.log("Время ожидания ответа превышено");
		}

		xhr.onreadystatechange = function () {
			console.log(xhr.readyState, xhr.status);
			if (xhr.readyState == 4 && xhr.status == 200) {
				createCitiesList(JSON.parse(xhr.responseText));
			}
		}

		var formData = 'mode=all&limit=' + self.citiesLimit + '&nameStarter=Сан';
		xhr.send(formData);
	}

	function initCitiesInput () {
		self.getCities();
		document.getElementById(self.citiesGroupId).addEventListener('click', showCitiesList);
		document.getElementById(self.citiesSelectId).addEventListener('blur', hideCitiesList); 
	}

	function showCitiesList() {
		document.getElementById(self.citiesSelectId).hidden = false;

		var hoverElement = document.getElementById(self.citiesSelectId).querySelector(':hover');
		if (hoverElement) {
			document.getElementById(self.citiesInputId).value = hoverElement.innerText;
		}
	}

	function hideCitiesList() {
		setTimeout(function() { 
				document.getElementById(self.citiesSelectId).hidden = true; 
			}, 100);
	}

	function createCitiesList(cities) {
		var select = document.getElementById(self.citiesSelectId);
		removeChilds(select);

		for (var i in cities) {
			var cityOption = document.createElement('option');
			cityOption.innerText = cities[i];
			select.appendChild(cityOption);
		}
	}

	function removeChilds(parent) {
		var children = parent.childNodes; 
		for (var i = 0; i < children.length; ++i) { 
			parent.removeChild(children[i]); 
		}
	}
}

var form = new FeedbackForm('feedback_form');
form.init('submit', 'cities_group', 'city', 'cities');

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
		$('#' + submitButtonId).on('click', 
			function (event) {
				self.submit();
				event.preventDefault();
			});
		initCitiesInput();
	}

	this.submit = function () {
		$('#message').text('Форма отправлена');
	}

	this.getCities = function (nameStarter = '') {
		var curMode = nameStarter ? 'part' : 'all';
		$.ajax({
			url: 'cities.php',
			dataType: 'json',
			type: 'POST',
			data: {
			    mode: curMode,
			    limit: self.citiesLimit,
			    nameStarter: nameStarter
			},
			success: function(result) {
			    createCitiesList(result);
			}
		});
	}

	function initCitiesInput () {
		$('#' + self.citiesGroupId).on('click', showCitiesList);
		$('#' + self.citiesInputId).on('focus keyup', prepareShortCitiesList);
		$('#' + self.citiesSelectId).on('blur', hideCitiesList);
	}

	function prepareShortCitiesList() {
		console.log('prepareShortCitiesList');
		var curValue = $('#' + self.citiesInputId).val();
		if (curValue == '') {
			self.getCities();
		} else if (curValue.length >= 3) {
			showCitiesList();
			self.getCities(curValue);
		} else {
			hideCitiesList();
		}
	}

	function showCitiesList() {
		console.log('showCitiesList');
		$('#' + self.citiesSelectId).show();

		var selectedElement = $('#' + self.citiesSelectId + ' option:selected');
		console.log(selectedElement);
		if (selectedElement.text() != '') {
			$('#' + self.citiesInputId).val(selectedElement.text());
		}
	}

	function hideCitiesList() {
		console.log('hideCitiesList');
		setTimeout(function() { 
				$('#' + self.citiesSelectId).hide();
			}, 100);
	}

	function createCitiesList(cities) {
		var select = $('#' + self.citiesSelectId);
		select.children().remove();

		for (var i in cities) {
			$('<option/>', {
				text: cities[i]
				}).appendTo(select);
		}
	}
}

var form = new FeedbackForm('feedback_form');
form.init('submit', 'cities_group', 'city', 'cities');

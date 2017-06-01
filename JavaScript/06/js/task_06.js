/*
1). Расширить форму валидации из прошлого урока следующими фичами:
-> Добавить поле даты рождения, название поля "birth", используя виджет jQuery UI
-> Добавить индикатор заполненности формы с помощью виджета jQuery UI (Progressbar)
-> Все возвращаемые ошибки выводить с помощью виджета Dialog
-> Ошибочные поля подсветить с помощью какого-нибудь эффекта, например, Bounce.

*/

function FeedbackForm (submitButtonId) {
	var self = this;
	var FIELDS = [
		'Username',
		'Password',
		'Email',
		'Gender',
		'Credit Card',
		'Bio',
		'Birth'
		];
	init();

	this.submit = submit;
	this.validate = validate;

	function submit() {
		window.location.href = 'contacts.php';
	}

	function validate() {
		$.ajax({
			url: 'validator.php',
			dataType: 'json',
			type: 'POST',
			data: getFormData(),
			success: function(result) {
			    parseResponse(result);
			}
		});
	}

	function init() {
		$('#birth').datepicker ({
			monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			firstDay: 1,
			dateFormat: 'yy-mm-dd'
		});

		$('#' + submitButtonId).on('click', 
			function (event) {
				self.validate();
				event.preventDefault();
			});

		initErrorDialogs();
		initProgressBar();
		initProgressBarChanging();
	}

	function initErrorDialogs() {
		$('.error_text').dialog({
			autoOpen: false,
			draggable: true,
			position: ['left','top']
		});
	}

	function initProgressBar() {
		$('#progress').after(
			$('<p>Ход процесса: <span id="progress_value">0</span>%</p>'));

		$('#progress').progressbar({
                value: 5,
				change: function(e) {
					$('#progress_value').text($('#progress').progressbar('value'));
				}
            });
	}

	function initProgressBarChanging() {
		$('#feedback_form').keyup(
			function (event) {
				var fulledInputs = 
					$(this).children()
					.filter('.input')
					.filter(function() { return $(this).val() != '' }).length;
				setProgressBar(fulledInputs);
		});
	}

	function setProgressBar(number) {
		var maxNumber = FIELDS.length;
		var value = (100 / maxNumber) * number;
		$('#progress').progressbar('value', Math.round(value));
	}

	function toFormField (fieldName) {
		return fieldName.toLowerCase().replace(/\s/g, '_');
	}

	function getFormData() {
		var res = {};

		for (var i in FIELDS) {
			var field = toFormField(FIELDS[i]);
			res[field] = $('#' + field).val();
		}
		return res;
	}

	function parseResponse(response) {
		var result = response['result'];
		if (result) {
			console.log('Форму можно отправлять');
			setProgressBar(FIELDS.length);
			self.submit();
		} else {
			console.log('Некоторые поля заполнены некорректно');
			$('#' + 'message').text('Некоторые поля заполнены некорректно');
			displayErrors(response['error']);
		}
	}

	function displayErrors(errors) {
		console.log(errors);
		var correctFields = 0;
		for (var i in FIELDS) {
			var field = FIELDS[i];
			var formField = toFormField(field);

			if (errors[field]) {
				showError(formField, errors[field]);
			} else {
				removeError(formField);
				correctFields++;
			}
		}
		activateErrorEffect();
		setProgressBar(correctFields);
	}

	function showError(fieldName, textError) {
		$('#' + fieldName + '_message').text(textError);
		$('#' + fieldName).addClass('error');

		$('#' + fieldName).click(function() {
			if ($('#' + fieldName + '_message').text() != '') {
				$('#' + fieldName + '_message').dialog('open');
			}
		});

		$('#' + fieldName).keypress(function() {
			$('#' + fieldName + '_message').dialog('close');
		});
	}

	function removeError(fieldName) {
		$('#' + fieldName + '_message').text('');
		$('#' + fieldName).removeClass('error');
	}

	function activateErrorEffect() {
		$('.error').effect(
			'bounce',
		    { times: 3 },
		    300);
	}
}

var form = new FeedbackForm('submit_button');

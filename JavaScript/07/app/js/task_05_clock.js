/*
1).  Создайте компонент "Часы" (Clock).
*/

function Clock(options) {
	var elem = options.elem;
	var hoursDiv = elem.querySelector('.hours');
	var minutesDiv = elem.querySelector('.minutes');
	var secondsDiv = elem.querySelector('.seconds');
	var timerId = null;

	this.start = start;
	this.stop = stop;
	this.reset = reset;
	this.synchronise = synchronise;

	elem.onclick = function(event) {
		var buttonType = event.target.value;
		eval(buttonType + '();');
	};

	function start() {
		if (!timerId) {
			timerId = setInterval(run, 1000);
		}
	}

	function stop() {
		if (timerId) {
			clearInterval(timerId);
			timerId = null;
		}
	}

	function reset() {
		setTime(0, 0, 0);
	}

	function synchronise() {
		var date = new Date();
		setTime(date.getHours(), date.getMinutes(), date.getSeconds());
	}

	function run() {
		var hours = Number(hoursDiv.innerText);
		var minutes = Number(minutesDiv.innerText);
		var seconds = Number(secondsDiv.innerText);

		if (seconds < 59) {
			seconds += 1;
		} else if (minutes < 59) {
			minutes += 1;
			seconds = 0;
		} else if (hours < 23) {
			hours += 1;
			minutes = 0;
			seconds = 0;
		} else {
			hours = 0;
			minutes = 0;
			seconds = 0;
		}
		setTime(hours, minutes, seconds);
	}

	function setTime(hours, minutes, seconds) {
		hoursDiv.innerText = getValidNumber(hours);
		minutesDiv.innerText = getValidNumber(minutes);
		secondsDiv.innerText = getValidNumber(seconds);
	}

	function getValidNumber(num) {
		return (num < 10) ? ('0' + num) : num;
	}
}

var clock = new Clock({
	elem: document.getElementById('clock')
});

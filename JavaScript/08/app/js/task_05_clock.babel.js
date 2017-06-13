/*
1).  Создайте компонент "Часы" (Clock).
*/

'use strict';

function Clock(options) {
	const elem = options.elem;
	const [hoursDiv, minutesDiv, secondsDiv] = [
		elem.querySelector('.hours'),
		elem.querySelector('.minutes'),
		elem.querySelector('.seconds')
	];
	let timerId = null;

	this.start = start;
	this.stop = stop;
	this.reset = reset;
	this.synchronise = synchronise;

	elem.onclick = function(event) {
		const buttonType = event.target.value;
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
		const date = new Date();
		setTime(date.getHours(), date.getMinutes(), date.getSeconds());
	}

	function run() {
		let [hours, minutes, seconds] = [
			Number(hoursDiv.innerText),
			Number(minutesDiv.innerText),
			Number(secondsDiv.innerText)
		];

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

let clock = new Clock({
	elem: document.getElementById('clock')
});

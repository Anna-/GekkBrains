/*
1)***.  Аналоговые часы
*/

function AnalogClock(clockParams) {
	var elem;
	var canvasContext;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	var timerId = null;

	this.getElem = getElem;
	this.start = start;
	this.stop = stop;
	this.reset = reset;
	this.synchronise = synchronise;

	function getElem() {
	    if (!elem) {
	    	create();
	    } 
	    return elem;
	}

	function create() {
		elem = document.createElement('div');
		elem.className = 'clock analog';

		var clockFace = document.createElement('div');
		clockFace.className = 'face';
		var faceCanvas = document.createElement('canvas');
		faceCanvas.weith = 300;
		faceCanvas.height = 300;
		drawAnalogClock(faceCanvas);
		clockFace.appendChild(faceCanvas);

		var clockButtons = document.createElement('div');
		clockButtons.className = 'buttons';
		clockButtons.appendChild(createButton('start', 'Старт'));
		clockButtons.appendChild(createButton('stop', 'Стоп'));
		clockButtons.appendChild(createButton('reset', 'Сбросить'));
		clockButtons.appendChild(createButton('synchronise', 'Текущее время'));

		elem.appendChild(clockFace);
		elem.appendChild(clockButtons);

		elem.onclick = function(event) {
			if (event.target.type == 'submit') {
				var buttonType = event.target.value;
				eval(buttonType + '();');
			}
		};
	}

	function createButton(value, text) {
		var button = document.createElement('button');
		button.value = value;
		button.innerText = text;
		return button;
	}

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
		showTime(hours, minutes, seconds);
	}

	function setTime(h, m, s) {
		hours = h;
		minutes = m;
		seconds = s;
		showTime(h, m, s);
	}


	function drawAnalogClock(canvas) {
		canvasContext = canvas.getContext('2d');
		if (!canvasContext) {
			alert('Скачай нормальный браузер');
			return;
		}
		showAnalogFace();
	}

	function showAnalogFace() {
		canvasContext.strokeStyle = clockParams.highlightColor;
		canvasContext.lineWidth = 4;

		canvasContext.fillStyle = clockParams.backgroundColor;
		canvasContext.beginPath();
		canvasContext.arc(clockParams.x, clockParams.y, clockParams.radius, 0, 2 * Math.PI, true);
		canvasContext.stroke();
		canvasContext.fill();
		canvasContext.closePath();

		canvasContext.fillStyle = clockParams.highlightColor;
		canvasContext.beginPath();
		canvasContext.arc(clockParams.x, clockParams.y, 5, 0, 2 * Math.PI, true);
		canvasContext.fill();
		canvasContext.closePath();
	}

	function showTime(hours, minutes, seconds) {
		//console.log(hours % 12 + ':' + minutes + ':' + seconds);
		showAnalogFace();

		var hourAngle = countAngle(360 / 720 * ((hours * 60) + minutes));
		var minuteAngle = countAngle(360 / 3600 * ((minutes * 60) + seconds));
		var secondAngle = countAngle(360 / 60 * seconds);

		showHand(hourAngle, clockParams.hourColor, 4, clockParams.radius * 0.7);
		showHand(minuteAngle, clockParams.minuteColor, 3, clockParams.radius * 0.8);
		showHand(secondAngle, clockParams.secondColor, 2, clockParams.radius * 0.9);
	}

	function countAngle (num) {
		return (num - 90) / 180 * Math.PI;
	}

	function showHand(angle, color, width, length){
		var x = clockParams.x + (length * Math.cos(angle));
		var y = clockParams.y + (length * Math.sin(angle));
		canvasContext.strokeStyle = color;
		canvasContext.lineWidth = width; 

		canvasContext.beginPath();
		canvasContext.moveTo(clockParams.x, clockParams.y);
		canvasContext.lineTo(x, y);
		canvasContext.stroke();
		canvasContext.closePath();
	}
}

var analogClock = new AnalogClock({
	x: 150,
	y: 150,
	radius: 100,
	highlightColor: '#212121',
	backgroundColor: '#f6f5f3',
	hourColor: '#212121',
	minuteColor: '#212121',
	secondColor: '#ed0600'
});
document.querySelector('.container').appendChild(analogClock.getElem());

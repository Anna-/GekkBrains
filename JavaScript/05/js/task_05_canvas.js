/*
3). Переписать доску для рисования из урока в виде графической компоненты
*/

function Canvas(options) {
	var elem = options.elem;
	var strokeStyle = options.params.strokeStyle;
	var fillStyle = options.params.fillStyle;
	var lineWidth = options.params.lineWidth;

	var context = elem.getContext('2d');
	check();

	this.drawFace = drawFace;

	function check() {
		if (!context) {
			alert('Скачай нормальный браузер');
			return;
		}
	}

	function drawFace() 
	{	
		context.strokeStyle = strokeStyle;
		context.fillStyle = fillStyle;
		context.lineWidth = lineWidth;
		
		drawCircle(150, 150, 100, 'stroke');
		drawCircle(110, 110, 15, 'fill');
		drawCircle(190, 110, 15, 'fill');

		context.beginPath();
		context.moveTo(150, 120);
		context.lineTo(135, 180);
		context.lineTo(165, 180);
		context.stroke();
		context.closePath();

		context.beginPath();
		context.arc(150, 150, 70, Math.PI, 2 * Math.PI, true);
		context.stroke();
		context.closePath();
	}

	function drawCircle(x, y, radius, drawingMethod = 'stroke') {
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI, true);
		context.stroke();
		eval('context.' + drawingMethod + '();');
		context.closePath();
	}
}

var canvas = new Canvas({
	elem: document.getElementById('canvas'),
	params: {
		strokeStyle: '#f00',
		fillStyle:'#ff0',
		lineWidth: 4
	}
});

canvas.drawFace();

/*
1). Разработать класс, генерирующий шахматную доску на странице. 
Конструктор в качестве параметра должен принимать селектор элемента в котором должна создаться доска, либо DOM Node. 
При этом должна быть возможность
	- подписаться на события доски через созданный объект (не напрямую к DOM Node, а именно извне используя только объект доски), 
	- получения и установки координаты активной ячейки (шахматной координаты вида “A1”).
Для генерации доски можно использовать произвольные html-тэги. 
Подумать какие свойства должны быть скрыты, а какие нет решение аргументировать в комментариях к коду.

2). Добавить базовый класс, который мог бы генерировать таблицы (доски) любого размера и унаследовать от него разработанный класс шахматной доски.

*/

function Board (width, height) {
	var WHITE = "white"; // css-класс для условно белых ячеек доски
	var BLACK = "black"; // css-класс для условно черных ячеек доски
	var pressedCell = null; // текущая нажатая кнопка
	var self = this;

	this.signX = "ABCDEFGHIKLMNOPQRSTVXYZ"; // массив для подписей ячеек доски по горизонтали
	this.signY = "123456789"; // аналогичено по вертикали
	this.boardId = "board"; // css-класс для доски
	this.cellSize = 65; // размер ячейки доски в пикселях

	this.build = function  (cellSize = 65) { // построение доски
		self.cellSize = cellSize;
		setBoardArea();
		generateBoard();
	}

	this.getPressedCellId = function () { // координаты текущей нажатой клетки
		if (pressedCell != null) {
			return pressedCell.id;
		}
		return null;
	}

	this.setPressedCellId = function (newId) { // задаём координаты текущей клетки
		if (pressedCell != null) {
			pressedCell.className = pressedCell.className.replace(" pressed", "");
		}
		pressedCell = document.getElementById(newId);
		pressedCell.className += " pressed";
	}

	this.addCellListener = function (event, handler) { // для всех клеток добавляем обработчик события
		var boardArea = document.getElementById(self.boardId);
		for (i = 0; i < boardArea.childNodes.length; ++i) {
			boardArea.childNodes[i].addEventListener(event, handler);
		}
	}

	this.removeCellListener = function (event, handler) { // для всех клеток удаляем обработчик события
		var boardArea = document.getElementById(self.boardId);
		var cells = boardArea.childNodes();
		for (i = 0; i < cells.length; ++i) {
			cells[i].removeEventListener(event, handler);
		}
	}

	function cellOnclick () {
		self.setPressedCellId(this.id);
	}

	function setBoardArea () {
		var widthSize = self.cellSize * (width + 1);
		var heightSize = self.cellSize * (height + 1);

		var content = document.getElementById("content");
		content.style.width = widthSize + "px";
		content.style.height = heightSize + "px";

		var boardArea = document.createElement('div');
		boardArea.id = self.boardId;
		boardArea.className = "center left";
		boardArea.style.width = widthSize + "px";
		boardArea.style.height = heightSize + "px";
		content.appendChild(boardArea);

		document.body.style.minWidth = widthSize;
		document.body.style.minHeight = heightSize;
	}

	function generateBoard () {
		var boardArea = document.getElementById(self.boardId);
		for (var i = 0; i < height + 2; ++i) {
			for (var j = 0; j < width + 2; ++j) {
				var cell; 
				if (i == 0 || i == (height + 1) || j == 0 || j == (width + 1)) {
					cell = createSignCell(i, j);
				} else {
					cell = createCell(i, j, j % 2 == i % 2);
				}
				boardArea.appendChild(cell);
			}
		}
	}

	function createCell (i, j, isWhite = true) {
		var cell = document.createElement('div');
		cell.onclick = cellOnclick;
		cell.id = getSignBy(self.signX, j - 1) 
				+ "" + getSignBy(self.signY, i - 1);
		cell.className = "left " + (isWhite ? WHITE : BLACK);
		cell.style.width = self.cellSize + "px";
		cell.style.height = self.cellSize + "px";
		cell.style.lineHeight = self.cellSize + "px";
		return cell;
	}

	function createSignCell (i = 0, j = 0) { 
		var signWidth = (j == 0 || j == (width + 1)) ? self.cellSize / 2 : self.cellSize;
		var signHeight = (i == 0 || i == (height + 1)) ? self.cellSize / 2 : self.cellSize;
		var text = "";

		if ((i == 0 || i == (height + 1)) && (j == 0 || j == (width + 1))) {
			text = "";
		} else if (j == 0 || j == (width + 1)) {
			text = getSignBy(self.signY, i - 1);
		} else {
			text = getSignBy(self.signX, j - 1);
		}
		return createSign(text, signWidth, signHeight);
	}

	function createSign (text = "0", signWidth, signHeight) {
		var signCell = document.createElement('div');
		signCell.className = "left sign";
		signCell.style.width = signWidth + "px";
		signCell.style.height = signHeight + "px";
		signCell.style.lineHeight = signHeight + "px";
		var inner_text = document.createTextNode(text);
		signCell.appendChild(inner_text);
		return signCell;
	}

	function getSignBy (signArray, i) {
		if (i >= signArray.length) {
			i = i - signArray.length;
		}
		return signArray[i];
	}
}

function ChessBoard () {
	Board.call(this, 8, 8); 
}

function showPressedCellId() {
	var infArea = document.getElementById("information");
	infArea.innerText = this.id;
}

var chess = new ChessBoard();
chess.build();
chess.setPressedCellId('D5');
chess.addCellListener('click', showPressedCellId);

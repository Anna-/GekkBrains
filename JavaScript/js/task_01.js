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
	var pressed_cell = null; // текущая нажатая кнопка
	var self = this;

	this.sign_x = "ABCDEFGHIKLMNOPQRSTVXYZ"; // массив для подписей ячеек доски по горизонтали
	this.sign_y = "123456789"; // аналогичено по вертикали
	this.board_id = "board"; // css-класс для доски
	this.cell_size = 65; // размер ячейки доски в пикселях

	this.build = function  (cell_size = 65) { // построение доски
		self.cell_size = cell_size;
		set_board_area();
		generate_board();
	}

	this.get_pressed_cell_id = function () { // координаты текущей нажатой клетки
		if (pressed_cell != null) {
			return pressed_cell.id;
		}
		return null;
	}

	this.set_pressed_cell_id = function (new_id) { // задаём координаты текущей клетки
		if (pressed_cell != null) {
			pressed_cell.className = pressed_cell.className.replace(" pressed", "");
		}
		pressed_cell = document.getElementById(new_id);
		pressed_cell.className += " pressed";
	}

	this.add_cell_listener = function (event, handler) { // для всех клеток добавляем обработчик события
		var board_area = document.getElementById(self.board_id);
		for (i = 0; i < board_area.childNodes.length; ++i) {
			board_area.childNodes[i].addEventListener(event, handler);
		}
	}

	this.remove_cell_listener = function (event, handler) { // для всех клеток удаляем обработчик события
		var board_area = document.getElementById(self.board_id);
		var cells = board_area.childNodes();
		for (i = 0; i < cells.length; ++i) {
			cells[i].removeEventListener(event, handler);
		}
	}

	function cell_onclick () {
		self.set_pressed_cell_id(this.id);
	}

	function set_board_area () {
		var width_size = self.cell_size * (width + 1);
		var height_size = self.cell_size * (height + 1);

		var content = document.getElementById("content");
		content.style.width = width_size + "px";
		content.style.height = height_size + "px";

		var board_area = document.createElement('div');
		board_area.id = self.board_id;
		board_area.className = "center left";
		board_area.style.width = width_size + "px";
		board_area.style.height = height_size + "px";
		content.appendChild(board_area);

		document.body.style.minWidth = width_size;
		document.body.style.minHeight = height_size;
	}

	function generate_board () {
		var board_area = document.getElementById(self.board_id);
		for (var i = 0; i < height + 2; ++i) {
			for (var j = 0; j < width + 2; ++j) {
				var cell; 
				if (i == 0 || i == (height + 1) || j == 0 || j == (width + 1)) {
					cell = create_sign_cell(i, j);
				} else {
					cell = create_cell(i, j, j % 2 == i % 2);
				}
				board_area.appendChild(cell);
			}
		}
	}

	function create_cell (i, j, isWhite = true) {
		var cell = document.createElement('div');
		cell.onclick = cell_onclick;
		cell.id = get_sign_by(self.sign_x, j - 1) 
				+ "" + get_sign_by(self.sign_y, i - 1);
		cell.className = "left " + (isWhite ? WHITE : BLACK);
		cell.style.width = self.cell_size + "px";
		cell.style.height = self.cell_size + "px";
		cell.style.lineHeight = self.cell_size + "px";
		return cell;
	}

	function create_sign_cell (i = 0, j = 0) { 
		var sign_width = (j == 0 || j == (width + 1)) ? self.cell_size / 2 : self.cell_size;
		var sign_height = (i == 0 || i == (height + 1)) ? self.cell_size / 2 : self.cell_size;
		var text = "";

		if ((i == 0 || i == (height + 1)) && (j == 0 || j == (width + 1))) {
			text = "";
		} else if (j == 0 || j == (width + 1)) {
			text = get_sign_by(self.sign_y, i - 1);
		} else {
			text = get_sign_by(self.sign_x, j - 1);
		}
		return create_sign(text, sign_width, sign_height);
	}

	function create_sign (text = "0", sign_width, sign_height) {
		var sign_cell = document.createElement('div');
		sign_cell.className = "left sign";
		sign_cell.style.width = sign_width + "px";
		sign_cell.style.height = sign_height + "px";
		sign_cell.style.lineHeight = sign_height + "px";
		var inner_text = document.createTextNode(text);
		sign_cell.appendChild(inner_text);
		return sign_cell;
	}

	function get_sign_by (sign_array, i) {
		if (i >= sign_array.length) {
			i = i - sign_array.length;
		}
		return sign_array[i];
	}
}

function ChessBoard () {
	Board.call(this, 8, 8); 
}

function show_pressed_cell_id() {
	var inf_area = document.getElementById("information");
	inf_area.innerText = this.id;
}

var chess = new ChessBoard();
chess.build();
chess.set_pressed_cell_id('D5');
chess.add_cell_listener('click', show_pressed_cell_id);

/*
2). Напишите функцию-конструктор new Voter(options) для голосовалки. 
По клику на + и — число должно увеличиваться или уменьшаться.
*/


function Voter(options) {
	var elem = options.elem;
	var upSpan = elem.querySelector('.up');
	var downSpan = elem.querySelector('.down');
	var voteSpan = elem.querySelector('.vote');

	this.setVote = setVote;

	elem.onmousedown = function() {
		return false;
	}
	
	elem.onclick = function(event) {
		var button = event.target;
		if (button == upSpan) {
			up();
		} else if (button == downSpan) {
			down();
		} 
	};

	function up() {
		var curVote = getVote();
		setVote(curVote + 1);
	}

	function down() {
		var curVote = getVote();
		setVote(curVote - 1);
	}

	function setVote(vote) {
		voteSpan.innerText = vote;
	}

	function getVote() {
		return Number(voteSpan.innerText);
	}
}

var voter = new Voter({
	elem: document.getElementById('voter')
});

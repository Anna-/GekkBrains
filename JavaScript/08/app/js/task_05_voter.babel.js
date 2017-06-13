/*
2). Напишите функцию-конструктор new Voter(options) для голосовалки. 
По клику на + и — число должно увеличиваться или уменьшаться.
*/


function Voter(options) {
	const elem = options.elem;
	const [upSpan, downSpan, voteSpan] = [
		elem.querySelector('.up'),
		elem.querySelector('.down'),
		elem.querySelector('.vote')
	];

	this.setVote = setVote;

	elem.onmousedown = function() {
		return false;
	}
	
	elem.onclick = function(event) {
		const button = event.target;
		if (button == upSpan) {
			up();
		} else if (button == downSpan) {
			down();
		} 
	};

	function up() {
		const curVote = getVote();
		setVote(curVote + 1);
	}

	function down() {
		const curVote = getVote();
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

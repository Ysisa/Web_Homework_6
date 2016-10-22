var playing = false;

window.onload = function() {

	//alert("If you have prepared for this game\nPlease click the button");

	//game.time = -1;

	var game = new Game();
	game.Initialize();

	getId("restart").onclick = function() { //游戏开始
		if (playing) {
			game.Initialize();
			playing = false;
		} else {
			game.Start();
			playing = true;
		}
	}

	var blocksList = getId("puzzle-container").childNodes;

	for (var i = 0; i < blocksList.length; i++) {
		blocksList[i].onclick = function() {
			if (playing) {
				if(game.Move(this)) {
					alert("You win!!");
					playing = false;
				}
			}

		}
	}

/*
	getId("puzzle-container").onclick = function() {
		console.log(this.id);
		game.Move(this);
	}
*/

};


function getId(id) {
	return document.getElementById(id)
};


var Game = function(){

	var width = 4;
	var height = 4;

	var randomTimes = 100;

	var container = null;
	var blocksList = null;
	var blankBlock = null;
	var position = null;
	var left = ["0%","25%","50%","75%"];
	var top = ["0%","25%","50%","75%"];

	this.Initialize = function() {

		position = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		container = getId("puzzle-container");
		blocksList = document.getElementsByClassName("block");
		blankBlock = blocksList[blocksList.length-1];

		for (var i = 0; i < blocksList.length; i++) {
			SetBlockPos(blocksList[i], i);
		};
	}

	this.Start = function() {

		for (var i = 0; i < randomTimes; i++) {
			this.Move(blocksList[Math.floor(Math.random()*15)]);
		}
	}

	this.Move = function(currentBlock) {

		var posA = position[GetIndex(currentBlock)];
		var posB = position[GetIndex(blankBlock)];

		if (Math.abs(Math.floor(posA/4) - Math.floor(posB/4))
			 + Math.abs(posA%4 - posB%4) == 1) {
			Swap(currentBlock, blankBlock);
		}

		if (CheckWin()) return true;
		return false;
	}

	Swap = function (picA, picB) {

		var index_A = GetIndex(picA);
		var index_B = GetIndex(picB);

		SetBlockPos(picA, position[index_B]);
		SetBlockPos(picB, position[index_A]);

		// picA.style.left = left[Math.floor(position[index_B]%width)];
		// picA.style.top = left[Math.floor(position[index_B]/width)];

		// picB.style.left = left[Math.floor(position[index_A]%width)];
		// picB.style.top = left[Math.floor(position[index_A]/width)];

		var temp = position[index_B];
		position[index_B] = position[index_A];
		position[index_A] = temp;

		// var left = picA.style.left;
		// var top = picA.style.top;
		// var boxName = picA.className;

		// picA.style.top = picB.style.top;
		// picA.style.left = picB.style.left;
		// picA.className = picB.className;

		// picB.style.top = top;
		// picB.style.left = left;
		// picB.className = boxName;
		// console.log(picA.style.cssText);
	}

	SetBlockPos = function(inputBlock, position) {
		inputBlock.style.left = left[position%width];
		inputBlock.style.top = left[Math.floor(position/width)];
	}

	GetIndex = function(inputBlock) {
		return parseInt(inputBlock.id.slice(1));
	}

	CheckWin = function() {
		for (var i = 0; i < position.length; i++) {
			if (position[i] != i) {
				return false;
			}
		}
		return true;
	}

}	
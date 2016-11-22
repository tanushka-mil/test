var container;
var playTable = '.play-table';
var users = [];
CELLS = 3;
var results;
var count = 0;
var arrCell = new Array();
var lineName;
var cellName;

$(function(){
	generateCells();
	cellsMatrix();
});

function createContainers(playTable, CELLS){
	for(columnIndex = 0; columnIndex < CELLS; columnIndex++){
		$(playTable).append('<div class="line" />');
		results = document.getElementsByClassName('line');
		results[columnIndex] =[];
		for(cellIndex = 0; cellIndex < CELLS; cellIndex++){
			$(results[columnIndex]).append('<div class="cell" />');
		}
	}
}

function cellsMatrix() {
	var commonArrCell = document.getElementsByClassName('cell');
	for(columnIndex = 0; columnIndex < CELLS; columnIndex++){
		arrCell[columnIndex] = $(commonArrCell).splice(columnIndex * CELLS, CELLS);
		lineName = "y" + columnIndex;
		$(arrCell[columnIndex]).addClass(lineName);
		for(cellIndex = 0; cellIndex < CELLS; cellIndex++){
			cellName = "x" + cellIndex;
			$(arrCell[columnIndex][cellIndex]).addClass(cellName);
		}
	};
}

function generateCells(){  // нужно переделать!!!!!!!!!!!!!!!
	$container = createContainers(playTable, CELLS);
}

function createUsers(){
	users =[];
	var firstUserName = document.getElementById('firstUserName').value !== "" ? document.getElementById('firstUserName').value : 'User 1';
	var secondUserName = document.getElementById('secondUserName').value !== "" ? document.getElementById('secondUserName').value : 'User 2';
	users.push({
		name: firstUserName
	});
	users.push({
		name: secondUserName
	});
	$('.save-massege-first').text("Имя первого игрока: "+ firstUserName);
	$('.save-massege-srcond').text("Имя второго игрока: "+ secondUserName);
	$('.popup').stop().delay(2000).fadeOut();
	$('h2').text(firstUserName + ", Ваш ход!").stop().delay(2000).fadeIn();
}

function generateCells(){
	$container = createContainers(playTable, CELLS);
}

function tableClick(e){
	var line = document.getElementsByClassName("line");
	for(var i = 0; i < line.length; i++){
		line[i].addEventListener("click", function(e){
		  	if(count == 0 && (!e.target.classList.contains('o'))){
		    	e.target.classList.add('x');
		    	// e.target.val = 1;
		    	$('h2').text(users[1].name + ", Ваш ход!").stop().delay(2000).fadeIn();
		    	count = 1;
		    	// console.log(e.target);
		    }
			else if(count == 1 && (!e.target.classList.contains('x'))){
		  		e.target.classList.add('o');
		  		// e.target.val = 0;
		  		$('h2').text(users[0].name + ", Ваш ход!").stop().delay(2000).fadeIn();
		    	count = 0;
		    	// console.log(e.target);
		    }
		    winner();
		})
	}
}

function winner(){
	var line = $(".line");
	var countVertX = [];
	var countVertO = [];
	var countGorX = [];
	var countGorO = [];
	var countDiagonalX =[];
	var countDiagonalO = [];


	for(var columnIndex = 0; columnIndex < CELLS; columnIndex++){
		countVertX.push(document.getElementsByClassName("y" + columnIndex + " x").length);
		countVertO.push(document.getElementsByClassName("y" + columnIndex + " o").length);
		countGorX.push(document.getElementsByClassName("x" + columnIndex + " x").length);
		countGorO.push(document.getElementsByClassName("x" + columnIndex + " o").length);

		if (countVertX[columnIndex] === CELLS || countVertO[columnIndex] === CELLS) {
			line[columnIndex].classList.add('win');
			console.log("WIN!!!!!!!!!!!!!!!");
		} else if (countGorX[columnIndex] === CELLS || countGorX[columnIndex] === CELLS) {
			$(arrCell[0][columnIndex]).addClass('win-gor-line');
			console.log("WIN!!!!!!!!!!!!!!!");
		}
	}
	

	for(var columnIndex = 0; columnIndex < CELLS; columnIndex++){
		countDiagonalX.push(document.getElementsByClassName("y" + columnIndex + " x" + columnIndex + " x"));
		countDiagonalO.push(document.getElementsByClassName("y" + columnIndex + " x" + columnIndex + " o").length);

		console.log(document.getElementsByClassName("y" + columnIndex + " x" + columnIndex + " x"));
		console.log(countDiagonalX);
		console.log(countDiagonalX.length); 
	}
	// console.log(countVertX);
		// console.log(countVertO);
		// console.log(countGorX);
		// console.log(countGorO);
		// console.log(countDiagonalX.length);
		// console.log(countDiagonalO);

}

$(document).on('click', '.save', function(e){
	createUsers();
	tableClick();
});



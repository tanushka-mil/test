var container;
var playTable = '.play-table';
var userNames = [];
CELLS = 3;
var results;
var count = 0;
var arrCell = new Array();
var lineName;
var cellName;
var line;
var lineWinWidth;

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
	return $(playTable).find('.cell');
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

function generateCells(){ 
	container = createContainers(playTable, CELLS);
}

function keepUserNames(){ // будет сохранять имена пользователей
	var firstUserName = document.getElementById('firstUserName').value !== "" ? document.getElementById('firstUserName').value : 'User 1';
	var secondUserName = document.getElementById('secondUserName').value !== "" ? document.getElementById('secondUserName').value : 'User 2';
	userNames = [firstUserName, secondUserName];
}

function enterUserNames(){ // выводит имена играков после сохраниния
	$('.save-massege-first').text("Имя первого игрока: "+ userNames[0]);
	$('.save-massege-srcond').text("Имя второго игрока: "+ userNames[1]);
}

function preparationGame(){ // скрывает попап и начинает игру
	line = document.getElementsByClassName("line");
	$('.popup').stop().delay(2000).fadeOut();
	$('.popup-container').stop().delay(2000).fadeOut();
	$('h2').text(userNames[0] + ", Ваш ход!").stop().delay(2000).fadeIn();
	for(var i = 0; i < line.length; i++){
		line[i].addEventListener("click", function(e){
			if (count == 0) {
				$('h2').text(userNames[1] + ", Ваш ход!").stop().delay(2000).fadeIn();
			} else if (count == 1) {
				$('h2').text(userNames[0] + ", Ваш ход!").stop().delay(2000).fadeIn();
			}
		});
	}
}





function generateCells(){
	$container = createContainers(playTable, CELLS);
}

function playerProgress(e){ // присваивает класс ячекам
	for(var i = 0; i < line.length; i++){
		line[i].addEventListener("click", function(e){
		  	if(count == 0 && (!e.target.classList.contains('o'))){
		    	e.target.classList.add('x');
				count = 1;
		    } else if(count == 1 && (!e.target.classList.contains('x'))){
		  		e.target.classList.add('o');
		    	count = 0;
		    }
		    checkingXYWinningLine();
		    winner();
		})
	}
}

function lineWidth() {
	lineWinWidth = (arrCell[0][0].clientWidth *10 / 100 + arrCell[0][0].clientWidth) * 3;
	console.log(lineWinWidth);
	console.log(arrCell[0][0].clientWidth);
}

function checkingXYWinningLine() {
	var countVertX = [];
	var countVertO = [];
	var countGorX = [];
	var countGorO = [];
	for(var columnIndex = 0; columnIndex < CELLS; columnIndex++){
		countVertX.push(document.getElementsByClassName("y" + columnIndex + " x").length);
		countVertO.push(document.getElementsByClassName("y" + columnIndex + " o").length);
		countGorX.push(document.getElementsByClassName("x" + columnIndex + " x").length);
		countGorO.push(document.getElementsByClassName("x" + columnIndex + " o").length);
		
		if (countVertX[columnIndex] === CELLS || countVertO[columnIndex] === CELLS) {
			line[columnIndex].classList.add('win');
			lineWidth();
			console.log("WIN!!!!!!!!!!!!!!!");
			enteringWinner();
		} else if (countGorX[columnIndex] === CELLS || countGorO[columnIndex] === CELLS) {
			$(arrCell[0][columnIndex]).addClass('win-gor-line').append('<div class="win-line" />');
			lineWidth();
			$('.win-line').animate({
				width: lineWinWidth + 'px'
			}, 500)
			console.log("WIN!!!!!!!!!!!!!!!");
			enteringWinner();
		}
	}
}

function winner(){
	var arrDiagonalX =[];
	var arrDiagonalO = [];
	var arrDiagonalXReverse =[];
	var arrDiagonalOReverse = [];
	for(var columnIndex = 0; columnIndex < CELLS; columnIndex++){
		arrDiagonalX.push(document.getElementsByClassName("y" + columnIndex + " x" + columnIndex + " x").length);
		arrDiagonalO.push(document.getElementsByClassName("y" + columnIndex + " x" + columnIndex + " o").length);
		arrDiagonalXReverse.push(document.getElementsByClassName("y" + columnIndex + " x" + (CELLS - columnIndex -1) + " x").length);
		arrDiagonalOReverse.push(document.getElementsByClassName("y" + columnIndex + " x" + (CELLS - columnIndex -1) + " o").length);
	}
	var countDiagonalX = arrDiagonalX.reduce(function(sum, current) {
  		return sum + current;
	}, 0);
	var countDiagonalO = arrDiagonalO.reduce(function(sum, current) {
  		return sum + current;
	}, 0);
	var countDiagonalXReverse = arrDiagonalXReverse.reduce(function(sum, current) {
  		return sum + current;
	}, 0);
	var countDiagonalOReverse = arrDiagonalOReverse.reduce(function(sum, current) {
  		return sum + current;
	}, 0);
	if (countDiagonalX === CELLS || countDiagonalO === CELLS) {
		$(playTable).addClass('win-left-diagonal');
		console.log("WIN!!!!!!!!!!!!!!!");
		enteringWinner();
	} else if (countDiagonalXReverse === CELLS || countDiagonalOReverse === CELLS) {
		$(playTable).addClass('win-right-diagonal');
		console.log("WIN!!!!!!!!!!!!!!!");
		enteringWinner();
	}

}

function enteringWinner() {
	$('.popup').stop().delay(1000).fadeIn();
	$('.winner-popup').stop().delay(1000).fadeIn();
	enteringWinnerName();
}
function enteringWinnerName() {
	$('.user-name span').text(count == 0 ? userNames[1] : userNames[0]);
}

function closeWinPopup() {
	$('.popup').stop().delay(1000).fadeOut();
	$('.winner-popup').stop().delay(1000).fadeOut();
}

$(document).on('click', '#save', function(e){
	keepUserNames();
	enterUserNames();
	preparationGame();
	playerProgress();
});

$(document).on('click', '#play', function(e){
	closeWinPopup();
	count = 0;
	lineWinWidth = 0;
	$('.cell').removeClass('x').removeClass('o').removeClass('win-gor-line');
	$(playTable).removeClass('win-left-diagonal').removeClass('win-right-diagonal');
	$('.win-line').remove();
	$('.line').removeClass('win');
	$('.win-line').css("width", "0");
	preparationGame();
});



var CELLS_COUNT = 3;
var $PLAY_CONTAINER = '.play-table';
var userNames = [];
var userIndex = 0;
var arrCell = new Array();
var line;
var lineWinWidth;

$(function(){
	var $container = createContainers($PLAY_CONTAINER, CELLS_COUNT);
	createCellsMatrix();
});

function createContainers($PLAY_CONTAINER, CELLS_COUNT){
	var results;
	for(columnIndex = 0; columnIndex < CELLS_COUNT; columnIndex++){
		$($PLAY_CONTAINER).append('<div class="line" />');
		results = document.getElementsByClassName('line');
		results[columnIndex] =[];
		for(cellIndex = 0; cellIndex < CELLS_COUNT; cellIndex++){
			$(results[columnIndex]).append('<div class="cell" />');
		}
	}
	return $($PLAY_CONTAINER).find('.cell');
}

function createCellsMatrix() {
	var commonArrCell = document.getElementsByClassName('cell');
	for(columnIndex = 0; columnIndex < CELLS_COUNT; columnIndex++){
		arrCell[columnIndex] = $(commonArrCell).splice(columnIndex * CELLS_COUNT, CELLS_COUNT);
		var lineName = "y" + columnIndex;
		$(arrCell[columnIndex]).addClass(lineName);
		for(cellIndex = 0; cellIndex < CELLS_COUNT; cellIndex++){
			var cellName = "x" + cellIndex;
			$(arrCell[columnIndex][cellIndex]).addClass(cellName);
		}
	};
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

function closePopup(){
	$('.popup').stop().delay(2000).fadeOut();
	$('.popup-container').stop().delay(2000).fadeOut();
}

function enterPlayerNames(){ // скрывает попап и начинает игру
	line = document.getElementsByClassName("line");
	$('h2').text(userNames[0] + ", Ваш ход!").stop().delay(2000).fadeIn();
	for(var i = 0; i < line.length; i++){
		line[i].addEventListener("click", function(e){
			if (userIndex == 0) {
				$('h2').text(userNames[1] + ", Ваш ход!").stop().delay(2000).fadeIn();
			} else if (userIndex == 1) {
				$('h2').text(userNames[0] + ", Ваш ход!").stop().delay(2000).fadeIn();
			}
		});
	}
}

function displayUserProgress(e){ // присваивает класс ячекам
	for(var i = 0; i < line.length; i++){
		line[i].addEventListener("click", function(e){
		  	if(userIndex == 0 && (!e.target.classList.contains('o'))){
		    	e.target.classList.add('x');
				userIndex = 1;
		    } else if(userIndex == 1 && (!e.target.classList.contains('x'))){
		  		e.target.classList.add('o');
		    	userIndex = 0;
		    	$('.winner-popup').removeClass("no-win");
		    }
		    createWinnerArr();
		    createWinnerCounter();
		})
	}
}

function decideLineWidth() {
	lineWinWidth = (arrCell[0][0].clientWidth *10 / 100 + arrCell[0][0].clientWidth) * 3;
}

function createWinnerArr() {
	var countVertX = [];
	var countVertO = [];
	var countGorX = [];
	var countGorO = [];

	for(var columnIndex = 0; columnIndex < CELLS_COUNT; columnIndex++){
		countVertX.push(document.getElementsByClassName("y" + columnIndex + " x").length);
		countVertO.push(document.getElementsByClassName("y" + columnIndex + " o").length);
		countGorX.push(document.getElementsByClassName("x" + columnIndex + " x").length);
		countGorO.push(document.getElementsByClassName("x" + columnIndex + " o").length);
		checkingWinner(countVertX, countVertO, countGorX, countGorO);
	}
}

function createWinnerCounter() {
	var arrDiagonalX  = [];
	var arrDiagonalO = [];
	var arrDiagonalXReverse = [];
	var arrDiagonalOReverse = [];
	for(var columnIndex = 0; columnIndex < CELLS_COUNT; columnIndex++){
		arrDiagonalX.push(document.getElementsByClassName("y" + columnIndex + " x" + columnIndex + " x").length);
		arrDiagonalO.push(document.getElementsByClassName("y" + columnIndex + " x" + columnIndex + " o").length);
		arrDiagonalXReverse.push(document.getElementsByClassName("y" + columnIndex + " x" + (CELLS_COUNT - columnIndex -1) + " x").length);
		arrDiagonalOReverse.push(document.getElementsByClassName("y" + columnIndex + " x" + (CELLS_COUNT - columnIndex -1) + " o").length);
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
	checkingDiagonalWinner(countDiagonalX, countDiagonalO, countDiagonalXReverse, countDiagonalOReverse);
}

function checkingWinner(countVertX, countVertO, countGorX, countGorO){
	for(var columnIndex = 0; columnIndex < CELLS_COUNT; columnIndex++){
		if (countVertX[columnIndex] === CELLS_COUNT || countVertO[columnIndex] === CELLS_COUNT || countGorX[columnIndex] === CELLS_COUNT || countGorO[columnIndex] === CELLS_COUNT) {
			if (countVertX[columnIndex] === CELLS_COUNT || countVertO[columnIndex] === CELLS_COUNT){
				line[columnIndex].classList.add('win');
			} else if (countGorX[columnIndex] === CELLS_COUNT || countGorO[columnIndex] === CELLS_COUNT) {
				decideLineWidth();
				$(arrCell[0][columnIndex]).addClass('win-gor-line').append('<div class="win-line" />');
				$('.win-line').animate({
					width: lineWinWidth + 'px'
				}, 500)
			}
			console.log("WIN!!!!!!!!!!!!!!!");
			showPopup();
		} else if (countVertX[columnIndex] !== CELLS_COUNT && countVertO[columnIndex] !== CELLS_COUNT && countGorX[columnIndex] !== CELLS_COUNT && countGorO[columnIndex] !== CELLS_COUNT) {
			checkingNoWin();
		}
	}
}

function checkingDiagonalWinner(countDiagonalX, countDiagonalO, countDiagonalXReverse, countDiagonalOReverse){
	if (countDiagonalX === CELLS_COUNT || countDiagonalO === CELLS_COUNT || countDiagonalXReverse === CELLS_COUNT || countDiagonalOReverse === CELLS_COUNT) {
		countDiagonalX === CELLS_COUNT || countDiagonalO === CELLS_COUNT ? $($PLAY_CONTAINER).addClass('win-left-diagonal') : false;
		countDiagonalXReverse === CELLS_COUNT || countDiagonalOReverse === CELLS_COUNT ? $($PLAY_CONTAINER).addClass('win-right-diagonal') : false;	
		console.log("WIN!!!!!!!!!!!!!!!");
		showPopup();
	}  else if (countDiagonalX !== CELLS_COUNT && countDiagonalO !== CELLS_COUNT && countDiagonalXReverse !== CELLS_COUNT && countDiagonalOReverse !== CELLS_COUNT) {
			checkingNoWin();
		}
}

function checkingNoWin(params){
	var commonCellX = Math.ceil(CELLS_COUNT * CELLS_COUNT / 2);
	var cellXLength = document.getElementsByClassName('x').length;
	if (cellXLength === commonCellX) {
		userIndex = null;
		showPopup();
		console.log('no winner');
	}
}

function showPopup() {
	if (userIndex === null) {
		$('.winner-popup').addClass("no-win");
	} else {
		enterWinnerName();
	}
	$('.popup').delay(1000).fadeIn( "slow");
	$('.winner-popup').delay(1000).fadeIn( "slow");
}

function enterWinnerName() {
	$('.user-name span').text(userIndex == 0 ? userNames[1] : userNames[0]);
}

function closeWinPopup() {
	$('.winner-popup').fadeOut();
	$('.popup').fadeOut();
}

$(document).on('click', '#save', function(e){
	keepUserNames();
	enterUserNames();
	closePopup();
	enterPlayerNames();
	displayUserProgress();
});

$(document).on('click', '#play', function(e){
	closeWinPopup();
	userIndex = 0;
	lineWinWidth = 0;
	$('.cell').removeClass('x').removeClass('o').removeClass('win-gor-line');
	$($PLAY_CONTAINER).removeClass('win-left-diagonal').removeClass('win-right-diagonal');
	userIndex = 0;
	$('.win-line').remove();
	$('.line').removeClass('win');
	$('.win-line').css("width", "0");
	enterPlayerNames();
});



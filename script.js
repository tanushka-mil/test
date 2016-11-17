var $container;
var playTable = '.play-table';
var users = [];
CELLS = 3;
var results = [];
var count = 0;

$(function(){
	generateCells();
});

function createContainers(playTable, CELLS){
	for(columnIndex = 0; columnIndex < CELLS; columnIndex++){
		$(playTable).append('<div class="line" />');
		results = document.getElementsByClassName('line');
		//results[columnIndex] =[];
		for(cellIndex = 0; cellIndex < CELLS; cellIndex++){
			$(results[columnIndex]).append('<div class="cell" />');
			results[columnIndex][cellIndex] = $(results[columnIndex]).children();
		}
	}
}

function generateCells(){
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
		    	e.target.val = 1;
		    	$('h2').text(users[1].name + ", Ваш ход!").stop().delay(2000).fadeIn();
		    	count = 1;
		    }
			else if(count == 1 && (!e.target.classList.contains('x'))){
		  		e.target.classList.add('o');
		  		e.target.val = 0;
		  		$('h2').text(users[0].name + ", Ваш ход!").stop().delay(2000).fadeIn();
		    	count = 0;
		    }
		    winner();
		})
	}
}

function winner(){
	function isPositive(number) {
	  return number === 0;
	}
	// function isPositive(number) {
	//   return number === 1;
	// }
	for(var i = 0; i < results.length; i++){
		if (results[i].every(isPositive)) {
			console.log('test');
		}
	}
}


$(document).on('click', '.save', function(e){
	createUsers();
	tableClick();
});



// Create Game constructor to hold functions for creating the baord and each car object
function Game(){
	this.size = 1;
	this.playerCount = 2;
	this.players = []; 
	this.trackSizeY = 0;
	this.trackSizeX = 0;
	// Creates HTML for the race track itself 
	this.createTrack = function(){
		for(let i = 0; i < this.laps;i++){
			$racetrack = $('#racetrack');
			let lapHTML = '<div class="road"></div>';
			$racetrack.append(lapHTML);
		}
		this.trackSizeX = $('#racetrack .road').width();
		this.trackSizeY = $('#racetrack .road').height();
	}
	// Creates array of car objects. 
	this.createCars = function(){
		for(let i = 0; i < this.playerCount; i++){
			let car = new Car(i);
			car.createCar();
			this.players.push(car);
		}

	}
	// Create method to check for win conditions after each button press
	this.checkWin = function(){
		for(let i = 0; i < this.players.length; i++){
			// Grab X and Y max for player movement
			let maxXTravel = this.trackSizeX - this.players[i].carWidth;
			let maxYTravel = this.trackSizeY - this.players[i].carHeight;
			// If player has reached max x and y, they have won.
			if(this.players[i].carX >= maxXTravel && this.players[i].carY >= maxYTravel){
				// Display winner
				displayModal(`player ${this.players[i].carName} wins!`);
				// Empty players
				this.players = [];
				// Remove icons
				$('#racetrack i').remove();
				// Reset icons
				this.createCars();
			}
		}
	}
}

// Create Car constructor to create car attributes and functions 
function Car(num){
	this.carId = num;
	this.carName = `Player ${num + 1}`;
	this.carIcon = `<i carId="${this.carId}" carname="${this.carName} "class="fa fa-motorcycle" aria-hidden="true"></i>`;
	this.carX = 0; 
	this.carY = 0; 
	this.carWidth = 0; 
	this.carHeight = 0; 
	// create dom elements for car icons
	this.createCar = function(){
		$racetrack = $('#racetrack .road');
		$racetrack.append(this.carIcon);
		this.carHeight = $('i').height();
		this.carWidth = $('i').width();
	}
	this.move = function(key){
		let isXMax = this.carX <= race.trackSizeX - this.carWidth;
		let isYMax = this.carY <= race.trackSizeY - this.carHeight;
		let isXMin = this.carX >= 0;
		let isYMin = this.carY >= 0;
		let pixelIncrement = 20;
		if((event.keyCode === 39 || event.keyCode === 68) && isXMax){
			this.carX += pixelIncrement;
			$(`i[carId=${this.carId}]`).css('left',this.carX + 'px').removeClass('up down left').addClass('right');
		}
		if((event.keyCode === 40 || event.keyCode === 83) && isYMax){
			this.carY += pixelIncrement;
			$(`i[carId=${this.carId}]`).css('top',this.carY + 'px').removeClass('up left right').addClass('down');
		}
		if((event.keyCode === 37 || event.keyCode === 65) && isXMin){
			this.carX -= pixelIncrement;
			$(`i[carId=${this.carId}]`).css('left',this.carX + 'px').removeClass('up down right').addClass('left');
		}
		if((event.keyCode === 38 || event.keyCode === 87) && isYMin){
			this.carY -= pixelIncrement;
			$(`i[carId=${this.carId}]`).css('top',this.carY + 'px').removeClass('left down right').addClass('up');
		}
	}
}

// Initialize global race variable to hold Game() object 
let race = new Game();
$(document).ready(function(){
	console.log("Sanity check!");

	// Initiate track HTML and car Objects
	race.createTrack();
	race.createCars();

	// Create event listener for modal close
	$('#modal button').on('click', function(event){
		event.preventDefault();
		$('#modal').removeClass('active');
	})

	// Boolean to check modal 
	// Create Key press actions to move for both players in any direction 
	$('body').on('keyup',function(event){
		// Check for left, right, up, and down keypresses
		if(!$('#modal').hasClass('active')){
			if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
				event.preventDefault();
				race.players[0].move(event.keyCode);
			}
			// Check W,A,S,D key presses
			if(event.keyCode === 65 || event.keyCode === 87 || event.keyCode === 83 || event.keyCode === 68){
				event.preventDefault();
				race.players[1].move(event.keyCode);
			}
			// CHeck race win
			race.checkWin();
		}
		if (event.keyCode === 27 || event.keyCode===13) { 
	        $('#modal').removeClass('active');
	    }
	})
});

// Function to display modal with modal text
function displayModal(text){
	$('#modal p').text(text);
	$('#modal').addClass('active');
}




// Create Game constructor to hold functions for creating the baord and each car object
function Game(){
	this.laps = 1;
	this.playerCount = 2;
	this.players = []; 
	this.trackSizeY = 0;
	this.trackSizeX = 0;
	// Creates HTML for the race track itself 
	this.createTrack = function(){
		for(let i = 0; i < this.laps;i++){
			$racetrack = $('#racetrack');
			let lapHTML = '<div class="road"></div><div class="turn-right"></div><div class="road"></div><div class="turn-left"></div>';
			$racetrack.append(lapHTML);
		}
	}
	// Creates array of car objects. 
	this.createCars = function(){
		for(let i = 0; i < this.playerCount; i++){
			let car = new Car(i);
			car.createCar();
			this.players.push(car);
		}

	}
}

// Create Car constructor to create car attributes and functions 
function Car(num){
	this.carId = num;
	this.carName = `car${num}`;
	this.carIcon = `<i carId="${this.carId}" carname="${this.carName} "class="fa fa-motorcycle" aria-hidden="true"></i>`;
	this.carX = 0; 
	this.carY = 0; 
	this.carWidth = 0; 
	this.carHeight = 0; 
	// create dom elements for car icons
	this.createCar = function(){
		$racetrack = $('#racetrack');
		$racetrack.append(this.carIcon);
		this.carHeight = $('i').height();
		this.carWidth = $('i').width();
	}
	this.move = function(key){
		let racetrackWidth = $('#racetrack').width();
		let racetrackHeight = $('#racetrack').height();
		let isXMax = this.carX <=100;
		let isYMax = this.carY <=100;
		let isXMin = this.carX >=0;
		let isYMin = this.carY >=0;
		if((event.keyCode === 39 || event.keyCode === 68) && isXMax){
			this.carX += 2;
			$(`i[carId=${this.carId}]`).css('left',this.carX + '%').removeClass('up down left').addClass('right');
		}
		if((event.keyCode === 40 || event.keyCode === 83) && isYMax){
			this.carY += 2;
			$(`i[carId=${this.carId}]`).css('top',this.carY + '%').removeClass('up left right').addClass('down');
		}
		if((event.keyCode === 37 || event.keyCode === 65) && isXMin){
			this.carX -= 2;
			$(`i[carId=${this.carId}]`).css('left',this.carX + '%').removeClass('up down right').addClass('left');
		}
		if((event.keyCode === 38 || event.keyCode === 87) && isYMin){
			this.carY -= 2;
			$(`i[carId=${this.carId}]`).css('top',this.carY + '%').removeClass('left down right').addClass('up');
		}
	}
}

$(document).ready(function(){
	console.log("Sanity check!");
	let race = new Game();
	race.createTrack();
	race.createCars();
	console.log(race.players);

	// Create Key press actions to move for both players in any direction 
	$('body').on('keydown',function(event){
		if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
			event.preventDefault();
			race.players[0].move(event.keyCode);
		}
		if(event.keyCode === 65 || event.keyCode === 87 || event.keyCode === 83 || event.keyCode === 68){
			event.preventDefault();
			race.players[1].move(event.keyCode);
		}
	})
});




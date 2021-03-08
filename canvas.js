var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const addScore = document.querySelector('#addScore');
const startGame = document.querySelector('#startGame');
const container = document.querySelector('#container');
const finalScore = document.querySelector('#finalScore');

var score = 0;

function scoreCount(){
	score = score + 1;
	addScore.innerHTML = score;
}

var counter;

function Player(x, y, playerWidth, playerHeight){
	this.playerWidth = playerWidth;
	this.playerHeight = playerHeight;
	this.x = x; 
	this.y = y; 
	this.dx = 10;
	this.dy = 10;

	this.drawPlayer=function(){
		ctx.fillStyle='blue';
		ctx.fillRect(this.x, this.y, this.playerWidth, this.playerHeight);
	}

	this.updatePlayer=function(){
		if(this.x - this.playerWidth/2 < 0){
			this.x = this.playerWidth - 20;
		}

		if(this.x + this.playerWidth > canvas.width){
			this.x = canvas.width - this.playerWidth;
		}

		if(this.y + this.playerHeight > canvas.height){
			this.y = canvas.height - this.playerHeight;
		}

		player.drawPlayer();
	}

	this.moveLeft=function(){
		this.x -= this.dx;
	}

	this.moveRight=function(){
		this.x += this.dx;
	}

	this.moveUp=function(){
		this.y -= this.dy;
	}

	this.moveDown=function(){
		this.y += this.dy;
	}
}

function Rocks(x, y,dy){
	this.x = x;
	this.y = y;
	this.radius = 30;
	this.dy = dy;

	this.draw=function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.strokeStyle = 'red';
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.stroke();
	}

	this.update = function(){
		if( this.y + 30 > 700){
			this.y = -100;
			this.x = Math.random()*800;
		}

		this.y += this.dy;
		this.draw();
	}
}

let player = new Player(canvas.width/2, canvas.height/2+200, 40, 40);

let rocksArray = [];

function init(){
	player = new Player(canvas.width/2, canvas.height/2+200, 40, 40);
	rocksArray = [];
	for(var i=0; i<15; i++){
		var x = Math.random() * 800;
		var y = Math.random() * 400 + 100;
		var dx = Math.random() * 4 + 2;
		rocksArray.push(new Rocks(x, -y, dx));
	}
	score = 0; 
	addScore.innerHTML = score;
	finalScore.innerHTML = score;
}


window.addEventListener("keydown", event =>{
    switch(event.keyCode){
        case 37:
            player.moveLeft();
            break;
        case 38:
            player.moveUp();
            break;
        case 39:
            player.moveRight();
            break;
        case 40:
            player.moveDown();
            break;
    }
});

for(var i=0; i<15; i++){
	var x = Math.random() * 800;
	var y = Math.random() * 400 + 100;
	var dx = Math.random() * 4 + 2;
	rocksArray.push(new Rocks(x, -y, dx));
}

function gameOver(){
	var username = document.querySelector('#username').value;
	cancelAnimationFrame(animationId);
	clearInterval(counter);
	container.style.display = 'flex';
	finalScore.innerHTML = score;
	alert("Score for user " + username + " is submitted");
}

let animationId
function animate(){
	animationId = requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	player.updatePlayer();

	for(var i=0; i<rocksArray.length; i++){
		rocksArray[i].update();
	}

	rocksArray.forEach((Rocks) => {

			var distX = Math.abs(Rocks.x - player.x-player.playerWidth/2);
    		var distY = Math.abs(Rocks.y - player.y-player.playerHeight/2);

    		if(distX > (player.playerWidth/2 + Rocks.radius)){
    			return false;
    		}
    		if(distY > (player.playerHeight/2 + Rocks.radius)){
    			return false;
    		}
    		if(distX <= (player.playerWidth/2)){
    			gameOver();
    		}
    		if(distY <= (player.playerHeight/2)){
    			gameOver();	
			}
	});
}

startGame.addEventListener('click', () => {
	init();
	animate();
	counter = setInterval(scoreCount, 5);
	container.style.display = 'none';
});





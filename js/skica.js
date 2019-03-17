var aValue=0;
var bValue=0;
var cValue=0;
var ime1,ime2,ime3;
const pup=1;
const pup_speed=0.15;
var x = 200;
var y = 400;
var dx = 2;
var dy = 0;
var WIDTH;
var HEIGHT;
var r=10;
var paddlex;
var paddleh;
var paddlew;
var rightDown = false;
var leftDown = false;
var canvasMinX;
var canvasMaxX;
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var f=4;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer;
var paddlecolor = "#ffffff";
var ballcolor = "#ffffff";
var jupiter = new Image();
jupiter.src = "slike/jupiter.png";
var earth = new Image();
earth.src = "slike/earth.png";
var mars = new Image();
mars.src = "slike/mars.png";
var bar = new Image();
bar.src = "slike/spacebar.png";
var ball = new Image();
ball.src = "slike/meteor1.png";
var paddles = new Image();
paddles.src = "slike/paddle1.png";
var key = new Image();
key.src = "slike/key.png";
var start=false;
var audio = new Audio('sound/boom.mp3');
var win1 = new Audio('sound/win.mp3');
var lose1 = new Audio('sound/lose.mp3');
var casInterval, sekunde;
var ctx;
var canvas;
var pupch=1;
var pause=false;
var pauseinterval;
var time,time1;






function drawIt() {
function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();

  sekunde=0;
  tocke=0;
  life=3;
  intTimer=setInterval(timer, 1000);
 return setInterval(draw, 10);

}

function napis_pause(){
  ctx.font = "32px candy1";
  ctx.fillText("Press",230,330);
  ctx.drawImage(key, 350, 298);
  ctx.fillText("to unpause",410,330);
}

function timer(){
  if(start || pause==true){
var sec=Math.floor(sekunde%60);
	var min=Math.floor((sekunde/60)%60);
	if(sec<10)
		sec="0"+sec;
	if(min<10)
		min="0"+min;
	document.getElementById("cas").innerHTML="TIME"+" "+""+min+" : "+sec;
  time=min+" : "+sec;
	sekunde++;
}
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle="white";
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
//END LIBRARY CODE


function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 20;
  paddlew = 120;
}

      function draw() {
        clear();
        circle(x, y, 10);
        x += dx;
        y += dy;
      }

//nastavljanje leve in desne tipke
function onKeyDown(evt) {
  if (evt.keyCode == 39)
rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
  else if(evt.keyCode == 80){ //če pritisnemo P se igra vstavi
if(start){
          pause_game();
        }
          }

}
function pause_game(){ //pause
  if(!pause){
  pause=true;
  clearInterval(intervalId);
  clearInterval(intTimer);
  napis_pause();
  }
  else{
  pause=false;
    intervalId=setInterval(draw, 10);
    intTimer = setInterval(timer, 1000);
  }
}

function onKeyUp(evt) {
  if (evt.keyCode == 39)
rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
  else if (evt.keyCode == 32&&!start){
   start = true;
   dy=4;
  }
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function init_mouse() {
  //canvasMinX = $("#canvas").offset().left;
canvasMinX = $("canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
  //  paddlex = evt.pageX - canvasMinX;
  }
}
$(document).mousemove(onMouseMove);

 function initbricks() { //inicializacija opek - polnjenje v tabelo
  NROWS = 3;
  NCOLS = 10;
  BRICKWIDTH =64;
  BRICKHEIGHT = 64;
  PADDING = 15;
  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      if(i === 0)
      bricks[i][j] = 1;
      if(i === 1)
      bricks[i][j] = 2;
      if(i === 2)
      bricks[i][j] = 3;
    }
  }
}

function draw() {
 clear();
  circle(x, y, 10);
  	 if(rightDown){
if((paddlex+paddlew) < WIDTH){
	paddlex += 5;
}
else{
	paddlex = WIDTH-paddlew;
}
}
else if(leftDown){
	if(paddlex>0){
		paddlex -=5;
	}
	else{
		paddlex=0;
	}
}
ctx.drawImage(paddles, paddlex, HEIGHT-paddleh, paddlew, paddleh);
ctx.drawImage(ball, x-10, y-15, 30, 30);
var c=0;
var stBriksou=0;
//riši opeke
  //spodnji del kode je potrebno dodati za izrisom ploščka v funkciji draw()
  for (i=0; i < NROWS; i++)
  {
    for (j=0; j < NCOLS; j++)
    {
if(bricks[i][j] > 0){
      if(bricks[i][j] == 2){
            ctx.drawImage(mars, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
      if(bricks[i][j] == 3){
            ctx.drawImage(earth, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);

        }
        if(bricks[i][j] == 1){
              ctx.drawImage(jupiter, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);

          }
}
    }
  }
    if(dy== 0){

      ctx.font = "32px candy1";
      ctx.fillText("Press",260,330);
      ctx.drawImage(bar, 390, 298);

    }

  document.getElementById("zivljenja").innerHTML="life : "+life;
  if(life<=0){
  lose1.play();
	gameover();
  zapis();
	clearInterval(intervalId);
	clearInterval(intTimer);
  }

  rowheight = BRICKHEIGHT + PADDING + f/2; //Smo zadeli opeko?
  colwidth = BRICKWIDTH + PADDING + f/2;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
		audio.play();
		dy = -dy;
		bricks[row][col] = 0;
		tocke+=30;	//prištej 10 točk
    dy += 0.3;
    if(Math.random()<=pupch){
      var px= row/2;
      var py= col/2;
    }
	}
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 2) {
  		audio.play();
  		dy = -dy;
  		bricks[row][col] = 0;
  		tocke+=20;	//prištej 10 točk
      dy += 0.2;
  	}
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 3) {
    		audio.play();
    		dy = -dy;
    		bricks[row][col] = 0;
    		tocke+=10;	//prištej 10 točk
        dy += 0.1;
    	}
	if(tocke== 600){
    win();
    win1.play();
    clearInterval(intervalId);
  	clearInterval(intTimer);
    zapis();
	}
	document.getElementById("tocke").innerHTML="Score :"+" "+tocke;

  if (x + dx > WIDTH -r || x + dx < 0+r)
    dx = -dx;
  if (y + dy < 0+r)
    dy = -dy;
  else if (y + dy > HEIGHT -(r+f)) {
    if (x > paddlex && x < paddlex + paddlew){
       dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
	  dy = -dy;
	}else if (y + dy > HEIGHT-r){
      //clearInterval(intervalId);
	  dy= -dy;
	  life--;	//odštej life

	}
  }
  x += dx;
  y += dy;
}

intervalId=init();
init_paddle();
init_mouse();
initbricks();







}

//leaderboard zapis  lestvice kdo ima najvec pik
function zapis(){
    aValue = localStorage.getItem('high_score1');
    bValue = localStorage.getItem('high_score2');
    cValue = localStorage.getItem('high_score3');
   if(aValue == null){
     aValue=0;
     bValue=0;
     cValue=0;
   }

 if(tocke>=aValue && tocke>bValue && tocke>cValue ){

   localStorage.setItem('high_score1',tocke);
   localStorage.setItem('high_score2',aValue);
   localStorage.setItem('high_score3',bValue);

} else if(tocke <= aValue && tocke >=bValue &&tocke > cValue){

   localStorage.setItem('high_score2',tocke);
   localStorage.setItem('high_score3',bValue);

}else if(tocke < bValue && tocke > cValue){
    localStorage.setItem('high_score3',tocke);
}
}
//sweetalert2
//------------------------------------------
function leaderboard(){
  aValue = localStorage.getItem('high_score1');
  bValue = localStorage.getItem('high_score2');
  cValue = localStorage.getItem('high_score3');
  Swal.fire({
      html:'<p style="font-family:candy1; color:white;font-size:52px;">leaderboard</p><br/>'+
      '<div class="box1"><img src="slike/gold1.png" style="width:74px;height:74px;"/> &nbsp; &nbsp; &nbsp; <span class="span1" style="font-size:38px;font-family:candy1;color:#f7cc59;letter-spacing:2px;">'+"   "+aValue+" Points"+'</span></div><br/>'+
      '<div class="box1"><img src="slike/silver.png" style="width:74px;height:74px;"/> &nbsp; &nbsp; &nbsp; <span class="span1" style="font-size:38px;font-family:candy1;color:#d9dadb;letter-spacing:2px;">'+"   "+bValue+" Points"+'</span></div><br/>'+
      '<div class="box1"><img src="slike/bronze.png" style="width:74px;height:74px;"/> &nbsp; &nbsp; &nbsp; <span  class="span1" style="font-size:38px;font-family:candy1;color:#b27e4a;letter-spacing:2px;">'+"   "+cValue+" Points"+'</span></div><br/>',
      background:'#323232',
    //  width:1000
  });
}

function gameover(){

  Swal.fire({
      html:'<img src="slike/images1.png" alt="start" height="128" width="128"><br/>'+
      '<p style="font-family:candy1;font-size:72px;color:white;">GAME OVER</p><br/>'+
      '<div class="box1"><img src="slike/watch.png" style="width:64px;height:64px;"/> &nbsp; &nbsp; &nbsp; <span class="span2" style="font-size:38px;font-family:candy1;color:white;letter-spacing:2px;">'+"&nbsp; &nbsp;"+time+'</span></div><br/>'+
      '<div class="box1"><img src="slike/star.png" style="width:64px;height:64px;"/> &nbsp; &nbsp; &nbsp; <span class="span2" style="font-size:38px;font-family:candy1;color:white;letter-spacing:2px;">'+"&nbsp; &nbsp;"+tocke+" POINTS"+'</span></div><br/>',
      background:'#323232',
  }).then(function(isConfirm) {
if (isConfirm) {
location.reload();
}
});

}

function win(){
  Swal.fire({
      html:'<img src="slike/ribbon1.png" alt="victory" height="128" width="128"><br/>'+
      '<p style="font-family:candy1;font-size:72px; color:#f3a840;">VICTORY</p><br/>'+
      '<div class="box1"><img src="slike/watch.png" style="width:64px;height:64px;"/> &nbsp; &nbsp; &nbsp; <span class="span2" style="font-size:38px;font-family:candy1;color:white;letter-spacing:2px;">'+"&nbsp; &nbsp;"+time+'</span></div><br/>'+
      '<div class="box1"><img src="slike/star.png" style="width:64px;height:64px;"/> &nbsp; &nbsp; &nbsp; <span class="span2" style="font-size:38px;font-family:candy1;color:white;letter-spacing:2px;">'+"&nbsp; &nbsp;"+tocke+" POINTS"+'</span></div><br/>',
      background:'#323232',
  }).then(function(isConfirm) {
if (isConfirm) {
location.reload();
}
});
}

function info(){
  Swal.fire({
      html:'<p style="font-family:candy1;font-size:52px;color:white;">controls</p><br/>'+
      '<img src="slike/keyarrow1.png" alt="start" height="64" width="64"> &nbsp; &nbsp; &nbsp;'+
      '<img src="slike/keyarrow2.png" alt="start" height="64" width="64"><br/>'+
      '<p style="font-family:candy1;font-size:18px;color:white;letter-spacing:1px;">move left or right by holding left or right key</p><br/>'+
      '<img src="slike/spacebar.png" alt="start" height="44" width="128"><br/>'+
      '<p style="font-family:candy1;font-size:18px;color:white;letter-spacing:1px;">Press spacebar to start the game</p><br/>'+
      '<img src="slike/key.png" alt="start" height="44" width="41"><br/>'+
      '<p style="font-family:candy1;font-size:18px;color:white; letter-spacing:1px;">Press P to pause and unpause the game</p><br/>'+
      '<p style="font-family:candy1;font-size:52px;color:white;">POINT SYSTEM</p><br/>'+
      '<div class="box"><img src="slike/earth.png" style="width:64px;height:64px;"/> &nbsp; &nbsp; &nbsp; <span style="font-size:18px;font-family:candy1;color:white;letter-spacing:2px;">10 points</span></div><br/>'+
      '<div class="box"><img src="slike/mars.png" style="width:64px;height:64px;"/> &nbsp; &nbsp; &nbsp; <span style="font-size:18px;font-family:candy1;color:white;letter-spacing:2px;">20 points</span></div><br/>'+
      '<div class="box"><img src="slike/jupiter.png" style="width:64px;height:64px;"/> &nbsp; &nbsp; &nbsp; <span style="font-size:18px;font-family:candy1;color:white;letter-spacing:2px;">30 points</span></div><br/>'+
      '<p style="font-family:candy1;font-size:52px;color:white;">How to win</p><br/>'+
      '<img src="slike/pokal.png" alt="start" height="64" width="64"><br/>'+
      '<p style="font-family:candy1;font-size:18px;color:white;letter-spacing:2px;">You win by breaking all the planets in the space</p><br/>',
      background:'#323232',
  });
}
function user(){
  Swal.fire({
  title: 'Multiple inputs',
  html:
    '<input id="swal-input1" class="swal2-input">' +
    '<input id="swal-input2" class="swal2-input">',
  preConfirm: function () {
    return new Promise(function (resolve) {
      resolve([
        $('#swal-input1').val(),
        $('#swal-input2').val()
      ])
    })
  },
  onOpen: function () {
    $('#swal-input1').focus()
  }
}).then(function (result) {
  swal(JSON.stringify(result))
}).catch(swal.noop)
}


//sprite
//-----------------------------------
(function() {


    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function () {

	var coin,
		coinImage,
		canvas;

	function gameLoop () {

	  window.requestAnimationFrame(gameLoop);

	  coin.update();
	  coin.render();
	}

	function sprite (options) {

		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;

		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;

		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;

                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };

		that.render = function () {

		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);

		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    0,
		    0,
		    that.width / numberOfFrames,
		    that.height);
		};

		return that;
	}

	// Get canvas
	canvas = document.getElementById("canvas");
	canvas.width =960;
	canvas.height = 60;

	// Create sprite sheet
	coinImage = new Image();

	// Create sprite
	coin = sprite({
		context: canvas.getContext("2d"),
		width: 960,
		height: 60,
		image: coinImage,
		numberOfFrames:16,
		ticksPerFrame: 4
	});

	// Load sprite sheet
	coinImage.addEventListener("load", gameLoop);
	coinImage.src = "images/meteor2.png";

} ());

var canvas = document.getElementById('mycanvas');
var ctx=canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height-30/2 - 10;
var radiusBall = 10;
var dx=2;
var dy=-2;
var rightPressed = false;
var leftPressed = false;
var paddleX = (canvas.width-70)/2;
var paddleY =  canvas.height-10;
var score=0;
var brickRowcount=3;
var brickColCount=4;
var brickWidth=75;
var brickHeight=20;
var brickPadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=30;
var lives=3;


function drawBall(){
  ctx.beginPath();
  ctx.arc(x,y,radiusBall,0,Math.PI*2,false);
  ctx.fillStyle="skyblue";
  ctx.fill();
  ctx.closePath();
}

var bricks=[];
for(c=0;c<4;c++){
  bricks[c]=[];
    for(r=0;r<3;r++){
      bricks[c][r]={x:0,y:0,status:1};
    }
}

document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

function drawBricks(){
  for(c=0;c<4;c++){
      for(r=0;r<3;r++){
        if(bricks[c][r].status==1){
          var brickX = (c*(brickWidth+brickPadding)+brickOffsetLeft);
          var brickY = (r*(brickHeight+brickPadding)+brickOffsetTop);
          bricks[c][r].x=brickX;
          bricks[c][r].y=brickY;
          ctx.beginPath();
          ctx.rect(brickX,brickY,brickWidth,brickHeight);
          ctx.fillStyle="#0095DD";
          ctx.fill();
          ctx.closePath();
       }
     }
  }
}

function brickCollision(){
  for(c=0;c<4;c++){
      for(r=0;r<3;r++){
        var b=bricks[c][r];
        if(b.status==1){
          if((x>b.x) && (x<(b.x+brickWidth)) && (y>b.y) && (y<(b.y+brickHeight))){
            dy=-dy;
            b.status=0;
            score++;
            if(score==brickRowcount*brickColCount){
              alert("You won!!! congrats");
              document.location.reload();
            }
          }
        }
      }
  }
}

function keyDownHandler(e){
  if(e.keyCode === 39){
    rightPressed = true;
  }
  else if(e.keyCode === 37){
    leftPressed = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode === 39){
    rightPressed = false;
  }
  else if(e.keyCode === 37){
    leftPressed = false;
  }
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX,paddleY,70,10);
  ctx.fillStyle="black";
  ctx.fill();
  ctx.closePath();
}

function Score(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Score: " + score , 8,20);
}

function Lives(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Lives: " + lives , canvas.width-65,20);
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  Score();
  brickCollision();
  Lives();
  if(x+dx<10 || x+dx>canvas.width-10){
    dx=-dx;
  }
  if(y+dy<10 || (y+dy>canvas.height-20) && (x+dx>paddleX && x+dx<paddleX+70)){
    dy=-dy;
  }

  if(rightPressed && paddleX<canvas.width-70){
    paddleX+=7;
  }
  else if(leftPressed && paddleX>0){
    paddleX-=7;
  }
  if(y+dy>canvas.height){
    lives--;
    if(lives<=0){
      alert("Game Over!!");
      document.location.reload();
    }
    else{
      x=canvas.width/2;
      y=canvas.height-30;
      dx=2;
      dy=-2;
      paddleX = (canvas.width-70)/2;
    }
  }
  x+=dx;
  y+=dy;
  requestAnimationFrame(draw);
}

// document.addEventListener("mousemove",mouseMoveHandler);
//
// function mouseMoveHandler(e){
//   relativeX = e.clientX - __________ ;
//   if(relativeX > 0 && relativeX<canvas.Width){
//     paddleX = relativeX - paddleWidth/2;
//   }
// }


// setInterval(draw,10);

draw();

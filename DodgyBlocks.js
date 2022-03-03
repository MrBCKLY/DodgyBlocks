//Set Canvas
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
//Set Canvas Size
var W = window.innerWidth, H = window.innerHeight, T = 64, portrait = false;
ctx.canvas.width = W;
ctx.canvas.height = H;
//Determine the canvas orientation and set variables accordingly
if(W>=H) {
    T=(W/64);
}
else {
    T=(H/64);
    portrait = true;
}
//Set variables to be used by game loop
var FPS = 60, now, then = Date.now(), interval = 1000/FPS, delta;

//Set variables to be used by game
var gameSpeed = 1, gameCount = 1, nodeCount = 0, active = true, highscore = 0;

function displayRestart() {
    active = false;
    document.getElementById("restart").style.display = "block";
    gameSpeed = 0;
}

class player {
    constructor() {
        this.x = (W/2)-(T/2);
        this.y = (H/2)-(T/2);
        this.direction = "-Y";
        this.size = T;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getSize() {
        return this.size;
    }
    increaseSize() {
        this.size += 1;
    }
    setDirection(_d) {
        this.direction = _d;
    }
    draw() {
        ctx.fillStyle = '#44FF44';
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
    update() {
        if(this.direction == "-Y") {
            this.y = this.y - gameSpeed;
        }
        else if(this.direction == "+X") {
            this.x = this.x + gameSpeed;
        }
        else if(this.direction == "+Y") {
            this.y = this.y + gameSpeed;
        }
        else if(this.direction == "-X") {
            this.x = this.x - gameSpeed;
        }

        if(this.x < 0 || this.x > (W-this.size) || this.y > (H-this.size) || this.y < 0) {
            gameSpeed = 0;
            updateHighscore()
        }
    }

}

class node {
    constructor() {
        this.x = W;
        this.y = H;
        this.direction = "-X";
        this.a = false;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    activate() {
        this.a = true;
        this.reset();
    }
    getActive() {
        return this.a;
    }
    reset() {
        gameSpeed += 0.1;
        if(this.a) {
            var choice = Math.floor((Math.random() * 4) + 1);
            if(choice == 1) {
                this.direction = "-X";
                this.x = W;
                this.y = Math.floor(Math.random() * H);
            }
            else if(choice == 2) {
                this.direction = "+X";
                this.x = -T;
                this.y = Math.floor(Math.random() * (H - T));
            }
            else if(choice == 3) {
                this.direction = "-Y";
                this.x = Math.floor(Math.random() * (W));
                this.y = H;
            }
            else if(choice == 4) {
                this.direction = "+Y";
                this.x = Math.floor(Math.random() * (W));
                this.y = -T
            }
        }
    }
    draw() {
        if(this.a) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(this.x, this.y, T, T); 
        }
    }
    update() {
        if(this.a) {
            if(this.direction == "-X") {
                this.x = this.x - gameSpeed;
            }
            else if(this.direction == "+X") {
                this.x = this.x + gameSpeed;
            }
            else if(this.direction == "-Y") {
                this.y = this.y - gameSpeed;
            }
            else if(this.direction == "+Y") {
                this.y = this.y + gameSpeed;
            }
            
            if(this.direction == "-X" && this.x < -T) {
                this.reset()
            }
            else if(this.direction == "+X" && this.x > (T+W)) {
                this.reset()
            }
            else if(this.direction == "-Y" && this.y < -T) {
                this.reset()
            }
            else if(this.direction == "+Y" && this.y > (T+H)) {
                this.reset()
            }
        }
    }
}

var P1 = new player();

//Event handler
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if(active) {
        if(e.keyCode == 87) {
            if(gameSpeed < 5) {
                gameSpeed = 5;
            }
            P1.setDirection("-Y");
            P1.increaseSize();
        }
        else if(e.keyCode == 38) {
            if(gameSpeed < 5) {
                gameSpeed = 5;
            }
            P1.setDirection("-Y");
            P1.increaseSize();
        }
        else if(e.keyCode == 65) {
            if(gameSpeed < 5) {
                gameSpeed = 5;
            }
            P1.setDirection("-X");
            P1.increaseSize();
        }
        else if(e.keyCode == 37) {
            if(gameSpeed < 5) {
                gameSpeed = 5;
            }
            P1.setDirection("-X");
            P1.increaseSize();
        }
        else if(e.keyCode == 83) {
            if(gameSpeed < 5) {
                gameSpeed = 5;
            }
            P1.setDirection("+Y");
            P1.increaseSize();
        }
        else if(e.keyCode == 40) {
            if(gameSpeed < 5) {
                gameSpeed = 5;
            }
            P1.setDirection("+Y");
            P1.increaseSize();
        }
        else if(e.keyCode == 68) {
            if(gameSpeed < 5) {
                gameSpeed = 5;
            }
            P1.setDirection("+X");
            P1.increaseSize();
        }
        else if(e.keyCode == 39) {
            if(gameSpeed < 5) {
                gameSpeed = 5;
            }
            P1.setDirection("+X");
            P1.increaseSize();
        }
    }
    else {
        if(e.keyCode == 32) {
            location.reload();
        }
    }
}

nodes = [new node(), new node(), new node(), new node(), new node(), new node(), new node(), new node(), new node(), new node(),
         new node(), new node(), new node(), new node(), new node(), new node(), new node(), new node(), new node(), new node(),
         new node(), new node(), new node(), new node(), new node(), new node(), new node(), new node(), new node(), new node()]

//Draw the background
function drawBackground() {
    ctx.fillStyle = '#2F2F2F';
    ctx.fillRect(0,0,W,H);
}

function updateHighscore() {
    if((gameCount/60) > highscore) {
        highscore = Math.floor(gameCount/60);
        localStorage.setItem('highscore', highscore);
        document.getElementById("highscore").innerHTML = highscore;
    }
}

//Set up game
function initGame() {
    highscore = localStorage.getItem('highscore');
    document.getElementById("highscore").innerHTML = highscore;
    drawGame();
  }
  
  //Draw the game
  function drawGame() {
    requestAnimationFrame(drawGame);
        now = Date.now();
        delta = now - then;
        if (delta > interval) {
            drawBackground();
            P1.draw();
            for(i = 0; i < nodes.length; i++) {
                nodes[i].draw();
                nodes[i].update();
            }
            if(gameSpeed == 0) {
                displayRestart();
            }
            else {
                gameCount += 1;
                updateGame();
                then = now - (delta % interval);
            }
          }
  }
  
  //Update the game
  function updateGame() {
    P1.update();

    
    for(x = 0; x < nodes.length; x++) {
        if(isIntersecting(P1.getX(), P1.getY(), nodes[x].getX(), nodes[x].getY(), T, P1.getSize())) {
            gameSpeed = 0;
            updateHighscore();
        }
    }
    

    document.getElementById("score").innerHTML = Math.floor(gameCount / 60);
    if(nodeCount < 30) {
        if(!nodes[Math.floor(gameCount / 600)].getActive()) {
            nodes[Math.floor(gameCount / 600)].activate();
            nodes[Math.floor(gameCount / 600)].reset();
            nodeCount += 1
        }
    }
  }
  
//Start the game
window.onload = initGame();
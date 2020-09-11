const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const keyPressed = document.querySelector(".keyPressed");

let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
}
let gameSpeed = {value :3 };

let player = {speed :7, score:0};


document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

startScreen.addEventListener('click', start);

function start(){
    
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(playGame);

    let car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);

    let road = gameArea.getBoundingClientRect();
    generateRoadLines();

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    generateRandomEnemy();

}

 
function playGame(){
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if(player.start){
        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y > 300){player.y -= player.speed}
        if(keys.ArrowDown && player.y <road.height-120){player.y += player.speed}
        if(keys.ArrowLeft && player.x>5){player.x -= player.speed}
        if(keys.ArrowRight && player.x<(road.width-60)){player.x += player.speed}

        car.style.top = player.y+'px';
        car.style.left = player.x+'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText = "Score : "+player.score;  

        if(player.score === 1000 || player.score === 2000 || player.score === 3000){
            gameSpeed.value++;
        }
    }
}


function generateRoadLines(){
    for(i = 0; i<=10; i++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y = (i*85);
        roadLine.style.top = roadLine.y+'px';
        gameArea.appendChild(roadLine);

        let roadLineBreak = document.createElement('div');
        roadLineBreak.setAttribute('class','lines brklines');
        roadLineBreak.y = (i*85+30);
        roadLineBreak.style.top = roadLineBreak.y +"px";
        gameArea.appendChild(roadLineBreak);
    }    

}

function generateRandomEnemy(){
    for(x=0; x<3; x++){
        let enemy = document.createElement('div');
        enemy.setAttribute('class','enemy');
        enemy.y = (x*250);
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.floor(Math.random()*120)+(x*120) + 'px';
        enemy.style.backgroundColor = randomColor();
        gameArea.appendChild(enemy);

    }
}

function randomColor(){
    function col(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#"+col()+col()+col();
}

function moveLines(){
    let road_line = document.querySelectorAll('.lines');

    road_line.forEach(function(item){

        if(item.y >= 780){
            item.y = 0;
        }
        item.y += gameSpeed.value;
        item.style.top = item.y + "px";
    })

}

function moveEnemy(car){
    let enemy_car = document.querySelectorAll('.enemy');

    enemy_car.forEach(function(item){
        if(isCollide(item,car)){
            console.log('BUSTED, You hit a CAR.');
            endGame();
        }
        item.x = 0;
        if(item.y >= 700){
            item.y = 0;
            item.x +=  Math.floor(Math.random()*350);
            item.style.left = item.x + "px";
            item.style.backgroundColor = randomColor();
        }
        item.y += gameSpeed.value;
        item.style.top = item.y + "px";
        
    })

}

function isCollide(a,b){
    enemmyReact= a.getBoundingClientRect();
    carRect = b.getBoundingClientRect();

    return !((enemmyReact.bottom<carRect.top) || (enemmyReact.top>carRect.bottom) 
    || (enemmyReact.right<carRect.left) || (enemmyReact.left>carRect.right))
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerText = 'Restart';
    let gameOver = document.createElement('div');
    gameOver.setAttribute('class','gameOver');
    gameOver.innerText = "You banged a car, Game Over !!";
    gameOver.style.top = "-100%";
    gameOver.style.left = "50%";
    gameOver.style.width = "100%";
    startScreen.append(gameOver);
}
    
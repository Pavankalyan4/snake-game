const gameBoard = document.querySelector("#gameBoard");
const ctx=gameBoard.getContext("2d");
const scoretext=document.querySelector("#score");
const resetBtn=document.querySelector("#resetBtn");
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const boardBackground="gray";
const snakeColour="green";
const snakeBorder="blue";
const foodColor="yellow";
const unitsize=25;
let running=false;
let xv=unitsize;
let yv=0;
let foodx;
let foody;
let score=0;
let snake=[
    {x:unitsize*4, y:0},
    {x:unitsize*3, y:0},
    {x:unitsize*2, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown",changedirection);
resetBtn.addEventListener("click",resetGame);

gameStart();
createFood();
drawFood();

function gameStart(){
    running=true;
    scoretext.textContent=score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            CheckGameOver();
            nextTick();
            
        },75);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function createFood(){
    function randomFood(min,max){
        const randNum=Math.round((Math.random()*(max-min)+min)/unitsize)*unitsize;
        return randNum;
    }
    foodx=randomFood(0,gameWidth-unitsize);
    foody=randomFood(0,gameWidth-unitsize);
};
function drawFood(){
    ctx.fillStyle=foodColor;
    ctx.fillRect(foodx,foody,unitsize,unitsize);
};
function moveSnake(){
    const head={x: snake[0].x+xv,
                y: snake[0].y+yv};
    snake.unshift(head);
    if(snake[0].x==foodx && snake[0].y==foody){
        score+=1;
        scoretext.textContent=score;
        createFood();
    }
    else{
        snake.pop()
    }
};
function drawSnake(){
    ctx.fillStyle=snakeColour;
    ctx.strokeStyle=snakeBorder;
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x,snakePart.y,unitsize,unitsize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitsize,unitsize);
    })
};
function changedirection(event){
    const keypressed=event.keyCode;
    const left=37;
    const right=39;
    const up=38;
    const down=40;

    const goingup=(yv==-unitsize)
    const goingdown=(yv==unitsize)
    const goingleft=(xv==-unitsize)
    const goingright=(xv==unitsize)

    switch(true){
        case(keypressed==left &&!goingright):
            xv=-unitsize;
            yv=0;
            break;
        case(keypressed==up &&!goingdown):
            xv=0;
            yv=-unitsize;
            break;
        case(keypressed==right &&!goingleft):
            xv=unitsize;
            yv=0;
            break;
        case(keypressed==down &&!goingup):
            xv=0;
            yv=unitsize;
            break;
    }
};
function CheckGameOver(){
    switch(true){
        case(snake[0].x<0):
            running=false;
            break;
        case(snake[0].x >=gameWidth):
            running=false;
            break;
        case(snake[0].y<0):
            running=false;
            break;
        case(snake[0].y>=gameWidth):
            running=false;
            break;
        for(let i=1;i<snake.length;i++){
            if(snake[i].x==snake[0].x && snake[i].y ==snake[0].y){
                running=flase;
                break;
            }
        }
    }
};
function displayGameOver(){
    ctx.font="50px MV Boii";
    ctx.fillStyle="black";
    ctx.textAling="center";
    ctx.fillText("Gameover!!",gameWidth/2,gameHeight/2);
    running=false;
};
function resetGame(){
    score=0;
    xv=unitsize;
    yv=0;
    snake=[
        {x:unitsize*4, y:0},
        {x:unitsize*3, y:0},
        {x:unitsize*2, y:0},
        {x:0, y:0}
    ];
    gameStart();
};
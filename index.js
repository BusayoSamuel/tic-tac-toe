
var started = false;

const position = {
    "row-0": 0,
    "row-1": 1,
    "row-2": 2,
    "column-0": 0,
    "column-1": 1,
    "column-2": 2,
}

var cell = [['', '', '',],['', '', '',], ['', '', '']];

enableClicks();





function enableClicks(){
    document.querySelectorAll("td").forEach(function(element){
        element.addEventListener("click", userPlays);
    });
}

function disableClicks(){
    document.querySelectorAll("td").forEach(function(element){
        element.removeEventListener("click", userPlays);
    });
}

function userPlays(event){
    let row = position[event.srcElement.classList[0]];
    let column = position[event.srcElement.classList[1]];

    if (cell[row][column] === ""){
        cell[row][column] = "X";
        event.srcElement.textContent = "X";
        disableClicks();
    }else{
        alert("That cell has been played already. Choose another.");
    }

    if(checkForAWin("X")){
        setTimeout(function(){
            alert("🕺🏿 You won! 🕺🏿");
        }, 0);
        gameOver();
    }else{
        document.querySelector("h2").textContent = "Your device is about to make a move...";
        if(isGameOver()){
            return;
        }
        setTimeout(
            computerPlays,
            3000
        )  
    };
}

function computerPlays(){
    if(isGameOver()){
        return;
    }
    let row = Math.floor(Math.random() * 3);
    let column = Math.floor(Math.random() * 3);

    if(cell[row][column] === ''){
        cell[row][column] = "O";
        document.querySelector(".row-"+row+".column-"+column).textContent = "O";
        document.querySelector("h2").textContent = "Your turn!";
        if(checkForAWin("O")){
            setTimeout(function(){
                alert("You lost 🙇🏿");
            }, 0);
            gameOver();
        };
    }else{
        computerPlays();
    }

    enableClicks();
}

function checkForAWin(player){
    //check rows
    for(let i = 0; i < 3; i++ ){
        if (cell[i][0] === player &&
        cell[i][0] === cell[i][1] &&
        cell[i][1] === cell[i][2]){
            return true;
        }
    }

     //check columns
    for(let i = 0; i < 3; i++ ){
        if (cell[0][i] === player &&
        cell[0][i] === cell[1][i] &&
        cell[1][i] === cell[2][i]){
            return true;
        }
    }
  
    //check diagonals
    if (cell[0][0] === player &&
    cell[0][0] === cell[1][1] &&
    cell[1][1] === cell[2][2]){
        return true;
    }else if (cell[0][2] === player &&
    cell[0][2] === cell[1][1] &&
    cell[1][1] === cell[2][0]){
        return true;
    }else{
        return false;
    }
}

function isGameOver(){
    for (let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(cell[i][j] === ''){
                return false;
            }
        }
    }
    alert("It's a draw! 🙅‍♂️")
    gameOver();
    return true;
}

function gameOver(){
    disableClicks();
    document.querySelector("h2").textContent = "Refresh this page to play again";
}


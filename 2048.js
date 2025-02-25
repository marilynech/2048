var board;
var score = 0; 
var rows = 4; 
var columns = 4; 

window.onload = function() {
    console.log("Game is starting..."); //debugging
    setGame(); 
}; 

function setGame(){
    console.log("Setting up the game.. ");
    let boardElement = document.getElementById("board"); 
    if (!boardElement) {
        console.error("ERROR: #board element not found!");
        return;
    }
    //board = [
    //[0,0,0,0],
    //[0,0,0,0],
    //[0,0,0,0],
    //[0,0,0,0]
    //]
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
        ]
//iterate through rows and columns 
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            //create a new div
            let tile = document.createElement("div");
            //tile.id = r.toString() + "-" + c.toString();
            tile.id = `${r}-${c}`;
            let num = board[r][c];
            //need to update style everytime we slide
            //updateTile(tile,num);
            updateTile(tile, board[r][c]);
            //document.getElementById("board").append(tile); 
            boardElement.appendChild(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false; 
}

function setTwo(){
    if(!hasEmptyTile()){
        return; 
    }
    let found = false;
    while(!found){
        //is it empty if so place a 2 there get random r c value
        let r = Math.floor(Math.random() * rows); // gives 0 -1 * 4 -> 0 - 4 rounds it
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0 ){
            board[r][c] = 2; 
            let tile = document.getElementById(r.toString() + "-" + c.toString()); 
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true; 
        }
    }
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = ""; //clear the class list "tile x2"
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText = num;
        if(num <= 4096){
            tile.classList.add("x"+num.toString());
        }
        else{
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) =>{
    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code =="ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code =="ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score; 
})

function filterZero(row){
    return row.filter(num => num != 0) //create a new array without zeros 
}

function slide(row){
//[0,2,2,2]
    row = filterZero(row); //get rid of zeros -> [2,2,2]

//slide
    for(let i = 0; i < row.length-1; i++){ //check ahead
        //check every 2
        if(row[i] == row[i+1]){ //equal one ahead
            row[i] *= 2; //double it
            row[i+1] = 0; //set to zero to clear
            score += row[i]; //increment score
        } //[2,2,2] -> [4,0,2]
    }
    row = filterZero(row); //[4,2]

    //add zeros
    while(row.length < columns){
        row.push(0);
    } //[4,2,0,0]
    return row; 
}


function slideLeft(){
    for(let r = 0; r < rows; r++){
        let row = board[r]; 
        row = slide(row);
        board[r] = row; 

        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString()); //gets the tile
            let num = board[r][c]; //set the number 
            updateTile(tile, num);  
        }
    }
}

function slideRight(){
    for(let r = 0; r < rows; r++){
        let row = board[r]; 
        row.reverse();
        row = slide(row);
        row.reverse(); 
        board[r] = row; 

        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString()); //gets the tile
            let num = board[r][c]; //set the number 
            updateTile(tile, num);  
        }
    }
}

function slideUp(){
    for(let c = 0; c < columns; c++ ){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0]; 
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            let tile = document.getElementById(r.toString() + "-" + c.toString()); //gets the tile
            let num = board[r][c]; //set the number 
            updateTile(tile, num);  
        }

    }
}

function slideDown(){
    for(let c = 0; c < columns; c++ ){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse(); 
        row = slide(row);
        row.reverse(); 
        //board[0][c] = row[0]; 
        //board[1][c] = row[1];
        //board[2][c] = row[2];
        //board[3][c] = row[3];

        for(let r = 0; r < rows; r++){
            board[r][c] = row[r]; 
            let tile = document.getElementById(r.toString() + "-" + c.toString()); //gets the tile
            let num = board[r][c]; //set the number 
            updateTile(tile, num);  
        }

    }
}
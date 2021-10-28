const boards= [
  [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ],  
  [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ],
  [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ],
  [
    "-----64----7-5239---18792--25-----1-4-8-2--39-63-----57-49185638----7-4293---5--8",
    "592136487687452391341879256259683714478521639163794825724918563815367942936245178"
  ],
  [
    "-634--1-91-469-8-7---5-164-3-675-2--54-2-6---218-34----29-----543186-7-2-753-9-6-",
    "763482159154693827982571643396758214547216938218934576629147385431865792875329461"
  ],
  [
    "-57-2163883--------91834-75748-9-3--92--7--611--2854-7---3127----46--1-9-1674---3",
    "457921638832567914691834275748196352925473861163285497589312746374658129216749583"
  ],
  [
    "-915862344-6173---------71--5--6--7-9-----1--6-2897-4327-----5--4873----56--1-48-",
    "791586234426173895835429716354261978987354162612897543279648351148735629563912487"
  ],
  [
    "89---5--351---78--264-3--9-7-6-51-----1972--6--5---4713-----6--642-139-815986-3--",
    "897245163513697842264138795736451289481972536925386471378529614642713958159864327"
  ],
  [
    "2846-5-79--382-65-56-9372-4-2-----37-----19---36-92-4-8-7----13---1---266-245---8",
    "284615379793824651561937284928546137475381962136792845857269413349178526612453798"
  ],
  [
    "5-1-27684684-3572-72-68-------4--2-6-63578---14-296--54-53--19-8--74--523--8---6-",
    "531927684684135729729684513958413276263578941147296835475362198816749352392851467"
  ],
]
//vars
var timer;
var selectedNum;
var selectedTile;
var disableSelect;
var cells; // loaded only once but cant declare it as global const as it is populated later????
let userEntries="";
//selectedGame=newBoard//make this dynamic

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

window.onload=function(){
  //Create blank table
  var cell;
  let table=document.getElementById("table");
  for(let i=0;i<81;i++){
    //create 81 cells and add to table
    cell=document.createElement("p");
    cell.id=i;
    cell.innerHTML=" ";
    cell.classList.add("cell");
    //add right and bottom border classes
    if((i+1)%3==0){
      cell.classList.add("cell--rightBorder");
    }
    if((i>17 && i<27)||(i>44 && i<54)){
      cell.classList.add("cell--bottomBorder");
    }
    cell.addEventListener("click",handleCellClick)
    table.appendChild(cell);
    // cell.onclick=cell.classList.add("cell--selected");
  }
  startGame();
}

function startGame(){
  //select random game from 0-9
  selectedGame=boards[Math.floor(Math.random() * 10)];
  let cells=document.getElementsByClassName("cell");
  for(let i=0;i<cells.length;i++){
    let cellValue=selectedGame[0].charAt(i);
    if(cellValue=="-"){
      cells[i].innerHTML=" ";
    }else{
      cells[i].innerHTML=cellValue;
      cells[i].classList.add("cell--fixedd"); 
    }    
  }  
  let selectedCell=document.querySelector(".cell.cell--selected");
  if(selectedCell){ //if no cell is selected, select the curent one.
    selectedCell.classList.remove("cell--selected");//clear selection 
  } 
  userEntries=selectedGame[0];//initialize board
}

function handleCellClick(){
  clickedCell=this; 
  // console.log(clickedCell.classList);
  if(clickedCell.classList.value.includes("cell--fixedd")){return;}//dont allow selection of fixed cells
  let selectedCell=document.querySelector(".cell.cell--selected");
  if(!selectedCell){ //if no cell is selected, select the curent one.
    clickedCell.classList.add("cell--selected");
    return;
  }
  selectedCell.classList.remove("cell--selected");//clear selection  
  if(clickedCell.id != selectedCell.id){//If there is a selected cell and some other cell is clicked, select this cell.        
    clickedCell.classList.add("cell--selected");
  }
}

function handleNumberClick(numClicked){
  let selectedCell=document.querySelector(".cell.cell--selected");
  if(!selectedCell){ //if no cell is selected, do nothing.
    return;
  }  
  
  if(validateUserEntry(numClicked.innerHTML,selectedCell.id)){
    selectedCell.classList.remove("cell--selected") //clear selection
    // if(selectedCell.classList.includes("cell--error"))
    selectedCell.classList.remove("cell--error");
    selectedCell.innerHTML=numClicked.innerHTML; //Add number value to selectedCell.innerHTML to selected cell  
    userEntries = userEntries.split('');
    userEntries[selectedCell.id]= numClicked.innerHTML;//add to useEntries array
    userEntries = userEntries.join('');
    //check for game completion
    if(userEntries === selectedGame[1]){
      console.log("Game completed!!");
    }
  }else{ //entry is invalid
    selectedCell.innerHTML=numClicked.innerHTML; //Add number value to selectedCell.innerHTML to selected cell  
    selectedCell.classList.add("cell--error");//display cell error
    // sleep(3000).then(() => console.log("waited 1 second!"))
    // selectedCell.innerHTML=" "//remove entry
    // selectedCell.classList.remove("cell--error");//clear error formatting
     selectedCell.classList.remove("cell--selected") //clear selection
  }
}

function validateUserEntry(numberEntered,cellIndex){
  if(numberEntered === selectedGame[1].charAt(cellIndex)){
    console.log("validateUserEntry=true");
    return true;
  }else{
    console.log("validateUserEntry=false")
    return false;
  }  
}


function reset(){
  startGame();
}
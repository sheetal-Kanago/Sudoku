//load boards 

const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];

//vars
var timer;
var selectedNum;
var selectedTile;
var disableSelect;
var cells; // loaded only once but cant declare it as global const as it is populated later????

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
}
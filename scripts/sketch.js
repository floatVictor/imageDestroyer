let img;
let canvas; 
let go = false;
let goRand = false;
let goDl = false;

let nbDivX;
let nbDivY;

let cellLx;
let cellLy;

let cells = [];

let itMax = 2000;
let i;

let randomAdd;
let rotateMult;
let offset;
let rotMod;
let offsetMod;
let randomMod;
let p;


function setup() {
  //console.log("cellLx = ",cellLx);
  //console.log("cellLy = ",cellLy);

  nbCellX = createP('').parent('valuesAux');
  createP('Number of cell (X)').parent('slidersAux');
  cellXSlider = createSlider(1, 200, random(10,100),1).parent('slidersAux');

  nbCellY = createP('').parent('valuesAux');
  createP('Number of cell (Y)').parent('slidersAux');
  cellYSlider = createSlider(0, 200, random(10,100),1).parent('slidersAux');


  valA = createP('').parent('values');
  createP('random incrementation').parent('sliders');
  ASlider = createSlider(0, 5, random(0,1),0.001).parent('sliders');

  valB = createP('').parent('values');
  createP('rotation speed').parent('sliders');
  BSlider = createSlider(0, 0.06, random(0,0.06),0.001).parent('sliders');

  valC = createP('').parent('values');
  createP('offset').parent('sliders');
  CSlider = createSlider(-5, 5,random(-1,1),0.1).parent('sliders');

  valC2 = createP('').parent('values');
  createP('offset modulation').parent('sliders');
  C2Slider = createSlider(0, 15,random(0,3),0.01).parent('sliders');

  valD = createP('').parent('values');
  createP('stroke weight').parent('sliders');
  DSlider = createSlider(0,15,random(0,5),1).parent('sliders');

  valE = createP('').parent('values');
  createP('stroke mutation').parent('sliders');
  ESlider = createSlider(0,1,random(),0.01).parent('sliders');

  valSS = createP('').parent('values');
  createP('speed').parent('sliders');
  speedSlider = createSlider(2,60,30,0.1).parent('sliders');
}

function draw() {

  if(go){
    displayAll();
    updateAll();

    rotateMult += rotMod;
    offset += offsetMod;
    randomAdd += randomMod;
    
    //console.log("iteration nb : ",i);
    
    randomAdd = ASlider.value();
    rotateMult = BSlider.value();
    offset = CSlider.value();
    offset = offset + (C2Slider.value()*map(noise(i*0.01),0,1,-1,1));
  }
  
  strokeWeight(DSlider.value());
  mutationStroke(ESlider.value());
  frameRate(speedSlider.value());

  nbCellX.html(cellXSlider.value());
  nbCellY.html(cellYSlider.value());

  valA.html(randomAdd);
  valB.html(rotateMult);
  valC.html(Math.round(100*offset)/100);
  valC2.html(C2Slider.value());
  valD.html(DSlider.value());
  valE.html(ESlider.value());
  valSS.html(speedSlider.value());

  if(goRand){
    randomize();
    goRand = false;
  }
 
  i++;
}

function start(){
  //console.log("la fonction start");
  //console.log("top:",img.x);

  nbDivX = cellXSlider.value();
  nbDivY = cellYSlider.value();

  canvas = createCanvas(img.width,img.height).parent('image');
  canvas.position(img.top,img.left);
  background(150);

  cellLx = img.width/nbDivX;
  cellLy = img.height/nbDivY;
  go = true;
  i = 0;
  /*
  randomAdd = 0.00001;
  rotateMult = 0.0000001;
  offset = 0.0001;
  */

  randomAdd = ASlider.value();
  rotateMult = BSlider.value();
  offset = CSlider.value();

  /*
  rotMod = 0.000005;
  offsetMod = 0.00001;
  randomMod = 0.001;
  */

  initCells();
  
  //image(img,0,0);
}

function initCells(){

  for (let i=0;i<nbDivX;i++){
    cells[i] = [];
    for(let j=0;j<nbDivY;j++){
      cells[i][j] = new Cell(i*cellLx,j*cellLy);
      //console.log("cell : ",cells[i][j]);
    }
  }

}

function updateAll(){

  for (let i=0;i<nbDivX;i++){
    for(let j=0;j<nbDivY;j++){
      cells[i][j].updateCell();
    }
  }

}

function displayAll(){

  for (let i=0;i<nbDivX;i++){
    beginShape(LINES);
    for(let j=0;j<nbDivY;j++){
      //console.log(cells[i][j].x,cells[i][j].y)
      strokeWeight(1);
      if(random()<0.98)vertex(cells[i][j].x,cells[i][j].y);
      else vertex(cells[random(0,int((cells.lenght)))]
                       [random(0,int(cells[0].lenght))].x
                       ,[random(0,int((cells.lenght)))]
                       [random(0,int(cells[0].lenght))].y);
      cells[i][j].displayCell();
      
      strokeWeight(1);
    }
    endShape();
  }
}

function mutationStroke(prob) {

    if(random()>prob) noStroke();
    
}

function randomize(){

  cellXSlider.value(random(10,200));
  cellYSlider.value(random(10,200));

  ASlider.value(random(0,1));
  BSlider.value(random(0,0.1));
  CSlider.value(random(-1,1));
  C2Slider.value(random(0,2));
  DSlider.value(random(0,3));
  ESlider.value(random());

}


class Cell{

  constructor(x,y){

    this.x = x;
    this.y = y;
    this.rotateCell;

  }
  
  updateCell(){

    let pOm = Math.random() < 0.5 ? -1 : 1;
    this.rotateCell = this.x / cellLx * Math.PI / 180 * pOm * Math.random() * rotateMult;
    pOm = Math.random() < 0.5 ? -1 : 1;
    let translateAdd = this.y / cellLy * pOm * Math.random() * randomAdd;
    this.addUpdate(translateAdd);

  }

  addUpdate(tAdd){

    this.x += tAdd + offset;
    this.y += offset;

  }

  displayCell(){

    colorMode(HSB);
    imageMode(CENTER);
    image(img,this.x+(cellLx/2),this.y+(cellLy/2),cellLx,cellLy,this.x,this.y,cellLx,cellLy);noFill();
    strokeWeight(DSlider.value(),200);
    stroke(map(noise(this.x,this.y,frameCount*0.00001),0,1,0,180)/*,map(noise(2*frameCount*0.01),0,1,20,120),100*/);
    /*if(random()>0.95){
      rect(this.x,this.y,cellLy,cellLx);
      if(random()>0.6) stroke(map(noise(-frameCount*this.y)*0.1,0,1,0,255));
    }*/
    rect(this.x,this.y,cellLx,cellLy);
    rotate(this.rotateCell);
    imageMode(CENTER);

  }

}
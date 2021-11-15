//the site's home page should have a simple video showing someone use the page
//lock canvas in place, maybe onClick=noScroll?
let fJSON;
let mJSON;
let transJSON;

let cnv;
// let drawCont;

let displayArr = [];

let bodySlider;
let drawing = [];
let brushBoxes = [];
let currCol;
let currBrush;
let currSeed = 1;
let radMax = 15;
let rad = radMax;
let scaleX;
let scaleY;
// let onbeforeunload;
let namesOfEmotions = [];
let emotionSel;
let currEmotion;
let saveButton;
let dataAdded = false;

let reposition;
//to save all data from collection
//maybe convert it all to a single json first,
//then save as single json

//save on close, quit?!
function preload() {
  fJSON = loadJSON('json files/fArr.json');
  mJSON = loadJSON('json files/mArr.json');
  transJSON = loadJSON('json files/translationArray.json');
}

function setup() {
  // // cnv = createCanvas(windowHeight / 2, windowHeight);
  // cnv.parent('drawing-container');
  // // cnv.id('bodyCanvas');
  // drawCont = select('#drawing-container');
  // //language option?
  // changeLanguage();

  console.clear();

  cnv = createCanvas(windowHeight / 2, windowHeight);
  cnv.parent('drawing-container');
  cnv.class('bodyCanvas');
  // drawCont = select('#drawing-container');

  pixelDensity(1);
  scaleX = width / 500;
  scaleY = height / 1000;
  bodySlider = new BodySlider();
  bodySlider.resize();

  saveButton = createButton("save");
  saveButton.class('saveButton');
  saveButton.parent('drawing-container');

  // saveButton.mousePressed(saveData);
  emotionSel = createSelect();
  emotionSel.class('emotionSel');
  emotionSel.parent('drawing-container');
  emotionSel.changed(() => currEmotion = emotionSel.value());
  // emotionSel.style('background-color', color(200));
  for (let i = 0; i < fJSON.arr.length; i++) {
    let x = fJSON.arr[i].x;
    let y = fJSON.arr[i].y;
    let xy = {
      x: x,
      y: y
    }
    displayArr.push(xy);
  }
  lerping();
  let w = width / 9;
  let h = rad * 2;
  for (let i = 0; i < 9; i++) {
    let b = new BrushBox(i * w, height - h - 1, w, h, i);
    brushBoxes.push(b);
  }
  currCol = color(0);
  currBrush = "points";
  emotionMenu();
  windowResized();
  reposition = new Reposition();
}

// function buttonsAndSliders() {
//   buttonsDiv = createDiv();
//   buttonsDiv.id('buttons');
//   buttonsDiv.parent('drawing-container');
//   saveButton = createButton("save");
//   saveButton.parent('buttons');
//   saveButton.mousePressed(saveData);
//   eraseButton = createButton("erase");
//   eraseButton.parent('buttons');
//   eraseButton.mousePressed(() => emotions[currMood].length = 0);
//   colSlider = createSlider(0, 255, 150);
//   colSlider.style('width', '230px');
//   colSlider.style('opacity', '0');
//   colSlider.parent('buttons');
//   currCol = colSlider.value();
//   moodSel = createSelect();
//   moodSel.parent('buttons');
//   moodSel.changed(() => currMood = moodSel.value());
//   buttonsDiv.position(wrapper.offsetLeft + wrapper.style.paddingLeft, 2 + wrapper.offsetHeight);
//   // console.log(buttonsDiv.x, buttonsDiv.y, wrapper.offsetLeft, wrapper.offsetHeight);
// }
//
// function rainbowGen() {
//   rainbow = createImage(colSlider.width, colSlider.height);
//   rainbow.loadPixels();
//   let rate = 255 / rainbow.width;
//   for (let i = 0; i < rainbow.width; i++) {
//     let c = color(i * rate, 255, 255);
//     for (let j = 0; j < rainbow.height; j++) {
//       rainbow.set(i, j, c);
//     }
//   }
//   rainbow.updatePixels();
// }



function draw() {
  // if (mouseX < cnv.width && mouseY < cnv.height - saveButton.height - 10) {
  //   fill(currCol, 255, 255, 100);
  //   noStroke();
  //   ellipse(mouseX, mouseY, 20, 20);
  //   if (mouseIsPressed) addPoints();
  // }
  // if (emotions[currMood].length > 0) drawImage();
  // colSlider.input(colorUpdate);

  // saveButton.position(mouseX, mouseY);

  background(255);

  if (mouseY < height - brushBoxes[0].h && mouseY > bodySlider.ySize) {
    noCursor();
  }
  drawBody();
  displayDrawing();
  brushCursor(mouseX, mouseY);
  for (const b of brushBoxes) {
    b.display();
    b.isOver();
  }
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(0, 0, width - 1, height - 1);
  bodySlider.display();
  // if (dataAdded) saveButton.style('background-color', color(255, 255, 0));
  // else {
  //   saveButton.style('background-color', color(200))
  // }
  // let container = document.getElementById('drawing-container');
  // if (document.documentElement.scrollTop >= 170) {
  //   container.classList.add("sticky");
  // } else {
  //   container.classList.remove("sticky")
  // }
  reposition.update();
}

// function saveData() {
//   let data = {
//     points: emotions
//   };
//   db.collection('drawing_data').add(data);
// }

function saveData() {
  if (dataAdded) {
    // let data = {
    //   points: drawing
    // };
    // db.collection('drawing_data').add(data);
  }

  let jsonOutput = {};
  const d = new Date();
  jsonOutput['info'] = ['some info', 'gender: ' + bodySlider.value, d];
  jsonOutput['drawing'] = drawing;
  // saveJSON(jsonOutput, 'output.json');
  dataAdded = false;
}

//load, display, save data
// db.collection('drawing_data').get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     let info = doc.data();
//     // save(info, 'info.json');
//     console.log(info);
//   });
// });
//
// function addPoints() {
//   let dot = {
//     x: mouseX,
//     y: mouseY,
//     col: currCol
//   }
//   emotions[currMood].push(dot);
// }
//
// function drawImage() {
//   for (let i = 0; i < emotions[currMood].length; i++) {
//     let col = emotions[currMood][i].col;
//     let x = emotions[currMood][i].x;
//     let y = emotions[currMood][i].y;
//     fill(col, 255, 255, 10);
//     noStroke();
//     for (let j = 1; j < 7; j++) {
//       ellipse(x, y, j * 3, j * 3);
//     }
//   }
// }
//
// function changeLanguage() {
//   namesOfEmotions = ["desire", "fear", "trust", "joy", "grief", "anger"];
//   for (let i = 0; i < namesOfEmotions.length; i++) {
//     moodSel.option(namesOfEmotions[i], i);
//     let emptyArr = [];
//     emotions.push(emptyArr);
//   }
//   currMood = 0;
// }

/////////////////

function boxResize() {
  let w = width / brushBoxes.length;
  let h = rad * 2;
  brushBoxes.forEach(b => b.resize(brushBoxes.indexOf(b) * w, height - h - 1, w, h));
}

class Reposition {
  constructor() {
    //threshold should be relative
    this.threshold = 170;
    this.currPos = 'above';
    this.prevPos = 'above';
  }
  update() {
    if (document.documentElement.scrollTop >= this.threshold) {
      this.currPos = 'below';
    } else {
      this.currPos = 'above';
    }
    if (this.currPos != this.prevPos) {
      this.prevPos = this.currPos;
      let container = document.getElementById('drawing-container');
      if (this.currPos === 'below') {
        container.classList.add("sticky");
      } else {
        container.classList.remove("sticky")
      }
      windowResized();
    }
  }
}

class BodySlider {
  constructor() {
    this.value = .5;
    this.eFill = 255;
  }
  resize() {
    this.yScale = height / 1000;
    this.ySize = 30 * this.yScale;
    this.eSize = 20 * this.yScale;
    this.pos = map(this.value, 0, 100, 10, width - 10);
    this.lineStroke = 8 * this.yScale;
    this.pos = map(this.value, 0, 1, 10, width - 10);
  }
  clicked() {
    this.value = map(mouseX, 0, width, 0, 1);
    if (this.value > 1) this.value = 1;
    this.pos = map(this.value, 0, 1, 10, width - 10);
    this.eFill = 230;
  }
  unclicked() {
    this.eFill = 255;
  }
  display() {
    strokeCap(SQUARE)
    stroke(230);
    strokeWeight(this.lineStroke);
    line(1, this.ySize, width - 1, this.ySize);

    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(0, 0, width - 1, this.ySize);
    strokeCap(ROUND);
    strokeWeight(this.lineStroke);
    stroke(150);
    line(8, this.ySize / 2, width - 8, this.ySize / 2);

    stroke(120);
    strokeWeight(4);
    line(8, this.ySize - this.eSize + 4, width - 8, this.ySize - this.eSize + 4);

    strokeWeight(1);
    fill(this.eFill);
    ellipseMode(CENTER);
    ellipse(this.pos, this.ySize / 2, this.eSize, this.eSize);

    if (mouseY < this.ySize) cursor('pointer');
  }
}

function drawBody() {
  stroke(240);
  strokeWeight(8);
  noFill();
  beginShape();
  curveVertex(displayArr[0].x, displayArr[0].y);
  displayArr.forEach(obj => curveVertex(obj.x, obj.y));
  curveVertex(displayArr[0].x, displayArr[0].y);
  endShape(CLOSE);

  stroke(230);
  strokeWeight(4);
  noFill();
  beginShape();
  curveVertex(displayArr[0].x, displayArr[0].y);
  displayArr.forEach(obj => curveVertex(obj.x, obj.y));
  curveVertex(displayArr[0].x, displayArr[0].y);
  endShape(CLOSE);

  stroke(200);
  strokeWeight(1);
  noFill();
  beginShape();
  curveVertex(displayArr[0].x, displayArr[0].y);
  displayArr.forEach(obj => curveVertex(obj.x, obj.y));
  curveVertex(displayArr[0].x, displayArr[0].y);
  endShape(CLOSE);
}

function lerping() {
  let morphVal = bodySlider.value;
  let fIndex = 0;
  let mIndex = 0;
  let mAcc = 0;
  let mInc = 0;
  let fEnd = 10;
  let segmentArr = [];
  let segIndex = 0;
  for (let i = 0; i < displayArr.length; i++) {
    fIndex = i;
    if (fIndex >= fEnd && segIndex + 1 < transJSON.segmentArr.length) segIndex++;
    fEnd = transJSON.segmentArr[segIndex].fEnd;
    mInc = transJSON.segmentArr[segIndex].mInc;
    mAcc += mInc;
    mIndex = int(mAcc);
    if (mIndex >= mJSON.arr.length) mIndex--;
    let fX = fJSON.arr[fIndex].x;
    let fY = fJSON.arr[fIndex].y;
    let mX = mJSON.arr[mIndex].x;
    let mY = mJSON.arr[mIndex].y;
    let x = lerp(fX, mX, morphVal);
    let y = lerp(fY, mY, morphVal);
    x *= scaleX;
    y *= scaleY;
    displayArr[i].x = x;
    displayArr[i].y = y;
  }
}

function mousePressed() {
  if (mouseY < bodySlider.ySize && mouseY > 0) {
    bodySlider.clicked();
    lerping();
  }
  addPoints();
}

function mouseDragged() {
  if (mouseY < bodySlider.ySize) {
    bodySlider.clicked();
    lerping();
  }
  addPoints();
}

function mouseReleased() {
  bodySlider.unclicked();
}

function windowResized() {
  let ySize = window.innerHeight * .9;
  let xSize = ySize * .5;
  resizeCanvas(xSize, ySize);
  let outerDiv = document.getElementById('outer');
  outerDiv.style.width = (xSize * 1.05).toString() + 'px';
  outerDiv.style.height = (ySize * 1.03).toString() + 'px';
  scaleX = width / 500;
  scaleY = height / 1000;
  lerping();
  bodySlider.resize();
  boxResize();
  rad = radMax * scaleX;
  let fontSize = 18 * scaleX;
  saveButton.size(80 * scaleX, 40 * scaleY);
  // saveButton.style('font-size', fontSize + 'px');
  emotionSel.size(120 * scaleX, 40 * scaleY);
  // emotionSel.style('font-size', fontSize + 'px');

  saveButton.position(cnv.canvas.offsetLeft,
    cnv.canvas.offsetTop + bodySlider.ySize);
  emotionSel.position(cnv.canvas.offsetLeft + cnv.width - emotionSel.width - 10,
    cnv.canvas.offsetTop + bodySlider.ySize);
}

function displayDrawing() {
  if (drawing[currEmotion].length > 0) {
    for (let i = 0; i < drawing[currEmotion].length; i++) {
      let colLevels = drawing[currEmotion][i].col;
      let r = colLevels[0];
      let g = colLevels[1];
      let b = colLevels[2];
      let col = color(r, g, b);
      let brush = drawing[currEmotion][i].brush;
      let x = drawing[currEmotion][i].x * scaleX;
      let y = drawing[currEmotion][i].y * scaleY;
      let seed = drawing[currEmotion][i].seed;
      switch (brush) {
        case "points":
          points(x, y, col);
          break;
        case "dots":
          dots(x, y, col, seed);
          break;
        case "hashes":
          hashes(x, y, col, seed);
          break;
        case "electric":
          electric(x, y, col, seed);
          break;
        default:
      }
    }
  }
}

function brushCursor(x, y) {
  stroke(0, 50);
  noFill();
  strokeWeight(1);
  ellipse(x, y, rad * 2, rad * 2);
  switch (currBrush) {
    case "points":
      points(x, y, currCol);
      break;
    case "dots":
      dots(x, y, currCol, 1);
      break;
    case "hashes":
      hashes(x, y, currCol, 1);
      break;
    case "electric":
      electric(x, y, currCol, 120);
      break;
    default:
  }
}

function addPoints() {
  let point = {
    brush: currBrush,
    col: currCol.levels,
    x: mouseX * (1 / scaleX),
    y: mouseY * (1 / scaleY),
    seed: currSeed,
    scaleX: scaleX,
    scaleY: scaleY
  }
  if (mouseY < height - (brushBoxes[0].h * 2) &&
    mouseY > (bodySlider.ySize * 2)
    // &&
    // mouseX > (saveButton.x + saveButton.width) &&
    // mouseX < emotionSel.x
  ) {
    drawing[currEmotion].push(point);
    dataAdded = true;
  }
  currSeed++;
}

function points(x, y, col) {
  noStroke();
  fill(col);
  ellipse(x, y, 5, 5);
}

function dots(x, y, col, seed) {
  noStroke();
  fill(col);
  randomSeed(seed);
  for (let i = 0; i < 20; i++) {
    let xOff = random(rad * 2) - rad;
    let yOff = random(rad * 2) - rad;
    ellipse(x + xOff, y + yOff, 2, 2);
  }
}

function hashes(x, y, col, seed) {
  stroke(col);
  strokeWeight(.25);
  randomSeed(seed);
  push();
  translate(x, y);
  rotate(PI / 4);
  for (let i = 0; i < 6; i++) {
    let rotOff = (random(30)-15)/100;
    rotate(rotOff);
    let xPos = (i - 3) * 3;
    let yLen = random(rad / 2, rad);
    line(xPos, -yLen, xPos, yLen)
  }
  rotate(PI / 2);
  for (let i = 0; i < 6; i++) {
    let rotOff = (random(30)-15)/100;
    rotate(rotOff);
    let xPos = (i - 3) * 3;
    let yLen = random(rad / 2, rad);
    line(xPos, -yLen, xPos, yLen)
  }
  pop();
}

function electric(x, y, col, seed) {
  stroke(col);
  randomSeed(seed);
  strokeWeight(2);
  strokeCap(ROUND);
  push();
  translate(x, y);
  noFill();

  function squiggle() {
    beginShape();
    for (let i = -3; i <= 3; i++) {
      let xVert = random(rad / 2) * i;
      let yVert = random(rad / 2) * i;
      let theta = random(TWO_PI);
      rotate(theta);
      curveVertex(xVert, yVert);
    }
    endShape();
    currSeed++;
  }
  squiggle();
  squiggle();
  squiggle();
  pop();
}

class BrushBox {
  constructor(x, y, w, h, brush) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.brush = brush;
    this.isSelected = false;
  }
  resize(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  display() {
    stroke(0);
    strokeWeight(1);
    let cases = this.brush;
    switch (cases) {
      case 0:
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        points(this.x + this.w / 2, this.y + this.h / 2, 0);
        break;
      case 1:
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        dots(this.x + this.w / 2, this.y + this.h / 2, 0, 2);
        break;
      case 2:
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        hashes(this.x + this.w / 2, this.y + this.h / 2, 0, 0);
        break;
      case 3:
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        electric(this.x + this.w / 2, this.y + this.h / 2, color(0), 120);
        break;
      case 4:
        stroke(0);
        fill(0);
        rect(this.x, this.y, this.w, this.h);
        break;
      case 5:
        stroke(0);
        fill(255, 0, 0);
        rect(this.x, this.y, this.w, this.h);
        break;
      case 6:
        stroke(0);
        fill(0, 0, 255);
        rect(this.x, this.y, this.w, this.h);
        break;
      case 7:
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        textAlign(CENTER);
        fill(0);
        noStroke();
        text("undo", this.x + this.w / 2, this.y + this.h / 2);
        break;
      case 8:
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        textAlign(CENTER);
        fill(0);
        noStroke();
        text("erase", this.x + this.w / 2, this.y + this.h / 2);
        break;
      default:
    }
  }
  isOver() {
    if (mouseX > this.x && mouseX < this.x + this.w &&
      mouseY > this.y && mouseY < this.y + this.h) {
      cursor('pointer');
      if (mouseIsPressed) {
        switch (this.brush) {
          case 0:
            currBrush = "points";
            break;
          case 1:
            currBrush = "dots";
            break;
          case 2:
            currBrush = "hashes";
            break;
          case 3:
            currBrush = "electric";
            break;
          case 4:
            currCol = color(0);
            break;
          case 5:
            currCol = color(255, 0, 0);
            break;
          case 6:
            currCol = color(0, 0, 255);
            break;
          case 7:
            drawing[currEmotion].pop();
            break;
          case 8:
            drawing[currEmotion] = [];
            break;
          default:
        }
      }
    }
  }
}

function keyPressed() {
  if (keyCode == 90) drawing[currEmotion].pop();
  let container = document.getElementById('drawing-container');
  let outerDiv = document.getElementById('outer');
  //a = 65
  // console.log(keyCode);
  if (keyCode === 65) {
    // windowResized();
  }
  // s = 83
  if (keyCode === 83) {

    console.log('cont left ' + container.offsetTop);
    console.log('out left ' + outerDiv.offsetTop);
  }
  // d = 68
  if (keyCode === 68) {
    // get scroll position in px
    console.log(document.documentElement.scrollTop);
    // outerDiv.style.height = ySize.toString() + 'px';
    // cnv.canvas.style.offsetLeft = '50px';
  }
}

function emotionMenu() {
  namesOfEmotions = ["desire", "fear", "trust", "joy", "grief", "anger"];
  for (let i = 0; i < namesOfEmotions.length; i++) {
    emotionSel.option(namesOfEmotions[i], i);
    let emptyArr = [];
    drawing.push(emptyArr);
  }
  currEmotion = 0;
}

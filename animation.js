let displayArr = [];

let fJSON;
let mJSON;
let transJSON;

let bodySlider;
let drawing = [];

let radMax = 15;
let rad = radMax;
let scaleX;
let scaleY;

let animator;
let cnv;
function preload() {
  fJSON = loadJSON('json files/fArr.json');
  mJSON = loadJSON('json files/mArr.json');
  transJSON = loadJSON('json files/translationArray.json');
}

function setup() {
  cnv=createCanvas(windowHeight / 2, windowHeight);
  cnv.parent('cnvs');
  cnv.addClass('animation');
  pixelDensity(1);
  scaleX = width / 500;
  scaleY = height / 1000;
  bodySlider = new BodySlider();
  bodySlider.resize();
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
  animator = new Animator();
  animator.reset();
  windowResized();
}

function draw() {
  background(240, 240, 240);
  drawBody();
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(0, 0, width - 1, height - 1);
  animator.update();
  bodySlider.display();
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
  animate(vel) {
    this.value += vel;
    this.pos = map(this.value, 0, 1, 10, width - 10);
    if (this.value > 1) this.value = 1;
    if (this.value < 0) this.value = 0;
  }
}

class Animator {
  constructor() {
    this.destPos = bodySlider.value;
    this.diff;
    this.speed;
    this.velocity = 0;
    this.currDiff;
  }
  update() {
    this.currDiff = this.destPos - bodySlider.value;
    if (abs(this.currDiff) > .1) bodySlider.animate(this.velocity);
    else {
      this.reset();
    }
    lerping();
  }
  reset() {
    this.speed = random(10, 20) / 10000;
    this.destPos = random(5, 99) / 100;
    this.diff = this.destPos - bodySlider.value;
    this.velocity = (this.speed * this.diff);
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

  stroke(100);
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

function windowResized() {
  let ySize = window.innerHeight * .9;
  let xSize = ySize * .5;
  resizeCanvas(xSize, ySize);
  let outerDiv = document.getElementById('cnvs');
  outerDiv.style.width = (xSize * 1.05).toString() + 'px';
  outerDiv.style.height = (ySize * 1.2).toString() + 'px';
  scaleX = width / 500;
  scaleY = height / 1000;
  lerping();
  bodySlider.resize();
  rad = radMax * scaleX;
}

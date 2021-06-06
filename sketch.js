//the site's home page should have a simple video showing someone use the page
let cnv;
let body;
let drawing = [];
let emotions = [];
let namesOfEmotions = [];
let currMood;
let saveButton;
let eraseButton;
let colSlider;
let currCol;
let moodSel;
let rainbow;
let wrapper;
let buttonsDiv;
let drawCont;
//to save all data from collection
//maybe convert it all to a single json first,
//then save as single json

//save on close, quit?!





function preload() {
  body = loadImage("body.png");
}

function setup() {
  let w = windowWidth;
  let h = windowHeight;
  cnv = createCanvas(400, 800);
  cnv.parent('drawing-container');
  // cnv.id('bodyCanvas');
  drawCont = select('#drawing-container');
  // drawCont.position(200, 200);
  pixelDensity(1);
  let wrappers = document.getElementsByClassName("wrapper");
  wrapper = wrappers[1];
  wrapper.style.marginLeft = '15px';
  wrapper.style.paddingLeft = '15px';
  colorMode(HSB, 255);

  noCursor();
  //dynamic canvas size??
  //cnv.resize(w, h);
  background(255);
  buttonsAndSliders();
  //language option?
  changeLanguage();
  rainbowGen();
  console.clear();
}

function buttonsAndSliders() {
  buttonsDiv = createDiv();
  buttonsDiv.id('buttons');
  buttonsDiv.parent('drawing-container');
  saveButton = createButton("save");
  saveButton.parent('buttons');
  saveButton.mousePressed(saveData);
  eraseButton = createButton("erase");
  eraseButton.parent('buttons');
  eraseButton.mousePressed(() => emotions[currMood].length = 0);
  colSlider = createSlider(0, 255, 150);
  colSlider.style('width', '230px');
  colSlider.style('opacity', '0');
  colSlider.parent('buttons');
  currCol = colSlider.value();
  moodSel = createSelect();
  moodSel.parent('buttons');
  moodSel.changed(() => currMood = moodSel.value());
  buttonsDiv.position(wrapper.offsetLeft + wrapper.style.paddingLeft, 2 + wrapper.offsetHeight);
  // console.log(buttonsDiv.x, buttonsDiv.y, wrapper.offsetLeft, wrapper.offsetHeight);
}

function rainbowGen() {
  rainbow = createImage(colSlider.width, colSlider.height);
  rainbow.loadPixels();
  let rate = 255 / rainbow.width;
  for (let i = 0; i < rainbow.width; i++) {
    let c = color(i * rate, 255, 255);
    for (let j = 0; j < rainbow.height; j++) {
      rainbow.set(i, j, c);
    }
  }
  rainbow.updatePixels();
}

//add ctr+z

function draw() {
  image(body, 0, 0, cnv.width, cnv.height)
  stroke(0);
  noFill();
  rect(0, 0, width - 1, height - 1);
  rect(0, 0, width - 1, height - saveButton.height - 10);
  image(rainbow, 100, cnv.height - rainbow.height - 10, rainbow.width - 10, rainbow.height);
  if (mouseX < cnv.width && mouseY < cnv.height - saveButton.height - 10) {
    fill(currCol, 255, 255, 100);
    noStroke();
    ellipse(mouseX, mouseY, 20, 20);
    if (mouseIsPressed) addPoints();
  }
  if (emotions[currMood].length > 0) drawImage();
  colSlider.input(colorUpdate);
}

function colorUpdate() {
  currCol = colSlider.value();
}

function saveData() {
  let data = {
    points: emotions
  };
  db.collection('drawing_data').add(data);
}

//load, display, save data
db.collection('drawing_data').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    let info = doc.data();
    // save(info, 'info.json');
    console.log(info);
  });
});

function addPoints() {
  let dot = {
    x: mouseX,
    y: mouseY,
    col: currCol
  }
  emotions[currMood].push(dot);
}

function drawImage() {
  for (let i = 0; i < emotions[currMood].length; i++) {
    let col = emotions[currMood][i].col;
    let x = emotions[currMood][i].x;
    let y = emotions[currMood][i].y;
    fill(col, 255, 255, 10);
    noStroke();
    for (let j = 1; j < 7; j++) {
      ellipse(x, y, j * 3, j * 3);
    }
  }
}

function changeLanguage() {
  namesOfEmotions = ["desire", "fear", "trust", "joy", "grief", "anger"];
  for (let i = 0; i < namesOfEmotions.length; i++) {
    moodSel.option(namesOfEmotions[i], i);
    let emptyArr = [];
    emotions.push(emptyArr);
  }
  currMood = 0;
}

function windowResized() {
  location.reload();
}

// 1. GENERATE DATA USING CONSTRUCTORS -----------------

// Generate notes
for (var i = 0; i <= 48; i++) {
  var audioFileNumber = i + 1;
  fretArt['notes'].push(new Note(i, audioFileNumber));
}

// List lowest frets for each mode (need to make into an object?)
var ionianLowestFrets = [402,324,246,168,89,12];
var dorianLowestFrets = [401,323,246,168,89,11];
var phrygianLowestFrets = [401,323,245,167,89,11];
var lydianLowestFrets = [402,324,246,168,90,12];
var mixolydianLowestFrets = [401,324,246,168,89,11];
var aeolienLowestFrets = [401,323,245,168,89,11];
var locrianLowestFrets = [401,323,245,167,89,11];
var melMinLowestFrets = [402,323,246,168,89,12];
var harmMinLowestFrets = [402,323,245,168,89,12];

// Create modes and group them in an Object
fretArt.modes = {
  ionian: new Mode("Ionian", [2, 2, 1, 2, 2, 2, 1], ionianLowestFrets),
  dorian: new Mode("Dorian", [2, 1, 2, 2, 2, 1, 2], dorianLowestFrets),
  phrygian: new Mode("Phrygian", [1, 2, 2, 2, 1, 2, 2], phrygianLowestFrets),
  lydian: new Mode("Lydian",[2, 2, 2, 1, 2, 2, 1], lydianLowestFrets),
  mixolydian: new Mode("mixolydian", [2, 2, 1, 2, 2, 1, 2], mixolydianLowestFrets),
  aeolien: new Mode("Aeolien", [2, 1, 2, 2, 1, 2, 2], aeolienLowestFrets),
  locrian: new Mode("Locrian",[1, 2, 2, 1, 2, 2, 2], locrianLowestFrets),
  melMin: new Mode("Melodic Minor",[2, 1, 2, 2, 2, 2, 1], melMinLowestFrets),
  harmMin: new Mode("Harmonic Minor",[2, 1, 2, 2, 1, 3, 1], harmMinLowestFrets)
}

// Create strings and group them in an array
fretArt.strings = [
  new String("highE", 24, 48),
  new String("B", 19, 43),
  new String("G", 15, 39),
  new String("D", 10, 34),
  new String("A", 5, 29),
  new String("lowE", 0, 24)
];

var noteSpacing = 25;
var stringSpacing = 20;
// Create fret objects and push them into frets array
for (var i = 0; i < fretArt.strings.length; i++) {
  var currentString = fretArt.strings[i];
  var stringDistance = (i * stringSpacing) + 125;
  for (var n = currentString.low; n <= currentString.high; n++) {
    var noteDistance = ((n * noteSpacing) + 235) - (currentString.low * noteSpacing);
    var note = fretArt.notes[n];
    fretArt.frets.push(new Fret(noteDistance, stringDistance, note, currentString));
  }
}

var originalXPosition = fretArt.frets[0].x - (25 * noteSpacing);
var xPosition = originalXPosition;

for (var i = 0; i < fretArt.strings.length; i++) {
  var stringDistance = (i * stringSpacing) + 125;
  for (var n = 0; n < 78; n++) {
    fretArt.shadowFrets.push(new ShadowFret(xPosition, stringDistance));
    xPosition += noteSpacing;
  }
  xPosition = originalXPosition;
}

// 2. DEFINE FUNCTIONS -----------------

// Populate arrPositionList by passing in initialArray and number of shapes

create3DArray = function(array, size){
  var newArray = [array];
  for(var i = 0; i < size; i++)
  {
    newArray.push(getNextArrayRow(newArray[i]));
  }
  return newArray;
}

getNextArrayRow = function(array){
  var nextRow = [];
  for(var i = 0; i < array.length; i++)
  {
    var innerArray = array[i];
    var nextElement = [];
    for(var j = 0; j < innerArray.length; j++)
    {
      var value = (innerArray[j] + 1) % (7 + j);
      value = value === 0 ? j : value;
      nextElement.push(value);
    }
    nextRow.push(nextElement);
  }
  return nextRow;
}

// Build shapes for current key and mode
function buildShapes() {
  fretArt.shapes = [];
  // Sets indices for initial array
  var initialArray = [[6,7],[3,4],[1,2],[5,6],[2,3],[6,7]];
  fretArt.arrPositionList = (create3DArray(initialArray,fretArt.numberOfShapes));
  // Set number of shapes based on number of arrays in arrPositionList
  fretArt.numberOfShapes = fretArt.arrPositionList.length - 1;
  // Make blank shapes based on numberOfShapes
  for (var i = 0; i <= fretArt.numberOfShapes; i++) {
    fretArt.shapes.push(new Shape([0,0,0,0,0,0,0,0,0,0,0,0]));
  }
  // Combine currentKey with initialStringIndices
  for (var i = 0; i < fretArt.currentMode.lowestFrets.length; i++) {
    fretArt.stringPos[i] = fretArt.currentKey + fretArt.currentMode.lowestFrets[i];
  }
  var stringIndices = [];
  // Map coordinates from modesLowestFrets to stringIndices[]
  for (var i = 0; i <= 5; i++) {
    stringIndices.push(fretArt.stringPos[i]);
  }
  for (var i = 5; i >= 0; i--) {
    stringIndices.push(fretArt.stringPos[i]);
  }
  // Make left side of first shape
  for (var i = 0; i < stringIndices.length; i++) {
    fretArt.shapes[0].frets[i] += stringIndices[i];
  }
  // Make right side of first shape
  for (var i = 0; i < 6; i++) {
    fretArt.shapes[0].frets[i + 6] += parseInt(fretArt.currentMode.pattern.slice(fretArt.arrPositionList[0][i][0],fretArt.arrPositionList[0][i][1]));
  }
  // Build the rest of the shapes
  for (var n = 0; n < fretArt.numberOfShapes; n++){
    // Build left side of shape
    for (var i = 0; i < 6; i++){
      fretArt.shapes[n+1].frets[i] += parseInt(fretArt.shapes[n].frets.slice(11-i, 12-i));
    }
    // Build right side of shape
    for (var i = 0; i < 6; i++) {
      fretArt.shapes[n+1].frets[i + 6] += parseInt(fretArt.shapes[n].frets.slice(i+6, i+ 7)) + parseInt(fretArt.currentMode.pattern.slice((fretArt.arrPositionList[n+1][i][0]), (fretArt.arrPositionList[n+1][i][1])));
    }
  }
}

function drawLines() {
  for (var i = 0; i < fretArt.shapes.length; i++) {
    var currentShape = fretArt.shapes[i].frets;
    var currentShapeArray = [];
    for (var item in currentShape) {
      currentShapeArray.push(fretArt.shadowFrets[currentShape[item]]);
    }
    console.log(currentShapeArray);
    drawShape(currentShapeArray);
  }
}

// Calculates a scale by key and mode and activates it on the frets
function setScale(key, mode) {
  var foundScale = getScale(key, mode);
  setOctave(key);
  activateFrets(foundScale);
}

// Deactivates all frets to make blank slate
function clearFretSelection() {
  for (var f = 0; f < fretArt.frets.length; f++) {
    fretArt.frets[f].active = false;
  }
}

// Sets octave range relative to key
function setOctave(key) {
  for (var i = 0; i < fretArt.frets.length; i++) {
    var id = fretArt.frets[i].note.id;
    var counter = 0;
    if (fretArt.frets[i]) {
      for (var j = 0; j < 5; j++) {
        if (id >= key + counter -12 && id < key + counter) {
          fretArt.frets[i].octave = j;
        }
        counter += 12;
      }
    }
  }
}

// Loop through to compare foundScale and frets arrays.
// Make every note in frets (that matches foundScale note) active.
function activateFrets(foundScale) {
  clearFretSelection();
  for (var i = 0; i < foundScale.length; i++) {
    for (var f = 0; f < fretArt.frets.length; f++) {
      if (fretArt.frets[f].note == foundScale[i]) {
        fretArt.frets[f].active = true;
      }
    }
  }
}


function processInput() {
  // Grab the key value from the key select fields
  fretArt.currentKey = parseInt(keyValueField.selectedIndex);
  // Grab the name of the key from the text content of the option element
  var currentKeyName = keyValueField.options[keyValueField.selectedIndex].textContent;
  // Grab the current mode using the value from the mode select field
  fretArt.currentMode = fretArt.modes[scaleValueField.value];
  // Calculate and set the scale and display it in the console
  // setScale(fretArt.currentKey, fretArt.currentMode.pattern);
  // buildShapes();
}

function drawShape(shapeArray) {
  push();
  beginShape();
  noFill();
  strokeWeight(2);
  stroke(17,62,185);
  strokeJoin(ROUND);
  for (i = 0; i < shapeArray.length; i++) {
    vertex(shapeArray[i].x,shapeArray[i].y);
  }
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].clicked();
  }
}

function playSound() {
  var cPedal = document.getElementById("_9");
    cPedal.play();
}

// 3. SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION -----------------

// Grab the select fields and buttons from the HTML document
var keyValueField = document.getElementById("key-value");
var scaleValueField = document.getElementById("scale-value");
var showButton = document.getElementById("show-scale");
var clearButton = document.getElementById("clear-scale");
var showLines = document.getElementById("show-lines");
var clearLines = document.getElementById("clear-lines");
var cPedalPlay = document.getElementById("play-button")
var cPedalStop = document.getElementById("stop-button")

keyValueField.addEventListener("change", function(){
  processInput();
  for (var f = 0; f < fretArt.frets.length; f++) {
    if (fretArt.frets[f].active) {
      setScale(fretArt.currentKey, fretArt.currentMode.pattern);
    }
  }
  buildShapes();
});
scaleValueField.addEventListener("change", function(){
  processInput();
  for (var f = 0; f < fretArt.frets.length; f++) {
    if (fretArt.frets[f].active) {
      setScale(fretArt.currentKey, fretArt.currentMode.pattern);
    }
  }
  buildShapes();
});
// When the show button is clicked, do the following...
showButton.addEventListener("click", function(){
  processInput();
  for (var f = 0; f < fretArt.frets.length; f++) {
    if (fretArt.frets[f].active = true) {
      setScale(fretArt.currentKey, fretArt.currentMode.pattern);
    }
  }
  buildShapes();
});
// Clear fretboard and updateDisplay
clearButton.addEventListener("click", clearFretSelection);
showLines.addEventListener("click", function() {
  fretArt.linesVisible = true;
});
clearLines.addEventListener("click", function() {
  fretArt.linesVisible = false;
});
cPedalPlay.addEventListener("click", function() {
  cPedalPlay = true;
});
cPedalStop.addEventListener("click", function() {
 cPedalPlay = false;
});

// 4. REQUIRED P5 FUNCTIONS ------------------------------------------------

function setup() {
  createCanvas(900, 370);
  // buildShapes();
}

// Required P5 function loops forever
function draw() {
  background(0);

  // Turn on lines when Show lines button is clicked
  if (fretArt.linesVisible) {
    drawLines();
  }

  // Turn on C Pedal Tone when Play button is clicked
  if (cPedalPlay == true) {
    playSound();
  } else {
    // Pause C Pedal Tone
    cPedalPlay = false;
  }

  // Start shapes
  push();
  // Make two black rectangles to mask lines overflow
  fill(0);
  rect(0, 120,234, 110);
  rect(836, 120,70, 110);
  // Make a fretboard outline
  noFill();
  strokeWeight(2);
  stroke(17,62,185);
  rect(235, 125,600, 100);
  // Make a thin line with 75% opacity to indicate the nut
  strokeWeight(1);
  stroke(17,62,185,75);
  line(247, 125,247, 225);

  pop();
  // End shapes

  // Trigger note light and sound on note mouseOver
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].overNote();
  }

  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].displayWithColor();
    fretArt.frets[i].attachNotes();
  }
  // var fps = frameRate();
  // fill(255);
  // stroke(0);
  // text("FPS: " + fps.toFixed(2), 10, height - 10);
}

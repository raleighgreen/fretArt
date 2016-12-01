// 1. GENERATE DATA USING CONSTRUCTORS -----------------

// Generate notes
for (var i = 0; i <= 48; i++) {
  var audioFileNumber = i + 1;
  fretArt['notes'].push(new Note(i, audioFileNumber));
}

// Create modes and group them in an Object
fretArt.modes = {
  ionian: new Mode("Ionian", [2, 2, 1, 2, 2, 2, 1]),
  dorian: new Mode("Dorian", [2, 1, 2, 2, 2, 1, 2]),
  phrygian: new Mode("Phrygian", [1, 2, 2, 2, 1, 2, 2]),
  lydian: new Mode("Lydian",[2, 2, 2, 1, 2, 2, 1]),
  mixolydian: new Mode("mixolydian", [2, 2, 1, 2, 2, 1, 2]),
  aeolien: new Mode("Aeolien", [2, 1, 2, 2, 1, 2, 2]),
  locrian: new Mode("Locrian",[1, 2, 2, 1, 2, 2, 2]),
  minPentatonic: new Mode("Minor Pentatonic",[3, 2, 2, 3, 2])
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

// Question 1: Should these the 2 variables below be moved out of the
// global namespace and into fretArt.js? There are lots of other variables
// that appear to be global. Would it be best to place those variables
// elsewhere so that they are out of the global namespace as well?
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

// List lowest frets for each mode (need to make into an object?)
var ionianLowestFrets = [402,324,246,168,89,12];
var dorianLowestFrets = [401,323,246,168,89,11];
var phrygianLowestFrets = [401,323,245,167,89,11];
var lydianLowestFrets = [402,324,246,168,90,12];
var mixolydianLowestFrets = [401,324,246,168,89,11];
var aeolienLowestFrets = [401,323,245,168,89,11];
var locrianLowestFrets = [401,323,245,167,89,11];

// Sets current mode to build into shapes
var initialStringIndices = ionianLowestFrets;
// Current key (8 = C)
var currentKey = 8;
// Number of shapes to create (set to 23 for middle shapes)
fretArt.numberOfShapes = 23;

// Sets indices for initial array
var initialArray = [[6,7],[3,4],[1,2],[5,6],[2,3],[6,7]];
// Make blank shapes based on numberOfShapes
for (var i = 0; i <= fretArt.numberOfShapes; i++) {
  fretArt.shapes.push(new Shape([0,0,0,0,0,0,0,0,0,0,0,0]));
}
// Combine currentKey with initialStringIndices
for (var i = 0; i < initialStringIndices.length; i++) {
  fretArt.stringPos[i] = currentKey + initialStringIndices[i];
}
var stringIndices = [];
// Map coordinates from modesLowestFrets to stringIndices[]
for (var i = 0; i <= 5; i++) {
  stringIndices.push(fretArt.stringPos[i]);
}
for (var i = 5; i >= 0; i--) {
  stringIndices.push(fretArt.stringPos[i]);
}

// 2. DEFINE FUNCTIONS -----------------

// Populate arrPositionList by passing in initialArray and number of shapes

// Question 2: I'm curious about the semantic difference between the two functions
// below and the rest of them? Which should I use and does it matter?
create3DArray = function(array, size){
  var newArray = [initialArray];
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
// Question 3: I tried to move the two fret.arrPositionLists below up into the
// GERERATE DATA section above. However, they need to be below
// the create3DArray functions above to work. Is there a way to move these up
// so that I can keep the functions area clean?
fretArt.arrPositionList = (create3DArray(initialArray,fretArt.numberOfShapes));
// Set number of shapes based on number of arrays in arrPositionList
fretArt.numberOfShapes = fretArt.arrPositionList.length - 1;

// Build shapes for current key and mode
function buildShapes(stringIndices,shapeNumber,arrPositionList) {
  // Make left side of first shape
  for (var i = 0; i < stringIndices.length; i++) {
    fretArt.shapes[0].frets[i] += stringIndices[i];
  }
  // Make right side of first shape
  for (var i = 0; i < 6; i++) {
    fretArt.shapes[0].frets[i + 6] += parseInt(fretArt.modes.ionian.pattern.slice(arrPositionList[0][i][0],arrPositionList[0][i][1]));
  }
  // Build the rest of the shapes
  for (var n = 0; n < shapeNumber; n++){
    // Build left side of shape
    for (var i = 0; i < 6; i++){
      fretArt.shapes[n+1].frets[i] += parseInt(fretArt.shapes[n].frets.slice(11-i, 12-i));
    }
    // Build right side of shape
    for (var i = 0; i < 6; i++) {
      fretArt.shapes[n+1].frets[i + 6] += parseInt(fretArt.shapes[n].frets.slice(i+6, i+ 7)) + parseInt(fretArt.modes.ionian.pattern.slice((arrPositionList[n+1][i][0]), (arrPositionList[n+1][i][1])));
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
    generateShape(currentShapeArray);
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
  var key = parseInt(keyValueField.selectedIndex);
  // Grab the name of the key from the text content of the option element
  var currentKeyName = keyValueField.options[keyValueField.selectedIndex].textContent;
  // Grab the current mode using the value from the mode select field
  var currentMode = fretArt.modes[scaleValueField.value];
  // Calculate and set the scale and display it in the console
  setScale(key, currentMode.pattern);
}

function mousePressed() {
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].clicked();
  }
}

function generateShape(fretArray) {
  // create empty shape array
  var shapeArray = [];
  // loop through the passed in frets
  for (var i = 0; i < fretArray.length; i++) {
    var coordinates = [];
    // Get x and y values from the frets and
    // save them in fretArray[];
    coordinates.push(fretArray[i].x);
    coordinates.push(fretArray[i].y);
    // Add them to the overall shape array
    shapeArray.push(coordinates);
  }
  drawShape(shapeArray);
}

// Pass in shapeArray from Fret.prototype.drawLines() and display shape
function drawShape(shapeArray) {
  push();
  beginShape();
  noFill();
  strokeWeight(1);
  stroke(17,62,185);
  strokeJoin(ROUND);
  for (i = 0; i < shapeArray.length; i++) {
    vertex(shapeArray[i][0],shapeArray[i][1]);
  }
  endShape(CLOSE);
  pop();
}

// 3. SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION -----------------

// Grab the select fields and buttons from the HTML document
var keyValueField = document.getElementById("key-value");
var scaleValueField = document.getElementById("scale-value");
var showButton = document.getElementById("show-scale");
var clearButton = document.getElementById("clear-scale");
var showLines = document.getElementById("show-lines");
var clearLines = document.getElementById("clear-lines");

keyValueField.addEventListener("change", processInput);
scaleValueField.addEventListener("change", processInput);
// When the show button is clicked, do the following...
showButton.addEventListener("click", processInput);
// Clear fretboard and updateDisplay
clearButton.addEventListener("click", clearFretSelection);
showLines.addEventListener("click", function() {
  fretArt.linesVisible = true;
});
clearLines.addEventListener("click", function() {
  fretArt.linesVisible = false;
});

// 4. REQUIRED P5 FUNCTIONS ------------------------------------------------

function setup() {
  createCanvas(900, 370);
  buildShapes(stringIndices,fretArt.numberOfShapes,fretArt.arrPositionList);
}

// Required P5 function loops forever
function draw() {
  background(0);
  if (fretArt.linesVisible) {
    for (var i = 0; i < fretArt.frets.length; i++) {
      drawLines();
    }
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

  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].displayWithColor();
    fretArt.frets[i].attachNotes();
  }
}

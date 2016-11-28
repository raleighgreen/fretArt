// 1. GLOBAL VARIABLES -----------------
var fretXYArray = [];
var linesVisible = false;
var notes = [];
var frets = [];
var strings = [];
var shapes = [];
var noteNameList = [];
var modes;
var currentMode;
var currentKeyName;
var noteNameList = ["E","F","F#","G","G#","A","A#","B","C","C#","D","D#"];
var noteDegreeList = ["3","4","b5","5","b6","6","b7","7","1","b2","2","b3"];
var numberOfShapes;
// 3. GENERATE DATA USING CONSTRUCTORS -----------------

// Generate notes
for (var i = 0; i <= 48; i++) {
  var audioFileNumber = i + 1;
  notes.push(new Note(i, audioFileNumber));
}

// Create modes and group them in an Object
modes = {
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
var strings = [
  new String("highE", 24, 48),
  new String("B", 19, 43),
  new String("G", 15, 39),
  new String("D", 10, 34),
  new String("A", 5, 29),
  new String("lowE", 0, 24)
];

var noteSpacing = 25;
var stringSpacing = 20
// Create fret objects and push them into frets array
for (var i = 0; i < strings.length; i++) {
  var currentString = strings[i];
  var stringDistance = (i * stringSpacing) + 125;
  for (var n = currentString.low; n <= currentString.high; n++) {
    var noteDistance = ((n * noteSpacing) + 235) - (currentString.low * noteSpacing);
    var note = notes[n];
    frets.push(new Fret(noteDistance, stringDistance, note, currentString));
  }
}

var shadowFrets = [];
var originalXPosition = frets[0].x - (25 * noteSpacing);
var xPosition = originalXPosition;

for (var i = 0; i < strings.length; i++) {
  var stringDistance = (i * stringSpacing) + 125;
  for (var n = 0; n < 78; n++) {
    shadowFrets.push(new ShadowFret(xPosition, stringDistance));
    xPosition += noteSpacing;
  }
  xPosition = originalXPosition;
}

// Create 14 shapes with 12 zeroes as shape frets
var shapes = [
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
];

setScale(8, modes.ionian.pattern);
var stringPos = [];
var currentKey = 8;
var initialStringIndices = [402,324,246,168,89,12];

for (var i = 0; i < initialStringIndices.length; i++) {
  stringPos[i] = currentKey + initialStringIndices[i];
}

var stringIndices = [stringPos[0], stringPos[1], stringPos[2], stringPos[3], stringPos[4], stringPos[5], stringPos[5], stringPos[4], stringPos[3], stringPos[2], stringPos[1], stringPos[0]];
var initialArray = [[6,7],[3,4],[1,2],[5,6],[2,3],[6,7]];
var numberOfShapes = 23;

var create3DArray = function(array, size){
  var newArray = [initialArray];
  for(var i = 0; i < size; i++)
  {
    newArray.push(getNextArrayRow(newArray[i]));
  }
  return newArray;
}
var getNextArrayRow = function(array){
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
// Populate arrPositionList by passing in initialArray and number of shapes
arrPositionList = (create3DArray(initialArray,numberOfShapes));
// Set number of shapes based on number of arrays in arrPositionList
numberOfShapes = arrPositionList.length - 1;

// 4. DEFINE FUNCTIONS -----------------

// Build shapes for current key and mode
buildShapes = function(stringIndices,numberOfShapes,arrPositionList) {
  // Make left side of first shape
  for (var i = 0; i < stringIndices.length; i++) {
    shapes[0].frets[i] += stringIndices[i];
  }
  // Make right side of first shape
  for (var i = 0; i < 6; i++) {
    shapes[0].frets[i + 6] += parseInt(modes.ionian.pattern.slice(arrPositionList[0][i][0],arrPositionList[0][i][1]));
  }
  // Build the rest of the shapes
  for (var n = 0; n < numberOfShapes; n++){
    // Build left side of shape
    for (var i = 0; i < 6; i++){
      shapes[n+1].frets[i] += parseInt(shapes[n].frets.slice(11-i, 12-i));
    }
    // Build right side of shape
    for (var i = 0; i < 6; i++) {
      shapes[n+1].frets[i + 6] += parseInt(shapes[n].frets.slice(i+6, i+ 7)) + parseInt(modes.ionian.pattern.slice((arrPositionList[n+1][i][0]), (arrPositionList[n+1][i][1])));
    }
  }
}

drawLines = function() {
  for (var i = 0; i < shapes.length; i++) {

    var currentShape = shapes[i].frets;
    var currentShapeArray = [];
    for (var item in currentShape) {
      currentShapeArray.push(shadowFrets[currentShape[item]]);
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
  for (var f = 0; f < frets.length; f++) {
    frets[f].active = false;
  }
}

// Sets octave range relative to key
function setOctave(key) {
  for (var i = 0; i < frets.length; i++) {
    var id = frets[i].note.id;
    var counter = 0;
    if (frets[i]) {
      for (var j = 0; j < 5; j++) {
        if (id >= key + counter -12 && id < key + counter) {
          frets[i].octave = j;
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
    for (var f = 0; f < frets.length; f++) {
      if (frets[f].note == foundScale[i]) {
        frets[f].active = true;
      }
    }
  }
}

function processInput() {
  // Grab the key value from the key select fields
  key = parseInt(keyValueField.selectedIndex);
  // Grab the name of the key from the text content of the option element
  currentKeyName = keyValueField.options[keyValueField.selectedIndex].textContent;
  // Grab the current mode using the value from the mode select field
  currentMode = modes[scaleValueField.value];
  // Calculate and set the scale and display it in the console
  setScale(key, currentMode.pattern);
}

// 5. SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION -----------------

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
  linesVisible = true;
});
clearLines.addEventListener("click", function() {
  linesVisible = false;
});

// Required P5 function runs once to initialize setup

function setup() {
  createCanvas(900, 450);
  buildShapes(stringIndices,numberOfShapes,arrPositionList);
}

function mousePressed() {
  for (var i = 0; i < frets.length; i++) {
    frets[i].clicked();
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
  stroke(256);
  strokeWeight(2);
  strokeJoin(ROUND);
  for (i = 0; i < shapeArray.length; i++) {
    vertex(shapeArray[i][0],shapeArray[i][1]);
  }
  endShape(CLOSE);
  pop();
}

// Required P5 function loops forever
function draw() {
  background(0);
  if (linesVisible) {
    for (var i = 0; i < frets.length; i++) {
      drawLines();
    }
  }
  for (var i = 0; i < frets.length; i++) {
    frets[i].displayWithColor();
    frets[i].attachNotes();
  }
}

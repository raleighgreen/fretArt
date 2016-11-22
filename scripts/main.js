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

// Create shapes and group them in an array
// The numbers to the left build left outline of the shape
// The numbers to the right build the right outline of the shape
// var origShapes = [
//   new Shape([125,100,75,50,25,0, 1,26,52,77,102,126]),
//   new Shape([126,102,77,52,26,1, 3,28,54,78,103,128]),
//   new Shape([128,103,78,54,28,3, 5,30,55,80,105,130]),
//   new Shape([130,105,80,55,30,5, 7,31,57,82,107,132]),
//   new Shape([132,107,82,57,31,7, 8,33,59,84,108,133]),
//   new Shape([133,108,84,59,33,8, 10,35,60,85,110,135]),
//   new Shape([135,110,85,60,35,10, 12,37,62,87,112,137]),
//   new Shape([137,112,87,62,37,12, 13,38,64,89,114,138]),
//   new Shape([138,114,89,64,38,13, 15,40,66,90,115,140]),
//   new Shape([140,115,90,66,40,15, 17,42,67,92,117,142]),
//   new Shape([142,117,92,67,42,17, 19,43,69,94,119,144]),
//   new Shape([144,119,94,69,43,19, 20,45,71,96,120,145]),
//   new Shape([145,120,96,71,45,20, 22,47,72,97,122,147]),
//   new Shape([147,122,97,72,47,22, 24,49,74,99,124,149])
// ];
// console.log(origShapes);
// new Shape([1, -20, ])

// drawShape(fret[127], shapeA);

// Define shape patterns

// Draw shape patterns from a given starting note
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

console.log(shadowFrets);
console.log(frets[100]);
console.log(shadowFrets[337]);

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
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0])
];
// Determine lowest active fret
// loop through all frets
// Check each fret to see if it's active
// Save the id of the first active fret to a variable
setScale(8, modes.ionian.pattern);
var currentKey = 8;
for (var i = 0; i < frets.length; i++) {
  if (frets[i].active) {
    firstActiveFret = i;
    console.log(firstActiveFret);
    break;
  }
}

drawLines = function() {
  for (var i = 0; i < shapes.length; i++) {
    var currentShape = shapes[i].frets;
    var currentShapeArray = [];
    for (var item in currentShape) {
      currentShapeArray.push(frets[currentShape[item]]);
    }
    generateShape(currentShapeArray);
  }
}
/* ------------------------------------------*/
var stringIndices = [125, 100, 75, 50, 25, 0, 0, 25, 50, 75, 100, 125];
var numberOfShapes = 11;
var patternSlices = [
  [[2,3],[6,7],[4,5],[1,2],[5,6],[2,3]],
  [[3,4],[0,1],[5,6],[2,3],[6,7],[3,4]],
  [[4,5],[1,2],[6,7],[3,4],[0,1],[4,5]],
  [[5,6],[2,3],[0,1],[4,5],[1,2],[5,6]],
  [[6,7],[3,4],[1,2],[5,6],[2,3],[6,7]],
  [[0,1],[4,5],[2,3],[6,7],[3,4],[0,1]],
  [[1,2],[5,6],[3,4],[0,1],[4,5],[1,2]],
  [[2,3],[6,7],[4,5],[1,2],[5,6],[2,3]],
  [[3,4],[0,1],[5,6],[2,3],[6,7],[3,4]],
  [[4,5],[1,2],[6,7],[3,4],[0,1],[4,5]],
  [[5,6],[2,3],[0,1],[4,5],[1,2],[5,6]],
  [[6,7],[3,4],[1,2],[5,6],[2,3],[6,7]],
];
// console.log(newPatternSlices);
// Make left side of first shape
for (var i = 0; i < stringIndices.length; i++) {
  shapes[0].frets[i] += firstActiveFret;
  shapes[0].frets[i] += stringIndices[i];
}
// Make right side of first shape
for (var i = 0; i < 6; i++) {
  shapes[0].frets[i + 6] += parseInt(modes.ionian.pattern.slice(patternSlices[0][i][0],patternSlices[0][i][1]));
}
// Number of remaining shapes to create (zero indexed)
// Build the rest of the shapes
for (var n = 0; n < numberOfShapes; n++){
  // Build left side of shape
  for (var i = 0; i < 6; i++){
    shapes[n+1].frets[i] += parseInt(shapes[n].frets.slice(11-i, 12-i));
  }
  // Build right side of shape
  for (var i = 0; i < 6; i++) {
    shapes[n+1].frets[i + 6] += parseInt(shapes[n].frets.slice(i+6, i+ 7)) + parseInt(modes.ionian.pattern.slice((patternSlices[n+1][i][0]), (patternSlices[n+1][i][1])));
  }
}
/* ------------------------------------------*/
// 4. DEFINE FUNCTIONS -----------------

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

// 1. GLOBAL VARIABLES -----------------

var linesVisible = false;
var notes = [];
var frets = [];
var strings = [];
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
  mixolydian: new Mode("Mixolydian", [2, 2, 1, 2, 2, 1, 2]),
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

// Create fret objects and push them into frets array
for (var i = 0; i < strings.length; i++) {
  var currentString = strings[i];
  var stringDistance = (i * 20) + 125;
  for (var n = currentString.low; n <= currentString.high; n++) {
    var noteDistance = ((n * 25) + 235) - (currentString.low * 25);
    var note = notes[n];
    frets.push(new Fret(noteDistance, stringDistance, note, currentString));
  }
}

// 4. DEFINE FUNCTIONS -----------------

// Calculates a scale by key and mode and activates it on the frets
function setScale(key, mode) {
  var foundScale = getScale(key, mode);
  setOctave();
  activateFrets(foundScale);
}

// Deactivates all frets to make blank slate
function clearFretSelection() {
  for (var f = 0; f < frets.length; f++) {
    frets[f].active = false;
  }
}

// Sets octave range relative to key
function setOctave() {
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
        frets[f].activeId = f;
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

keyValueField.addEventListener("change", processInput);
scaleValueField.addEventListener("change", processInput);
// When the show button is clicked, do the following...
showButton.addEventListener("click", processInput);
// Clear fretboard and updateDisplay
clearButton.addEventListener("click", clearFretSelection);
showLines.addEventListener("click", function() {
  linesVisible = true;
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
var shapeArray = [[235,125],[260,125],[260,145],[285,165]];
function drawShape() {
  for (i = 0; i < shapeArray.length; i++) {
    noLoop();
    push();
    noFill();
    stroke(256);
    strokeWeight(2);
    strokeJoin(ROUND);
    vertex(shapeArray[i]);
    endShape(CLOSE);
    pop();
  }
}
function drawLines() {
  drawShape();
}

// Required P5 function loops forever
function draw() {
  background(0);
  for (var i = 0; i < frets.length; i++) {
    frets[i].displayWithColor();
    frets[i].attachNotes();
  }
  if (linesVisible) {
    for (var i = 0; i < frets.length; i++) {
      drawLines();
    }
  }
}

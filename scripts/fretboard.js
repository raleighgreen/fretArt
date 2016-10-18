// 1. GLOBAL VARIABLES -----------------

var notes = [];
var frets = [];
var strings = [];
var modes;
var currentMode;
var currentKeyName;
var currentKey;

// 2. OBJECT CONSTRUCTORS -----------------

function Note(id, audioFile) {
  this.id = id;
  this.audioFile = audioFile;
}

function Mode(name, pattern) {
  this.name = name;
  this.pattern = pattern;
}

function String(name, low, high) {
  this.name = name;
  this.low = low;
  this.high = high;
}

function Fret(x, y, note, string) {
  this.note = note;
  this.string = string;
  this.active = false;
  this.x = x;
  this.y = y;
  this.display = function() {
    // if (this.active) {
    //   this.col = noteOnColor;
    // } else if (this.playColor) {
    //   this.col = notePlayColor;
    // } else {
    //   this.col = noteOffColor;
    // }
    fill(color(93,81,214));
    ellipse(this.x, this.y, 7, 7);
  };
}



// 3. GENERATE DATA USING CONSTRUCTORS -----------------

// Generate notes
for (var i = 0; i <= 48; i++) {
  notes.push(new Note(i));
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
  new String("E", 24, 48),
  new String("B", 19, 43),
  new String("G", 15, 39),
  new String("D", 10, 34),
  new String("A", 5, 29),
  new String("E", 0, 24)
];

// calculate the x and y position of the fret
// define a distance from string to string
// define a distance from fret to fret

// 1. Draw the frets in the right place on the screen
// 2. When select options are submitted, highlight the correct frets

// Create fret objects and push them into frets array
for (var i = 0; i < strings.length; i++) {
  var currentString = strings[i];
  var stringDistance = (i * 20) + 20;
  for (var n = currentString.low; n <= currentString.high; n++) {
    var noteDistance = ((n * 20) + 20) - (currentString.low * 20);
    var note = notes[n];
    frets.push(new Fret(noteDistance, stringDistance, note, currentString));
    // n = 0;
  }
}

// 4.DEFINE FUNCTIONS -----------------

// Calculates a scale by key and mode and activates it on the frets
function setScale(key, mode) {
  var foundScale = getScale(key, mode);
  activateFrets(foundScale);

}

// Deactivates all frets to make blank slate
function clearFretSelection() {
  for (var f = 0; f < frets.length; f++) {
    frets[f].active = false;
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

// Loop through frets on each string to check for active status.
// If the fret is active, show a "O", otherwise show a "-".
function updateDisplay(mode) {
  var fretboard = "";
  for (var i = 0; i < strings.length; i++) {
    for (var f = 0; f < frets.length; f++) {
      if (frets[f].string == strings[i]) {
        if (frets[f].active) {
          fretboard += "O ";
        } else {
          fretboard += "- ";
        }
      }
    }
    fretboard += "\n";
  }
  console.clear();
  console.log("scale: " + currentKeyName + " " + scaleValueField.value + "   scale pattern: " + currentMode.pattern);
  console.log(fretboard);
}

// Algorithm to find scale within a set of notes
function getScale(key, scale) {
  var foundScale = [];
  var modeIndex = 0;
  var noteInKey = key;

  while (noteInKey < notes.length) {
    var currentNote = notes[noteInKey];
    if (modeIndex >= scale.length) {
      modeIndex = 0;
    }
    // Push note object to the foundScale array
    foundScale.push(currentNote);
    noteInKey += scale[modeIndex];
    modeIndex++;
  }

  foundScale.splice(0,1);
  scale.reverse();
  noteInKey = key;
  modeIndex = 0;

  while (noteInKey >= 0) {
    currentNote = notes[noteInKey];
    foundScale.unshift(currentNote);
    noteInKey -= scale[modeIndex];
    modeIndex++;
  }

  scale.reverse();
  return foundScale;
}

// 5.SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION -----------------

// Grab the select fields and buttons from the HTML document
var keyValueField = document.getElementById("key-value");
var scaleValueField = document.getElementById("scale-value");
var showButton = document.getElementById("show-scale");
var clearButton = document.getElementById("clear-scale");

// When the show button is clicked, do the following...
showButton.addEventListener("click", function() {

  // Grab the key value from the key select fields
  currentKey = parseInt(keyValueField.selectedIndex);

  // Grab the name of the key from the text content of the option element
  currentKeyName = keyValueField.options[keyValueField.selectedIndex].textContent;

  // Grab the current mode using the value from the mode select field
  currentMode = modes[scaleValueField.value];

  // Calculate and set the scale and display it in the console
  setScale(currentKey, currentMode.pattern);
  updateDisplay();
});

// Clear fretboard and updateDisplay
clearButton.addEventListener("click", function() {
  clearFretSelection();
  updateDisplay();
});

function setup() {
  createCanvas(700, 500);
}
//
// function play(){
// }
//
// function mousePressed() {
//   // for (var i = 0; i < frets.length; i++) {
//   //   frets[i].clicked();
//   // }
// }
//
function draw() {
  background(0);
  for (var i = 0; i < frets.length; i++) {
    // turn frets[i].display(); back on to display
    frets[i].display();
  }
}

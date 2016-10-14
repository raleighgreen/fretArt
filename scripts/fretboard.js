// 1. Declare all global variables at the top
var frets = [];
var notes = [];
var strings;
var modes;
var currentMode;
var currentKey;
var currentKeyName;

// 2. Declare all object constructors

// New object constructor for "modes". This will help keep the data related to modes together: The official name of the mode and the pattern of steps in the mode. Also calling it Mode helps differentiate it from "scales" which are a specific set of notes in a specific key, at least in this script.
function Mode(name, pattern) {
  this.name = name;
  this.pattern = pattern;
}
function Note(id, audioFile) {
  this.id = id;
  this.audioFile = audioFile;
}
function String(name, low, high) {
  this.name = name;
  this.low = low;
  this.high = high;
}
function Fret(note, string) {
  this.note = note;
  this.string = string;
  // Adding an "active" property to the frets which will determine how they appear when they're drawn or logged to the console. Instead of overwriting the ID of the note, we'll can use this to change the appearance of the display without overwriting core data.
  this.active = false;
}

// 3. Generate all the data using the constructors

// Generate notes
for (var i = 0; i <= 48; i++) {
  notes.push(new Note(i));
}

// Create modes and group them in an object
modes = {
  ionian: new Mode("Ionian", [2, 2, 1, 2, 2, 2, 1]),
  dorian: new Mode("Dorian", [2, 1, 2, 2, 2, 1, 2]),
  phrygian: new Mode("Phrygian", [1, 2, 2, 2, 1, 2, 2]),
  lydian: new Mode("Lydian", [2, 2, 2, 1, 2, 2, 1]),
  mixolydian: new Mode("Mixolydian", [2, 2, 1, 2, 2, 1, 2]),
  aeolian: new Mode("Aeolian", [2, 1, 2, 2, 1, 2, 2]),
  locrian: new Mode("Locrian", [1, 2, 2, 1, 2, 2, 2]),
  minPentatonic: new Mode("Minor Pentatonic", [3, 2, 2, 3, 2])
};

// Create strings and group them in an array
strings = [
  new String("E", 24, 48),
  new String("B", 19, 43),
  new String("G", 15, 39),
  new String("D", 10, 34),
  new String("A", 5, 29),
  new String("E", 0, 24)
];

// Create frets
for (var i = 0; i < strings.length; i++) {
  var currentString = strings[i];
  for (var n = currentString.low; n <= currentString.high; n++) {
    var note = notes[n];
    frets.push(new Fret(note, currentString));
  }
}

// 4. Define functions

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
    // Push the entire note object to the array rather than the index of the note. This way we can compare it against the fret data to see if it's a match.
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

// Deactivates all frets to start from a blank slate
function clearFretSelection() {
  for (var f = 0; f < frets.length; f++) {
    frets[f].active = false;
  }
}

// Loops through the notes in a scale and checks each fret to see if that fret has that note attached to it. If it does, activate the fret.
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

// Loops through the frets for each string and checks if they're active or not. If it's active, show a "O", otherwise show a "-".
function updateDisplay() {
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
  console.log("scale: " + currentKeyName + " " + currentMode.name + "   scale pattern: " + currentMode.pattern);
  console.log(fretboard);
}

// Calculates a scale by key and mode and activates it on the frets.
function setScale(key, mode) {
  var foundScale = getScale(key, mode.pattern);
  activateFrets(foundScale);
}

// 5. Set up DOM event listeners and wait for user action

// Grab the select fields and buttons from the HTML document
var keyValueField = document.getElementById("key-value");
var scaleValueField = document.getElementById("scale-value");
var showButton = document.getElementById("show-scale");
var clearButton = document.getElementById("clear-scale");

// When the show button is clicked, do the following...
showButton.addEventListener("click", function() {

  // Grab the key value from the key select field
  currentKey = parseInt(keyValueField.value);

  // Grab the name of the key from the text content of the option element
  currentKeyName = keyValueField.options[keyValueField.selectedIndex].textContent;

  // Grab the current mode using the value from the mode select field
  currentMode = modes[scaleValueField.value];

  // Calculate and set the scale and display it in the console
  setScale(currentKey, currentMode);
  updateDisplay();
});

// function setup() {
//   // createCanvas(700, 500);
// }
//
// function play(){
// }
//
// function mousePressed() {
//   // for (var i = 0; i < frets.length; i++) {
//   //   frets[i].clicked();
//   // }
// }

// function draw() {
//   // background(0);
//   // for (var i = 0; i < frets.length; i++) {
//     // turn frets[i].display(); back on to display
//     // frets[i].display();
//   // }
// }

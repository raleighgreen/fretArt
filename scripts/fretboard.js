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
  this.audioFile = document.getElementById("_" + audioFile);
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
  this.x = x;
  this.y = y;
  this.note = note;
  this.string = string;
  this.active = false;
  this.noteClickedColor = false;
  this.col = "";
  this.display = function() {
    var firstOctaveOnColor = color(74,39,88);
    var firstOctClickedColor = color(174,97,252);

    var secondOctaveOnColor = color(19,85,198);
    var secondOctClickedColor = color(135,197,255);

    var thirdOctaveOnColor = color(106,128,104);
    var thirdOctClickedColor = color(154,212,130)

    var fourthOctaveOnColor = color(175,116,3);
    var fourthOctClickedColor = color(255,209,130);

    var fifthOctaveOnColor = color(176,29,29);
    var fifthOctClickedColor = color(255,84,84);

    var noteOffColor = color(29,28,29);

    if (this.active && note.id <= 12) {
      this.col = firstOctaveOnColor;
    } else if (this.active && note.id > 12 && note.id <= 24) {
      this.col = secondOctaveOnColor;
    } else if (this.active && note.id > 24 && note.id <= 36) {
      this.col = thirdOctaveOnColor;
    } else if (this.active && note.id > 36 && note.id <= 47) {
      this.col = fourthOctaveOnColor;
    } else if (this.active && note.id == 48) {
      this.col = fifthOctaveOnColor;
    } else {
      this.col = noteOffColor;
    }

    if (this.noteClickedColor && note.id <= 12) {
      this.col = firstOctClickedColor;
    } else if (this.noteClickedColor && note.id > 12 && note.id <= 24) {
      this.col = secondOctClickedColor;
    } else if (this.noteClickedColor && note.id > 24 && note.id <= 36) {
      this.col = thirdOctClickedColor;
    } else if (this.noteClickedColor && note.id > 36 && note.id <= 47) {
      this.col = fourthOctClickedColor;
    } else if (this.noteClickedColor && note.id == 48) {
      this.col = fifthOctClickedColor;
    }

    fill(this.col);
    ellipse(this.x, this.y, 9, 9);
  };

  // If a note is clicked, play sound and light up
  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    var audioNote = this.note.audioFile;
    // If in the bounds of the note...
    if (d < 7) {
      // Play the note's audioFile
      audioNote.play();
      // And light it up
      this.noteClickedColor = true;
      var passThisToTimeout = this;
      // Turn light off after some time
      setTimeout(function() {
        passThisToTimeout.noteClickedColor = false;
        console.log("done");
      }, 2700);
    }
  }
}

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
  new String("E", 24, 48),
  new String("B", 19, 43),
  new String("G", 15, 39),
  new String("D", 10, 34),
  new String("A", 5, 29),
  new String("E", 0, 24)
];

// Create fret objects and push them into frets array
for (var i = 0; i < strings.length; i++) {
  var currentString = strings[i];
  var stringDistance = (i * 20) + 100;
  for (var n = currentString.low; n <= currentString.high; n++) {
    var noteDistance = ((n * 20) + 100) - (currentString.low * 20);
    var note = notes[n];
    frets.push(new Fret(noteDistance, stringDistance, note, currentString));
  }
}

// 4. DEFINE FUNCTIONS -----------------

function mousePressed() {
  for (var i = 0; i < frets.length; i++) {
    frets[i].clicked();
  }
}
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

  // Remove first note from foundScale in order to avoid doubling
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
  // Reset scale
  scale.reverse();
  return foundScale;
}

function processEventListenerElement() {
  // Grab the key value from the key select fields
  currentKey = parseInt(keyValueField.selectedIndex);

  // Grab the name of the key from the text content of the option element
  currentKeyName = keyValueField.options[keyValueField.selectedIndex].textContent;

  // Grab the current mode using the value from the mode select field
  currentMode = modes[scaleValueField.value];

  // Calculate and set the scale and display it in the console
  setScale(currentKey, currentMode.pattern);
}

// 5. SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION -----------------

// Grab the select fields and buttons from the HTML document
var keyValueField = document.getElementById("key-value");
var scaleValueField = document.getElementById("scale-value");
var showButton = document.getElementById("show-scale");
var clearButton = document.getElementById("clear-scale");

// When the show button is clicked, do the following...
keyValueField.addEventListener("change", function() {
  processEventListenerElement();
});

scaleValueField.addEventListener("change", function() {
  processEventListenerElement();
});

showButton.addEventListener("click", function() {
  processEventListenerElement();
});

// Clear fretboard and updateDisplay
clearButton.addEventListener("click", function() {
  clearFretSelection()
});

// Required P5 function runs once to initialize setup
function setup() {
  createCanvas(700, 500);
}

// Required P5 function loops forever
function draw() {
  background(0);
  for (var i = 0; i < frets.length; i++) {
    frets[i].display();
  }
}

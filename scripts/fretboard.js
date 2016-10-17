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

function Fret(note, string) {
  this.note = note;
  this.string = string;
  this.active = false;
}

// 3. GENERATE DATA USING CONSTRUCTORS -----------------

// Generate notes
for (var i = 0; i <= 48; i++) {
  notes.push(new Note(i));
}

// Create modes and group them in an Object
modes = {
  ionian: new Mode("Ionian", [2, 2, 1, 2, 2, 2, 1]);
  dorian: new Mode("Dorian", [2, 1, 2, 2, 2, 1, 2]);
  phrygian: new Mode("Phrygian", [1, 2, 2, 2, 1, 2, 2]);
  lydian: new Mode("Lydian",[2, 2, 2, 1, 2, 2, 1]);
  mixolydian: new Mode("Mixolydian", [2, 2, 1, 2, 2, 1, 2]);
  aeolien: new Mode("Aeolien", [2, 1, 2, 2, 1, 2, 2]);
  locrian: new Mode("Locrian",[1, 2, 2, 1, 2, 2, 2]);
  minPentatonic: new Mode("Minor Pentatonic",[3, 2, 2, 3, 2]);
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
  for (var n = currentString.low; n <= currentString.high; n++) {
    var note = notes[n];
    frets.push(new Fret(note, currentString, active));
  }
}

// 4.DEFINE FUNCTIONS -----------------

function updateDisplay(currentMode) {
  currentMode = currentMode;
  var fretboard = "";
  for (var i = 0; i < strings.length; i++) {
    for (var f = 0; f < frets.length; f++) {
      if (frets[f].string == strings[i]) {
        fretboard += frets[f].note.id + " ";
      }
    }
    fretboard += "\n";
  }
  console.clear();
  console.log("scale: " + currentKeyName + " "+ scaleName + "   scale pattern: " + currentMode);
  console.log(fretboard);
}

function setup() {
  // createCanvas(700, 500);
}

function play(){
}

function mousePressed() {
  // for (var i = 0; i < frets.length; i++) {
  //   frets[i].clicked();
  // }
}

function draw() {
  // background(0);
  // for (var i = 0; i < frets.length; i++) {
    // turn frets[i].display(); back on to display
    // frets[i].display();
  // }
}

function compareFoundScaleWithNotes(foundScale, notes) {
  // loop through the length of the notes array
  for (i = 0; i < notes.length; i++) {
    // compare the indexOf notes[] and foundScale[]
    if (notes.indexOf(i) == foundScale.indexOf(i)) {
      // if a match, make note[i].id = "-" (a non-scale tone)
      notes[i].id = "-";
    } else {
      // if not a match, make note[i].id = "O" (a scale tone)
      notes[i].id = "O";
    }
  }
  // make fretboard and display in the console
}

function getScale(key, scale) {
  var foundScale = [];
  // start at the beginning of the mode
  var modeIndex = 0;
  // set the first note to the starting key
  var noteInKey = key;
  while (noteInKey < notes.length) {
    var currentNote = notes[noteInKey];
    if (modeIndex >= scale.length) {
      modeIndex = 0;
    }
    foundScale.push(noteInKey);
    noteInKey += scale[modeIndex];
    modeIndex++;
  }
  // remove the first array element from foundScale[]
  // in order to avoid a doubled first index
  foundScale.splice(0,1);
  // reverse the scale[] array
  scale.reverse();
  noteInKey = key;
  modeIndex = 0;
  while (noteInKey >= 0) {
    currentNote = notes[noteInKey];
    // push noteInKey to the beginning of the foundScale[] array
    foundScale.unshift(noteInKey);
    noteInKey -= scale[modeIndex];
    modeIndex++;
  }
  compareFoundScaleWithNotes(foundScale, notes);
  // reverse the scale to reset
  scale.reverse();
}


// display defaults
getScale(currentKey, currentMode);
updateDisplay(currentMode);

var buttonHandlers = {
  clearButton: function() {
    for (i = 0; i < notes.length; i++) {
      notes[i].id = "-";
    }
    scaleName = "-"
    updateDisplay("-");
  },
  ionianButton: function() {
    scaleName = "Ionian";
    currentMode = ionian;
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  dorianButton: function() {
    scaleName = "Dorian";
    currentMode = dorian;
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  phrygianButton: function() {
    scaleName = "Phrygian";
    currentMode = phrygian;
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  lydianButton: function() {
    scaleName = "Lydian";
    currentMode = lydian;
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  mixoButton: function() {
    scaleName = "Mixolydian";
    currentMode = mixolydian;
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  aeolienButton: function() {
    scaleName = "Aeolien";
    currentMode = aeolien;
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  locrianButton: function() {
    scaleName = "Locrian";
    currentMode = locrian;
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  minPentButton: function() {
    scaleName = "Minor Pentatonic";
    currentMode = minPentatonic;
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfC: function() {
    currentKey = 8;
    currentKeyName = "C";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfDb: function() {
    currentKey = 9;
    currentKeyName = "Db";
    getScale(currentKey, currentMode)
    updateDisplay(currentMode);
  },
  keyOfD: function() {
    currentKey = 10;
    currentKeyName = "D";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfEb: function() {
    currentKey = 11;
    currentKeyName = "Eb";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfE: function() {
    currentKey = 0;
    currentKeyName = "E";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfF: function() {
    currentKey = 1;
    currentKeyName = "F";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfGb: function() {
    currentKey = 2;
    currentKeyName = "Gb";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfG: function() {
    currentKey = 3;
    currentKeyName = "G";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfAb: function() {
    currentKey = 4;
    currentKeyName = "Ab";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfA: function() {
    currentKey = 5;
    currentKeyName = "A";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfBb: function() {
    currentKey = 6;
    currentKeyName = "Bb";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  },
  keyOfB: function() {
    currentKey = 7;
    currentKeyName = "B";
    getScale(currentKey, currentMode);
    updateDisplay(currentMode);
  }
}

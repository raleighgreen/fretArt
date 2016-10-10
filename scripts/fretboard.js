/*-------------------------*/
// Build the `Note` objects
function Note(id, audioFile) {
  this.id = id;
  this.audioFile = audioFile;
}

var notes = [];

for (var i = 0; i <= 48; i++) {
  notes.push(new Note(i));
}
/*-------------------------*/
// Build the `string` objects
// flip the order of the strings
// to match guitar orientation.
function String(name, low, high) {
  this.name = name;
  this.low = low;
  this.high = high;
}

var strings = [
  new String("E", 24, 48),
  new String("B", 19, 43),
  new String("G", 15, 39),
  new String("D", 10, 34),
  new String("A", 5, 29),
  new String("E", 0, 24)
];
/*-------------------------*/
// Build the `Fret` object and push them into
// the `frets` array
function Fret(note, string) {
  this.note = note;
  this.string = string;
}

var frets = [];

for (var i = 0; i < strings.length; i++) {
  var currentString = strings[i];
  for (var n = currentString.low; n <= currentString.high; n++) {
    var note = notes[n];
    frets.push(new Fret(note, currentString));
  }
}
/*-------------------------*/
// make a variable fretboard and initalize as an
// empty string. Print the frets.note.id's into this
// fretboard by looping through the frets on each string
var fretboard = "";

for (var i = 0; i < strings.length; i++) {
  for (var f = 0; f < frets.length; f++) {
    if (frets[f].string == strings[i]) {
      fretboard += frets[f].note.id + " ";
    }
  }
  fretboard += "\n";
}
/*-------------------------------*/

function setup() {
  createCanvas(700, 500);
}

function play(){
}

function mousePressed() {
  // for (var i = 0; i < frets.length; i++) {
  //   frets[i].clicked();
  // }
}

function draw() {
  background(0);
  // for (var i = 0; i < frets.length; i++) {
    // turn frets[i].display(); back on to display
    // frets[i].display();
  // }
}

function getScale(key, scale) {
  // start at the beginning of the mode
  var modeIndex = 0;
  // set the first note to the starting key
  var scaleStartingNote = key;
  while (scaleStartingNote < notes.length - 1 + 12) {
    var currentNote = notes[scaleStartingNote];
    modeIndex++;
    if (modeIndex >= scale.length) {
      modeIndex = 0;
    }
    scaleStartingNote += scale[modeIndex];
    console.log(scaleStartingNote - 12);
  }
}
// 10 sets the scale to the key of C
var ionian = [2, 2, 1, 2, 2, 2, 1];

getScale(10, ionian);
console.log(fretboard);

// var buttonHandlers = {
//   clearButton: function() {
//     for (i = 0; i < frets.length; i++) {
//       frets[i].active = false;
//       frets[i].playColor = false;
//     }
//   },
//   ionianButton: function() {
//     for (i = 0; i < frets.length; i++) {
//       frets[i].active = false;
//       frets[i].playColor = false;
//     }
//     getScale(ionian);
//   },
//   dorianButton: function() {
//     for (i = 0; i < frets.length; i++) {
//       frets[i].active = false;
//       frets[i].playColor = false;
//     }
//     getScale(dorian);
//   },
//   phrygianButton: function() {
//     for (i = 0; i < frets.length; i++) {
//       frets[i].active = false;
//       frets[i].playColor = false;
//     }
//     getScale(phrygian);
//   },
//   lydianButton: function() {
//     for (i = 0; i < frets.length; i++) {
//       frets[i].active = false;
//       frets[i].playColor = false;
//     }
//     getScale(lydian);
//   },
//   mixoButton: function() {
//     for (i = 0; i < frets.length; i++) {
//       frets[i].active = false;
//       frets[i].playColor = false;
//     }
//     getScale(mixolydian);
//   },
//   aeolienButton: function() {
//     for (i = 0; i < frets.length; i++) {
//       frets[i].active = false;
//       frets[i].playColor = false;
//     }
//     getScale(aeolien);
//   },
//   locrianButton: function() {
//     for (i = 0; i < frets.length; i++) {
//       frets[i].active = false;
//       frets[i].playColor = false;
//     }
//     getScale(locrian);
//   },
//   minPentButton: function() {
//     for (i = 0; i < frets.length; i++) {
//       frets[i].active = false;
//       frets[i].playColor = false;
//     }
//     getScale(minPent);
//   }
// }

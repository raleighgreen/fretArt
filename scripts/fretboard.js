var frets = [];
var fretboards = [];
var guitarSpacing = 120;
var guitarGroupLeftMargin = 110;
var guitarGroupTopMargin = 70;
var fretWidth = 20;

function Fretboard(x, y) {
  this.x = x;
  this.y = y;
  this.frets = [];
}

function generateFretboards() {
  for (var guitar = 0; guitar < 3; guitar++) {
    var x = guitarGroupLeftMargin;
    var y = guitarGroupTopMargin + (guitarSpacing * guitar);
    fretboards.push(new Fretboard(x, y));
  }
}

function setup() {

  createCanvas(700, 500);
  generateFretboards();
  // generate the frets
  for (var guitar = 0; guitar < 3; guitar++) {
    var guitarCounter = guitar * guitarSpacing;
    // sets to 6 strings
    for (var guitStr = 0; guitStr < 6; guitStr++){
      // sets to 24 frets
      for (var i = 0; i < 25; i++) {

        var x = guitarGroupLeftMargin + (i * fretWidth);
        var y = guitarGroupTopMargin + (guitStr * 10) + (guitarCounter + 30);
        frets.push(new Fret(x, y, frets.length));
      }
    }
  }
  // getScale(s);
}

function play(){

}

function mousePressed() {
  for (var i = 0; i < frets.length; i++) {
    frets[i].clicked();
  }
}

function draw() {
  background(0);
  for (var i = 0; i < frets.length; i++) {
    frets[i].display();
  }
}
/*---------new code---------------*/
//the code below creates a scale map for one 24fret string in any key.

var allNotes = [];
var lowEstring = [];

function Note(id) {
  this.id = id;
}
// push Note objects into the allNotes array.
// the allNotes array contains 24 frets + 12.
for (var i = 0; i <= 36; i++) {
  allNotes.push(new Note(i));
}
// make the lowEstring array have 24 frets (Note)s
for (var i = 0; i < 24; i++) {
  lowEstring.push(new Note(i));
}
function getScale(key, scale) {
  // start at the beginning of the mode
  var modeIndex = 0;
  // set the first note to the starting key
  var keyboardIndex = key;
  while (keyboardIndex < allNotes.length) {
    var currentNote = allNotes[keyboardIndex];
    modeIndex++;

    if (modeIndex >= scale.length) {
      modeIndex = 0;
    }
    keyboardIndex += scale[modeIndex];
    if (currentNote.id > 11 && currentNote.id < 37) {
      lowEstring.id = currentNote.id - 12;
      console.log(lowEstring.id);
    }
  }
}

var ionian = [2, 2, 1, 2, 2, 2, 1];
getScale(6, ionian);

// changing the key
// calculating within a specific range of notes – piano or a guitar
// calculating where those notes appear on the fretboard


/*------end new code--------------*/
var buttonHandlers = {
  clearButton: function() {
    for (i = 0; i < frets.length; i++) {
      frets[i].active = false;
      frets[i].playColor = false;
    }
  },
  ionianButton: function() {
    for (i = 0; i < frets.length; i++) {
      frets[i].active = false;
      frets[i].playColor = false;
    }
    getScale(ionian);
  },
  dorianButton: function() {
    for (i = 0; i < frets.length; i++) {
      frets[i].active = false;
      frets[i].playColor = false;
    }
    getScale(dorian);
  },
  phrygianButton: function() {
    for (i = 0; i < frets.length; i++) {
      frets[i].active = false;
      frets[i].playColor = false;
    }
    getScale(phrygian);
  },
  lydianButton: function() {
    for (i = 0; i < frets.length; i++) {
      frets[i].active = false;
      frets[i].playColor = false;
    }
    getScale(lydian);
  },
  mixoButton: function() {
    for (i = 0; i < frets.length; i++) {
      frets[i].active = false;
      frets[i].playColor = false;
    }
    getScale(mixolydian);
  },
  aeolienButton: function() {
    for (i = 0; i < frets.length; i++) {
      frets[i].active = false;
      frets[i].playColor = false;
    }
    getScale(aeolien);
  },
  locrianButton: function() {
    for (i = 0; i < frets.length; i++) {
      frets[i].active = false;
      frets[i].playColor = false;
    }
    getScale(locrian);
  },
  minPentButton: function() {
    for (i = 0; i < frets.length; i++) {
      frets[i].active = false;
      frets[i].playColor = false;
    }
    getScale(minPent);
  }
}

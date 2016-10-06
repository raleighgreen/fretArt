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
//the code below creates a scale map for all six strings in any key.

var allNotes = [];

var highEstring = [];
var theBstring = [];
var theGstring = [];
var theDstring = [];
var theAstring = [];
var lowEstring = [];

function Note(id) {
  this.id = id;
}
// push Note objects into the allNotes array.
// Once pushed, the allNotes array contains 61 Note objects.
// They represent the entire 4 octave range of
// a 24 fret guitar (49 notes) plus 12 (for the discarded
// lower octave).
for (var i = 0; i <= 61; i++) {
  allNotes.push(new Note(i));
}
// I feel like the for() statements below should be put in a
//function and refactored to look something like:
// function buildStringArrays(stringName) {
//   for (var i = 0; i < 24; i++) {
//     stringName.push(new Note(i));
//   }
// }
// but I'm not sure how and where to
// call the buildAtringArrays() function, or if it's
// the right way refactor these in the first place.

for (var i = 0; i < 24; i++) {
  highEstring.push(new Note(i));
}
for (var i = 0; i < 24; i++) {
  theBstring.push(new Note(i));
}
for (var i = 0; i < 24; i++) {
  theGstring.push(new Note(i));
}
for (var i = 0; i < 24; i++) {
  theDstring.push(new Note(i));
}
for (var i = 0; i < 24; i++) {
  theAstring.push(new Note(i));
}
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
    // the if statements below map the currentNote.id from
    // the allNotes[] array into six new arrays, each
    // built from the appropriate range for the given string.

    // I feel like these should be refactored into a function
    // that might look like this:
    // function mapToStrings(stringName, lowRange, highRange) {
    //   if (currentNote.id > lowRange && currentNote.id < highRange) {
    //     stringName.id = currentNote.id - 12;
    //   }
    // }
    // where I'm stuck is siimilar to above - how and where
    // should I call the mapToStrings() function, and is this
    // the best way to refactor these in the first place?
    if (currentNote.id > 35 && currentNote.id < 61) {
      highEstring.id = currentNote.id - 12;
      // console.log(highEstring.id);
    }
    if (currentNote.id > 30 && currentNote.id < 56) {
      theBstring.id = currentNote.id - 12;
      // console.log(theBstring.id);
    }
    if (currentNote.id > 26 && currentNote.id < 52) {
      theGstring.id = currentNote.id - 12;
      // console.log(theGstring.id);
    }
    if (currentNote.id > 21 && currentNote.id < 47) {
      theDstring.id = currentNote.id - 12;
      // console.log(theDstring.id);
    }
    if (currentNote.id > 16 && currentNote.id < 42) {
      theAstring.id = currentNote.id - 12;
      // console.log(theAstring.id);
    }
    if (currentNote.id > 11 && currentNote.id < 37) {
      lowEstring.id = currentNote.id - 12;
      console.log(lowEstring.id);
    }
  }
}

var ionian = [2, 2, 1, 2, 2, 2, 1];
// 10 sets the scale to the key of C
getScale(10, ionian);

// COMPLETE: changing the key
// COMPLETE: calculating within a specific range of notes – piano or a guitar
// COMPLETE: calculating where those notes appear on the fretboard
// TO DO: connect the getScale() function,
// TO DO: add more scales
// TO DO: make the buttons work

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

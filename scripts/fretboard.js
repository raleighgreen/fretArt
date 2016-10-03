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

var notes = ["E1", "F1", "Gb1", "G1", "Ab1", "A1", "Bb1", "B1",
"C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2",
"C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
"C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4",
"C5", "Db5", "D5", "Eb5", "E5"];


var s = [];
var c = [8,20,26,38,55,67,85,97,103,115,133,145];
var db = [9,21,27,39,56,68,86,98,104,116,134,146];
var d = [10,22,28,40,57,69,75,87,99,105,117,135,147];
var eb = [11,23,29,41,58,70,76,88,106,118,136,148];
var e = [0,12,24,30,42,59,71,77,89,107,119,125,137,149];
var f = [1,13,31,43,60,72,78,90,108,120,126,138];
var gb = [2,14,32,44,61,73,79,91,109,121,127,139];
var g = [3,15,33,45,50,62,74,80,92,110,122,128,140];
var ab = [4,16,34,46,51,63,81,93,111,123,129,141];
var a = [5,17,35,47,52,64,82,94,100,112,124,130,142];
var bb = [6,18,36,48,53,65,83,95,101,113,131,143];
var b = [7,19,25,37,49,54,66,84,96,102,114,132,144];

var ionian = s.concat(c,d,e,f,g,a,b);
var dorian = s.concat(c,d,eb,f,g,a,bb);
var phrygian = s.concat(c,db,eb,f,g,ab,bb);
var lydian = s.concat(c,d,e,gb,g,a,b);
var mixolydian = s.concat(c,d,e,f,g,a,bb);
var aeolien = s.concat(c,d,eb,f,g,ab,bb);
var locrian = s.concat(c,db,eb,f,gb,ab,bb);
var minPent = s.concat(c,eb,f,g,bb);

// can extend this function to change starting note
function getScale(scale) {
  var currentNoteIndex = 0;
  for (var i = 0; i < scale.length; i++) {
    currentNoteIndex = currentNoteIndex + scale[i];
    var currentNote = notes[currentNoteIndex];
    frets[scale[i]].active = true;
    frets[scale[i] + 150].active = true;
    frets[scale[i] + 300].active = true;
  }
}

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

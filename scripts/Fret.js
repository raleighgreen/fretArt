function Fret(x, y, note, string) {
  this.x = x;
  this.y = y;
  this.activeId;
  this.note = note;
  this.string = string;
  this.active = false;
  this.playing = false;
  this.col = "";
  this.noteNameList;
  this.foundNoteName;
  this.noteOctave;
  this.noteName;
  this.noteDegreeList;
  this.degreeName;
  this.fretId;
  this.octave;
  this.vertex = false;
  this.col1 = 255;
  this.col2 = 255;
  this.col3 = 255;
}

// If a note is clicked, play sound and light up
Fret.prototype.clicked = function() {
  var d = dist(mouseX, mouseY, this.x, this.y);
  var audioNote = this.note.audioFile;
  // If in the bounds of the note...
  if (d < 7) {
    // Play the note's audioFile
    audioNote.play();
    // And light it up
    this.playing = true;
    var currentFret = this;
    // Turn light off after some time
    audioNote.onended(function() {
      currentFret.playing = false;
    });
    // console.log(this);
    // setTimeout(function() {
    //   passThisToTimeout.playing = false;
    // }, 2700);
  }
}

Fret.prototype.notePlaying = function() {
  var audioNote = this.note.audioFile;
  this.playing = true;
  var passThisToTimeout = this;
  // Turn light off after some time
  setTimeout(function() {
    passThisToTimeout.playing = false;
  }, 2700);
}

Fret.prototype.overNote = function() {
  var d = dist(mouseX, mouseY, this.x, this.y);
  var audioNote = this.note.audioFile;
  // If in the bounds of the note...
  if (d < 7 && this.active) {
    // Play the note's audioFile
    if (!audioNote.isPlaying()) {
      audioNote.play();
    }
    // And light it up
    this.playing = true;
    var passThisToTimeout = this;
    // Turn light off after some time
    setTimeout(function() {
      passThisToTimeout.playing = false;
    }, 2700);
  }
}
// Attach note names to frets
Fret.prototype.attachNotes = function() {
  // Split notes into octaves
  var octaveSplit = this.note.id % 12;
  // Populate notes with noteNames
  for (var i = 0; i < fretArt.noteNameList.length; i++) {
    if (octaveSplit == i) {
      this.noteName = fretArt.noteNameList[i];
    }
  }
}

// Display frets with color depending on status
Fret.prototype.displayWithColor = function() {
  // Set RGB colors for octaves 0 - 4
  var activeColor = [[74,39,88],[19,85,198],[106,128,104],[175,116,3],[176,29,29]];
  var playingColor = [[255,255,255],[255,255,255],[255,255,255],[255,255,255],[255,255,255]];
  var noteOffColor = color(256,256,256,0);
  // Set non-active frets to noteOffColor
  if (!this.active) {
    noStroke();
    this.col = noteOffColor;
  }
  // If note is active, set activeColor by octave
  if (this.active) {
    for (var i = 0; i <= 4; i++) {
      if (this.octave == i) {
        this.col = color(activeColor[i]);
      }
    }
  }
  // If note is playing, set playingColor by octave
  if (this.playing) {
    for (var i = 0; i <= 4; i++) {
      if (this.octave == 0) {
        var endCol1 = 74;
        var endCol2 = 39;
        var endCol3 = 88;
        this.col1 = lerp(this.col1, endCol1, .009);
        this.col2 = lerp(this.col2, endCol2, .009);
        this.col3 = lerp(this.col3, endCol3, .009);
        this.col = color(this.col1,this.col2,this.col3);
      } else if (this.octave == 1) {
        var endCol4 = 19;
        var endCol5 = 85;
        var endCol6 = 198;
        this.col1 = lerp(this.col1, endCol4, .009);
        this.col2 = lerp(this.col2, endCol5, .009);
        this.col3 = lerp(this.col3, endCol6, .009);
        this.col = color(this.col1,this.col2,this.col3);
      } else if (this.octave == 2) {
        var endCol7 = 106;
        var endCol8 = 128;
        var endCol9 = 104;
        this.col1 = lerp(this.col1, endCol7, .009);
        this.col2 = lerp(this.col2, endCol8, .009);
        this.col3 = lerp(this.col3, endCol9, .009);
        this.col = color(this.col1,this.col2,this.col3);
      } else if (this.octave == 3) {
        var endCol10 = 175;
        var endCol11 = 116;
        var endCol12 = 3;
        this.col1 = lerp(this.col1, endCol10, .009);
        this.col2 = lerp(this.col2, endCol11, .009);
        this.col3 = lerp(this.col3, endCol12, .009);
        this.col = color(this.col1,this.col2,this.col3);
      } else if (this.octave == 4) {
        var endCol13 = 176;
        var endCol14 = 29;
        var endCol15 = 29;
        this.col1 = lerp(this.col1, endCol13, .009);
        this.col2 = lerp(this.col2, endCol14, .009);
        this.col3 = lerp(this.col3, endCol15, .009);
        this.col = color(this.col1,this.col2,this.col3);
      }
    }
  }
  // Draw the dots
  fill(this.col);
  ellipse(this.x, this.y, 9.5, 9.5);
}

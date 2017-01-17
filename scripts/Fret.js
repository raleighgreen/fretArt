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
  this.alpha = 255;
  this.endCol1;
  this.endCol2;
  this.endCol3;
  this.endAlpha;
}

// If a note is clicked, play sound and light up
Fret.prototype.clicked = function() {
  var d = dist(mouseX, mouseY, this.x, this.y);
  this.note.audioFile.loop = false;
  var audioNote = this.note.audioFile;
  // If in the bounds of the note...
  if (d < 9) {
    // Play the note's audioFile
    audioNote.play();
    // And light it up
    this.playing = true;
    var passThisToTimeout = this;
    setTimeout(function() {
      passThisToTimeout.playing = false;
    }, 2700);
    this.col1 = 255;
    this.col2 = 255;
    this.col3 = 255;
    this.alpha = 255;
  }
}

Fret.prototype.notePlaying = function() {
  this.playing = true;
  var passThisToTimeout = this;
  // Turn light off after some time
  if (this.playing) {
    setTimeout(function() {
      passThisToTimeout.playing = false;
    }, 2700);
    this.col1 = 255;
    this.col2 = 255;
    this.col3 = 255;
    this.alpha = 255;
  }
}

Fret.prototype.overNote = function() {
  var d = dist(mouseX, mouseY, this.x, this.y);
  var audioNote = this.note.audioFile;
  // If in the bounds of the note...
  if (d < 9 && this.active) {
    // Play the note's audioFile
    if (!audioNote.isPlaying()) {
      audioNote.play();
    }
    this.playing = true;
    // And light it up
    var passThisToTimeout = this;
    // Turn light off after some time
    setTimeout(function() {
      passThisToTimeout.playing = false;
    }, 2700);
    this.col1 = 255;
    this.col2 = 255;
    this.col3 = 255;
    this.alpha = 255;
  }
}

// Attach note names to frets
Fret.prototype.attachNoteNames = function() {
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
  var activeColor = [[74,39,88,255],[19,85,198,255],[106,128,104,255],[175,116,3,255],[176,29,29,255]];
  var noteOffColor = color(0,0,0,0);
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
    fill(this.col);
    ellipse(this.x, this.y, 9, 9);
  }
  // If note is playing, set playingColor by octave
  if (this.playing) {
    for (var i = 0; i <= 4; i++) {
      if (this.octave == i){
          this.endCol1 = activeColor[i][0];
          this.endCol2 = activeColor[i][1];
          this.endCol3 = activeColor[i][2];
          this.endAlpha = 0;
          var passThis = this;
          setTimeout(function(){
            passThis.col1 = lerp(passThis.col1, passThis.endCol1, .05);
            passThis.col2 = lerp(passThis.col2, passThis.endCol2, .05);
            passThis.col3 = lerp(passThis.col3, passThis.endCol3, .05);
          },200);
          setTimeout(function() {
            passThis.alpha = lerp(passThis.alpha, passThis.endAlpha, .05);
          }, 1500);
          this.col = color(this.col1, this.col2, this.col3, this.alpha);
      }
    }
    fill(this.col);
    ellipse(this.x, this.y, 9.5, 9.5);
  }
}

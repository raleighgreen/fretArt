function Fret(x, y, note, string) {
  this.x = x;
  this.y = y;
  this.note = note;
  this.string = string;
  this.active = false;
  this.playing = false;
  this.col = "";
  this.noteNameList;
  this.noteName;
  this.octave = 0;
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
    var passThisToTimeout = this;
    // Turn light off after some time
    // console.log(this);

    setTimeout(function() {
      passThisToTimeout.playing = false;
    }, 2700);
  }
}

Fret.prototype.displayWithColor = function() {
  // var firstOctaveColor = color(74,39,88);
  // var secondOctaveColor = color(19,85,198);
  // var thirdOctaveColor = color(106,128,104);
  // var fourthOctaveColor = color(175,116,3);
  // var fifthOctaveColor = color(176,29,29);
  // var firstOctClickedColor = color(174,97,252);
  // var secondOctClickedColor = color(135,197,255);
  // var thirdOctClickedColor = color(154,212,130);
  // var fourthOctClickedColor = color(255,209,130);
  // var fifthOctClickedColor = color(255,84,84);
  var noteOffColor = color(29,28,29);

  var octave = this.note.id % 12;
  for (i = 0; i < noteNameList.length; i++) {
    if (octave == i) {
      this.noteName = noteNameList[i];
    }
  }
  if (!this.active) {
    this.col = noteOffColor;
  }

  fill(this.col);
  ellipse(this.x, this.y, 9, 9);
}

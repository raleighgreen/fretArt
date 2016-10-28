function Fret(x, y, note, string) {
  this.x = x;
  this.y = y;
  this.note = note;
  this.string = string;
  this.active = false;
  this.playing = false;
  this.col = "";
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
    setTimeout(function() {
      passThisToTimeout.playing = false;
      console.log("done");
    }, 2700);
  }
}

Fret.prototype.displayWithColor = function() {
  var firstOctaveOnColor = color(74,39,88);
  var secondOctaveOnColor = color(19,85,198);
  var thirdOctaveOnColor = color(106,128,104);
  var fourthOctaveOnColor = color(175,116,3);
  var fifthOctaveOnColor = color(176,29,29);

  var firstOctClickedColor = color(174,97,252);
  var secondOctClickedColor = color(135,197,255);
  var thirdOctClickedColor = color(154,212,130);
  var fourthOctClickedColor = color(255,209,130);
  var fifthOctClickedColor = color(255,84,84);

  var noteOffColor = color(29,28,29);

  if (this.active) {
    if (this.note.id <= 12) {
      this.col = firstOctaveOnColor;
    } else if (this.note.id > 12 && this.note.id <= 24) {
      this.col = secondOctaveOnColor;
    } else if (this.note.id > 24 && this.note.id <= 36) {
      this.col = thirdOctaveOnColor;
    } else if (this.note.id > 36 && this.note.id <= 47) {
      this.col = fourthOctaveOnColor;
    } else if (this.note.id == 48) {
      this.col = fifthOctaveOnColor;
    }
  } else {
    this.col = noteOffColor;
  }

  if (this.playing) {
    if (this.note.id <= 12) {
      this.col = firstOctClickedColor;
    } else if (this.note.id > 12 && this.note.id <= 24) {
      this.col = secondOctClickedColor;
    } else if (this.note.id > 24 && this.note.id <= 36) {
      this.col = thirdOctClickedColor;
    } else if (this.note.id > 36 && this.note.id <= 47) {
      this.col = fourthOctClickedColor;
    } else if (this.note.id == 48) {
      this.col = fifthOctClickedColor;
    }
  }

  fill(this.col);
  ellipse(this.x, this.y, 9, 9);
}

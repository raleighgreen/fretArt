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

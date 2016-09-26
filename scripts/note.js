


function Fret(x, y, number) {
  var noteOnColor = color(93,81,214);
  var noteOffColor = color(30,28,52);
  var notePlayColor = color(207,221,50);

  this.x = x;
  this.y = y;
  this.active = false;
  this.playColor = false;
  this.col = noteOnColor;
  this.fretArrayNumber = number + 1;
  this.audioNote = document.getElementById("_1");
  // this.audio = document.getElementById("_1");

  this.display = function() {
    if (this.active) {
      this.col = noteOnColor;
    } else if (this.playColor) {
      this.col = notePlayColor;
    } else {
      this.col = noteOffColor;
    }
    fill(this.col);
    ellipse(this.x, this.y, 7, 7);
  };

  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    var note = this.fretArrayNumber;
    if (d < 5 ) {
      var fretNum = this.fretArrayNumber - 1;
      var audio = frets[fretNum].audioNote;
      if (this.active === true){
        this.active = false;
        this.playColor = true;
        setTimeout(function() {
          frets[fretNum].active = true;
        }, 2700);
      } else {
        this.playColor = true;
        setTimeout(function() {
          frets[fretNum].playColor = false;
        }, 2700);
      }
      this.audioNote.src = "audio/" + frets[fretNum].fretArrayNumber + ".mp3";
      audio.play();
      // switch (frets[fretNum].fretArrayNumber) {
      //   case 131:
      //   case 101:
      //     frets[fretNum].audioNote = 6;
      //     console.log(frets[fretNum].audioNote);
      //     return
      //     break;
      //   }
      // }

      // console.log(frets.fretArrayNumber);
    }
  };
}

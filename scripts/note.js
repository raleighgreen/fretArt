


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
    if (d < 5 ) {
      var fretNum = this.fretArrayNumber - 1;
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
      var audio = document.getElementById("E1");
      audio.play();
    }
  };
}

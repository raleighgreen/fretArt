function Fret(x, y, number) {
  this.x = x;
  this.y = y;
  this.active = false;
  this.col = color(93,81,214);
  this.fretArrayNumber = number + 1;

  this.display = function() {
    if (this.active) {
      this.col = color(68,238,203);
    } else {
      this.col = color(93,81,214);
    }
    fill(this.col);
    ellipse(this.x, this.y, 7, 7);
  };

  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);

    if (d < 5) {
      this.active = !this.active;

      var audio = document.getElementById("E1");
      audio.play();
      console.log(this.fretArrayNumber);
    }
  };
}

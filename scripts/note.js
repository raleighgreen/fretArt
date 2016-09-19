function Fret(x, y) {
  this.x = x;
  this.y = y;
  this.active = false;
  this.col = color(93,81,214);

  this.display = function() {
    stroke(255);
    if (this.active) {
      this.col = color(68,238,203);
    } else {
      this.col = color(93,81,214);
    }
    fill(this.col);
    ellipse(this.x, this.y, 17, 17);
  };

  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    var audio = document.getElementById("_1_E1.mp3");
    if (d < 10) {
      this.active = !this.active;
      audio.play();
      console.log(this)
    }
  };
}

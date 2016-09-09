function Fret(x, y) {
  this.x = x;
  this.y = y;
  this.col = color(93,81,214);

  this.display = function() {
    stroke(255);
    fill(this.col);
    ellipse(this.x, this.y, 17, 17);
  }

  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 10) {
      this.col = color(68,238,203);
    }
  }
}

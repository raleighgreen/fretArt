var notes = [];

function setup() {
  createCanvas(600, 400);
  for (var i = 0; i < 24; i++) {
    notes[i] = {
      x: 70 + (i * 19),
      y: 80,
      display: function() {
        stroke(255);
        noFill();
        ellipse(this.x, this.y, 17, 17);
      }
    }
  }
  println(notes);
}

function draw() {
  background(0);
  for (var i = 0; 8 < notes.length; i++) {
    notes[i].display();
  }
}

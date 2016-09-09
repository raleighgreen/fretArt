function setup() {
  createCanvas(640, 480);
  strokeWeight(1);
  stroke(255);
  for (var y = 0; y < 120; y = y + 20){
    for (var x = 0; x < 470; x = x + 20){
      fill(random(255));
      rect(x,y,15,20);
    }
  }
}

function draw() {
  ellipse(mouseX,mouseY,10,10);
}

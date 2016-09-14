/*
6.7 p5.js clicking on objects
Code for video https://vimeo.com/channels/learningp5js/141919520
*/

var frets = [];

function setup() {
  createCanvas(600, 400);
  for (var guitStr = 0; guitStr < 6; guitStr++){
    for (var i = 0; i < 24; i++) {
      var x = 80 + (i * 19);
      var y = (guitStr * 19) + 70;
      frets.push(new Fret(x, y));
    }
  }
}

function mousePressed() {
  for (var i = 0; i < frets.length; i++) {
    frets[i].clicked();
  }
}

function draw() {
  background(0);
  for (var i = 0; i < frets.length; i++) {
    frets[i].display();
  }
}

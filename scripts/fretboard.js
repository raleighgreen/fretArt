/*
6.7 p5.js clicking on objects
Code for video https://vimeo.com/channels/learningp5js/141919520
*/

var frets = [];


function setup() {

  createCanvas(700, 500);
  for (var guitar = 0; guitar < 3; guitar++) {

    var guitarSpacing = 100;
    var guitarCounter = guitar * guitarSpacing;
    // sets to 6 strings
    for (var guitStr = 0; guitStr < 6; guitStr++){
      // sets to 24 frets
      for (var i = 0; i < 25; i++) {
        var fretWidth = 20;
        var x = 80 + (i * fretWidth);
        var y = (guitStr * 10) + (guitarCounter + 30);
        frets.push(new Fret(x, y, frets.length));
      }
    }
  }
}

function play(){

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

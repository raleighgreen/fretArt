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

var buttons = {
  majScaleButton: function() {
    var g2 = 150;
    var g3 = 300;

    frets[0].active = true; frets[1].active = true; frets[3].active = true; frets[5].active = true; frets[7].active = true; frets[8].active = true; frets[10].active = true; frets[12].active = true; frets[13].active = true; frets[15].active = true; frets[17].active = true; frets[19].active = true; frets[20].active = true;frets[22].active = true;frets[24].active = true;
    frets[0 + g2].active = true; frets[1 + g2].active = true; frets[3 + g2].active = true; frets[5 + g2].active = true; frets[7 + g2].active = true; frets[8 + g2].active = true; frets[10 + g2].active = true; frets[12 + g2].active = true; frets[13 + g2].active = true; frets[15 + g2].active = true; frets[17 + g2].active = true; frets[19 + g2].active = true; frets[20 + g2].active = true;frets[22 + g2].active = true;frets[24 + g2].active = true;
    frets[0 + g3].active = true; frets[1 + g3].active = true; frets[3 + g3].active = true; frets[5 + g3].active = true; frets[7 + g3].active = true; frets[8 + g3].active = true; frets[10 + g3].active = true; frets[12 + g3].active = true; frets[13 + g3].active = true; frets[15 + g3].active = true; frets[17 + g3].active = true; frets[19 + g3].active = true; frets[20 + g3].active = true; frets[22 + g3].active = true; frets[24 + g3].active = true;


  },
  clearButton: function() {
    for (i = 0; i < frets.length; i++) {
      frets[i].active = false;
    }
  }
}

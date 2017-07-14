//----------------------------------------------------------
//---------- P5 PRELOAD, SETUP AND DRAW FUNCTIONS ----------

function preload() {
  for (var i = 0; i < 49; i++) {
    fretArt.notes[i].audioFile = loadSound("audio/" + (i + 1) + ".mp3");
  }
}

function setup() {
  fretArt.p5Canvas = createCanvas(882, 370);
  centerCanvas();

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // redirect mobile users to fretShapes mobile page
    window.location="http://fretshapes.com/fretShapesMobilePage/";
  }

  infoButtonScreen.style.display='none'
//---------- Setup scale dropdown elements and defaults ----

  fretArt.selectedModeNameHolder = document.querySelectorAll('.scaNam');
  // set keyNameHolder[8]'s 'data-selected'.value = "keySelected"
  fretArt.selectedModeNameHolder[0].getAttributeNode("data-selected").value = "modeSelected";
  fretArt.selectedModeNameHolder[0].classList.add('target');

//---------- Setup key dropdown elements and defaults ------

  fretArt.selectedKeyNameHolder = document.querySelectorAll('.keyNam');
  // set keyNameHolder[8]'s 'data-selected'.value = "keySelected"
  fretArt.selectedKeyNameHolder[8].getAttributeNode("data-selected").value = "keySelected";
  fretArt.selectedKeyNameHolder[8].classList.add('target');

//----------------------------------------------------------
//----------------------------------------------------------

  // buildShapes();

  processInput();

  fretArt.fretsIsShowing = true;
  fretArt.stringsIsShowing = true;
  fretArt.linesVisible = true;
  fretArt.scaleButtonStatus = true;
  fretArt.infoButtonStatus = false;

  turnOnButtonStyle(document.getElementById("hide-scale"));
  turnOffButtonStyle(document.getElementById("hide-scale"));
  turnOnButtonStyle(document.getElementById("show-shapes"));
  turnOnButtonStyle(document.getElementById("hide-shapes"));
  turnOnButtonStyle(document.getElementById("stop-button"));
  turnOnButtonStyle(document.getElementById("show-scale"));
  turnOffButtonStyle(document.getElementById("hide-shapes"));
  for (var f = 0; f < fretArt.frets.length; f++) {
    if (fretArt.frets[f].active = true) {
      setScale(fretArt.currentKey, fretArt.currentMode.pattern);
    }
  }
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
}
// Required P5 function loops
function draw() {
  background(0);

  // If app screen is in view, display the guitar body background
  if(fretArt.guitarBodyDisplay) {
    buildGuitarBody();
  }
  // fade welcome screen in
  fadeFromBlack();
  // Turn on lines when Show lines button is clicked
  if (fretArt.linesVisible) {
    drawLines();
  }
  // Turn on C Pedal Tone when Play button is clicked
  if (fretArt.pedalTonePlay == true) {
    playPedalTone();
  }
  // Start shapes
  push();
  // Make two black rectangles to mask fretboard overflow
  fill(0);
  rect(0, 120,247, 130);
  fill(fretArt.guitarBodyColor);
  // headstock fade
  rect(178, 109,70,133);
  fill(0);
  ellipse(240, 110, 80, 28);
  ellipse(240, 240, 80, 28);
  fill(fretArt.guitarBodyColor);
  rect(847, 123,70, 110);
  // Make a fretboard outline
  noFill();
  strokeWeight(2);
  stroke(0,100,255);
  rect(247,125,600,100);
  // Set the fret stroke weight
  strokeWeight(2);
  stroke(0,100,255,95);
  // If frets button is clicked on, draw the frets
  if (fretArt.fretsIsShowing == true) {
    var add25 = 271;
    for (var i = 0; i < 23; i++) {
      // Draw lines for 24 frets
      line(add25, 125, add25, 225);
      // Fret spacing
      add25 += 25;
    }
  }
  // If strings button is clicked on, draw the strings
  if (fretArt.stringsIsShowing == true) {
    // String color/opacity
    stroke(150,150,150,100);
    var stringThickness = .5;
    var add20 = 125;
    for (var i = 0; i < 6; i++) {
      // String thickness
      strokeWeight(.6 + stringThickness);
      // Draw lines for 6 strings
      line(180, add20, 895, add20);
      // Add 20px of spacing between each string
      add20 += 20;
      // Make each string .4 thicker than the last
      stringThickness += .4;
    }
  }
  // Frame key/scale name display with lines above and below
  strokeWeight(1.5);
  stroke(0,100,255, 100);
  rect(256, 275, 385, 48, 7);
  pop();
  // End shapes
  // Trigger note light and sound on note mouseOver
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].overNote();
  }
  // Make notes (and octaves) visible with color
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].attachNoteNames();
    fretArt.frets[i].displayWithColor();
  }
}

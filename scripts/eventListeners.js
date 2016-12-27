//------ SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION ------

// Grab the select fields and buttons from the HTML document
var keyValueField = document.getElementById("key-value");
var scaleValueField = document.getElementById("scale-value");
var showScales = document.getElementById("show-scale");
var hideScales = document.getElementById("hide-scale");
var showShapes = document.getElementById("show-shapes");
var hideShapes = document.getElementById("hide-shapes");
var PedalTonePlay = document.getElementById("play-button");
var PedalToneStop = document.getElementById("stop-button");
var fretButton = document.getElementById("fret-button");
var stringButton = document.getElementById("string-button");

fretButton.addEventListener("click", function() {
  toggleFretButton(fretButton);
});

stringButton.addEventListener("click", function() {
  toggleStringButton(stringButton);
});

scaleValueField.addEventListener("change", function(){
  processInput();
  keyAndCurrentScaleDisplay()
  for (var f = 0; f < fretArt.frets.length; f++) {
    if (fretArt.frets[f].active) {
      setScale(fretArt.currentKey, fretArt.currentMode.pattern);
    }
  }
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

keyValueField.addEventListener("change", function(){
  processInput();
  // When new key is chosen, update pedal tone key text with the currentKey
  pedalToneKeyDisplay();
  keyAndCurrentScaleDisplay();
  for (var f = 0; f < fretArt.frets.length; f++) {
    if (fretArt.frets[f].active) {
      setScale(fretArt.currentKey, fretArt.currentMode.pattern);
    }
  }
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].playing = false;
  }
  if (PedalTonePlay) {
    for (var i = 0; i < fretArt.frets.length; i++) {
      if (fretArt.currentKeyName == fretArt.frets[i].noteName && fretArt.frets[i].string.name == "lowE") {
        fretArt.frets[i].playing = true;
        break;
      }
    }
  }
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

// When the show button is clicked, do the following...
showScales.addEventListener("click", function(){
  processInput();
  turnOnButtonStyle(document.getElementById("show-scale"));
  turnOffButtonStyle(document.getElementById("hide-scale"));
  for (var f = 0; f < fretArt.frets.length; f++) {
    if (fretArt.frets[f].active = true) {
      setScale(fretArt.currentKey, fretArt.currentMode.pattern);
    }
  }
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

// Clear fretboard and updateDisplay
hideScales.addEventListener("click", function() {
  turnOffButtonStyle(document.getElementById("show-scale"));
  turnOnButtonStyle(document.getElementById("hide-scale"));
  clearFretSelection();
});

showShapes.addEventListener("click", function() {
  turnOnButtonStyle(document.getElementById("show-shapes"));
  turnOffButtonStyle(document.getElementById("hide-shapes"));
  fretArt.linesVisible = true;
  processInput();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

hideShapes.addEventListener("click", function() {
  turnOffButtonStyle(document.getElementById("show-shapes"));
  turnOnButtonStyle(document.getElementById("hide-shapes"));
  fretArt.linesVisible = false;
});

PedalTonePlay.addEventListener("click", function() {
  turnOnButtonStyle(document.getElementById("play-button"));
  turnOffButtonStyle(document.getElementById("stop-button"));
  for (var i = 0; i < fretArt.frets.length; i++) {
    if (fretArt.currentKeyName == fretArt.frets[i].noteName && fretArt.frets[i].string.name == "lowE") {
      fretArt.frets[i].playing = true;
      break;
    }
  }
  PedalTonePlay = true;
});

PedalToneStop.addEventListener("click", function() {
  turnOffButtonStyle(document.getElementById("play-button"));
  turnOnButtonStyle(document.getElementById("stop-button"));
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].playing = false;
  }
  PedalTonePlay = false;
});

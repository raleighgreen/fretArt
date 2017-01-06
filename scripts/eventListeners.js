//------ SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION ------

// Grab the select fields and buttons from the HTML document
var keyValueField = document.getElementById("key-value");
var scaleValueField = document.getElementById("scale-value");
var showScales = document.getElementById("show-scale");
var hideScales = document.getElementById("hide-scale");
var showShapes = document.getElementById("show-shapes");
var hideShapes = document.getElementById("hide-shapes");
var pedalTonePlay = document.getElementById("play-button");
var PedalToneStop = document.getElementById("stop-button");
var fretButton = document.getElementById("fret-button");
var stringButton = document.getElementById("string-button");
var arrowUp = document.getElementById("arrow-up");
var arrowDown = document.getElementById("arrow-down");
var arrowLeft = document.getElementById("arrow-left");
var arrowRight = document.getElementById("arrow-right");

arrowUp.style.opacity = .5;
arrowDown.style.opacity = .5;
arrowLeft.style.opacity = .5;
arrowRight.style.opacity = .5;

arrowUp.addEventListener("mouseover", function() {
  arrowUp.style.transition = "opacity .1s";
  arrowUp.style.opacity = 1;
});
var scaleCounter = 0;
arrowUp.addEventListener("click", function() {
  var scaleIndex = document.getElementById("scale-value");
  // the scaleCounter 20 below needs to be hardcoded (its the id of the last
  // option in #scale-value).
  if (scaleIndex.selectedIndex == 0){
    scaleCounter = 20;
    document.getElementById(scaleCounter).selected = true;
  } else {
    scaleCounter -= 1;
    document.getElementById(scaleCounter).selected = true;
  }
  keyScaleShapeProcessor();
});
arrowUp.addEventListener("mouseout", function() {
  arrowUp.style.transition = "opacity .1s";
  arrowUp.style.opacity = .5;
});

arrowDown.addEventListener("mouseover", function() {
  arrowDown.style.transition = "opacity .1s";
  arrowDown.style.opacity = 1;
});
arrowDown.addEventListener("click", function() {
  var scaleIndex = document.getElementById("scale-value");
  // the number 22 below needs to be hardcoded (its the nuber of id'd options in
  // #scale-value plus the number of disabled options).
  if (scaleIndex.selectedIndex < 22){
    scaleCounter += 1;
    document.getElementById(scaleCounter).selected = true;
  } else {
    scaleCounter = 0;
    document.getElementById(scaleCounter).selected = true;
  }
  keyScaleShapeProcessor();
});
arrowDown.addEventListener("mouseout", function() {
  arrowDown.style.transition = "opacity .1s";
  arrowDown.style.opacity = .5;
});

arrowLeft.addEventListener("mouseover", function() {
  arrowLeft.style.transition = "opacity .1s";
  arrowLeft.style.opacity = 1;
});
arrowLeft.addEventListener("click", function() {
  var keyIndex = document.getElementById("key-value");
  if (fretArt.currentKey > 0){
    keyIndex.selectedIndex -= 1;
    fretArt.currentKey -= 1;
  } else {
    keyIndex.selectedIndex = 11;
  }
  // When new key is chosen, update pedal tone key text with the currentKey
  pedalToneKeyDisplay();
  if (pedalTonePlay) {
    for (var i = 0; i < fretArt.frets.length; i++) {
      if (fretArt.currentKeyName == fretArt.frets[i].noteName && fretArt.frets[i].string.name == "lowE") {
        fretArt.frets[i].playing = true;
        break;
      }
    }
  }
  keyScaleShapeProcessor();
});
arrowLeft.addEventListener("mouseout", function() {
  arrowLeft.style.transition = "opacity .1s";
  arrowLeft.style.opacity = .5;
});

arrowRight.addEventListener("mouseover", function() {
  arrowRight.style.transition = "opacity .1s";
  arrowRight.style.opacity = 1;
});
arrowRight.addEventListener("click", function() {
  var keyIndex = document.getElementById("key-value");
  if (fretArt.currentKey <= 10){
    keyIndex.selectedIndex += 1;
    fretArt.currentKey += 1;
  } else if (fretArt.currentKey = 10) {
    keyIndex.selectedIndex = 0;
  }
  // When new key is chosen, update pedal tone key text with the currentKey
  pedalToneKeyDisplay();
  if (pedalTonePlay) {
    for (var i = 0; i < fretArt.frets.length; i++) {
      if (fretArt.currentKeyName == fretArt.frets[i].noteName && fretArt.frets[i].string.name == "lowE") {
        fretArt.frets[i].playing = true;
        break;
      }
    }
  }
  keyScaleShapeProcessor();
});
arrowRight.addEventListener("mouseout", function() {
  arrowRight.style.transition = "opacity .1s";
  arrowRight.style.opacity = .5;
});

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
  if (pedalTonePlay) {
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

pedalTonePlay.addEventListener("click", function() {
  turnOnButtonStyle(document.getElementById("play-button"));
  turnOffButtonStyle(document.getElementById("stop-button"));
  pedalTonePlay = true;
});

PedalToneStop.addEventListener("click", function() {
  turnOffButtonStyle(document.getElementById("play-button"));
  turnOnButtonStyle(document.getElementById("stop-button"));
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].playing = false;
  }
  pedalTonePlay = false;
});

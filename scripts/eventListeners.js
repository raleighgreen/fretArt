//------ SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION ------

// Grab the select fields and buttons from the HTML document
var keyValueField = document.getElementById("key-value");
var keyField = document.getElementById("keyDiv");
var scaleField = document.getElementById("scalesDiv");
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

scaleField.addEventListener("click", function(e){
  console.log("this is the key field!");
  console.log(e.target);
  var selectedModeName = document.getElementById("scalesDiv");
  // Reset all fretArt.keyNameHolder Nodes to "not"

  for (var i = 0; i < fretArt.selectedModeNameHolder.length; i++) {
   fretArt.selectedModeNameHolder[i].getAttributeNode("data-selected").value = "notSelected";
  }

  // make the "data-selected" attribute of the selected Node ="keySelected"

  e.target.getAttributeNode("data-selected").value = "modeSelected";
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
keyField.addEventListener("click", function(){
  console.log("hello there again!");
});

arrowUp.addEventListener("mouseover", function() {
  arrowUp.style.transition = "opacity .1s";
  arrowUp.style.opacity = 1;
});

arrowUp.addEventListener("click", function() {
  // fretArt.scaleIndex = document.getElementById("scale-value");
  for (var i = 0; i < fretArt.selectedModeNameHolder.length; i++) {
     if (fretArt.selectedModeNameHolder[i].getAttributeNode("data-selected").value === "modeSelected") {
       // Grab the key value from the key select field and place it in fretArt.currentKey
       fretArt.scaleIndex = fretArt.selectedModeNameHolder[i].id;
      console.log(fretArt.scaleIndex);
     }
   }

  // the scaleCounter 20 below needs to be hardcoded (its the id of the last
  // option in #scale-value).

  if (fretArt.scaleIndex == 0){
    fretArt.selectedModeNameHolder[0].getAttributeNode("data-selected").value = "notSelected";
    console.log('yep');
    fretArt.scaleCounter = 20;
    fretArt.selectedModeNameHolder[fretArt.scaleCounter].getAttributeNode("data-selected").value = "modeSelected"
    // document.getElementById(scaleCounter).selected = true;
  } else {
    console.log('nope');
    for (var i = 0; i < fretArt.selectedModeNameHolder.length; i++) {
      fretArt.selectedModeNameHolder[i].getAttributeNode("data-selected").value = "notSelected";
    }
    fretArt.scaleCounter -= 1;
    fretArt.selectedModeNameHolder[fretArt.scaleCounter].getAttributeNode("data-selected").value = "modeSelected"
  }
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
arrowUp.addEventListener("mouseout", function() {
  arrowUp.style.transition = "opacity .1s";
  arrowUp.style.opacity = .5;
});

arrowDown.addEventListener("mouseover", function() {
  arrowDown.style.transition = "opacity .1s";
  arrowDown.style.opacity = 1;
});
arrowDown.addEventListener("click", function() {
  fretArt.scaleIndex = document.getElementById("scale-value");
  // the number 22 below needs to be hardcoded (its the nuber of id'd options in
  // #scale-value plus the number of disabled options).
  if (fretArt.scaleIndex.selectedIndex < 22){
    fretArt.scaleCounter += 1;
    document.getElementById(fretArt.scaleCounter).selected = true;
  } else {
    fretArt.scaleCounter = 0;
    document.getElementById(fretArt.scaleCounter).selected = true;
  }
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

// When the show button is clicked, do the following...
showScales.addEventListener("click", function(){

  turnOnButtonStyle(document.getElementById("show-scale"));
  turnOffButtonStyle(document.getElementById("hide-scale"));
  fretArt.invisible = false;
});

// Clear fretboard and updateDisplay
hideScales.addEventListener("click", function() {
  turnOffButtonStyle(document.getElementById("show-scale"));
  turnOnButtonStyle(document.getElementById("hide-scale"));
  fretArt.invisible = true;
  // clearFretSelection();
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

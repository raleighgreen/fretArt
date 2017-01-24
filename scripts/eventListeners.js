//------ SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION ------

// Grab the select fields and buttons from the HTML document
// Try to delete this old one?

// keyField dropdown div working new version
var keyField = document.getElementById("keyDiv");

// scaleField dropdown div
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
  // Reset all fretArt.keyNameHolder Nodes to "not"
  for (var i = 0; i < fretArt.selectedModeNameHolder.length; i++) {
   fretArt.selectedModeNameHolder[i].getAttributeNode("data-selected").value = "notSelected";
   // remove 'target' class from all nodes from scalesDiv
   fretArt.selectedModeNameHolder[i].classList.remove('target');
  }
  // make the "data-selected" attribute of the selected Node ="keySelected"
  e.target.getAttributeNode("data-selected").value = "modeSelected";
  // add a 'target' class to the selected element
  e.target.classList.add('target');

  processInput();
  keyAndCurrentScaleDisplay()
  ifActiveSetScale();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

keyField.addEventListener("click", function(e){
  // Reset all fretArt.keyNameHolder Nodes to "not"
  for (var i = 0; i < fretArt.selectedKeyNameHolder.length; i++) {
   fretArt.selectedKeyNameHolder[i].getAttributeNode("data-selected").value = "notSelected";
   // remove 'target' class from all nodes from scalesDiv
   fretArt.selectedKeyNameHolder[i].classList.remove('target');
  }
  // make the "data-selected" attribute of the selected Node ="keySelected"
  e.target.getAttributeNode("data-selected").value = "keySelected";
  // add a 'target' class to the selected element
  e.target.classList.add('target');

  processInput();
  keyAndCurrentScaleDisplay()
  ifActiveSetScale()
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

//----------------------------------------------------------
//---------- Arrow Button Up -------------------------------

arrowUp.addEventListener("mouseover", function() {
  lightUpArrowAndStayLit();
});

arrowUp.addEventListener("mouseout", function() {
  dimUpArrow();
});

arrowUp.addEventListener("click", function() {
  moveScaleUp();
  processInput();
  keyAndCurrentScaleDisplay()
  ifActiveSetScale();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

//----------------------------------------------------------
//---------- Arrow Button Down------------------------------

arrowDown.addEventListener("mouseover", function() {
  lightDownArrowAndStayLit();
});

arrowDown.addEventListener("mouseout", function() {
  dimDownArrow();
});

arrowDown.addEventListener("click", function() {
  moveScaleDown();
  processInput();
  keyAndCurrentScaleDisplay();
  ifActiveSetScale();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

//----------------------------------------------------------
//---------- Arrow Button Left------------------------------

arrowLeft.addEventListener("mouseover", function() {
  arrowLeft.style.transition = "opacity .1s";
  arrowLeft.style.opacity = 1;
});

arrowLeft.addEventListener("mouseout", function() {
  arrowLeft.style.transition = "opacity .1s";
  arrowLeft.style.opacity = .5;
});

arrowLeft.addEventListener("click", function() {
  moveKeyDown();
  processInput();
  pedalToneKeyDisplay();
  keyAndCurrentScaleDisplay();
  ifActiveSetScale();
  pedalToneActivator();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

//----------------------------------------------------------
//---------- Arrow Button Right-----------------------------

arrowRight.addEventListener("mouseover", function() {
  arrowRight.style.transition = "opacity .1s";
  arrowRight.style.opacity = 1;
});
arrowRight.addEventListener("click", function() {
  moveKeyUp();
  processInput();
  // When new key is chosen, update pedal tone key text with the currentKey
  pedalToneKeyDisplay();
  keyAndCurrentScaleDisplay();
  ifActiveSetScale();
  pedalToneActivator();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});
arrowRight.addEventListener("mouseout", function() {
  arrowRight.style.transition = "opacity .1s";
  arrowRight.style.opacity = .5;
});

//---------------------------------------------------
//---------------------------------------------------

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

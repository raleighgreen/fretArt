// 1. GENERATE DATA USING CONSTRUCTORS -----------------
var letterNumbers = [["E0","F0","F#0","G0","G#0","A0","A#0","B0","C1","C#1","D1","D#1",
                      "E1","F1","F#1","G1","G#1","A1","A#1","B1","C2","C#2","D2","D#2",
                      "E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3",
                      "E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4", "E4"]];

// Generate notes
for (var i = 0; i < 49; i++) {
  fretArt['notes'].push(new Note(i, null, letterNumbers[0][i]));
}

// List lowest frets for each mode (need to make into an object?)
var ionianLowestFrets = [402,324,246,168,89,12];
var dorianLowestFrets = [401,323,246,168,89,11];
var phrygianLowestFrets = [401,323,245,167,89,11];
var lydianLowestFrets = [402,324,246,168,90,12];
var mixolydianLowestFrets = [401,324,246,168,89,11];
var aeolienLowestFrets = [401,323,245,168,89,11];
var locrianLowestFrets = [401,323,245,167,89,11];
//---------------------
var melMinLowestFrets = [402,323,246,168,89,12];
var phrygianNat6LowestFrets = [401,323,246,167,89,11];
var lydianAugmentedLowestFrets = [402,324,246,168,90,12];
var lydianb7LowestFrets = [401,324,246,168,90,11];
var mixolydianb6LowestFrets = [401,324,245,168,89,11];
var locrianNat2LowestFrets = [401,323,245,168,89,11];
var alteredScaleLowestFrets = [401,323,245,167,88,11];
//---------------------
var harmMinLowestFrets = [402,323,245,168,89,12];
var locrianNat6LowestFrets = [401,323,246,167,89,11];
var ionianSharp5LowestFrets = [402,324,246,168,89,12];
var dorianSharp4LowestFrets = [401,323,246,168,90,11];
var phrygianDominantLowestFrets = [401,324,245,167,89,11];
var lydianSharp2LowestFrets = [402,324,246,169,90,12];
var alteredDominantbb7LowestFrets = [400,323,245,167,88,10];

// Create modes and group them in an Object
fretArt.modes = {
  "Ionian": new Mode("Ionian", [2, 2, 1, 2, 2, 2, 1], ionianLowestFrets),
  "Dorian": new Mode("Dorian", [2, 1, 2, 2, 2, 1, 2], dorianLowestFrets),
  "Phrygian": new Mode("Phrygian", [1, 2, 2, 2, 1, 2, 2], phrygianLowestFrets),
  "Lydian": new Mode("Lydian",[2, 2, 2, 1, 2, 2, 1], lydianLowestFrets),
  "Mixolydian": new Mode("Mixolydian", [2, 2, 1, 2, 2, 1, 2], mixolydianLowestFrets),
  "Aeolien": new Mode("Aeolien", [2, 1, 2, 2, 1, 2, 2], aeolienLowestFrets),
  "Locrian": new Mode("Locrian",[1, 2, 2, 1, 2, 2, 2], locrianLowestFrets),
//---------------------
  "Melodic Minor": new Mode("Melodic Minor",[2, 1, 2, 2, 2, 2, 1], melMinLowestFrets),
  "Phrygian Natural 6": new Mode("Phrygian Natural 6", [1, 2, 2, 2, 2, 1, 2], phrygianNat6LowestFrets),
  "Lydian Augmented": new Mode("Lydian Augmented",[2, 2, 2, 2, 1, 2, 1], lydianAugmentedLowestFrets),
  "Lydian b7": new Mode("Lydian b7", [2, 2, 2, 1, 2, 1, 2], lydianb7LowestFrets),
  "Mixolydian b6": new Mode("Mixolydian b6", [2, 2, 1, 2, 1, 2, 2], mixolydianb6LowestFrets),
  "Locrian Nat 2": new Mode("Locrian Nat 2",[2, 1, 2, 1, 2, 2, 2], locrianNat2LowestFrets),
  "Altered Scale": new Mode("Altered Scale",[1, 2, 1, 2, 2, 2, 2], alteredScaleLowestFrets),
//---------------------
  "Harmonic Minor": new Mode("Harmonic Minor",[2, 1, 2, 2, 1, 3, 1], harmMinLowestFrets),
  "Locrian Natural 6": new Mode("Locrian Natural 6",[1, 2, 2, 1, 3, 1, 2], locrianNat6LowestFrets),
  "Ionian #5": new Mode("Ionian #5",[2, 2, 1, 3, 1, 2, 1], ionianSharp5LowestFrets),
  "Dorian #4": new Mode("Dorian #4",[2, 1, 3, 1, 2, 1, 2], dorianSharp4LowestFrets),
  "Phrygian Dominant": new Mode("Phrygian Dominant",[1, 3, 1, 2, 1, 2, 2], phrygianDominantLowestFrets),
  "Lydian #2": new Mode("Lydian #2",[3, 1, 2, 1, 2, 2, 1], lydianSharp2LowestFrets),
  "Altered Dominant bb7": new Mode("Altered Dominant bb7",[1, 2, 1, 2, 2, 1, 3], alteredDominantbb7LowestFrets)
}

// Create strings and group them in an array
fretArt.strings = [
  new String("highE", 24, 48),
  new String("B", 19, 43),
  new String("G", 15, 39),
  new String("D", 10, 34),
  new String("A", 5, 29),
  new String("lowE", 0, 24)
];

var noteSpacing = 25;
var stringSpacing = 20;
// Create fret objects and push them into frets array
for (var i = 0; i < fretArt.strings.length; i++) {
  var currentString = fretArt.strings[i];
  var stringDistance = (i * stringSpacing) + 125;
  for (var n = currentString.low; n <= currentString.high; n++) {
    var noteDistance = ((n * noteSpacing) + 235) - (currentString.low * noteSpacing);
    var note = fretArt.notes[n];
    fretArt.frets.push(new Fret(noteDistance, stringDistance, note, currentString));
  }
}

var originalXPosition = fretArt.frets[0].x - (25 * noteSpacing);
var xPosition = originalXPosition;

for (var i = 0; i < fretArt.strings.length; i++) {
  var stringDistance = (i * stringSpacing) + 125;
  for (var n = 0; n < 78; n++) {
    fretArt.shadowFrets.push(new ShadowFret(xPosition, stringDistance));
    xPosition += noteSpacing;
  }
  xPosition = originalXPosition;
}

// 2. DEFINE FUNCTIONS -----------------

// Populate arrPositionList by passing in initialArray and number of shapes

create3DArray = function(array, size){
  var newArray = [array];
  for(var i = 0; i < size; i++)
  {
    newArray.push(getNextArrayRow(newArray[i]));
  }
  return newArray;
}

getNextArrayRow = function(array){
  var nextRow = [];
  for(var i = 0; i < array.length; i++)
  {
    var innerArray = array[i];
    var nextElement = [];
    for(var j = 0; j < innerArray.length; j++)
    {
      var value = (innerArray[j] + 1) % (7 + j);
      value = value === 0 ? j : value;
      nextElement.push(value);
    }
    nextRow.push(nextElement);
  }
  return nextRow;
}

// Build shapes for current key and mode
function buildShapes() {
  fretArt.shapes = [];
  // Sets indices for initial array
  var initialArray = [[6,7],[3,4],[1,2],[5,6],[2,3],[6,7]];
  fretArt.arrPositionList = (create3DArray(initialArray,fretArt.numberOfShapes));
  // Set number of shapes based on number of arrays in arrPositionList
  fretArt.numberOfShapes = fretArt.arrPositionList.length - 1;
  // Make blank shapes based on numberOfShapes
  for (var i = 0; i <= fretArt.numberOfShapes; i++) {
    fretArt.shapes.push(new Shape([0,0,0,0,0,0,0,0,0,0,0,0]));
  }
  // Combine currentKey with initialStringIndices
  for (var i = 0; i < fretArt.currentMode.lowestFrets.length; i++) {
    fretArt.stringPos[i] = fretArt.currentKey + fretArt.currentMode.lowestFrets[i];
  }
  var stringIndices = [];
  // Map coordinates from modesLowestFrets to stringIndices[]
  for (var i = 0; i <= 5; i++) {
    stringIndices.push(fretArt.stringPos[i]);
  }
  for (var i = 5; i >= 0; i--) {
    stringIndices.push(fretArt.stringPos[i]);
  }
  // Make left side of first shape
  for (var i = 0; i < stringIndices.length; i++) {
    fretArt.shapes[0].frets[i] += stringIndices[i];
  }
  // Make right side of first shape
  for (var i = 0; i < 6; i++) {
    fretArt.shapes[0].frets[i + 6] += parseInt(fretArt.currentMode.pattern.slice(fretArt.arrPositionList[0][i][0],fretArt.arrPositionList[0][i][1]));
  }
  // Build the rest of the shapes
  for (var n = 0; n < fretArt.numberOfShapes; n++){
    // Build left side of shape
    for (var i = 0; i < 6; i++){
      fretArt.shapes[n+1].frets[i] += parseInt(fretArt.shapes[n].frets.slice(11-i, 12-i));
    }
    // Build right side of shape
    for (var i = 0; i < 6; i++) {
      fretArt.shapes[n+1].frets[i + 6] += parseInt(fretArt.shapes[n].frets.slice(i+6, i+ 7)) + parseInt(fretArt.currentMode.pattern.slice((fretArt.arrPositionList[n+1][i][0]), (fretArt.arrPositionList[n+1][i][1])));
    }
  }
}

function drawLines() {
  for (var i = 0; i < fretArt.shapes.length; i++) {
    var currentShape = fretArt.shapes[i].frets;
    var currentShapeArray = [];
    for (var item in currentShape) {
      currentShapeArray.push(fretArt.shadowFrets[currentShape[item]]);
    }
    drawShape(currentShapeArray);
  }
}

// Calculates a scale by key and mode and activates it on the frets
function setScale(key, mode) {
  fretArt.foundScale = getScale(key, mode);
  setOctave(key);
  activateFrets(fretArt.foundScale);
  fretArt.foundScaleIds = [];
  for (var i = 0; i < fretArt.foundScale.length; i++){

    fretArt.foundScaleIds.push(fretArt.foundScale[i].audioFile.id);
  }
}

function isolateScaleIds(foundScale) {
  // filter out duplicates and return
  fretArt.filteredScaleIds = [];
  fretArt.filteredScaleIds = fretArt.foundScaleIds.filter(function(elem,pos) {
    return fretArt.foundScaleIds.indexOf(elem) == pos;
  });
}

// Deactivates all frets to make blank slate
function clearFretSelection() {
  for (var f = 0; f < fretArt.frets.length; f++) {
    fretArt.frets[f].active = false;
  }
}

// Sets octave range relative to key
function setOctave(key) {
  for (var i = 0; i < fretArt.frets.length; i++) {
    var id = fretArt.frets[i].note.id;
    var counter = 0;
    if (fretArt.frets[i]) {
      for (var j = 0; j < 5; j++) {
        if (id >= key + counter -12 && id < key + counter) {
          fretArt.frets[i].octave = j;
        }
        counter += 12;
      }
    }
  }
}

// Loop through to compare foundScale and frets arrays.
// Make every note in frets (that matches foundScale note) active.
function activateFrets(foundScale) {
  clearFretSelection();
  for (var i = 0; i < foundScale.length; i++) {
    for (var f = 0; f < fretArt.frets.length; f++) {
      if (fretArt.frets[f].note == foundScale[i]) {
        fretArt.frets[f].active = true;
      }
    }
  }
}

function processInput() {
  // Grab the key value from the key select fields
  fretArt.currentKey = parseInt(keyValueField.selectedIndex);
  // Grab the name of the key from the text content of the option element
  fretArt.currentKeyName = keyValueField.options[keyValueField.selectedIndex].textContent;
  // Grab the current mode using the value from the mode select field
  fretArt.currentMode = fretArt.modes[scaleValueField.value];
  // Calculate and set the scale and display it in the console
}

function drawShape(shapeArray) {
  push();
  beginShape();
  noFill();
  strokeWeight(2);
  stroke(9,81,201);
  strokeJoin(ROUND);
  for (i = 0; i < shapeArray.length; i++) {
    vertex(shapeArray[i].x,shapeArray[i].y);
  }
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].clicked();
  }
}

function playSound() {
  processInput();
  var cPedal = document.getElementById("_" + (fretArt.currentKey + 1));
    cPedal.play();
}

function pedalToneKeyDisplay(){
  document.getElementById("pedal-tone-key").textContent = fretArt.currentKeyName;
}

function keyAndCurrentScaleDisplay(){
  document.getElementById("current-key").textContent = fretArt.currentKeyName + " ";
  document.getElementById("current-scale").textContent = fretArt.currentMode.name;
  console.log(fretArt.currentMode);
}


function turnOnButtonStyle(onElem) {
  var onElement = onElem;
  onElement.style.background='rgb(9,81,201)';
  onElement.style.color = "black";
}
function turnOffButtonStyle(offElem) {
  var offElement = offElem;
  offElement.style.background='black';
  offElement.style.color = 'rgb(9,81,201)';
}

function octaveRestrictor(foundScaleArrPos) {
  for (i = 0; i < fretArt.frets.length; i++){
    if (fretArt.frets[i].note.letterNum == fretArt.foundScale[foundScaleArrPos].letterNum) {
      fretArt.frets[i].notePlaying();
    }
  }
}

function toggle(button)
{
    if(button.value==" Frets on ") {
        button.value=" Frets off ";
        turnOffButtonStyle(button);
        document.getElementById("fretsBox").style.visibility = 'hidden';
        fretArt.fretsIsShowing = false;
    }
    else if(button.value==" Frets off ") {
        button.value=" Frets on ";
        turnOnButtonStyle(button);
        document.getElementById("fretsBox").style.visibility = 'visible';
        fretArt.fretsIsShowing = true;
    }
}

// 3. SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION -----------------

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

fretButton.addEventListener("click", function() {
  toggle(fretButton);
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

// 4. REQUIRED P5 FUNCTIONS ------------------------------------------------
function preload() {
  for (var i = 0; i < 49; i++) {
    fretArt.notes[i].audioFile = loadSound("audio/" + (i + 1) + ".mp3");
  }
}

function setup() {
  createCanvas(882, 370);
  // buildShapes();
  processInput();
  fretArt.fretsIsShowing = true;
  fretArt.linesVisible = true;
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

// Required P5 function loops forever
function draw() {
  background(0);
  // Turn on lines when Show lines button is clicked
  if (fretArt.linesVisible) {
    drawLines();
  }

  // Turn on C Pedal Tone when Play button is clicked
  if (PedalTonePlay == true) {
    playSound();
  } else {
    // Pause C Pedal Tone
    PedalTonePlay = false;
  }
  // Start shapes
  push();
  // Make two black rectangles to mask lines overflow
  fill(0);
  rect(0, 120,247, 110);
  rect(847, 120,70, 110);
  // Make a fretboard outline
  noFill();
  strokeWeight(2);
  stroke(9,81,201);
  rect(247, 125,600, 100);
  // Make a thin line with 75% opacity to indicate the nut
  strokeWeight(2);
  stroke(9,81,201,95);
  if (fretArt.fretsIsShowing == true) {
    // Draw the frets
    line(247, 125, 247, 225);
    var add25 = 271;
    for (var i = 0; i < 23; i++) {
      line(add25, 125, add25, 225);
      add25 = add25 + 25;
    }
  }
  noFill();
  strokeWeight(1);
  stroke(9,81,201, 255);
  rect(246, 274,450, 48, 7);
  pop();
  // End shapes

  // Trigger note light and sound on note mouseOver
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].overNote();
  }

  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].displayWithColor();
    fretArt.frets[i].attachNotes();
  }
  // var fps = frameRate();
  // fill(255);
  // stroke(0);
  // text("FPS: " + fps.toFixed(2), 10, height - 10);
}

// 1. GENERATE DATA USING CONSTRUCTORS -----------------
var letterNumbers = [["E0","F0","F#0","G0","G#0","A0","A#0","B0","C1","C#1","D1","D#1",
                      "E1","F1","F#1","G1","G#1","A1","A#1","B1","C2","C#2","D2","D#2",
                      "E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3",
                      "E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4", "E4"]];

// Generate notes
for (var i = 0; i < 49; i++) {
  fretArt['notes'].push(new Note(i, null, letterNumbers[0][i]));
}

// List lowest frets for each mode
// Major scale modes
var ionianLowestFrets = [402,324,246,168,89,12];
var dorianLowestFrets = [401,323,246,168,89,11];
var phrygianLowestFrets = [401,323,245,167,89,11];
var lydianLowestFrets = [402,324,246,168,90,12];
var mixolydianLowestFrets = [401,324,246,168,89,11];
var aeolienLowestFrets = [401,323,245,168,89,11];
var locrianLowestFrets = [401,323,245,167,89,11];
// Melodic Minor modes
var melMinLowestFrets = [402,323,246,168,89,12];
var phrygianNat6LowestFrets = [401,323,246,167,89,11];
var lydianAugmentedLowestFrets = [402,324,246,168,90,12];
var lydianb7LowestFrets = [401,324,246,168,90,11];
var mixolydianb6LowestFrets = [401,324,245,168,89,11];
var locrianNat2LowestFrets = [401,323,245,168,89,11];
var alteredScaleLowestFrets = [401,323,245,167,88,11];
// Harmonic Minor modes
var harmMinLowestFrets = [402,323,245,168,89,12];
var locrianNat6LowestFrets = [401,323,246,167,89,11];
var ionianSharp5LowestFrets = [402,324,246,168,89,12];
var dorianSharp4LowestFrets = [401,323,246,168,90,11];
var phrygianDominantLowestFrets = [401,324,245,167,89,11];
var lydianSharp2LowestFrets = [402,324,246,169,90,12];
var alteredDominantbb7LowestFrets = [400,323,245,167,88,10];

// Create modes and group them in an Object
fretArt.modes = {
  "Ionian (Maj Scale)": new Mode("Ionian", [2, 2, 1, 2, 2, 2, 1], ionianLowestFrets),
  "Dorian": new Mode("Dorian", [2, 1, 2, 2, 2, 1, 2], dorianLowestFrets),
  "Phrygian": new Mode("Phrygian", [1, 2, 2, 2, 1, 2, 2], phrygianLowestFrets),
  "Lydian": new Mode("Lydian",[2, 2, 2, 1, 2, 2, 1], lydianLowestFrets),
  "Mixolydian": new Mode("Mixolydian", [2, 2, 1, 2, 2, 1, 2], mixolydianLowestFrets),
  "Aeolien (Nat Min)": new Mode("Aeolien", [2, 1, 2, 2, 1, 2, 2], aeolienLowestFrets),
  "Locrian": new Mode("Locrian",[1, 2, 2, 1, 2, 2, 2], locrianLowestFrets),
//---------------------
  "Melodic Minor": new Mode("Melodic Minor",[2, 1, 2, 2, 2, 2, 1], melMinLowestFrets),
  "Phrygian Nat 6": new Mode("Phrygian &#x266e;6", [1, 2, 2, 2, 2, 1, 2], phrygianNat6LowestFrets),
  "Lydian Augmented": new Mode("Lydian Augmented",[2, 2, 2, 2, 1, 2, 1], lydianAugmentedLowestFrets),
  "Lydian b7": new Mode("Lydian &#9837;7", [2, 2, 2, 1, 2, 1, 2], lydianb7LowestFrets),
  "Mixolydian b6": new Mode("Mixolydian &#9837;6", [2, 2, 1, 2, 1, 2, 2], mixolydianb6LowestFrets),
  "Locrian Nat 2": new Mode("Locrian &#x266e;2",[2, 1, 2, 1, 2, 2, 2], locrianNat2LowestFrets),
  "Super Locrian": new Mode("Super Locrian",[1, 2, 1, 2, 2, 2, 2], alteredScaleLowestFrets),
//---------------------
  "Harmonic Minor": new Mode("Harmonic Minor",[2, 1, 2, 2, 1, 3, 1], harmMinLowestFrets),
  "Locrian Nat 6": new Mode("Locrian &#x266e;6",[1, 2, 2, 1, 3, 1, 2], locrianNat6LowestFrets),
  "Ionian #5": new Mode("Ionian &#x266f;5",[2, 2, 1, 3, 1, 2, 1], ionianSharp5LowestFrets),
  "Dorian #4": new Mode("Dorian &#x266f;4",[2, 1, 3, 1, 2, 1, 2], dorianSharp4LowestFrets),
  "Phrygian Dominant": new Mode("Phrygian Dominant",[1, 3, 1, 2, 1, 2, 2], phrygianDominantLowestFrets),
  "Lydian #2": new Mode("Lydian &#x266f;2",[3, 1, 2, 1, 2, 2, 1], lydianSharp2LowestFrets),
  "Ultra Locrian": new Mode("Ultra Locrian",[1, 2, 1, 2, 2, 1, 3], alteredDominantbb7LowestFrets)
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
  // Process the key index and key name
  for (var i = 0; i < fretArt.selectedKeyNameHolder.length; i++) {
    if (fretArt.selectedKeyNameHolder[i].getAttributeNode("data-selected").value === "keySelected") {
    // Grab the key value from the selectedKeyText field and place it in fretArt.currentKey
      var keyName = document.getElementsByClassName('selectedKeyText');
      var keyNameValue = keyName[i].textContent;
      // console.log(fretArt.selectedKeyNameHolder);
      // console.log(scaleNameValue);
      fretArt.currentKey = i;
      fretArt.currentKeyName = keyNameValue;
    }
  }
  // process the selected scale Text
  for (var i = 0; i < fretArt.selectedModeNameHolder.length; i++) {
    if (fretArt.selectedModeNameHolder[i].getAttributeNode("data-selected").value === "modeSelected") {
      var scaleName = document.getElementsByClassName('selectedScaleText');
      var scaleNameValue = scaleName[i].textContent;
      // console.log(scaleNameValue);
    }
   }
   fretArt.currentMode = fretArt.modes[scaleNameValue];
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

function keyAndCurrentScaleDisplay(){
  document.getElementById("current-key").textContent = fretArt.currentKeyName + " ";
  // document.getElementById("current-scale").textContent = fretArt.currentMode.name;
  document.getElementById("current-scale").innerHTML = fretArt.currentMode.name;
}

function octaveRestrictor(foundScaleArrPos) {
  for (i = 0; i < fretArt.frets.length; i++){
    if (fretArt.frets[i].note.letterNum == fretArt.foundScale[foundScaleArrPos].letterNum) {
      fretArt.frets[i].notePlaying();
    }
  }
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

//----------------------------------------------------------
//---------- Fret and String Button Functions --------------

function toggleFretButton(button) {
    if (button.value == " Frets on ") {
        button.value = " Frets off ";
        turnOffButtonStyle(button);
        document.getElementById("fretsBox").style.visibility = 'hidden';
        fretArt.fretsIsShowing = false;
    }
    else if (button.value == " Frets off ") {
        button.value = " Frets on ";
        turnOnButtonStyle(button);
        document.getElementById("fretsBox").style.visibility = 'visible';
        fretArt.fretsIsShowing = true;
    }
}

function toggleStringButton(button) {
    if (button.value == " Strings on ") {
        button.value = " Strings off ";
        turnOffButtonStyle(button);
        fretArt.stringsIsShowing = false;
    }
    else if (button.value == " Strings off ") {
        button.value = " Strings on ";
        turnOnButtonStyle(button);
        fretArt.stringsIsShowing = true;
    }
}

//----------------------------------------------------------
//---------- Scale and Shape Button Functions --------------

function toggleScale() {
  if (fretArt.scaleButtonStatus) {
    styleScaleButtonOff();
    fretArt.scaleButtonStatus = false;
  } else {
    styleScaleButtonOn();
    fretArt.scaleButtonStatus = true;
  }
}

function styleScaleButtonOff() {
  turnOffButtonStyle(document.getElementById("show-scale"));
  turnOnButtonStyle(document.getElementById("hide-scale"));
  fretArt.invisible = true;
}

function styleScaleButtonOn() {
  turnOnButtonStyle(document.getElementById("show-scale"));
  turnOffButtonStyle(document.getElementById("hide-scale"));
  fretArt.invisible = false;
}

function toggleShape() {
  if (fretArt.shapeButtonStatus) {
    styleShapeButtonOn();
    fretArt.shapeButtonStatus = false;
  } else {
    styleShapeButtonOff();
    fretArt.shapeButtonStatus = true;
  }
}

function styleShapeButtonOff() {
  processInput();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
  turnOffButtonStyle(document.getElementById("show-shapes"));
  turnOnButtonStyle(document.getElementById("hide-shapes"));
  fretArt.linesVisible = false;
}

function styleShapeButtonOn() {
  turnOnButtonStyle(document.getElementById("show-shapes"));
  turnOffButtonStyle(document.getElementById("hide-shapes"));
  fretArt.linesVisible = true;
}
//----------------------------------------------------------
//---------- Pedal Tone Functions --------------------------

function playPedalTone() {
  processInput();
  var pedalTone = fretArt.notes[fretArt.keyIndex].audioFile;
  if (!pedalTone.isPlaying()) {
    pedalTone.play();
    for (var i = 0; i < fretArt.frets.length; i++) {
      if (fretArt.keyIndex == fretArt.frets[i].note.id && fretArt.frets[i].string.name == "lowE") {
        fretArt.frets[i].playing = true;
        fretArt.frets[i].col1 = 255;
        fretArt.frets[i].col2 = 255;
        fretArt.frets[i].col3 = 255;
        fretArt.frets[i].alpha = 255;
        // console.log(fretArt.frets[i]);
        break;
      }
    }
  }
}

function pedalToneActivator() {
  if (pedalTonePlay) {
    for (var i = 0; i < fretArt.frets.length; i++) {
      if (fretArt.keyIndex == fretArt.frets[i].noteName && fretArt.frets[i].string.name == "lowE") {
        fretArt.frets[i].playing = true;
        // console.log(fretArt.frets[i]);
        break;
      }
    }
  }
}

function pedalToneKeyDisplay(){
  document.getElementById("pedal-tone-key").textContent = fretArt.currentKeyName;
}

function togglePedalTone() {
  if (!pedalTonePlay) {
    pedalToneButtonOn();
  } else {
    pedalToneButtonOff();
  }
}

function pedalToneButtonOff() {
  turnOffButtonStyle(document.getElementById("play-button"));
  turnOnButtonStyle(document.getElementById("stop-button"));
  for (var i = 0; i < fretArt.frets.length; i++) {
    fretArt.frets[i].playing = false;
  }
  pedalTonePlay = false;
}

function pedalToneButtonOn() {
  turnOnButtonStyle(document.getElementById("play-button"));
  turnOffButtonStyle(document.getElementById("stop-button"));
  pedalTonePlay = true;
}
//----------------------------------------------------------
//----------------------------------------------------------

function keyScaleShapeProcessor() {
  processInput();
  keyAndCurrentScaleDisplay();
  for (var f = 0; f < fretArt.frets.length; f++) {
    if (fretArt.frets[f].active) {
      setScale(fretArt.currentKey, fretArt.currentMode.pattern);
    }
  }
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
}

function lightTimer(passedThis) {
  passedThisIn = passedThis;
  passedThisIn.playing = true;
  var passThisToTimeout = passedThisIn;
  if (passedThisIn.playing) {
    setTimeout(function() {
      passThisToTimeout.playing = false;
    }, 2700);
    passedThisIn.col1 = 255;
    passedThisIn.col2 = 255;
    passedThisIn.col3 = 255;
    passedThisIn.alpha = 255;
  }
}

//----------------------------------------------------------
//---------- Scale Functions -------------------------------

function setScaleIndex() {
  for (var i = 0; i < fretArt.selectedModeNameHolder.length; i++) {
    if (fretArt.selectedModeNameHolder[i].getAttributeNode("data-selected").value === "modeSelected") {
      // Grab the key value from the key select field and place it in fretArt.currentKey
      fretArt.scaleIndex = i;
      // reset all "data-selected" attributes to "notSelected"
      fretArt.selectedModeNameHolder[i].getAttributeNode("data-selected").value = "notSelected";
    }
  }
}

function resetScaleToNotSelected() {
  for (var i = 0; i < fretArt.selectedModeNameHolder.length; i++) {
    fretArt.selectedModeNameHolder[i].getAttributeNode("data-selected").value = "notSelected";
  }
}

// activate the up arrow and keyboard up arrow by incrementing to the next mode
function moveScaleUp() {
  // clear out and reset scale index
  setScaleIndex();
  for (var i = 0; i < fretArt.selectedModeNameHolder.length; i++) {
   // remove 'target' class from all nodes from scalesDiv
   fretArt.selectedModeNameHolder[i].classList.remove('target');
  }
  // if the scale index is 0 (which would be the Ionian default), jump to the last index
  if (fretArt.scaleIndex == 0){
    fretArt.scaleIndex = fretArt.selectedModeNameHolder.length - 1; // scales are in reverse order
    fretArt.selectedModeNameHolder[fretArt.scaleIndex].getAttributeNode("data-selected").value = "modeSelected";
    // add 'target' class to fretArt.selectedModeNameHolder
    fretArt.selectedModeNameHolder[fretArt.scaleIndex].classList.add('target');
  } else {
    resetScaleToNotSelected();
    // otherwise, decrement the scaleIndex to itself - 1
    fretArt.scaleIndex -= 1;
    fretArt.selectedModeNameHolder[fretArt.scaleIndex].getAttributeNode("data-selected").value = "modeSelected";
    // add 'target' class to fretArt.selectedModeNameHolder
    fretArt.selectedModeNameHolder[fretArt.scaleIndex].classList.add('target');
  }
}

function moveScaleDown() {
  // clear out and reset scale index
  setScaleIndex();
  for (var i = 0; i < fretArt.selectedModeNameHolder.length; i++) {
   // remove 'target' class from all nodes from scalesDiv
   fretArt.selectedModeNameHolder[i].classList.remove('target');
  }
  // if the scale index is less than the length of the name holder, increment to the next mode
  if (fretArt.scaleIndex < fretArt.selectedModeNameHolder.length - 1){
    fretArt.scaleIndex += 1; // scales are in reverse order
    fretArt.selectedModeNameHolder[fretArt.scaleIndex].getAttributeNode("data-selected").value = "modeSelected";
    // add 'target' class to fretArt.selectedModeNameHolder
    fretArt.selectedModeNameHolder[fretArt.scaleIndex].classList.add('target');
  } else {
    // otherwise, reset scale index to zero (default Ionian)
    fretArt.scaleIndex = 0;
    fretArt.selectedModeNameHolder[fretArt.scaleIndex].getAttributeNode("data-selected").value = "modeSelected";
    // add 'target' class to fretArt.selectedModeNameHolder
    fretArt.selectedModeNameHolder[fretArt.scaleIndex].classList.add('target');
  }
}

//----------------------------------------------------------
//---------- Key Dropdown Functions ------------------------

function setKeyIndex() {
  for (var i = 0; i < fretArt.selectedKeyNameHolder.length; i++) {
    if (fretArt.selectedKeyNameHolder[i].getAttributeNode("data-selected").value === "keySelected") {
      // Grab the key value from the key select field and place it in fretArt.currentKey
      fretArt.keyIndex = i;
      // reset all "data-selected" attributes to "notSelected"
      fretArt.selectedKeyNameHolder[i].getAttributeNode("data-selected").value = "notSelected";
    }
  }
}

// nothing yet
function resetKeyToNotSelected() {
  for (var i = 0; i < fretArt.selectedKeyNameHolder.length; i++) {
    fretArt.selectedKeyNameHolder[i].getAttributeNode("data-selected").value = "notSelected";
  }
}

// renamed to moveKeyUp
// activate the up arrow and keyboard up arrow by incrementing to the next mode
function moveKeyUp() {
  // clear out and reset key index
  setKeyIndex();
  removeKeyTargetClass();
  // if the scale index is  (which would be the Ionian default), jump to the last index
  if (fretArt.keyIndex <= fretArt.selectedKeyNameHolder.length - 2){
    fretArt.keyIndex += 1; // scales are in reverse order
    fretArt.selectedKeyNameHolder[fretArt.keyIndex].getAttributeNode("data-selected").value = "keySelected";
    // add 'target' class to fretArt.selectedModeNameHolder
    fretArt.selectedKeyNameHolder[fretArt.keyIndex].classList.add('target');
  } else {
    fretArt.keyIndex = 0;
    fretArt.selectedKeyNameHolder[fretArt.keyIndex].getAttributeNode("data-selected").value = "keySelected";
    // add 'target' class to fretArt.selectedModeNameHolder
    fretArt.selectedKeyNameHolder[fretArt.keyIndex].classList.add('target');
  }
}

//renamed to moveKeyDown
function moveKeyDown() {
  // clear out and reset key index
  // renamed to setKeyIndex
  setKeyIndex();
  removeKeyTargetClass();
  // if the scale index is less than the length of the name holder, increment to the next mode
  if (fretArt.keyIndex == 0){
    fretArt.keyIndex = fretArt.selectedKeyNameHolder.length - 1;
    fretArt.selectedKeyNameHolder[fretArt.keyIndex].getAttributeNode("data-selected").value = "keySelected";
    // add 'target' class to fretArt.selectedModeNameHolder
    fretArt.selectedKeyNameHolder[fretArt.keyIndex].classList.add('target');
  } else {
    // otherwise, reset scale index to zero (default Ionian)
    fretArt.keyIndex <= fretArt.selectedKeyNameHolder.length - 1;
    fretArt.keyIndex -= 1;
    fretArt.selectedKeyNameHolder[fretArt.keyIndex].getAttributeNode("data-selected").value = "keySelected";
    // add 'target' class to fretArt.selectedModeNameHolder
    fretArt.selectedKeyNameHolder[fretArt.keyIndex].classList.add('target');
  }
}

//----------------------------------------------------------
//----------------------------------------------------------


function ifActiveSetScale() {
  for (var f = 0; f < fretArt.frets.length; f++) {
    if (fretArt.frets[f].active) {
      setScale(fretArt.currentKey, fretArt.currentMode.pattern);
    }
  }
}

function removeKeyTargetClass() {
  for (var i = 0; i < fretArt.selectedKeyNameHolder.length; i++) {
   // remove 'target' class from all nodes from scalesDiv
   fretArt.selectedKeyNameHolder[i].classList.remove('target');
  }
}

//----------------------------------------------------------
//---------- Arrow Key Functions ---------------------------

//---------- Up Arrows -------------------------------------
function lightUpArrow() {
  arrowUp.style.transition = "opacity .1s";
  arrowUp.style.opacity = 1;
  setTimeout(function(){ arrowUp.style.opacity = .5; }, 150);
}
function lightUpArrowAndStayLit() {
  arrowUp.style.transition = "opacity .1s";
  arrowUp.style.opacity = 1;
}
function dimUpArrow() {
  arrowUp.style.transition = "opacity .1s";
  arrowUp.style.opacity = .5;
}
//---------- Down Arrows -------------------------------------
function lightDownArrow() {
  arrowDown.style.transition = "opacity .1s";
  arrowDown.style.opacity = 1;
  setTimeout(function(){ arrowDown.style.opacity = .5; }, 150);
}
function lightDownArrowAndStayLit() {
  arrowDown.style.transition = "opacity .1s";
  arrowDown.style.opacity = 1;
}
function dimDownArrow() {
  arrowDown.style.transition = "opacity .1s";
  arrowDown.style.opacity = .5;
}
//---------- Left Arrows -------------------------------------
function lightLeftArrow() {
  arrowLeft.style.transition = "opacity .1s";
  arrowLeft.style.opacity = 1;
  setTimeout(function(){ arrowLeft.style.opacity = .5; }, 150);
}
function lightLeftArrowAndStayLit() {
  arrowLeft.style.transition = "opacity .1s";
  arrowLeft.style.opacity = 1;
}
function dimLeftArrow() {
  arrowLeft.style.transition = "opacity .1s";
  arrowLeft.style.opacity = .5;
}
//---------- Right Arrows -------------------------------------
function lightRightArrow() {
  arrowRight.style.transition = "opacity .1s";
  arrowRight.style.opacity = 1;
  setTimeout(function(){ arrowRight.style.opacity = .5; }, 150);
}
function lightRightArrowAndStayLit() {
  arrowRight.style.transition = "opacity .1s";
  arrowRight.style.opacity = 1;
}
function dimRightArrow() {
  arrowRight.style.transition = "opacity .1s";
  arrowRight.style.opacity = .5;
}

//---------- Right and Left Arrow processes -------------------

function arrowRightAndLeftProcesses() {
  processInput();
  pedalToneKeyDisplay();
  keyAndCurrentScaleDisplay();
  ifActiveSetScale();
  pedalToneActivator();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
}

//----------------------------------------------------------
//---------- P5 PRELOAD, SETUP AND DRAW FUNCTIONS ----------

function preload() {
  for (var i = 0; i < 49; i++) {
    fretArt.notes[i].audioFile = loadSound("audio/" + (i + 1) + ".mp3");
  }
}

function setup() {
  createCanvas(882, 370);

//----------------------------------------------------------
//---------- Setup scale dropdown elements and defaults ----

  fretArt.selectedModeNameHolder = document.querySelectorAll('.scaNam');
  // set keyNameHolder[8]'s 'data-selected'.value = "keySelected"
  fretArt.selectedModeNameHolder[0].getAttributeNode("data-selected").value = "modeSelected";
  fretArt.selectedModeNameHolder[0].classList.add('target');

//----------------------------------------------------------
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
  if (pedalTonePlay == true) {

    playPedalTone();
  } else {
    // Pause C Pedal Tone
    pedalTonePlay = false;
  }
  // Start shapes
  push();
  // Make two black rectangles to mask fretboard overflow
  fill(0);
  rect(0, 120,247, 110);
  rect(847, 120,70, 110);
  // Make a fretboard outline
  noFill();
  strokeWeight(2);
  stroke(9,81,201);
  rect(247, 125,600, 100);
  // Set the fret stroke weight
  strokeWeight(2);
  stroke(9,81,201,95);
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
  stroke(9,81,201, 100);
  rect(246, 275,450, 48, 7);
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

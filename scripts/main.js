// 1. GENERATE DATA USING CONSTRUCTORS -----------------
var letterNumbers = [["E0","F0","F#0","G0","G#0","A0","A#0","B0","C1","C#1","D1","D#1",
                      "E1","F1","F#1","G1","G#1","A1","A#1","B1","C2","C#2","D2","D#2",
                      "E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3",
                      "E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4", "E4"]];

// Generate notes
for (var i = 0; i < 49; i++) {
  fretArt['notes'].push(new Note(i, null, letterNumbers[0][i]));
}

// Create strings and group them in an array
fretArt.strings = [
  new String("highE", 24, 48),
  new String("B", 19, 43),
  new String("G", 15, 39),
  new String("D", 10, 34),
  new String("A", 5, 29),
  new
   String("lowE", 0, 24)
];

// Create fret objects and push them into frets array
for (var i = 0; i < fretArt.strings.length; i++) {
  var currentString = fretArt.strings[i];
  var stringDistance = (i * fretArt.stringSpacing) + 125;
  for (var n = currentString.low; n <= currentString.high; n++) {
    var noteDistance = ((n * fretArt.noteSpacing) + 235) - (currentString.low * fretArt.noteSpacing);
    var note = fretArt.notes[n];
    fretArt.frets.push(new Fret(noteDistance, stringDistance, note, currentString));
  }
}

var originalXPosition = fretArt.frets[0].x - (25 * fretArt.noteSpacing);
var xPosition = originalXPosition;

for (var i = 0; i < fretArt.strings.length; i++) {
  var stringDistance = (i * fretArt.stringSpacing) + 125;
  for (var n = 0; n < 78; n++) {
    fretArt.shadowFrets.push(new ShadowFret(xPosition, stringDistance));
    xPosition += fretArt.noteSpacing;
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

function deactivateFrets(foundScale) {
  clearFretSelection();
  for (var i = 0; i < foundScale.length; i++) {
    for (var f = 0; f < fretArt.frets.length; f++) {
      if (fretArt.frets[f].note == foundScale[i]) {
        fretArt.frets[f].active = false;
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
      var textData = fretArt.selectedModeNameHolder[i].getAttributeNode('data-text').value;
      var scaleNameValue = scaleName[i].textContent;
    }
   }
   fretArt.currentMode = fretArt.modes[textData];
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
    if (button.textContent == "Frets on") {
        button.textContent = "Frets off";
        turnOffButtonStyle(button);
        fretNumbers.style.visibility = 'hidden';
        fretArt.fretsIsShowing = false;
    }
    else if (button.textContent == "Frets off") {
        button.textContent = "Frets on";
        turnOnButtonStyle(button);
        fretNumbers.style.visibility = 'visible';
        fretArt.fretsIsShowing = true;
    }
}

function toggleStringButton(button) {
    if (button.textContent == "Strings on") {
        button.textContent = "Strings off";
        turnOffButtonStyle(button);
        fretArt.stringsIsShowing = false;
    }
    else if (button.textContent == "Strings off") {
        button.textContent = "Strings on";
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
function processMainScreen() {
  // style.marginTop below sets the height of the "what is fretShapes?" button
  document.getElementById('fretShapesButton').style.marginTop="27px";
  document.getElementById('fretShapesButton').getElementsByTagName('span')[1].innerHTML=" What is fret";
  document.getElementById('fretShapesButton').getElementsByTagName('span')[2].innerHTML="Shapes?";
  fretArt.infoButtonStatus = false;
  infoButton.style.marginLeft='10px';
  arrowElement.innerHTML = '\&rarr;';
  socialBlock.style.marginLeft='-1px';
}
function hideWelcomeScreen() {
  fretArt.infoButtonStatus = false;
  welcomeScreen.style.display = 'none';
  sideBarCont.style.visibility = 'visible';

  processMainScreen();
}
function showInfoScreen() {
  if (fretArt.startButtonShowsFirst) {
    document.getElementById('appButton').style.visibility = 'visible';
    document.getElementById('fretShapesButton').style.visibility = 'hidden';
    fretArt.infoButtonStatus = false;
    fretArt.startButtonShowsFirst = false;
    infoButtonScreen.style.display='block';
    sideBarCont.style.visibility = 'hidden';
    socialBlock.style.marginLeft='0px';
  } else {
    // style.marginTop below sets the height of the "back" button
    document.getElementById('fretShapesButton').style.marginTop="27px";
    document.getElementById('fretShapesButton').getElementsByTagName('span')[1].innerHTML=" Back";
    document.getElementById('fretShapesButton').getElementsByTagName('span')[2].innerHTML="";
    fretArt.startButtonShowsFirst = false;
    infoButtonScreen.style.display='block';
    fretArt.infoButtonStatus = true;
    infoButton.style.marginLeft='10px';
    arrowElement.innerHTML = '\&#8592';
    sideBarCont.style.visibility = 'hidden';
    socialBlock.style.marginLeft='0px';
  }
}
function hideInfoScreen() {
  infoButtonScreen.style.display='none';
  sideBarCont.style.visibility = 'visible';
  processMainScreen();
}
function infoScreenToggle() {
  if (!fretArt.infoButtonStatus) {
    showInfoScreen();
    infoButton.style.width = '60px';
    fretArt.guitarBodyDisplay = false;
    fretNumbers.style.top = '-150px';
  } else if (fretArt.infoButtonStatus){
    hideInfoScreen();
    infoButton.style.width = '145px';
    fretArt.guitarBodyDisplay = true;
    fretNumbers.style.top = '0px';
  }
}
//----------------------------------------------------------
//---------- info page toggle functions --------------------

function dimLine() {
  var line = document.getElementById('lineDivider');
  var textContainer = document.getElementById('infoTextContainer');
  if (line.style.opacity == 1) {
    line.style.opacity = .7;
    textContainer.style.opacity = .3;
  } else {
    line.style.opacity = 1;
    textContainer.style.opacity = .5;
  }
}

// Makes the overlays hidden or visible when the infoButton is pressed
function toggleInfoDivs(divButton, textId) {
  var text = document.getElementById(textId);
  var img = document.getElementById(divButton);
  if (img.style.visibility == 'visible') {
    text.style.visibility = 'hidden';
    img.style.visibility = 'hidden';
  } else {
    img.style.visibility = 'visible';
    text.style.visibility = 'visible';
  }
}
// build a guitar body background with simple shapes
function buildGuitarBody() {
  fill(fretArt.guitarBodyColor);
  rect(750,0,210,220);
  ellipse(837.5, 247, 355, 360);
  // square blue patch
  rect(660.2,220,20,20);
  fill(0);
  ellipse(743, 60, 135, 125);
  // black div covering the 17th - 24th frets
  rect(651,125,200,100);
  rect(710,100,40,40);
}

// When noteProximity is 0, the note can't be triggered
// because the note zone has 0 width.
function toggleSound() {
  if (fretArt.noteProximity == 12) {
    fretArt.noteProximity = 0;
  } else if (fretArt.noteProximity == 0){
    fretArt.noteProximity = 12;
  }
}

function fadeFromBlack() {
  if(fretArt.startPoint == 1) {
    setTimeout(function() {
      fretArt.startPoint = lerp(fretArt.startPoint, fretArt.endPoint, 0.1);
      fadeDiv.style.opacity = fretArt.startPoint;
    }, 500);
    setTimeout(function() {
      fadeDiv.style.visibility = 'hidden';
      fadeDiv.style.display = 'none';
    }, 800);
  }
}
var cnv;
function centerCanvas() {
  var x = ((windowWidth - width) / 2) - 2;
  // Adjust p5 canvas element height below
  var y = (85);
  cnv.position(x, y);
}
function windowResized() {
  centerCanvas();
}
//----------------------------------------------------------
//---------- P5 PRELOAD, SETUP AND DRAW FUNCTIONS ----------

function preload() {
  for (var i = 0; i < 49; i++) {
    fretArt.notes[i].audioFile = loadSound("audio/" + (i + 1) + ".mp3");
  }
}

function setup() {
  cnv = createCanvas(882, 370);
  centerCanvas();

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // tasks to do if it is a Mobile Device
    alert("Mobile Detected");

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

  // if (screen.width >= 1024) {
  //   console.log("this is a desktop browser");
  //   document.body.style.margin = "50px 2px 0px 0px";
  //   var x = ((windowWidth - width) / 2) - 2;
  //   var y = (85);
  //   cnv.position(x, 85);
  // }

  // if (document.documentElement.clientWidth < 900) {
  //   console.log('this is not a desktop browser');
  // }

  // window.onresize = function (event) {
  //   applyOrientation();
  // }
  // function applyOrientation() {
  //   if (window.innerHeight > window.innerWidth) {
  //     console.log("You are now in portrait");
  //     document.getElementById('viewport-meta').setAttribute("content", "minimum-scale=.65, maximum-scale=.65");
  //
  //   } else {
  //     console.log("You are now in landscape");
  //     document.getElementById('viewport-meta').setAttribute("content", "minimum-scale=.65, maximum-scale=.65");
  //
  //   }
  // }

  // window.onresize = function (event) {
  //   applyOrientation();
  // }
  // function applyOrientation() {
  //   if (window.innerHeight > window.innerWidth) {
  //     console.log("You are now in portrait");
  //       // document.getElementById('viewport-meta').setAttribute("content", "initial-scale=.2");
  //       document.getElementById('viewport-meta').setAttribute("content", "minimum-scale=.2");
  //       document.getElementById('viewport-meta').setAttribute("content", "maximum-scale=.2");
  //
  //   } else {
  //     console.log("You are now in landscape");
  //     // document.getElementById('viewport-meta').setAttribute("content", "initial-scale=.5");
  //     document.getElementById('viewport-meta').setAttribute("content", "minimum-scale=.5");
  //     document.getElementById('viewport-meta').setAttribute("content", "maximum-scale=.5");
  //
  //   }
  // }

//   if (screen.width <= 320) {
//     document.getElementById('viewport-meta').setAttribute("content", "minimum-scale=.32");
//     document.getElementById('viewport-meta').setAttribute("content", "maximum-scale=.32");
//     centerCanvas();
//     // document.getElementById('viewport-meta').setAttribute("content", "width=320");
//   } else if (screen.width <= 568) {
//     document.getElementById('viewport-meta').setAttribute("content", "minimum-scale=.75");
//     document.getElementById('viewport-meta').setAttribute("content", "maximum-scale=.75");
//     centerCanvas();
//   // document.getElementById('viewport-meta').setAttribute("content", "width=568");
//   } else if (screen.width <= 768) {
//     document.getElementById('viewport-meta').setAttribute("content", "minimum-scale=.9");
//     document.getElementById('viewport-meta').setAttribute("content", "maximum-scale=.9");
//     centerCanvas();
//   // document.getElementById('viewport-meta').setAttribute("content", "width=768");
//   } else if (screen.width <= 1024) {
//     document.getElementById('viewport-meta').setAttribute("content", "minimum-scale=1");
//     document.getElementById('viewport-meta').setAttribute("content", "maximum-scale=1");
//     centerCanvas();
//   // document.getElementById('viewport-meta').setAttribute("content", "width=1024");
// } else if (screen.width <= 1440) {
//     document.getElementById('viewport-meta').setAttribute("content", "minimum-scale=1");
//     document.getElementById('viewport-meta').setAttribute("content", "maximum-scale=1");
//     centerCanvas();
//   // document.getElementById('viewport-meta').setAttribute("content", "width=1025");
//   }

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
  stroke(9,81,201);
  rect(247,125,600,100);
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

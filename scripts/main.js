// 1. GLOBAL VARIABLES -----------------

var fretXYArray = [];
var linesVisible = false;
var notes = [];
var frets = [];
var strings = [];
var shapes = [];
var noteNameList = [];
var modes;
var currentMode;
var currentKeyName;
var noteNameList = ["E","F","F#","G","G#","A","A#","B","C","C#","D","D#"];
var noteDegreeList = ["3","4","b5","5","b6","6","b7","7","1","b2","2","b3"];
// 3. GENERATE DATA USING CONSTRUCTORS -----------------

// Generate notes
for (var i = 0; i <= 48; i++) {
  var audioFileNumber = i + 1;
  notes.push(new Note(i, audioFileNumber));
}

// Create modes and group them in an Object
modes = {
  ionian: new Mode("Ionian", [2, 2, 1, 2, 2, 2, 1]),
  dorian: new Mode("Dorian", [2, 1, 2, 2, 2, 1, 2]),
  phrygian: new Mode("Phrygian", [1, 2, 2, 2, 1, 2, 2]),
  lydian: new Mode("Lydian",[2, 2, 2, 1, 2, 2, 1]),
  mixolydian: new Mode("mixolydian", [2, 2, 1, 2, 2, 1, 2]),
  aeolien: new Mode("Aeolien", [2, 1, 2, 2, 1, 2, 2]),
  locrian: new Mode("Locrian",[1, 2, 2, 1, 2, 2, 2]),
  minPentatonic: new Mode("Minor Pentatonic",[3, 2, 2, 3, 2])
}

// Create strings and group them in an array
var strings = [
  new String("highE", 24, 48),
  new String("B", 19, 43),
  new String("G", 15, 39),
  new String("D", 10, 34),
  new String("A", 5, 29),
  new String("lowE", 0, 24)
];

// Create shapes and group them in an array
// The numbers to the left build left outline of the shape
// The numbers to the right build the right outline of the shape
// var origShapes = [
//   new Shape([125,100,75,50,25,0, 1,26,52,77,102,126]),
//   new Shape([126,102,77,52,26,1, 3,28,54,78,103,128]),
//   new Shape([128,103,78,54,28,3, 5,30,55,80,105,130]),
//   new Shape([130,105,80,55,30,5, 7,31,57,82,107,132]),
//   new Shape([132,107,82,57,31,7, 8,33,59,84,108,133]),
//   new Shape([133,108,84,59,33,8, 10,35,60,85,110,135]),
//   new Shape([135,110,85,60,35,10, 12,37,62,87,112,137]),
//   new Shape([137,112,87,62,37,12, 13,38,64,89,114,138]),
//   new Shape([138,114,89,64,38,13, 15,40,66,90,115,140]),
//   new Shape([140,115,90,66,40,15, 17,42,67,92,117,142]),
//   new Shape([142,117,92,67,42,17, 19,43,69,94,119,144]),
//   new Shape([144,119,94,69,43,19, 20,45,71,96,120,145]),
//   new Shape([145,120,96,71,45,20, 22,47,72,97,122,147]),
//   new Shape([147,122,97,72,47,22, 24,49,74,99,124,149])
// ];
// console.log(origShapes);
// new Shape([1, -20, ])

// drawShape(fret[127], shapeA);

// Define shape patterns

// Draw shape patterns from a given starting note
var noteSpacing = 25;
var stringSpacing = 20
// Create fret objects and push them into frets array
for (var i = 0; i < strings.length; i++) {
  var currentString = strings[i];
  var stringDistance = (i * stringSpacing) + 125;
  for (var n = currentString.low; n <= currentString.high; n++) {
    var noteDistance = ((n * noteSpacing) + 235) - (currentString.low * noteSpacing);
    var note = notes[n];
    frets.push(new Fret(noteDistance, stringDistance, note, currentString));
  }
}


var shadowFrets = [];
var originalXPosition = frets[0].x - (25 * noteSpacing);
var xPosition = originalXPosition;

for (var i = 0; i < strings.length; i++) {
  var stringDistance = (i * stringSpacing) + 125;
  for (var n = 0; n < 78; n++) {
    shadowFrets.push(new ShadowFret(xPosition, stringDistance));
    xPosition += noteSpacing;
  }
  xPosition = originalXPosition;
}

console.log(shadowFrets);
console.log(frets[100]);
console.log(shadowFrets[337]);

// Create 14 shapes with 12 zeroes as shape frets
var shapes = [
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0]),
  new Shape([0,0,0,0,0,0,0,0,0,0,0,0])
];
// Determine lowest active fret
// loop through all frets
// Check each fret to see if it's active
// Save the id of the first active fret to a variable
setScale(8, modes.lydian.pattern);
var currentKey = 8;
for (var i = 0; i < frets.length; i++) {
  if (frets[i].active) {
    firstActiveFret = i;
    console.log(firstActiveFret);
    break;
  }
}

drawLines = function() {
  for (var i = 0; i < shapes.length; i++) {
    var currentShape = shapes[i].frets;
    var currentShapeArray = [];
    for (var item in currentShape) {
      currentShapeArray.push(frets[currentShape[item]]);
    }
    generateShape(currentShapeArray);
  }
}

var stringIndices = [125, 100, 75, 50, 25, 0, 0, 25, 50, 75, 100, 125];
// Add index of laf to each shape fret
// Loop through the array of frets on the shape
// Add firstActiveFret to each
// Add base index of all 6 strings
for (var i = 0; i < shapes[0].frets.length; i++) {
  shapes[0].frets[i] += firstActiveFret;
  shapes[0].frets[i] += stringIndices[i];
}


shapes[0].frets[6] += parseInt(modes.lydian.pattern.slice(2,3));
shapes[0].frets[7] += parseInt(modes.lydian.pattern.slice(6,7));
shapes[0].frets[8] += parseInt(modes.lydian.pattern.slice(4,5));
shapes[0].frets[9] += parseInt(modes.lydian.pattern.slice(1,2));
shapes[0].frets[10] += parseInt(modes.lydian.pattern.slice(5,6));
shapes[0].frets[11] += parseInt(modes.lydian.pattern.slice(2,3));
// console.log(shape1.frets);
shapes[1].frets[0] += parseInt(shapes[0].frets.slice(11,12));
shapes[1].frets[1] += parseInt(shapes[0].frets.slice(10,11));
shapes[1].frets[2] += parseInt(shapes[0].frets.slice(9,10));
shapes[1].frets[3] += parseInt(shapes[0].frets.slice(8,9));
shapes[1].frets[4] += parseInt(shapes[0].frets.slice(7,8));
shapes[1].frets[5] += parseInt(shapes[0].frets.slice(6,7));
shapes[1].frets[6] += parseInt(shapes[0].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(3,4));
shapes[1].frets[7] += parseInt(shapes[0].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(0,1));
shapes[1].frets[8] += parseInt(shapes[0].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(5,6));
shapes[1].frets[9] += parseInt(shapes[0].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(2,3));
shapes[1].frets[10] += parseInt(shapes[0].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(6,7));
shapes[1].frets[11] += parseInt(shapes[0].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(3,4));
// console.log(shape2.frets);
shapes[2].frets[0] += parseInt(shapes[1].frets.slice(11,12));
shapes[2].frets[1] += parseInt(shapes[1].frets.slice(10,11));
shapes[2].frets[2] += parseInt(shapes[1].frets.slice(9,10));
shapes[2].frets[3] += parseInt(shapes[1].frets.slice(8,9));
shapes[2].frets[4] += parseInt(shapes[1].frets.slice(7,8));
shapes[2].frets[5] += parseInt(shapes[1].frets.slice(6,7));
shapes[2].frets[6] += parseInt(shapes[1].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(4,5));
shapes[2].frets[7] += parseInt(shapes[1].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(1,2));
shapes[2].frets[8] += parseInt(shapes[1].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(6,7));
shapes[2].frets[9] += parseInt(shapes[1].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(3,4));
shapes[2].frets[10] += parseInt(shapes[1].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(0,1));
shapes[2].frets[11] += parseInt(shapes[1].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(4,5));
// console.log(shape3.frets);
shapes[3].frets[0] += parseInt(shapes[2].frets.slice(11,12));
shapes[3].frets[1] += parseInt(shapes[2].frets.slice(10,11));
shapes[3].frets[2] += parseInt(shapes[2].frets.slice(9,10));
shapes[3].frets[3] += parseInt(shapes[2].frets.slice(8,9));
shapes[3].frets[4] += parseInt(shapes[2].frets.slice(7,8));
shapes[3].frets[5] += parseInt(shapes[2].frets.slice(6,7));
shapes[3].frets[6] += parseInt(shapes[2].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(5,6));
shapes[3].frets[7] += parseInt(shapes[2].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(2,3));
shapes[3].frets[8] += parseInt(shapes[2].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(0,1));
shapes[3].frets[9] += parseInt(shapes[2].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(4,5));
shapes[3].frets[10] += parseInt(shapes[2].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(1,2));
shapes[3].frets[11] += parseInt(shapes[2].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(5,6));
// console.log(shape4.frets);
shapes[4].frets[0] += parseInt(shapes[3].frets.slice(11,12));
shapes[4].frets[1] += parseInt(shapes[3].frets.slice(10,11));
shapes[4].frets[2] += parseInt(shapes[3].frets.slice(9,10));
shapes[4].frets[3] += parseInt(shapes[3].frets.slice(8,9));
shapes[4].frets[4] += parseInt(shapes[3].frets.slice(7,8));
shapes[4].frets[5] += parseInt(shapes[3].frets.slice(6,7));
shapes[4].frets[6] += parseInt(shapes[3].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(6,7));
shapes[4].frets[7] += parseInt(shapes[3].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(3,4));
shapes[4].frets[8] += parseInt(shapes[3].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(1,2));
shapes[4].frets[9] += parseInt(shapes[3].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(5,6));
shapes[4].frets[10] += parseInt(shapes[3].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(2,3));
shapes[4].frets[11] += parseInt(shapes[3].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(6,7));
// console.log(shape5.frets);
shapes[5].frets[0] += parseInt(shapes[4].frets.slice(11,12));
shapes[5].frets[1] += parseInt(shapes[4].frets.slice(10,11));
shapes[5].frets[2] += parseInt(shapes[4].frets.slice(9,10));
shapes[5].frets[3] += parseInt(shapes[4].frets.slice(8,9));
shapes[5].frets[4] += parseInt(shapes[4].frets.slice(7,8));
shapes[5].frets[5] += parseInt(shapes[4].frets.slice(6,7));
shapes[5].frets[6] += parseInt(shapes[4].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(0,1));
shapes[5].frets[7] += parseInt(shapes[4].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(4,5));
shapes[5].frets[8] += parseInt(shapes[4].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(2,3));
shapes[5].frets[9] += parseInt(shapes[4].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(6,7));
shapes[5].frets[10] += parseInt(shapes[4].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(3,4));
shapes[5].frets[11] += parseInt(shapes[4].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(0,1));
// console.log(shape6.frets);
shapes[6].frets[0] += parseInt(shapes[5].frets.slice(11,12));
shapes[6].frets[1] += parseInt(shapes[5].frets.slice(10,11));
shapes[6].frets[2] += parseInt(shapes[5].frets.slice(9,10));
shapes[6].frets[3] += parseInt(shapes[5].frets.slice(8,9));
shapes[6].frets[4] += parseInt(shapes[5].frets.slice(7,8));
shapes[6].frets[5] += parseInt(shapes[5].frets.slice(6,7));
shapes[6].frets[6] += parseInt(shapes[5].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(1,2));
shapes[6].frets[7] += parseInt(shapes[5].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(5,6));
shapes[6].frets[8] += parseInt(shapes[5].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(3,4));
shapes[6].frets[9] += parseInt(shapes[5].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(0,1));
shapes[6].frets[10] += parseInt(shapes[5].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(4,5));
shapes[6].frets[11] += parseInt(shapes[5].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(1,2));
// console.log(shape7.frets);
shapes[7].frets[0] += parseInt(shapes[6].frets.slice(11,12));
shapes[7].frets[1] += parseInt(shapes[6].frets.slice(10,11));
shapes[7].frets[2] += parseInt(shapes[6].frets.slice(9,10));
shapes[7].frets[3] += parseInt(shapes[6].frets.slice(8,9));
shapes[7].frets[4] += parseInt(shapes[6].frets.slice(7,8));
shapes[7].frets[5] += parseInt(shapes[6].frets.slice(6,7));
shapes[7].frets[6] += parseInt(shapes[6].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(2,3));
shapes[7].frets[7] += parseInt(shapes[6].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(6,7));
shapes[7].frets[8] += parseInt(shapes[6].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(4,5));
shapes[7].frets[9] += parseInt(shapes[6].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(1,2));
shapes[7].frets[10] += parseInt(shapes[6].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(5,6));
shapes[7].frets[11] += parseInt(shapes[6].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(2,3));
// console.log(shape8.frets);
shapes[8].frets[0] += parseInt(shapes[7].frets.slice(11,12));
shapes[8].frets[1] += parseInt(shapes[7].frets.slice(10,11));
shapes[8].frets[2] += parseInt(shapes[7].frets.slice(9,10));
shapes[8].frets[3] += parseInt(shapes[7].frets.slice(8,9));
shapes[8].frets[4] += parseInt(shapes[7].frets.slice(7,8));
shapes[8].frets[5] += parseInt(shapes[7].frets.slice(6,7));
shapes[8].frets[6] += parseInt(shapes[7].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(3,4));
shapes[8].frets[7] += parseInt(shapes[7].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(0,1));
shapes[8].frets[8] += parseInt(shapes[7].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(5,6));
shapes[8].frets[9] += parseInt(shapes[7].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(2,3));
shapes[8].frets[10] += parseInt(shapes[7].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(6,7));
shapes[8].frets[11] += parseInt(shapes[7].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(3,4));
// console.log(shape9.frets);
shapes[9].frets[0] += parseInt(shapes[8].frets.slice(11,12));
shapes[9].frets[1] += parseInt(shapes[8].frets.slice(10,11));
shapes[9].frets[2] += parseInt(shapes[8].frets.slice(9,10));
shapes[9].frets[3] += parseInt(shapes[8].frets.slice(8,9));
shapes[9].frets[4] += parseInt(shapes[8].frets.slice(7,8));
shapes[9].frets[5] += parseInt(shapes[8].frets.slice(6,7));
shapes[9].frets[6] += parseInt(shapes[8].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(4,5));
shapes[9].frets[7] += parseInt(shapes[8].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(1,2));
shapes[9].frets[8] += parseInt(shapes[8].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(6,7));
shapes[9].frets[9] += parseInt(shapes[8].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(3,4));
shapes[9].frets[10] += parseInt(shapes[8].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(0,1));
shapes[9].frets[11] += parseInt(shapes[8].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(4,5));
// console.log(shape10.frets);
shapes[10].frets[0] += parseInt(shapes[9].frets.slice(11,12));
shapes[10].frets[1] += parseInt(shapes[9].frets.slice(10,11));
shapes[10].frets[2] += parseInt(shapes[9].frets.slice(9,10));
shapes[10].frets[3] += parseInt(shapes[9].frets.slice(8,9));
shapes[10].frets[4] += parseInt(shapes[9].frets.slice(7,8));
shapes[10].frets[5] += parseInt(shapes[9].frets.slice(6,7));
shapes[10].frets[6] += parseInt(shapes[9].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(5,6));
shapes[10].frets[7] += parseInt(shapes[9].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(2,3));
shapes[10].frets[8] += parseInt(shapes[9].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(0,1));
shapes[10].frets[9] += parseInt(shapes[9].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(4,5));
shapes[10].frets[10] += parseInt(shapes[9].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(1,2));
shapes[10].frets[11] += parseInt(shapes[9].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(5,6));
// console.log(shape11.frets);
shapes[11].frets[0] += parseInt(shapes[10].frets.slice(11,12));
shapes[11].frets[1] += parseInt(shapes[10].frets.slice(10,11));
shapes[11].frets[2] += parseInt(shapes[10].frets.slice(9,10));
shapes[11].frets[3] += parseInt(shapes[10].frets.slice(8,9));
shapes[11].frets[4] += parseInt(shapes[10].frets.slice(7,8));
shapes[11].frets[5] += parseInt(shapes[10].frets.slice(6,7));
shapes[11].frets[6] += parseInt(shapes[10].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(6,7));
shapes[11].frets[7] += parseInt(shapes[10].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(3,4));
shapes[11].frets[8] += parseInt(shapes[10].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(1,2));
shapes[11].frets[9] += parseInt(shapes[10].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(5,6));
shapes[11].frets[10] += parseInt(shapes[10].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(2,3));
shapes[11].frets[11] += parseInt(shapes[10].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(6,7));
// console.log(shape12.frets);
shapes[12].frets[0] += parseInt(shapes[11].frets.slice(11,12));
shapes[12].frets[1] += parseInt(shapes[11].frets.slice(10,11));
shapes[12].frets[2] += parseInt(shapes[11].frets.slice(9,10));
shapes[12].frets[3] += parseInt(shapes[11].frets.slice(8,9));
shapes[12].frets[4] += parseInt(shapes[11].frets.slice(7,8));
shapes[12].frets[5] += parseInt(shapes[11].frets.slice(6,7));
shapes[12].frets[6] += parseInt(shapes[11].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(0,1));
shapes[12].frets[7] += parseInt(shapes[11].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(4,5));
shapes[12].frets[8] += parseInt(shapes[11].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(2,3));
shapes[12].frets[9] += parseInt(shapes[11].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(6,7));
shapes[12].frets[10] += parseInt(shapes[11].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(3,4));
shapes[12].frets[11] += parseInt(shapes[11].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(0,1));
// console.log(shape13.frets);
shapes[13].frets[0] += parseInt(shapes[12].frets.slice(11,12));
shapes[13].frets[1] += parseInt(shapes[12].frets.slice(10,11));
shapes[13].frets[2] += parseInt(shapes[12].frets.slice(9,10));
shapes[13].frets[3] += parseInt(shapes[12].frets.slice(8,9));
shapes[13].frets[4] += parseInt(shapes[12].frets.slice(7,8));
shapes[13].frets[5] += parseInt(shapes[12].frets.slice(6,7));
shapes[13].frets[6] += parseInt(shapes[12].frets.slice(6,7)) + parseInt(modes.lydian.pattern.slice(1,2));
shapes[13].frets[7] += parseInt(shapes[12].frets.slice(7,8)) + parseInt(modes.lydian.pattern.slice(5,6));
shapes[13].frets[8] += parseInt(shapes[12].frets.slice(8,9)) + parseInt(modes.lydian.pattern.slice(3,4));
shapes[13].frets[9] += parseInt(shapes[12].frets.slice(9,10)) + parseInt(modes.lydian.pattern.slice(0,1));
shapes[13].frets[10] += parseInt(shapes[12].frets.slice(10,11)) + parseInt(modes.lydian.pattern.slice(4,5));
shapes[13].frets[11] += parseInt(shapes[12].frets.slice(11,12)) + parseInt(modes.lydian.pattern.slice(1,2));
// console.log(shape14.frets);
console.log(shapes);
// Add step values from mode array based on loop of mode
// Save mode index pattern as a variable
// loop through second half of shape fret array
// Add mode step values to frets based on mode index pattern
// generate other shapes based on first
// maybe use reverse of last half of previous shape to start new shape

// 4. DEFINE FUNCTIONS -----------------

// Calculates a scale by key and mode and activates it on the frets
function setScale(key, mode) {
  var foundScale = getScale(key, mode);
  setOctave(key);
  activateFrets(foundScale);
}

// Deactivates all frets to make blank slate
function clearFretSelection() {
  for (var f = 0; f < frets.length; f++) {
    frets[f].active = false;
  }
}

// Sets octave range relative to key
function setOctave(key) {
  for (var i = 0; i < frets.length; i++) {
    var id = frets[i].note.id;
    var counter = 0;
    if (frets[i]) {
      for (var j = 0; j < 5; j++) {
        if (id >= key + counter -12 && id < key + counter) {
          frets[i].octave = j;
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
    for (var f = 0; f < frets.length; f++) {
      if (frets[f].note == foundScale[i]) {
        frets[f].active = true;
      }
    }
  }
}

function processInput() {
  // Grab the key value from the key select fields
  key = parseInt(keyValueField.selectedIndex);
  // Grab the name of the key from the text content of the option element
  currentKeyName = keyValueField.options[keyValueField.selectedIndex].textContent;
  // Grab the current mode using the value from the mode select field
  currentMode = modes[scaleValueField.value];
  // Calculate and set the scale and display it in the console
  setScale(key, currentMode.pattern);
}

// 5. SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION -----------------

// Grab the select fields and buttons from the HTML document
var keyValueField = document.getElementById("key-value");
var scaleValueField = document.getElementById("scale-value");
var showButton = document.getElementById("show-scale");
var clearButton = document.getElementById("clear-scale");
var showLines = document.getElementById("show-lines");
var clearLines = document.getElementById("clear-lines");

keyValueField.addEventListener("change", processInput);
scaleValueField.addEventListener("change", processInput);
// When the show button is clicked, do the following...
showButton.addEventListener("click", processInput);
// Clear fretboard and updateDisplay
clearButton.addEventListener("click", clearFretSelection);
showLines.addEventListener("click", function() {
  linesVisible = true;
});
clearLines.addEventListener("click", function() {
  linesVisible = false;
});

// Required P5 function runs once to initialize setup

function setup() {
  createCanvas(900, 450);
}

function mousePressed() {
  for (var i = 0; i < frets.length; i++) {
    frets[i].clicked();
  }
}

function generateShape(fretArray) {
  // create empty shape array
  var shapeArray = [];
  // loop through the passed in frets
  for (var i = 0; i < fretArray.length; i++) {
    var coordinates = [];
    // Get x and y values from the frets and
    // save them in fretArray[];
    coordinates.push(fretArray[i].x);
    coordinates.push(fretArray[i].y);
    // Add them to the overall shape array
    shapeArray.push(coordinates);
  }
  drawShape(shapeArray);
}

// Pass in shapeArray from Fret.prototype.drawLines() and display shape
function drawShape(shapeArray) {
  push();
  beginShape();
  noFill();
  stroke(256);
  strokeWeight(2);
  strokeJoin(ROUND);
  for (i = 0; i < shapeArray.length; i++) {
    vertex(shapeArray[i][0],shapeArray[i][1]);
  }
  endShape(CLOSE);
  pop();
}

// Required P5 function loops forever
function draw() {
  background(0);
  if (linesVisible) {
    for (var i = 0; i < frets.length; i++) {
      drawLines();
    }
  }
  for (var i = 0; i < frets.length; i++) {
    frets[i].displayWithColor();
    frets[i].attachNotes();
  }
}

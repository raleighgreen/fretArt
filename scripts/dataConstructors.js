//----------------------------------------------------------
//---------------------- Data Contrustors ------------------

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
  new String("lowE", 0, 24)
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

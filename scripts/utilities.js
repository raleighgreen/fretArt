// Algorithm to find scale within a set of notes
function getScale(key, scale) {
  var foundScale = [];
  var modeIndex = 0;
  var noteInKey = key;
  // var octaveNum = octave;
  // console.log(noteInKey);

  while (noteInKey < fretArt.notes.length) {
    var currentNote = fretArt.notes[noteInKey];
    // Reset modeIndex to 0 if outside of scale range
    if (modeIndex >= scale.length) {
      modeIndex = 0;
    }
    // Push note object to the foundScale array
    foundScale.push(currentNote);
    noteInKey += scale[modeIndex];
    modeIndex++;
  }

  // Remove first note from foundScale in order to avoid doubling
  foundScale.splice(0,1);
  scale.reverse();
  noteInKey = key;
  modeIndex = 0;

  while (noteInKey >= 0) {
    currentNote = fretArt.notes[noteInKey];
    foundScale.unshift(currentNote);
    noteInKey -= scale[modeIndex];
    modeIndex++;
  }
  // Reset scale
  scale.reverse();
  return foundScale;
}

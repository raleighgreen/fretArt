// Algorithm to find scale within a set of notes
function getScale(key, scale) {
  var foundScale = [];
  var modeIndex = 0;
  var noteInKey = key;

  while (noteInKey < notes.length) {
    var currentNote = notes[noteInKey];
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
    currentNote = notes[noteInKey];
    foundScale.unshift(currentNote);
    noteInKey -= scale[modeIndex];
    modeIndex++;
  }
  // Reset scale
  scale.reverse();
  return foundScale;
}

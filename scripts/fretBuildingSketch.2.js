// looking for ways to build a note object that has both default properties
// and unique properties.

// build a template object that contains properties (and methods) shared by
// every note.
var noteTemplate = {
  ovalButton: "ovalButton.png",
  dotButton: "dotButton.png",
  ovalButtonLight: function() {
    console.log('ovalButtonLight');
  },
  dotButtonLight: function() {
    console.log('dotButtonLight');
  }
};

// build a note with a function constructor.
// this individual note contains properties individual to that note.
function IndividualNote() {
  this.noteName = "Eb";
  this.scaleDegree = "b3";
  this.dotColor = "purple";
  this.audioFile = "Eb.mp3";
  this.position = 100,200;
}
// the noteTemplate object is connected to the IndividualNote function constructor in order to combine their properties.
IndividualNote.prototype = noteTemplate;

// create a new IndividualNote object with the 'new' keyword.
var note = new IndividualNote();

// call this function to display note contents
function noteContents() {
  for (var prop in note) {
    if( note.hasOwnProperty( prop ) ) {
      document.write("note." + prop + " = " + note[prop] + "<br>");
    }
  }
}

noteContents();

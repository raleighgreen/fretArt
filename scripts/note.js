function Note(id, audioFile, letterNum) {
  this.id = id;
  this.audioFile = document.getElementById("_" + audioFile);
  this.letterNum = letterNum;
}

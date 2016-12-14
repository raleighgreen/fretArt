// Make an empty array to hold currentMode note id's
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  var keyMap = {
    "z": 0,
    "x": 1,
    "c": 2,
    "v": 3,
    "b": 4,
    "n": 5,
    "m": 6,
    ",": 7,
    ".": 8,
    "/": 9,
    "a": 7,
    "s": 8,
    "d": 9,
    "f": 10,
    "g": 11,
    "h": 12,
    "j": 13,
    "k": 14,
    "l": 15,
    ";": 16,
    "q": 14,
    "w": 15,
    "e": 16,
    "r": 17,
    "t": 18,
    "y": 19,
    "u": 20,
    "i": 21,
    "o": 22,
    "p": 23,
    "1": 21,
    "2": 22,
    "3": 23,
    "4": 24,
    "5": 25,
    "6": 26,
    "7": 27,
    "8": 28,
    "9": 29,
    "0": 30
  };
  fretArt.foundScale[keyMap[event.key]].audioFile.play();
  octaveRestrictor(keyMap[event.key]);
  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '32') {
      if (!pedalTonePlay) {
        turnOnButtonStyle(document.getElementById("play-button"));
        turnOffButtonStyle(document.getElementById("stop-button"));
        pedalTonePlay = true;
      } else {
        turnOffButtonStyle(document.getElementById("play-button"));
        turnOnButtonStyle(document.getElementById("stop-button"));
        for (var i = 0; i < fretArt.frets.length; i++) {
          fretArt.frets[i].playing = false;
        }
        pedalTonePlay = false;
      }
    }
    else if (e.keyCode == '38') {
        // up arrow
        var scaleIndex = document.getElementById("scale-value");
        // the scaleCounter 20 below needs to be hardcoded (its the id of the last
        // option in #scale-value).
        if (scaleIndex.selectedIndex == 0){
          scaleCounter = 20;
          document.getElementById(scaleCounter).selected = true;
        } else {
          scaleCounter -= 1;
          document.getElementById(scaleCounter).selected = true;
        }
        processInput();
        keyAndCurrentScaleDisplay()
        for (var f = 0; f < fretArt.frets.length; f++) {
          if (fretArt.frets[f].active) {
            setScale(fretArt.currentKey, fretArt.currentMode.pattern);
          }
        }
        isolateScaleIds(fretArt.foundScaleIds);
        buildShapes();
      arrowUp.style.transition = "opacity .1s";
      arrowUp.style.opacity = 1;
      setTimeout(function(){ arrowUp.style.opacity = .5; }, 150);
      keyScaleShapeProcessor();
    }
    else if (e.keyCode == '40') {
      // down arrow
      var scaleIndex = document.getElementById("scale-value");
      // the number 22 below needs to be hardcoded (its the nuber of id'd options in
      // #scale-value plus the number of disabled options).
      if (scaleIndex.selectedIndex < 22){
        scaleCounter += 1;
        document.getElementById(scaleCounter).selected = true;
      } else {
        scaleCounter = 0;
        document.getElementById(scaleCounter).selected = true;
      }
      processInput();
      keyAndCurrentScaleDisplay()
      for (var f = 0; f < fretArt.frets.length; f++) {
        if (fretArt.frets[f].active) {
          setScale(fretArt.currentKey, fretArt.currentMode.pattern);
        }
      }
      isolateScaleIds(fretArt.foundScaleIds);
      buildShapes();
      arrowDown.style.transition = "opacity .1s";
      arrowDown.style.opacity = 1;
      setTimeout(function(){ arrowDown.style.opacity = .5; }, 150);
      keyScaleShapeProcessor();
    }
    else if (e.keyCode == '37') {
     // left arrow
     var keyIndex = document.getElementById("key-value");
     if (fretArt.currentKey > 0){
       keyIndex.selectedIndex -= 1;
       fretArt.currentKey -= 1;
     } else {
       keyIndex.selectedIndex = 11;
     }
     processInput();
     // When new key is chosen, update pedal tone key text with the currentKey
     pedalToneKeyDisplay();
     keyAndCurrentScaleDisplay();
     for (var f = 0; f < fretArt.frets.length; f++) {
       if (fretArt.frets[f].active) {
         setScale(fretArt.currentKey, fretArt.currentMode.pattern);
       }
     }
     if (pedalTonePlay) {
       for (var i = 0; i < fretArt.frets.length; i++) {
         if (fretArt.currentKeyName == fretArt.frets[i].noteName && fretArt.frets[i].string.name == "lowE") {
           fretArt.frets[i].playing = true;
           break;
         }
       }
     }
     isolateScaleIds(fretArt.foundScaleIds);
     buildShapes();
     arrowLeft.style.transition = "opacity .1s";
     arrowLeft.style.opacity = 1;
     setTimeout(function(){ arrowLeft.style.opacity = .5; }, 150);
     keyScaleShapeProcessor();
    }
    else if (e.keyCode == '39') {
      // right arrow
      var keyIndex = document.getElementById("key-value");
      if (fretArt.currentKey <= 10){
        keyIndex.selectedIndex += 1;
        fretArt.currentKey += 1;
      } else if (fretArt.currentKey = 10) {
        keyIndex.selectedIndex = 0;
      }
      processInput();
      // When new key is chosen, update pedal tone key text with the currentKey
      pedalToneKeyDisplay();
      keyAndCurrentScaleDisplay();
      for (var f = 0; f < fretArt.frets.length; f++) {
        if (fretArt.frets[f].active) {
          setScale(fretArt.currentKey, fretArt.currentMode.pattern);
        }
      }
      if (pedalTonePlay) {
        for (var i = 0; i < fretArt.frets.length; i++) {
          if (fretArt.currentKeyName == fretArt.frets[i].noteName && fretArt.frets[i].string.name == "lowE") {
            fretArt.frets[i].playing = true;
            break;
          }
        }
      }
      isolateScaleIds(fretArt.foundScaleIds);
      buildShapes();
      arrowRight.style.transition = "opacity .1s";
      arrowRight.style.opacity = 1;
      setTimeout(function(){ arrowRight.style.opacity = .5; }, 150);
      keyScaleShapeProcessor();
  }
}

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
    "'": 17,
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
    "[": 24,
    "]": 25,
    "\\": 26,
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

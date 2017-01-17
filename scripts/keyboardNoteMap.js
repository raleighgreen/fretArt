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
      fretArt.scaleIndex = document.getElementById("scale-value");
      // the scaleCounter 20 below needs to be hardcoded (its the id of the last
      // option in #scale-value).
      if (fretArt.scaleIndex.selectedIndex == 0){
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
      processInput();
      // down arrow
      fretArt.scaleIndex = document.getElementById("scale-value");
      // the number 22 below needs to be hardcoded (its the nuber of id'd options in
      // #scale-value plus the number of disabled options).
      if (fretArt.scaleIndex.selectedIndex <= 41){
        // console.log(fretArt.scaleIndex.selectedIndex);
        scaleCounter += 1;
        document.getElementById(scaleCounter).selected = true;
        // console.log(scaleCounter);
      } else {
        scaleCounter = 0;
        document.getElementById(scaleCounter).selected = true;
      }
      keyAndCurrentScaleDisplay();
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
     var keyIndex = document.getElementById("keyLetterName");
     if (fretArt.currentKey > 0){
       var currentKeyHolder = null;
       // Loop through fretArt.keyNameHolder
       for (var i = 0; i < fretArt.keyNameHolder.length; i++) {
         // 1. find out which keyLetterName is currently "selected"
         if (fretArt.keyNameHolder[i].getAttributeNode("data-selected").value === "keySelected"){
           // 2. make that keyLetterName's data-selected="not"
           // 3. save it's data-id to a variable currentKeyHolder
           currentKeyHolder = fretArt.keyNameHolder[i].getAttribute("data-id");
           // 4. select the keyLetterName using the data-id number that is one less than the saved data-id variable
           // and make that keyLetterName's data-selected="selected"
         }
       }
       // make all fretArt.keyNameHolder's data-selected value = "not"
       for (var i = 0; i < fretArt.keyNameHolder.length; i++) {
         fretArt.keyNameHolder[i].getAttribute("data-selected").value = "not";
       }
       // make the new keyNameHolder selected by subtracting 1 from currentKeyHolder
       fretArt.keyNameHolder[currentKeyHolder - 1].getAttributeNode("data-selected").value = "keySelected";
       console.log("got through");
       console.log(currentKeyHolder);
      // the code above replicates the code line below:
      //  fretArt.keyNameHolder[i].getAttribute("data-id") -= 1;

       // decrement the currentKey
       fretArt.currentKey -= 1;
     } else {
       // set all keyLetterName's data-selected="not"
       for (var i = 0; fretArt.keyNameHolder.length; i++) {
         fretArt.keyNameHolder[i].getAttributeNode("data-selected").value = "not"
       }
       // set keyLetterName[11]'s data-selected="selected"
       fretArt.keyNameHolder[11].getAttributeNode("data-selected").value = "keySelected";
       // set the currentKey to 11
       fretArt.currentKey = 11;

       // the code above replicates the code line below:
      //  keyIndex.selectedIndex = 11;
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
      var keyIndex = document.getElementById("keyLetterName");
      if (fretArt.currentKey <= 10){
        // Loop through fretArt.keyNameHolder
        for (var i = 0; i < fretArt.keyNameHolder.length; i++) {
          // 1. find out which keyLetterName is currently "selected"
          if (fretArt.keyNameHolder[i].getAttributeNode("data-selected").value === "keySelected"){
            // 2. make that keyLetterName's data-selected="not"
            fretArt.keyNameHolder[i].getAttribute("data-selected").value = "not";
            // 3. save it's data-id to a variable currentKeyHolder
            currentKeyHolder = fretArt.keyNameHolder[i].getAttribute("data-id");
            // 4. select the keyLetterName using the data-id number that is one more than the saved data-id variable
            // and make that keyLetterName's data-selected="selected"
            fretArt.keyNameHolder[currentKeyHolder + 1].getAttributeNode("data-selected").value = "keySelected";
          }
        }
        // the code above replicates the code line below:
        // keyIndex.selectedIndex += 1;

        // increment the currentKey
        fretArt.currentKey += 1;
      } else if (fretArt.currentKey = 10) {
        // set all keyLetterName's data-selected="not"
        for (var i = 0; fretArt.keyNameHolder.length; i++) {
          fretArt.keyNameHolder[i].getAttributeNode("data-selected").value = "not"
        }
        // set keyLetterName[0]'s data-selected="selected"
        fretArt.keyNameHolder[0].getAttributeNode("data-selected").value = "keySelected";
        // set the currentKey to 0
        fretArt.currentKey = 0;

        // the code above replicates the code line below:
        // keyIndex.selectedIndex = 0;
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

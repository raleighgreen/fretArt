document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;
    // toggle pedal tone on/off with the space bar
    if (e.keyCode == '32') {
      togglePedalTone();
    }

    //----------------------------------------------------------
    //---------- Frets and Strings Listeners -------------------

    else if (e.keyCode == '173' || '189') {
      toggleFretButton(fretButton);
    }

    else if (e.keyCode == '61' || '187') {
      toggleStringButton(stringButton);
    }

    //----------------------------------------------------------
    //---------- Scale and Shapes Listeners -------------------

    else if (e.keyCode == '57') {
      toggleScale();
    }

    else if (e.keyCode == '48') {
      toggleShape();
    }

    //----------------------------------------------------------
    //---------- Arrow Key Listeners ---------------------------

    else if (e.keyCode == '38') {
      e.preventDefault()
      // up arrow
      moveScaleUp();
      processInput();
      keyAndCurrentScaleDisplay();
      ifActiveSetScale();
      isolateScaleIds(fretArt.foundScaleIds);
      buildShapes();
      lightUpArrow();
      keyScaleShapeProcessor();
    }
    else if (e.keyCode == '40') {
      e.preventDefault()
      // down arrow
      moveScaleDown();
      processInput();
      keyAndCurrentScaleDisplay();
      ifActiveSetScale();
      isolateScaleIds(fretArt.foundScaleIds);
      buildShapes();
      lightDownArrow();
      keyScaleShapeProcessor();
    }
    else if (e.keyCode == '37') {
      e.preventDefault()
     // left arrow
     moveKeyDown();
     processInput();
     // When new key is chosen, update pedal tone key text with the currentKey
     pedalToneKeyDisplay();
     keyAndCurrentScaleDisplay();
     ifActiveSetScale();
     pedalToneActivator();
     isolateScaleIds(fretArt.foundScaleIds);
     buildShapes();
     lightLeftArrow();
     keyScaleShapeProcessor();
    }
    else if (e.keyCode == '39') {
      e.preventDefault()
      // right arrow
      moveKeyUp();
      processInput();
      // When new key is chosen, update pedal tone key text with the currentKey
      pedalToneKeyDisplay();
      keyAndCurrentScaleDisplay();
      ifActiveSetScale();
      pedalToneActivator();
      isolateScaleIds(fretArt.foundScaleIds);
      buildShapes();
      lightRightArrow();
      keyScaleShapeProcessor();
  }
}

//----------------------------------------------------------
//---------- Keyboard Note Listeners -----------------------

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

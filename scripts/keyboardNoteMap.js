document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;
    // toggle pedal tone on/off with the space bar
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

    //----------------------------------------------------------
    //---------- Frets and Strings Listeners -------------------

    else if (e.keyCode == '189') {
      toggleFretButton(fretButton);
    }

    else if (e.keyCode == '187') {
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
      // up arrow
      moveScaleUp();
      processInput();
      keyAndCurrentScaleDisplay();
      ifActiveSetScale();
      isolateScaleIds(fretArt.foundScaleIds);
      buildShapes();
      lightUpArrows();
      keyScaleShapeProcessor();
    }
    else if (e.keyCode == '40') {
      // down arrow
      moveScaleDown();
      processInput();
      keyAndCurrentScaleDisplay();
      ifActiveSetScale();
      isolateScaleIds(fretArt.foundScaleIds);
      buildShapes();
      lightDownArrows();
      keyScaleShapeProcessor();
    }
    else if (e.keyCode == '37') {
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
     arrowLeft.style.transition = "opacity .1s";
     arrowLeft.style.opacity = 1;
     setTimeout(function(){ arrowLeft.style.opacity = .5; }, 150);
     keyScaleShapeProcessor();
    }
    else if (e.keyCode == '39') {
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
      arrowRight.style.transition = "opacity .1s";
      arrowRight.style.opacity = 1;
      setTimeout(function(){ arrowRight.style.opacity = .5; }, 150);
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

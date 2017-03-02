//------ SET UP DOM EVENT LISTENERS AND WAIT FOR USER ACTION ------

// Grab the select fields and buttons from the HTML document
var arrowElement = document.getElementById('arrow');
var keyField = document.getElementById("keyDiv");
var scaleField = document.getElementById("scalesDiv");
var showScales = document.getElementById("show-scale");
var hideScales = document.getElementById("hide-scale");
var showShapes = document.getElementById("show-shapes");
var hideShapes = document.getElementById("hide-shapes");
var pedalTonePlay = document.getElementById("play-button");
var PedalToneStop = document.getElementById("stop-button");
var fretButton = document.getElementById("fret-button");
var stringButton = document.getElementById("string-button");
var arrowUp = document.getElementById("arrow-up");
var arrowDown = document.getElementById("arrow-down");
var arrowLeft = document.getElementById("arrow-left");
var arrowRight = document.getElementById("arrow-right");
var infoButton = document.getElementById("fretShapesButton");
var infoButtonScreen = document.getElementById('infoDiv');
var blueDiv1Button = document.getElementById('blueDiv1');
var blueDiv2Button = document.getElementById('blueDiv2');
var blueDiv3Button = document.getElementById('blueDiv3');
var blueDiv4Button = document.getElementById('blueDiv4');
var tanDivButton = document.getElementById('tanDiv');
var orangeDivButton = document.getElementById('orangeDiv');
var redDiv1Button = document.getElementById('redDiv1');
var redDiv2Button = document.getElementById('redDiv2');
var purpleDivButton = document.getElementById('purpleDiv');
var startButton = document.getElementById('startButton');
var whatButton = document.getElementById('whatIsButton');
var backButton = document.getElementById('appButton');
var welcomeScreenDiv = document.getElementById('welcomeScreen');
var fadeDiv = document.getElementById('fadeFromBlackDiv');
var sideBarCont = document.getElementById('sideBarContainer');
var fretShapesLogoButton = document.getElementById('fretShapesLogo');
var socialBlock = document.getElementById('social');
var fretNumbers = document.getElementById('fretsBox');

arrowUp.style.opacity = .5;
arrowDown.style.opacity = .5;
arrowLeft.style.opacity = .5;
arrowRight.style.opacity = .5;

// window.addEventListener("load",function() {
// 	// Set a timeout...
// 	setTimeout(function(){
// 		// Hide the address bar!
// 		window.scrollTo(0, 1);
// 	}, 0);
// });


// document.body.addEventListener("touchmove", function(event) {
//     event.preventDefault();
// }, false);

// var meta = document.createElement("meta");
// meta.setAttribute('name', 'viewport');
// meta.setAttribute('content', 'initial-scale=' + (1 / window.devicePixelRatio - .7) + ',user-scalable=no' + ',');
// document.getElementsByTagName('head')[0].appendChild(meta);
//
// document.addEventListener('touchmove', function (e) {
//    e.preventDefault();
//    window.scroll(0, 0);
//    return false;
// }, false);
// fretShapesLogoButton.addEventListener("click", function() {
//   window.location.reload();
// });

startButton.addEventListener("click", function() {
  fretArt.startButtonShowsFirst = false;
  fretArt.guitarBodyDisplay = true;
  hideWelcomeScreen();
  toggleSound();
});

whatButton.addEventListener("click", function() {
  fretArt.startButtonShowsFirst = true;
  hideWelcomeScreen();
  dimLine();
  showInfoScreen();
  sideBarCont.style.visibility = 'hidden';
});

backButton.addEventListener("click", function() {
 fretArt.guitarBodyDisplay = true;
 hideInfoScreen();
 dimLine();
 toggleSound();
 document.getElementById('appButton').style.visibility = 'hidden';
 document.getElementById('fretShapesButton').style.visibility = 'visible';
});

infoButton.addEventListener("click", function() {
  infoScreenToggle();
  dimLine();
  toggleSound();
});

//----------------------------------------------------------
//------ info page invisible div button listeners ----------

blueDiv1Button.addEventListener("mouseover", function() {
  toggleInfoDivs('overlay1', 'text1');
  dimLine();
});
blueDiv1Button.addEventListener("mouseout", function() {
  toggleInfoDivs('overlay1', 'text1');
  dimLine();
});
blueDiv2Button.addEventListener("mouseover", function() {
  toggleInfoDivs('overlay1', 'text1');
  dimLine();
});
blueDiv2Button.addEventListener("mouseout", function() {
  toggleInfoDivs('overlay1', 'text1');
  dimLine();
});
blueDiv3Button.addEventListener("mouseover", function() {
  toggleInfoDivs('overlay1', 'text1');
  dimLine();
});
blueDiv3Button.addEventListener("mouseout", function() {
  toggleInfoDivs('overlay1', 'text1');
  dimLine();
});
blueDiv4Button.addEventListener("mouseover", function() {
  toggleInfoDivs('overlay1', 'text1');
  dimLine();
});
blueDiv4Button.addEventListener("mouseout", function() {
  toggleInfoDivs('overlay1', 'text1');
  dimLine();
});
tanDivButton.addEventListener("mouseover", function() {
  toggleInfoDivs('overlay2', 'text2');
  dimLine();
});
tanDivButton.addEventListener("mouseout", function() {
  toggleInfoDivs('overlay2', 'text2');
  dimLine();
});
orangeDivButton.addEventListener("mouseover", function() {
  toggleInfoDivs('overlay3', 'text3');
  dimLine();
});
orangeDivButton.addEventListener("mouseout", function() {
  toggleInfoDivs('overlay3', 'text3');
  dimLine();
});
redDiv1Button.addEventListener("mouseover", function() {
  toggleInfoDivs('overlay4', 'text4');
  dimLine();
});
redDiv1Button.addEventListener("mouseout", function() {
  toggleInfoDivs('overlay4', 'text4');
  dimLine();
});
redDiv2Button.addEventListener("mouseover", function() {
  toggleInfoDivs('overlay4', 'text4');
  dimLine();
});
redDiv2Button.addEventListener("mouseout", function() {
  toggleInfoDivs('overlay4', 'text4');
  dimLine();
});
purpleDivButton.addEventListener("mouseover", function() {
  toggleInfoDivs('overlay5', 'text5');
  dimLine();
});
purpleDivButton.addEventListener("mouseout", function() {
  toggleInfoDivs('overlay5', 'text5');
  dimLine();
});

//----------------------------------------------------------
//----------------------------------------------------------

scaleField.addEventListener("click", function(e){
  // Reset all fretArt.keyNameHolder Nodes to "not"
  for (var i = 0; i < fretArt.selectedModeNameHolder.length; i++) {
   fretArt.selectedModeNameHolder[i].getAttributeNode("data-selected").value = "notSelected";
   // remove 'target' class from all nodes from scalesDiv
   fretArt.selectedModeNameHolder[i].classList.remove('target');
  }
  // make the "data-selected" attribute of the selected Node ="keySelected"
  e.target.getAttributeNode("data-selected").value = "modeSelected";
  // add a 'target' class to the selected element
  e.target.classList.add('target');

  processInput();
  keyAndCurrentScaleDisplay()
  ifActiveSetScale();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

keyField.addEventListener("click", function(e){
  setKeyIndex();
  // Reset all fretArt.keyNameHolder Nodes to "not"
  for (var i = 0; i < fretArt.selectedKeyNameHolder.length; i++) {
   fretArt.selectedKeyNameHolder[i].getAttributeNode("data-selected").value = "notSelected";
   // remove 'target' class from all nodes from scalesDiv
   fretArt.selectedKeyNameHolder[i].classList.remove('target');

  }
  // make the "data-selected" attribute of the selected Node ="keySelected"
  e.target.getAttributeNode("data-selected").value = "keySelected";
  // add a 'target' class to the selected element
  e.target.classList.add('target');
  fretArt.keyIndex = e.target.id;

  processInput();
  pedalToneKeyDisplay();
  keyAndCurrentScaleDisplay()
  ifActiveSetScale()
  pedalToneActivator();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

//----------------------------------------------------------
//---------- Arrow Button Up Listners ----------------------

arrowUp.addEventListener("mouseover", function() {
  lightUpArrowAndStayLit();
});

arrowUp.addEventListener("mouseout", function() {
  dimUpArrow();
});

arrowUp.addEventListener("click", function() {
  moveScaleUp();
  processInput();
  keyAndCurrentScaleDisplay()
  ifActiveSetScale();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

//----------------------------------------------------------
//---------- Arrow Button Down Listeners -------------------

arrowDown.addEventListener("mouseover", function() {
  lightDownArrowAndStayLit();
});

arrowDown.addEventListener("mouseout", function() {
  dimDownArrow();
});

arrowDown.addEventListener("click", function() {
  moveScaleDown();
  processInput();
  keyAndCurrentScaleDisplay();
  ifActiveSetScale();
  isolateScaleIds(fretArt.foundScaleIds);
  buildShapes();
});

//----------------------------------------------------------
//---------- Arrow Button Left Listeners -------------------

arrowLeft.addEventListener("mouseover", function() {
  lightLeftArrowAndStayLit();
});

arrowLeft.addEventListener("mouseout", function() {
  dimLeftArrow();
});

arrowLeft.addEventListener("click", function() {
  moveKeyDown();
  arrowRightAndLeftProcesses();
});

//----------------------------------------------------------
//---------- Arrow Button Right Listeners ------------------

arrowRight.addEventListener("mouseover", function() {
  lightRightArrowAndStayLit();
});

arrowRight.addEventListener("mouseout", function() {
  dimRightArrow();
});

arrowRight.addEventListener("click", function() {
  moveKeyUp();
  arrowRightAndLeftProcesses();
});

//----------------------------------------------------------
//---------- Fret and String Buttons Listeners -------------

fretButton.addEventListener("click", function() {
  toggleFretButton(fretButton);
});

stringButton.addEventListener("click", function() {
  toggleStringButton(stringButton);
});

//----------------------------------------------------------
//---------- Scale Buttons Listerners ----------------------

// When the show button is clicked, do the following...
showScales.addEventListener("click", function(){
  styleScaleButtonOn();
});

// Clear fretboard and updateDisplay
hideScales.addEventListener("click", function() {
  styleScaleButtonOff();
});

//----------------------------------------------------------
//---------- Shape Buttons Listeners -----------------------

showShapes.addEventListener("click", function() {
  styleShapeButtonOn();
});

hideShapes.addEventListener("click", function() {
  styleShapeButtonOff();
});

//----------------------------------------------------------
//---------- Pedal Tone Buttons Listerners------------------

pedalTonePlay.addEventListener("click", function() {
  pedalToneButtonOn();
});

PedalToneStop.addEventListener("click", function() {
  pedalToneButtonOff();
});

//--------------------------------------------------------------------
//----------------- scale and mode data ------------------------------

// The numbers in the arrays below represent the left-most frets for each mode.
// Placing these on each string provides a starting point with which
// to map the rest of the scale pattern.
//--------------------------- Intervals --------------------

//---------------------------- Triads ----------------------

//------------------------ 7th-chords ----------------------

//--------------------- 5-note Scales ----------------------

// var minPentLowestFrets = [403,324,246,168,91,13];

//--------------------- 6-note Scales ----------------------

// The Whole Tone Scale

//--------------------- 7-note Scales ----------------------

// Major scale modes
var ionianLowestFrets = [402,324,246,168,89,12];
var dorianLowestFrets = [401,323,246,168,89,11];
var phrygianLowestFrets = [401,323,245,167,89,11];
var lydianLowestFrets = [402,324,246,168,90,12];
var mixolydianLowestFrets = [401,324,246,168,89,11];
var aeolienLowestFrets = [401,323,245,168,89,11];
var locrianLowestFrets = [401,323,245,167,89,11];
// Melodic Minor modes
var melMinLowestFrets = [402,323,246,168,89,12];
var phrygianNat6LowestFrets = [401,323,246,167,89,11];
var lydianAugmentedLowestFrets = [402,324,246,168,90,12];
var lydianb7LowestFrets = [401,324,246,168,90,11];
var mixolydianb6LowestFrets = [401,324,245,168,89,11];
var locrianNat2LowestFrets = [401,323,245,168,89,11];
var alteredScaleLowestFrets = [401,323,245,167,88,11];
// Harmonic Minor modes
var harmMinLowestFrets = [402,323,245,168,89,12];
var locrianNat6LowestFrets = [401,323,246,167,89,11];
var ionianSharp5LowestFrets = [402,324,246,168,89,12];
var dorianSharp4LowestFrets = [401,323,246,168,90,11];
var phrygianDominantLowestFrets = [401,324,245,167,89,11];
var lydianSharp2LowestFrets = [402,324,246,169,90,12];
var alteredDominantbb7LowestFrets = [400,323,245,167,88,10];
// Harmonic Major modes
var harmonicMajorLowestFrets = [402,324,245,168,89,12];
var dorianb5LowestFrets = [401,323,246,168,89,11];
var phrygianb4LowestFrets = [401,323,245,167,88,11];
var lydianb3LowestFrets = [402,323,246,168,90,12];
var mixolydianb2LowestFrets = [401,324,246,167,89,11];
var lydianAugmentedSharp2LowestFrets = [402,324,246,169,90,12];
var locrianDim7LowestFrets = [400,323,245,167,89,10];
// Hungarian Min modes
var hungarianMinLowestFrets = [402,323,245,168,90,12];
var mixolydianb5b9LowestFrets = [401,324,246,167,89,11];
var ionianAugSharp2LowestFrets = [402,324,246,169,89,12];
var locrianbb3bb7LowestFrets = [400,322,245,167,89,10];
// the bbText var below isolates the bb's from the locrianbb3bb7 mode directly above
var bbText = '<span class="bbRepositiioner">&#x1d12b;</span>';
/*
var doubleHarmonicMajLowestFrets = [402,324,245,167,89,12];
var lydianSharp2Sharp6LowestFrets = [402,324,247,169,90,12];
var ultraPhrygianLowestFrets = [400,323,245,167,88,10];
*/
//--------------------- 8-note Scales ----------------------

  // var dimishedLowestFrets = [401,323,246,167,90,11];

//--------------------------------------------------------------------
//----- Create modes and group them in an Object ---------------------

// The data from the scales above are placed into each new Mode constructor below:
fretArt.modes = {

//--------------------- 5-note Scales ----------------------

  // "Minor Pentatonic": new Mode("Minor Pentatonic", [3, 2, 2, 3, 2], minPentLowestFrets),

//--------------------- 6-note Scales ----------------------

  // "Whole Tone": new Mode("Whole Tone", [2, 2, 2, 2, 2, 2], wholeToneLowestFrets),

//--------------------- 7-note Scales ----------------------

  "Ionian (Maj Scale)": new Mode("Ionian", [2, 2, 1, 2, 2, 2, 1], ionianLowestFrets),
  "Dorian": new Mode("Dorian", [2, 1, 2, 2, 2, 1, 2], dorianLowestFrets),
  "Phrygian": new Mode("Phrygian", [1, 2, 2, 2, 1, 2, 2], phrygianLowestFrets),
  "Lydian": new Mode("Lydian",[2, 2, 2, 1, 2, 2, 1], lydianLowestFrets),
  "Mixolydian": new Mode("Mixolydian", [2, 2, 1, 2, 2, 1, 2], mixolydianLowestFrets),
  "Aeolien (Nat Min)": new Mode("Aeolien", [2, 1, 2, 2, 1, 2, 2], aeolienLowestFrets),
  "Locrian": new Mode("Locrian",[1, 2, 2, 1, 2, 2, 2], locrianLowestFrets),
//---------------------
  "Melodic Minor": new Mode("Melodic Minor",[2, 1, 2, 2, 2, 2, 1], melMinLowestFrets),
  "Phrygian Nat 6": new Mode("Phrygian &#x266e;6", [1, 2, 2, 2, 2, 1, 2], phrygianNat6LowestFrets),
  "Lydian Augmented": new Mode("Lydian &#x266f;5",[2, 2, 2, 2, 1, 2, 1], lydianAugmentedLowestFrets),
  "Lydian b7": new Mode("Lydian &#9837;7", [2, 2, 2, 1, 2, 1, 2], lydianb7LowestFrets),
  "Mixolydian b6": new Mode("Mixolydian &#9837;6", [2, 2, 1, 2, 1, 2, 2], mixolydianb6LowestFrets),
  "Locrian Nat 2": new Mode("Locrian &#x266e;2",[2, 1, 2, 1, 2, 2, 2], locrianNat2LowestFrets),
  "Super Locrian": new Mode("Super Locrian",[1, 2, 1, 2, 2, 2, 2], alteredScaleLowestFrets),
//---------------------
  "Harmonic Minor": new Mode("Harmonic Minor",[2, 1, 2, 2, 1, 3, 1], harmMinLowestFrets),
  "Locrian Nat 6": new Mode("Locrian &#x266e;6",[1, 2, 2, 1, 3, 1, 2], locrianNat6LowestFrets),
  "Ionian #5": new Mode("Ionian &#x266f;5",[2, 2, 1, 3, 1, 2, 1], ionianSharp5LowestFrets),
  "Dorian #4": new Mode("Dorian &#x266f;4",[2, 1, 3, 1, 2, 1, 2], dorianSharp4LowestFrets),
  "Phrygian Dominant": new Mode("Phrygian Dominant",[1, 3, 1, 2, 1, 2, 2], phrygianDominantLowestFrets),
  "Lydian #2": new Mode("Lydian &#x266f;2",[3, 1, 2, 1, 2, 2, 1], lydianSharp2LowestFrets),
  "Ultra Locrian": new Mode("Ultra Locrian",[1, 2, 1, 2, 2, 1, 3], alteredDominantbb7LowestFrets),
  //---------------------
  "Harmonic Major": new Mode("Harmonic Major", [2, 2, 1, 2, 1, 3, 1], harmonicMajorLowestFrets),
  "Dorian b5": new Mode("Dorian &#9837;5", [2, 1, 2, 1, 3, 1, 2], dorianb5LowestFrets),
  "Phrygian b4": new Mode("Phrygian &#9837;4", [1, 2, 1, 3, 1, 2, 2], phrygianb4LowestFrets),
  "Lydian b3": new Mode("Lydian &#9837;3",[2, 1, 3, 1, 2, 2, 1], lydianb3LowestFrets),
  "Mixolydian b2": new Mode("Mixolydian &#9837;2", [1, 3, 1, 2, 2, 1, 2], mixolydianb2LowestFrets),
  "Lydian Augmented #2": new Mode("Lydian &#x266f;2 &#x266f;5",[3, 1, 2, 2, 1, 2, 1], lydianAugmentedSharp2LowestFrets),
  "Locrian Diminished 7": new Mode("Locrian iminished 7",[1, 2, 2, 1, 2, 1, 3], locrianDim7LowestFrets),
  //---------------------
  "Hungarian Minor": new Mode("Hungarian Minor",[2, 1, 3, 1, 1, 3, 1], hungarianMinLowestFrets),
  "Mixolydian b5 b9": new Mode("Mixolydian &#9837;5 &#9837;9",[1, 3, 1, 1, 3, 1, 2], mixolydianb5b9LowestFrets),
  "Ionian Augmented #2": new Mode("Ionian Augmented &#x266f;2", [3, 1, 1, 3, 1, 2, 1], ionianAugSharp2LowestFrets),
  "Locrian bb3 bb7": new Mode("Locrian " + bbText + " 3 " + bbText + " 7",[1, 1, 3, 1, 2, 1, 3], locrianbb3bb7LowestFrets)
//  "Locrian bb3 bb7": new Mode("Locrian &#x1d12b;3 &#x1d12b;7",[1, 1, 3, 1, 2, 1, 3], locrianbb3bb7LowestFrets)
/*
  "Double Harmonic Major": new Mode("Double Harmonic Major", [1, 3, 1, 2, 1, 3, 1], doubleHarmonicMajLowestFrets),
  "Lydian #2 #6": new Mode("Lydian &#x266f;2 &#x266f;6",[3, 1, 2, 1, 3, 1, 1], lydianSharp2Sharp6LowestFrets),
  "Ultra Phrygian": new Mode("Ultra Phrygian",[1, 2, 1, 3, 1, 1, 3], ultraPhrygianLowestFrets)
*/
//--------------------- 8-note Scales ----------------------

  // "Diminished": new Mode("Diminished",[2, 1, 2, 1, 2, 1, 2, 1], diminishedLowestFrets)

//----------------------------------------------------------

}

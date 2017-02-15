//----------------------------------------------------------
//----------------- scale and mode data --------------------

// The numbers in the arrays below represent the left-most frets for each mode.
// Placing these on each string provides a starting point with which
// to map the rest of the scale pattern.

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

// Create modes and group them in an Object
// The data from the scales above are placed into each new Mode constructor below:
fretArt.modes = {
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
  "Ultra Locrian": new Mode("Ultra Locrian",[1, 2, 1, 2, 2, 1, 3], alteredDominantbb7LowestFrets)
}

var fretArt = {
  frets: [],
  notes: [],
  shapes: [],
  strings: [],
  stringPos: [],
  shadowFrets: [],
  fretsIsShowing: false,
  stringsIsShowing: false,
  foundScale: [],
  foundScaleIds: [],
  filteredScaleIds: [],
  numberOfShapes: 23,
  arrPositionList: null,
  modes: null,
  linesVisible: false,
  invisible: false,
  cPedalPlay: false,
  noteNameList: ["E","F","Gb","G","Ab","A","Bb","B","C","Db","D","Eb"],
  initialStringIndices: null,
  currentKey: null,
  currentKeyName: null,
  currentMode: null,
  scaleButtonStatus: null,
  shapeButtonStatus: null,
  selectedModeNameHolder: null,
  scaleIndex: 0,
  scaleCounter: 0,
  selectedKeyNameHolder: null,
  keyIndex: 8,
  keyCounter: 8,
  infoButtonStatus: false,
  noteProximity: 0,
  startButtonShowsFirst: true,
  startPoint: 1,
  endPoint: 0,
  noteSpacing: 25,
  stringSpacing: 20,
  guitarBodyColor: [0,18,40],
  guitarBodyDisplay: false
}

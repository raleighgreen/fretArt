var fretMarkerDiv = document.getElementById("fretMarkers");
fretMarkerDiv.textContent = '';
var highEdiv = document.getElementById("highEstr");
highEdiv.textContent = '';
var Bdiv = document.getElementById("Bstr");
Bdiv.textContent = '';
var Gdiv = document.getElementById("Gstr");
Gdiv.textContent = '';
var Ddiv = document.getElementById("Dstr");
Ddiv.textContent = '';
var Adiv = document.getElementById("Astr");
Adiv.textContent = '';
var lowEdiv = document.getElementById("lowEstr");
lowEdiv.textContent = '';
var fretLinerDiv = document.getElementById("fretLiner");
fretLinerDiv.textContent = '';


var fretboard = {

  fretMarkers: ['-3-','-5-','-7-','-9-','-12','-15','-17','-19','-21','-24'],

  highEstring: ['E-4','F-4','F#4','G-4','G#4','A-4','A#4','B-4','C-5','C#5','D-5','D#5','E-5','F-5','F#5','G-5','G#5','A-5','A#5','B-5','C-6','C#6','D-6','D#6','E-6'],
  Bstring: ['B-3','C-4','C#4','D-4','D#4','E-4','F-4','F#4','G-4','G#4','A-4','A#4','B-4','C-5','C#5','D-5','D#5','E-5','F-5','F#5','G-5','G#5','A-5','A#5','B-5'],
  Gstring: ['G-3','G#3','A-3','A#3','B-3','C-4','C#4','D-4','D#4','E-4','F-4','F#4','G-4','G#4','A-4','A#4','B-4','C-5','C#5','D-5','D#5','E-5','F-5','F#5','G-5'],
  Dstring: ['D-3','D#3','E-3','F-3','F#3','G-3','G#3','A-3','A#3','B-3','C-4','C#4','D-4','D#4','E-4','F-4','F#4','G-4','G#4','A-4','A#4','B-4','C-5','C#5','D-5'],
  Astring: ['A-2','A#2','B-2','C-3','C#3','D-3','D#3','E-3','F-3','F#3','G-3','G#3','A-3','A#3','B-3','C-4','C#4','D-4','D#4','E-4','F-4','F#4','G-4','G#4','A-4'],
  lowEstring: ['E-2','F-2','F#2','G-2','G#2','A-2','A#2','B-2','C-3','C#3','D-3','D#3','E-3','F-3','F#3','G-3','G#3','A-3','A#3','B-3','C-4','C#4','D-4','D#4','E-4'],

  chromaticScale: function() {

    var marker = this.fretMarkers;
    var highE = this.highEstring;
    var Bstr = this.Bstring;
    var Gstr = this.Gstring;
    var Dstr = this.Dstring;
    var Astr = this.Astring;
    var lowE = this.lowEstring;

    this.highEstring = ['E-4','F-4','F#4','G-4','G#4','A-4','A#4','B-4','C-5','C#5','D-5','D#5','E-5','F-5','F#5','G-5','G#5','A-5','A#5','B-5','C-6','C#6','D-6','D#6','E-6'];
    this.Bstring = ['B-3','C-4','C#4','D-4','D#4','E-4','F-4','F#4','G-4','G#4','A-4','A#4','B-4','C-5','C#5','D-5','D#5','E-5','F-5','F#5','G-5','G#5','A-5','A#5','B-5'];
    this.Gstring = ['G-3','G#3','A-3','A#3','B-3','C-4','C#4','D-4','D#4','E-4','F-4','F#4','G-4','G#4','A-4','A#4','B-4','C-5','C#5','D-5','D#5','E-5','F-5','F#5','G-5'];
    this.Dstring = ['D-3','D#3','E-3','F-3','F#3','G-3','G#3','A-3','A#3','B-3','C-4','C#4','D-4','D#4','E-4','F-4','F#4','G-4','G#4','A-4','A#4','B-4','C-5','C#5','D-5'];
    this.Astring = ['A-2','A#2','B-2','C-3','C#3','D-3','D#3','E-3','F-3','F#3','G-3','G#3','A-3','A#3','B-3','C-4','C#4','D-4','D#4','E-4','F-4','F#4','G-4','G#4','A-4'];
    this.lowEstring = ['E-2','F-2','F#2','G-2','G#2','A-2','A#2','B-2','C-3','C#3','D-3','D#3','E-3','F-3','F#3','G-3','G#3','A-3','A#3','B-3','C-4','C#4','D-4','D#4','E-4'];

    fretMarkerDiv.innerHTML = '-------------------' + marker[0] + '---------' + marker[1] + '---------' + marker[2] + '---------' + marker[3] + '---------------' + marker[4] + '----------------' + marker[5] + '---------' + marker[6] + '---------' + marker[7] + '---------' + marker[8] + '---------------' + marker[9] + '----';
    highEdiv.innerHTML = highE[0] + ' || ' + highE[1] + '  | ' + highE[2] + ' | ' + highE[3] + ' | ' + highE[4] + ' | ' + highE[5] + ' | ' + highE[6] + ' | ' + highE[7] + ' | ' + highE[8] + ' | ' + highE[9] + ' | ' + highE[10] + ' | ' + highE[11] + ' || ' + highE[12] + ' || ' + highE[13] + ' | ' + highE[14] + ' | ' + highE[15] + ' | ' + highE[16] + ' | ' + highE[17] + ' | ' + highE[18] + ' | ' + highE[19] + ' | ' + highE[20] + ' | ' + highE[21] + ' | ' + highE[22] + ' | ' + highE[23] + ' | ' + highE[24] + ' ||';
    Bdiv.innerHTML = Bstr[0] + ' || ' + Bstr[1] + '  | ' + Bstr[2] + ' | ' + Bstr[3] + ' | ' + Bstr[4] + ' | ' + Bstr[5] + ' | ' + Bstr[6] + ' | ' + Bstr[7] + ' | ' + Bstr[8] + ' | ' + Bstr[9] + ' | ' + Bstr[10] + ' | ' + Bstr[11] + ' || ' + Bstr[12] + ' || ' + Bstr[13] + ' | ' + Bstr[14] + ' | ' + Bstr[15] + ' | ' + Bstr[16] + ' | ' + Bstr[17] + ' | ' + Bstr[18] + ' | ' + Bstr[19] + ' | ' + Bstr[20] + ' | ' + Bstr[21] + ' | ' + Bstr[22] + ' | ' + Bstr[23] + ' | ' + Bstr[24] + ' ||';
    Gdiv.innerHTML = Gstr[0] + ' || ' + Gstr[1] + '  | ' + Gstr[2] + ' | ' + Gstr[3] + ' | ' + Gstr[4] + ' | ' + Gstr[5] + ' | ' + Gstr[6] + ' | ' + Gstr[7] + ' | ' + Gstr[8] + ' | ' + Gstr[9] + ' | ' + Gstr[10] + ' | ' + Gstr[11] + ' || ' + Gstr[12] + ' || ' + Gstr[13] + ' | ' + Gstr[14] + ' | ' + Gstr[15] + ' | ' + Gstr[16] + ' | ' + Gstr[17] + ' | ' + Gstr[18] + ' | ' + Gstr[19] + ' | ' + Gstr[20] + ' | ' + Gstr[21] + ' | ' + Gstr[22] + ' | ' + Gstr[23] + ' | ' + Gstr[24] + ' ||';
    Ddiv.innerHTML = Dstr[0] + ' || ' + Dstr[1] + ' | ' + Dstr[2] + ' | ' + Dstr[3] + ' | ' + Dstr[4] + ' | ' + Dstr[5] + ' | ' + Dstr[6] + ' | ' + Dstr[7] + ' | ' + Dstr[8] + ' | ' + Dstr[9] + ' | ' + Dstr[10] + ' | ' + Dstr[11] + ' || ' + Dstr[12] + ' || ' + Dstr[13] + ' | ' + Dstr[14] + ' | ' + Dstr[15] + ' | ' + Dstr[16] + ' | ' + Dstr[17] + ' | ' + Dstr[18] + ' | ' + Dstr[19] + ' | ' + Dstr[20] + ' | ' + Dstr[21] + ' | ' + Dstr[22] + ' | ' + Dstr[23] + ' | ' + Dstr[24] + ' ||';
    Adiv.innerHTML = Astr[0] + ' || ' + Astr[1] + ' | ' + Astr[2] + ' | ' + Astr[3] + ' | ' + Astr[4] + ' | ' + Astr[5] + ' | ' + Astr[6] + ' | ' + Astr[7] + ' | ' + Astr[8] + ' | ' + Astr[9] + ' | ' + Astr[10] + ' | ' + Astr[11] + ' || ' + Astr[12] + ' || ' + Astr[13] + ' | ' + Astr[14] + ' | ' + Astr[15] + ' | ' + Astr[16] + ' | ' + Astr[17] + ' | ' + Astr[18] + ' | ' + Astr[19] + ' | ' + Astr[20] + ' | ' + Astr[21] + ' | ' + Astr[22] + ' | ' + Astr[23] + ' | ' + Astr[24] + ' ||';
    lowEdiv.innerHTML = lowE[0] + ' || ' + lowE[1] + ' | ' + lowE[2] + ' | ' + lowE[3] + ' | ' + lowE[4] + ' | ' + lowE[5] + ' | ' + lowE[6] + ' | ' + lowE[7] + ' | ' + lowE[8] + ' | ' + lowE[9] + ' | ' + lowE[10] + ' | ' + lowE[11] + ' || ' + lowE[12] + ' || ' + lowE[13] + ' | ' + lowE[14] + ' | ' + lowE[15] + ' | ' + lowE[16] + ' | ' + lowE[17] + ' | ' + lowE[18] + ' | ' + lowE[19] + ' | ' + lowE[20] + ' | ' + lowE[21] + ' | ' + lowE[22] + ' | ' + lowE[23] + ' | ' + lowE[24] + ' ||';
    fretLinerDiv.textContent = '---------------------------------------------------------------------------------------------------------------------------------------------------------';
  },
  majorScale: function() {
    var highE = this.highEstring;
    var Bstr = this.Bstring;
    var Gstr = this.Gstring;
    var Dstr = this.Dstring;
    var Astr = this.Astring;
    var lowE = this.lowEstring;

    var b = '---';

    highE[2]=b;highE[4]=b;highE[6]=b;highE[9]=b;highE[11]=b;highE[14]=b;highE[16]=b;highE[18]=b;highE[21]=b;highE[23]=b;
    Bstr[2]=b;Bstr[4]=b;Bstr[7]=b;Bstr[9]=b;Bstr[11]=b;Bstr[14]=b;Bstr[16]=b;Bstr[19]=b;Bstr[21]=b;Bstr[23]=b;
    Gstr[1]=b;Gstr[3]=b;Gstr[6]=b;Gstr[8]=b;Gstr[11]=b;Gstr[13]=b;Gstr[15]=b;Gstr[18]=b;Gstr[20]=b;Gstr[23]=b;
    Dstr[1]=b;Dstr[4]=b;Dstr[6]=b;Dstr[8]=b;Dstr[11]=b;Dstr[13]=b;Dstr[16]=b;Dstr[18]=b;Dstr[20]=b;Dstr[23]=b;
    Astr[1]=b;Astr[4]=b;Astr[6]=b;Astr[9]=b;Astr[11]=b;Astr[13]=b;Astr[16]=b;Astr[18]=b;Astr[21]=b;Astr[23]=b;
    lowE[2]=b;lowE[4]=b;lowE[6]=b;lowE[9]=b;lowE[11]=b;lowE[14]=b;lowE[16]=b;lowE[18]=b;lowE[21]=b;lowE[23]=b;

    this.chromaticScale();
  },
  pentatonicScale: function() {
    var highE = this.highEstring;
    var Bstr = this.Bstring;
    var Gstr = this.Gstring;
    var Dstr = this.Dstring;
    var Astr = this.Astring;
    var lowE = this.lowEstring;

    var b = '---';

    highE[1]=b;highE[2]=b;highE[4]=b;highE[6]=b;highE[7]=b;highE[9]=b;highE[11]=b;highE[13]=b;highE[14]=b;highE[16]=b;highE[18]=b;highE[19]=b;highE[21]=b;highE[23]=b;
    Bstr[0]=b;Bstr[2]=b;Bstr[4]=b;Bstr[6]=b;Bstr[7]=b;Bstr[9]=b;Bstr[11]=b;Bstr[12]=b;Bstr[14]=b;Bstr[16]=b;Bstr[18]=b;Bstr[19]=b;Bstr[21]=b;Bstr[23]=b;
    Gstr[1]=b;Gstr[3]=b;Gstr[4]=b;Gstr[6]=b;Gstr[8]=b;Gstr[10]=b;Gstr[11]=b;Gstr[13]=b;Gstr[15]=b;Gstr[16]=b;Gstr[18]=b;Gstr[20]=b;Gstr[22]=b;Gstr[23]=b;
    Dstr[1]=b;Dstr[3]=b;Dstr[4]=b;Dstr[6]=b;Dstr[8]=b;Dstr[9]=b;Dstr[11]=b;Dstr[13]=b;Dstr[15]=b;Dstr[16]=b;Dstr[18]=b;Dstr[20]=b;Dstr[21]=b;Dstr[23]=b;
    Astr[1]=b;Astr[2]=b;Astr[4]=b;Astr[6]=b;Astr[8]=b;Astr[9]=b;Astr[11]=b;Astr[13]=b;Astr[14]=b;Astr[16]=b;Astr[18]=b;Astr[20]=b;Astr[21]=b;Astr[23]=b;
    lowE[1]=b;lowE[2]=b;lowE[4]=b;lowE[6]=b;lowE[7]=b;lowE[9]=b;lowE[11]=b;lowE[13]=b;lowE[14]=b;lowE[16]=b;lowE[18]=b;lowE[19]=b;lowE[21]=b;lowE[23]=b;

    this.chromaticScale();
  }
};

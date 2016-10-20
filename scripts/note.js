// function Fret(x, y, number) {
//   var noteOnColor = color(93,81,214);
//   var noteOffColor = color(30,28,52);
//   var notePlayColor = color(207,221,50);
//
//   this.x = x;
//   this.y = y;
//   this.active = false;
//   this.playColor = false;
//   this.col = noteOnColor;
//   this.fretArrayNumber = number + 1;
//   this.audioNote = document.getElementById("_1");
//
//   this.display = function() {
//     if (this.active) {
//       this.col = noteOnColor;
//     } else if (this.playColor) {
//       this.col = notePlayColor;
//     } else {
//       this.col = noteOffColor;
//     }
//     fill(this.col);
//     ellipse(this.x, this.y, 7, 7);
//   };
//
//   this.clicked = function() {
//     var d = dist(mouseX, mouseY, this.x, this.y);
//     var note = this.fretArrayNumber;
//     if (d < 5 ) {
//       var fretNum = this.fretArrayNumber - 1;
//       var audio = frets[fretNum].audioNote;
//
//       if (this.active === true){
//         this.active = false;
//         this.playColor = true;
//         setTimeout(function() {
//           frets[fretNum].active = true;
//         }, 2700);
//       } else {
//         this.playColor = true;
//         setTimeout(function() {
//           frets[fretNum].playColor = false;
//         }, 2700);
//       }
//       // High E string note mapping
//       for (i = 1; i <= 25; i++) {
//         if (note === i || note === i + 150 || note === i + 300) {
//           this.fretArrayNumber = i + 24;
//           console.log(this.fretArrayNumber);
//         }
//       }
//       // B string note mapping
//       for (i = 26; i <= 50; i++) {
//         if (note === i || note === i + 150 || note === i + 300) {
//           this.fretArrayNumber = i - 6;
//           console.log(this.fretArrayNumber);
//         }
//       }
//       // G string note mapping
//       for (i = 51; i <= 75; i++) {
//         if (note === i || note === i + 150 || note === i + 300) {
//           this.fretArrayNumber = i - 35;
//           console.log(this.fretArrayNumber);
//         }
//       }
//       // D string note mapping
//       for (i = 76; i <= 100; i++) {
//         if (note === i || note === i + 150 || note === i + 300) {
//           this.fretArrayNumber = i - 65;
//           console.log(this.fretArrayNumber);
//         }
//       }
//       // A string note mapping
//       for (i = 101; i <= 125; i++) {
//         if (note === i || note === i + 150 || note === i + 300) {
//           this.fretArrayNumber = i - 95;
//           console.log(this.fretArrayNumber);
//         }
//       }
//       // Low E string note mapping
//       for (i = 126; i <= 150; i++) {
//         if (note === i || note === i + 150 || note === i + 300) {
//           this.fretArrayNumber = i - 125;
//           console.log(this.fretArrayNumber);
//           console.log(frets[i]);
//         }
//       }
//       this.audioNote.src = "audio/" + this.fretArrayNumber + ".mp3";
//       audio.play();
//       this.fretArrayNumber = number + 1;
//     }
//   };
// }

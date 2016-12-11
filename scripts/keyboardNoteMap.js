// Make an empty array to hold currentMode note id's
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {
    case "z":
      var pitch1 = document.getElementById(fretArt.filteredScaleIds[0]);
      pitch1.play();
      octaveRestrictor(0);
      break;
    case "x":
      var pitch2 = document.getElementById(fretArt.filteredScaleIds[1]);
      pitch2.play();
      octaveRestrictor(1);
      break;
    case "c":
      var pitch3 = document.getElementById(fretArt.filteredScaleIds[2]);
      pitch3.play();
      octaveRestrictor(2);
      break;
    case "v":
      var pitch4 = document.getElementById(fretArt.filteredScaleIds[3]);
      pitch4.play();
      octaveRestrictor(3);
      break;
    case "b":
      var pitch5 = document.getElementById(fretArt.filteredScaleIds[4]);
      pitch5.play();
      octaveRestrictor(4);
      break;
    case "n":
      var pitch6 = document.getElementById(fretArt.filteredScaleIds[5]);
      pitch6.play();
      octaveRestrictor(5);
      break;
    case "m":
      var pitch7 = document.getElementById(fretArt.filteredScaleIds[6]);
      pitch7.play();
      octaveRestrictor(6);
      break;
    case ",":
      var pitch8 = document.getElementById(fretArt.filteredScaleIds[7]);
      pitch8.play();
      octaveRestrictor(7);
      break;
    case ".":
      var pitch9 = document.getElementById(fretArt.filteredScaleIds[8]);
      pitch9.play();
      octaveRestrictor(8);
      break;
    case "/":
      var pitch10 = document.getElementById(fretArt.filteredScaleIds[9]);
      pitch10.play();
      octaveRestrictor(9);
      break;
    case "a":
      var pitch11 = document.getElementById(fretArt.filteredScaleIds[7]);
      pitch11.play();
      octaveRestrictor(7);
      break;
    case "s":
      var pitch12 = document.getElementById(fretArt.filteredScaleIds[8]);
      pitch12.play();
      octaveRestrictor(8);
      break;
    case "d":
      var pitch13 = document.getElementById(fretArt.filteredScaleIds[9]);
      pitch13.play();
      octaveRestrictor(9);
      break;
    case "f":
      var pitch14 = document.getElementById(fretArt.filteredScaleIds[10]);
      pitch14.play();
      octaveRestrictor(10);
      break;
    case "g":
      var pitch15 = document.getElementById(fretArt.filteredScaleIds[11]);
      pitch15.play();
      octaveRestrictor(11);
      break;
    case "h":
      var pitch16 = document.getElementById(fretArt.filteredScaleIds[12]);
      pitch16.play();
      octaveRestrictor(12);
      break;
    case "j":
      var pitch17 = document.getElementById(fretArt.filteredScaleIds[13]);
      pitch17.play();
      octaveRestrictor(13);
      break;
    case "k":
      var pitch18 = document.getElementById(fretArt.filteredScaleIds[14]);
      pitch18.play();
      octaveRestrictor(14);
      break;
    case "l":
      var pitch19 = document.getElementById(fretArt.filteredScaleIds[15]);
      pitch19.play();
      octaveRestrictor(15);
      // octaveRestrictor(fretArt.foundNoteName, 2);
      break;
    case ";":
      var pitch20 = document.getElementById(fretArt.filteredScaleIds[16]);
      octaveRestrictor(16);
      pitch20.play();
      break;
    case "q":
      var pitch21 = document.getElementById(fretArt.filteredScaleIds[14]);
      octaveRestrictor(14);
      pitch21.play();
      break;
    case "w":
      var pitch22 = document.getElementById(fretArt.filteredScaleIds[15]);
      pitch22.play();
      octaveRestrictor(15);
      break;
    case "e":
      var pitch23 = document.getElementById(fretArt.filteredScaleIds[16]);
      pitch23.play();
      octaveRestrictor(16);
      break;
    case "r":
      var pitch24 = document.getElementById(fretArt.filteredScaleIds[17]);
      pitch24.play();
      octaveRestrictor(17);
      break;
    case "t":
      var pitch25 = document.getElementById(fretArt.filteredScaleIds[18]);
      pitch25.play();
      octaveRestrictor(18);
      break;
    case "y":
      var pitch26 = document.getElementById(fretArt.filteredScaleIds[19]);
      pitch26.play();
      octaveRestrictor(19);
      break;
    case "u":
      var pitch27 = document.getElementById(fretArt.filteredScaleIds[20]);
      pitch27.play();
      octaveRestrictor(20);
      break;
    case "i":
      var pitch28 = document.getElementById(fretArt.filteredScaleIds[21]);
      pitch28.play();
      octaveRestrictor(21);
      break;
    case "o":
      var pitch29 = document.getElementById(fretArt.filteredScaleIds[22]);
      pitch29.play();
      octaveRestrictor(22);
      break;
    case "p":
      var pitch30 = document.getElementById(fretArt.filteredScaleIds[23]);
      pitch30.play();
      octaveRestrictor(23);
      break;
    case "1":
      var pitch31 = document.getElementById(fretArt.filteredScaleIds[21]);
      pitch31.play();
      octaveRestrictor(21);
      break;
    case "2":
      var pitch32 = document.getElementById(fretArt.filteredScaleIds[22]);
      octaveRestrictor(22);
      pitch32.play();
      break;
    case "3":
      var pitch33 = document.getElementById(fretArt.filteredScaleIds[23]);
      pitch33.play();
      octaveRestrictor(23);
      break;
    case "4":
      var pitch34 = document.getElementById(fretArt.filteredScaleIds[24]);
      pitch34.play();
      octaveRestrictor(24);
      break;
    case "5":
      var pitch35 = document.getElementById(fretArt.filteredScaleIds[25]);
      pitch35.play();
      octaveRestrictor(25);
      break;
    case "6":
      var pitch36 = document.getElementById(fretArt.filteredScaleIds[26]);
      pitch36.play();
      octaveRestrictor(26);
      break;
    case "7":
      var pitch37 = document.getElementById(fretArt.filteredScaleIds[27]);
      pitch37.play();
      octaveRestrictor(27);
      break;
    case "8":
      var pitch38 = document.getElementById(fretArt.filteredScaleIds[28]);
      pitch38.play();
      octaveRestrictor(28);
      break;
    case "9":
      var pitch39 = document.getElementById(fretArt.filteredScaleIds[29]);
      pitch39.play();
      break;
    case "0":
      var pitch40 = document.getElementById(fretArt.filteredScaleIds[30]);
      pitch40.play();
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

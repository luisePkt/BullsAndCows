import readlineSync from "readline-sync";
import {
  congratulationsTemplate,
  welcomeMenuTemplate,
} from "./data/template.js";
import { col } from "./data/colors.js";
// import { Game } from "./data/classes.js";

////////////////////////////////////////////
////////////////////////////////////////////

////////////// console leeren:
function clearConsole() {
  console.clear();
}
////////////// data game:
let name;
let level = "";
let secretNum;
let guessingArray;
let tries = 0;
let gameCount = 0;
let randomGreeting;

////////////////////////////////////////////
////////////// GAME functions:

///// generate greatings
clearConsole();
function generateGreeting() {
  const greetings = ["Welcome", "Hello", "Howdy"];
  return (randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)]);
}
// generateGreeting();

/////// ask for name:
function askUserForName() {
  clearConsole();
  name = readlineSync.question(
    `
  
  
    ${generateGreeting()} Cowboy! What is your name? `
  );
  clearConsole();
  name = name.trim();
  name = name !== "" ? name : "Guest"; // default, fall keine Namenseingabe erfolgt
  // console.log(`
  // Let's start ${name}!`);
}

///// generate secret number:
function getSecretNum(level) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  secretNum = Array.from(
    // Array.from ist ähnlich wie .map() => Aber mit {length:} wird Länge des zukünftigen Arrays festgelegt
    { length: level },
    () => numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]
  );
  console.log(secretNum); // einkommentieren um secret-number zu sehen
}

/////////// ask for level:
function askForLevel() {
  clearConsole();
  level = readlineSync
    .question(
      `
      
    Please ${name} choose your level: 
    [${col.gr}E${col.res}]${col.gr}asy${col.res} [${col.ye}M${col.res}]${col.ye}edium${col.res} [${col.cy}D${col.res}]${col.cy}ifficult${col.res} 

    `
    )
    .toUpperCase();
  if (level === "E") {
    level = 4;
  } else if (level === "M") {
    level = 5;
  } else if (level === "D") {
    level = 6;
  } else {
    console.log(`
    Please choose a level, ${name}!
    `);
    askForLevel(); // zurück zu ask for level, wenn Eingabe nicht richtig
  }
  return level;
}

///////// ask for guesssing and check if guessing is valid:
function askForGuessing() {
  let validGuessing = false;
  while (!validGuessing) {
    let guessing = readlineSync.question(
      `Guess the secret number. It consists of ${col.cy}${level} digits${col.res} and ${col.cy}each digit must be unique${col.res}. `
    );
    guessingArray = guessing.split("").map(Number);
    if (
      guessingArray.length === level &&
      guessingArray.every((num) => !isNaN(num)) // Array method every() => alle array elements werden durch function geprüft, gibt bolean zurück
    ) {
      // alle doppelte zahlen kommen in neues array
      const doubleDigits = guessingArray.filter(
        (item, index) => guessingArray.indexOf(item) !== index
      ); // wenn neues array leer => ist guessing gültig
      if (doubleDigits.length === 0) {
        validGuessing = true;
        tries++; // nur gültige Eingabe werden gezählt
      } else {
        console.log(
          `Your guessing must contain only ${col.cy}${level} unique digits${col.res}. Please try again: `
        );
      }
    } else {
      console.log(
        `Your guessing must contain only ${col.cy}${level} digits${col.res}. Please try again: `
      );
    }
  }
}

///////// check cows and bulls:
function checkCowsandBulls(guessingArray) {
  let bulls = 0;
  let cows = 0;
  for (let i = 0; i < level; i++) {
    if (guessingArray[i] === secretNum[i]) {
      bulls++;
    } else if (secretNum.includes(guessingArray[i])) {
      cows++;
    }
  }

  console.log(
    `Your guessing contains ${col.cy}${cows} cow(s)${col.res} and ${col.re}${bulls} bull(s)${col.res}. To win, you need to find ${col.cy}4 bulls${col.res}, please try again: `
  );
  // wenn bulls 0 level => Spiel gewonnen
  return bulls === level;
}

////// infos rounds and tries:
let roundsAndTries = [];

function saveRoundsAndTries(name, level, gameCount, tries) {
  roundsAndTries.push({ name, level: getLevel(level), gameCount, tries });
}

function getLevel(level) {
  if (level === 4) {
    return "easy";
  } else if (level === 5) {
    return "medium";
  } else if (level === 6) {
    return "difficult";
  } else {
    return level; // Rückgabe der ursprünglichen Nummer, wenn keine Übereinstimmung gefunden wird
  }
}

////////////////////// Game structure

function startGame() {
  let continuePlaying = true;
  const startMenu = readlineSync.question(welcomeMenuTemplate);
  while (continuePlaying) {
    ///// game running:
    clearConsole();
    switch (startMenu.toUpperCase()) {
      // PLAY
      case "P":
        askUserForName();
        askForLevel();
        clearConsole();
        getSecretNum(level);
        tries = 0;
        let guessed = false;
        while (!guessed) {
          askForGuessing();
          guessed = checkCowsandBulls(guessingArray);
        }
        gameCount++;
        clearConsole();
        console.log(congratulationsTemplate);
        console.log(
          `
${col.gr}You found the secret number:${col.res} ${col.cy}${secretNum.join("")}${
            col.res
          }${col.gr}!${col.res}`
        );
        // statistics:
        saveRoundsAndTries(name, level, gameCount, tries);
        for (let i = 0; i < roundsAndTries.length; i++) {
          console.log(`
${col.ye}Player:${col.res} ${roundsAndTries[i].name} ${col.ye}Level:${col.res} ${roundsAndTries[i].level} ${col.ye}Game number:${col.res} ${roundsAndTries[i].gameCount} ${col.ye}Guessings:${col.res} ${roundsAndTries[i].tries}`);
        }
        // ask for new game:
        let playAgain = readlineSync
          .question(
            `
Do you want to play again?
                            Press [${col.gr}P${col.res}]${col.gr}lay${col.res} to start the next game.  Press [${col.re}E${col.res}]${col.re}xit${col.res} to leave.
        `
          )
          .toUpperCase();
        clearConsole();
        if (playAgain === "P") {
          continuePlaying = true;
        } else if (playAgain === "E") {
          clearConsole();
          console.log(`Bye, ${name}!`);
          continuePlaying = false;
        } else {
          clearConsole();
          console.log(
            `
            Something went wrong with your input. Please press [${col.gr}P${col.res}]${col.gr}lay${col.res} to start the next game or [${col.re}E${col.res}]${col.re}xit${col.res} to leave.`
          );
          startGame();
        }
        break;

      // EXIT
      case "E":
        clearConsole();
        console.log(`Bye!`);
        return;

      // DEFAULT
      default:
        clearConsole();
        console.log(
          `Something went wrong with your input. Please press [${col.gr}P${col.res}] for ${col.gr}play${col.res} and [${col.re}E${col.res}] to ${col.re}exit${col.res}.`
        );
        // startGame();
        break;
    }
  }
}

startGame();

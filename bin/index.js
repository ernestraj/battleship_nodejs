#!/usr/bin/env node

const readline = require("readline");
const {
  printBoard,
  createGameBoard,
  addShip,
  fire,
  validateShipLocation,
} = require("./util");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const gameBord1 = createGameBoard();
const gameBord2 = createGameBoard();

/**
 * Get Ship location by given Player ID
 * @param {String} playerID
 * @param {Object} rl
 * @returns
 */
async function getShipLocations(playerID, rl) {
  return new Promise((resolve, reject) => {
    rl.question(
      `\nPlease Enter the Ship Location for Player ${playerID}. Format is A1 A2 A3: \nEnter: `,
      (name) => {
        resolve(name);
      }
    );
  });
}

/**
 * Get Fire Location by player ID
 * @param {String} playerID
 * @param {String} otherPlayerId
 * @param {Object} rl
 * @returns
 */
async function fireAt(playerID, otherPlayerId, rl) {
  return new Promise((resolve, reject) => {
    rl.question(
      `\nPlayer ${playerID} : Provide a location to hit Player ${otherPlayerId}. Format is A1 \nEnter: `,
      (name) => {
        resolve(name);
      }
    );
  });
}

/**
 * Get Ship location until it the valid location
 * @param {String} playerID
 * @param {Array} gameBord1
 */
async function getPlayerOneShipLocations(playerID, gameBord1) {
  const result1 = await getShipLocations(playerID, rl);
  if (validateShipLocation(result1)) addShip(result1, gameBord1);
  else {
    console.log("\nInValid Location! Please Enter A-H and 1-8");
    getPlayerOneShipLocations(playerID, gameBord1);
  }
}

/**
 * Main Function to Start Game
 */
(async function () {
  let playerOneHits = 0;
  let playerTwoHits = 0;
  try {
    console.log("Stating the Battleship Game.....");

    await getPlayerOneShipLocations("1", gameBord1);

    await getPlayerOneShipLocations("2", gameBord2);

    while (playerOneHits < 3 && playerTwoHits < 3) {
      const firelocation = await fireAt("1", "2", rl);
      if (fire(firelocation, gameBord2)) {
        playerOneHits++;
      }
      if (playerOneHits == 3) break;

      const firelocationTwo = await fireAt("2", "1", rl);
      if (fire(firelocationTwo, gameBord1)) {
        playerTwoHits++;
      }
    }

    let winingPlayerId = playerOneHits === 3 ? "1" : "2";
    console.log(
      `\n\n\n\nCongratulations Player ${winingPlayerId} ... You sunk my Battleship`
    );
    console.log("Game Over!!!!!!\n\n");

    console.log("Player 1 Board");
    printBoard(gameBord1);
    console.log("\n\n");

    console.log("Player 2 Board");
    printBoard(gameBord2);

    rl.close();
  } catch (e) {
    console.error(e);
  }
})();

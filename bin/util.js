/**
 * Print given game baord
 * @param {Array} data
 */
function printBoard(data) {
  const printObject = (data) => {
    if (data.marked) return "X";
    if (data.hasShip) return "S";
    return "-";
  };
  data.forEach((value, i) => {
    if (i == 0) console.log(`   ${value.join(" ")}`);
    else console.log(`${i}  ${value.map(printObject).join(" ")}`);
  });
}
/**
 * Create Game Boards
 * @returns Array
 */
function createGameBoard() {
  let emtpyObject = {
    marked: false,
    hasShip: false,
  };
  let emptyLine = [
    emtpyObject,
    emtpyObject,
    emtpyObject,
    emtpyObject,
    emtpyObject,
    emtpyObject,
    emtpyObject,
    emtpyObject,
  ];
  let board = [
    ["A", "B", "C", "D", "E", "F", "G", "H"],
    emptyLine,
    emptyLine,
    emptyLine,
    emptyLine,
    emptyLine,
    emptyLine,
    emptyLine,
    emptyLine,
  ];

  return board;
}

/**
 * Validate Ship locations are correct or not
 * @param {String} locations
 * @returns Boolean
 */
function validateShipLocation(locations) {
  if (!locations) return false;

  // check spaces
  if (locations.split(" ").length != 3) return false;

  const charList = locations.split("");

  console.log(charList);

  // check has all the location set
  if (charList.length != 8) return false;

  // check is vertical
  if (charList[0] == charList[3] && charList[0] == charList[6]) {
    const array = locations
      .replace(/[^0-9]/g, "")
      .split("")
      .sort();

    const res = array.map((num, i) => {
      return i == 0 || Number(num) - 1 == Number(array[i - 1]);
    });
    return res.filter((i) => i).length == 3;
  }

  // check is horizontal
  if (charList[1] == charList[4] && charList[1] == charList[7]) {
    const chars = locations
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .split("")
      .sort()
      .join("");
    return "ABCDEFGH".includes(chars);
  }

  return false;
}

/**
 * Add Ship to the given game board
 * @param {String} location
 * @param {Array} board
 */
function addShip(location, board) {
  let locationSet = location.split(" ");
  locationSet.forEach((loc) => {
    let raw = board[0].findIndex((i) => i == loc.substring(0, 1));
    let column = Number(loc.substring(1));
    board[column] = board[1].map((v, i) => {
      if (i == raw) return { ...v, hasShip: true };
      else return v;
    });
  });
}

/**
 * Mark fire locations in given game board
 * @param {String} location
 * @param {Array} board
 * @returns Boolean if hit any ship
 */
function fire(location, board) {
  let raw = board[0].findIndex((i) => i == location.substring(0, 1));
  let column = Number(location.substring(1));
  let hit = false;
  board[column] = board[1].map((v, i) => {
    if (i == raw) {
      if (v.hasShip) hit = true;
      return { ...v, marked: true };
    } else return v;
  });
  return hit;
}

module.exports = {
  printBoard,
  createGameBoard,
  addShip,
  fire,
  validateShipLocation,
};

// Can only detect black edges
function floodFillTool() {
  this.icon = "assets/floodFill.jpeg";
  this.name = "FillColorTool";

  this.draw = function () {
    if (mouseIsPressed) readAndFill(mouseX, mouseY);
  };

  this.populateOptions = function () {};

  this.unselectTool = function () {};
}

// P5 Js use array stores Pixels https://p5js.org/reference/#/p5/pixels
// Wiki https://en.wikipedia.org/wiki/Flood_fill
// Basic algo idea: https://www.freecodecamp.org/news/flood-fill-algorithm-explained/
// JS SEt https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add
function floodFill(x, y, targetColor, initColor) {
  setColor(x, y, targetColor);
  let filledPixels = new Set();
  let checkedPixels = new Set();
  let needToCheck = [compressPos(x, y)];
  let targetColorString = targetColor.toString();
  let intiColorString = initColor.toString();
  var cnt = 0;
  // console.log(needToCheck);
  function scanned(value) {
    return filledPixels.has(value) || checkedPixels.has(value);
  }
  function qualified(x, y) {
    return (
      isValidPos(x, y) && matchedColor(x, y, targetColorString, intiColorString)
    );
  }

  while (needToCheck.length > 0) {
    compressedValue = needToCheck.pop();
    pos = decompressPos(compressedValue);
    cnt++;
    pos_x = pos[0];
    pos_y = pos[1];
    if (scanned(compressedValue)) {
      continue; // skip if we met this pixel before
    } else {
      if (qualified(pos_x, pos_y)) {
        filledPixels.add(compressedValue);
        // console.log("added", compressedValue);
        // console.log("added > ", added.size);
        // alert(1);
        setColor(pos_x, pos_y, targetColor);
      } else {
        checkedPixels.add(compressedValue);
      }
    }
    for (const item of [
      [pos_x + 1, pos_y],
      [pos_x, pos_y - 1],
      [pos_x - 1, pos_y],
      [pos_x, pos_y + 1],
      // compressPos(pos_x, pos_y),
      // compressPos(pos_x -1 , pos_y),
    ]) {
      if (qualified(item[0], item[1])) {
        needToCheck.push(compressPos(item[0], item[1]));
      }
    }
  }
  // console.log(needToCheck);
  // console.log("added > ", added.size, added);
  console.log("checked >>", checkedPixels.size);
}

// tool function, make pos to one number for identify it
// s = new Set()
//s.add([1,2])
// Set(1) {Array(2)}
// s.add([1,2])
// Set(2) {Array(2), Array(2)}
// So let.s change x,y to a z, and also we can restore x,y from z
// x = 1123, y = 123
// basicall idea is use different digits represent it
// 1123 * 100000 + 123 = 112300123
//                       ==>X|   Y
// first 5 digits for X, and last 5 digits for Y
function compressPos(x, y) {
  return x * 100000 + y;
}

// restore x, y from Z
function decompressPos(number) {
  return [Math.round(number / 100000), number % 100000];
}

function matchedColor(x, y, targetColorString, initColorString) {
  current = getColor(x, y).toString(); // RGBA values[1,2,3,4]
  return current == initColorString && current != targetColorString;
  // if color matchs init color then handle it
}

// return [R,G,B,A]
function getColor(x, y_height) {
  let index = getIndexOfPos(x, y_height);
  // console.log("read Pix No. " + index);
  let r = pixels[index];
  let g = pixels[index + 1];
  let b = pixels[index + 2];
  let a = pixels[index + 3];
  return [r, g, b, a];
}

function setColor(x, y_height, rgba) {
  let index = getIndexOfPos(x, y_height);
  pixels[index] = rgba[0];
  pixels[index + 1] = rgba[1];
  pixels[index + 2] = rgba[2];
  pixels[index + 3] = rgba[3];
}

function getIndexOfPos(x, y_height) {
  let pixelDens = window.pd;
  return 4 * width * pixelDens * y_height + x * pixelDens * 4;
}

function readAndFill(x, y) {
  loadPixels();
  let currentColor = getColor(x, y);
  // console.log(">>> file", selectedColor.maxes["rgb"], currentColor);
  floodFill(x, y, color(selectedColor).levels, currentColor);
  updatePixels();
}
